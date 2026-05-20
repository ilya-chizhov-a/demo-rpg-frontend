# Monsters Catalog

| Field | Value |
|---|---|
| Route | `/monsters` |
| Status | In delivery |
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
| Header | Localized title, purpose, and capability chips for `data.monsters`, faction FK, embedded drops, formulas, and image files. |
| Filters | Faction FK button group and client-side localized text search. Add level range only in a later pass if product wants it. |
| Monster list | Stable imgproxy illustration slot, localized name/description, kind, faction link, level, HP, drop count, and average drop chance. |
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
| `data.monsters` | `id`, `versionId`, `publishedAt`, localized `name`/`description`, `kind`, `level`, `hp`, `base_damage`, `image.{fileId,url,hash,fileName,mimeType,width,height,size,status}`, `faction_id.{id,data.name}`, `drops[].{chance,quantity_min,quantity_max,item_id.id}`, `avg_drop_chance`, `drop_count`. |
| `data.factions` | `id`, localized `name`, `alignment` for filter buttons and faction links. |

## Explainer Widget

- Summary: "Monsters show embedded drop arrays, formulas over arrays, and image file fields."
- Variables: locale, faction filter, text search, cursor, and the generated `where.data.path = ["faction_id"]` payload.
- Response sample: first visible monster rows with image metadata, formula values, and embedded drop summary.
- Deep links: monsters table/schema.
- Subgraphs: `data`.

## Responsive Rules

- Phone: image thumbnails use fixed aspect ratio.
- Tablet/Desktop: cards or table depending on density; widget side-docked.
- v1 uses cards at every breakpoint because the illustration and drop summary are first-read data.

## Architecture Notes

- Keep image fallback and metadata handling reusable for other file pages.
- Use the page slice DataSource/List/Item ViewModel shape before moving status to `Done`.
- Do not render original Revisium CDN URLs directly; visible monster art uses imgproxy slots.

## Acceptance Criteria

- [x] Drop count and average drop chance are shown as computed outputs.
- [x] Image layout does not shift when files load.
- [x] Monster cards link to `/monsters/[id]`.
- [x] Faction chips link to `/factions/[id]` when rendered inside a card.

## Open Questions

- Decide in a later iteration whether level should become a server-backed range filter or remain a card fact only.
