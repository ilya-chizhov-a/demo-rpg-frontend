# Heroes Catalog

| Field | Value |
|---|---|
| Route | `/heroes` |
| Status | Draft |
| Pattern | Catalog |
| Primary capability | FK filters, formula string, portrait file, filter/sort/pagination |

## Purpose

Show a people-style catalog where rows resolve class, region, and faction
foreign keys while displaying localized names and computed display labels.

## Context And Entry

- Linked from home, parties, factions, and related quests.
- Hero cards link to `/heroes/[id]`.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Title and capability chips for FKs, formulas, files. |
| Filters | Class, region, faction, level range, name search. |
| Sort | Level, display name, class, region. |
| Hero list | Portrait, display name, class, region, faction, level, veteran badge. |
| Explainer Widget | Required; shows FK filter payload and formula string field. |

## Primary Actions

| Action | Result |
|---|---|
| Filter by FK | Updates `where` payload and fetches heroes. |
| Sort list | Updates `orderBy`. |
| Open hero | Navigate to `/heroes/[id]`. |
| Reset filters | Return to default list. |

## States

| State | Requirement |
|---|---|
| Loading | Preserve filters and show skeleton list. |
| Loaded | Cards render with portraits and resolved FK labels. |
| Empty | Reset action and visible filter payload. |
| Error | Service-aware error with retry. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Loaded catalog | Filter/sort changes | Refreshing catalog |
| Loaded catalog | Open hero | `/heroes/[id]` |
| Empty | Reset filters | Default catalog |

## Data Contract

| Source | Fields |
|---|---|
| `data.heroes` | `id`, `data.name`, `data.epithet`, `display_name_en`, `level`, `class_id`, `region_id`, `faction_id`, `portrait`, `is_veteran`. |
| `data.classes` | id/name for filters and cards. |
| `data.regions` | id/name for filters and cards. |
| `data.factions` | id/name for filters and cards. |

## Explainer Widget

- Summary: "Heroes demonstrate FK-backed filters, computed display labels, localized content, and portrait file fields."
- Variables: locale, FK filters, level range, cursor, sort.
- Deep links: heroes table/schema plus selected FK tables.
- Subgraphs: `data`.

## Responsive Rules

- Phone: filters as bottom sheet; portrait cards one column.
- Tablet/Desktop: filter controls stay visible; widget uses the shared floating
  trigger and overlay panel contract.

## Architecture Notes

- FK option loading can be separate requests owned by the ViewModel.
- Display label should prefer API formula field where available.

## Acceptance Criteria

- [ ] FK dropdowns use real Revisium rows.
- [ ] Portraits render with stable dimensions.
- [ ] Formula-derived display name is called out in the widget.

## Open Questions

- Confirm query support for resolving FK labels in one operation.
