# Item Types Catalog

| Field              | Value                         |
| ------------------ | ----------------------------- |
| Route              | `/item-types`                 |
| Status             | Draft                         |
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
| Type list        | Name, description, and optional `items_count` when the query resolves it. |
| Related items    | Optional link to `/items` filtered by type.                               |
| Explainer Widget | Required.                                                                 |

## Primary Actions

| Action               | Result                                                |
| -------------------- | ----------------------------------------------------- |
| Filter items by type | Navigate to `/items` with type filter once supported. |
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
| Catalog loaded | Filter items by type | `/items` with type filter when supported |
| Catalog loaded | Source row action    | Explainer Widget external row link       |

## Data Contract

| Source            | Fields                                                                      |
| ----------------- | --------------------------------------------------------------------------- |
| `data.item_types` | `id`, localized `name`/`description`, optional icon, optional `items_count` |

## Explainer Widget

- Summary: "Item Types show the taxonomy used by item cards and detail pages."
- Variables: locale.
- GraphQL operation shape: list `data.item_types` rows ordered by display name.
- Response sample: visible type rows plus optional `items_count`.
- Deep links: item types table/schema and selected item type row when a row
  action is present.
- Subgraphs: `data`.

## Responsive Rules

- Phone: one-column list with fixed icon slots.
- Tablet: two-column reference list.
- Desktop: compact table or dense cards with the widget floating.

## Architecture Notes

- Implement as a small catalog page before moving status beyond `Draft`.
- ViewModel owns locale, optional `items_count` display state, and widget descriptor.
- DataSource owns the generated GraphQL SDK call, response extraction/mapping,
  and transport-level error mapping once the operation is added.

## Acceptance Criteria

- [ ] Type rows render with name and description.
- [ ] Optional item counts are marked absent when the API does not return them.
- [ ] Widget links to the table/schema and selected row where relevant.

## Open Questions

- Confirm whether `items_count` is a formula, reverse lookup, or omitted for v1.
