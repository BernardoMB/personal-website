# AGENTS.md

This is the primary AI agent guidance file for this project. It follows the [AGENTS.md](https://github.com/agentsmd/agents.md) open format and is read by all AI coding assistants (Claude Code, Cursor, Codex, Gemini CLI, etc.).

> **Note for Claude Code users**: `CLAUDE.md` is a symlink to this file.

---

## Project Overview

The personal portfolio and online CV of Bernardo Mondragón Brozon, an actuary and
full-stack developer. It presents his professional profile, work history, project
portfolio and personal interests, and gives visitors a direct way to make contact.

- **What it is**: a bilingual (English/Spanish) Angular 11 single-page application, client-rendered, deployed to an Azure Web App.
- **Who uses it**: anonymous public visitors, primarily recruiters and prospective clients. There is no authentication, no accounts and no user-generated content.
- **What problem it solves**: it is the author's professional shopfront — a single canonical place for his CV, résumé PDF, portfolio and contact channels.

**Content is compiled in.** Portfolio entries, CV records, hobbies and skills all
live in TypeScript constants inside in-memory Angular services. There is no CMS,
no API for content and **no database**. Any content change is a code change and a
redeploy.

See [`docs/project/1-business-domain.md`](docs/project/1-business-domain.md) for the full domain model.

---

## Repository Structure

A single-project Angular 11 workspace — not a monorepo. One `angular.json`
project (`personal-website`) builds everything from `src/`.

```
src/app/
├── components/   # 10 eager root components (header, footer, landing, sidebar, …)
├── modules/      # 5 lazy feature modules: about, experience, projects, hobbies, coffee
├── shared/       # SharedModule — shared components, 3 pipes, ThemeService
├── services/     # contact (the only HTTP), dialog, loader
├── providers/    # window / document injection tokens
└── directives/   # two highlight directives
src/scss/         # global styles + light | dark | mint themes
src/assets/       # 49 MB — images, i18n catalogues, fonts, résumé PDFs
e2e/              # Protractor suite
docs/ scripts/ changelog.d/   # AI workflow framework (not part of the app build)
```

Full detail, including the dependency graph and environment setup, is in
[`docs/project/2-repo-architecture.md`](docs/project/2-repo-architecture.md).

---

## Key Documentation

Always refer to these docs for authoritative guidance:

| Document                                                                                                                                                       | Purpose                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`docs/project/1-business-domain.md`](docs/project/1-business-domain.md)                                                                                       | Domain entities, business rules, glossary                                                       |
| [`docs/project/2-repo-architecture.md`](docs/project/2-repo-architecture.md)                                                                                   | Repository structure, packages, apps                                                            |
| [`docs/project/3-software-architecture.md`](docs/project/3-software-architecture.md)                                                                           | Tech stack, design patterns, architecture decisions                                             |
| [`docs/project/4-database-model.md`](docs/project/4-database-model.md)                                                                                         | Data model, schema, access patterns (if applicable)                                             |
| [`docs/best-practices/1-general.md`](docs/best-practices/1-general.md)                                                                                         | General coding standards                                                                        |
| [`docs/best-practices/2-version-control.md`](docs/best-practices/2-version-control.md)                                                                         | Git conventions                                                                                 |
| [`docs/best-practices/3-testing.md`](docs/best-practices/3-testing.md)                                                                                         | Testing standards                                                                               |
| [`docs/best-practices/STACK-SPECIFIC.md`](docs/best-practices/STACK-SPECIFIC.md)                                                                               | Stack-specific conventions                                                                      |
| [`REVIEW.md`](REVIEW.md)                                                                                                                                       | Canonical review contract for spec, plan, and code review gates                                 |
| [`docs/workflow/development-workflow/README.md`](docs/workflow/development-workflow/README.md)                                                                 | AI development workflow (master doc)                                                            |
| [`docs/workflow/development-workflow/protocols/00-add-backlog-item-protocol.md`](docs/workflow/development-workflow/protocols/00-add-backlog-item-protocol.md) | Create backlog work items in a configured tracker (before spec/plan work)                       |
| [`docs/workflow/development-workflow/agent-model-config.md`](docs/workflow/development-workflow/agent-model-config.md)                                         | Model assignments, tool restrictions, and override guide for all agents                         |
| [`.ai-dev-workflow.yaml`](.ai-dev-workflow.yaml)                                                                                                               | Repo-level workflow integration manifest (review tools, issue tracker, VCS, browser automation) |
| [`docs/testing/README.md`](docs/testing/README.md)                                                                                                             | How to run tests and smoke tests in this repository                                             |
| [`docs/best-practices/stack/i18n.md`](docs/best-practices/stack/i18n.md)                                                                                       | i18n doctrine and the @ngx-translate wiring used here                                           |

> **Note for Cursor users**: Start from the workflow commands, especially `/run-item <target>` for single-item advancement. Cursor subagents in `.cursor/agents/` are configured internal/expert roles that Agent may delegate to after the command has resolved scope, guardrails, policy, and checkpoints; direct invocation of `item-orchestrator` is retained for internal handoff and legacy compatibility, not as the normal user-facing path. Each subagent's model is configured in its file — see [`docs/workflow/development-workflow/agent-model-config.md`](docs/workflow/development-workflow/agent-model-config.md) for how to set or override models. This framework does not ship a `.cursor/skills/` mirror: Cursor discovers the existing agent, command, and shared `.agents/skills/` surfaces directly, and review tooling treats an absent Cursor skills tree as intentional rather than a missing mirror.

---

<!-- TEMPLATE-OWNED-START -->

## Development Workflow

This project uses a staged AI-assisted development workflow. See [`docs/workflow/development-workflow/README.md`](docs/workflow/development-workflow/README.md) for the full specification.

Repository-specific workflow providers are declared in [`.ai-dev-workflow.yaml`](.ai-dev-workflow.yaml). Today, `review.on_draft.runner` is consumed by the Step 7a internal review gate protocol, and `review.on_draft.github` / `review.on_ready.github` are consumed by `pr-review-loop.sh` (Step 7); other sections are advisory until additional tooling adopts them. Legacy `review.internal_reviewers`, `review.platforms`, and `review.phase_after_clean` keys remain accepted for one transition release.

### Workflow Commands

| Stage                            | Claude Code                                                       | Cursor                                                        | Codex                                                                                | Any other tool                                                                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project Setup                    | `project-setup` agent                                             | `/setup-project`                                              | `workflow-project-setup` skill                                                       | Follow `docs/workflow/setup/protocol.md`                                                                                                                                          |
| Add backlog item                 | `/add-backlog-item`                                               | `/add-backlog-item`                                           | `/add-backlog-item` alias                                                            | Follow `docs/workflow/development-workflow/protocols/00-add-backlog-item-protocol.md`                                                                                             |
| Write Spec                       | `product-manager` agent                                           | `/generate-new-feature`                                       | `workflow-spec-writer` skill                                                         | Follow `docs/workflow/development-workflow/protocols/01-generate-spec-protocol.md`                                                                                                |
| Write Plan                       | `tech-lead` agent                                                 | `/generate-implementation-plan`                               | `workflow-plan-writer` skill                                                         | Follow `docs/workflow/development-workflow/protocols/02-generate-implementation-plan-protocol.md`                                                                                 |
| Implement                        | `developer` agent                                                 | `/implement-development`                                      | `workflow-implementer` skill                                                         | Follow `docs/workflow/development-workflow/protocols/03-implement-development-protocol.md`                                                                                        |
| Review Gate (Spec / Plan / Code) | Native review against `REVIEW.md`                                 | `/review-spec`, `/review-implementation-plan`, `/review-code` | Native review against `REVIEW.md`                                                    | Follow `REVIEW.md` and the compatibility wrapper protocols under `docs/workflow/development-workflow/protocols/` when needed                                                      |
| Smoke Test                       | `smoke-tester` agent                                              | `/smoke-tester`                                               | —                                                                                    | Follow `docs/workflow/development-workflow/protocols/04-smoke-test-protocol.md`                                                                                                   |
| Post-merge QA                    | `post-merge-qa` agent / `/post-merge-qa` (alias `/merged-qa-tester`) | `/post-merge-qa` (alias `/merged-qa-tester`)               | `/post-merge-qa` alias (or `/merged-qa-tester`)                                      | Follow `docs/workflow/development-workflow/protocols/08-post-merge-qa-protocol.md`                                                                                                |
| Run reviewer loop (PR)           | `/run-reviewer-loop` command (or `automated-reviewer-loop` agent) | `/run-reviewer-loop`                                          | `/run-reviewer-loop` alias or `workflow-reviewer-loop` skill                         | Follow `docs/workflow/development-workflow/protocols/93-automated-reviewer-loop-protocol.md`                                                                                      |
| Advance One Item                 | `/run-item` command (or `item-orchestrator` agent)                | `/run-item`                                                   | `/run-item` alias; `workflow-item-orchestrator` skill (same prelude + Protocol 91)   | Follow `docs/workflow/development-workflow/protocols/91-orchestrate-work-protocol.md` — `/run-item-work` is a deprecated alias; Cursor `item-orchestrator` is an internal handoff role, not the normal entrypoint |
| Execute Multiple Items (bounded batch) | `/run-items`                                               | `/run-items`                                                  | `/run-items` alias                                                                   | Follow `docs/workflow/development-workflow/protocols/90-batch-orchestrate-work-protocol.md` Protocol 90 `explicit_list` mode — supply two or more item targets; targets `develop` directly |
| Resolve Epic Scope / Delegated Gate (alias) | `/run-epic`                                           | `/run-epic`                                                   | `/run-epic` alias                                                                    | Follow `docs/workflow/development-workflow/protocols/95-run-epic-protocol.md`                                                                                                     |
| Prepare Commit                   | —                                                                 | `/prepare-commit`                                             | Follow `docs/best-practices/2-version-control.md`                                    | Follow `docs/best-practices/2-version-control.md`                                                                                                                                 |
| Prepare Release                  | `/prepare-release`                                                | `/prepare-release`                                            | `/prepare-release` alias                                                             | Follow `docs/workflow/development-workflow/protocols/05-prepare-release-protocol.md`                                                                                              |
| Scan Portfolio (discover)        | `/run-work` command (or `orchestrator` agent)                     | `/run-work`                                                   | `/run-work` alias or `workflow-orchestrator` skill                                   | Follow `docs/workflow/development-workflow/protocols/90-batch-orchestrate-work-protocol.md` — read-only portfolio scan; proposes batch options; single/epic targets redirect to `/run-item` / `/run-epic` (Protocol 96) |
| Batch Merge                      | `/batch-merge`                                                    | `/batch-merge`                                                | `/batch-merge` alias or `batch-merge` skill                                          | Follow `docs/workflow/development-workflow/protocols/94-batch-merge-protocol.md`                                                                                                  |
| Graduate Integration Branch      | `/graduate-development <slug>`                                    | `/graduate-development <slug>`                                | `/graduate-development` alias                                                        | Follow `docs/workflow/development-workflow/protocols/05b-graduate-development-protocol.md`                                                                                        |
| Retrospective                    | `/retrospective`                                                  | `/retrospective`                                              | `/retrospective` alias or `workflow-retrospective` skill                             | Follow `docs/workflow/development-workflow/protocols/06-retrospective-protocol.md`                                                                                                |
| Meta-Retrospective               | `/retrospective` (invoke with meta scope)                         | `/retrospective` (meta scope)                                 | `/retrospective` alias or `workflow-retrospective` skill                             | Follow `docs/workflow/development-workflow/protocols/06b-meta-retrospective-protocol.md` — periodic verification that prior improvements are working; recommended every 5 batches |
| Run feedback triage              | —                                                                 | —                                                             | —                                                                                    | Follow `docs/workflow/development-workflow/protocols/07-feedback-triage-protocol.md`                                                                                              |

**Prepare release** does not stop after opening PRs: protocol `05` treats `pr-review-loop.sh` as skipped for `release/*` branches, then applies `ready-for-regression` on the **production PR to `main`** and completes the CI loop (including label-gated e2e/regression when configured) before handoff to merge.

### Codex Skills

The repository ships Codex skill definitions in two compatible locations:

- `.agents/skills/`: repo-scoped Codex discovery path, including command-style aliases such as `/add-backlog-item`, `/run-work`, `/run-item`, `/run-items`, `/run-item-work` (deprecated alias), `/run-epic`, `/run-reviewer-loop`, `/batch-merge`, `/post-merge-cleanup`, `/post-merge-qa` (alias `/merged-qa-tester`), `/prepare-release`, `/graduate-development`, `/retrospective`, and `/sync-template`.
- `.codex/skills/`: legacy canonical workflow skill definitions used by existing template integrations.

Install them into your local Codex skill directories before first use:

<!-- workflow-shell-contract: bash -->
```bash
bash ./scripts/development-workflow/install-codex-skills.sh
```

Installed skills are thin wrappers around the canonical workflow protocols. They do not redefine the workflow; they load the same documents used by other tools and, for orchestration, rely on the helper scripts in `scripts/development-workflow/` to inspect state, resume partial work, and resolve PR readiness deterministically. `/run-item` and `/run-epic` are the primary bounded commands (shared prelude + Protocol 91 or 95). `/run-item` prints `policyRecommendation.confirmationSummary` before mutation and records an invocation-scoped item/policy binding after explicit autonomy flags or human acceptance so the same selected policy is not re-prompted. `/run-items` is the bounded multi-item batch execute command (Protocol 90 `explicit_list` mode — two or more items, targeting `develop` directly). `/run-work` is the read-only portfolio scan entrypoint via `run-work-router.sh` (Protocol 96) — it proposes batch options but does not execute; single/epic targets redirect to `/run-item` / `/run-epic`. In no-target scan mode, `/run-work` separates `INFORMATIONAL - not actionable in this proposal`, `ACTIONABLE RESUME - can advance now`, `PROPOSED BATCH - your decision`, and `HELD - not included in proposed batch` records; approval or the recommended `/run-items` command applies only to proposed-batch records. `/run-item-work` is a deprecated alias identical to `/run-item`. `/run-epic` resolves a bounded execution scope, recommends missing autonomy policy in-place before mutation, captures invocation-scoped delegation policy, uses read-only PR risk classification and `run-epic-delegated-gate.sh` before delegated merge decisions, and records stable PR disposition and epic ledger audit comments after delegated decisions. The command-style aliases exist for parity with Claude Code slash commands; the underlying canonical skills remain the source of the workflow behavior. The bundled skills also include optional `agents/openai.yaml` metadata so downstream projects created from this template have cleaner Codex skill labels and default prompts out of the box.

For normal Codex usage, use `/run-work` to scan the portfolio and discover what can advance (read-only — no mutation). Then execute with `/run-item` for a single item, `/run-items` for an explicit bounded batch, or `/run-epic` for an epic-scoped run. Use `/batch-merge` to merge ready PRs after execution. Use `/run-item` (not `/run-item-work`) for single-item advancement. Whether work is batch-orchestrated or item-scoped, runs should continue until they reach a real terminal condition: waiting on human review / merge, blocked dependency, unresolved decision, or escalation. For review gates, prefer the runner's native review capability against `REVIEW.md`; use the compatibility wrapper protocols only when a command, skill, or legacy workflow explicitly points to them.

### Maintenance Commands

| Task                                                                                 | Claude Code           | Cursor                | Codex                          |
| ------------------------------------------------------------------------------------ | --------------------- | --------------------- | ------------------------------ |
| Sync framework updates from template                                                 | `/sync-template`      | `/sync-template`      | `workflow-sync-template` skill |
| Post-merge cleanup (fetch, develop, pull, delete local branch; update issue tracker) | `/post-merge-cleanup` | `/post-merge-cleanup` | `post-merge-cleanup` skill     |
| Post-merge QA (develop / `develop-<slug>`; optional alias `/merged-qa-tester`) | `/post-merge-qa` | `/post-merge-qa` | `post-merge-qa` skill |

<!-- TEMPLATE-OWNED-END -->

---

## Common Commands

> **Node version**: Angular CLI 11 requires Node 12.x or 14.x. Run `nvm use 14`
> before any `ng` command. There is no `.nvmrc`, and `package.json` declares the
> constraint under the misspelled key `"engine"` (singular), which npm ignores —
> so nothing enforces it for you.

<!-- workflow-shell-contract: bash -->
```bash
# Install
nvm use 14
npm ci

# Development
npm start                 # ng serve → http://localhost:4200
npm run serve-devices     # ng serve on 0.0.0.0:4204, for real-device testing

# Build
npm run build             # ng build → dist/
npx ng build --prod       # production build; this is what the Azure pipeline runs

# Test
npm test                                              # ng test (Karma + Jasmine, interactive)
npx ng test --watch=false --browsers=ChromeHeadless   # single-run
npm run e2e                                           # ng e2e (Protractor)

# Lint / Format
npm run lint              # ng lint (tslint + codelyzer)
```

> **Test status**: the 35 `*.spec.ts` files and the Protractor spec are
> unmodified Angular CLI stubs and **do not currently pass** —
> `src/app/app.component.spec.ts` asserts `app.title`, which `AppComponent` does
> not define. Do not report a failing suite as a regression without first
> confirming the failure pre-exists your change.

Markdown lint for workflow artifacts (specs, plans, changelog fragments). These
are **not** installed as devDependencies, because `markdownlint-cli2` requires
Node 20+ and this project builds on Node 14. Run them from a separate Node:

<!-- workflow-shell-contract: bash -->
```bash
# Standard rules (trailing whitespace, relative links, files end with newline):
npx markdownlint-cli2@0.22.0 "docs/specs/developments/**/*.md" "docs/testing/workflow/**/*.md" "changelog.d/**/*.md" "CHANGELOG.md"

# Heuristic rules (GLOB001, COUNT001):
find docs/specs/developments docs/testing/workflow changelog.d -name "*.md" -print0 \
  | xargs -0 python3 scripts/lint/markdown-heuristic-lint.py CHANGELOG.md

# Duplicate section-header check (detects repeated ### Fixed / ### Added etc. within a ## block):
bash scripts/lint/check-changelog-duplicate-headers.sh CHANGELOG.md
```

---

## Important Conventions

### Git & Branching

This repository follows the default template workflow (documented in `docs/workflow/development-workflow/`).

> **This repository has no `main` branch.** `origin` has `develop` (the default),
> `master` and `release/v1`. The branch contract is declared in
> [`.ai-dev-workflow.yaml`](.ai-dev-workflow.yaml) as `default_branch: develop`
> and `release.base: master`. Wherever framework documentation says `main`, read
> `master`.

- Integration branch: `develop` (spec/plan/feature/fix PRs target `develop`)
- Release branch: `master` (release PR targets `master`, plus a mandatory backport PR to `develop`)
- Branch naming:
  - Features / improvements: `feature/[feature-slug]` (from `develop`)
  - Refactors: `refactor/[slug]` (from `develop`)
  - Bug fixes (fast track): `fix/[slug]` (from `develop`)
  - Hotfixes: `hotfix/[slug]` (from `master`, then backport to `develop`)
  - Releases: `release/v[X.Y.Z]` (from `develop`)

> **⚠️ Creating a `release/*` branch deploys to production.**
> `azure-pipelines.yml` triggers on `release/*` and its final step deploys to the
> live Azure Web App `bernardomondragon`. Protocol 05 pushes the release branch
> **before** opening any PR, so running `/prepare-release` would ship to
> production with no review. Narrow the trigger or add a deployment approval gate
> before using the release workflow.

Workflow branches must use a bare tracker identifier (for example,
fix/1858-safe-name), never an issue-reference form such as
fix/#1858-safe-name. The workflow guard rejects #, ?, ^, ~, :, backslash, and
spaces before branch creation or push. To recover already started work, preserve
the original branch, create a compliant replacement through the normal PR path,
verify push-triggered checks start, and never force-push shared history.

### Tracker Classification

This repository uses `issue_tracker.provider: github_issues` — plain GitHub
Issues on `BernardoMB/personal-website`. There is **no GitHub Projects board**,
so the Projects **Type** field described in the framework documentation does not
apply here, and Projects-based status transitions (Backlog → Writing Spec → …)
are unavailable.

Classify work with repository labels instead: `feature`, `bug`, `refactor`,
`workflow` (for AI-development-framework/process/tooling items). Keep the
operational labels the workflow scripts rely on: `ready-for-human-review`,
`needs-fixes`, `ready-for-regression`, `reviewer-failed`, and
`integration-branch:<slug>`.

If a Projects board is created later, set `issue_tracker.provider:
github_projects` and add `project_number` in
[`.ai-dev-workflow.yaml`](.ai-dev-workflow.yaml), then revert this section to
the framework default.

### CHANGELOG & Versioning

- Follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.
- Use [Semantic Versioning](https://semver.org/): patch for fixes/tweaks, minor for new features or meaningful improvements, major for breaking changes to the template structure.
- **Feature, fix, and refactor PRs** merged into `develop` add release-note fragments under `changelog.d/`; do not edit `CHANGELOG.md` directly for normal development PRs. Spec-only and plan-only PRs are exempt. Fixes or changes to unreleased work should update the existing fragment rather than adding a duplicate. Parallel batches keep one fragment per PR; Prepare Release assembles pending fragments into `CHANGELOG.md`.
- **Hotfix PRs** (`hotfix/*`) are the exception: they write a **new versioned section** (e.g., `[1.0.1] - YYYY-MM-DD`) directly below `[Unreleased]` (above all prior versioned sections), not an `[Unreleased]` entry. A hotfix patches released code on `master` and is released on merge. The backport PR carries the versioned entry to `develop`.
- **A new version is created when releasing or hotfixing**: for normal releases, run the Prepare Release workflow (`/prepare-release` or `docs/workflow/development-workflow/protocols/05-prepare-release-protocol.md`) — that creates a `release/v[X.Y.Z]` branch, assembles pending `changelog.d/` fragments into `[X.Y.Z]` in the CHANGELOG, opens PRs to `master` and backport to `develop`. For hotfixes, the developer writes the versioned section directly in Step 6 of Path 4 (`03-implement-development-protocol.md`) — no release branch is created.

> **Release automation is not wired up here.** There are no GitHub Actions in
> this repository, so `auto-tag-release.yml` does not exist and **tags are not
> created automatically** — tag manually after a release merge. Note also the
> `release/*` production-deploy hazard described under Git & Branching, and that
> `scripts/development-workflow/prepare-release-post-merge-cleanup.sh` hardcodes
> `--base main` with no override flag, so it will not find this repository's
> release PRs. The release stage is the least-supported part of the workflow
> here; treat it as manual until those are resolved.

> **Version drift to be aware of**: the footer template displays `v2.39.3`,
> `package.json` stays at `0.0.0`, and there are no git tags. Pick one source of
> truth before adopting the release protocol.

### Agent commit hooks — not adopted

The framework's optional Haystack git hooks (`hooks/`, `LLM_RULES.md`) were
**deliberately not integrated**. The upstream `commit-msg` hook enforces
Conventional Commits on *every* commit including human ones, which is
incompatible with this repository's existing free-form commit style. `hooks/` is
also absent from `sync-manifest.yaml`, so adopting it would mean owning it
outright. See [`docs/workflow/development-workflow/integrations/haystack.md`](docs/workflow/development-workflow/integrations/haystack.md) if you reconsider.

**Commit message style here** is free-form sentence-case, e.g. `Added Freight 99
project`, `Fixed typo`. It is not Conventional Commits. Match the surrounding
history rather than introducing a new convention unilaterally.

### Stack Conventions

Read [`docs/best-practices/STACK-SPECIFIC.md`](docs/best-practices/STACK-SPECIFIC.md) for the stack summary and the most important cross-cutting rules. For detailed conventions per technology, see the files in [`docs/best-practices/stack/`](docs/best-practices/stack/).

### Safety Rules

- **No `git push --force`**, `git reset --hard`, or rebase on shared branches without explicit human approval
- **Stop and ask** if an action seems destructive or has wide blast radius
- Human review is required before merging PRs; opening a PR is not a terminal condition by itself

---

## Troubleshooting

| Symptom                                                  | Cause / fix                                                                                                    |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Any `ng` command fails immediately                       | Angular CLI 11 needs Node 12/14. `nvm use 14`, then `npm ci`.                                                     |
| `ng test` fails on `app.title`                           | Pre-existing. `app.component.spec.ts` is an unmodified CLI stub asserting a property `AppComponent` lacks.         |
| Raw keys like `HEADER.HOME` render instead of text       | A lazy module is missing `TranslateModule.forChild` with `HttpLoaderFactory`, or the i18n catalogue 404'd.         |
| A style change leaks into unrelated pages                | Nine component stylesheets are also globally imported via `src/scss/component-themes.scss`.                        |
| `DOCUMENT` injection behaves unexpectedly                | `src/app/providers/document.provider.ts` exports a `DOCUMENT` token that shadows `@angular/common`'s. Check the import. |
| A nav link lands on `/not-found`                         | `footer.component.html` links `/cv`, which is not a route. The correct path is `/experience`.                      |
| Translation JSON 404s in a deployed build                | `web.config` MIME configuration — see the deployment notes in `README.md`.                                          |
| Workflow scripts exit with code 2                        | `gh` is not authenticated. Run `gh auth login`.                                                                    |
| `/run-item` stops at the readiness gate                  | Expected. Protocol 91 Step 8a requires at least one GitHub check, and this repo has no GitHub Actions. See below.   |

---

## Local Deviations From the Framework Template

Recorded so that `/sync-template` diffs are recognised as intentional rather than
re-accepted from upstream.

| Deviation                                                                       | Why                                                                               |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `.github/` not adopted (no GitHub Actions)                                        | CI/CD is Azure Pipelines. Consequence: Protocol 91 Step 8a exits 5 on zero checks, and `/batch-merge` treats an empty check set as blocked — so orchestrated end-to-end runs stop at the readiness gate. Per-stage commands are unaffected. |
| `.codex/skills/` and `.agents/skills/` not copied (57 files)                       | Only Claude Code and Cursor are used here.                                          |
| `scripts/development-workflow/tests/` not copied (178 files)                       | The framework's own self-test harness; nothing here would run it.                   |
| `docs/specs/developments/` and `docs/testing/workflow/` seeded empty               | The template ships its own 143 spec folders and 143 smoke runbooks — foreign history. |
| `e2e/` (Playwright) not copied                                                    | Would enter `ng lint`'s TypeScript program via `e2e/tsconfig.json` and break it. Protractor is retained. |
| `hooks/`, `LLM_RULES.md`, `.coderabbit.yaml`, `.pr_agent.toml`, `.prettierrc.json` not copied | Vendor/tooling configs for services not used here; prettier would fight tslint and `.editorconfig`. |
| `docs/best-practices/4-database.md`, `stack/supabase.md` not copied               | No database, no Supabase.                                                            |
| `docs/workflow/retro-metrics.md` truncated to its header                          | The template's copy carried 27 rows of its own batch history (migration note 0.41.1). |
| `docs/best-practices/stack/i18n.md` worked example rewritten                      | Upstream targets React Native + i18next; this project uses @ngx-translate.           |
| `.cursor/rules/*.mdc` globs changed                                               | Upstream globs matched nothing in an Angular tree, so no rule ever attached to `src/`. |
| `.claude/settings.json`: `pnpm` → `npm`/`npx ng`, force-push denied               | This is an npm + Angular CLI repo; the blanket `Bash(git push:*)` allow also covered `--force`. |
| `guardrails.mode`: `delegated` → `manual`, all `may_merge_pr` false               | Live production site; merge authority stays with a human.                            |
| `review.on_draft.runner`: `codex` → `claude`; reviewer lists emptied              | Codex, Bugbot, PR-Agent and CodeRabbit are not installed or licensed here.            |

Upstream version integrated: **v0.44.0**, recorded in
`.ai-dev-workflow.yaml` under `template.last_synced_version`.

**Known dangling links (7).** A consequence of the exclusions above, all inside
optional documents for features not configured here:
`protocols/07-feedback-triage-protocol.md` and `integrations/pr-agent.md` point
at `CONTRIBUTING.md`, `.pr_agent.toml` and a pr-agent workflow;
`product-repo-injection.md` points at `template/`;
`protocols/05b-graduate-development-protocol.md` points at the script test
harness; `protocols/95-run-epic-protocol.md` and `bounded-run-prelude.md` cite
the framework's own runbook and spec history. These files are `always_sync`, so
they were left intact rather than edited — deleting or patching them would
produce a conflict on every future `/sync-template` run for no functional gain.
