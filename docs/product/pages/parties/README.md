# Parties Catalog

| Field | Value |
|---|---|
| Route | `/parties` |
| Status | In delivery |
| Pattern | Catalog |
| Primary capability | Array FK column and formula counters |

## Purpose

Show group rows where one field references multiple heroes and formulas derive
member counts and capacity state. The first frontend pass focuses on the
catalog; `/parties/[id]` can deepen this into a detail view later.

## Context And Entry

- Entry from home, hero pages, search results, and dictionary navigation.
- Party cards link to `/parties/[id]`.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Party catalog purpose and capability chips. |
| Filters | Full/not full state now; member count and hero membership can follow when needed. |
| Party list | Name, member avatars/names, member count, full badge. |
| Explainer Widget | Required. |

## Primary Actions

| Action | Result |
|---|---|
| Filter full state | Updates formula/boolean filter payload. |
| Open party | Navigate to `/parties/[id]`. |
| Open hero | Navigate to hero detail when linked. |

## States

| State | Requirement |
|---|---|
| Loading | Skeleton party cards. |
| Loaded | Cards show hero array references. |
| Empty | Reset filters. |
| Error | Retry. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Loaded catalog | Filter full state | Refreshing catalog |
| Loaded catalog | Open party | `/parties/[id]` |
| Empty | Reset filters | Default catalog |

## Data Contract

| Source | Fields |
|---|---|
| `data.parties` | `id`, localized name/motto, `formation`, `hero_ids[]`, `member_count`, `is_full`. |
| `data.heroes` | hero labels/portraits for member display. |

## Explainer Widget

- Summary: "Parties show array foreign keys, hero row resolution, and formulas computed from array length."
- Variables: full-state filter, cursor, locale.
- Deep links: parties table/schema and hero table.
- Subgraphs: `data`.

## Responsive Rules

- Phone: member list wraps within each card.
- Desktop: table with member chips is acceptable.

## Architecture Notes

- Resolve hero labels from localized `name`/`epithet`; use English formula
  display names only on the English page.
- Member portrait thumbnails fill their image box horizontally, stay centered
  on the x-axis, and anchor to the top so faces are not cropped from above.
- Keep array FK display local to this page until another implemented page needs
  the same member chip pattern.
- Use the DataSource/List/Item ViewModel split from the frontend architecture
  guide.

## Acceptance Criteria

- [ ] Member count and full state come from formula output.
- [ ] Hero IDs are resolved into localized readable member labels.
- [ ] Hero portraits in member chips fill the media slot without top cropping.
- [ ] Full-state filter updates the GraphQL boolean where payload and reset state.

## Open Questions

- Confirm whether `hero_ids[]` can be filtered by membership.
