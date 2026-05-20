# Stats Catalog

| Field              | Value                         |
| ------------------ | ----------------------------- |
| Route              | `/stats`                      |
| Status             | In delivery                   |
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
| Stat list        | Name, abbreviation, code, description, and derived value format. |
| Related items    | Link back to `/items` until shareable stat filters are supported. |
| Explainer Widget | Required.                                          |

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
| Loaded      | Stat rows render.                                                         |
| Empty       | Explain missing seed data and link back to `/items`.                      |
| Error       | Show readable failure and retry.                                          |

## Transitions

| From           | Trigger              | To                                       |
| -------------- | -------------------- | ---------------------------------------- |
| Catalog loaded | Open items catalog | `/items` |
| Catalog loaded | Source row action    | Explainer Widget external row link       |

## Data Contract

| Source       | Fields                                                   |
| ------------ | -------------------------------------------------------- |
| `data.stats` | `id`, localized `name`/`description`, `code`, `abbreviation` |

## Explainer Widget

- Summary: "Stats show a reusable reference table behind item modifiers."
- Variables: locale.
- GraphQL operation shape: list `data.stats` rows ordered by display name or
  code.
- Response sample: visible stat rows plus frontend-derived value format.
- Deep links: stats table/schema and selected stat row when a row action is
  present.
- Subgraphs: `data`.

## Responsive Rules

- Phone: one-column list with compact stat codes.
- Tablet: two-column reference list.
- Desktop: compact table or dense cards with the widget floating.

## Architecture Notes

- Implement as a small catalog page before moving status beyond `In delivery`.
- ViewModel owns locale, derived display format labels, and widget descriptor.
- DataSource owns the generated GraphQL SDK call, response extraction/mapping,
  and transport-level error mapping once the operation is added.
- Generated input name is `Demo_rpg_dataGetStatsesInput`; v1 orders by
  localized name through a `data` order field with `path` and `type`.
- The API does not expose a stored display unit in v1. The page labels stat
  values as signed modifiers because item modifier rows provide signed numeric
  values separately.

## Acceptance Criteria

- [ ] Stat rows render with name, description, code, abbreviation, and derived display format.
- [ ] Empty state links visitors back to `/items`.
- [ ] Widget links to the table/schema and selected row where relevant.

## Open Questions

- Decide whether `/items` should accept shareable `stat` query params before
  stat cards link to filtered item results.
