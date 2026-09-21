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

**Angular CLI 11 requires Node 12.x or 14.x.** Nothing in this repository can be
served, built, linted or tested on a modern Node. There is no `.nvmrc`, and
`package.json` declares the constraint under the misspelled key `"engine"`, so
npm does not enforce it.

```bash
nvm use 14      # or: nvm install 14
npm ci          # node_modules is not committed
```

If `nvm` is unavailable, **stop and report the blocker** rather than attempting a
run on the system Node. A failure caused by the wrong Node version is not a
finding about the code under test.

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

> **Important caveat.** The committed specs are currently **unmodified Angular
> CLI stubs and do not pass.** All 35 `*.spec.ts` files are generated
> scaffolding; `src/app/app.component.spec.ts` fails to compile because it
> asserts `app.title`, a property `AppComponent` does not define. The Protractor
> spec asserts against `.content span`, which does not exist in the template.
>
> Do not treat a failing suite as a regression introduced by the change under
> test. Establish whether the failure pre-exists by running the suite on a clean
> checkout first, and say so explicitly in the smoke test report.

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
