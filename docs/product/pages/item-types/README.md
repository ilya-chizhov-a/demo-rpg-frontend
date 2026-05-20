# Item Types Catalog

| Field              | Value                         |
| ------------------ | ----------------------------- |
| Route              | `/item-types`                 |
| Status             | In delivery                   |
| Pattern            | Small reference catalog       |
| Primary capability | Item taxonomy reference table |

## Purpose

List item type rows that group weapons, gear, consumables, quest items, and
other inventory entities in the item database.

## Context And Entry

- Entry from the Items section subnav and item detail type links.
- Links back to `/items` once item filters support type deep links.

## Functional Blocks

| Block            | Requirement                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| Header           | Explain item types as a game-facing taxonomy.                             |
| Type list        | Name, code, description, and explicit absent marker for `items_count`. |
| Related items    | Link back to `/items` until shareable type filters are supported.      |
| Explainer Widget | Required.                                                                 |

## Primary Actions

| Action               | Result                                                |
| -------------------- | ----------------------------------------------------- |
| Open items catalog   | Navigate to `/items`.                              |
| Open source row      | Available from the Explainer Widget, not page chrome. |

## States

| State       | Requirement                                                               |
| ----------- | ------------------------------------------------------------------------- |
| Initial SSR | Render shell, heading, status, subnav, and Explainer Widget without data. |
| Loading     | Stable reference skeleton.                                                |
| Loaded      | Type rows render.                                                         |
| Empty       | Explain missing seed data and link back to `/items`.                      |
| Error       | Show readable failure and retry.                                          |

## Transitions

| From           | Trigger              | To                                       |
| -------------- | -------------------- | ---------------------------------------- |
| Catalog loaded | Open items catalog | `/items` |
| Catalog loaded | Source row action    | Explainer Widget external row link       |

## Data Contract

| Source            | Fields                                                                      |
| ----------------- | --------------------------------------------------------------------------- |
| `data.item_types` | `id`, localized `name`/`description`, `code` |

## Explainer Widget

- Summary: "Item Types show the taxonomy used by item cards and detail pages."
- Variables: locale.
- GraphQL operation shape: list `data.item_types` rows ordered by display name.
- Response sample: visible type rows with `itemsCount: null` while the API does
  not expose a reverse count field.
- Deep links: item types table/schema and selected item type row when a row
  action is present.
- Subgraphs: `data`.

## Responsive Rules

- Phone: one-column list with fixed icon slots.
- Tablet: two-column reference list.
- Desktop: compact table or dense cards with the widget floating.

## Architecture Notes

- Implement as a small catalog page before moving status beyond `In delivery`.
- ViewModel owns locale, absent `items_count` display state, and widget descriptor.
- DataSource owns the generated GraphQL SDK call, response extraction/mapping,
  and transport-level error mapping once the operation is added.
- Generated input name is `Demo_rpg_dataGetItem_typesesInput`; v1 orders by
  localized name through a `data` order field with `path` and `type`.

## Acceptance Criteria

- [ ] Type rows render with name and description.
- [ ] Optional item counts are marked absent when the API does not return them.
- [ ] Widget links to the table/schema and selected row where relevant.

## Open Questions

- Decide whether `/items` should accept shareable `type` query params before
  item type cards link to filtered item results.
