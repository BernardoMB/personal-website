# Expand Skills Section — Implementation Plan

**Spec**: [`1_expand-skills-section_specs.md`](1_expand-skills-section_specs.md)
**Smoke test runbook**: [`../../../testing/landing/expand-skills-section.smoke-test.md`](../../../testing/landing/expand-skills-section.smoke-test.md)

---

## Summary

**Approach**: Replace the single 13-entry skills card on the landing page with
three themed cards holding thirty entries. The skills data moves from two
verbatim copies of an inline array into one module-scope constant in
`landing.component.ts`, and the proficiency label is derived from the completion
percentage rather than hand-assigned, so the spec's band rule cannot be
violated. The three card subtitles become new `@ngx-translate` keys in
`en.json` / `es.json` (the same mechanism the section heading already uses). The
template gains one `*ngFor` over the groups; the individual skill entry markup is
copied unchanged into the inner loop. The SCSS adds a flex row inside the
existing `landing-theme` mixin that puts the cards side by side above 768px and
stacks them at or below 768px.

**Estimated complexity**: S

<!-- S: < 1 day | M: 1-3 days | L: 3+ days -->

**Rationale**: Four source files plus two translation catalogues, all in one
component. No database, no API, no routing, no new dependency, no new Angular
module import (`MatCardModule` and `MatProgressBarModule` are already registered
in `app.module.ts`). The only non-mechanical work is the responsive layout and
the placement of the proficiency label once each card is a third of the previous
width (Decision 5).

**Dependencies**: None. No other work item must merge first.

---

## Verification Log

> Plan-time verification commands that drive the scope, counts, and file lists
> below. Repo revision: `0605c66` (`agentic-dev`), verified 2026-09-24.

| Check | Command / query | Result |
| --- | --- | --- |
| Repo revision | `git rev-parse --short HEAD` | `0605c66` |
| Skills array is duplicated | `grep -c "completion:" src/app/components/landing/landing.component.ts` | `26` — 13 entries written twice (constructor-path init in `ngOnInit` and the `onLangChange` callback) |
| Where the section is rendered | `grep -n -i "skill" src/app/components/landing/landing.component.html` | One block, lines 200-217: `<section id="skills">` → `.skills-container` → single `<mat-card>` → `*ngFor` over `skills` |
| Where the section is styled | `grep -n "skills" src/app/components/landing/landing.component.scss` | One block, lines 316-359, nested inside `@mixin landing-theme` |
| Other consumers of the `#skills` anchor | `grep -rln "skills" src/app` | 6 files match: the landing component (`.ts`/`.html`/`.scss`, this feature) and `header.component.ts` (scroll-spy section id list), plus two unrelated false-positive text matches on the word "skills" — `hobbies.service.ts` ("motor skills" in a hobby description) and `experience-root.component.html` (the `/experience` page's own separate "Skills" section-title and "developed skills in" body text). Neither of the latter two references the landing page's `#skills` anchor. No route and no sidebar entry consume the anchor. |
| i18n catalogue parity | `python3` key-diff over `src/assets/i18n/en.json` and `es.json` | 126 keys each; one pre-existing mismatch (`LANDING.MESSAGE_CHARACTERS` vs `LANDING.MESSAGE_CHARACTE1RS`) that this change must not add to |
| Material modules already available | `grep -rn "MatCardModule\|MatProgressBarModule" src/app/app.module.ts` | Both imported (lines 16-17) and registered (lines 87, 94) |
| Browser targets (for flex `gap`) | `cat .browserslistrc` | `last 2 Safari major versions`, `last 2 iOS major versions`, current Chrome/Firefox/Edge — all well past Safari 14.1, so flex `gap` is safe |
| Design assets for this item | `ls docs/specs/developments/20260924153745_expand-skills-section/` | Only the spec file; no `assets/` directory and no tracker item, so no fidelity step is added to the runbook |
| Artifact base branch content | `git ls-tree -r --name-only origin/develop \| grep -c "docs/workflow/development-workflow"` | `0` on `origin/develop`; the merged spec and the workflow framework exist only on `origin/agentic-dev` |
| Same-surface open PRs | `gh pr list --state open --json number,title,baseRefName,headRefName` | `[]` — no open PR touches the landing component, the i18n catalogues, or the base-branch decision |

**Freeze exception**: the thirty technology names are **not** re-derived from a
live repo query. The spec freezes them explicitly under *UX Rules → Card
grouping and content* ("Card membership is fixed and is defined by the grouping
in the UX Rules section below. A technology may not be moved between cards
without a spec change."). The Seed Data table below reproduces that frozen list
verbatim.

**Residual verification strategy** (numeric-target plan — thirty entries, three
cards): implementation must produce all three of these before
`ready-for-human-review`:

1. **Automated**: `landing-skills.spec.ts` asserts three groups, ten entries per
   group, thirty unique names, set equality against the spec list, descending
   order within each group, and band agreement for every entry.
2. **Rendered**: the DevTools counts in Step 3 of the smoke runbook
   (`3`, `[10, 10, 10]`, `30` unique names).
3. **Source cross-read**: the Seed Data table below compared line by line
   against `SKILL_GROUP_DEFINITIONS`.

---

## Cross-Cutting Operational Assumption Check

### Applicable

| Assumption surface | Recorded value | Authoritative source | Verified at | Bounded cross-check scope | Result |
| --- | --- | --- | --- | --- | --- |
| Plan artifact base branch | `agentic-dev`, **not** the repository default `develop` | Explicit human directive in this invocation, corroborated by `git ls-tree -r --name-only origin/develop` returning zero `docs/workflow/development-workflow` and zero `docs/specs/developments/20260924153745*` paths while `origin/agentic-dev` carries both | 2026-09-24, repo SHA `0605c66` | This invocation (one plan item) plus same-surface open PRs: `gh pr list --state open` returned `[]` | `Verified` |
| Tracker binding for this item | None — no issue exists; no-tracker branch naming (`implementation-plan/expand-skills-section`), no board membership call, no nested-artifact-guard invocation | `.ai-dev-workflow.yaml` (`issue_tracker.provider: github_issues`, no board) plus the human directive; repository precedent is the merged `spec/expand-skills-section` branch (PR #5) | 2026-09-24, repo SHA `0605c66` | Same invocation; no competing tracker item found | `Verified` |

**Note for implementation start**: the *implementation* branch
(`feature/expand-skills-section`) base is a separate instance of the same
assumption surface and is **not** settled by this plan. Re-run the
"Still valid" check at implementation start: confirm which branch then carries
the merged plan, and base the feature branch on that branch. Stop and return to
the orchestrator if the answer has changed.

**Branch-name validator limitation** (recorded so a reviewer does not read it as
a skipped gate): `scripts/development-workflow/validate-workflow-branch-name.sh`
rejects `implementation-plan/expand-skills-section` because its regex requires an
issue-numbered slug and it has no no-tracker mode. Protocol 02 Step 5.1
explicitly allows `[feature-slug]` without an issue tracker. The unsafe-character
portion of the guard (`#`, `?`, `^`, `~`, `:`, backslash, space) passes.

---

## Key Decisions

### Decision 1 — Deduplicate the skills data into one module-scope constant

The current array is written twice, verbatim (`grep -c "completion:"` → 26 for
13 entries). Naively copying that pattern would produce two 30-entry literals,
~60 duplicated lines, and two places to keep in sync for every future content
edit.

**Chosen**: one module-scope `SKILL_GROUP_DEFINITIONS` constant plus a pure
`buildSkillGroups(labels)` function called from both the `ngOnInit` path and the
`onLangChange` callback. Each call site becomes one line.

**Why now rather than "extend the existing pattern"**: the duplication already
carries a live defect. `this.skills.sort(...)` runs **only** at the end of
`ngOnInit` (`landing.component.ts:287`); the `onLangChange` callback reassigns
the array and never re-sorts it. Today that is invisible because the authoring
order happens to be close to sorted, but the spec's acceptance criterion
"Reading each card top to bottom, completion percentages never increase" must
hold *after a language switch too*. Sorting inside the builder makes both paths
identical by construction. Extending the duplication would ship that defect into
a criterion the reviewer will test.

**Scope control**: the refactor is confined to the Skills region of the
component. The parallel duplication in the same file for `phrase`,
`graceFullMessage`, and `invalidFormErrorMessage` is left exactly as it is — it
is unrelated to this spec and out of scope.

### Decision 2 — Derive the proficiency label from the percentage

`labelForCompletion(completion, labels)` returns `labels[0]` at 70 and above,
`labels[1]` from 55 to 69, `labels[2]` below 55 — the bands the spec states
under *Proficiency Labels*. The definitions therefore carry only `name` and
`completion`.

This makes the acceptance criterion "Every proficiency label … agrees with the
entry's percentage band" structurally impossible to violate, instead of relying
on thirty hand-checked pairs. It is behaviour-preserving: all thirteen current
entries already satisfy the bands (verified by reading
`landing.component.ts:250-264`).

### Decision 3 — Content stays inside `landing.component.ts`

The spec's Out of Scope section forbids "Moving skills content out of the
codebase into a content management system, **a data file** or any external
source". A module-scope `const` in the same component file is the minimum needed
for Decision 1 and keeps the repository's established pattern (content lives in
TypeScript constants inside components and services — see
`docs/project/3-software-architecture.md`). No new file is created for content.

### Decision 4 — Card subtitles use translation keys, not the TS label switch

The section heading already renders as `{{ 'LANDING.SKILLS' | translate }}`. The
proficiency labels are hardcoded in a TypeScript `switch` for historical reasons;
that is the codebase's anti-pattern, not its convention.

**Chosen**: three new keys (`LANDING.SKILLS_GROUP_AI`,
`LANDING.SKILLS_GROUP_INFRA`, `LANDING.SKILLS_GROUP_FULLSTACK`) in both
catalogues, rendered with the `translate` pipe. Rejected: adding the six strings
(3 subtitles × 2 languages) to the existing `labels` switch, which would grow a
third parallel copy of the same conditional and put user-visible copy outside the
catalogues.

### Decision 5 — In the side-by-side layout the proficiency label renders beneath the progress bar

Today `.skill-top-row .center-label` is absolutely positioned at
`left: calc(50% - 44px)` and is swapped to `.skill-bottom-row` below a **528px
viewport** (`landing.component.scss:336` and `:350`). That 528px threshold was a
proxy for *card* width: the card is the full width of a 725px container, so
viewport width and card width were the same measurement.

With three cards the inner card width is roughly 230px at 769px viewport and at
most ~370px at the 1280px container cap — **always** below the 528px proxy. Names
such as `CUDA / NVIDIA Triton Inference Server` and
`OpenAI Function Calling / MCP` wrap to two or three lines and the absolutely
positioned centre label lands on top of the wrapped text.

**Chosen**: express the existing rule against card width instead of viewport
width. Whenever the cards are side by side (viewport above 768px) the label
renders in `.skill-bottom-row`, beneath the progress bar. At 768px and below the
cards are stacked full width and the existing 528px behaviour is untouched.

**Alternatives rejected**:

- Keep the absolute centre label and let names wrap under it — visible text
  collision at every side-by-side width.
- Remove the container `max-width` so cards are wide enough for an inline label —
  only works above ~1800px, and breaks the landing page's consistent
  centred-column layout at every other width.

**AC13 alignment (resolved via a sibling spec fix)**: acceptance criterion 13
was amended on `fix/expand-skills-section-ac13` (PR #8) to state this exact
rule — the proficiency label renders beneath the progress bar whenever the
card is too narrow for an inline label to avoid overlapping the technology
name, which includes every side-by-side desktop layout (above 768px) as well
as narrow stacked viewports (roughly 528px or below); inline placement remains
for a stacked card between roughly 528px and 768px. This decision is what
motivated that amendment: the previous wording ("looks and behaves as it does
today … narrow-viewport behaviour") described only the stacked-viewport
relocation and did not account for three cards that are always narrower than
the old single-card proxy width. There is no layout that keeps the inline
centre label at every desktop width and also satisfies "three cards side by
side at 1024px" (acceptance criterion 9), so the amendment is the correct
resolution rather than a third improvised layout.

**Sequencing dependency**: this plan's spec-alignment for AC13 assumes PR #8
has merged. If the base branch still carries the pre-amendment AC13 wording
when implementation starts, stop and re-verify rather than assuming the
amendment landed — do not implement Decision 5 against stale spec text without
confirming which wording is current.

### Decision 6 — Container width and the responsive mechanism

`.skills-container` widens from `max-width: 725px` to `max-width: 1280px`, the
width already used by `.services-container` and (as 1200px) `.my-work-container`,
so the section lines up with its neighbours. A new `.skills-cards-container`
flex row holds the three cards with `flex: 1 1 0` and `min-width: 0` for equal
visual weight, `gap: 24px`, and `flex-direction: column` at 768px and below.
`gap` is used rather than margin gutters because `.browserslistrc` targets only
the last two Safari and iOS majors (Verification Log), well past Safari 14.1.

### Decision 7 — Where the new SCSS goes

`src/app/components/landing/landing.component.scss` is **both** a component
stylesheet and a global one: everything except the trailing `::ng-deep
.light-theme` / `.dark-theme` / `.mint-theme` blocks lives inside
`@mixin landing-theme($light-theme)`, which `src/scss/component-themes.scss`
`@include`s globally. All new rules go **inside that mixin**, nested under
`.skills-section`, exactly where the current `.skill-container` rules are. No new
rule is added outside the mixin, and no new selector is introduced that could
match an element outside `#skills`.

---

## Layer-by-Layer Changes

> Database / Data Layer, Backend / API, and Shared Packages / Libraries are
> **not applicable**: this repository has no database, no backend, and no shared
> packages (`docs/project/2-repo-architecture.md`, `docs/project/4-database-model.md`).

### Frontend / UI

- [ ] `src/app/components/landing/landing.component.ts` — add `SkillDefinition`,
      `SkillGroupDefinition`, `Skill`, `SkillGroup` interfaces; add the
      `SKILL_GROUP_DEFINITIONS` constant with the thirty frozen entries; add the
      pure `labelForCompletion` and `buildSkillGroups` functions; replace the
      `skills` property with `skillGroups`; replace both duplicated array
      literals with a single `buildSkillGroups(this.labels)` call; delete the now
      redundant `this.skills.sort(...)` line at the end of `ngOnInit`. Covers
      acceptance criteria 3, 4, 5, 6, 7, 8, 11.
- [ ] `src/app/components/landing/landing.component.html` — wrap the existing
      `<mat-card>` in a `.skills-cards-container` div, make the card the body of
      `*ngFor="let group of skillGroups"`, add
      `<h4 class="skills-card-title">{{ group.titleKey | translate }}</h4>` as the
      first child of the card, move the existing entry `*ngFor` onto
      `group.skills`, and add `class="skill-name"` to the technology-name div.
      The four elements inside `.skill-container` are otherwise copied
      character-for-character. Covers acceptance criteria 1, 2, 5, 13, 14.
- [ ] `src/app/components/landing/landing.component.scss` — inside
      `@mixin landing-theme`, under `.skills-section`: widen `.skills-container`
      to `max-width: 1280px`; add `.skills-cards-container` (flex row, `gap: 24px`,
      column below 768px); add `.skills-card` (`flex: 1 1 0`, `min-width: 0`);
      add `.skills-card-title`; add `.skill-name { min-width: 0; overflow-wrap:
      break-word; }`; add `.completion { white-space: nowrap; }`; add the
      above-768px rules that hide `.skill-top-row .center-label` and show
      `.skill-bottom-row` (Decision 5). Covers acceptance criteria 9, 10, 13, 15.
- [ ] `src/assets/i18n/en.json` — add `SKILLS_GROUP_AI`, `SKILLS_GROUP_INFRA`,
      `SKILLS_GROUP_FULLSTACK` inside `LANDING`, immediately after `SKILLS`.
      Covers acceptance criteria 2, 12.
- [ ] `src/assets/i18n/es.json` — the same three keys, same position, Spanish
      values. Covers acceptance criteria 2, 11, 12.
- [ ] `src/app/components/landing/landing-skills.spec.ts` (new) — unit tests for
      the exported pure helpers. Covers acceptance criteria 3, 4, 6, 7, 8, 11.
- [ ] **Routing**: none. The section keeps `id="skills"` and its position in the
      template, so `header.component.ts`'s scroll-spy list
      (`['top', 'services', 'skills', 'my-work', 'coffee', 'contact']`) needs no
      change. Covers acceptance criterion 14.
- [ ] **State management**: none. Data stays component-local, consistent with the
      repository's no-store architecture.

### Infrastructure / Configuration

- [ ] None. No build config, no environment variable, no new dependency, no new
      asset (the section adds no images — the 49 MB asset budget is untouched).

### Classification checks

| Classifier | Applies? | Rationale |
| --- | --- | --- |
| Parser-risk | No | No file under `scripts/lint/` or `scripts/parse/`; no module named for lint/parser/scanner/tokenizer duties; no regex scanning of structured text. The only conditional logic is a two-threshold numeric comparison. |
| Cross-cutting checklist | No | No safety/quality/compliance category is added or renamed in `REVIEW.md`, in any protocol, or in any agent/skill file. This plan changes application code only. |
| Executable workflow shell snippets | No | No framework-owned shell guidance is added. |
| Concurrent-event-source | Yes (conservative) | See below. |

### Concurrent-event-source addendum

Classified **applicable conservatively**: the change modifies the
`translateService.onLangChange` subscription callback, which shares component
state with the Typed.js `setTimeout` chain started by `type()` in the same
component. The signals ("two or more event listeners … or timers", "shared
mutable state") are technically present even though nothing here is genuinely
parallel.

- **Shared mutable state guards**: `skillGroups` is the only state this change
  writes. It is replaced by whole-array reassignment from a pure builder — never
  mutated in place, never partially updated. JavaScript's single-threaded event
  loop means no reader can observe a half-built array. No lock or queue is
  needed, and none is introduced.
- **Re-entrancy / in-flight tracking**: not applicable. `buildSkillGroups` is
  synchronous and allocation-only; it cannot yield mid-execution, so a second
  `onLangChange` cannot interleave with a first.
- **Event deduplication**: not applicable. A repeated `onLangChange` for the same
  language recomputes an identical array; the operation is idempotent because the
  builder reads only `SKILL_GROUP_DEFINITIONS` (a module constant) and
  `this.labels`. The existing `skip(1)` operator is left exactly as it is.
- **Listener and resource cleanup**: unchanged by this plan, and deliberately so.
  The component already does not unsubscribe from `onLangChange` or
  `toggleControl.valueChanges`; `LandingComponent` is eagerly declared and never
  destroyed during a session, so nothing leaks in practice. Adding
  `OnDestroy`/`takeUntil` plumbing would be unrelated refactoring — out of scope
  for this spec.
- **Race conditions at initialization**: `skip(1)` means the callback cannot fire
  before the `ngOnInit` assignment, and both paths call the same builder, so an
  early event would be harmless in any case. The template binds
  `*ngFor="let group of skillGroups"`, which tolerates `undefined` before first
  assignment exactly as `*ngFor="let skill of skills"` does today.
- **Race conditions at teardown**: not applicable — the component is not torn
  down during a session (see cleanup above), and the callback touches no external
  resource.
- **Error propagation across async boundaries**: `buildSkillGroups` performs no
  I/O and has no failure mode; it cannot reject or throw for valid input. No
  error-handling behaviour is added or removed. Missing translation keys surface
  as the raw key string via `@ngx-translate`, which is what acceptance criterion
  12 tests for.
- **New concurrent patterns**: none. No new listener, timer, observable, or async
  boundary is introduced.

---

## Testing Strategy

**Test types**: Unit (new, pure functions) + Smoke (manual browser walkthrough) +
build/lint sanity on the touched files.

**Key scenarios to test**:

1. Three groups, ten entries each, thirty unique names, set equality against the
   frozen spec list — maps to acceptance criteria 3 and 4.
2. Each group is returned in non-increasing completion order — maps to
   acceptance criterion 6.
3. Every completion value is a whole number in 40-95 — maps to acceptance
   criterion 7.
4. Every derived label matches its band, including the exact boundaries 70, 69,
   55, and 54 — maps to acceptance criterion 8.
5. Building with the Spanish label array changes only labels; names and
   completions are byte-identical to the English build — maps to acceptance
   criterion 11.
6. Rendered section: three cards with visible subtitles, correct wording in both
   languages, four elements per entry, no raw `LANDING.` key visible — maps to
   acceptance criteria 1, 2, 5, 12.
7. Layout at 1440px, 1024px, 768px, and 375px — maps to acceptance criteria 9,
   10, 13.
8. Anchor and scroll order, and legibility in light / dark / mint — maps to
   acceptance criteria 14 and 15.

**Unit test file**: `src/app/components/landing/landing-skills.spec.ts`.
It imports `SKILL_GROUP_DEFINITIONS`, `labelForCompletion`, and
`buildSkillGroups` from `./landing.component` and uses **no TestBed** — the
helpers are pure, so the spec needs no `TranslateModule`, no
`HttpClientTestingModule`, and no Material imports. This is why the helpers are
exported at module scope rather than kept as private methods.

> **Running the unit suite requires a workaround, and that is expected.**
> `ng test` does not compile in this repository for reasons that pre-date this
> change: `src/app/app.component.spec.ts:26` and
> `src/app/directives/better-highlight.directive.spec.ts:5` each have a
> TypeScript error (documented in `docs/testing/README.md` and `AGENTS.md`).
> Because Angular compiles the whole spec program, those two files block every
> other spec from running. To obtain a real signal for the new tests, comment out
> the bodies of those two files **locally**, run
> `npx ng test --watch=false --browsers=ChromeHeadless`, then restore them and
> confirm with `git status --porcelain` that neither file appears in the diff.
> Do **not** commit a change to either file — fixing them is a separate item.

**Regression suite**: none added. The Protractor suite is a single unmodified CLI
stub (`e2e/src/app.e2e-spec.ts` asserts `.content span`, which does not exist in
the template), so there is no working regression suite to extend. The smoke
runbook is the authoritative end-to-end gate for this change.

**Pre-existing failures the developer must not report as regressions**: two
`ng test` compile errors and 477 `ng lint` errors across 39 files. Fix lint
errors only in the lines this change touches.

---

## Seed Data

There is no database and no seed script. "Seed data" for this feature is the
compiled-in content constant.

**Entity**: Skill group definitions.
**File**: `src/app/components/landing/landing.component.ts`
(`SKILL_GROUP_DEFINITIONS`).

Technology names are frozen by the spec and reproduced verbatim. **Completion
percentages are the plan's proposed values**: the spec states that "Individual
values are assigned by the author during implementation rather than being fixed
by this spec", so the author may change any number, provided it stays a whole
number in 40-95. The tier column is *derived* by `labelForCompletion` — it is
shown here for review, not stored.

Rows are listed in display order (descending completion), which is also the order
the sort produces.

**Card 1 — `LANDING.SKILLS_GROUP_AI`** ("AI, Agents & LLMs" / "IA, Agentes y LLMs"):

| # | Technology | Completion | Derived tier (EN / ES) |
| --- | --- | --- | --- |
| 1 | Python | 95 | Experienced / Experimentado |
| 2 | Agentic Development | 90 | Experienced / Experimentado |
| 3 | OpenAI API / Anthropic Claude API | 88 | Experienced / Experimentado |
| 4 | RAG | 85 | Experienced / Experimentado |
| 5 | LangChain / LangGraph | 82 | Experienced / Experimentado |
| 6 | OpenAI Function Calling / MCP | 80 | Experienced / Experimentado |
| 7 | AutoGen / CrewAI | 72 | Experienced / Experimentado |
| 8 | TensorFlow / PyTorch | 68 | Intermediate / Intermedio |
| 9 | Diffusion models / Generative Agents | 58 | Intermediate / Intermedio |
| 10 | Unreal Engine for AI | 45 | Beginner / Pricipiante |

**Card 2 — `LANDING.SKILLS_GROUP_INFRA`** ("Infrastructure & MLOps" / "Infraestructura y MLOps"):

| # | Technology | Completion | Derived tier (EN / ES) |
| --- | --- | --- | --- |
| 1 | Docker | 90 | Experienced / Experimentado |
| 2 | CI/CD pipelines | 88 | Experienced / Experimentado |
| 3 | Kubernetes (K8s) | 78 | Experienced / Experimentado |
| 4 | Vertex AI / Azure ML / AWS SageMaker | 75 | Experienced / Experimentado |
| 5 | Kafka / Pub/Sub / RabbitMQ | 70 | Experienced / Experimentado |
| 6 | Prometheus / Grafana | 65 | Intermediate / Intermedio |
| 7 | Terraform / Pulumi | 62 | Intermediate / Intermedio |
| 8 | vLLM / Triton | 58 | Intermediate / Intermedio |
| 9 | Distributed training frameworks | 55 | Intermediate / Intermedio |
| 10 | CUDA / NVIDIA Triton Inference Server | 50 | Beginner / Pricipiante |

**Card 3 — `LANDING.SKILLS_GROUP_FULLSTACK`** ("Full-Stack, Data & Testing" / "Full-Stack, Datos y Pruebas"):

| # | Technology | Completion | Derived tier (EN / ES) |
| --- | --- | --- | --- |
| 1 | SQL + NoSQL + Redis | 90 | Experienced / Experimentado |
| 2 | Next.js / React | 88 | Experienced / Experimentado |
| 3 | Unit + Integration Testing | 85 | Experienced / Experimentado |
| 4 | FastAPI / Flask | 82 | Experienced / Experimentado |
| 5 | OAuth2 / JWT | 78 | Experienced / Experimentado |
| 6 | Data pipelines | 75 | Experienced / Experimentado |
| 7 | GraphQL | 72 | Experienced / Experimentado |
| 8 | Playwright / Cypress | 68 | Intermediate / Intermedio |
| 9 | ETL tools | 62 | Intermediate / Intermedio |
| 10 | Snowflake / BigQuery | 52 | Beginner / Pricipiante |

Boundary note: `Kafka / Pub/Sub / RabbitMQ` at 70 and
`Distributed training frameworks` at 55 sit exactly on the band edges, and
`TensorFlow / PyTorch` at 68 sits one point below the top band. These three are
the values most worth re-reading after any author adjustment.

Spanish entry-tier label is `Pricipiante` — reproduced with the existing
misspelling, as the spec requires. Correcting it is explicitly out of scope.

**Translation values** (`LANDING` block of both catalogues, inserted directly
after `"SKILLS"`):

| Key | `en.json` | `es.json` |
| --- | --- | --- |
| `SKILLS_GROUP_AI` | `AI, Agents & LLMs` | `IA, Agentes y LLMs` |
| `SKILLS_GROUP_INFRA` | `Infrastructure & MLOps` | `Infraestructura y MLOps` |
| `SKILLS_GROUP_FULLSTACK` | `Full-Stack, Data & Testing` | `Full-Stack, Datos y Pruebas` |

---

## Documentation Updates

> Identified here only. The developer executes these during implementation; they
> are not performed in the Plan Ready stage.

- [ ] `docs/project/1-business-domain.md` — the **Skill** entity description
      (line 49) says "13 entries rendered as sorted progress bars". Update the
      count to thirty and note that entries are grouped into three themed cards
      whose membership is fixed by the spec, sorted within each card. The
      `Source` line stays correct (still a hardcoded array in
      `src/app/components/landing/landing.component.ts`).
- [ ] No other project doc changes. Checked and unaffected:
      `docs/project/2-repo-architecture.md` (no file added outside an existing
      directory), `docs/project/3-software-architecture.md` (no pattern,
      dependency, or module boundary changes — content stays compiled in, styling
      stays in the dual-purpose mixin, still no state store),
      `docs/project/4-database-model.md` (no database),
      `docs/best-practices/*` including `stack/i18n.md` (no new i18n mechanism —
      two keys added to both catalogues in lockstep, which is the documented
      rule), `docs/testing/README.md` (no new command or runner),
      `AGENTS.md` / `CLAUDE.md` (no command, convention, or deviation change).

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Implementation starts before PR #8's AC13 amendment merges, so the base branch still carries the pre-amendment wording that appears to conflict with Decision 5 | Low | Med | AC13 was amended in PR #8 to state Decision 5's exact rule; Decision 5 records the resolution and the sequencing dependency. If the base branch does not yet carry the amendment when implementation starts, stop and confirm PR #8's status rather than improvising a third layout or implementing against stale spec wording. |
| Long names wrap awkwardly between 769px and ~1000px, where each card is ~230-280px wide | Med | Low | `min-width: 0` plus `overflow-wrap: break-word` on `.skill-name`, `white-space: nowrap` on `.completion`; smoke Step 5 checks 1024px and Step 6 checks the 768px boundary specifically. |
| A key is added to `en.json` but not `es.json` (the repository already has one such live mismatch) | Low | Med | Implementation Order Step 2 ends with the catalogue parity command; the expected result is 129 keys each with the single pre-existing `MESSAGE_CHARACTERS` mismatch and nothing new. |
| A style change leaks outside the section, because `landing.component.scss` is also a global stylesheet | Low | Med | Decision 7: every new rule is nested under `.skills-section` inside the mixin. Smoke Step 9 scrolls the whole landing page to confirm the other five sections are visually unchanged. |
| The new unit tests cannot run because the suite does not compile | Med | Low | Testing Strategy gives the exact temporary-exclusion tactic plus the `git status --porcelain` guard so nothing unintended is committed; the smoke runbook remains the authoritative gate. |
| Cards end up visibly unequal in height when names wrap differently | Low | Low | Flex `align-items` default is `stretch`, so all three cards match the tallest. Smoke Step 5 records it. |
| Author later edits a percentage and breaks the band rule | Low | Med | Decision 2 derives the label from the percentage, so a band violation becomes impossible by construction; the unit test also asserts descending order per card. |

---

## Code Samples

> All snippets are **illustrative — adapt during implementation**. They show
> shape and naming, not final code.

```typescript
// Illustrative — adapt during implementation.
// src/app/components/landing/landing.component.ts (module scope, above @Component)

export interface SkillDefinition {
  name: string;
  completion: number;
}

export interface SkillGroupDefinition {
  titleKey: string;
  skills: SkillDefinition[];
}

export interface Skill {
  name: string;
  completion: number;
  label: string;
}

export interface SkillGroup {
  titleKey: string;
  skills: Skill[];
}

export const SKILL_GROUP_DEFINITIONS: SkillGroupDefinition[] = [
  {
    titleKey: 'LANDING.SKILLS_GROUP_AI',
    skills: [
      { name: 'Python', completion: 95 },
      // ...the remaining Card 1 rows from Seed Data
    ]
  },
  // ...LANDING.SKILLS_GROUP_INFRA, LANDING.SKILLS_GROUP_FULLSTACK
];

export function labelForCompletion(completion: number, labels: string[]): string {
  if (completion >= 70) {
    return labels[0];
  }
  if (completion >= 55) {
    return labels[1];
  }
  return labels[2];
}

export function buildSkillGroups(labels: string[]): SkillGroup[] {
  return SKILL_GROUP_DEFINITIONS.map((group) => ({
    titleKey: group.titleKey,
    skills: group.skills
      .map((skill) => ({
        name: skill.name,
        completion: skill.completion,
        label: labelForCompletion(skill.completion, labels)
      }))
      .sort((a, b) => b.completion - a.completion)
  }));
}
```

Both call sites collapse to one line each (the `skills` property is removed and
the trailing `this.skills.sort(...)` in `ngOnInit` is deleted):

```typescript
// Illustrative — adapt during implementation.
this.skillGroups = buildSkillGroups(this.labels);
```

```html
<!-- Illustrative — adapt during implementation. -->
<!-- src/app/components/landing/landing.component.html -->
<section id="skills" class="skills-section">
  <div class="skills-container">
    <h3 class="section-title skills-title">{{ 'LANDING.SKILLS' | translate }}</h3>
    <div class="skills-cards-container">
      <mat-card class="skills-card" *ngFor="let group of skillGroups">
        <h4 class="skills-card-title">{{ group.titleKey | translate }}</h4>
        <div class="skill-container" *ngFor="let skill of group.skills">
          <div class="skill-top-row">
            <div class="skill-name">{{skill.name}}</div>
            <div class="center-label">{{skill.label}}</div>
            <div class="completion">{{skill.completion / 100 | percent }}</div>
          </div>
          <mat-progress-bar mode="determinate" value="{{skill.completion}}"></mat-progress-bar>
          <div class="skill-bottom-row">
            <div class="center-label">{{skill.label}}</div>
          </div>
        </div>
      </mat-card>
    </div>
  </div>
</section>
```

```scss
// Illustrative — adapt during implementation.
// Inside @mixin landing-theme, under .skills-section
.skills-container {
  max-width: 1280px; // was 725px
  .skills-cards-container {
    display: flex;
    gap: 24px;
    align-items: stretch;
    margin-top: 24px;
    .skills-card {
      flex: 1 1 0;
      min-width: 0;
      .skills-card-title {
        margin: 0 0 16px;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
      }
    }
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
    // Decision 5: side-by-side cards are always narrower than the 528px
    // proxy, so the label moves beneath the bar for the whole three-up range.
    @media screen and (min-width: 769px) {
      .skill-top-row .center-label {
        display: none;
      }
      .skill-bottom-row {
        display: flex;
      }
    }
  }
  .skill-container {
    .skill-top-row {
      .skill-name {
        min-width: 0;
        overflow-wrap: break-word;
      }
      .completion {
        white-space: nowrap;
      }
    }
  }
}
```

---

## Implementation Order

1. **Re-verify the base branch, then branch.** Confirm which branch now carries
   the merged plan (see the "Still valid" note in the Cross-Cutting Operational
   Assumption Check) and create `feature/expand-skills-section` from it.
   *Verify*: `git rev-parse --abbrev-ref HEAD` prints the new feature branch and
   `git log --oneline -1` shows the expected base commit.
2. **Add the three translation keys** to `src/assets/i18n/en.json` and
   `src/assets/i18n/es.json`, inserted directly after `"SKILLS"` in the
   `LANDING` block, using the values in the Seed Data translation table.
   *Verify*: run the same catalogue parity check used in the Verification Log and
   confirm the only reported difference is the pre-existing
   `LANDING.MESSAGE_CHARACTERS` / `LANDING.MESSAGE_CHARACTE1RS` pair, and that
   both catalogues now report 129 keys (126 before this change):

   ```bash
   python3 - <<'PY'
   import json

   def keys(d, prefix=''):
       out = set()
       for k, v in d.items():
           full = prefix + '.' + k if prefix else k
           out |= keys(v, full) if isinstance(v, dict) else {full}
       return out

   en = keys(json.load(open('src/assets/i18n/en.json')))
   es = keys(json.load(open('src/assets/i18n/es.json')))
   print('counts:', len(en), len(es))
   print('en-only:', sorted(en - es))
   print('es-only:', sorted(es - en))
   PY
   ```

3. **Refactor the component TypeScript** per Decisions 1-3: add the four
   interfaces, `SKILL_GROUP_DEFINITIONS` with all thirty Seed Data rows,
   `labelForCompletion`, and `buildSkillGroups`; replace the `skills` property
   with `skillGroups`; replace both duplicated array literals with
   `this.skillGroups = buildSkillGroups(this.labels);`; delete the
   `this.skills.sort(...)` line at the end of `ngOnInit`.
   *Verify*: `grep -n "this.skills\b" src/app/components/landing/landing.component.ts`
   returns nothing (the old property and its sort call are gone), and reading
   `SKILL_GROUP_DEFINITIONS` shows three groups of ten entries with every
   technology name appearing exactly once in the file.
4. **Update the template** per the illustrative HTML above.
   *Verify*: `npx ng build` succeeds (export
   `NODE_OPTIONS=--openssl-legacy-provider` first on Node 17+). `strictTemplates`
   is on, so a bad binding fails here rather than at runtime.
5. **Update the SCSS** inside the `landing-theme` mixin per Decisions 5-7.
   *Verify*: confirm by reading the file that every new selector is nested under
   `.skills-section` and that nothing was added after the closing brace of
   `@mixin landing-theme`.
6. **Add `src/app/components/landing/landing-skills.spec.ts`** covering scenarios
   1-5 of the Testing Strategy, including the 70 / 69 / 55 / 54 boundary cases.
   *Verify*: run the suite using the temporary-exclusion tactic documented in the
   Testing Strategy, then restore the two excluded files and confirm
   `git status --porcelain` lists only the files this change intends to modify.
7. **Build and lint the touched files.**
   *Verify*: `npx ng build --prod` succeeds (budget warnings are pre-existing and
   expected); `npm run lint` shows no **new** error in the four touched source
   files — compare against the documented 477-error baseline rather than
   expecting a clean run.
8. **Execute the smoke runbook**
   `docs/testing/landing/expand-skills-section.smoke-test.md` end to end and
   record the result, including the three residual-verification counts.
9. **Update project docs** per the Documentation Updates section (the Skill
   entity paragraph in `docs/project/1-business-domain.md`).
   *Verify*: the stated entry count in that file matches the thirty entries in
   `SKILL_GROUP_DEFINITIONS`.
10. **Add the changelog fragment.** This repository has no tracker item for this
    work, so per `changelog.d/README.md` the fragment is named with the
    implementation PR number and the bullet omits the `(#N)` reference. Open the
    draft implementation PR first, then create
    `changelog.d/<pr-number>.changed.expand-skills-section.md` containing exactly:

    ```markdown
    - **Expanded the landing page skills section**: the Skills section now
      presents thirty technologies grouped into three themed cards — AI, Agents &
      LLMs; Infrastructure & MLOps; Full-Stack, Data & Testing — side by side on
      wide screens and stacked on narrow ones.
    ```

    *Verify*: `bash scripts/development-workflow/changelog-fragments.sh validate`
    reports the fragment as valid.
</content>
</invoke>
