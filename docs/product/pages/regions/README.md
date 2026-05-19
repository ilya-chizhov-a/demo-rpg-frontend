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
| Climate filter   | Server-side JSON filter chips with localized climate labels using `data.path = ["climate"]`; no visible result summary text. |
| Region list      | Cards with name, description, localized climate badge, `cover_image` thumbnail, and detail link. |
| Pagination       | Shows connection `pageInfo`; load-more fetches the next cursor.                               |
| Explainer Widget | Required; shows `Regions` operation, variables, response sample, cloud links.                 |

## Primary Actions

| Action            | Result                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------ |
| Change locale     | Use the global header language menu; update site chrome and refresh rendered localized fields with previous cards preserved. |
| Filter climate    | Updates filter payload preview and re-queries the connection with a JSON filter.           |
| Load more         | Fetches next cursor and updates widget variables.                                          |
| Open region       | Navigate to `/regions/[id]`.                                                               |
| View source table | Available from the Explainer Widget, not page chrome.                                      |

## States

| State   | Requirement                                                       |
| ------- | ----------------------------------------------------------------- |
| Loading | Show stable list skeleton and widget skeleton.                    |
| Loaded  | Show cards and widget response.                                   |
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
  Climate badges and filter chips render localized labels while GraphQL
  variables keep the raw `data.climate` value. The card reserves space for
  `cover_image` so imgproxy-served art renders without layout shift across
  phone, tablet, and desktop widths.
- If `data.cover_image.url` is missing or invalid, `/regions` renders the
  region media placeholder for the card image slot instead of checked-in
  per-region fallback art. Keep it page-owned until another real page or widget
  needs the same component.
- Region cards use a restrained hover/focus lift, accent border, and subtle
  landscape scale to signal clickability without changing card dimensions.

## Architecture Notes

- Existing slice `src/pages/Regions/` should evolve into this contract.
- ViewModel owns locale/filter/cursor and `explainer`.
- Route module stays thin.

## Acceptance Criteria

- [x] Shows region name, description, and localized climate label from GraphQL.
- [x] Keeps `totalCount` in the Explainer Widget response sample when available.
- [x] Handles loading, loaded, empty, and error states.
- [x] Explainer Widget shows query, variables, response sample, and cloud links.
- [x] Layout passes phone/tablet/desktop audit.
- [x] Server-side pagination and climate filtering work through `regionses(data: ...)`.

## Open Questions

- The dev endpoint now accepts `regionses(data: ...)` for `first`, `after`,
  and JSON `where.data` filters. The frontend sends the generated
  `Demo_rpg_dataGetRegionsesInput` object at runtime.
