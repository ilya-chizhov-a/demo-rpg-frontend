# NPC Detail

| Field | Value |
|---|---|
| Route | `/npcs/[id]` |
| Status | In delivery |
| Pattern | Detail |
| Primary capability | Portrait file detail and location FK |

## Purpose

Show NPC portrait metadata, localized display label, role, description, and
location relationship in a single-row detail page.

## Context And Entry

- Entry from `/npcs`, quest detail pages, location detail pages, and search.
- Links to location detail and the NPC cloud row.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Portrait, localized display label, role, title/name. |
| Location | Resolved location card/link. |
| Description | Localized description resolved as current locale -> English -> empty/no-description copy. The same chain applies to title/name, and the Explainer Widget records fallback fields. |
| File panel | Portrait metadata. |
| Explainer Widget | Required. |

## Primary Actions

| Action | Result |
|---|---|
| Back | Return to the previous in-app page, or `/npcs` when opened directly. |
| Open location | Navigate to `/locations/[id]`. |
| Open cloud row | Open NPC row. |

## States

| State | Requirement |
|---|---|
| Loading | Skeleton. |
| Loaded | Profile and location render. |
| Not found | Back link. |
| Error | Retry. |

## Transitions

| From | Trigger | To |
|---|---|---|
| NPC catalog | Open NPC | Detail loading |
| Quest detail | Open giver/step NPC | Detail loading |
| Detail loaded | Open location | `/locations/[id]` |
| Detail loaded | Back action | Previous in-app page or `/npcs` |

## Data Contract

| Source | Fields |
|---|---|
| `data.npcs` | id, `title { en, ru, zh }`, `name { en, ru, zh }`, `description { en, ru, zh }`, `display_label_en`, `role`, `portrait`, `location_id`. |
| `data.locations` | location label and link target. |

## Explainer Widget

- Summary: "NPC detail shows localized character fields, a portrait file, and a single location foreign key."
- Variables: npc id and locale.
- Deep links: NPC row/schema and location row.
- Subgraphs: `data`.

## Responsive Rules

- Phone: portrait and header stack.
- Tablet: portrait/profile and location panels use two columns with the widget visible.
- Desktop: profile left, details center, widget right.

## Architecture Notes

- This frontend doc is the canonical implementation contract for `/npcs/[id]`;
  keep `page-inventory.md` and `site-map.md` in sync if the route changes.
- Use `display_label_en` only for English. Russian and other spaced locales
  render localized labels as `{title} {name}` with one space; Chinese renders
  `{title}{name}` without a separator.
- Keep the route in the NPC page slice using the DataSource/Detail ViewModel
  shape from `docs/architecture/frontend.md`.
- The detail back button uses router history for in-app returns and keeps
  `/npcs` as the direct-entry fallback; the NPC query still uses the route `id`.

## Acceptance Criteria

- [ ] Portrait metadata appears in the detail panel and widget.
- [ ] Location FK is readable and linked.
- [ ] Role and display label are localized for `ru` and `zh`.

## Open Questions

- None for route inclusion; `/npcs/[id]` is part of this frontend inventory.
