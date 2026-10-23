# Spec — P4 · qa-playbook

## Goal

Provide a public, pragmatic engineering playbook that documents how Maikon designs, implements, and maintains test automation and quality systems. Every practice is illustrated with real code, commits, and lessons learned from P1 (`playwright-reference-suite`), P2 (`failure-classifier`), and P3 (`ai-ci-triage`). No generic textbook theory.

## System Under Test & Deployment

- **Stack:** VitePress (Node 24, Vue 3, static site generator) with TypeScript.
- **Hosting & CI:** GitHub Pages via GitHub Actions on `main` push.
- **Audience:** Senior engineers, QA leads, engineering managers, and technical recruiters assessing hands-on software quality leadership.

## Content Architecture (v1 — 8 Core Chapters)

Each chapter pairs a clear engineering principle with concrete, referenced code from P1–P3:

1. **Strategy by Risk Layer (Pyramid vs. Trophy):**
   - Unit-first default; integration for HTTP/contracts; E2E strictly for critical business flows (`@critical` ring).
   - Real benchmark: P1 Conduit suite running 17 critical tests in ~10 s vs. full nightly sweep (59 tests across 3 browser shards).

2. **Writing Deterministic Test Cases:**
   - Independent test isolation; eliminating state dependencies on pre-existing database records.
   - Real case: P1 `/api/tags` returning only top 10 tags causing false negatives vs. explicit per-test tag creation in `/api/articles`.

3. **Actionable Bug Reports (The Two-Layer Pattern):**
   - Structure: Business impact layer (who hurts, revenue/risk) + Technical layer (route, payload, 3–5 lines of log).
   - Real case: P1 Conduit feed freezing in "Loading articles..." on HTTP 500, marked with `test.fail()`.

4. **Defect vs. Technical Debt Classification:**
   - 3-gate decision tree: observable behavior break -> declared requirement violation -> parent linkage.
   - Preventing metric distortion: why UI drift belongs in Tech Stories and not in Bug reports.

5. **Flaky Test Policy & Root Cause Resolution:**
   - Quarantine with expiration vs. silent skips; zero-tolerance on uninvestigated skips.
   - Real case: P1 false-positive `toBeHidden()` assertion passing before DOM render.

6. **Deterministic Failure Triage in CI/CD:**
   - Distinguishing product bugs, environment outages, and test drift without LLM unreliability.
   - Real case: P2 `failure-classifier` rules, classification matrix, and exit code policies.

7. **AI-Assisted CI Diagnostics & Ethical Boundaries:**
   - Advisory vs. Gatekeeper: LLMs propose root cause, deterministic rules decide merge gates.
   - Real case: P3 `ai-ci-triage` Groq integration, context redaction, and honest benchmark reporting (5/10 to 10/10 nuances).

8. **One-Page Test Plan & Architecture Decision Records (ADR):**
   - Lean 1-page test plan template; documenting trade-offs in 10-line ADRs.

## Design & Usability Rules

- Fast, clean, dark-mode-first aesthetic matching modern developer tools.
- Copy-pasteable snippets and direct outbound links to files and lines in P1, P2, and P3 repositories.
- Zero boilerplate filler or inflated marketing buzzwords.

## Out of Scope (v1)

- Complex interactive backend / playground APIs (pure static site).
- Extended enterprise process chapters (reserved for v2 in Weeks 25–26).

## Done When

- [ ] VitePress configured with clean navigation and dark/light theme support.
- [ ] All 8 chapters written in Portuguese, linking to exact commits/files in P1–P3.
- [ ] Local build (`npm run build`) passes with zero broken markdown links.
- [ ] GitHub Actions workflow deploys cleanly to GitHub Pages.
- [ ] Site verified live on GitHub Pages with working navigation and responsive mobile layout.
