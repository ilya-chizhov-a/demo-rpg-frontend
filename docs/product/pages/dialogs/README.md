# Dialogs Catalog

| Field              | Value                                        |
| ------------------ | -------------------------------------------- |
| Route              | `/dialogs`                                   |
| Status             | Draft                                        |
| Pattern            | Small reference catalog                      |
| Primary capability | Quest dialog branches and speaker references |

## Purpose

List dialog rows used by quests, NPC interactions, and branching conversation
content.

## Context And Entry

- Entry from the Quests section subnav and quest detail dialog sections.
- Links to `/quests` and `/npcs` when the dialog row resolves those references.

## Functional Blocks

| Block            | Requirement                                        |
| ---------------- | -------------------------------------------------- |
| Header           | Explain dialogs as quest-facing conversation data. |
| Dialog list      | Quest, speaker, prompt text, and branch summary.   |
| Related quests   | Link to quest detail when implemented.             |
| Explainer Widget | Required.                                          |

## Primary Actions

| Action           | Result                                                |
| ---------------- | ----------------------------------------------------- |
| Open quest       | Navigate to `/quests/[id]` when the route exists.     |
| Open speaker NPC | Navigate to `/npcs/[id]` when the route exists.       |
| Open source row  | Available from the Explainer Widget, not page chrome. |

## States

| State       | Requirement                                                               |
| ----------- | ------------------------------------------------------------------------- |
| Initial SSR | Render shell, heading, status, subnav, and Explainer Widget without data. |
| Loading     | Stable reference skeleton.                                                |
| Loaded      | Dialog rows render.                                                       |
| Empty       | Explain missing seed data and link back to `/quests`.                     |
| Error       | Show readable failure and retry.                                          |

## Transitions

| From           | Trigger           | To                                 |
| -------------- | ----------------- | ---------------------------------- |
| Catalog loaded | Open quest        | `/quests/[id]` when route exists   |
| Catalog loaded | Open speaker NPC  | `/npcs/[id]` when route exists     |
| Catalog loaded | Source row action | Explainer Widget external row link |

## Data Contract

| Source         | Fields                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| `data.dialogs` | `id`, quest FK, speaker NPC FK, localized prompt/body, branch metadata |

## Explainer Widget

- Summary: "Dialogs show quest conversation rows with speaker and quest references."
- Variables: locale, optional quest filter.
- GraphQL operation shape: list `data.dialogs` rows with optional quest filter.
- Response sample: visible dialog rows and resolved quest/speaker labels when available.
- Deep links: dialogs table/schema and selected dialog row when a row action is
  present.
- Subgraphs: `data`.

## Responsive Rules

- Phone: one-column list with quest and speaker labels above prompt text.
- Tablet: two-column reference list.
- Desktop: compact table or dense cards with the widget floating.

## Architecture Notes

- Implement as a small catalog page before moving status beyond `Draft`.
- ViewModel owns locale, optional quest filter, and widget descriptor.
- DataSource owns the generated GraphQL SDK call, response extraction/mapping,
  and transport-level error mapping once the operation is added.

## Acceptance Criteria

- [ ] Dialog rows render with quest, speaker, and localized prompt/body.
- [ ] Empty state links visitors back to `/quests`.
- [ ] Widget links to the table/schema and selected row where relevant.

## Open Questions

- Confirm whether dialog branches are stored inline or in related rows.
