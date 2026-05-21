# Quests Catalog

| Field | Value |
|---|---|
| Route | `/quests` |
| Status | In delivery |
| Pattern | Catalog |
| Primary capability | FK columns, level filter, repeatable flag |

## Purpose

Show quest rows as content records with NPC and step-location relationships,
level filtering, and repeatable boolean display.

## Context And Entry

- Entry from home, dictionary navigation, NPC/location detail pages, and search.
- Quest rows link to `/quests/[id]`.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Quest catalog purpose and capability chips. |
| Filters | `level_required` range, repeatable-only toggle, giver NPC, primary step location. |
| Quest list | Title, giver NPC, primary step location, level, repeatable flag, step count. |
| Explainer Widget | Required. |

## Primary Actions

| Action | Result |
|---|---|
| Filter level/repeatable/NPC/location | Updates query payload. |
| Open quest | Navigate to `/quests/[id]`. |
| Reset | Clears filters. |

## States

| State | Requirement |
|---|---|
| Loading | Skeleton rows. |
| Loaded | Quest list with FK labels. |
| Empty | Reset. |
| Error | Retry and readable message. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Loaded catalog | Filter changes | Refreshing catalog |
| Loaded catalog | Open quest | `/quests/[id]` |
| Empty | Reset filters | Default catalog |

## Data Contract

| Source | Fields |
|---|---|
| `data.quests` | `id`, localized `name`/`description`, `giver_npc_id`, `steps[].location_id`, `level_required`, `is_repeatable`, `step_count`, pagination. |
| `data.npcs`, `data.locations` | labels for filters and display. |

## Explainer Widget

- Summary: "Quests show FK-backed catalog columns and filters plus computed step count."
- Variables: level range, repeatable-only flag, giver NPC filter, primary step location filter, locale, cursor.
- Deep links: quests table/schema.
- Subgraphs: `data`.

## Responsive Rules

- Phone: rows become cards; filters bottom sheet.
- Tablet/Desktop: table is acceptable for dense quest comparison.

## Architecture Notes

- Quest catalog may become the reference for boolean filters.
- The catalog location column and filter use the first authored quest step as
  the primary step location because the generated quest row has no top-level
  `location_id`.

## Acceptance Criteria

- [ ] Repeatable flag is readable and filterable.
- [ ] NPC/location labels come from data, not hardcoded strings.

## Open Questions

- None. The generated schema exposes `level_required`, `is_repeatable`,
  `giver_npc_id`, and nested `steps[].location_id`.
