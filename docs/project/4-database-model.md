# Database Model

> **STATUS: NOT APPLICABLE**
>
> This project has no database. The document is retained so that the
> `docs/project/` set stays complete and the links from `AGENTS.md` and
> `docs/README.md` resolve.

---

## Why there is no database

The site is a client-rendered Angular single-page application whose content is
compiled into the bundle. This was verified against the source rather than
assumed: a search across `src/` and `package.json` for `firebase`, `supabase`,
`mongo`, `sequelize`, `prisma`, `sqlite` and `indexeddb` returns no dependency
and no usage. The only matches are the literal strings `MongoDB`, `PostgreSQL`
and `SQL Server` appearing as prose inside portfolio and CV copy describing
_other_ projects.

There is no ORM, no query layer, no migration tooling and no service-worker
cache.

## Where state actually lives

| State                     | Mechanism                                   | Lifetime                    |
| ------------------------- | ------------------------------------------- | --------------------------- |
| Portfolio, hobbies, CV, skills | TypeScript constants in in-memory services | Compile time; changes require a redeploy |
| Selected theme            | `localStorage` key `theme`                  | Persists across visits      |
| Selected language         | In-memory (`TranslateService`)              | Lost on reload; re-derived from the browser language |
| Loading-bar state         | RxJS `Subject` in `LoaderService`           | Session only                |
| Contact / donation input  | Reactive form state                         | Discarded after submission  |

Nothing is written to a server from this repository. The three AWS Lambda
endpoints in `contact.service.ts` are fire-and-forget message delivery; whatever
persistence exists behind them is owned elsewhere and is out of scope for this
repository.

## If a datastore is ever added

Replace this document with the real model and update:

- `docs/project/3-software-architecture.md` § Data Access Layer
- `docs/best-practices/STACK-SPECIFIC.md`
- `AGENTS.md` § Key Documentation

The framework also ships a general database best-practices seed at
`docs/best-practices/4-database.md` in the upstream template; it was
deliberately not copied into this repository.
