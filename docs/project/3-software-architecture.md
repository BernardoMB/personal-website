# Software Architecture

---

## Tech Stack

| Layer            | Technology                                                                 | Version    |
| ---------------- | -------------------------------------------------------------------------- | ---------- |
| Framework        | Angular (NgModule-based, no standalone components)                          | 11.0.0     |
| Language         | TypeScript (exact pin, no caret)                                            | 4.0.2      |
| UI components    | Angular Material + CDK                                                      | 11.x       |
| Styling          | SCSS with the legacy Angular Material Sass theming API                      | —          |
| Reactive runtime | RxJS                                                                        | 6.6        |
| i18n             | `@ngx-translate/core` + `@ngx-translate/http-loader`                        | 13 / 6     |
| Charts           | `@swimlane/ngx-charts`                                                      | 18         |
| PDF              | `ng2-pdf-viewer`                                                            | 7          |
| Carousels        | `ngx-swiper-wrapper` + `swiper`                                             | 9 / 5.4    |
| Effects          | `ng-particles` + `tsparticles`, `typed.js`, `html2canvas`                   | —          |
| Icons            | FontAwesome (`@fortawesome/angular-fontawesome` + free icon packs)          | 0.8 / 5.15 |
| Dates            | `moment`                                                                    | 2.29       |
| Unit tests       | Karma + Jasmine                                                             | 5.1 / 3.6  |
| E2E tests        | Protractor                                                                  | 7.0        |
| Linting          | tslint + codelyzer (both deprecated upstream)                               | 6.1 / 6.0  |
| Build / CI       | Angular CLI, Azure Pipelines                                                | 11.0.7     |
| Hosting          | Azure Web App (`bernardomondragon`)                                         | —          |

## Key Architectural Decisions

### Client-only SPA with compile-time content

All portfolio, CV, hobby and skill data lives in TypeScript constants inside
in-memory Angular services. There is no CMS, no API for content and no database.
Services wrap their constants in `new Observable(...)` with a `setTimeout` to
simulate latency (0 ms for projects, 1000 ms for hobbies) so the shared loading
bar has something to react to. Consequence: **any content change is a code
change and a redeploy.**

### Lazy-loaded feature modules

Five feature areas (`about`, `experience`, `projects`, `hobbies`, `coffee`) are
lazy-loaded; the landing page and app shell are eager. Each lazy module imports
`SharedModule` and re-registers `TranslateModule.forChild` using the
`HttpLoaderFactory` exported from `app.module.ts`.

### Strict templates, loose TypeScript

`tsconfig.json` sets `strict: false` but enables `strictTemplates`,
`strictInjectionParameters` and `strictInputAccessModifiers`. Templates are
type-checked more rigorously than the TypeScript itself. `baseUrl: './'` means
both relative and `src/app/...`-style imports resolve, and both styles appear in
the codebase.

### Runtime theming via a global CSS class

`ThemeService` holds the selected theme; `AppComponent` subscribes and uses
`Renderer2` to apply the theme class to `document.body` **and** to the CDK
`OverlayContainer` element, removing the previous class via `pairwise()`. The
choice persists in `localStorage` under `theme`.

### Component stylesheets that are also global

`src/scss/component-themes.scss` `@import`s nine component SCSS files directly
so their `*-theme` mixins can participate in Material theming. Those nine
stylesheets are therefore **both** Angular-scoped component styles **and**
globally compiled into `styles.scss`. Editing them affects global CSS. Affected:
header, sidebar, footer, loadingbar, shared/scroll-to-top, scroll-indicator,
ng-feedback-theme, landing, projects/projects-root.

### No state management library

There is no NgRx, Akita or equivalent. State is component-local plus a small
number of RxJS `Subject`s (`LoaderService`, `ThemeService`). The root `README.md`
has an "NgRx" feature heading; it is stale — `ngrx` appears in neither
`package.json` nor anywhere under `src/`.

## Frontend Architecture

`MainComponent` is the shell: a `mat-sidenav-container` holding the sidebar,
with `app-header`, the `router-outlet` and `app-footer` in the content area.
Outside the container sit the floating feedback widget and the scroll-to-top
button. Routing uses `scrollPositionRestoration: 'top'`, `anchorScrolling:
'enabled'`, a 64 px scroll offset and no hash routing.

Two route resolvers exist (`ProjectDetailResoverService` — note the misspelling
— and `HobbiesResolverService`); both drive the loading bar. There are **no
route guards and no HTTP interceptors**.

Custom injection tokens for `window` and `document` live in
`src/app/providers/`, each with an abstract `Ref` class, a browser
implementation and an `isPlatformBrowser`-guarded factory. Note that
`document.provider.ts` exports its own `DOCUMENT` token which shadows the one
from `@angular/common`; both are used in different files, which is a known
footgun when adding imports.

## Backend / API Architecture

None in this repository. `src/app/services/contact.service.ts` is the only
service that performs HTTP, against three hardcoded AWS Lambda endpoints behind
one API Gateway host. Each call surfaces failures with a browser `alert()` and
rethrows. The Lambda source is not in this repo and is not versioned here.

The only other network traffic is `@ngx-translate/http-loader` fetching
`./assets/i18n/{lang}.json`.

## Data Access Layer

Not applicable — no database, no ORM, no client-side persistence beyond the
single `localStorage` theme key. See `4-database-model.md`.

## Security Model

There is no authentication and no authorization: every route is public and the
site is read-only for visitors. The security surface is therefore narrow but not
empty:

- **Deliberate HTML injection point.** Project descriptions are passed through `DomSanitizer.bypassSecurityTrustHtml` and rendered with `[innerHtml]` so inline `style` attributes survive. Hobby and CV descriptions also use `[innerHtml]`. This is acceptable only because the content is author-written and compiled in. Never wire these to a dynamic, user-supplied or third-party source without reinstating sanitization.
- **Unresolved payment-handling risk.** `/donate` POSTs the raw card number, expiry and CVV as JSON to a custom Lambda, with no tokenization and no PCI-compliant payment element, and the card number is written to the browser console during validation. This should be migrated to a hosted payment element (Stripe Elements or equivalent) or removed.
- **Secrets in the repository.** `README.md` ends with a section headed `Sec` containing three high-entropy strings that resemble Azure client secrets. They are already in git history; if live, they need rotating.
- No CSP, Subresource Integrity or security headers are configured in `web.config`.

## Environment Strategy

| Environment | Purpose               | URL / Endpoint                                 |
| ----------- | --------------------- | ---------------------------------------------- |
| Local       | Development           | `http://localhost:4200` (`:4204` for devices)  |
| Production  | Live site             | Azure Web App `bernardomondragon`              |

There is **no staging environment.** `environment.ts` and `environment.prod.ts`
differ only by the `production` boolean — no per-environment API URLs or keys.
The production build replaces the file, enables optimization, output hashing and
the build optimizer, and disables source maps.

### Deployment Mapping

This repository does **not** follow the framework's default `develop` → develop /
`main` → production convention. There is no `main` branch.

| Branch       | Target environment | Deployment workflow                        | Approval / protections                                  |
| ------------ | ------------------ | ------------------------------------------ | ------------------------------------------------------- |
| `develop`    | none (integration) | none — no CI runs on develop               | none                                                     |
| `release/*`  | **production**     | `azure-pipelines.yml` (`trigger: release/*`) | **none — pushing the branch deploys immediately**      |
| `master`     | none directly      | none                                       | receives `release/*` via pull request after the fact     |

> **⚠️ Operational hazard.** `azure-pipelines.yml` triggers on `release/*`, and
> the framework's Prepare Release protocol creates branches named
> `release/v[X.Y.Z]` **before** opening any pull request. Creating a release
> branch therefore builds and deploys to the live site with no review and no
> approval gate. Narrow the trigger or add a deployment approval before using
> `/prepare-release`.

Environment-specific secrets: the pipeline's `AzureRmWebAppDeployment@4` task
uses an Azure Resource Manager service connection configured in Azure DevOps.
No secret names are referenced from this repository.

## External Integrations

| Service                | Purpose                                              | Notes                                                                 |
| ---------------------- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| AWS Lambda / API Gateway | Contact email, feedback capture, donation submission | Three endpoints hardcoded in `contact.service.ts`. Source lives in separate repositories: [`buy-coffee-lambda`](https://github.com/BernardoMB/buy-coffee-lambda) and [`send-feedback-lambda`](https://github.com/BernardoMB/send-feedback-lambda). |
| Azure Web App          | Production hosting                                   | Deployed from `dist/` by Azure Pipelines.                              |
| Azure DevOps           | CI/CD pipeline execution                             | `dev.azure.com/bmondragonbrozon`.                                      |
| WhatsApp (`wa.me`)     | Primary contact channel                              | Client-side deep link; never touches the backend.                      |
| `@digikare/ngx-md-feedback` | Floating feedback widget                        | Captures a screenshot via html2canvas and POSTs to the feedback Lambda. |
| ImageKit / Imgur       | Remote hosting for some portfolio images             | Referenced by URL from `projects.service.ts`.                          |

## Testing Strategy

> **Current state, stated plainly**: the test suites are unmodified Angular CLI
> stubs and do not pass. All 35 `*.spec.ts` files are generated scaffolding —
> 34 contain a single `should create` assertion, declared without the providers
> or module imports their components actually require. `app.component.spec.ts`
> additionally fails to compile because it asserts `app.title`, which
> `AppComponent` does not define. The Protractor spec asserts against
> `.content span`, an element that does not exist. **No test has ever gated a
> deploy** — the Azure pipeline runs neither `ng test` nor `ng lint`.
>
> Treat the tiers below as the target model, and fixing the stubs as
> outstanding work.

### Overview

| Tier               | Tool               | Location            | When to use                                                |
| ------------------ | ------------------ | ------------------- | ---------------------------------------------------------- |
| **Unit / component** | Karma + Jasmine  | `src/**/*.spec.ts`  | Component logic, pipes, services. Run on every change.      |
| **End-to-end**     | Protractor         | `e2e/src/*.e2e-spec.ts` | Full user journeys through a real browser.             |
| **Ad-hoc scripts** | Manual / scratch   | ephemeral           | Fallback when no committed spec covers the feature yet.     |

### Automated Suite

```bash
# Unit tests (interactive; karma.conf.js sets singleRun:false, autoWatch:true)
npm test

# Single-run mode, suitable for CI
npx ng test --watch=false --browsers=ChromeHeadless

# End-to-end (starts a dev server, then runs Protractor against :4200)
npm run e2e
```

When writing real component specs, the current stubs are the wrong starting
point: components in this codebase inject `ContactService`, `DialogService`,
`Router`, `ActivatedRoute` and `TranslateService`, and their templates use
Material elements, Swiper and the `translate` pipe. A working spec needs
`TranslateModule.forRoot()`, `RouterTestingModule`, `HttpClientTestingModule`
and the relevant Material modules — or `NO_ERRORS_SCHEMA` as a deliberate
shortcut.

### Relationship Between Runbooks and Specs

Each smoke test runbook (`docs/testing/[section]/[feature].smoke-test.md`) is the
human-readable specification for a feature's key journeys. The corresponding
automated spec is the executable implementation of that runbook.

- Runbook steps should map 1:1 to test cases in the spec.
- The runbook is the source of truth for what is tested and why; the spec is the executable implementation.
- When a new feature gets a runbook, a corresponding spec should be created or updated as part of that feature's implementation.

### Ad-hoc Scripts (Fallback)

When no spec exists for a feature yet, AI agents write a temporary automation
script. These are not committed, are intentionally ephemeral, and should be
promoted to a committed spec once validated.

Note that `browser_automation.provider` is set to `none` in
`.ai-dev-workflow.yaml`: Playwright is not installed and the e2e suite is
Protractor. Agents that would drive a browser will self-skip.

See `docs/testing/README.md` for how to execute each tier in this repository.
