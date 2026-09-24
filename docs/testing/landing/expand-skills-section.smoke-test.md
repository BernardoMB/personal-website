# Smoke Test Runbook: Expand Skills Section

**Feature**: Expand the landing page Skills section into three themed cards
**Spec**: [`1_expand-skills-section_specs.md`](../../specs/developments/20260924153745_expand-skills-section/1_expand-skills-section_specs.md)
**Implementation plan**: [`2_expand-skills-section_implementation-plan.md`](../../specs/developments/20260924153745_expand-skills-section/2_expand-skills-section_implementation-plan.md)
**Created in**: Plan Ready stage
**Updated in**: In Development stage

---

## Prerequisites

Before running this smoke test:

- [ ] On Node 17+, `export NODE_OPTIONS=--openssl-legacy-provider` (omit on
      Node 14). Without it every `ng` command dies with
      `ERR_OSSL_EVP_UNSUPPORTED` — that is an environment error, not a finding.
- [ ] `npm ci` has been run (`node_modules` is not committed)
- [ ] `npm start` is serving <http://localhost:4200>
- [ ] A desktop browser with DevTools and a responsive-design mode
- [ ] Fresh session: in DevTools console run `localStorage.removeItem('theme')`
      and reload, so the app starts on the default light theme

There is no login, no database, and no backing service for this section. The
content is compiled into the bundle.

---

## Test Data

| Item | Value |
| --- | --- |
| Feature URL | `http://localhost:4200/home` |
| In-page anchor | `http://localhost:4200/home#skills` |
| Language control | Header settings menu (gear) → **Language** → `English` / `Español` |
| Theme control | Header settings menu (gear) → **Theme** → Light / Dark / Mint |
| Expected card count | 3 |
| Expected entries per card | 10, 10, 10 (30 total, all names unique) |

No seed data, no test users, no fixtures.

---

## Smoke Test Steps

### Step 0: Load the page in English

1. Navigate to `http://localhost:4200/home`.
2. Open the header settings menu and set **Language** to `English`.
3. Set **Theme** to Light.
4. Scroll to the Skills section.

**Expected result**: the Skills section renders with its existing heading
("Skills") above three cards. No raw translation key such as `LANDING.SKILLS` or
`LANDING.SKILLS_GROUP_AI` is visible anywhere.

### Step 1: Three cards, each with a visible subtitle

**Maps to**: Acceptance Criteria 1, 2

1. Read the top of each card.

**Expected result**: three cards, left to right, subtitled exactly
`AI, Agents & LLMs`, `Infrastructure & MLOps`, `Full-Stack, Data & Testing`.
Each subtitle is visible without scrolling the card.

### Step 2: Every entry shows all four elements

**Maps to**: Acceptance Criterion 5

1. Pick at least two entries in each card.

**Expected result**: each shows the technology name, a proficiency label
(`Experienced`, `Intermediate`, or `Beginner`), a percentage, and a progress bar
whose fill visibly tracks that percentage (compare a 95% entry against a 45%
entry).

### Step 3: Counts, membership, and uniqueness (residual verification)

**Maps to**: Acceptance Criteria 3, 4

1. In the DevTools console, run:

   ```javascript
   document.querySelectorAll('#skills .skills-card').length;
   [...document.querySelectorAll('#skills .skills-card')]
     .map(card => card.querySelectorAll('.skill-container').length);
   const names = [...document.querySelectorAll('#skills .skill-name')]
     .map(el => el.textContent.trim());
   [names.length, new Set(names).size];
   ```

2. Compare the printed names against the three grouping lists in the spec's
   *UX Rules → Card grouping and content*.

**Expected result**: `3`, then `[10, 10, 10]`, then `[30, 30]`. Every spec-listed
technology appears in its assigned card and nothing else appears. In particular
Redis appears only inside `SQL + NoSQL + Redis`, with no standalone Redis entry,
and `vLLM / Triton` and `CUDA / NVIDIA Triton Inference Server` are both present
as distinct entries.

### Step 4: Ordering, range, and label bands

**Maps to**: Acceptance Criteria 6, 7, 8

1. Read each card top to bottom and note the percentages.
2. In the DevTools console, run:

   ```javascript
   [...document.querySelectorAll('#skills .skills-card')].map(card =>
     [...card.querySelectorAll('.skill-container')].map(row => ({
       name: row.querySelector('.skill-name').textContent.trim(),
       pct: parseInt(row.querySelector('.completion').textContent, 10),
       label: row.querySelector('.center-label').textContent.trim()
     }))
   );
   ```

**Expected result**: within each card the percentages never increase going down.
Every percentage is a whole number between 40 and 95 inclusive. Every label is
one of the three English tier labels and agrees with its band — `Experienced` at
70 and above, `Intermediate` from 55 to 69, `Beginner` below 55. Check the
boundary entries specifically: `Kafka / Pub/Sub / RabbitMQ` at 70 must read
`Experienced`, `Distributed training frameworks` at 55 must read `Intermediate`,
and `TensorFlow / PyTorch` at 68 must read `Intermediate`.

### Step 5: Wide-viewport layout

**Maps to**: Acceptance Criteria 9, 13

1. Set the browser window (or DevTools responsive mode) to 1440px wide, then
   repeat at 1024px.

**Expected result**: at both widths the three cards sit side by side in one row,
in the order Card 1 (`AI, Agents & LLMs`), Card 2 (`Infrastructure & MLOps`),
Card 3 (`Full-Stack, Data & Testing`) from left to right, with equal width and
equal height. The proficiency label renders beneath each progress bar, centred
(this is the intended three-up behaviour — see Decision 5 in the plan). Long
names such as `CUDA / NVIDIA Triton Inference Server` wrap within their card;
no text overlaps the percentage and no text is clipped.

### Step 6: Narrow-viewport stacking

**Maps to**: Acceptance Criteria 10, 13

1. Narrow the viewport to 768px, then to 600px, then to 375px.

**Expected result**: at 768px and below the three cards are stacked vertically at
full width, in the same order top to bottom. There is no horizontal scrollbar at
any of the three widths and no content is clipped. Between 600px and 768px the
proficiency label sits inline, centred in the name row — the unchanged existing
behaviour for a full-width card. At 375px the label has moved beneath the
progress bar, again matching current behaviour.

### Step 7: Language switch

**Maps to**: Acceptance Criteria 11, 12

1. Note the names and percentages of the first two entries of each card.
2. Switch **Language** to `Español` from the header settings menu.
3. Re-read the section without reloading the page.
4. Switch back to `English`.

**Expected result**: the heading reads `Habilidades`; the three subtitles read
`IA, Agentes y LLMs`, `Infraestructura y MLOps`, `Full-Stack, Datos y Pruebas`;
every proficiency label reads `Experimentado`, `Intermedio`, or `Pricipiante`
(the existing misspelling is intentional and in scope to preserve). Technology
names and percentages are identical to what was noted in step 1, and **each card
is still ordered by descending percentage** — re-check this, because it is the
path the previous implementation did not re-sort. No raw translation key is
visible in either language. Switching back to English restores the English copy.

### Step 8: Anchor and scroll position

**Maps to**: Acceptance Criterion 14

1. Navigate directly to `http://localhost:4200/home#skills`.
2. Then scroll the whole landing page from top to bottom.

**Expected result**: the anchor lands on the Skills section. The section order is
unchanged — top, services, skills, my-work, coffee, contact — and the header
scroll-spy highlights the Skills entry while the section is in view.

### Step 9: All three themes

**Maps to**: Acceptance Criterion 15

1. Cycle **Theme** through Light, Dark, and Mint.
2. In each theme inspect all three cards.

**Expected result**: in every theme each card subtitle, technology name,
proficiency label, and percentage stays legible against the card background, and
every progress bar remains visible (both its track and its fill).

### Step 10: No collateral damage to the rest of the landing page

**Maps to**: Regression guard for the dual-purpose stylesheet (not an acceptance
criterion)

1. Scroll the entire landing page and open one other route (for example
   `/projects`).

**Expected result**: the other five landing sections (top, services, my-work,
coffee, contact) and the other route look unchanged. This step exists because
`landing.component.scss` is compiled globally as well as component-scoped via
`src/scss/component-themes.scss`.

### Last Step: Validate & Shut Down

- Verify every assertion in the checklist below
- Record which failures, if any, pre-existed the change (the two `ng test`
  compile errors and the 477 `ng lint` errors are pre-existing and must not be
  reported as regressions)
- Stop the dev server with Ctrl-C

---

## Assertions Checklist

Each checkbox maps to an acceptance criterion from the spec.

- [ ] AC1 — Three cards, each with its own visible subtitle
- [ ] AC2 — Subtitles read `AI, Agents & LLMs`, `Infrastructure & MLOps`,
      `Full-Stack, Data & Testing` in English and `IA, Agentes y LLMs`,
      `Infraestructura y MLOps`, `Full-Stack, Datos y Pruebas` in Spanish
- [ ] AC3 — Thirty entries in total, matching the spec grouping lists exactly
- [ ] AC4 — No technology appears more than once; no standalone Redis entry
- [ ] AC5 — Every entry shows name, label, percentage, and progress bar
- [ ] AC6 — Percentages never increase reading each card top to bottom, in both
      languages
- [ ] AC7 — Every percentage is a whole number between 40 and 95 inclusive
- [ ] AC8 — Every label is an existing tier label and agrees with its band
- [ ] AC9 — Three cards side by side in order at 1024px and wider
- [ ] AC10 — Cards stacked full width in the same order at 768px and below, with
      no horizontal overflow or clipped content
- [ ] AC11 — Language switch translates heading, subtitles, and labels while
      names and percentages are unchanged
- [ ] AC12 — No raw translation key or untranslated placeholder in either
      language
- [ ] AC13 — Entry presentation preserved, including the label moving beneath the
      progress bar on narrow stacked cards
- [ ] AC14 — Section still reachable at `#skills` and in the same scroll position
- [ ] AC15 — Legible in the light, dark, and mint themes

---

## Seed Data Reference

None. There is no database and no seed command. The thirty entries are compiled
into `SKILL_GROUP_DEFINITIONS` in
`src/app/components/landing/landing.component.ts`; the card subtitles live in
`src/assets/i18n/en.json` and `src/assets/i18n/es.json`.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `LANDING.SKILLS_GROUP_AI` renders as literal text | The key is missing from the catalogue for the active language, or the catalogue JSON failed to parse | Compare `LANDING` keys in `en.json` and `es.json`; check the Network tab for a failed `assets/i18n/*.json` request |
| Spanish subtitles are correct but a label still reads `Experienced` | The `onLangChange` path did not rebuild the groups | Confirm the callback calls `buildSkillGroups(this.labels)` after the label switch assigns `this.labels` |
| A card renders in a different order after a language switch | The sort is not inside `buildSkillGroups` | Move the sort into the builder so both init paths are identical |
| Proficiency label overlaps a wrapped technology name | The above-768px rule from Decision 5 is missing or is nested outside `.skills-cards-container` | Re-check the SCSS placement inside `@mixin landing-theme` |
| Cards do not sit side by side at 1024px | `.skills-container` is still `max-width: 725px`, or the SCSS was added outside the mixin | See plan Decisions 6 and 7 |
| Horizontal scrollbar appears at 769-900px | A flex child is missing `min-width: 0` | Add it to `.skills-card` and `.skill-name` |
| `ng` fails with `ERR_OSSL_EVP_UNSUPPORTED` | Node 17+ without the legacy OpenSSL provider | `export NODE_OPTIONS=--openssl-legacy-provider` or `nvm use 14` |
| A style change appears on an unrelated page | `landing.component.scss` is also compiled globally | Confirm every new rule is nested under `.skills-section` |

---

## Known Limitations

- **No automated browser coverage.** `browser_automation` is `none` in
  `.ai-dev-workflow.yaml`, Playwright is not installed, and the Protractor suite
  is an unmodified CLI stub. Every step here is a manual walkthrough.
- **The unit suite cannot be run as-is.** Two pre-existing TypeScript errors
  (`src/app/app.component.spec.ts:26` and
  `src/app/directives/better-highlight.directive.spec.ts:5`) block compilation of
  the whole spec program, so `landing-skills.spec.ts` only runs with those two
  files temporarily excluded. See the Testing Strategy section of the plan.
- **No design assets exist for this item**, so this runbook contains no
  expected-vs-actual fidelity step. Do not invent a visual baseline.
- Percentage values are illustrative author-assigned numbers. This runbook
  verifies the spec's structural rules (range, ordering, band agreement), not the
  accuracy of any individual value.
</content>
</invoke>
