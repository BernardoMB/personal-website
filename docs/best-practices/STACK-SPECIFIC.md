# Stack-Specific Best Practices

---

## Stack Summary

This project uses **TypeScript 4.0.2** and **Angular 11** (NgModule-based, no
standalone components), styled with **SCSS** and **Angular Material 11** using
the legacy Sass theming API. Internationalization is **@ngx-translate** with two
locales (`en`, `es`). Unit tests run on **Karma + Jasmine**, end-to-end tests on
**Protractor**, and linting is **tslint + codelyzer**. There is **no database
and no backend** in this repository. CI/CD is **Azure Pipelines** deploying to an
**Azure Web App**.

---

## Best Practices by Technology

| Area                        | File                                           |
| --------------------------- | ---------------------------------------------- |
| Internationalization (i18n) | [stack/i18n.md](stack/i18n.md)                 |

> Angular, TypeScript and SCSS conventions for this project are captured in the
> Quick Reference below rather than in separate `stack/` files. Add a
> `stack/<technology>.md` file and a row here when a topic outgrows a bullet.

---

## Quick Reference

The rules most likely to be violated in this codebase. Detail lives in
`docs/project/3-software-architecture.md`.

- **Never widen the `bypassSecurityTrustHtml` surface.** Project descriptions are
  rendered with `[innerHtml]` after `DomSanitizer.bypassSecurityTrustHtml`, and
  hobby and CV descriptions use `[innerHtml]` directly. This is safe only while
  the content is author-written and compiled into the bundle. If content ever
  comes from a form, an API or a third party, sanitization must be reinstated.

- **Nine component stylesheets are also global.** `src/scss/component-themes.scss`
  `@import`s header, sidebar, footer, loadingbar, scroll-to-top,
  scroll-indicator, ng-feedback-theme, landing and projects-root SCSS directly.
  Editing any of them changes global CSS as well as the component's scoped
  styles. Check both before assuming a style change is local.

- **Templates are strictly typed even though TypeScript is not.** `strict` is
  `false` but `strictTemplates`, `strictInjectionParameters` and
  `strictInputAccessModifiers` are on. A template will reject a nullable binding
  that the component code accepts silently.

- **Register new lazy modules with the shared i18n loader.** Every lazy feature
  module must import `HttpLoaderFactory` from `src/app/app.module.ts` and call
  `TranslateModule.forChild({ loader: ... })`, or its translation keys render as
  raw key strings.

- **Keep `en.json` and `es.json` in lockstep.** Every key added to one catalogue
  must be added to the other. There is already one live mismatch
  (`MESSAGE_CHARACTERS` vs `MESSAGE_CHARACTE1RS`) — do not add more. See
  [stack/i18n.md](stack/i18n.md).

- **Watch for the shadowed `DOCUMENT` token.** `src/app/providers/document.provider.ts`
  exports its own `DOCUMENT` injection token that shadows the one from
  `@angular/common`. Both are used in different files. Always check which one an
  import resolves to.

- **Do not extend the `/donate` card-handling pattern.** It POSTs a raw PAN,
  expiry and CVV to a custom Lambda with no tokenization, and logs the card
  number to the console. Any payment work should move to a hosted payment
  element, not copy this flow.

- **Respect the asset budget.** `src/assets` is 49 MB, and the production budget
  sets a 20 MB error ceiling precisely because of it (one jumbotron image alone
  is 15 MB). Compress new images before adding them; prefer SVG for icons.

- **Test stubs are not a baseline.** All 35 `*.spec.ts` files are unmodified CLI
  scaffolding and the suite does not compile (2 errors, verified). When touching
  a component, write a real spec with `TranslateModule.forRoot()`,
  `RouterTestingModule`, `HttpClientTestingModule` and the Material modules it
  needs — do not copy the neighbouring stub.

- **`ng lint` is already red — 477 errors across 39 files.** Fix lint errors in
  the files you touch; do not attempt a repo-wide cleanup inside a feature
  change, and do not treat the pre-existing noise as your regression.

- **On Node 17+, export `NODE_OPTIONS=--openssl-legacy-provider`.** Angular 11's
  webpack 4 uses MD4 hashing, which OpenSSL 3 rejects. With the flag set,
  `npm ci` and `ng build --prod` both succeed on Node 24 (verified). Without it
  every `ng` command dies with `ERR_OSSL_EVP_UNSUPPORTED`. CI pins Node 14, where
  the flag is unnecessary. Note `package.json` declares the version under the
  misspelled key `"engine"`, so npm does not enforce it.
