# Heroes Catalog

| Field | Value |
| --- | --- |
| Route | `/heroes` |
| Status | In delivery |
| Pattern | Catalog |
| Primary capability | Portrait gallery, class FK filter, formula string, filter/sort/pagination |

## Purpose

Show a people-style portrait gallery for choosing a hero. The catalog keeps
cards intentionally light: portrait first, formula-derived display name second,
and full facts moved to `/heroes/[id]`. Region and faction labels are deferred
until the API exposes those hero fields.

## Context And Entry

- Linked from home, classes, parties, factions, and related quests.
- Hero cards link to `/heroes/[id]`.

## Functional Blocks

| Block | Requirement |
| --- | --- |
| Header | Title and capability chips for portrait gallery, formulas, files. |
| Filters | Class, veteran toggle, level range, name search. |
| Sort | Level, display name, published date. |
| Hero list | Portrait tiles with optional display names only. |
| Explainer Widget | Required; shows class FK filter payload, formula string field, and portrait metadata. |

## Primary Actions

| Action | Result |
| --- | --- |
| Filter by class FK | Updates `where` payload and fetches heroes. |
| Sort list | Updates `orderBy`. |
| Open portrait tile | Navigate to `/heroes/[id]`. |
| Reset filters | Return to default list. |

## States

| State | Requirement |
| --- | --- |
| Loading | Preserve filters and show skeleton list. |
| Loaded | Cards render as clickable portrait/name tiles without stat summaries. |
| Empty | Reset action and visible filter payload. |
| Error | Service-aware error with retry. |

## Transitions

| From | Trigger | To |
| --- | --- | --- |
| Loaded catalog | Filter/sort changes | Refreshing catalog |
| Loaded catalog | Open hero | `/heroes/[id]` |
| Empty | Reset filters | Default catalog |

## Data Contract

| Source | Fields |
| --- | --- |
| `data.heroes` | `id`, `data.name`, `display_name_en`, `level`, `class_id`, `portrait`, `is_veteran`. |
| `data.classes` | id/name for filters and cards. |

## Explainer Widget

- Summary: "Heroes demonstrate class FK filters, computed display labels, localized content, and portrait file fields."
- Variables: locale, class filter, veteran filter, level range, cursor, sort.
- Deep links: heroes table/schema plus selected class table.
- Subgraphs: `data`.

## Responsive Rules

- Phone: filter controls wrap above the list; portrait tiles stay one column.
- Tablet/Desktop: filter controls stay visible; widget sits near the list.

## Architecture Notes

- Class option loading can be separate requests owned by the ViewModel.
- Display label should prefer API formula field where available.

## Acceptance Criteria

- [x] Class FK options use real Revisium rows.
- [x] Catalog tiles show only portrait and display name.
- [x] Portraits render with stable dimensions and fallback.
- [x] Formula-derived display name is called out in the widget.
- [x] Pagination remains visible when the API returns more than one page.

## Open Questions

- Confirm when hero `region_id` and `faction_id` become available so those
  labels and filters can be restored.
