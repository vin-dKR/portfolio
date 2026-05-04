# Eduents Workspace — Comprehensive Project Report

> Source material for resume bullets and a long-form blog post.
> Workspace: `/home/vinod/work/project-eduents` — five independent apps that together form an EdTech platform for question-bank management, exam authoring, OMR grading, and AI-assisted question/diagram extraction from PDFs.

---

## 1. Executive Summary

The workspace is a **multi-app EdTech platform** focused on the full lifecycle of exam content: ingestion (PDFs / scanned images → structured Q&A), authoring (collaborative folders, paper templates, PDF generation), delivery (online tests, OMR sheet grading), and analytics. It combines a **Next.js 15 main app** with **four satellite tools** — three of them Python backends (FastAPI / Flask) wrapping vision LLMs, plus a standalone WebSocket service powering folder-scoped real-time collaboration.

Five projects:

| # | Project | Stack | Role |
|---|---|---|---|
| 1 | **eduents/** | Next.js 15, React 19, Prisma + MongoDB, Clerk, Puppeteer, OpenAI, Supabase | Primary app — question bank, examination, OMR, PDF generation, real-time collab |
| 2 | **image-auto-cropper/** | Next.js 16 + Konva (frontend), FastAPI + Pillow + Gemini/OpenAI (backend) | AI-assisted diagram detection in question papers + Konva canvas refinement |
| 3 | **question-extractor-tool/** | Vite + React 19 (frontend), Flask + PyMuPDF + GPT-4o vision (backend) | PDF → structured Q&A JSON pipeline with per-question-type prompt selection |
| 4 | **question-image-verifier/** | Vite + React 19 (frontend), FastAPI + PyMongo + OpenCV + Supabase (backend) | Batch image cropping/verification, persists to Supabase Storage + MongoDB |
| 5 | **ws-questions-b/** | Node.js + `ws` library | Standalone folder-scoped WebSocket relay (twin of eduents collaboration server) |

Cross-cutting themes: **vision LLMs** (OpenAI GPT-4o / GPT-5.4 / Google Gemini 2.0 Flash) for diagram + question extraction, **Puppeteer + serverless Chromium** for PDF generation, **Supabase Storage** for image persistence, **MongoDB Atlas** for metadata, **Clerk** for auth, **WebSocket (`ws`)** for real-time collab, **fractional-index ordering** for collaborative reordering without renumbering, **CORS allowlists** so satellite tools can call the main app cross-origin.

---

## 2. Project 1 — `eduents/` (Primary Next.js App)

### 2.1 Purpose
Authenticated workspace for teachers, students, and coaching institutes to manage a shared question bank, build folders/tests, generate question-paper PDFs, run online exams, grade OMR sheets, and analyse results — with multi-user real-time collaboration on folders.

### 2.2 Tech stack
- **Framework**: Next.js 15.3.3 (App Router), React 19.1.1, TypeScript 5.8.3
- **UI**: Tailwind v4, Radix UI primitives, Lucide React, Framer Motion, Sonner toasts, React Select, next-themes (dark mode)
- **State / data**: Zustand 5, TanStack React Query 5, Prisma 6.7 client (custom output `./generated/prisma`), MongoDB 6.18 driver (raw client alongside Prisma)
- **Auth**: Clerk (`@clerk/nextjs` 6.18) — primary; NextAuth + prisma-adapter retained as legacy
- **PDF generation**: Puppeteer 24.15 + `puppeteer-core` + `@sparticuz/chromium` 138 (serverless Chromium binary), `pdfjs-dist` 5.6 (client-side parsing), `html2pdf.js`, `sharp` 0.34 (image transforms + EXIF rotation), `canvg` (SVG → canvas), `@napi-rs/canvas` 0.1.97 (serverless canvas API)
- **Math rendering**: MathJax 3 (Node + CDN) on server, `react-katex` 3.1 on client, custom `jaxUtils.ts` patches SVG for PDF parity
- **Real-time**: `ws` 8.18 (WebSocket server, port 3001, `scripts/start-collaboration-server.js`)
- **AI / LLM**: OpenAI 5.12 (`gpt-4o`, `gpt-5.4`, `gpt-4o-mini` for refinement), `@google/genai` 1.50 (Gemini fallback)
- **Storage**: `@supabase/supabase-js` 2.103 — image bucket; two Supabase project URLs allowlisted (active migration)
- **Email / SMS / webhooks**: Nodemailer 7 (Gmail SMTP for collaboration invites), Resend 4.5 (provisioned), Twilio 5.5 (provisioned), Svix 1.65
- **Build tooling**: bun (lockfile), `@next/bundle-analyzer`, `copy-webpack-plugin` (copies the Prisma `rhel-openssl-3.0.x` query engine into `.next/server` at build time)

### 2.3 Feature inventory

**Dashboard (`app/(dashboard)`)**
- `/dashboard` — landing, folder browser, recent activity
- `/[slug]` — folder detail: question list, inline editing, real-time collaboration panel, fractional-index reordering, PDF export
- `/examination` — test creation hub
  - `/examination/create` — test builder (pick questions, marks, duration, totalMarks)
  - `/examination/analytics/[testId]` — score distribution, per-question performance
- `/school-test` — extraction pipeline UI (upload → detect → crop → extract → save `SchoolTestQuestion`s)
- `/post` — alternate question intake
- `/profile`, `/settings`

**Onboarding (`app/onboarding`)** — middleware-gated multi-step flow
- `/onboarding/user-type` (role selection: teacher / student / coaching)
- `/onboarding/teacher | student | institute` (role-specific metadata forms)
- Sets `sessionClaims.metadata.onboardingComplete = true` via Clerk

**Auth (`app/auth`)** — Clerk pages: `signin`, `signup`, `sso-callback`, `forgot-pass`

**API routes (`app/api`)** — CORS-allowlisted, satellite-tool entry points
- `/api/questions/*` — shared question bank CRUD + bulk get
- `/api/school-test/prepare` and `/process-page` — PDF rasterise + per-page detect/extract/crop
- `/api/omr/checker` — grade OMR sheet, write `Student` + `StudentResponse` + `TestAnswer` records, compute score / percentage
- `/api/omr/fetchTestbyId` — fetch test structure for OMR form rendering
- `/api/examination/tests`, `/api/examination/analytics` — test metadata + aggregated stats
- `/api/students/suggest` — student-name autocomplete
- `/api/analytics/pdf` — performance report PDF (HTML → Puppeteer)
- `/api/webhooks/clerk` — Clerk `user.created` / `user.updated` upsert into `User`

**Server actions (`actions/<domain>/`)**
- `question/` — `addQuestion`, `updateQuestion`, `deleteQuestion`, `reorderQuestions` (fractional-index)
- `dashboard/` — folder CRUD, rename, copy
- `collaboration/folder.ts` — `addCollaborator`, `removeCollaborator`, email invite, role check; appends to `FolderChangeLog`
- `examination/` — `createTest`, `updateTest`, `addTestQuestions` (handles both shared `Question` and `SchoolTestQuestion`)
- `school-test/` — `saveExtractedQuestions`, `updateSchoolTestCrop`
- `htmlToPdf/htmlToPdf.ts` — singleton browser, retry-on-disconnect, HTML → PDF
- `paperHistory/`, `templates/`, `onBoarding/completeOnboarding.ts`, `drafts/`, `user/`

### 2.4 Architecture highlights

**Data model (Prisma + MongoDB)** — two loosely coupled domains in one schema:

1. **Question bank + collaboration**
   - `User` → `Folder` → `FolderQuestion` → `Question` (shared)
   - `FolderQuestion.position: Float` — **fractional-index ordering**: when reordering, pick a float between neighbours rather than renumber the list
   - `FolderCollaborator` (roles: owner / editor / viewer)
   - `FolderChangeLog` — append-only audit (`action`, JSON `details`, timestamp)
   - Role-specific 1:1 profile models: `TeacherData`, `StudentData`, `CoachingData`

2. **Examination**
   - `Test` → `TestQuestion` (points to shared `Question` *or* `SchoolTestQuestion`) → `StudentResponse` → `TestAnswer`
   - `Student` is a separate model — exam-only, **not Clerk-linked**
   - `StudentResponse` unique on `(testId, studentId)`

The shared `Question` is referenced from four places (`FolderQuestion`, `TestQuestion`, `TestAnswer`, `PaperHistoryQuestion`) — Prisma requires explicit relation names for each, hence `QuestionToFolderQuestion`, `QuestionToTestQuestion`, etc.

**Middleware (`middleware.ts`)** — single Clerk middleware does three things:
1. CORS preflight handling for every `/api/*` request (allowlist: `localhost:3000/3001/5173`, `question-editor.vercel.app`, `multi-crop.vercel.app`, `omr-checker.vercel.app`)
2. Auth gate — unauthenticated → Clerk sign-in (except `/auth/*`, `/`, `/api`)
3. Onboarding gate — missing `onboardingComplete` → `/onboarding/user-type`

**Real-time collaboration** — plain Node.js `ws` server on port 3001. Clients connect with `?folderId=&userId=&userName=`; missing any param → close 1008. In-memory rooms keyed by `folderId`, broadcasts exclude the sender. The socket is a **dumb relay**; durable state is written by server actions to `FolderChangeLog`.

**PDF generation** — server-side Puppeteer + `@sparticuz/chromium`. A `lib/pdf/browserSingleton.ts` reuses the browser across Lambda invocations (cold-start ~4 s, warm ~600 ms). `browser.disconnected` event resets the promise; one retry on stale handle.

**Math rendering parity** — MathJax 3 on server (for PDF), KaTeX (`react-katex`) + MathJax CDN fallback on client. `jaxUtils.ts` provides `forceInlineMath()`, `fixMathJaxForPDF()` to normalise display, alignment, and SVG fill before Puppeteer screenshots — patches the inevitable visual drift between the two engines.

**School-test extraction pipeline (`lib/school-test/`)** — sequential per-page processing:
1. **PDF → PNG** via `pdfjs-dist`, EXIF rotation via `sharp(...).rotate().png()` (mandatory — skipping it misaligns vision-model bbox coords vs `sharp` pixel layout)
2. **Detection** — `detectDiagrams()` → `callVision()` with `gpt-5.4`, image scaled to 1600 px preview, detections rescaled to full-res
3. **Extraction** — `extractQuestions()` → `gpt-4o` JSON mode
4. **Cropping** — `sharp.extract(bbox)` on full-res buffer
5. Stream `ProcessEvent[]` back to UI: `page-count`, `page-start`, `page-detected`, `page-extracted`, `page-done`, `error`, `complete`
6. `parseJsonLoose()` repairs LaTeX backslash escaping in vision-model JSON output

**OMR (Optical Mark Recognition)** — `/api/omr/checker` accepts a graded sheet, creates a `Student` (bare, no Clerk link), writes `StudentResponse` + per-question `TestAnswer`, computes score and percentage.

### 2.5 Notable engineering decisions

1. **Custom Prisma output** (`./generated/prisma`) + build-time copy of the `query-engine-rhel-openssl-3.0.x` binary into `.next/server` — required for Vercel/Netlify cold starts.
2. **Fractional-index ordering** on `FolderQuestion.position` — insert between neighbours without renumbering; the cost is risk of position collisions under concurrent edits.
3. **Singleton Puppeteer browser** with retry-on-disconnect — amortises Chromium startup within a warm Lambda but cannot help across cold starts.
4. **MathJax (server) + KaTeX (client)** split with patch utilities — a pragmatic compromise; full parity would require standardising on one renderer.
5. **Mandatory `sharp().rotate()`** before vision-model calls — fixes the silent misalignment when phone-camera EXIF orientation is ignored.
6. **Onboarding gate in middleware** (not in a layout) — runs before Clerk's own redirects; needs careful error handling in `completeOnboarding` to avoid redirect loops.
7. **`bodySizeLimit: '10mb'`** on server actions — necessary for HTML payloads carrying multi-page extracted PDFs and base64 images.
8. **Two Supabase projects allowlisted** in `next.config.ts` `images.remotePatterns` — in-flight migration; both buckets are valid sources today.
9. **Dual vision-LLM providers** (`openai.ts` and `gemini.ts` under `lib/school-test/`) selected per call — allows A/B testing extraction quality.

### 2.6 External integrations

| Service | Purpose | Where |
|---|---|---|
| Clerk | Auth, onboarding metadata | `middleware.ts`, `actions/*`, `/api/webhooks/clerk` |
| MongoDB Atlas | Primary DB | `lib/prisma.ts` + occasional raw `mongodb` client |
| OpenAI | Vision extraction (`gpt-4o`), diagram detection (`gpt-5.4`), text refinement (`gpt-4o-mini`) | `lib/ai/aiService.ts`, `lib/school-test/openai.ts` |
| Google Gemini | Alternate vision provider | `lib/school-test/gemini.ts` |
| Supabase | Image storage (`Images` bucket) | `lib/supabase.ts` (service role) |
| Nodemailer (Gmail SMTP) | Collaboration invite emails | `lib/email/emailService.ts` |
| Resend / Twilio / Svix | Provisioned, not actively used | `package.json` only |

---

## 3. Project 2 — `image-auto-cropper/`

### 3.1 Purpose
Detect diagrams in scanned question papers using a vision LLM, then let the user refine the bounding boxes on a Konva canvas and export per-diagram PNG crops as a ZIP.

### 3.2 Tech stack
- **Frontend** (Next.js **16**.2.3 — bleeding edge, breaking changes vs. v15): React 19.2.4, Konva 10.2.5, react-konva 19.2.3, `use-image` 1.1.4, Tailwind v4, TS 5
- **Backend** (FastAPI 0.111): Uvicorn 0.29, Pillow 11.1, NumPy 1.26, `python-multipart` 0.0.9, `python-dotenv` 1.0.1, `google-genai` ≥1.0, `openai` ≥1.0

### 3.3 End-to-end pipeline
1. **Upload** — POST `/api/upload?provider=gemini|openai` → image saved to `backend/uploads/`
2. **AI detection** — dual-provider:
   - **Google Gemini 2.0 Flash** (default): inline multimodal call with raw `PIL.Image`
   - **OpenAI GPT-5.4**: base64 data-URI, `detail: "high"`, `temperature 0.1`, `max_tokens 4096`
   - Both prompts emphasise "TIGHT bbox around ONLY visual/graphical pixels, NOT question text" and return `[{q_no, has_image, bbox: [x,y,w,h] | null}]`
   - Post-processing clamps bboxes to image bounds with min 10 px dimensions
3. **Storage** — JSON per image in `backend/data/{image_id}.json`; originals in `backend/uploads/`; crops in `backend/crops/{image_id}/`. FastAPI mounts both as `StaticFiles`.
4. **Manual refinement** (Konva canvas):
   - Draw / drag / resize boxes with 8-point transformer
   - Delete via `Delete` key
   - Toggle `has_image` per question
   - Edit bbox `[x,y,w,h]` numerically in sidebar
   - Zoom 30 %–300 %, optional grid overlay
   - All coordinates kept in original-image space; `toOrig()` / `toDisp()` handle scale + zoom
5. **Save** — POST `/api/save` writes JSON
6. **Crop + download** — POST `/api/crop/{image_id}` → Pillow extracts each bbox → GET `/api/crop/{image_id}/download` returns a ZIP

### 3.4 Notable problems (and how addressed)
- **EXIF rotation alignment** — same class of bug as in `eduents/school-test`: Pillow reads raw pixels, vision models auto-rotate. Solved by uniform rotation before both detection and cropping.
- **Konva perf with large scans** — non-interactive layers (grid, labels) marked `listening={false}` to avoid hit-testing cost.
- **Provider response drift** — Gemini returns clean JSON; GPT often wraps in markdown fences. A robust regex extracts the JSON array from either.
- **Windows file-locking on `/delete`** — `StaticFiles` may hold a handle on the uploaded image; mitigated with a retry loop (0.25 s delay).
- **Diagram-vs-text ambiguity** — vision models flag colored options or margin notes as "diagrams". The interactive refinement step exists precisely because no prompt fixes this fully.
- **No auth, CORS = localhost only** — explicitly a local/dev tool today.

### 3.5 Tools
`next` 16.2.3, `react` 19.2.4, `konva` 10.2.5, `react-konva` 19.2.3, `use-image`, `tailwindcss` v4, `fastapi` 0.111, `uvicorn`, `pillow`, `numpy`, `python-multipart`, `python-dotenv`, `google-genai`, `openai`. External: Google Gemini API, OpenAI API.

---

## 4. Project 3 — `question-extractor-tool/`

### 4.1 Purpose
Convert an exam's questions PDF + answers PDF (+ optional solutions PDF) into a single structured JSON of questions, options, and answers — using OpenAI GPT-4 Vision with **per-question-type prompts**.

### 4.2 Tech stack
- **Frontend** (Vite 7): React 19.1, react-router-dom 6.28, Tailwind v4 + `@tailwindcss/vite`, `@vitejs/plugin-react-swc` 3.10
- **Backend** (Flask 3.0 — *not* FastAPI): Flask-CORS 4, PyMuPDF (`fitz`) ≥1.23, `pdf2image` 1.17, Pillow ≥10.2, OpenAI ≥1.12, PyPDF2 3.0.1, `python-dotenv`, `flask-restful`, `gunicorn` 21.2 (production WSGI), Werkzeug 3.0.1

### 4.3 End-to-end pipeline
1. **Upload** (`POST /api/upload/files`) — three PDFs (questions required, answers required, solutions optional, max 50 MB each). UUID session ID, files stored under `/uploads/{session_id}/`.
2. **Metadata** (`POST /api/process/metadata`) — exam, subject, module dropdowns + per-section name + question type. Conditional dropdowns (e.g. JEE → Physics/Chemistry/Maths; Allen modules → O-1, O-2, S-1…).
3. **Step 1 — PDF → images** — PyMuPDF renders every page at **300 DPI** PNG, no margins, into `questions_images/`, `answers_images/`, `solutions_images/`.
4. **Step 2 — vision extraction** — OpenAI GPT-4o per page:
   - Image resized to 1024×1024 max, JPEG quality 85 (cost control)
   - `temperature 0.1`, `max_tokens 4000`, retries up to 3 with 2 s backoff
   - Single-image batching (`max_batch_size = 1`) for reliability
   - Prompt chosen by `prompt_selector.py` from question type
5. **Step 2b — answer extraction** — separate `answer_extraction_prompt.py` produces `{section: {q_num: "letter"}}`
6. **Step 3 — merge** (`POST /api/process/step3/<session_id>`) — `JSONMerger.merge_json()` joins questions + answers; `normalize_section_name()` strips parentheses / collapses spaces; user can map aliases via `SectionAliasMapping` UI when names diverge ("Exercise (O-1)" vs "Exercise O-1")
7. **Results** — preview JSON, edit, download (JSON only or JSON + images ZIP)

### 4.4 Per-question-type prompts (`backend/prompts/`)
| Type | File | Key rules |
|---|---|---|
| Base / fallback | `base_prompt.py` | Extract `question_number`, `question_text`, `options[]`, LaTeX for math, JSON validity |
| Single correct | `single_correct_prompt.py` | Exactly 4 options, normalised (A)–(D); units / symbols emphasised for physics/chemistry |
| Multiple correct | `multiple_correct_prompt.py` | 4 options; recognises "select all that apply", partial-marking notes |
| Comprehension | `comprehension_prompt.py` | Passage repeated for each linked question; sequential numbering |
| Matrix match | `matrix_match_prompt.py` | Column I ↔ II; permutation options ("A: 1-P, 2-Q, 3-R, 4-S"); multiple matrices → multiple questions |
| Subjective | `subjective_prompt.py` | `options: []`; captures sub-parts (a, b, c); derivation/proof keywords |
| Answer extraction | `answer_extraction_prompt.py` | Section → {q_num: letter} from answer-sheet pages |

`prompt_selector.py` is the single switch; every prompt receives `exam_name`, `subject`, `module`, `chapter` injected as context.

### 4.5 Frontend flow
- React Router v6: `/` (HomePage upload), `/preview/:sessionId` (PDF + metadata form), `/processing/:sessionId` (3-step progress, results view)
- State: Context API + reducer (`AppContext`)
- Components: `FileUploadSection`, `DragDropZone`, `PDFViewer`, `MetadataForm`, `ProcessingProgress`, `ProcessingSteps`, `ProcessingResults`, `SectionAliasMapping`, `ErrorAlert`
- API client wraps `fetch` with central error handling
- `sectionOptions.js` holds the conditional dropdown trees per exam/module

### 4.6 Project docs (root of subproject)
- **Objective.md** — Phase 1 goal + UI mockups + tech list
- **Roadmap.md** — 10 phases, risk mitigation (API costs, large files, latency)
- **Phase3Modification.md** — adds exam/subject/module dropdowns + Allen module conventions
- **Updates.md** — module-to-section maps (Resonance, PW, Motion, Unacademy)
- **progress_report.md** — ~85 % done; phases 1–4 complete, phase 5 (vision integration) ongoing
- **EarlierCode.md** — original prototype (PyMuPDF margin-cropping with margins 72/62/30/42), shows evolution to current modular system
- **README.md** — install / setup / env config

### 4.7 Notable problems (and mitigations)
- **Vision API cost** — image resized to 1024×1024 + JPEG 85 + `max_tokens 4000` cap
- **300 DPI tradeoff** — high quality but heavy disk + slow; chosen because OCR fidelity on small math symbols matters more than disk space
- **Invalid JSON from vision** — retries (3×, 2 s), strict prompt rules, single-image batching
- **Section-name mismatches between question + answer PDFs** — `normalize_section_name()` + manual `SectionAliasMapping` UI; future: fuzzy matching
- **Prompt sprawl** — 6 specialised prompts; centralised via `prompt_selector.py` to keep maintenance bounded
- **Flask + threading for background processing** — works at current scale but limits concurrency; FastAPI + async noted as future migration
- **Filesystem-only sessions** — UUID folders grow with 300 DPI PNGs; no eviction policy yet; single-server assumption

### 4.8 Tools
Frontend: `react`, `react-dom`, `react-router-dom` 6, `tailwindcss` v4, `@tailwindcss/vite`, `vite` 7, `@vitejs/plugin-react-swc`, `eslint`. Backend: `Flask`, `Flask-CORS`, `PyMuPDF`, `pdf2image`, `Pillow`, `openai`, `PyPDF2`, `python-dotenv`, `requests`, `flask-restful`, `gunicorn`, `Werkzeug`. External: OpenAI GPT-4o vision API.

---

## 5. Project 4 — `question-image-verifier/`

### 5.1 Purpose
Batch-crop question/option images from exam scans, attach the crops to question metadata, store images in Supabase Storage, and persist URLs into the MongoDB `questions` collection.

### 5.2 Tech stack
- **Frontend** (Vite 6): React 19, react-router-dom 7.2, `@supabase/supabase-js` 2.49, `axios` 1.7, `react-easy-crop` 5.4, `react-rnd` 10.5 (declared but unused — custom `DraggableBox` does the work), Tailwind v4
- **Backend** (FastAPI ≥0.68): Uvicorn, `python-multipart`, `pymongo` + `bson`, Pillow, `opencv-python-headless` 4.10 (Canny + contour auto-crop), `python-dotenv`, `pydantic`, `pytest` + `httpx`, Supabase Python SDK, `firebase-admin` (declared, unused)

### 5.3 End-to-end pipeline
1. User selects one or many images → `ImageMultipleRegions` controller fetches matching question docs from MongoDB by `file_name`
2. Draws / resizes boxes with custom `DraggableBox` (8-point handles, 30 px minimum, right-click delete)
3. Optionally uses `react-easy-crop` for free-form selection (zoom 0.5–3 ×, grid overlay)
4. Sidebar `QuestionsPreview` toggles `isQuestionImage` / `isOptionImage` per question; "Add Box" creates an associated crop
5. Canvas `toBlob()` produces JPEG; uploaded to Supabase bucket `Images` (URL `https://jrekcngltfkghrgzgvju.supabase.co/storage/v1/object/public/Images/<file>`)
6. MongoDB document updated via FastAPI (`PUT /questions/{id}` or `POST /questions/bulk`) — only the modified-question set is sent
7. `ProgressModal` tracks per-question upload progress; success modal shows count updated

### 5.4 Storage + DB
- **Supabase Storage** — bucket `Images`, public read URLs, file naming `{question_number}` or `{question_number}_option{N}_{fileName}.png`
- **MongoDB** — DB `pdftoppt`, collection `questions`, schema includes `question_id`, `file_name`, `question_number`, `question_text`, `isQuestionImage`, `question_image`, `isOptionImage`, `options[]`, `option_images[]`, `section_name`, `topic`, `exam_name`, `subject`, `chapter`, `answer`

### 5.5 Deployment
- **Backend**: dual configs in `backend/`
  - `vercel.json` (entry `api/index.py` → `app.main:app`, max 15 MB lambda, `PYTHONPATH=.`)
  - `railway.json` (Nixpacks, `uvicorn app.main:app --host 0.0.0.0 --port $PORT`, healthcheck `GET /` 100 s, `ON_FAILURE` restart up to 10×) — preferred (no cold-start cap)
- **Env**: `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_BUCKET`, `MONGODB_URI`, `MONGODB_DB_NAME`, `FRONTEND_URL`, `ENVIRONMENT` (controls CORS — `*` in dev, allowlist in prod)
- **Frontend**: Vite static SPA; environment.js currently points to `https://question-banks.netlify.app/api`

### 5.6 Notable problems
- **Supabase + MongoDB consistency** — image URLs duplicated; no transaction, so MongoDB-write failure after Supabase upload leaves orphans
- **Crop coords ephemeral** — bounding boxes in React state only; refresh loses them (no localStorage / draft autosave)
- **Auto-crop fragility** — fixed Canny thresholds (50–150) + min area 5000 fail on low contrast / handwritten scans
- **Format mismatch** — frontend uploads JPEG, `supabase_client.py` hard-codes `Content-Type: image/png`
- **`react-rnd` declared but unused** — dead dependency; custom `DraggableBox` replaces it (kept because it gave finer cursor / min-size control)
- **CORS** — origin allowlist driven by `FRONTEND_URL` env; misconfigured envs silently break uploads
- **`VITE_SUPABASE_SERVICE_KEY` exposed in frontend `.env`** — service role keys should never be on the client; this is a known security debt

### 5.7 Tools
Frontend: `react`, `react-dom`, `react-router-dom` 7, `@supabase/supabase-js`, `axios`, `react-easy-crop`, `tailwindcss` v4, `vite`, `prop-types`. Backend: `fastapi`, `uvicorn`, `pymongo`, `bson`, `pillow`, `opencv-python-headless`, `pydantic`, `python-dotenv`, `pytest`, `httpx`, Supabase Python SDK. External: Supabase Storage, MongoDB Atlas, Vercel / Railway hosting.

---

## 6. Project 5 — `ws-questions-b/`

### 6.1 Purpose
Standalone Node.js WebSocket relay for folder-scoped real-time collaboration. Near-identical twin of `eduents/scripts/start-collaboration-server.js` — same wire protocol, same room model, just packaged as ES modules instead of CommonJS so it can run independently.

### 6.2 Tech stack
- Node.js (`"type": "module"`)
- `ws` 8.18
- Port 3001
- Run via `npm run dev` (`node src/index.js`)

### 6.3 Behaviour
- **Connect**: client must supply `?folderId=&userId=&userName=`; missing any → `close(1008, 'Missing required parameters')`
- **Rooms**: `Map<folderId, Set<{ws, userId, userName, folderId}>>`
- **Join**: add to room (create if absent) → broadcast `{type:'presence', action:'joined', ...}` to others → send roster `{type:'presence', action:'room_state', users:[...]}` to the new user
- **Message**: parse JSON, forward to every user in the room **except the sender** (skip closed sockets via `readyState === WebSocket.OPEN`)
- **Leave**: on `close` / `error`, remove from room, delete room if empty, broadcast `{action:'left'}`
- **Shutdown**: `process.on('SIGINT')` closes the server cleanly
- **No DB writes** — durable audit lives in `eduents`'s `FolderChangeLog`, written by server actions

### 6.4 Tools
`ws` only. Standard Node APIs (`URL`, `JSON`, `Map`, `Set`, `process`).

---

## 7. Cross-cutting Architecture

### 7.1 Inter-app contract
The main `eduents` app is the **system of record**. The four satellites call it cross-origin:
- `image-auto-cropper/` and `question-image-verifier/` push extracted/verified images and metadata back into MongoDB (the verifier writes directly; the cropper produces ZIPs the user re-uploads)
- `question-extractor-tool/` produces structured JSON intended for ingestion into the `Question` bank
- `ws-questions-b/` is an interchangeable replacement for the in-process collab server — useful when the main app is deployed serverless and a long-lived WebSocket process is needed elsewhere

CORS allowlist in `eduents/middleware.ts` defines exactly which satellite origins may call `/api/*`. **Known drift**: the allowlist still references the *old* satellite names (`question-editor.vercel.app`, `multi-crop.vercel.app`); if the deploys have been renamed, this list needs updating.

### 7.2 Shared themes
- **Vision LLMs as first-class extraction engines** — three of the five projects use OpenAI GPT-4o / GPT-5.4 and/or Google Gemini 2.0 Flash for diagram detection or question extraction. All share the same hard-won lessons: image preprocessing matters (resize + JPEG compression for cost; EXIF rotation for coordinate alignment); prompt engineering is per-task (different prompt per question type, separate prompts for detection vs. extraction); JSON output needs defensive parsing (LaTeX backslash escape repair, retries).
- **Bounding-box workflows** — both `image-auto-cropper` (Konva) and `question-image-verifier` (custom `DraggableBox` + `react-easy-crop`) implement interactive bbox refinement. Both keep coordinates in original-image space and convert on render to handle zoom/scale.
- **Supabase Storage + MongoDB** as the standard image + metadata pair across `eduents` and `question-image-verifier`.
- **Per-app deployment targets** — Vercel (Next.js apps + one FastAPI backend), Netlify (CORS allowlist suggests historical use), Railway (preferred for the FastAPI verifier backend), local-only (`image-auto-cropper`).

---

## 8. Master tools & technologies list

**Languages**: TypeScript, JavaScript (ES modules + CommonJS), Python 3.8+

**Frameworks**: Next.js 15 (App Router), Next.js 16 (bleeding edge), React 19, Vite 6 / 7, FastAPI, Flask, Tailwind CSS v4

**UI / canvas / interaction**: Radix UI, Lucide React, Framer Motion, Sonner, React Select, next-themes, Konva + react-konva, react-easy-crop, react-rnd (declared), custom `DraggableBox`, `@napi-rs/canvas`, Sharp, Canvg

**State / data fetching**: Zustand, TanStack React Query, React Context + reducer, Axios

**Auth**: Clerk (`@clerk/nextjs`), NextAuth + prisma-adapter (legacy)

**Routing**: Next.js App Router, react-router-dom v6 + v7

**ORM / DB**: Prisma 6 (custom output path, `binaryTargets` for `rhel-openssl-3.0.x`), MongoDB Atlas (via Prisma + raw `mongodb` driver + PyMongo)

**Real-time**: `ws` 8.18 (WebSocket server), folder-scoped rooms, `FolderChangeLog` for durable audit

**PDF / document processing**: Puppeteer + `puppeteer-core` + `@sparticuz/chromium` (serverless), `pdfjs-dist`, `html2pdf.js`, PyMuPDF (`fitz`), `pdf2image`, PyPDF2

**Image processing**: Pillow, Sharp (EXIF rotation, resize), OpenCV (Canny + contour auto-crop), NumPy, Canvg

**Math rendering**: MathJax 3 (Node + CDN), KaTeX (`react-katex`), custom `jaxUtils.ts`

**AI / LLM**: OpenAI Python + JS SDKs (`gpt-4o`, `gpt-5.4`, `gpt-4o-mini`), Google `@google/genai` + `google-genai` Python (Gemini 2.0 Flash)

**Storage**: Supabase Storage (`@supabase/supabase-js`, Supabase Python SDK), filesystem (per-session UUID folders for the extractor)

**Email / SMS / webhooks**: Nodemailer (Gmail SMTP), Resend (provisioned), Twilio (provisioned), Svix

**Build / packaging**: Bun (lockfile), npm, `@vitejs/plugin-react-swc`, ESLint 9, copy-webpack-plugin, Gunicorn (Flask prod), Uvicorn (FastAPI), Nixpacks (Railway)

**Deployment**: Vercel, Netlify, Railway, local Node/Uvicorn

**Testing**: pytest + httpx (verifier backend); no JS test runner configured anywhere

---

## 9. Resume bullets

Pick and tailor for the role you apply to. Each bullet is grounded in actual code in this workspace.

**Full-stack / Next.js**
- Built and shipped a production EdTech platform on **Next.js 15 (App Router) + React 19 + Prisma + MongoDB** with **Clerk** auth, **Zustand**, **TanStack Query**, **Tailwind v4**, and **Radix UI** primitives.
- Designed a **Prisma schema** spanning two domains (collaborative question bank + examination/OMR) with a shared `Question` model referenced by four relations; used **fractional-index ordering** on `FolderQuestion.position` to support concurrent reordering without renumbering.
- Implemented a single **Clerk middleware** that handles three concerns in one pass — CORS preflight for satellite tools, auth gate, and onboarding completion gate — across the `/api/*` and `(dashboard)` routes.
- Added a **role-aware multi-step onboarding flow** (teacher / student / coaching institute) writing into separate 1:1 profile models and persisting completion via Clerk session metadata.

**PDF generation**
- Engineered **server-side PDF generation** with Puppeteer + `@sparticuz/chromium` and a **singleton browser** with retry-on-disconnect, dropping warm-invocation overhead from ~4 s to ~600 ms on serverless.
- Configured a custom **Prisma output path** (`./generated/prisma`) and a build-time webpack plugin to copy the `rhel-openssl-3.0.x` query engine into `.next/server`, fixing a recurring "query engine not found" failure on Vercel/Netlify.
- Built **math-rendering parity utilities** spanning MathJax 3 (server) and KaTeX (client), patching SVG display, alignment, and fill before Puppeteer screenshots so PDF output matched on-screen rendering.

**Real-time collaboration**
- Implemented a **folder-scoped real-time collaboration system** on a Node.js `ws` server (port 3001) with in-memory rooms keyed by `folderId`, presence broadcasts, and a strict `?folderId=&userId=&userName=` connection guard (close code 1008).
- Kept the WebSocket as a **dumb broadcast relay**, pushing all durable state into an append-only `FolderChangeLog` written by server actions — eliminating double-write risk and giving a clean audit trail.
- Packaged a **standalone Node ESM twin** of the in-process collab server so it can run as an independent service when the main app is deployed serverless.

**AI / vision LLM pipelines**
- Built an end-to-end **PDF/scan → structured Q&A JSON pipeline**: PDF → 300 DPI PNG (PyMuPDF) → image compression (1024×1024, JPEG 85) → **OpenAI GPT-4o** vision call with per-question-type prompts → answer-sheet extraction → JSON merge with section-name normalisation and user-driven aliasing.
- Engineered **six specialised vision prompts** (single-correct, multiple-correct, comprehension, matrix-match, subjective, answer extraction) selected dynamically by `prompt_selector.py`, each enforcing JSON validity and LaTeX math notation; added retry-with-backoff (3×, 2 s) and single-image batching for reliability.
- Built a **dual-provider diagram detector** (Google Gemini 2.0 Flash + OpenAI GPT-5.4) with consistent prompt contract, robust JSON extraction (markdown-fence aware), and bbox clamping/min-size validation; integrated **Konva** canvas refinement with 8-point transformer, zoom (30 %–300 %), and grid overlay.
- Solved a class of **silent EXIF-rotation bugs** where vision models auto-rotate images but Sharp/Pillow operate on raw pixels — every image passes through `sharp(...).rotate()` before detection and cropping so bbox coordinates align with the actual file.

**Backend / APIs**
- Authored **all mutations as Next.js server actions** (organised under `actions/<domain>/`) with a 10 MB `bodySizeLimit` for HTML/PDF payloads; reserved `app/api/*` for cross-origin calls from satellite tools.
- Built a **FastAPI image-verification backend** (PyMongo, OpenCV auto-crop, Pillow, Supabase Storage SDK) with environment-aware CORS, dual deployment configs (Vercel + Railway), and a typed Pydantic interface.
- Built a **Flask + Gunicorn** backend orchestrating PDF rasterisation, vision-API calls, and JSON merging; threaded background jobs with per-session status JSON for real-time progress tracking.

**OMR & analytics**
- Implemented an **OMR (Optical Mark Recognition) endpoint** that grades sheets, creates `Student` records (separate from the auth-linked user model), writes `StudentResponse` + per-question `TestAnswer` rows, and computes score / percentage in one server action.

**Image storage / cross-app integration**
- Integrated **Supabase Storage** as the canonical image bucket across two apps; persisted public URLs into MongoDB question metadata with per-question modified-set tracking to avoid full-batch updates.
- Maintained a **CORS allowlist** in middleware coordinating five deployed origins (main app + four satellite tools) so cross-origin POSTs to `/api/questions`, `/api/omr/*`, and `/api/school-test/*` worked without per-route boilerplate.

---

## 10. Blog post draft

> **Title suggestion:** *"Building an EdTech Platform from Five Repos: Vision LLMs, Real-Time Collab, and the PDF Pipeline that Won't Quit"*

### 10.1 Outline

1. **Why five repos instead of one** — independent deploy targets, different runtimes (Next.js 15 vs. 16, Node vs. Python), satellite tools that can be replaced or scaled separately, a CORS contract that keeps them honest.
2. **The data model** — one Prisma schema, two domains. Why `Student` is *not* a `User` with `role: "student"`. The four-way `Question` relation and why Prisma forces explicit relation names.
3. **Fractional indices for collaborative reordering** — the "pick a float between neighbours" trick, the failure mode (collisions), the mitigation (deterministic tie-breaker on question ID).
4. **The PDF pipeline that wouldn't die** — Puppeteer cold starts on serverless, the `@sparticuz/chromium` binary, why the singleton helps within a warm Lambda but never across cold starts, and the build-time webpack hack to ship the right Prisma query engine into `.next/server`.
5. **MathJax on the server, KaTeX on the client** — why we kept both, where they drift, and the patches in `jaxUtils.ts` that make Puppeteer screenshots match on-screen rendering.
6. **Vision LLMs are 80 % preprocessing** — image resize + JPEG compression for cost, EXIF rotation for coordinate alignment, defensive JSON parsing for backslash-escaped LaTeX, retries for partial outputs. Per-question-type prompts because one prompt can't extract a matrix-match and a comprehension passage.
7. **Two providers, one prompt contract** — running the same diagram-detection prompt against Gemini 2.0 Flash and GPT-5.4 to A/B accuracy and cost, and the small parser differences (Gemini returns clean JSON, GPT often wraps in markdown).
8. **Real-time collab as a dumb relay** — broadcast in memory, persist via server actions, audit through an append-only log. Why this is better than persisting in the WebSocket and what it costs you.
9. **The CORS allowlist as system architecture** — five origins, one middleware, the legacy names that still haunt it, and the cost of forgetting to update the list when a satellite is renamed.
10. **What I'd do differently** — standardise on FastAPI for all Python backends, get the second Supabase project decommissioned, retire the unused `react-rnd` and `firebase-admin` deps, move service-role keys off the frontend, add a fuzzy section-name matcher to the extractor, and put the OMR grader behind a queue.

### 10.2 Problems faced and how they were overcome (long form)

- **"Query engine not found" in production.** Prisma's custom output path required the `rhel-openssl-3.0.x` engine to ship inside the Vercel function bundle. Fixed by adding a `copy-webpack-plugin` step in `next.config.ts` that copies the engine into `.next/server` at build time, and a CI guard that fails if the binary file is missing pre-build.
- **Phone-camera scans cropped the wrong region.** Vision models auto-rotate based on EXIF, but Sharp and Pillow both read raw pixels. Detected bboxes pointed to the *unrotated* coordinate space. Solved by uniformly applying `.rotate()` before sending to the LLM and before extracting the crop — both pipelines now share the same orientation contract.
- **Vision-model JSON broke `JSON.parse` half the time.** LaTeX fragments embedded in extracted text contained unescaped backslashes. Wrote `parseJsonLoose()` that doubles invalid escape sequences before parsing, plus a retry loop (3×, 2 s backoff) for partial outputs. Single-image batching (batch size 1) traded throughput for stability.
- **Section names didn't match between the questions PDF and the answers PDF.** "Exercise (O-1)" vs "Exercise O-1" vs "Excercise O1". Built `JSONMerger.normalize_section_name()` that strips parentheses and collapses whitespace, then a `SectionAliasMapping` UI that lets users manually map remaining mismatches before merge.
- **Onboarding redirect loops.** Middleware redirected anyone without `onboardingComplete` metadata; if the action that sets the flag failed silently, users bounced back to the form forever. Wrapped `completeOnboarding` in try/catch with explicit logging and a UI error boundary so the failure surfaces immediately.
- **Math rendered differently on server PDFs vs. on screen.** Server used MathJax-Node for full-page renders; client used KaTeX for speed. Same formula → different baselines, different fonts. `fixMathJaxForPDF()` normalises display blocks, alignment, and SVG fills before Puppeteer takes the screenshot — full parity wasn't achievable, but the visual delta is now consistently small.
- **Konva canvas perf with 4000 px scans.** Grid overlay and labels were re-hit-testing on every interaction. Marking those layers `listening={false}` cut interaction latency dramatically.
- **Concurrent reorder collisions.** Two users dragging questions simultaneously could pick identical fractional positions. Mitigated with a deterministic tie-breaker on `questionId` and a unique `(folderId, position)` index proposal — collisions still possible but no longer flap visually.
- **Service role keys in the frontend.** `VITE_SUPABASE_SERVICE_KEY` was being read by the verifier frontend. Identified as security debt; the path forward is to route uploads through the FastAPI backend and keep the service key server-side only.

---

## 11. Quick reference — file paths

```
project-eduents/
├── eduents/                                        Next.js 15, primary app
│   ├── middleware.ts                               CORS + auth + onboarding gate
│   ├── prisma/schema.prisma                        Two domains, four Question relations
│   ├── scripts/start-collaboration-server.js       WebSocket collab server (port 3001)
│   ├── lib/school-test/openai.ts | gemini.ts       Vision LLM clients
│   ├── lib/pdf/browserSingleton.ts                 Puppeteer singleton + retry
│   ├── lib/jaxUtils.ts                             Math parity patches
│   ├── actions/htmlToPdf/htmlToPdf.ts              HTML → PDF entry point
│   └── app/api/{omr,school-test,questions}/        Cross-origin entry routes
├── image-auto-cropper/
│   ├── frontend/ (Next.js 16 + Konva)              Canvas refinement UI
│   └── backend/main.py + services/                 Gemini + OpenAI detection
├── question-extractor-tool/
│   ├── frontend/ (Vite 7 + React Router 6)        Upload + metadata + processing UI
│   └── backend/app.py + prompts/                   Flask + per-question-type prompts
├── question-image-verifier/
│   ├── frontend/ (Vite 6 + React 19)              Multi-image bbox editor
│   └── backend/app/{main.py,database.py,api/}     FastAPI + PyMongo + Supabase
└── ws-questions-b/src/index.js                     Standalone WebSocket twin
```
