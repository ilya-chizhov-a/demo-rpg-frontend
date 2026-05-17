# Stats Catalog

| Field              | Value                         |
| ------------------ | ----------------------------- |
| Route              | `/stats`                      |
| Status             | Draft                         |
| Pattern            | Small reference catalog       |
| Primary capability | Stat taxonomy reference table |

## Purpose

List stat rows that explain modifiers shown on items, heroes, effects, and
combat-related entities.

## Context And Entry

- Entry from the Items section subnav and item modifier rows.
- Links back to `/items` when a stat-specific item filter exists.

## Functional Blocks

| Block            | Requirement                                        |
| ---------------- | -------------------------------------------------- |
| Header           | Explain stats as shared item/combat vocabulary.    |
| Stat list        | Name, abbreviation, description, and value format. |
| Related items    | Optional list or link to items using the stat.     |
| Explainer Widget | Required.                                          |

## Primary Actions

| Action               | Result                                                |
| -------------------- | ----------------------------------------------------- |
| Filter items by stat | Navigate to `/items` with stat filter once supported. |
| Open source row      | Available from the Explainer Widget, not page chrome. |

## States

| State       | Requirement                                                               |
| ----------- | ------------------------------------------------------------------------- |
| Initial SSR | Render shell, heading, status, subnav, and Explainer Widget without data. |
| Loading     | Stable reference skeleton.                                                |
| Loaded      | Stat rows render.                                                         |
| Empty       | Explain missing seed data and link back to `/items`.                      |
| Error       | Show readable failure and retry.                                          |

## Transitions

| From           | Trigger              | To                                       |
| -------------- | -------------------- | ---------------------------------------- |
| Catalog loaded | Filter items by stat | `/items` with stat filter when supported |
| Catalog loaded | Source row action    | Explainer Widget external row link       |

## Data Contract

| Source       | Fields                                                   |
| ------------ | -------------------------------------------------------- |
| `data.stats` | `id`, localized `name`/`description`, code, display unit |

## Explainer Widget

- Summary: "Stats show a reusable reference table behind item modifiers."
- Variables: locale.
- GraphQL operation shape: list `data.stats` rows ordered by display name or
  code.
- Response sample: visible stat rows.
- Deep links: stats table/schema and selected stat row when a row action is
  present.
- Subgraphs: `data`.

## Responsive Rules

- Phone: one-column list with compact stat codes.
- Tablet: two-column reference list.
- Desktop: compact table or dense cards with the widget floating.

## Architecture Notes

- Implement as a small catalog page before moving status beyond `Draft`.
- ViewModel owns locale, display units, and widget descriptor.
- DataSource owns the generated GraphQL SDK call, response extraction/mapping,
  and transport-level error mapping once the operation is added.

## Acceptance Criteria

- [ ] Stat rows render with name, description, code, and display unit.
- [ ] Empty state links visitors back to `/items`.
- [ ] Widget links to the table/schema and selected row where relevant.

## Open Questions

- Confirm whether stat display unit is stored as a field or derived in the frontend.
