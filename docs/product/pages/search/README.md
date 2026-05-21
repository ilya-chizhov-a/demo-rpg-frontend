# Search Page

| Field              | Value                                     |
| ------------------ | ----------------------------------------- |
| Route              | `/search`                                 |
| Status             | In delivery                               |
| Pattern            | Search                                    |
| Primary capability | Search across game data and CMS           |

## Purpose

Demonstrate search across returned JSON fields and multiple tables, grouped into
useful frontend results.

## Context And Entry

- Entry from app shell global search, home, footer, and no-result suggestions.
- Result links route to app detail pages when mapped; otherwise they open cloud rows.

## Functional Blocks

| Block            | Requirement                                               |
| ---------------- | --------------------------------------------------------- |
| Header           | Search purpose and capability chips.                      |
| Search input     | Query text, submit, clear, and shareable `q` URL state.     |
| Results groups   | Group by project/table/domain.                              |
| Match snippets   | Highlight or show matched field/value derived from returned `json`. |
| Explainer Widget | Required; shows the multi-table GraphQL catalog read.        |

## Primary Actions

| Action       | Result                                                  |
| ------------ | ------------------------------------------------------- |
| Submit query | Fetch grouped results.                                  |
| Clear query  | Reset to empty state.                                   |
| Open result  | Navigate to app route when mapped, otherwise cloud row. |

## States

| State       | Requirement                                   |
| ----------- | --------------------------------------------- |
| Empty query | Prompt to search without fake examples.       |
| Loading     | Keep query visible and show result skeletons. |
| Loaded      | Grouped results with snippets.                |
| No results  | Clear no-match state and retry affordance.    |
| Error       | Readable failure.                             |

## Transitions

| From           | Trigger      | To                     |
| -------------- | ------------ | ---------------------- |
| Empty query    | Submit query | Loading results        |
| Loaded results | Change query | Refreshing results     |
| Loaded results | Open result  | App route or cloud row |

## Data Contract

| Source               | Fields                                                    |
| -------------------- | --------------------------------------------------------- |
| `data.*` tables      | row id, published/update metadata, and raw `json` from generated catalog reads. |
| `cms.*` tables       | row id, published/update metadata, and raw `json` from generated catalog reads. |
| Search route mapping | table id to app route, cloud row, domain label, and display label.             |

## Explainer Widget

- Summary: "Search shows lookup across data and CMS JSON fields."
- Surfaces: generated GraphQL catalog reads; REST/MCP links remain absent until
  a direct `search_rows` endpoint is exposed to the frontend.
- Variables: query string, client JSON scan mode, locale, projects, and per-table limit.
- Response sample: grouped compact row matches with derived snippets.
- Deep links: cloud rows for results.
- Subgraphs: `data`, `cms` when both searched.

## Responsive Rules

- Phone: search input sticky under header only if it does not obscure content.
- Desktop: result groups left and widget right.

## Architecture Notes

- Generated GraphQL exposes `where.data.search`, but the current router returns
  server errors for that filter. V1 therefore reads catalog row `json` through
  generated GraphQL and performs a client-side token scan.
- Until a compact match payload is exposed, the ViewModel derives readable
  snippets by scanning returned row `json` values for query tokens. The scan
  checks all localized string variants and allows one-character fuzzy matching
  inside words of at least four characters so common Russian inflection and
  near-stem searches such as `берег` -> `побережье` still surface results.
- Result route mapping belongs in ViewModel or a small page-local domain helper, not in JSX.

## Acceptance Criteria

- [x] Results are grouped by table/domain.
- [x] Match snippets are readable and link to row sources.
- [x] Empty and no-result states are distinct.

## Open Questions

- Confirm whether a future compact `search_rows` payload should replace
  client-derived snippets and the client-side scan.
