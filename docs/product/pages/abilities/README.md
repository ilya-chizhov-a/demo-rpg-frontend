# Abilities Catalog

| Field | Value |
|---|---|
| Route | `/abilities` |
| Status | In delivery |
| Pattern | Small catalog |
| Primary capability | Icon file catalog with localized combat fields |

## Purpose

Show a compact icon-heavy catalog and serve as a target for hero/monster array
foreign keys. The first frontend pass renders the table rows as a localized
catalog and keeps reverse usage links for a later detail surface.

## Context And Entry

- Entry from hero and monster detail pages, search results, and dictionary navigation.
- Links back to referencing heroes/monsters when reverse usage is available.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Explain abilities as reusable rows. |
| Ability list | Icon, name, kind, magic school, level, signed power value, cooldown, description, total count, and cursor-backed fetch-more state. |
| Related usage | Deferred until reverse usage is exposed or a detail route is planned. |
| Explainer Widget | Required. |

## Primary Actions

| Action | Result |
|---|---|
| Review ability stats | Cards expose level, damage/heal, cooldown, kind, and school. |
| Load more | Requests the next cursor page when `pageInfo.hasNextPage` is true and appends cards without clearing the loaded list. |
| Open explainer | Shows GraphQL operation, response sample, and source links. |

## States

| State | Requirement |
|---|---|
| Loading | Icon placeholders. |
| Loaded | Icons render with labels. |
| Empty | Explain missing seed data. |
| Error | Retry. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Catalog loaded | Retry after an error | Refreshing list |
| Catalog loaded | Open explainer | Explainer source view |

## Data Contract

| Source | Fields |
|---|---|
| `data.abilities` | id, `name { en, ru, zh }`, `description { en, ru, zh }`, icon, `kind`, `school`, `level_required`, `base_damage`, `cooldown`. `base_damage` is the signed power value shown by the UI; negative values are rendered as healing/restore values rather than a separate `base_heal` field. |

## Explainer Widget

- Summary: "Abilities show localized combat rows with icon file metadata and enum-like fields."
- Variables: locale, cursor/page info (`first`, optional `after`, `endCursor`, `hasNextPage`).
- Deep links: abilities table/schema.
- Subgraphs: `data`.

## Responsive Rules

- Phone: compact cards with fixed icon boxes.
- Tablet: two-column icon grid with the widget visible.
- Desktop: dense grid.

## Architecture Notes

- Reuse the shared imgproxy file preparation helper when Revisium provides
  renderable icon URLs, and show a stable placeholder when icon rows are empty.
- Use the DataSource/List/Item ViewModel split from the frontend architecture
  guide.

## Acceptance Criteria

- [ ] Localized ability rows render without raw English headings in `ru`/`zh`.
- [ ] Empty icon rows keep fixed icon placeholders without layout shift.
- [ ] Pagination shows initial rows, total/visible counts, and a load-more action while `hasNextPage` is true.
- [ ] Explainer Widget documents the generated GraphQL connection and response sample.

## Open Questions

- Decide whether ability detail route is needed; not planned for v1.
