# Testing — Smoke Test Execution Guide

**Audience**: AI agents running smoke tests (smoke-tester agent, Cursor
`/smoke-tester` command, or equivalent).

The smoke test _process_ (inputs, output format, pass criteria, fail handling) is
defined in the [Smoke Test Protocol](../workflow/development-workflow/protocols/04-smoke-test-protocol.md).
This guide covers **how** to execute tests in this specific repo.

When a work item has graphical design references, runbooks may include optional
expected-vs-actual fidelity steps. Discover assets and record PASS/FAIL detail
per [`design-assets.md`](../workflow/development-workflow/design-assets.md) and
protocol `04`. Omit fidelity steps when no assets exist — do not invent a
baseline.

> **Browser automation is set to `none`** in `.ai-dev-workflow.yaml`. Playwright
> is not installed and this project's e2e runner is Protractor. Agents that would
> drive a browser will self-skip; that is expected, not a failure.

---

## 0. Environment Prerequisite — read this first

`azure-pipelines.yml` pins Node `14.x`. **Modern Node also works** — verified on
v24.21.0 — but only with the OpenSSL legacy provider enabled, because Angular
11's webpack 4 uses MD4 hashing that OpenSSL 3 rejects:

```bash
export NODE_OPTIONS=--openssl-legacy-provider   # required on Node 17+; omit on Node 14
npm ci                                          # node_modules is not committed
```

Without the flag, every `ng` command fails with
`ERR_OSSL_EVP_UNSUPPORTED: digital envelope routines::unsupported`. **That is an
environment error, not a finding about the code under test** — set the flag and
re-run before reporting anything.

Use `nvm use 14` instead if you need to reproduce CI exactly.

---

## 1. Read Context

Before running anything:

1. **Read the smoke test runbook** — provided by the human or located under `docs/testing/` (convention: `docs/testing/[section]/[feature].smoke-test.md`).
2. **Read the application source** for the pages under test — selectors, form structure, component patterns.

Routes available: `/home`, `/about/description`, `/about/biography`,
`/experience` (fragments `#cv`, `#resume`, `#activities`), `/projects`,
`/projects/:id`, `/hobbies`, `/donate`, `/not-found`.

---

## 2. Choose Execution Approach

```
Does a committed spec cover the feature under test?
  │
  ├─ Unit / component behaviour → src/**/*.spec.ts  (Karma + Jasmine)
  │
  ├─ Full user journey         → e2e/src/*.e2e-spec.ts  (Protractor)
  │
  └─ Neither                   → Ad-hoc manual walkthrough (Section 3)
```

> **Important caveat — verified, not assumed.** The committed specs are
> unmodified Angular CLI stubs and the unit suite **does not compile**. A run on
> 2026-09-21 produced exactly two TypeScript errors:
>
> - `src/app/app.component.spec.ts:26` — `Property 'title' does not exist on type 'AppComponent'` (file last modified 2020-11-12)
> - `src/app/directives/better-highlight.directive.spec.ts:5` — `Expected 2 arguments, but got 0` (file last modified 2021-03-18)
>
> `ng lint` is likewise red with 477 pre-existing errors across 39 files. The
> Protractor spec asserts against `.content span`, which does not exist in the
> template.
>
> **`ng build --prod` passes.** The application itself is healthy; only the test
> and lint scaffolding is not.
>
> Do not report any of these as a regression introduced by the change under test.
> State explicitly in the smoke test report which failures pre-existed.

---

## 2a. Run the Committed Test Suite

```bash
# Unit tests — interactive by default (karma.conf.js: singleRun false, autoWatch true)
npm test

# Single-run, CI-style
npx ng test --watch=false --browsers=ChromeHeadless

# End-to-end — boots a dev server on :4200, then runs Protractor against it
npm run e2e

# Lint (tslint + codelyzer; covers tsconfig.app, tsconfig.spec and e2e/tsconfig)
npm run lint
```

Coverage is written to `./coverage/personal-website` when the coverage reporter
is enabled; it is not wired into an npm script.

---

## 3. Ad-hoc Walkthrough (Fallback)

Use when no committed spec covers the feature.

### Start the application

```bash
nvm use 14
npm ci                    # first run only
npm start                 # → http://localhost:4200

# To exercise the site from a phone or tablet on the same network:
npm run serve-devices     # → http://0.0.0.0:4204
```

There are **no backing services to start** — no database, no local API. The only
outbound calls go to three AWS Lambda endpoints hardcoded in
`src/app/services/contact.service.ts`.

### What to verify by hand

| Area                | Check                                                                               |
| ------------------- | ------------------------------------------------------------------------------------ |
| Theming             | Switch light / dark / mint from the header and the sidebar. Reload — the choice persists via `localStorage.theme`. |
| Language            | Switch EN / ES. All visible copy changes. Note the language is **not** persisted across reloads by design. |
| Lazy routes         | Navigate to each feature route and confirm no raw translation keys (e.g. `HEADER.HOME`) appear — that signals a missing `TranslateModule.forChild`. |
| Landing scroll-spy  | Scroll `/home`; the header highlights the active section (top, services, skills, my-work, coffee, contact). |
| Contact form        | WhatsApp mode opens a `wa.me` link and never calls the backend. Email mode POSTs to the Lambda. Both require a message of 10+ characters. |
| Responsive          | Check at ≤450px — that is the recurring breakpoint across component stylesheets.      |

### Caution when testing `/donate`

The donation form transmits a raw card number, expiry and CVV to a live Lambda
endpoint, and logs the card number to the browser console during validation.
**Never enter a real card number when smoke testing.** Prefer inspecting the
form's validation behaviour without submitting.

### Cleanup

```bash
# Stop the dev server (Ctrl-C), then remove any scratch files created during the run
```

Nothing else needs tearing down — there is no database to reset and no seeded
state.

---

## Troubleshooting

| Symptom                                             | Cause / fix                                                                                  |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `ng` fails immediately with a Node version error     | Angular CLI 11 needs Node 12/14. Run `nvm use 14`.                                            |
| Raw keys like `ABOUT.TITLE` render instead of copy   | The lazy module is missing `TranslateModule.forChild` with `HttpLoaderFactory`, or the catalogue 404'd. |
| A style fix changes an unrelated page                | Nine component stylesheets are also globally imported via `src/scss/component-themes.scss`.    |
| `ng test` fails on `app.title`                       | Pre-existing. `app.component.spec.ts` is an unmodified CLI stub. Not caused by your change.    |
| Protractor fails on `.content span`                  | Pre-existing. `e2e/src/app.e2e-spec.ts` is the default CLI stub.                               |
| Translation JSON 404s in a deployed build            | `web.config` MIME configuration — see the deployment notes in the root `README.md`.            |
| A route unexpectedly lands on `/not-found`           | Check the link. `footer.component.html` links `/cv`, which is not a route; the correct path is `/experience`. |

---

## References

- **Smoke test process and output format**: [Smoke Test Protocol](../workflow/development-workflow/protocols/04-smoke-test-protocol.md)
- **Architecture and testing strategy**: [`docs/project/3-software-architecture.md`](../project/3-software-architecture.md)
- **Stack conventions**: [`docs/best-practices/STACK-SPECIFIC.md`](../best-practices/STACK-SPECIFIC.md)
