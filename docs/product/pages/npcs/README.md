# NPCs Catalog

| Field | Value |
|---|---|
| Route | `/npcs` |
| Status | In delivery |
| Pattern | Catalog |
| Primary capability | Portrait file and computed display label |

## Purpose

Show a character/content catalog driven by computed label strings, localized
name/title fields, portrait files, and location relationships.

## Context And Entry

- Entry from quests, locations, search results, and dictionary navigation.
- NPC cards link to `/npcs/[id]`.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | NPC catalog purpose and capability chips. |
| Filters | Location and name search. |
| NPC list | Portrait, localized display label, localized title/name, role, location. |
| Explainer Widget | Required. |

## Primary Actions

| Action | Result |
|---|---|
| Filter location | Updates FK equality payload. |
| Search NPC | Filters visible rows by localized label, title, role, or location. |
| Open NPC | Navigate to `/npcs/[id]`. |

## States

| State | Requirement |
|---|---|
| Loading | Portrait skeletons. |
| Loaded | Cards render labels and portraits. |
| Empty | Reset. |
| Error | Retry. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Loaded catalog | Filter location | Refreshing catalog |
| Loaded catalog | Open NPC | `/npcs/[id]` |
| Empty | Reset filters | Default catalog |

## Data Contract

| Source | Fields |
|---|---|
| `data.npcs` | id, `title { en, ru, zh }`, `name { en, ru, zh }`, `description { en, ru, zh }`, `display_label_en`, `role`, `portrait`, `location_id`. |
| `data.locations` | location labels. |

## Explainer Widget

- Summary: "NPCs show localized character labels, portrait file fields, role values, and location foreign keys."
- Variables: location filter, search query, locale as the user's display/formatting preference, cursor/page info.
- Deep links: NPCs table/schema.
- Subgraphs: `data`.

## Responsive Rules

- Phone: portrait cards one column.
- Tablet: two-column portrait grid with filters and widget still visible.
- Desktop: compact grid.

## Architecture Notes

- Use `display_label_en` only for English. Other locales combine localized
  `title` and `name`: Russian and other spaced locales render `{title} {name}`
  with one space, while Chinese renders `{title}{name}` without a separator.
- Localized fields resolve as current locale -> English -> empty/no-description
  copy. The Explainer Widget records locale fallbacks for fields that render
  English because the requested locale is empty.
- Use the DataSource/List/Item ViewModel split from the frontend architecture
  guide.

## Acceptance Criteria

- [ ] NPC labels are localized in `ru`/`zh` and use formula-derived display text in English.
- [ ] Portrait file handling matches hero portrait handling and avoids layout shift when portraits are empty.
- [ ] Location filter and text search keep result counts and empty/reset states coherent.

## Open Questions

- None for route inclusion; `/npcs/[id]` is part of this frontend inventory.
