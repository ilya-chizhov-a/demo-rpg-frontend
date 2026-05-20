# Items Catalog

| Field | Value |
|---|---|
| Route | `/items` |
| Status | In delivery |
| Pattern | Complex catalog |
| Primary capability | Complex `where`, multi-field `orderBy`, pagination, SVG icon files |

## Purpose

Demonstrate the strongest catalog pattern: rich filters, visible JSON payload,
multi-key sorting, cursor pagination, and file icons.

## Context And Entry

- Linked from home capability map, nav, hero detail inventory, quest rewards, and monster drops.
- Cards link to `/items/[id]`.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Title, capability chips for filters, sorting, files, formulas. |
| Filter/sort panel | Name contains, rarity enum, type FK, market value range, multi-key sort; edits update a draft payload before apply. |
| JSON payload preview | Live `where`, `orderBy`, cursor, page size; same payload is used by the Explainer Widget. |
| Item results | Icon, name, type, rarity, market value, rarity tag, short description, modifier preview. |
| Pagination | Cursor-based load more. |
| Explainer Widget | Required; mirrors filter payload and response. |

## Primary Actions

| Action | Result |
|---|---|
| Edit filter | JSON preview updates immediately. |
| Apply filter | Fetches filtered items. |
| Reset filters | Clears payload and re-fetches default list. |
| Sort | Updates multi-key order array. |
| Load more | Fetches next page. |
| Open item | Navigate to detail. |

## States

| State | Requirement |
|---|---|
| Loading | Preserve filter panel and show result skeletons. |
| Loaded | Cards/table with icons and formula values. |
| Empty | Show active JSON filter and reset action. |
| Error | Show failed request with retry and widget error sample. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Loaded catalog | Edit filters | Payload preview updated |
| Payload preview | Apply/debounce | Refreshing catalog |
| Loaded catalog | Open item | `/items/[id]` |
| Empty | Reset filters | Default catalog |

## Data Contract

| Source | Fields |
|---|---|
| `data.items` | `id`, `data.name`, `data.description`, `data.rarity`, `data.type_id`, `data.icon`, `data.modifiers[]`, `base_value`, `weight`, `market_value`, `rarity_tag`, pagination fields. |
| `data.item_types` | id/name for filter dropdown and display. |
| `data.stats` | modifier stat labels resolved through `data.items[].data.modifiers[].stat_id`. |

## Explainer Widget

- Summary: "Items show Revisium query payloads for complex filters, multi-key sorting, cursor pagination, formulas, and SVG file fields."
- Surfaces: GraphQL and REST when available.
- Variables: `where`, `orderBy`, cursor, locale.
- Response sample: visible item rows.
- Deep links: items table/schema and selected row where applicable.
- Subgraphs: `data`.

## Responsive Rules

- Phone: filter panel as bottom sheet; result cards one column; JSON preview scrolls internally.
- Tablet/Desktop: filters left or top, results center, widget right.

## Architecture Notes

- This page should establish reusable filter/sort model helpers if duplication appears.
- Keep JSON payload construction in ViewModel.
- Generated input names are `Demo_rpg_dataGetItemsesInput` and
  `Demo_rpg_dataGetItem_typesesInput`; order fields use the generated
  `data` order field with explicit `path` and `type`.
- Item type FK can be nested in the list query through `data.type_id`.
- The initial catalog query fetches item rows and item type filter options
  together; cursor pagination fetches item rows only and keeps the cached type
  options stable.
- Current seed rows may return empty `data.icon.url` and `mimeType`; the catalog
  still reserves stable icon slots and will render SVG icons through the shared
  image helper when file URLs are populated.

## Acceptance Criteria

- [ ] Filter form and JSON preview stay in sync.
- [ ] Multi-key `orderBy` is visible and used by the request.
- [ ] Item SVG icons render with stable dimensions.
- [ ] Empty state includes reset.

## Open Questions

- Decide whether item catalog filters should support shareable type/stat query
  params once `/item-types` and `/stats` move past placeholders.
