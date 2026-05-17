# Search Page

| Field              | Value                                     |
| ------------------ | ----------------------------------------- |
| Route              | `/search`                                 |
| Status             | Blocked                                   |
| Pattern            | Search                                    |
| Primary capability | Full-text search across game data and CMS |

## Purpose

Demonstrate full-text search across all fields and multiple tables, grouped
into useful frontend results.

## Context And Entry

- Entry from app shell global search, home, footer, and no-result suggestions.
- Result links route to app detail pages when mapped; otherwise they open cloud rows.

## Functional Blocks

| Block            | Requirement                                               |
| ---------------- | --------------------------------------------------------- |
| Header           | Search purpose and capability chips.                      |
| Search input     | Query text, submit, clear.                                |
| Results groups   | Group by project/table/domain.                            |
| Match snippets   | Highlight matched field/value from compact match payload. |
| Explainer Widget | Required; shows `search_rows` equivalent.                 |

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
| `search_rows`        | row id, table id, matches, optional row data when needed. |
| Search route mapping | table id to app route and display label.                  |

## Explainer Widget

- Summary: "Search shows full-text lookup across all fields and tables."
- Surfaces: REST/MCP/GraphQL depending on backend exposure; show exact search call used.
- Variables: query string, projects, limit.
- Response sample: grouped compact matches.
- Deep links: cloud rows for results.
- Subgraphs: `data`, `cms` when both searched.

## Responsive Rules

- Phone: search input sticky under header only if it does not obscure content.
- Desktop: result groups left and widget right.

## Architecture Notes

- Blocked until frontend-accessible search API path is confirmed.
- Result route mapping belongs in ViewModel or a small shared domain helper, not in JSX.

## Acceptance Criteria

- [ ] Results are grouped by table/domain.
- [ ] Match snippets are readable and link to row sources.
- [ ] Empty and no-result states are distinct.

## Open Questions

- Confirm whether search is called through backend GraphQL, REST, or direct Revisium public API.
