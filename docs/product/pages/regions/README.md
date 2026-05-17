# Regions Catalog

| Field              | Value                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------- |
| Route              | `/regions`                                                                                |
| Status             | In delivery                                                                               |
| Pattern            | Reference catalog                                                                         |
| Primary capability | Nested JSON objects, localized strings, enum, required file field, totalCount, pagination |

## Purpose

Serve as the first complete world-atlas catalog implementation and the
reference pattern for readable game-database list pages.

## Context And Entry

- Linked from home, app nav, World section subnav, and capability map.
- Region cards link to `/regions/[id]` once the detail route exists.
- The page is the first proof, inside the Explainer Widget, that JSON Schema
  becomes typed GraphQL.

## Functional Blocks

| Block            | Requirement                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| Header           | Title, atlas purpose, and chips for `data.regions`, climates, localized lore, and pagination. |
| Result summary   | Shows visible count and `totalCount`.                                                         |
| Climate filter   | Server-side JSON filter using `data.path = ["climate"]`.                                      |
| Region list      | Cards with name, description, climate, `cover_image` thumbnail, and detail link.              |
| Pagination       | Shows connection `pageInfo`; load-more fetches the next cursor.                               |
| Explainer Widget | Required; shows `Regions` operation, variables, response sample, cloud links.                 |

## Primary Actions

| Action            | Result                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------ |
| Change locale     | Re-query with selected localized sub-fields or update selection according to query design. |
| Filter climate    | Updates filter payload preview and re-queries the connection with a JSON filter.           |
| Load more         | Fetches next cursor and updates widget variables.                                          |
| Open region       | Navigate to `/regions/[id]`.                                                               |
| View source table | Available from the Explainer Widget, not page chrome.                                      |

## States

| State   | Requirement                                                       |
| ------- | ----------------------------------------------------------------- |
| Loading | Show stable list skeleton and widget skeleton.                    |
| Loaded  | Show cards, count, and widget response.                           |
| Empty   | Show "No regions match this filter" plus reset.                   |
| Error   | Name GraphQL/router failure where possible and keep retry action. |

## Transitions

| From            | Trigger        | To                                                                            |
| --------------- | -------------- | ----------------------------------------------------------------------------- |
| Loaded          | Locale change  | Refreshing with previous cards preserved                                      |
| Loaded          | Filter change  | JSON preview updates and the list refreshes with server-side filter variables |
| Preview updated | Apply/debounce | Refreshing list                                                               |
| Loaded          | Load more      | Appended results                                                              |

## Data Contract

| Source         | Fields                                                                                                                                                                                             |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data.regions` | `id`, `data.name.{locale}`, `data.description.{locale}`, `data.cover_image.{fileId,url,hash,fileName,mimeType,width,height}`, `data.climate`, `createdAt`, `publishedAt`, `totalCount`, `pageInfo` |

## Explainer Widget

- Summary: "Regions show how localized fields, a required Admin-uploaded cover image, enum fields, pagination, and total count become a typed GraphQL catalog."
- Surfaces: GraphQL required; REST/MCP once backend exposes equivalents.
- Variables: locale, climate filter, cursor, page size, and generated `data` input payload.
- Response sample: current visible region edges plus `totalCount`.
- Deep links: regions table in `demo-rpg-data`.
- Subgraphs: `data`.

## Responsive Rules

- Phone: single column, floating widget trigger, filter bottom sheet, 16px page gutters.
- Tablet: main content column with floating widget trigger and 24px gutters.
- Desktop: cards in dense grid/table, floating widget trigger, max content width `1440px`, 32px gutters.
- Region cards render the required `cover_image` through imgproxy. The climate
  text badge remains the source of meaning when art is unavailable or abstract.
  The card reserves space for `cover_image` so imgproxy-served art renders
  without layout shift across phone, tablet, and desktop widths.
- While the public dev GraphQL response exposes `cover_image` but returns empty
  file objects, `/regions` may use local copies of the matching Revisium Cloud
  draft files as row-id fallbacks. The fallback is secondary to
  `data.cover_image.url` and must be removed once the dev dataset consistently
  returns file URLs and imgproxy can derive them.
- Region cards use a restrained hover/focus lift, accent border, and subtle
  landscape scale to signal clickability without changing card dimensions.

## Architecture Notes

- Existing slice `src/pages/Regions/` should evolve into this contract.
- ViewModel owns locale/filter/cursor and `explainer`.
- Route module stays thin.

## Acceptance Criteria

- [x] Shows region name, description, and climate from GraphQL.
- [x] Shows total count when available.
- [x] Handles loading, loaded, empty, and error states.
- [x] Explainer Widget shows query, variables, response sample, and cloud links.
- [x] Layout passes phone/tablet/desktop audit.
- [x] Server-side pagination and climate filtering work through `regionses(data: ...)`.

## Open Questions

- The dev endpoint now accepts `regionses(data: ...)` for `first`, `after`,
  and JSON `where.data` filters. The frontend sends the generated
  `Demo_rpg_dataGetRegionsesInput` object at runtime.
