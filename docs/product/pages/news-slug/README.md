# News Detail

| Field              | Value                                      |
| ------------------ | ------------------------------------------ |
| Route              | `/news/[slug]`                             |
| Status             | Blocked                                    |
| Pattern            | News detail                                |
| Primary capability | News body, cover file, optional federation |

## Purpose

Render a single news or patch-note entry and optionally demonstrate a second
federated entity after region detail.

## Context And Entry

- Entry from `/news` only after a news source is confirmed; Guides in the top
  nav routes to `/blog` for v1.
- Links to related proof pages and the news source row.

## Functional Blocks

| Block                  | Requirement                                                 |
| ---------------------- | ----------------------------------------------------------- |
| Header                 | Category, title, `published_at`, pinned marker if relevant. |
| Cover image            | Revisium file field.                                        |
| Body                   | Markdown or structured rich text depending on schema.       |
| Optional backend stats | Likes/viewCount/comments if `NewsNode` federation ships.    |
| Explainer Widget       | Required.                                                   |

## Primary Actions

| Action                  | Result                                                           |
| ----------------------- | ---------------------------------------------------------------- |
| Back to news            | Navigate to `/news`.                                             |
| Open related proof page | Navigate to linked route from content.                           |
| Open source row         | Available from the Explainer Widget once the news source exists. |

## States

| State     | Requirement                    |
| --------- | ------------------------------ |
| Loading   | Article skeleton.              |
| Loaded    | News body and metadata render. |
| Not found | Back link.                     |
| Error     | Retry.                         |

## Transitions

| From          | Trigger        | To                 |
| ------------- | -------------- | ------------------ |
| News catalog  | Open post      | Detail loading     |
| Detail loaded | Back action    | `/news`            |
| Detail loaded | Capability CTA | Related proof page |

## Data Contract

| Source                        | Fields                                                          |
| ----------------------------- | --------------------------------------------------------------- |
| `data.news` or `cms.news` TBD | slug, title, body, category, pinned, published_at, cover_image. |
| Optional backend `NewsNode`   | likes/viewCount/comments.                                       |

## Explainer Widget

- Summary: "News detail shows the source row for a published post and optional backend-enriched fields."
- Variables: slug and locale.
- Field attribution: source fields -> `data`/`cms`; optional stats -> `backend`.
- Deep links: news row/schema and federation source if used.
- Subgraphs: `data` or `cms`, plus optional `backend`.

## Responsive Rules

- Phone: metadata above body with a floating widget trigger.
- Tablet: readable article column with a floating widget trigger.
- Desktop: article readable width with a floating widget trigger.

## Architecture Notes

- Blocked until news schema and route source are confirmed.

## Acceptance Criteria

- [ ] Unknown slug renders not-found state.
- [ ] Cover file metadata appears in widget.
- [ ] Optional backend fields have clear attribution if present.

## Open Questions

- Confirm news body format and backend enrichment scope.
