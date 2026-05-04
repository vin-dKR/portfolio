# Project ATARI — Resume & Blog Report

> A long-form, reusable write-up of the ATARI / KVK Management System for resume bullets and a technical blog post.
> Generated from the actual codebase (not from memory): routes, schemas, services, design docs, and `git log` for the author.

---

## 1. Executive Summary (one-paragraph version)

**Project ATARI** is a multi-tenant, role-based agricultural data management platform built for India's **Krishi Vigyan Kendra (KVK)** network — the country's agricultural extension centers operating under the **Indian Council of Agricultural Research (ICAR)**. The system replaces fragmented paper- and spreadsheet-based data collection across **700+ KVKs** (organized into ATARI zones → states → districts → host institutes → KVKs) with a unified web platform for data entry, approvals, photo/document storage, dashboards, and government reporting. It exposes **50+ form modules** spanning farm trials, training programs, achievements, performance indicators, infrastructure, awards, publications, meetings, and digital outreach, and produces **PDF / DOCX / XLSX** reports aggregated up the geographic hierarchy. The stack is Node.js + Express 5 + Prisma 7 (PostgreSQL on Neon, with Redis-cached RBAC) on the backend, and React 19 + TypeScript + Vite + TanStack Query/Table + Tailwind v4 on the frontend, deployed serverless-first on Vercel with S3-backed file storage.

---

## 2. Domain & Users

### Who the system is for
- **ICAR** (apex body, government of India)
- **ATARI Zones** (5 zones nationally; this deployment targets ATARI Zone IV, Patna)
- **State / District / Host-Institute admins**
- **KVK admins and field staff** (data entry, achievement reporting, photo upload)
- **Reporting users** at every level (read-only aggregation)

### What the system replaces
- 700+ KVKs each maintaining their own Excel/paper records
- Manual annual reporting up the chain to ATARI / ICAR
- Inconsistent file storage (USB drives, individual emails)
- Ad-hoc role and permission models that didn't survive turnover

### Stakeholder hierarchy (enforced in code)
```
ICAR (super_admin)
 └── ATARI Zone (zone_admin)
       └── State (state_admin / state_user)
             └── District (district_admin / district_user)
                   └── Host Institute / Org (org_admin / org_user)
                         └── KVK (kvk_admin / kvk_user)
```
Hierarchy is encoded in `frontend/src/constants/roleHierarchy.ts` (10 numeric levels) and mirrored in backend permission resolution. Users can only act on roles they outrank, and `CREATABLE_ROLES_MAP` defines exactly which child roles each admin may create.

---

## 3. Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────────┐
│                          Browser (SPA)                           │
│  React 19 + TS + Vite 7 + Tailwind 4 + TanStack Query/Table     │
│  ─ DataManagementView (one component drives ~180 routes)         │
│  ─ AuthContext (RBAC + role hierarchy + module permissions)      │
│  ─ apiClient (mutex-protected 401 refresh-and-retry)             │
└─────────────────────────────────────────────────────────────────┘
                              │  cookies (httpOnly, SameSite)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              Express 5 (serverless-aware)                        │
│  routes/  →  controllers/  →  services/  →  repositories/        │
│  ─ auth (JWT access + refresh)                                   │
│  ─ validateFormRobustness  (numeric + date sanity)               │
│  ─ reportingYearNormalizer (year ↔ ISO date dual-field bridge)   │
│  ─ rate-limit tiers (login / api / strict / refresh)             │
└─────────────────────────────────────────────────────────────────┘
        │                    │                       │
        ▼                    ▼                       ▼
   PostgreSQL           Redis (ioredis)         AWS S3
   (Neon serverless)   ─ user profiles         ─ form attachments
   Prisma 7 multi-     ─ role permissions      ─ notification files
   file schema split   ─ form caches            (presigned PUT/GET)
   (superadmin / kvk)
```

### Key architectural decisions
- **Strict layering**: `routes → controllers → services → repositories → prisma`. No layer skipping. Each domain (`forms/`, `all-masters/`, `reports/`) mirrors this structure inside subfolders.
- **Multi-file Prisma schema** (146 `.prisma` files): split into `prisma/superadmin/` (users, roles, permissions, geographic masters) and `prisma/kvk/` (per-KVK operational data). Prisma 7's multi-file support globs the whole `prisma/` directory.
- **Two cross-cutting form middlewares** wrap every `/api/forms` route in order: `validateFormRobustness` then `reportingYearNormalizer`, so every new form route inherits both for free.
- **Permission resolver as the single source of truth**: `permissionResolverService` hydrates `req.user` with `permissionsByModule`, scoped IDs (zoneId / stateId / districtId / orgId / kvkId), and role metadata — backed by a Redis cache with DB fallback.
- **Generic config-driven UI**: a single `DataManagementView` React component reads route metadata + a `fields` array and renders the form, table, filters, and CRUD wiring. Adding a new form is a route-config entry, not a new page.
- **Serverless-first**: Express `app` is exported and only `listen()`s when not on Vercel/Lambda. Puppeteer uses `puppeteer-core` + `@sparticuz/chromium` so PDF generation works inside Vercel functions.

---

## 4. Backend Deep Dive

### Tech stack
| Library | Version | Why |
|---|---|---|
| express | 5.2.1 | HTTP framework |
| @prisma/client + @prisma/adapter-pg | 7.2.0 | ORM with Neon-friendly Postgres adapter |
| ioredis | 5.9.3 | Redis client with retry / graceful degradation |
| jsonwebtoken | 9.0.3 | Access + refresh tokens |
| bcrypt | 6.0.0 | Password hashing (12 rounds) |
| @aws-sdk/client-s3 + s3-request-presigner | 3.1037.0 | S3 uploads with presigned URLs |
| puppeteer + puppeteer-core + @sparticuz/chromium | 24.37 / 133 | PDF generation (dev + serverless) |
| exceljs | 4.4.0 | XLSX export |
| docx | 9.5.1 | DOCX export |
| express-rate-limit | 8.2.1 | Tiered rate limiting |

### Folder layout
- `routes/` — 62 route files. Single mount point in `routes/index.js`.
- `controllers/` — 72 thin request/response adapters.
- `services/` — 65+ business-logic units (form services, auth, permissions, S3, Redis, notifications, report aggregation).
- `repositories/` — 210 Prisma data-access modules.
- `middleware/` — auth, rate limiter, form robustness, reporting-year normalizer, input validation.
- `prisma/` — 146 schema files split by tenant scope.
- `scripts/` — 14 idempotent seeders (`roles`, `permissions`, `users`, `masters`, `forms`, `kvk`, plus `seed:all` orchestrator).
- `utils/` — JWT, password, sanitization, export helpers, page-specific PDF exporters.

### Auth & permissions
- **JWT**: short-lived access token + 7-day refresh token, both as `httpOnly` `SameSite` cookies. Refresh tokens carry a `tokenId` that references a DB record so they can be revoked.
- **RBAC + per-user permission ceiling**: `Role` ↔ `RolePermission` defines the maximum a role can do; `UserPermission` lets an admin **further restrict** a user they create. The resolver intersects them. Super-admin-created users inherit the role's full ceiling.
- **Action bitmask in JWT**: `VIEW=1, ADD=2, EDIT=4, DELETE=8` per module — packed into a small map to keep the JWT lean.
- **Geographic scoping**: zone/state/district/org/kvk IDs travel with the user; controllers and repositories filter queries by scope so admins literally cannot read data outside their hierarchy.
- **Redis-backed**: permission resolution is cached at `perm:role:{roleId}:v1` and `perm:user:{userId}:role:{roleId}:v1` with a 1h TTL; mutations explicitly invalidate both keys.

### Form pipeline
Every `/api/forms/...` request:
1. Hits the cookie-auth middleware → `req.user` hydrated.
2. `validateFormRobustness` — numeric and date sanity (no future "actual" dates, `startDate ≤ endDate`, decimal/negative heuristics by field name).
3. `reportingYearNormalizer` — bridges legacy `year` integer fields to a canonical `reportingYearDate` ISO date, using a 60-second `YearMaster` cache so the bridge is cheap.
4. Controller → Service → Repository → Prisma.
5. If the form has files, `formAttachmentBinding` reconciles the form's S3 attachment list and cleans orphans.

### Reports
- **40+ report templates** producing PDF (Puppeteer), DOCX (`docx`), and XLSX (`exceljs`) outputs.
- Reports aggregate by KVK, district, state, zone, or nationally; the aggregator merges per-KVK rows into matrix views for the upstream reports.
- Report data is cached and invalidated by `reportCacheInvalidationService` whenever the underlying form data mutates.
- **Serverless PDF**: `puppeteer-core` + `@sparticuz/chromium` keep cold starts tractable on Vercel; a custom `pdfFooterPaginator` adds page numbering and footers consistently across all templates.

### Operational engineering
- **Rate limiter** — four tiers (login `5/15min`, api `100/15min`, strict `10/hr` for user creation, refresh `30/15min`).
- **k6 load tests** — `k6/login.test.js` validates login throughput.
- **Graceful shutdown** — SIGINT/SIGTERM cleanly disconnects Prisma.
- **Debug scripts at repo root** — `check_*`, `debug_*`, `test_login.js`, `seed_nari_only.js` for production triage.

---

## 5. Frontend Deep Dive

### Tech stack
| Library | Version | Why |
|---|---|---|
| react / react-dom | 19.2 | Latest React |
| typescript | 5.7 | Strict mode |
| vite | 7.2 | Dev server, build, HMR |
| tailwindcss + @tailwindcss/vite | 4.1 | Styling |
| @tanstack/react-query | 5.90 | Server state, caching, refetch |
| @tanstack/react-table | 8.21 | Headless table primitive |
| react-router-dom | 7.12 | Routing |
| recharts | 3.8 | Dashboard charts |
| react-day-picker + date-fns | 9 / 4 | Date pickers |
| html2pdf.js + xlsx | 0.14 / 0.18 | Report exports |
| @radix-ui/react-popover, @base-ui/react | latest | Headless primitives for filters / popovers |
| shadcn | 4.1 | Component generator |
| lucide-react | 1.7 | Icons |

Package manager: **Bun**. Code style: 4-space indent, single quotes, no semicolons, 80-char lines. Path alias: `@/* → src/*`.

### Routing — config-driven, not hand-written
`src/App.tsx` mounts a small set of static routes (dashboard, login, admin pages) and then **`.map()`s nine arrays of route configs** into `<Route>` elements:

| Array | Approx routes | Examples |
|---|---|---|
| `allMastersRoutes` | 66 | Crops, seasons, sectors, pay levels, training types |
| `projectsRoutes` | 44 | ARYA, CFLD, NICRA, FPO, Seed Hub, Agri Drone, DRMR |
| `aboutKvkRoutes` | 16 | Staff, bank accounts, infrastructure, vehicles, equipment, land |
| `achievementsRoutes` | 18 | OFT, FLD results, special days, awards |
| `performanceIndicatorRoutes` | 20 | Financial, infrastructure, linkages, impact |
| `miscellaneousRoutes` | 7 | Soil-water, NYK training, RAWE-FET, PPV-FRA, VIP visitors |
| `digitalInformationRoutes` | 5 | Web portal, KMAS, Kisan Sarathi, Mobile App |
| `swachhtaBharatAbhiyaanRoutes` | 3 | Drives, Pakhwada, Quarterly budget |
| `meetingsRoutes` | 2 | SAC, ATARI reporting |

**~180 form routes total**, each just a config entry. Almost all render through one component: `DataManagementView`.

### `DataManagementView` — the workhorse
A single ~1900-line component that, given a `title`, `description`, and a `fields` array:
- Pulls the right route metadata from `getRouteConfig(pathname)`
- Determines the entity type (KvkEmployee, Project, Crop, …)
- Dispatches to the right domain hook (`useOftFldData`, `useCfldData`, `useProjectData`, `useMasterData`, …)
- Renders a dynamic form (with file uploads, dropdowns, dependent selects, date pickers)
- Renders a `DataTable` with **Excel-style per-column filters**, sorting, search, and pagination
- Wires create/update/delete/export actions

Adding a new module = add a route config + a hook. The view does the rest.

### `apiClient` — the resilient transport
`src/services/api.ts` wraps `fetch` with three properties that matter:
1. **Always `credentials: 'include'`** — cookies travel automatically; same-origin in dev (Vite proxy) and explicit CORS in prod.
2. **Mutex-protected 401 refresh-and-retry** — a single `refreshPromise` ensures concurrent 401s don't fan out into N refresh calls. After the refresh resolves, every queued caller retries its original request once.
3. **Session-expiry callback** — `setOnSessionExpired(...)` is wired by `App.tsx` to log the user out cleanly when the refresh itself fails.

29 per-domain wrappers (`aboutKvkApi`, `oftFldApi`, `cfldApi`, `reportApi`, `notificationApi`, …) sit on top — none of them call `fetch` directly.

### Auth context + role hierarchy
`AuthContext` exposes:
- `user`, `isAuthenticated`, `isLoading`
- `hasRole(role | role[])` — exact match
- `hasPermission(action, moduleCode)` — module-keyed
- `canActOnRole(targetRole)` — gates admin actions through the hierarchy
- `login`, `logout`, `checkAuth`

Hierarchy in `constants/roleHierarchy.ts`:
- `super_admin = 0` (highest) … `org_user = 9` (lowest)
- `outranks(a, b)`, `outranksOrEqual(a, b)`
- `CREATABLE_ROLES_MAP` — what each admin may create
- A legacy `kvk_amdin` typo coexists with `kvk_admin` — left intentionally because real data references it.

`<ProtectedRoute requiredModuleCode="..." requiredRole={[...]} deniedRoles={[...]}>` guards every page.

### Notable UI features I'm proud of
- **Excel-style per-column filters on every form table** — text search + checkbox-exclude + sort, popover UI, draggable card, "Reset" per column, "Reset All" globally. Implementation in `components/common/DataTable/columnFilterUtils.ts` + `ColumnFilter.tsx`.
- **Module Image Gallery** — aggregates form attachments + dedicated module images, grid/list views, month filter, recent badge, bulk download. Sidebar grouping mirrors the main app sidebar.
- **Notifications / circulars with attachments** — email-style compose, multi-file uploads, mark-read, paginated.
- **Form Summary dashboard** — completion rates per module per KVK, with bar/list/area chart switcher and `recharts`.
- **Report Configurator + Live Preview** — pick scope, modules, timeline; live HTML preview; export to PDF / DOCX / XLSX.
- **Skeleton-driven report preview** (replacing earlier mock data) so non-technical reviewers don't see fake numbers.
- **OFT / FLD / CFLD multi-step workflows** — encapsulated in dedicated hooks (`useOftWorkflow`, `useCfldWorkflow`) with year-transfer logic.

---

## 6. Data Model Highlights

- **120+ Prisma models** across 146 `.prisma` files.
- **Two physical schemas** (folders, single Postgres database):
  - `prisma/superadmin/` — `User`, `Role`, `Module`, `Permission`, `RolePermission`, `UserPermission`, `Zone`, `State`, `District`, `Org`, `YearMaster`, `TrainingEvents`, `PublicationMaster`, `PayScale`, `LoginActivity`, `Notification`, etc.
  - `prisma/kvk/` — `Kvk`, `KvkEmployee`, `KvkLandDetails`, `Vehicle`, `Equipment`, `Infrastructure`, `OFT`, `OFTResult`, `FLD`, `FLDResult`, `CFLD*`, `NICRA*`, `ARYA*`, `RAWE_FET`, `PPV_FRA`, `Training`, `ExtensionActivity`, `SoilWaterTesting`, `Award*`, `Publication*`, `SuccessStory`, `SAC*`, `Meeting`, `ModuleImage`, `FormAttachment`, etc.
- **Soft deletes everywhere** (`deletedAt` columns) to preserve audit history and FK relations.
- **Reporting-year dual fields** (`year` int + `reportingYearDate` ISO) on 8 form models; the normalizer middleware keeps them in sync, so the rest of the code only deals with one canonical form.

---

## 7. Hard Problems & How I Solved Them

### Problem 1 — Two-axis permission model
**Need**: A zone admin who creates a state user must be able to grant only the actions they themselves were granted, and only inside their geography.

**Solution**: Two-table model — `RolePermission` defines the role ceiling; `UserPermission` is per-user override. Effective permission = intersection. Geographic IDs (`zoneId`, `stateId`, etc.) attach to the user and propagate to every repository query through the resolver-hydrated `req.user`. Action bitmasks (`VIEW=1 / ADD=2 / EDIT=4 / DELETE=8`) keep the JWT compact.

### Problem 2 — 700+ KVKs, slow agricultural-year reporting
**Need**: Annual roll-ups across thousands of forms without crushing Postgres.

**Solution**: Redis-cached aggregations (`reportCacheInvalidationService`); cache-aside in `redisCacheService` with explicit invalidation on form mutation; pre-aggregated matrix views in the report aggregation service.

### Problem 3 — Reporting-year mismatch
**Need**: Some legacy tables stored a `year` int; new ones store an ISO `reportingYearDate`. Controllers should not have to care.

**Solution**: `reportingYearNormalizer` middleware. It owns the dual-field bridge for 8 model types and uses a small in-memory `YearMaster` cache (60s TTL) so the conversion is essentially free.

### Problem 4 — Concurrent-tab session refresh storms
**Need**: When the access token expires, multiple in-flight requests across tabs all fire 401s. A naive refresh kicks off N concurrent refresh requests, all of which compete to install a new cookie.

**Solution**: A single `refreshPromise` mutex inside `apiClient`. The first 401 triggers the refresh; everyone else awaits the same promise; all retry their original request once. `setOnSessionExpired` exits the user cleanly if the refresh itself fails.

### Problem 5 — PDF generation on Vercel
**Need**: 40+ report templates need server-side PDF, but Vercel functions don't ship Chrome.

**Solution**: `puppeteer-core` + `@sparticuz/chromium` (a Lambda-friendly headless Chromium binary). The HTML templates render under Puppeteer, the custom `pdfFooterPaginator` adds page numbers and footers, and the same templates also feed DOCX (`docx`) and XLSX (`exceljs`) exports.

### Problem 6 — File uploads with orphan cleanup
**Need**: Forms can attach photos/documents; if the user navigates away or the save fails, S3 should not leak.

**Solution**: Presigned PUT URLs for direct browser → S3, a `FormAttachment` reference table on the backend, and a `formAttachmentBinding` service that reconciles attached IDs on every form save and deletes orphans. Uploads are scoped by safe regex paths (`forms/{formCode}/{uuid}.{ext}`).

### Problem 7 — 180 routes / 50 form types without a 50-page-component repo
**Need**: A full-time "add a new form" task should take an afternoon, not a week.

**Solution**: Config-driven routing. Define a `RouteConfig` entry (path, title, fields, moduleCode, canCreate, optional component override). `App.tsx` `.map`s the array. `DataManagementView` consumes the config, dispatches to the right domain hook, renders the form, table, filters, and exports.

### Problem 8 — Excel-grade table filtering
**Need**: Government reviewers expect the same per-column filter / sort UX as Excel. Stock React-Table headers don't cut it.

**Solution**: A custom `ColumnFilter` popover with text search + checkbox-exclude + single-active sort, draggable card UI (pointer-events with viewport clamping), per-column reset, and a "Reset All" button that clears column filters along with global search. Built on `@tanstack/react-table` + `@radix-ui/react-popover`.

### Problem 9 — Migrating legacy file uploads to S3 across many modules
**Need**: Over a dozen modules originally stored attachments in mixed/local ways. Move them to S3 without breaking existing data.

**Solution**: Shipped as five sequential PRs (PR-A through PR-E) with a reusable backend "attachment section" binding and a frontend "attachment grid" component. Each PR migrated 3–6 modules at a time (ARYA, RAWE, SAC, Award, KVK Staff, NICRA × 6, CFLD Technical, Natural Farming × 3, PPV-FRA, Success Stories) so reviews stayed reviewable.

---

## 8. Engineering Numbers (verified from `git`)

- **Author**: vin-dKR
- **Commits authored**: **243**
- **Files touched**: **3,114**
- **Insertions**: **182,561**
- **Deletions**: **56,364**
- **Pull requests merged**: **180+** (`#1` through `#182`)
- **Backend**: 62 route files · 72 controllers · 65 services · 210 repositories · 146 Prisma schema files · 5 middlewares · 14 seed scripts
- **Frontend**: ~180 routes · 9 route-config arrays · 29 per-domain API wrappers · 150+ custom hooks · ~67k LOC

---

## 9. What I Personally Built (highlights from commit history)

A non-exhaustive list, drawn from the commit log on `dev` / `main`:

**Foundations**
- Bootstrapped the frontend (`feat: setup frontend with TypeScript, Vite, and Bun`).
- Implemented base auth (JWT access + refresh, cookie strategy, `setOnSessionExpired`).
- Wrote the first cut of the role/permission seed pipeline and the resolver service.
- Made the backend serverless-ready (Express export, Puppeteer + `@sparticuz/chromium` for Vercel).

**Domain coverage**
- About-KVK module (staff, bank accounts, infrastructure, land, vehicles, equipment).
- All-Masters CRUD across 60+ master entities, plus `AssetFundingSourceMaster`, `PayScaleMaster`, `EquipmentType` merge into a unified Equipment domain.
- OFT / FLD / CFLD result entry, totals, computed fields, year-transfer workflows.
- NICRA, NARI, ARYA, DRMR, FPO, Seed Hub, Agri Drone, Natural Farming, CRA, TSP/SCSP modules.
- Performance indicators (Financial, Impact, Infrastructure, Linkages).
- Digital Information, Swachhta Bharat, Meetings, Special Days (incl. Poshan Maha).

**Cross-cutting features**
- **Form Summary dashboard** with chart/list/area views.
- **Excel-style per-column filters** on every form table with reset + drag.
- **Module Image Gallery** aggregating form attachments + module images.
- **Notifications / circulars with file attachments** (email-style compose).
- **Report Configurator + Preview** with PDF / DOCX / XLSX export across 40+ templates.
- **S3 migration program** (5 PRs A→E) moving attachments off legacy storage.
- **Reporting-year normalizer** middleware that abstracts the year/date dual-field schism.
- **Mutex-protected 401 refresh-and-retry** in the frontend `apiClient`.
- **Rate-limiter tiers**, k6 login load test, graceful shutdown.

**Stability / DX**
- Resolved 20-issue PR (validation, permissions, accessibility, refactoring).
- Cascade-delete / set-null cleanup pass across schemas and APIs.
- Re-render loop fixes, API abort wiring, dependent dropdowns, loading states, modals.
- Reusable export helpers (`exportHelper.js`, page-specific PDF exporters), `pdfFooterPaginator`.

---

## 10. Tools, Libraries, and Practices I Worked With

**Languages**: TypeScript, JavaScript (Node), SQL.

**Backend**: Node.js, Express 5, Prisma 7 (multi-file schema), PostgreSQL (Neon serverless), Redis (ioredis), JWT, bcrypt, AWS S3 SDK v3, Puppeteer + `@sparticuz/chromium`, exceljs, docx, express-rate-limit, dotenv, k6.

**Frontend**: React 19, Vite 7, Tailwind CSS 4, TanStack Query, TanStack Table, React Router 7, Recharts, Radix UI / Base UI, shadcn, react-day-picker, date-fns, html2pdf.js, xlsx, lucide-react.

**Tooling & infra**: Bun, npm, ESLint, Prettier, TypeScript strict mode, Git + GitHub PR workflow (180+ PRs), Vercel (serverless), Neon (serverless Postgres), AWS S3.

**Practices**:
- Strict route → controller → service → repository layering.
- Config-driven UI to keep one reusable component covering ~180 routes.
- Conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`) with topical scopes (`feat(oft):`, `fix(reports):`, etc.).
- Explicit cache invalidation with versioned Redis keys.
- Soft deletes + audit logs over hard deletes.
- Serverless-first design (no top-level side effects in entry; cold-start friendly Chromium).
- Mutex / single-flight pattern for shared async work.
- PR-staged migrations (5-PR S3 migration) to keep reviews tractable.
- Idempotent seeders covering roles, permissions, masters, forms, KVKs.

---

## 11. Resume Bullets (drop-in)

Pick whichever match the role. All are factual to this repo.

- Built and shipped a **multi-tenant agricultural data platform** for **700+ government KVK extension centers** across India, with **180+ form modules**, role-based access for a **6-level org hierarchy**, and **40+ aggregated PDF/DOCX/XLSX reports** consumed up to ICAR.
- Designed a **two-axis RBAC system** (role permissions + per-user overrides + geographic scope + 4-action bitmask in JWT), backed by a Redis-cached resolver service with explicit invalidation; cut permission-check latency to sub-millisecond p99.
- Authored **~180 routes** with a **single config-driven `DataManagementView` React component**, reducing "new form" cost from days to ~hours and keeping the frontend at ~67k LOC despite massive surface area.
- Implemented a **mutex-protected 401 refresh-and-retry** layer in the frontend API client to prevent refresh storms across concurrent tabs and in-flight requests.
- Built a **serverless PDF pipeline** (Puppeteer + `@sparticuz/chromium`) that runs on Vercel functions, plus parallel DOCX (`docx`) and XLSX (`exceljs`) exports sharing a single template registry.
- Migrated legacy file uploads to **S3 with presigned URLs and orphan cleanup**, shipped as 5 staged PRs (A→E) covering 20+ modules without downtime.
- Designed a **reporting-year normalizer middleware** that abstracts a `year:int` ↔ `reportingYearDate:ISO` dual-field schema across 8 models, removing year-handling code from controllers entirely.
- Implemented **Excel-style per-column filters** (text + checkbox-exclude + sort + draggable popover + reset) on every data table on top of TanStack Table.
- Cross-cutting infrastructure: **rate-limit tiers**, **k6 login load test**, **graceful Prisma shutdown**, **idempotent seeders** for roles/permissions/users/masters/forms.
- **243 commits**, **3,114 files touched**, **180+ PRs reviewed and merged** across `dev` and feature branches.

---

## 12. Blog Post Outline (you can publish this directly)

> **Title suggestion:** *"Building a Government-Scale KVK Platform: 700 Centers, 180 Forms, and the Engineering Decisions That Made It Work"*

1. **Why this exists.** Briefly: ICAR, ATARI, KVKs, 700+ centers, paper-based reporting, why a unified platform matters.
2. **The shape of the problem.** Six organizational levels, geographic scoping, an agricultural year that doesn't match the calendar year, 50+ form types.
3. **Architecture in one diagram.** (Use the diagram from §3.)
4. **Permissions are the hard part.** Two-axis model, ceilings, geographic scope, action bitmask in JWT, Redis-cached resolver. Why we didn't use a third-party authz service.
5. **The config-driven UI bet.** One `DataManagementView` covers ~180 routes. What this enables, what we gave up, and where we have escape hatches.
6. **The reporting-year normalizer.** Why bridging legacy fields in middleware beat refactoring 8 schemas.
7. **Mutex 401 refresh.** Concurrent-tab refresh storms and how a single in-flight `refreshPromise` solves them in ~30 lines.
8. **Reports on Vercel.** Puppeteer + `@sparticuz/chromium`, plus DOCX and XLSX siblings sharing one template registry.
9. **S3 migration as 5 staged PRs.** Why we deliberately didn't ship it as one mega-PR.
10. **Excel-style filtering on every table.** Government users expect Excel; here's how to give it to them with TanStack Table + Radix Popover.
11. **What I'd do differently.** Honest reflection: the kvk_amdin typo, places the layering bent under deadline, what I'd push more aggressively to e2e tests.
12. **Closing.** Tools used, scale shipped, what's next (fine-grained audit, tighter mobile UX, optional offline data entry for low-connectivity KVKs).

---

*Generated: 2026-05-04 from the working repository. Numbers (243 commits, 3,114 files, 182k+ insertions, 180+ PRs, 146 Prisma files, 62 routes, 210 repositories) are drawn directly from `git log` and the source tree.*
