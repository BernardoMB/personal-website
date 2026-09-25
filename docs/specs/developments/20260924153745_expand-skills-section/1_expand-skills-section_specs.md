# Expand Skills Section — Spec

---

## Overview

The Skills section of the landing page currently presents a single card holding one
list of thirteen technologies, each shown with a proficiency label, a completion
percentage and a progress bar. This change expands that section into three
thematically grouped cards presented side by side, together covering thirty
technologies that reflect the author's current professional focus on AI, platform
infrastructure and full-stack delivery. The purpose is to give recruiters and
prospective clients a fuller and better-organised picture of the author's technical
range at a glance, without changing how any individual skill entry looks or behaves.
This is a content and layout expansion of an existing section, not a new capability
and not a redesign of the skill entry itself.

---

## Use Cases

### Use Case 1: Visitor reviews the author's technical skills

**Actor**: Anonymous site visitor (typically a recruiter or prospective client).
**Preconditions**: The visitor is on the landing page and has scrolled to, or
navigated via an in-page link to, the Skills section. No sign-in, no prior action
and no data entry is required.

**Steps**:

1. The visitor reaches the Skills section.
2. The visitor reads the section heading and the three card subtitles.
3. The visitor scans the skill entries inside each card.

**Postconditions**: The visitor has seen every technology the author claims, grouped
by theme, with a proficiency indication for each. Nothing is created, changed or
stored; the page state is unchanged.

**Information shown**:

- The existing Skills section heading, in the visitor's current language.
- Three cards, each with its own subtitle naming the theme of that card, in the
  visitor's current language.
- Inside each card, that card's skill entries. Each entry shows the technology name,
  a proficiency label, a completion percentage and a progress bar reflecting that
  percentage — the same four elements shown for every entry today.

**Actions available**:

- None. The section is read-only presentational content. The visitor can only scroll,
  resize the window, or switch site language and theme using the existing global
  controls.

**Considerations**:

- There is no user input, so there are no validation, error or edge-case flows.
- The content is always present and is not fetched after page load, so there is no
  empty state, loading state or failure state for this section.
- Switching language while the section is visible updates the section heading, the
  three card subtitles and the proficiency labels; technology names and percentages
  are unaffected, consistent with how the section behaves today.

---

## Business Rules

- The Skills section contains exactly three skill cards.
- The three cards together present thirty technology entries. Every entry appears in
  exactly one card; no entry is repeated within a card or across cards.
- Card membership is fixed and is defined by the grouping in the UX Rules section
  below. A technology may not be moved between cards without a spec change.
- Within each card, entries are ordered by completion percentage from highest to
  lowest. Ordering is independent per card; the cards are not merged or re-ranked
  against one another. Entries sharing the same percentage may appear in either
  order relative to each other.
- Every entry has a completion percentage and a proficiency label. Neither may be
  blank.
- Completion percentages are whole numbers in the range 40 to 95 inclusive, matching
  the range already used by the section so that bar lengths remain visually
  comparable. No entry is shown at 0 percent or 100 percent.
- Completion percentages and proficiency labels are illustrative values chosen by the
  author to convey relative familiarity. They are not the output of a verified or
  externally assessed skill measurement, and the site makes no such claim. Individual
  values are assigned by the author during implementation rather than being fixed by
  this spec.
- Proficiency labels are drawn only from the existing three-tier scheme already used
  by the section (see Proficiency Labels below). No new tier is introduced and no
  existing tier wording is changed.
- A label must agree with its percentage, using these bands: 70 percent and above is
  the top tier, 55 to 69 percent is the middle tier, and below 55 percent is the
  entry tier. As a consequence, no entry carrying a lower tier may show a higher
  percentage than an entry carrying a higher tier.
- Technology names are presented identically in both languages and are not
  translated, consistent with the section's current treatment of names such as
  "JavaScript/TypeScript".
- The section heading and the three card subtitles are translated and must have
  content in both English and Spanish.

---

## UX Rules

### Card grouping and content

The three cards, in display order, are:

**Card 1 — "AI, Agents & LLMs"** (Spanish subtitle: "IA, Agentes y LLMs"):

- Python
- TensorFlow / PyTorch
- LangChain / LangGraph
- AutoGen / CrewAI
- RAG
- Agentic Development
- OpenAI API / Anthropic Claude API
- OpenAI Function Calling / MCP
- Diffusion models / Generative Agents
- Unreal Engine for AI

**Card 2 — "Infrastructure & MLOps"** (Spanish subtitle: "Infraestructura y MLOps"):

- Vertex AI / Azure ML / AWS SageMaker
- Kubernetes (K8s)
- Docker
- CI/CD pipelines
- Terraform / Pulumi
- Prometheus / Grafana
- vLLM / Triton
- CUDA / NVIDIA Triton Inference Server
- Distributed training frameworks
- Kafka / Pub/Sub / RabbitMQ

**Card 3 — "Full-Stack, Data & Testing"** (Spanish subtitle: "Full-Stack, Datos y
Pruebas"):

- Next.js / React
- FastAPI / Flask
- GraphQL
- SQL + NoSQL + Redis
- Data pipelines
- ETL tools
- Snowflake / BigQuery
- Playwright / Cypress
- Unit + Integration Testing
- OAuth2 / JWT

The listing order above is the authoring order, not the display order: within each
card, entries are displayed sorted by completion percentage, highest first, as
stated in Business Rules.

Naming note: "vLLM / Triton" and "CUDA / NVIDIA Triton Inference Server" are two
separate entries, not a duplication. The first refers to the Triton GPU kernel
language; the second refers to NVIDIA's inference-serving platform. The wording
above is the author's confirmed wording. Should the author prefer the unambiguous
form "vLLM / OpenAI Triton", that is a label-only substitution that changes no rule,
count or criterion elsewhere in this spec.

### Layout

- The existing Skills section heading remains above the cards, unchanged in wording,
  placement and translation behaviour.
- Each card carries its own subtitle, shown at the top of that card.
- At viewport widths above roughly 768 pixels the three cards sit side by side in a
  single row, in the order Card 1, Card 2, Card 3 from left to right, with equal
  visual weight.
- At viewport widths of roughly 768 pixels and below, the cards stack vertically at
  full width, one above another, preserving the same order top to bottom. This
  matches how the rest of the landing page reflows on narrow screens.
- Each card keeps the card styling already used by the section today; the change
  multiplies the existing card across three groups rather than introducing a new
  card treatment.

### Skill entry presentation

- Each entry keeps exactly the presentation used today: the technology name, the
  proficiency label, the completion percentage shown as a percentage, and a progress
  bar whose fill reflects that percentage.
- The existing narrow-screen behaviour of an individual entry is preserved: on very
  narrow viewports the proficiency label moves out of the name row and is shown
  beneath the progress bar, as it does today.
- No entry gains a link, tooltip, icon, logo, hover detail or any other new
  interactive affordance.

### Language and states

- Switching the site language updates the section heading, the three card subtitles
  and every proficiency label. Technology names and percentages remain identical in
  both languages.
- Both languages must be complete: no raw translation key and no untranslated
  placeholder may be visible in either language.
- The section has no empty, loading or error state, because its content is always
  present as part of the page.

---

## Proficiency Labels

The section reuses the three proficiency tiers it already displays. No tier is added,
removed or reworded by this change.

| Tier       | English display label | Spanish display label | Applies when            |
| ---------- | --------------------- | --------------------- | ----------------------- |
| Top        | Experienced           | Experimentado         | 70 percent and above    |
| Middle     | Intermediate          | Intermedio            | 55 to 69 percent        |
| Entry      | Beginner              | Pricipiante           | Below 55 percent        |

The Spanish entry-tier label is reproduced exactly as it is currently shown on the
site, including its existing spelling. Correcting it is deliberately out of scope
(see Out of Scope below).

These are display tiers for static content. There is no lifecycle and there are no
transitions between tiers at runtime; a tier changes only when the author edits the
content and the site is redeployed.

---

## Acceptance Criteria

- [ ] The Skills section displays three cards, each with its own visible subtitle.
- [ ] The three card subtitles read "AI, Agents & LLMs", "Infrastructure & MLOps" and
      "Full-Stack, Data & Testing" in English, and "IA, Agentes y LLMs",
      "Infraestructura y MLOps" and "Full-Stack, Datos y Pruebas" in Spanish.
- [ ] Counting all three cards, thirty technology entries are shown, and the set
      matches the grouping lists in UX Rules exactly — every listed technology
      appears, in its assigned card, and nothing else appears.
- [ ] No technology appears more than once anywhere in the section. In particular,
      Redis appears only as part of "SQL + NoSQL + Redis" and there is no separate
      standalone Redis entry.
- [ ] Every entry shows all four elements: technology name, proficiency label,
      completion percentage and progress bar.
- [ ] Reading each card top to bottom, completion percentages never increase.
- [ ] Every completion percentage is a whole number between 40 and 95 inclusive.
- [ ] Every proficiency label is one of the three existing tier labels for the
      current language, and agrees with the entry's percentage band defined in
      Proficiency Labels.
- [ ] At a viewport width of 1024 pixels or wider, the three cards render side by
      side in one row, in the order Card 1, Card 2, Card 3 from left to right.
- [ ] Narrowing the browser window to roughly 768 pixels or less stacks the three
      cards vertically at full width, in the same order top to bottom, with no
      horizontal overflow or clipped content.
- [ ] Switching the site language between English and Spanish translates the section
      heading, all three card subtitles and all proficiency labels, and leaves every
      technology name and percentage unchanged.
- [ ] No raw translation key and no untranslated placeholder text is visible in the
      section in either language.
- [ ] Each individual entry keeps today's name / label / percentage / progress-bar
      elements and content unchanged. The proficiency label always renders beneath
      the progress bar, at every viewport width, in both the stacked and side-by-side
      layouts. This differs from today's single-card behaviour, where the label sits
      inline beside the bar above roughly 528px: with this section's longest
      technology names (e.g. "Diffusion models / Generative Agents", "CUDA / NVIDIA
      Triton Inference Server"), no card width this component produces — stacked or
      side-by-side — is wide enough to fit every entry's label inline without
      overlapping its name, so the inline placement is dropped rather than applied
      inconsistently across entries.
- [ ] The section remains reachable at its existing in-page anchor and its position
      in the landing page's scroll order is unchanged.
- [ ] In each of the three site themes, every card subtitle, technology name,
      proficiency label, percentage and progress bar stays visible and legible
      against its background.

---

## Out of Scope (MVP)

- Redesigning the individual skill entry. The name, label, percentage and progress
  bar elements and their styling stay exactly as they are, except for the label's
  position, which is governed entirely by the acceptance criterion above.
- Any new interactivity in the section: filtering, searching, sorting controls,
  expand/collapse, tooltips, technology logos or links to external documentation.
- Translating technology names. They stay identical in English and Spanish.
- Correcting the existing Spanish entry-tier label spelling. It is reproduced as-is
  here so this change stays content-and-layout only; correcting it is a separate
  item.
- Introducing a fourth or subsequent card, or making the number of cards
  configurable.
- Moving skills content out of the codebase into a content management system, a data
  file or any external source. Content remains compiled into the site and changed by
  redeploy, as it is today.
- Changes to any other landing-page section, to the Services role cards, to the
  Experience page, or to the downloadable résumé PDF, even where they mention
  overlapping technologies.
- Any claim, badge, certification link or evidence that the proficiency values are
  externally verified.
- Adding analytics, event tracking or measurement of interaction with the section.
