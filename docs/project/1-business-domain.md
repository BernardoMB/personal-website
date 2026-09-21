# Business Domain

---

## Overview

This is the personal portfolio and online CV of Bernardo Mondragón Brozon, an
actuary and full-stack developer based in Mexico City. It presents his
professional profile, work history, project portfolio and personal interests to
prospective employers, clients and collaborators, and gives them a direct way to
make contact. The site is fully bilingual (English and Spanish) and is a
client-only Angular single-page application: all content is compiled into the
bundle, and the only backend calls are three AWS Lambda endpoints used for
outbound messaging.

## Actors

| Actor                     | Description                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Visitor                   | Anonymous public reader. Browses the landing page, biography, CV, project portfolio and hobbies. No authentication exists.    |
| Recruiter / hiring contact | A visitor with intent. Reads the CV, downloads or views the résumé PDF, and initiates contact by WhatsApp or email.          |
| Site owner                | Bernardo. The sole content author. All content is changed by editing source files and i18n catalogues, then redeploying.      |
| Supporter                 | A visitor who chooses to send a monetary tip through the `/donate` page.                                                      |

There are no accounts, roles, permissions or sessions. Every visitor sees the
same content; the only per-visitor state is the selected theme and language.

## Core Entities

All entities are compile-time constants held in in-memory Angular services. None
are persisted, and none have identifiers issued by a backend.

### Project

- **Description**: One portfolio entry describing a piece of professional or personal work. 26 entries spanning 2014-2025, grouped by year.
- **Key attributes**: `id`, `name`, `code`, `thumbnail` (mostly local SVG icons), `description` (an HTML string), `images` (local assets or remote URLs).
- **Relationships**: belongs to a year grouping; rendered in a list view and a detail view with previous/next navigation.
- **Source**: `src/app/modules/projects/services/projects.service.ts`
- **Note**: several entries are deliberately marked confidential and render a placeholder instead of real detail.

### Hobby

- **Description**: A personal-interest card (Football/Soccer, Math, Video Games).
- **Key attributes**: title, image, `description` (an HTML string).
- **Source**: `src/app/modules/hobbies/services/hobbies.service.ts`

### Skill

- **Description**: A technology or tool with a self-assessed proficiency percentage and a bilingual proficiency label. 13 entries rendered as sorted progress bars.
- **Key attributes**: name, percentage (40-95), proficiency label.
- **Source**: hardcoded array in `src/app/components/landing/landing.component.ts`.

### CV Entry

- **Description**: An education record or a work-experience record shown on `/experience`. Work entries may contain nested contract sub-sections.
- **Key attributes**: institution or employer, role, start and end dates, description. Durations are humanized at render time with `moment`.
- **Source**: hardcoded arrays in `src/app/modules/experience/components/experience-root/experience-root.component.ts`.

### Contact Message

- **Description**: An outbound message from a visitor. The only entity that leaves the browser.
- **Key attributes**: name, email, message (minimum 10 characters).
- **Relationships**: delivered by one of two channels — WhatsApp (composed into a `wa.me` deep link, never touching the backend) or email (POSTed to an AWS Lambda).

### Donation

- **Description**: A card-payment attempt submitted from `/donate`.
- **Key attributes**: cardholder name, card number, expiry month/year, CVV.
- **Relationships**: POSTed directly to the `buymeacoffee` Lambda endpoint.
- **Note**: see Business Rules — this flow carries an unresolved compliance concern.

## Business Rules

- The site is read-only for visitors. There is no authentication, no authorization and no user-generated persisted content.
- Content changes require a code change and a redeploy; there is no CMS or admin surface.
- Exactly two locales are supported: `en` and `es`. The initial language is taken from the browser, matched against `/en|es/`, and falls back to `en`. Language selection is **not** persisted between visits.
- Three themes exist (light, dark, mint). The selection **is** persisted, in `localStorage` under the key `theme`. The default is `light-theme`.
- Contact messages require a message of at least 10 characters; the email channel additionally requires a valid email address.
- Project, hobby and CV descriptions are authored as HTML and rendered with `[innerHtml]`. Project descriptions additionally pass through `DomSanitizer.bypassSecurityTrustHtml` so that inline `style` attributes survive. This is safe only while the content remains author-controlled and compiled into the bundle; it must not be pointed at any dynamic or third-party source.
- The `/donate` form transmits the raw card number, expiry and CVV as JSON to a custom Lambda endpoint. There is no tokenization and no PCI-compliant payment element. **Treat this as a known open risk**, not as a pattern to extend or replicate.

## Glossary

| Term            | Definition                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| Landing         | The `/home` route — a single scrolling page with six anchored sections (top, services, skills, my-work, coffee, contact). |
| Services        | The four/five role cards on the landing page (Actuary, AI Developer, Full-stack Engineer, Data Scientist, Teacher). Unrelated to Angular `@Injectable` services. |
| My Work         | The landing section linking out to Medium, GitHub and Academia.edu.                                      |
| Coffee / Donate | The tipping flow at `/donate`, reached from the landing "coffee" teaser.                                 |
| Jumbotron       | A full-width hero image block used on several pages.                                                     |
| Theme           | One of `light-theme`, `dark-theme`, `mint-theme` — a CSS class applied to `body` and the CDK overlay container. |
| Confidential project | A portfolio entry whose detail is withheld and replaced with a placeholder.                         |

## Out of Scope

- User accounts, login, sessions, roles or permissions.
- Any database or server-side persistence. See `4-database-model.md`.
- A content management system or admin UI — all content is edited in source.
- E-commerce, order management or invoicing. `/donate` is a one-shot tip, not a store.
- Locales beyond English and Spanish.
- Server-side rendering. The app is a client-rendered SPA with no Angular Universal setup.
