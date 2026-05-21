# Balance Patch Page

| Field | Value |
|---|---|
| Route | `/balance-patch` |
| Status | Blocked |
| Pattern | Branching/revision comparison |
| Primary capability | `head` vs `draft` revision toggle and revision diff |

## Purpose

Show Revisium branching for content by comparing live and draft item balance
values and explaining the revision URI/diff.

## Context And Entry

- Entry from home, about, items catalog, footer capability links, and DevRel posts.
- Links to changed item rows, cloud table/revision views, and implementation docs.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Explain head vs draft in product language. |
| Guide section subnav | Links to Guides, News, Balance Patch, and About. |
| Revision toggle | `master:head` and `master:draft`. |
| Diff summary | Added/modified/removed rows and changed fields. |
| Item comparison | Side-by-side values for changed items. |
| Explainer Widget | Required with revision URIs and diff call. |

## Primary Actions

| Action | Result |
|---|---|
| Switch revision | Updates active data view. |
| Select changed item | Focuses diff details. |
| Open cloud revision/table | Opens relevant cloud URL. |

## States

| State | Requirement |
|---|---|
| Loading | Stable comparison layout. |
| Loaded with diff | Shows changed rows and values. |
| No diff | Explains draft matches head. |
| Error | Names failed revision/diff request. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Loaded `head` | Switch to draft | Draft comparison |
| Loaded `draft` | Switch to head | Head comparison |
| Diff list | Select changed item | Focused item diff |

## Data Contract

| Source | Fields |
|---|---|
| `data.items` at `master:head` | baseline item values. |
| `data.items` at `master:draft` | draft item values. |
| `get_revision_changes` | table/row change summary and field diffs where available. |

## Explainer Widget

- Summary: "Balance patch shows Revisium data branching by swapping revision URIs and reading revision changes."
- Variables: selected revision, selected item, table id.
- Response sample: diff payload and item comparison.
- Deep links: item table, changed row, revision/diff source.
- Subgraphs: `data`.

## Responsive Rules

- Phone: use stacked before/after rows instead of wide side-by-side table.
- Desktop: side-by-side comparison plus sticky widget.

## Architecture Notes

- Blocked until draft data contains meaningful balance differences.
- Decide whether data comes through GraphQL revision variables, REST, or backend proxy.
- While blocked, the route renders a route-specific blocked surface inside the
  Guides section with disabled revision controls and planned diff rows.

## Acceptance Criteria

- [ ] Visitor can see exactly which URI is active.
- [ ] Changed values are visually compared.
- [ ] Widget shows diff call and revision URI difference.

## Open Questions

- Dedicated page vs `/items` banner is still a product decision; this spec assumes dedicated page.
