# Party Detail

| Field | Value |
|---|---|
| Route | `/parties/[id]` |
| Status | In delivery |
| Pattern | Detail |
| Primary capability | Array FK resolution, `member_count`, `is_full` |

## Purpose

Show the simplest array-FK detail page and formula outputs based on array
length, using localized party and hero labels.

## Context And Entry

- Entry from `/parties`, hero detail pages, and search results.
- Links to member hero detail pages and the party cloud row.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Party name, motto, formation, member count, full badge. |
| Members | Resolved hero cards from `hero_ids[]`. |
| Formula panel | `member_count`, `is_full`, formation, row/version metadata. |
| Explainer Widget | Required. |

## Primary Actions

| Action | Result |
|---|---|
| Back | Return to the previous in-app page, or `/parties` when opened directly. |
| Open hero | Navigate to `/heroes/[id]`. |
| Open cloud row | Open party row. |

## States

| State | Requirement |
|---|---|
| Loading | Skeleton. |
| Loaded | Members and formulas render. |
| Empty members | Show empty party state, not page empty state. |
| Not found | Back link. |
| Error | Retry. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Parties catalog | Open party | Detail loading |
| Detail loaded | Open hero | `/heroes/[id]` |
| Detail loaded | Back action | Previous in-app page or `/parties` |

## Data Contract

| Source | Fields |
|---|---|
| `data.parties` | `id`, localized name/motto, formation, `hero_ids[]`, `member_count`, `is_full`. |
| `data.heroes` | hero localized name/epithet, class, level, veteran flag, portrait. |

## Explainer Widget

- Summary: "Party detail shows an array foreign key, resolved hero rows, and formulas computed from that array."
- Variables: party id and locale.
- Deep links: party row/schema and heroes table.
- Subgraphs: `data`.

## Responsive Rules

- Phone: member cards single-column.
- Desktop: member grid plus formula summary before widget.
- Member portraits fill the card media width, stay centered on the x-axis, and
  anchor to the top so heads remain visible.

## Architecture Notes

- Do not infer `is_full` in the frontend; render the computed field.
- Resolve hero labels from localized `name`/`epithet`; use English formula
  display names only on the English page.
- Keep the route in the Parties page slice using the DataSource/Detail ViewModel
  shape from `docs/architecture/frontend.md`.

## Acceptance Criteria

- [ ] `member_count` and `is_full` are visibly computed.
- [ ] Every member links to hero detail.
- [ ] Hero member cards show localized names in `ru` and `zh`.
- [ ] Hero portraits fill member-card media slots without top cropping.

## Open Questions

- Confirm party capacity constant source before showing capacity as a separate
  field; v1 renders only the Revisium `is_full` formula.
