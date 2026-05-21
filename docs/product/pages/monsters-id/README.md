# Monster Detail

| Field | Value |
|---|---|
| Route | `/monsters/[id]` |
| Status | In delivery |
| Pattern | Detail |
| Primary capability | Faction FK, ability array FK, embedded drops, formulas, image file |

## Purpose

Show a monster as a complete row with file preview, faction relationship,
ability references, embedded drops, and computed drop metrics.

## Context And Entry

- Entry from `/monsters`, faction detail, quest references, and search results.
- Links to faction, abilities, drop items, and the monster cloud row.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Localized name, kind badge, faction link, level/HP summary, and description. |
| Description | Localized description/lore. |
| Abilities | Resolved `ability_ids[]` with name, kind, school, level, damage, and cooldown; v1 links to `/abilities` because ability detail routes do not exist yet. |
| Drops | Embedded `drops[]` with item detail links, item rarity, chance, and quantity range. |
| Formula panel | `avg_drop_chance`, `drop_count`, and labelled computed outputs. |
| File panel | imgproxy illustration preview plus image file metadata. |
| Explainer Widget | Required. |

## Primary Actions

| Action | Result |
|---|---|
| Back | Return to the previous in-app page, or `/monsters` when opened directly. |
| Open faction | Navigate to `/factions/[id]`. |
| Open ability catalog | Navigate to `/abilities`. |
| Open dropped item | Navigate to `/items/[id]`. |
| Open cloud row | Cloud monster row. |

## States

| State | Requirement |
|---|---|
| Loading | Detail skeleton. |
| Loaded | All panels render. |
| Not found | Back link. |
| Error | Retry. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Monsters catalog | Open monster | Detail loading |
| Detail loaded | Open related row | Related route or cloud row |
| Detail loaded | Back action | Previous in-app page or `/monsters` |

## Data Contract

| Source | Fields |
|---|---|
| `data.monsters` | `id`, `versionId`, `publishedAt`, localized `name`/`description`, `kind`, `level`, `hp`, `base_damage`, `image.{fileId,url,hash,fileName,mimeType,width,height,size,status}`, `faction_id`, `ability_ids[]`, `drops[]`, `avg_drop_chance`, `drop_count`. |
| `data.factions` | `id`, localized `name`, `alignment`, and localized `description` for the resolved faction reference. |
| `data.abilities` | ability `id`, localized `name`/`description`, `kind`, `school`, `level_required`, `base_damage`, and `cooldown`. |
| `data.items` | drop item `id`, localized `name`, `rarity`, `rarity_tag`, `market_value`, and `type_id.data.name`. |

## Explainer Widget

- Summary: "Monster detail combines array FKs, embedded drops, formulas over arrays, and a PNG illustration file."
- Variables: monster id and locale.
- Response sample: monster row with file metadata, faction reference, ability array, embedded drops, and computed formula values.
- Deep links: monster row/schema and referenced tables.
- Subgraphs: `data`.

## Responsive Rules

- Phone: image full-width with stable aspect ratio, panels stacked.
- Desktop: media and summary left, data panels center, widget right.

## Architecture Notes

- Treat item references inside drops as FK-like links if schema exposes them.
- Ability rows link to `/abilities` in v1; do not invent `/abilities/[id]` links until that route exists.
- Use the page slice DataSource/ViewModel boundary and keep drop/ability formatting out of JSX.

## Acceptance Criteria

- [x] Ability array and drops array are distinguishable.
- [x] Formula values are explained in the widget.
- [x] File metadata is visible in the widget and in the detail fact panel.
- [x] Faction and dropped item relationships navigate to implemented routes.

## Open Questions

- Add per-ability detail links only after an ability detail route is added to the page inventory.
