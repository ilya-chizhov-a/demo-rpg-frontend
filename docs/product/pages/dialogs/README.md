# Dialogs Catalog

| Field              | Value                                        |
| ------------------ | -------------------------------------------- |
| Route              | `/dialogs`                                   |
| Status             | In delivery                                  |
| Pattern            | Small catalog                                |
| Primary capability | NPC dialog lines and localized speaker text  |

## Purpose

List dialog rows used by NPC interactions and quest-facing conversation
content. The current data shape stores the resolved speaker NPC, a dialog slug,
line count, and inline localized lines.

## Context And Entry

- Entry from the Quests section subnav.
- Links to `/npcs/[id]` through `npc_id`.
- Links users back to `/quests` from the empty state because dialogs are part of
  the quests section.

## Functional Blocks

| Block            | Requirement                                        |
| ---------------- | -------------------------------------------------- |
| Header           | Explain dialogs as quest-facing conversation data. |
| Dialog list      | Slug, speaker NPC, line count, first line, and line preview. |
| Related NPC      | Link to the resolved speaker NPC.                  |
| Explainer Widget | Required.                                          |

## Primary Actions

| Action           | Result                                                |
| ---------------- | ----------------------------------------------------- |
| Open speaker NPC | Navigate to `/npcs/[id]`.                            |
| Open quests      | Navigate to `/quests` from the empty state.           |
| Open source row  | Available from the Explainer Widget, not page chrome. |

## States

| State       | Requirement                                                               |
| ----------- | ------------------------------------------------------------------------- |
| Initial SSR | Render shell, heading, status, subnav, and Explainer Widget without data. |
| Loading     | Stable reference skeleton.                                                |
| Loaded      | Dialog rows render.                                                       |
| Empty       | Explain missing seed data and link to `/quests`.                          |
| Error       | Show readable failure and retry.                                          |

## Transitions

| From           | Trigger           | To                                 |
| -------------- | ----------------- | ---------------------------------- |
| Catalog loaded | Open speaker NPC  | `/npcs/[id]`                       |
| Empty state    | Open quests       | `/quests`                          |
| Catalog loaded | Source row action | Explainer Widget external row link |

## Data Contract

| Source         | Fields                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| `data.dialogs` | `id`, `slug`, `npc_id`, `line_count`, `lines[].speaker`, `lines[].emotion`, `lines[].text` |
| `data.npcs`    | Resolved through `npc_id` for speaker label and `/npcs/[id]` link.     |

## Explainer Widget

- Summary: "Dialogs show localized conversation lines with the speaker NPC reference."
- Variables: locale and list request payload.
- GraphQL operation shape: list `data.dialogs` rows ordered by slug.
- Response sample: visible dialog rows, resolved speaker label, and line previews.
- Deep links: dialogs table/schema.
- Subgraphs: `data`.

## Responsive Rules

- Phone: one-column list with speaker labels above line previews.
- Tablet: two-column reference list.
- Desktop: compact table or dense cards with the widget floating.

## Architecture Notes

- Implement as a small catalog page before moving status beyond `In delivery`.
- ViewModel owns locale, request variables, pagination state, and widget descriptor.
- DataSource owns the generated GraphQL SDK call, response extraction/mapping,
  and transport-level error mapping once the operation is added.

## Acceptance Criteria

- [ ] Dialog rows render with speaker, localized line text, and line count.
- [ ] Empty state links visitors back to `/quests`.
- [ ] Widget links to the table/schema and shows the real query payload.

## Open Questions

- None. The current schema stores dialog lines inline in `lines[]`.
