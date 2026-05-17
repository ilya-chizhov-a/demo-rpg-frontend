# News Catalog

| Field              | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| Route              | `/news`                                                       |
| Status             | Blocked                                                       |
| Pattern            | News/CMS catalog                                              |
| Primary capability | Pinned priority `orderBy`, time-window `where`, enum category |

## Purpose

Show a patch-notes/news feed that demonstrates multi-key sorting, time-window
filtering, enum categories, and the pinned launch message.

## Context And Entry

- Entry from home latest updates only after a news source is confirmed; Guides
  in the top nav routes to `/blog` for v1.
- News cards link to `/news/[slug]`.

## Functional Blocks

| Block            | Requirement                                            |
| ---------------- | ------------------------------------------------------ |
| Header           | News purpose and capability chips.                     |
| Pinned post      | First result when `pinned = true`.                     |
| News list        | Category, title, excerpt, `published_at`, cover image. |
| Category filter  | `patch`, `event`, `spotlight`, `release`.              |
| Explainer Widget | Required; shows priority order and time-window filter. |

## Primary Actions

| Action          | Result                                                           |
| --------------- | ---------------------------------------------------------------- |
| Filter category | Updates enum filter.                                             |
| Open post       | Navigate to `/news/[slug]`.                                      |
| Open source row | Available from the Explainer Widget once the news source exists. |

## States

| State   | Requirement                         |
| ------- | ----------------------------------- |
| Loading | Stable list skeleton.               |
| Loaded  | Pinned and non-pinned posts render. |
| Empty   | Explain no published news.          |
| Error   | Retry.                              |

## Transitions

| From         | Trigger         | To                 |
| ------------ | --------------- | ------------------ |
| News catalog | Open post       | `/news/[slug]`     |
| News catalog | Filter category | Refreshing catalog |
| Empty        | Clear category  | Default catalog    |

## Data Contract

| Source                        | Fields                                                             |
| ----------------------------- | ------------------------------------------------------------------ |
| `data.news` or `cms.news` TBD | slug, category, pinned, title, excerpt, published_at, cover_image. |
| Optional backend `NewsNode`   | likes/viewCount if federation is added.                            |

## Explainer Widget

- Summary: "News shows a pinned-first multi-key sort and a published-at time-window filter."
- Variables: `where: { published_at <= now, category? }`, `orderBy: pinned desc, published_at desc`.
- Deep links: news table/schema and selected rows.
- Subgraphs: `data` or `cms`; add `backend` if federated fields ship.

## Responsive Rules

- Phone: pinned post as first card; filters as chips.
- Tablet: pinned post and list use two columns with the widget visible.
- Desktop: list/table with widget right.

## Architecture Notes

- Blocked until news table location is decided and schema is seeded.

## Acceptance Criteria

- [ ] Pinned post ordering is driven by query sort, not client reordering.
- [ ] Future-dated posts are excluded by query filter.
- [ ] Category enum is visible and filterable.

## Open Questions

- Decide whether news belongs to `demo-rpg-data` or `demo-rpg-cms`.
