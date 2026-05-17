# Monsters Catalog

| Field | Value |
|---|---|
| Route | `/monsters` |
| Status | Draft |
| Pattern | Catalog |
| Primary capability | Faction FK, embedded drops, formula counters, illustration file |

## Purpose

Show a creature catalog with faction relationships, image files, and formula
summaries derived from embedded drop arrays.

## Context And Entry

- Linked from home, factions, quests, and search.
- Monster cards link to `/monsters/[id]`.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Title and capability chips. |
| Filters | Faction and name. Add threat/level range only after a backing field is confirmed. |
| Monster list | Image, name, faction, drop count, average drop chance. |
| Explainer Widget | Required; explains embedded drops and formulas. |

## Primary Actions

| Action | Result |
|---|---|
| Filter faction | Updates FK equality payload. |
| Open monster | Navigate to detail. |
| Reset filters | Restore default list. |

## States

| State | Requirement |
|---|---|
| Loading | Skeleton cards. |
| Loaded | Cards render images and counters. |
| Empty | Reset action. |
| Error | Readable service failure. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Loaded catalog | Filter changes | Refreshing catalog |
| Loaded catalog | Open monster | `/monsters/[id]` |
| Empty | Reset filters | Default catalog |

## Data Contract

| Source | Fields |
|---|---|
| `data.monsters` | `id`, `data.name`, `data.image`, `faction_id`, `drops[]`, `avg_drop_chance`, `drop_count`. |
| `data.factions` | faction labels and links. |

## Explainer Widget

- Summary: "Monsters show embedded drop arrays, formulas over arrays, and image file fields."
- Variables: locale, faction filter, name search, cursor.
- Deep links: monsters table/schema.
- Subgraphs: `data`.

## Responsive Rules

- Phone: image thumbnails use fixed aspect ratio.
- Tablet/Desktop: cards or table depending on density; widget uses the shared
  floating trigger and overlay panel contract.

## Architecture Notes

- Keep image fallback and metadata handling reusable for other file pages.

## Acceptance Criteria

- [ ] Drop count and average drop chance are shown as computed outputs.
- [ ] Image layout does not shift when files load.

## Open Questions

- Confirm threat/level field name if filtering by difficulty is desired.
