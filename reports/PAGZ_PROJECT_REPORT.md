# Pagz — Project Report (Resume + Blog Source)

> Custom-printing e-commerce platform deployed on Hostinger + Vercel. Three independent codebases (API, web storefront, admin panel). Built Feb 2026 → May 2026 across 300+ commits.

This document is your single source for resume bullets, an in-depth technical blog post, the tools list, and the catalogue of hard problems you actually solved (with commit / file evidence).

---

## 1. One-paragraph elevator pitch

Pagz is a print-on-demand storefront where customers configure print jobs (paper size, color mode, sides, binding, lamination, copies, page count) by uploading PDFs/images, and the system computes a price from a category-driven rule engine, gates addons by page-count ranges, and runs a half-page/duplex-aware effective-page calculation server-side. It uses **PhonePe** for payments, **Hostinger FTP** for customer file storage (with temp staging on the API), **MariaDB via Prisma's adapter-mariadb** instead of the default MySQL connector, and a **Supabase + JWT dual-auth** fallback. The platform spans an **Express/Bun API**, a **Next.js 16 customer storefront**, and a **Next.js 16 admin panel**, with rule-based pricing publishable as concrete `Product` SKUs and resyncable when the rule changes.

---

## 2. Tech stack & tools (resume "Tools" line)

### Languages & runtimes
- **TypeScript** (web + admin + most of API)
- **JavaScript (ESM)** — API entry `src/index.js` (kept .js intentionally for Node ESM resolution + Bun dev)
- **Node.js ≥22** (prod) / **Bun** (dev watch + scripts)

### Backend (`api/`)
- **Express 4.21** — routing, middleware
- **Prisma 7.3** with **`@prisma/adapter-mariadb`** — non-default driver chosen because Hostinger gives MariaDB, not Postgres
- **MariaDB** (Hostinger) — 28 models, 11 enums, 10 migrations
- **PhonePe Standard Checkout** (PAY_PAGE) — SHA256 + salt signature signing; S2S webhook verification
- **PDFKit** — invoice generation
- **basic-ftp** — Hostinger FTP file storage
- **AWS SDK v3** (`@aws-sdk/client-s3`, `s3-request-presigner`) — legacy + presigned uploads, kept for backward-compat with old DB rows
- **Nodemailer** — Hostinger SMTP (`smtp.hostinger.com:465`)
- **Supabase JS** — optional auth fallback
- **JWT** (`jsonwebtoken`) — primary auth
- **bcryptjs**, **multer**, **uuid**, **dotenv**, **js-yaml**
- **Redoc + Swagger UI** — `/api/docs` and `/api/playground` served from `openapi.yaml`
- **tsup** — bundle to `dist/` for prod
- **ESLint** (max-warnings 0 gate)

### Storefront (`web/`)
- **Next.js 16** (App Router), **React 19**, **Turbopack**
- **Tailwind CSS 4** + custom UI primitives (no shadcn dependency)
- **TanStack React Query 5** — server state, caching, devtools
- **pdfjs-dist 5.4** — client-side PDF page-count detection (worker pinned to a CDN mirror to avoid version mismatch)
- **lucide-react**, **react-hot-toast**, **tailwind-merge**
- **Supabase JS** (used minimally — auth flows mostly through API JWT)

### Admin (`admin/`)
- **Next.js 16** + **React 19** + **Tailwind 4**
- **TanStack React Query 5**
- **@dnd-kit/core, sortable, utilities** — drag-reorder for carousels / specs
- **Zod** — form validation
- **pdfjs-dist** — invoice preview & thumbnail rendering
- Hand-coded charts (Tailwind + SVG) — deliberately no Recharts/D3 dependency

### Build / deploy / infra
- **Hostinger** (production VPS + FTP + SMTP + MariaDB)
- **Vercel** (`pagz.vercel.app`, `admin-pagz.vercel.app`) — preview / staging
- **PhonePe** (sandbox + production environments)
- **Fast2SMS / Hostinger SMTP** — OTP delivery

### Resume one-liner (tools)
> **TypeScript, Node.js, Bun, Express, Next.js 16, React 19, Tailwind CSS 4, Prisma (MariaDB adapter), MariaDB, TanStack Query, PhonePe SDK, basic-ftp, AWS S3 (legacy), PDFKit, pdfjs-dist, Supabase, JWT, Redoc/Swagger, dnd-kit, Zod, ESLint, tsup, Hostinger, Vercel.**

---

## 3. Architecture overview

```
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│   web (Next 16)  │         │  admin (Next 16) │         │     PhonePe      │
│  Storefront      │         │  Operations UI   │         │  PAY_PAGE + S2S  │
└────────┬─────────┘         └────────┬─────────┘         └────────┬─────────┘
         │                            │                            │
         └─────────────┬──────────────┘                            │
                       │  HTTPS (JWT in cookie)                    │ S2S webhook
                       ▼                                           ▼
              ┌──────────────────────────────────────────────────────────┐
              │  API (Express, Bun dev / Node prod, port 3002)           │
              │   /api/v1/{auth, public, admin, cart, wishlist,          │
              │            reviews, coupons, customer, payment,          │
              │            upload, ftp}                                  │
              │   /api/webhooks/phonepe                                  │
              │   /api/docs (Redoc)  /api/playground (Swagger)           │
              └──┬───────────────┬───────────────┬───────────────┬───────┘
                 │               │               │               │
                 ▼               ▼               ▼               ▼
            ┌─────────┐   ┌────────────┐   ┌─────────┐    ┌───────────┐
            │ MariaDB │   │ Hostinger  │   │   S3    │    │ Supabase  │
            │ Prisma  │   │    FTP     │   │ (legacy)│    │ (optional)│
            └─────────┘   └────────────┘   └─────────┘    └───────────┘
```

### Key design choices worth talking about in interviews

1. **Three independent apps, no monorepo tooling.** Each has its own `package.json`, `node_modules`, `bun.lock`. Trade-off: simpler deploys to Hostinger (zip per app), at the cost of duplicated types between web/admin (handled by mirroring).
2. **MariaDB via `@prisma/adapter-mariadb`.** Schema declares `provider = "mysql"` but runtime uses the MariaDB adapter with separate `DATABASE_HOST/USER/PASSWORD/NAME` env vars (no `DATABASE_URL`). Connection limit capped at 5 for shared hosting.
3. **Pricing-rule-as-product.** A `CategoryPricingRule` with `ruleType=BASE_PRICE` can be **published** into a `Product` row (`Product.generatedFromPricingRule=true`, FK back to the rule). This unifies "service" (print job) and "product" (physical SKU) flows behind the same Cart/Order/Wishlist tables.
4. **Server-authoritative pricing with client mirror.** Client computes optimistic preview via `lib/utils/addon-pricing.ts`; server re-computes and persists the canonical `priceBreakdown` JSON on the Order so invoices stay correct even if rules change later.
5. **Split data layer in admin.** `lib/api/*.service.ts` for client mutations, `lib/server/*-data.ts` for RSC fetchers (use `cookies()` for JWT) — clean separation between streamed initial render and interactive flows.

---

## 4. Feature catalogue (what was actually built)

### 4.1 Catalog & dynamic configurator
- **Categories** with hierarchy (parent/child), active flag, priority, per-category `minCartValue`.
- **Specifications** per category (5 types: `SELECT`, `MULTI_SELECT`, `TEXT`, `NUMBER`, `BOOLEAN`) with conditional dependencies (e.g. "Binding" only shown if "Sides=2-Sided"). Dependency graph computed in `web/lib/utils/specification-dependencies.ts`.
- **Specification options** carry metadata flags: `isHalfPage` (duplex), `allowedParentValues` (dependency keys).
- **CategoryPricingRule** with four rule types: `BASE_PRICE`, `SPECIFICATION_COMBINATION`, `QUANTITY_TIER`, `ADDON`.
- **Multiplier matrix** on rules: `quantityMultiplier`, `fileMultiplier`, `copyMultiplier` — different math per flag combination.
- **Page-controller rules** (`CategoryPageControllerRule`): max-page caps that depend on selected spec option (e.g. "PDF capped at 250 pages when Sides=Both").
- **Templates** (`CategoryTemplate` + `CategoryTemplateForm`) with JSON field schema driving dynamic form UI on the storefront.
- **Publish & resync**: `categoryController.syncProductByPricingRule` converts a published rule into a concrete `Product` and keeps it in sync when the rule changes.

### 4.2 Cart & guest-cart persistence
- Server cart for authed users, sessionStorage for guests.
- **Pending purchase persistence** (`web/lib/utils/pending-purchase.ts`, ~454 lines) survives the login boundary: stores spec selections, copies, addons, uploaded files (base64 if <5MB each / <10MB total, blob URL otherwise, S3 key if already uploaded), template form data, return URL, and a 24-hour expiry.
- **Post-login intent merge** (`pending-cart-intent.ts`, ~400 lines): re-uploads files dropped during sessionStorage quota-exceeded fallback, validates addon IDs against current rules (silently dropping stale ones), reconstructs metadata, re-issues add-to-cart.
- Cart minimum enforcement: per-category `minCartValue`. On violation, API returns a `CartMinimumError` with structured `{ shortfalls: [{ categoryId, categoryName, required, current }] }` so the UI can show per-category shortfall hints.
- Optimistic cart UI in `hooks/cart/useCart.ts` with rollback on error.

### 4.3 Checkout & payment
- Address selection with **per-recipient name + phone** override (fallback to user defaults at render time).
- Dynamic shipping methods (admin-managed: name, price, ETA, icon).
- Coupon application with validation (active, in date window, min-purchase, per-user limit, global limit, first-order-only, second-order-only, applicableTo ALL/SPECIFIC).
- Customer comment field (Text, ~2000 char) persisted on `Order.customerComment`.
- **PhonePe initiate**: serialize cart into `PendingPayment` (1h TTL), construct payload, base64 encode, sign with `sha256(payload + "/pg/v1/pay" + SALT_KEY) + "###" + SALT_INDEX`, POST to PhonePe, redirect user to `redirectUrl`.
- **Verify**: client polls `/payment/verify-phonepe?merchantOrderId=...`; backend GETs PhonePe status endpoint with the same signature scheme, extracts `paymentInstrument` (UPI vpa / CARD network+last4 / NETBANKING bank / WALLET type) and creates `Order` + `OrderItem` + `Payment` in a transaction, marking `PendingPayment` as `USED`.
- **S2S webhook** (`/api/webhooks/phonepe`) verifies `X-VERIFY` header against recomputed signature, decodes base64 response, idempotent on duplicate `merchantOrderId`.
- **Zero-amount orders skip the gateway** and land in `PENDING_REVIEW`.

### 4.4 Order lifecycle & refunds
- Status machine: `PENDING_REVIEW → ACCEPTED → PROCESSING → SHIPPED → DELIVERED` plus `REJECTED / CANCELLED`.
- Append-only `OrderStatusHistory` for audit trail.
- Refund eligibility computed from `paymentMethod=ONLINE` + `PaymentStatus=SUCCESS`. Defaults to `PENDING` for online-paid orders, `NOT_REQUIRED` otherwise.
- Customer cancellation only allowed in `PENDING_REVIEW / ACCEPTED / PROCESSING`.
- Admin-initiated refund flow: amount, reason, admin note → PhonePe API call → `Refund` row with gateway response.
- Invoice PDF generation via PDFKit with logo (multi-path candidate search with caching), itemized breakdown rows persisted as JSON at order time so the invoice never drifts when rules change later.

### 4.5 Auth
- **Phone-OTP first** (mandatory + unique `User.phone`, optional `email`). 6-digit OTP, 10min TTL, one-time consumption (`verifyOTP` deletes), separate `checkOTP` for UX previews.
- OTP scoped per `(phone, purpose)` where purpose is `SIGNUP` or `RESET_PASSWORD` — prevents reuse across flows.
- `customerAuth` middleware: tries Supabase `getUser(token)` first, falls back to local JWT `verify(token, JWT_SECRET)`. Auto-creates a `User` row on first Supabase login (keyed by `supabaseId`).
- `adminAuth` extends `customerAuth` and checks `user.isAdmin`.
- Single `User` table for customers + admins (`isAdmin`/`isSuperAdmin` flags), no separate Admin model.
- Web client: token in `auth_token` cookie (7d), legacy `refreshToken` cookie kept as fallback for old sessions. Proactive refresh if expiry is within 24h. Reactive refresh on 401, then retry. Login redirect to `/auth/login` only on protected routes (not `/`, not `/products`).

### 4.6 File storage (FTP)
- Customer print files uploaded via multer `memoryStorage` → written to `api/uploads/ftp-temp/` → streamed to Hostinger FTP `public_html/` → local copy deleted.
- `ensureDir` handles 3 PWD states (already-in-public_html / cd-needed / absolute-fallback).
- Files served back via `https://pagz.in/<path>` (no S3 in the live path, but legacy S3 records still resolved).
- **`/ftp-upload` utility page** in the storefront for ops to test connection / drop files into arbitrary subdirs.
- File-name sanitization at upload time (added in #54).

### 4.7 Admin panel
- Dashboard: hand-coded SVG bar/line charts (revenue, orders trend), 6-panel overview.
- Orders: paginated list with multi-filter (status, payment, date range, amount range, coupon, customer, sort), bulk status update, CSV export, batch invoice print, refund modal, status modal, shipping modal, full timeline tab.
- Categories: spec CRUD (5 types, dependency metadata, half-page flag), pricing-rule CRUD with multiplier flags, page-controller config, templates with form-field JSON, image management.
- Coupons: enhanced list with TanStack Query (staleTime 30s, gcTime 5m), bulk operations (toggle active, extend validity, delete), product/category scope manager, analytics.
- Carousels: drag-reorder via `@dnd-kit` updating `displayOrder`.
- 9-step product creation wizard (info → pricing → inventory → merchandising → images → specs → attributes → variants → review).
- Reviews moderation, payments list with refund triggers, users list with order history + lifetime spend.

### 4.8 Reviews & social proof
- Dual-scope reviews: `Review.productId` *or* `Review.categoryId` (one of the two), unique per `(scope, userId)`.
- `ReviewHelpfulVote` join table (one per user per review).
- `isVerifiedPurchase` flag, `isApproved` admin gate, image attachments.
- DB-backed testimonials surface on category pages (Amazon-style image thumbnails).

### 4.9 Wishlist, recently-viewed, offers
- `WishlistItem` unique on `(userId, productId)`.
- `RecentlyViewedProduct` unique on `(userId, productId)`, updated on view.
- `Offer` + `OfferProduct` for promotional bundles.

---

## 5. Hard problems & how you solved them (blog meat)

Each problem here has commit/PR evidence and concrete files. Use these as the spine of the blog post.

### Problem 1 — Guest user adds a 200-page PDF, four addons, three spec selections, then has to log in. Don't lose any of it.

**Why it's hard:** sessionStorage has a quota (~5–10 MB per origin). A single base64-encoded PDF can blow that. Files survive only as in-memory `File` objects, but the user is about to redirect through a login flow that re-mounts the whole app. Addon IDs may be deleted server-side between guest add-to-cart and post-login retry.

**What I built:**
- **Tiered file persistence strategy** in `web/lib/utils/pending-purchase.ts`:
  - Files <5MB and total <10MB → base64 data URI in sessionStorage.
  - Larger files → blob URL (ephemeral but free).
  - Already-uploaded files → keep S3 key reference only.
  - On `QuotaExceededError`, retry **without file payloads** — just metadata (names, sizes, specs, template form, addon IDs). User keeps everything except the bytes.
- **24-hour TTL** on the pending-purchase blob; auto-cleared on read if expired.
- **Post-login recovery** (`pending-cart-intent.ts`): converts base64/blob back into `File` objects, re-uploads via `uploadOrderFilesToS3`, **validates addon IDs** against the live category rules (silently drops stale), reconstructs `metadata` (specifications, effectivePageCount, templateFormData), then re-issues `addToCart`.
- **Safe redirect path** (`auth-redirect.ts`): sessionStorage stores `redirectAfterLogin`, validated to reject `/auth/*` paths and external URLs.

**Evidence:** PRs #7 (`fix/guest-cart-persist-after-login`), #13 (`feat/login-with-email-or-phone`), #14, #15, #17, #23. ~17 commits in the auth/guest-cart cluster.

---

### Problem 2 — "Both Sides" (duplex) printing changes everything. The number you charge for, the addon ranges, the page-controller cap, and the invoice line items all need a different page count.

**Why it's hard:** A 200-page PDF printed two-sided is **100 sheets of paper**. Pricing should reflect 100 effective pages for paper cost, but the binding addon's "≤150 pages" range gate may operate on the raw 200 *or* on the 100, depending on which way you measure books. Get it wrong by 50 pages on a 1000-copy order and the math breaks.

**What I built:**
- `CategorySpecificationOption.metadata.isHalfPage` flag — schema-level signal that selecting this option (e.g. "Sides = Both Sides") triggers a half-page reduction.
- **Server derives `effectivePageCount`** from spec metadata at every relevant moment (price preview, add-to-cart, invoice generation). Client *cannot* spoof — explicitly blocked in commit `e7b3210` ("block client effectivePageCount spoof — server-derive half-page from specs").
- **Range gating decision**: addons gate on **raw `pageCount × copies`**, not the half-page-reduced count, so a 200-page duplex book still qualifies for binding addons priced for 200-page books (PR #53, commit `3a2d7d8`).
- **`copyMultiplier` flag** (PR #54) for addons priced per-copy-pages — binding fees per book where each book is a copy. Per-copy page range validated separately.
- Invoice prints both: `"500 pages, 50 copies, 250 effective (Both Sides)"` so customers see the math.

**Evidence:** ~15 commits in the half-page / page-controller cluster. Files: `web/lib/hooks/use-page-controller.ts`, `api/src/utils/addon-pricing.ts`, `web/lib/utils/addon-pricing.ts`, `web/app/services/[categorySlug]/page.tsx` (30 commits — hottest file).

---

### Problem 3 — Hostinger redirects `/orders` → `/orders/`. Next.js generates `/orders` canonical URLs. Result: infinite redirect loop on RSC payload fetches, broken account pages.

**Why it's hard:** Symptom is intermittent — RSC payload requests get redirected by the host, the client re-fetches, the host redirects again. Looks like a Next bug at first glance but is actually a host-config interaction.

**What I built:**
- One-line fix: `trailingSlash: true` in `web/next.config.js`. Aligns Next's canonical URLs with Hostinger's redirect behavior so RSC fetches land first-shot.
- Documented inline so future devs don't flip it off.

**Evidence:** Live in `web/next.config.js`. Mentioned in CLAUDE.md as a "don't touch" guard.

---

### Problem 4 — Production chunk-loading errors after long deploys. Users see "ChunkLoadError" mid-session.

**Why it's hard:** Next's default split is fine for fresh sessions, but long-lived tabs hold references to chunk hashes that no longer exist. Tabs left open during a deploy try to fetch deleted assets.

**What I built:**
- Custom `webpack.splitChunks` config in `web/next.config.js`: aggressive vendor + common buckets.
- `onDemandEntries` tuned: `maxInactiveAge 25s`, `pagesBufferLength 2` to limit chunk churn in dev.
- `ChunkErrorHandler.tsx` at the layout level — listens for `error` events on dynamic imports, surfaces a "Reload" CTA instead of a white screen.

---

### Problem 5 — Replace Razorpay with PhonePe mid-flight without dropping in-progress orders.

**Why it's hard:** PhonePe's PAY_PAGE flow uses base64-encoded payloads + a SHA256(payload + endpoint + salt) signature, plus an asynchronous S2S webhook that you have to verify with **the same** signature scheme but on a different payload. Old Razorpay code paths still need to be removable cleanly.

**What I built:**
- `services/phonepe.ts`: signature helper, `initiatePhonePePayment`, `checkPhonePePaymentStatus`, `verifyPhonePeCallback` (string == — flagged for future const-time comparison).
- **Two-phase order creation** to handle the async webhook race:
  1. Cart serialized into `PendingPayment` (1h TTL) at initiate.
  2. On `PAYMENT_SUCCESS`, hydrate into `Order + OrderItem + Payment` atomically, mark `PendingPayment` as `USED`. Idempotent on duplicate `merchantOrderId` (the webhook sometimes fires while the verify-poll is also creating).
- Extract payment instrument by type (UPI vpa, CARD network/last4/issuer, NETBANKING bank, WALLET type) into `Payment.paymentDetails` JSON for the receipt.
- Schema field naming kept literal (`phonePeOrderId`, `phonePeTransactionId`) — no abstraction over gateway. Refunds add a `RefundGateway` enum to leave room for a second provider later without renaming columns.

**Evidence:** PR #1 (`phonepe`), commit `1aa9040`. `services/phonepe.ts` (~200 LOC), `paymentController.ts` (~1.6k LOC).

---

### Problem 6 — Hostinger gives MariaDB. Prisma defaults to PostgreSQL/MySQL on the standard binary path. The default MySQL connector behaves oddly on shared MariaDB.

**Why it's hard:** Prisma's default MySQL connector occasionally chokes on MariaDB-specific statements; connection limits matter on shared hosting; you can't use `DATABASE_URL` because the host expects discrete fields.

**What I built:**
- `services/prisma.ts` uses `@prisma/adapter-mariadb` with explicit `host/user/password/database` env vars and `connectionLimit: 5`.
- Schema declares `provider = "mysql"` (Prisma still requires this) but the adapter overrides at runtime.
- Generated client emitted to `api/generated/prisma/` (not `node_modules`) and imported via relative path so the prod bundle includes it.

---

### Problem 7 — Pricing rules need to live as both rules (for service categories like "Booklet Print") and concrete products (for SKU-style products) without duplicating data.

**Why it's hard:** A "service" category configures itself dynamically. A "product" category needs a `Product` row to live in cart/wishlist/order tables. You don't want to write two separate cart paths.

**What I built:**
- `CategoryPricingRule` has an optional `productId` FK and `isPublished` bool.
- `Product.generatedFromPricingRule` flag marks rule-generated rows.
- `categoryController.syncProductByPricingRule` creates / updates the Product when a rule is published, copying over spec/variant/image structure from the rule's snapshot.
- Cart/Order/Wishlist all key on Product, so service jobs and physical SKUs use exactly the same flows.
- When a rule changes, sync re-runs and pushes price updates without breaking historical orders (which keep their snapshotted `metadata.priceBreakdown`).

**Evidence:** ~24 commits in pricing cluster. `categoryController.ts` ~2.6k LOC, 17 commits.

---

### Problem 8 — Per-category minimum cart value, but the customer is buying a mix of categories. The API needs to tell the UI which categories fall short and by how much.

**Why it's hard:** Generic "cart minimum" errors (single number) aren't actionable. User adds ₹400 of A, ₹100 of B, both have ₹500 minimums — they need to know *which* category to top up.

**What I built:**
- `CartMinimumError extends ValidationError` with `details = { shortfalls: [{ categoryId, categoryName, required, current }] }`.
- `errorHandler` middleware preserves the `details` field on 400 responses (most error classes drop unknown fields).
- Web client renders per-category shortfalls inline, with deep links back to the category page.
- Addon contributions count toward the gate (PR `ea01349`) — addons are part of the order value so they should count.

---

### Problem 9 — File-multiplier vs copy-multiplier vs quantity-multiplier addons. Three independent boolean flags create eight pricing-math permutations.

**Why it's hard:** Easy to introduce drift between client-preview math (must be fast, optimistic) and server-final math (canonical). A bug here charges the wrong amount. Range gates also need to know which "page count" they're operating on.

**What I built:**
- `AddonRule` carries three independent flags: `quantityMultiplier`, `fileMultiplier`, `copyMultiplier`.
- Single source-of-truth helper duplicated across `web/lib/utils/addon-pricing.ts` and `api/src/utils/addon-pricing.ts` — *intentionally* duplicated, not abstracted, because the client needs to render before the server round-trips.
- Server is canonical: every cart write recomputes and persists `metadata.priceBreakdown` rows so invoices stay correct forever.
- Range gates explicit: `effectivePageCount` for half-page-aware UI displays, raw `pageCount × copies` for addon eligibility (PR #53).

**Evidence:** PRs #21, #22, #25, #54. Commit cluster around `fileMultiplier` (~8 commits).

---

### Problem 10 — Phone-OTP-only signup means a `User` row may exist with no email and no password. The schema and every auth path must tolerate that.

**Why it's hard:** Most starter Auth code assumes email+password. Migration `20260422010000_phone_otp_auth` was destructive — had to drop phone-less users, make `phone` mandatory + unique, drop the old `password_reset_otps` table, and create the new `phone_otps` table with an `OTPPurpose` enum.

**What I built:**
- `User.phone` mandatory + unique; `email`, `passwordHash`, `name` all nullable.
- Cascade-delete migration (`20260422020000_user_cascade_delete`) so deleting a User cleans up addresses/orders/payments/coupons/reviews/cart consistently — important when phone-conflict cleanup deletes a user.
- OTP table scoped per `(phone, purpose)` so SIGNUP and RESET_PASSWORD OTPs can coexist without collision.
- Login route accepts either phone or email for OTP-verified users (PR #13, `58ff283`).

---

### Problem 11 — Invoice rounding. Subtotal of breakdown lines must equal the order total, exactly, on every invoice, forever.

**Why it's hard:** Floating-point math + page counts × per-page rates + addons + discounts × percentage coupons = silent rounding drift. Customers will spot a ₹0.20 mismatch.

**What I built:**
- Persist the `priceBreakdown` array as JSON on `OrderItem.metadata` at add-to-cart time, with each row's pre-rounded value. Invoice render iterates the persisted rows; the sum is the persisted total.
- PDFKit invoice strips annotation-only rows (e.g. "Both Sides: 100 → 50") via an `isInfoRow` flag so they don't appear as "₹0.00" lines.
- Logo loaded from a multi-candidate path search (`src/assets`, `dist/assets`, `api/src/assets`) with caching, falls back to a wordmark if absent — so invoice generation never fails because of a missing asset path between dev and prod.

**Evidence:** PR #48 (`feat/invoice-redesign`), commit `d9386a5`. `services/pdfGenerator.ts` (~400 LOC).

---

### Problem 12 — Server-side cookies, client-side cookies, and a legacy refresh-token cookie name from an older auth iteration. Don't break logged-in users mid-deploy.

**What I built:**
- Web `lib/api-client.ts` reads `auth_token` cookie primarily, falls back to legacy `refreshToken` cookie name for users on old sessions. Both are written on every successful login so the migration is invisible to the user.
- Admin `api-client.ts` decodes JWT locally (no verification — just reads `exp`) before each request to skip a round-trip on obviously-expired tokens. On 401 with auth-keyword error message, clears token and redirects to `/login` after a 1s toast, with an `isRedirecting` flag to prevent race conditions when multiple requests fail simultaneously.

---

## 6. Resume bullets (curated)

Pick the bullets matching the role. Each is grounded in actual code/commits.

### Long-form (for senior / staff applications)

- Architected and shipped a **rule-driven product configurator** for a print-on-demand storefront where each category exposes 5 specification types with conditional dependencies and four pricing-rule variants (`BASE_PRICE`, `SPECIFICATION_COMBINATION`, `QUANTITY_TIER`, `ADDON`) configurable independently per category; rules can be **published as concrete `Product` SKUs** with a resync mechanism that updates published products when their source rule changes — unifying service-style and SKU-style flows behind a single Cart/Order pipeline.
- Engineered a **half-page-aware effective-page-count engine** with server-side derivation that prevents client tampering: spec options carry an `isHalfPage` metadata flag, the server re-derives the effective page count at every pricing/addon checkpoint, and addons gate on raw vs. effective counts depending on physical-meaning (per-page paper cost vs. per-book binding fees) — including a `copyMultiplier` flag for per-copy-pages addons.
- Built a **guest-cart persistence and post-login intent merge** flow (~850 LOC) that survives the auth boundary: tiered file persistence strategy (base64 / blob URL / S3 key) with `QuotaExceededError` fallback to metadata-only retention; on login, files are restored from base64, re-uploaded to storage, addon IDs validated against live rules, metadata reconstructed, and add-to-cart re-issued — preserving every user choice across the redirect.
- Integrated **PhonePe payment gateway** (PAY_PAGE flow with SHA256 + salt-key signature signing for both initiate and S2S webhook) with idempotent two-phase order creation: cart serialized into a 1-hour `PendingPayment` row at initiate, hydrated into `Order + OrderItem + Payment` atomically on `PAYMENT_SUCCESS` from either the verify-poll or the webhook (whichever lands first), with payment-instrument extraction (UPI vpa, CARD network+last4, NETBANKING, WALLET) into a typed JSON column.
- Implemented **per-category minimum-cart-value enforcement** with structured per-category shortfall reporting through a custom `CartMinimumError` class that propagates `{ categoryId, categoryName, required, current }` arrays through the global error handler so the storefront can render actionable inline guidance with deep links.
- Designed a **Hostinger-FTP-backed file storage pipeline** for customer print uploads with multer-memory-staged streaming via `basic-ftp`, multi-PWD-state directory handling, temp-file cleanup, and URL-encoded path retrieval — keeping legacy AWS S3 paths resolvable for backward compatibility with historical orders.
- Diagnosed and fixed a **Hostinger ↔ Next.js trailing-slash redirect-loop** that broke RSC payload fetches on `/orders` and other account routes, by aligning Next's canonical URL convention with the host's redirect behavior via `trailingSlash: true`; documented the constraint to prevent regression.
- Hardened **production chunk loading** against deploy-mid-session failures via custom `webpack.splitChunks` (aggressive vendor / common buckets), tuned `onDemandEntries`, and a `ChunkErrorHandler` layout component that recovers users from `ChunkLoadError` instead of white-screening.
- Configured Prisma against **MariaDB on shared Hostinger hosting** using `@prisma/adapter-mariadb` (the schema declares `provider="mysql"` but runtime uses the dedicated MariaDB driver with discrete `DATABASE_HOST/USER/PASSWORD/NAME` env vars and a 5-connection pool cap suited to shared hosting).
- Designed an **invoice PDF generator** (PDFKit) that renders a persisted-at-order-time `priceBreakdown` JSON array so historical invoices remain stable even as pricing rules evolve, with multi-candidate logo path resolution and annotation-row filtering for clean output.
- Owned an **admin operations panel** (Next.js 16 App Router) covering the full operations surface: paginated multi-filter order list with bulk status updates, CSV export, batch invoice print; 9-step product creation wizard; category specification + pricing-rule + page-controller editors; coupon analytics with TanStack-Query-cached bulk operations; drag-reorderable carousel manager via `@dnd-kit`; hand-coded SVG charts to avoid a Recharts dependency.
- Migrated the auth model from email/password to **phone-OTP-first** through a destructive Prisma migration that consolidated phone uniqueness, dropped the legacy `password_reset_otps` table, introduced a purpose-scoped `phone_otps` table (`OTPPurpose enum` of `SIGNUP / RESET_PASSWORD`), and added cascade deletes to keep user-scoped data clean on account deletion.

### Short / impact-style (for resume bullet points)

- Shipped a custom-printing storefront serving 4 dynamic spec-driven categories with rule-based pricing, half-page duplex math, and 3 independent addon multiplier modes, on **Next.js 16 + React 19 + Tailwind 4 + Prisma + MariaDB**.
- Replaced Razorpay with **PhonePe** in a live production system using SHA256-signed PAY_PAGE flow and idempotent webhook-driven order creation (PR #1).
- Built **guest-cart persistence across the login boundary** with tiered file storage and quota-exceeded fallback, preserving spec, file, addon, and template state through redirect (~850 LOC, ~17 commits).
- Designed a **pricing-rule-as-product publish-and-resync model** unifying service and SKU flows in a single Cart/Order pipeline.
- Owned the full admin panel: orders, products, categories, specs, pricing rules, coupons, carousels, users, reviews, payments — including a 9-step product wizard and drag-reorderable carousel manager.
- Configured Prisma against **Hostinger MariaDB** with the dedicated `@prisma/adapter-mariadb`; documented schema architecture (28 models, 11 enums, 10 migrations).
- Fixed Hostinger-Next.js trailing-slash **redirect loop** breaking RSC payloads with a one-line config change after diagnosing the host-config interaction.
- Hardened **prod chunk loading** with custom `splitChunks` and a `ChunkErrorHandler` recovery layer.
- Implemented **per-category min-cart-value gating** with structured shortfall reporting through a custom error class.
- Built an **invoice PDF generator** (PDFKit) with persisted `priceBreakdown` so old invoices stay stable across pricing-rule changes.

---

## 7. Blog post draft

> Title suggestion: **"Building Pagz: a print-on-demand stack on Hostinger MariaDB, Next.js 16, and PhonePe"**
> Subtitle: *Lessons from shipping a rule-driven product configurator, half-page duplex math, guest-cart persistence, and a payment-gateway swap on a live system.*

---

### Why this post exists

I spent four months building Pagz, a custom-printing e-commerce platform deployed on Hostinger and Vercel. It has three independent codebases — an Express + Bun + Prisma API, a Next.js 16 storefront, and a Next.js 16 admin panel — and along the way I hit a stack of problems that don't live in the typical Next.js / Stripe / Postgres tutorial path. This post walks through the most interesting ones.

---

### The shape of the system

Pagz is a print-on-demand site. A customer picks a category ("Booklet Print"), uploads a PDF, picks a paper size, color mode, and sides, picks how many copies they want, optionally adds binding or lamination, sees a price computed from a category-specific rule engine, pays via PhonePe, and waits for delivery. The admin operates the catalog, pricing rules, orders, coupons, and refunds.

Three apps:
- `api/` — Express on Bun (dev) / Node (prod), Prisma against MariaDB, PhonePe + FTP integrations.
- `web/` — Next.js 16, React 19, Turbopack, Tailwind 4, TanStack Query.
- `admin/` — Next.js 16, with `@dnd-kit`, hand-coded charts, and Zod-validated forms.

No monorepo tooling. Each app has its own `package.json`, its own `node_modules`, its own deploy artifact. The trade-off is duplicated TypeScript types between web and admin; the win is one-zip-per-app deploys to Hostinger.

---

### Problem 1: Hostinger gives you MariaDB, not Postgres

Most Prisma tutorials assume Postgres. The default MySQL connector works with MariaDB, but there are subtle mismatches and shared-hosting connection limits matter. The fix is `@prisma/adapter-mariadb`:

```ts
// api/src/services/prisma.ts
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
const adapter = new PrismaMariaDb({
  host, user, password, database,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });
```

The schema still declares `provider = "mysql"` because Prisma requires *some* provider, but at runtime the MariaDB adapter is what actually opens connections. Env vars are discrete (`DATABASE_HOST`, `DATABASE_USER`, ...) instead of a single `DATABASE_URL` — which is exactly the shape Hostinger's control panel hands you.

---

### Problem 2: A pricing engine where rules are also products

The catalog has two kinds of things: services (a print job, configurable) and products (a SKU on a shelf). I wanted them to flow through the same Cart, Order, Wishlist tables.

Solution: `CategoryPricingRule` has an optional FK to `Product` and an `isPublished` flag. When you publish a rule, a controller materializes a `Product` row from the rule's snapshot — image, spec structure, variants — and tags it with `generatedFromPricingRule = true`. The cart, the order, the wishlist all key on `productId`. Service jobs and physical SKUs use exactly the same code path.

When the rule changes, a resync rewrites the Product. Historical orders aren't affected, because each `OrderItem.metadata` carries a snapshot of the price breakdown (more on that later).

---

### Problem 3: Half-page math (and why the client can't be trusted)

Sides = "Both Sides" duplex-prints a 200-page PDF onto 100 sheets of paper. That changes:
- The base price: paper is per *sheet*, not per *page*, so charging 100×rate.
- The page-controller cap: "max 250 pages" needs to operate on the right count.
- The binding addon: ranges might gate on raw pages (per-book binding) or effective pages (per-sheet finishing).

I encoded this with two pieces:
1. `CategorySpecificationOption.metadata.isHalfPage` — a flag on the option, not the category, so it's spec-driven.
2. **The server always derives `effectivePageCount`** from spec metadata at every pricing checkpoint. There was a brief period where the client sent `effectivePageCount` to the server and the server trusted it. That ended the day someone realized you could halve your invoice by passing the wrong number. The fix:

> commit `e7b3210`: "block client effectivePageCount spoof — server-derive half-page from specs"

The other half of the puzzle is **deciding which page count the addon range gates against**. After a few iterations:

> commit `3a2d7d8`: "fix(addons): gate range on raw pageCount × copies, not half-page-reduced"

Why? Because a binding addon for "books with up to 200 pages" means *the book has 200 pages*, not "the book has 200 sheets of paper". Range gates are about physical reality of the bound product, not about how the press prints it.

And then `copyMultiplier` (PR #54) covers per-copy-pages addons — binding is priced per book (one binding per copy, regardless of pages), but the per-book-page-range still has to be checked against per-copy pages.

---

### Problem 4: The guest cart that survives login

A customer browses anonymously, configures a 200-page color-printed booklet with 4 addons, hits "Add to Cart," then "Checkout." Now they have to log in. Don't lose anything.

sessionStorage has a quota. A single base64-encoded PDF can blow it. Files survive only as `File` objects in memory, but the user is about to redirect through a login flow that re-mounts the entire app.

The persistence strategy in `web/lib/utils/pending-purchase.ts`:

- Files <5MB and total <10MB → base64 data URI.
- Larger files → blob URL (ephemeral, but free).
- Files already uploaded to S3 → keep just the S3 key.
- On `QuotaExceededError`, retry without file payloads — keep only metadata (names, sizes, specs, template form, addon IDs). Better to ask the user to re-pick the file than lose the entire configuration.

24-hour TTL, auto-cleared on stale read.

The post-login recovery flow in `pending-cart-intent.ts`:

1. Read pending data from sessionStorage.
2. Convert any base64/blob URLs back into `File` objects.
3. Re-upload files via the S3 path.
4. Validate every addon ID against the live category rules — silently drop stale ones (rules deleted between guest action and login retry are normal).
5. Reconstruct the metadata object: specifications, effectivePageCount, templateFormData.
6. Re-issue `addToCart`.

Every choice survives. The one cost: ~850 LOC across two utilities, and a test plan you have to walk through every time you touch it.

---

### Problem 5: The Hostinger trailing-slash redirect loop

Symptom: account pages would intermittently fail to load. The browser network tab showed `/orders` requests being 308'd to `/orders/`, then RSC payloads being re-fetched, then redirected again. Inconsistent because not every path was affected.

Cause: Hostinger's reverse proxy adds a trailing-slash redirect for some paths. Next.js's default canonical URL convention is *no* trailing slash. Each side thinks the other is wrong. Loop.

Fix:

```js
// web/next.config.js
const nextConfig = {
  trailingSlash: true,
  // ...
}
```

Now Next emits canonical URLs with trailing slashes, the host's redirect never fires, RSC fetches land first-shot. One line. Hours of debugging. Documented in CLAUDE.md as "do not flip" so future devs don't undo it innocently.

---

### Problem 6: Replacing Razorpay with PhonePe in live production

PhonePe's Standard Checkout (`PAY_PAGE`) flow:

1. Build a JSON payload with merchant ID, transaction ID, amount, redirect URL.
2. Base64 encode it.
3. Sign: `sha256(base64 + "/pg/v1/pay" + SALT_KEY)` then append `"###" + SALT_INDEX`.
4. POST to PhonePe with the signature in `X-VERIFY`.
5. Get back a redirect URL. Send the user there.
6. PhonePe redirects them back to your callback with a `merchantOrderId` query param.
7. Concurrently, PhonePe S2S-webhooks your backend with a base64 response that you verify with the same signature scheme but on the raw response body.

The interesting part is the race between the verify-poll (the user landing back on your callback page) and the S2S webhook. Both can land first. Both want to create the order.

Solution: two-phase order creation.

- **At initiate**, serialize the cart into a `PendingPayment` row with a 1-hour TTL. The cart can change during that hour; the snapshot can't.
- **At success** (whichever path reaches it first — the verify-poll or the webhook), `PendingPayment.status` flips to `USED` in the same transaction that creates `Order + OrderItem + Payment`. The other path arrives, finds `status = USED`, returns 200 idempotently.

Payment instrument is unpacked into a typed JSON: UPI vpa, CARD network + last4 + issuer, NETBANKING bank, WALLET type. That goes onto `Payment.paymentDetails` so the receipt can show "Paid via UPI: 99xxxxx@ybl" instead of just "ONLINE."

---

### Problem 7: The chunk-loading error nobody catches

Long-lived tabs hold references to chunk hashes. You deploy. The chunks change. The user clicks something that lazy-imports a component. Browser tries to fetch a chunk that doesn't exist. White screen.

Two-part fix:

**`next.config.js` — aggressive chunk strategy:**

```js
webpack: (config, { dev }) => {
  if (!dev) {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: { test: /node_modules/, priority: 20 },
        common: { minChunks: 2, priority: 10 },
      },
    };
  }
  return config;
}
```

**`ChunkErrorHandler.tsx` at the layout level** — listens for `error` events on dynamic imports, surfaces a "Reload to update" CTA instead of letting the browser white-screen.

Combined with `onDemandEntries` tuning (`maxInactiveAge: 25_000`, `pagesBufferLength: 2`), production chunk errors mostly went away. The ones that remain are caught by the layout component and recoverable.

---

### Problem 8: Per-category minimum-cart-value, but actionable

Multiple categories means multiple minimums. A generic "your cart doesn't meet the minimum" error is useless when you're holding ₹400 of A and ₹100 of B and both want ₹500.

I made the error structured. A custom `CartMinimumError extends ValidationError` carries a `details` object:

```json
{
  "shortfalls": [
    { "categoryId": "...", "categoryName": "Prints", "required": 500, "current": 400 },
    { "categoryId": "...", "categoryName": "Booklets", "required": 500, "current": 100 }
  ]
}
```

The global error handler preserves the `details` field on 400 responses. The storefront renders per-category shortfalls inline with deep links to the category page. Customer knows exactly what to do.

Addon contributions count toward the gate — addons are part of order value, so they should count.

---

### Wrap-up

The platform is in production. The fun parts were the pricing engine, the half-page math, and the guest-cart persistence. The painful parts were the trailing-slash loop and the chunk-loading errors — both small in code and outsized in symptoms.

If you're building anything that has to deal with FTP-only hosting, MariaDB-not-Postgres, async payment gateways, and configurable pricing for printable goods, I hope a few of these patterns saved you a week.

---

## 8. Numbers & stats (for the resume / blog credibility line)

- **3 codebases** (api, web, admin) — independent `package.json`, independent deploys.
- **~18,630 LOC** across 19 controllers in API.
- **2.7k LOC** in `orderController.ts` alone.
- **2.6k LOC** in `categoryController.ts` (rule engine + publish/resync).
- **~2k LOC** in `couponController.ts`.
- **~1.6k LOC** in `paymentController.ts` (PhonePe init/verify/webhook).
- **940-line Prisma schema** — 28 models, 11 enums.
- **10 Prisma migrations** including a destructive phone-OTP consolidation.
- **300+ commits** between Feb 2026 and May 2026 (~4 months).
- **Hottest file:** `web/app/services/[categorySlug]/page.tsx` (30 commits).
- **~454 LOC** in `pending-purchase.ts`, **~400 LOC** in `pending-cart-intent.ts`.
- **5 specification types** (`SELECT, MULTI_SELECT, TEXT, NUMBER, BOOLEAN`).
- **4 pricing-rule types** (`BASE_PRICE, SPECIFICATION_COMBINATION, QUANTITY_TIER, ADDON`).
- **3 addon multiplier flags** (`quantityMultiplier, fileMultiplier, copyMultiplier`).

---

## 9. Talking points for interviews (Q&A prep)

**"Walk me through a hard problem you solved."**
→ Half-page duplex math + the client-side spoof you closed. Concrete, easy to draw on a whiteboard, has a clear before/after.

**"What's an architectural decision you made that you'd defend?"**
→ Pricing-rule-as-product. Unifies service jobs and physical SKUs behind the same Cart/Order pipeline. One write path, one read path, no duplication.

**"Tell me about a time you fixed something painful in production."**
→ Hostinger trailing-slash redirect loop. One-line fix, hours of diagnosis, prevented an entire class of RSC payload failures.

**"How do you handle async / race conditions?"**
→ PhonePe two-phase order creation with `PendingPayment` row + idempotent transaction in the success path. Either the verify-poll wins or the webhook wins — both safe.

**"How do you decide when to abstract vs duplicate?"**
→ The addon-pricing helper is duplicated across `web/lib/utils/addon-pricing.ts` and `api/src/utils/addon-pricing.ts`. *Intentionally.* Server is canonical, client is optimistic. They drift only on render — never on persisted values — and the duplication keeps each side fast and free of cross-runtime imports.

**"Describe your testing approach."**
→ Lint + typecheck only. No automated test suite. (Honest answer.) Manual QA was the discipline: every PR includes a tested-in-browser checklist. Acceptable for pre-PMF; acknowledge it as tech debt.

---

## 10. Honest gaps / tech debt to mention if asked

- No automated test suite — only `lint` and `check-types` gate. Acknowledged in CLAUDE.md.
- API README is stale (says PostgreSQL + Razorpay; truth is MariaDB + PhonePe).
- A few package.json scripts reference files that no longer exist (`db:test-connection`, `check-imports`, `openapi:generate`, `db:seed`).
- PhonePe webhook signature comparison uses `==` not constant-time comparison — flagged but not yet replaced.
- `admin/next.config.js` allows any HTTPS hostname in `remotePatterns` (`hostname: "**"`) — necessary for previewing arbitrary stored URLs, but a security-shaped trade-off worth naming.
- Three apps duplicate types between `web` and `admin`. No shared package. Trade-off was deploy simplicity over DRY.

---

*Generated from a deep recon of the codebase + git history (300 commits) on 2026-05-04.*
