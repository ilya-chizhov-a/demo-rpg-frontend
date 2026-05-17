# Product And UX Overview

`demo-rpg-frontend` is the public Branching Tales RPG codex: a readable game
database for heroes, items, monsters, world entities, quests, and guides.

The frontend still proves Revisium capabilities, but that proof is secondary to
the game-database UX. Technical evidence lives in the Explainer Widget: request,
variables, response sample, field attribution, and source links.

## Product Rules

- The app is read-only and unauthenticated.
- The UI is a codex/database, not combat, progression, inventory management, or
  other game runtime mechanics.
- Every page has a specific database or guide job. Decorative pages are not
  added.
- The Explainer Widget is the visible technical explanation layer, not a debug
  panel.
- Fantasy content provides context; chrome stays precise, calm, dense, and
  readable.

## Canonical Documents

| Document                                  | Purpose                                                                 |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| [Project Brief](./project-brief.md)       | Business context, audience, positioning, success metrics, and v1 scope. |
| [Page Inventory](./page-inventory.md)     | All routes, data sources, page specs, capability coverage, status.      |
| [Site Map And Transitions](./site-map.md) | Navigation graph and allowed user transitions.                          |
| [Feature Map](./feature-map.md)           | Capability-to-route map for planning and QA coverage.                   |
| [Page Patterns](./page-patterns.md)       | Shared UX contracts across page families.                               |
| [Explainer Widget](./explainer-widget.md) | Frontend-owned implementation contract for the cross-page widget.       |
| [Page Specs](./pages/)                    | Per-route behaviour and acceptance criteria.                            |

## Page Families

| Family                    | Routes                                                                                                                                                                             | Product job                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Codex entry and narrative | `/`, `/about`                                                                                                                                                                      | Start browsing the database; keep architecture secondary.                                                                      |
| Catalogs                  | `/regions`, `/heroes`, `/items`, `/monsters`, `/quests`, `/parties`, `/factions`, `/npcs`, `/locations`, `/classes`, `/abilities`, `/item-types`, `/stats`, `/effects`, `/dialogs` | Show game-facing entity collections backed by schema-generated APIs, filtering, sorting, pagination, files, formulas, and FKs. |
| Details                   | `/regions/[id]`, `/heroes/[id]`, `/items/[id]`, `/monsters/[id]`, `/quests/[id]`, `/parties/[id]`, `/factions/[id]`, `/npcs/[id]`, `/locations/[id]`                               | Show rich schema shapes, formula outputs, file fields, FK resolution, and federation.                                          |
| Discovery                 | `/search`                                                                                                                                                                          | Search across game data and guide/article content once the source is available.                                                |
| Revision story            | `/balance-patch`                                                                                                                                                                   | Show `head` vs `draft` data views and revision diff.                                                                           |
| Guides and updates        | `/blog`, `/blog/[slug]`, `/news`, `/news/[slug]`                                                                                                                                   | Use `blog_posts` for guides/articles; keep news blocked until a source is confirmed.                                           |

## Implementation Readiness Rule

A page may move from spec to code only when its document defines:

- data source and GraphQL operation shape;
- visible page blocks;
- all user actions;
- loading, error, empty, and loaded states;
- desktop, tablet, and phone layout;
- Explainer Widget descriptor requirements;
- acceptance criteria;
- known blockers.

If any of these are missing, finish the page spec before implementation.
