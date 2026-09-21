# Repository Architecture

---

## Overview

A single-project Angular 11 workspace — not a monorepo. One `angular.json`
project named `personal-website` builds the whole site from `src/`. There are no
workspace libraries, no nested packages and no build orchestration tool. The
repository also carries the AI development workflow framework (`docs/workflow/`,
`.claude/`, `.cursor/`, `scripts/`), which is documentation and tooling only and
is not part of the application build.

## Directory Structure

```
personal-website/
├── src/                          # Application source (50 MB, of which 49 MB is assets)
│   ├── app/
│   │   ├── components/           # 10 eagerly-loaded root components
│   │   ├── modules/              # 5 lazy-loaded feature modules
│   │   ├── shared/               # SharedModule: components, pipes, ThemeService
│   │   ├── services/             # Root-scoped services (contact, dialog, loader)
│   │   ├── providers/            # Window/Document injection tokens
│   │   ├── directives/           # Two highlight directives (learning exercises)
│   │   ├── app.module.ts         # Root module; also exports HttpLoaderFactory for i18n
│   │   └── app-routing.module.ts # Root routes
│   ├── assets/                   # Images, i18n catalogues, fonts, audio, résumé PDFs
│   ├── scss/                     # Global styles and the three theme definitions
│   └── environments/             # environment.ts / environment.prod.ts (production flag only)
├── e2e/                          # Protractor end-to-end suite
├── docs/                         # Project docs + AI workflow protocols (see below)
├── scripts/                      # AI workflow helper scripts (not part of the build)
├── changelog.d/                  # Release-note fragments
├── Technical design documents/   # Two PNG diagrams (tracked; note the spaces in the name)
├── angular.json                  # Build/serve/test/lint/e2e target configuration
├── azure-pipelines.yml           # CI/CD: builds and deploys to Azure Web App
├── tslint.json                   # Lint rules (tslint + codelyzer; deprecated upstream)
├── karma.conf.js                 # Unit test runner configuration
└── AGENTS.md                     # Entry-point instructions for AI coding assistants
```

## Applications / Services

One application. There is no backend in this repository.

| Name               | Path    | Description                                                              |
| ------------------ | ------- | ------------------------------------------------------------------------ |
| `personal-website` | `src/`  | The Angular SPA. Built to `dist/` and deployed to the Azure Web App `bernardomondragon`. |

Three AWS Lambda endpoints are consumed but not owned or defined here. They are
hardcoded in `src/app/services/contact.service.ts` under a single API Gateway
host: `SendEmailFromPersonalWebsiteMessage`, `SendFeedbackFromPersonalWebsite`
and `buymeacoffee`.

## Shared Packages / Libraries

No published or workspace-local packages. Sharing happens through two in-repo
Angular modules:

| Module         | Path                 | Exports                                                                                    |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------ |
| `SharedModule` | `src/app/shared/`    | `ScrollToTopComponent`, `CoolBorderComponent`, and the `CreditCardNumber`, `ReadTime` and `Reverse` pipes. Provides `ThemeService` at module scope. |
| `AppModule`    | `src/app/`           | Declares the 10 root components and both directives; registers the window/document providers and root services. Also exports `HttpLoaderFactory`, which every lazy module imports for `TranslateModule.forChild`. |

## Dependency Graph

```
AppModule (eager)
├── AppRoutingModule ──► MainComponent (shell: sidenav + header + outlet + footer)
│   ├── '' ─────────────► LandingComponent (eager)
│   ├── 'about' ────────► AboutModule      (lazy) ──► description | biography
│   ├── 'experience' ──► ExperienceModule  (lazy) ──► CV | Résumé PDF | Activities chart
│   ├── 'projects' ────► ProjectsModule    (lazy) ──► list | ':id' detail (route resolver)
│   ├── 'hobbies' ─────► HobbiesModule     (lazy) ──► list (route resolver)
│   ├── 'donate' ──────► CoffeeModule      (lazy) ──► donation form
│   └── '**' ───────────► NotFoundComponent
├── SharedModule ◄────── imported by every lazy feature module
└── HttpLoaderFactory ◄─ imported by every lazy module for TranslateModule.forChild
```

Feature modules depend on `SharedModule` and on `AppModule`'s
`HttpLoaderFactory`. They do not depend on one another.

## Common Commands

```bash
# Install dependencies
npm ci                    # requires Node 14.x — see Environment Setup

# Start development
npm start                 # ng serve  → http://localhost:4200
npm run serve-devices     # ng serve on 0.0.0.0:4204, for testing on real devices

# Build
npm run build             # ng build          → dist/
npx ng build --prod       # production build; this is what the pipeline runs

# Test
npm test                  # ng test (Karma + Jasmine, interactive, watches)
npm run e2e               # ng e2e  (Protractor)

# Lint / Format
npm run lint              # ng lint (tslint + codelyzer)

# Deploy
# Automatic. Pushing a release/* branch triggers azure-pipelines.yml, which
# builds and deploys to the Azure Web App. There is no manual deploy command.
```

> **Test status**: the unit and e2e suites are unmodified Angular CLI stubs and
> do **not** currently pass — `src/app/app.component.spec.ts` references
> `app.title`, a property `AppComponent` does not have, which is a compile
> error. See `3-software-architecture.md` § Testing Strategy.

## Environment Setup

**Node version is the main constraint.** Angular CLI 11 requires Node 12.x or
14.x. `azure-pipelines.yml` pins `14.x`. The repository has no `.nvmrc`, and
`package.json` declares the constraint under the misspelled key `"engine"`
(singular), which npm silently ignores — so nothing enforces it locally.

```bash
nvm install 14
nvm use 14
npm ci
```

The lockfile is `lockfileVersion: 1` (npm 6). Installing with a modern npm
rewrites it wholesale; avoid committing that churn unless it is intentional.

No environment variables, API keys or `.env` files are required. Both
`environment.ts` and `environment.prod.ts` contain only the `production` flag;
API endpoints are hardcoded in `contact.service.ts`.

The AI workflow tooling has its own prerequisites — `gh` (authenticated), `jq`,
`python3` and `git`. These are unrelated to building the application.
