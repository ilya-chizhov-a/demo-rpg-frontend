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
| Region list      | Cards with the same visual rhythm as `/locations`: cover thumbnail, localized climate badge, fixed-height title, three-line description, vertical facts, and detail link. |
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

- Phone: region cards use one column on narrow screens and two columns once
  the available width can hold compact cards without horizontal page scroll.
- Tablet: region cards use three columns.
- Desktop: region cards use five columns on wide viewports, matching
  `/locations`.
- Region cards render the required `cover_image` through imgproxy. The climate
  text badge remains the source of meaning when art is unavailable or abstract.
  Climate badges and filter chips render localized labels while GraphQL
  variables keep the raw `data.climate` value. The card reserves space for
  `cover_image` so imgproxy-served art renders without layout shift across
  phone, tablet, and desktop widths.
- Region cover thumbnails fill the entire card media slot with no empty side or
  top/bottom gutters. Cropping is acceptable in the catalog preview because the
  full cover remains inspectable on `/regions/[id]`.
- If `data.cover_image.url` is missing or invalid, `/regions` renders the
  region media placeholder for the card image slot instead of checked-in
  per-region fallback art. Keep it page-owned until another real page or widget
  needs the same component.
- Region card titles reserve a fixed two-line height so one-line and two-line
  names keep descriptions, facts, and actions aligned across the card grid.
  Names start at the top edge of the reserved slot, and longer names clamp to
  two lines.
- Region card descriptions reserve a fixed three-line height. Longer
  descriptions clamp to three lines with an ellipsis, using compact line spacing
  instead of changing card rhythm.
- Region facts render as a single vertical definition list. Each fact occupies
  its own row with the label and compact value on one line, separated from the
  next fact by a subtle gray divider. Fact values do not wrap.
- Region cards use the same stable internal row gaps and non-transforming hover
  treatment as `/locations` cards, so localized copy cannot shift sibling card
  content vertically.
- Region card primary action buttons reuse the world section navigation hover:
  cyan fill, accent border, and on-accent text on hover/focus.

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
- [x] Region cards match the `/locations` card grid, title, description,
      facts, media, and action rhythm.

## Open Questions

- The dev endpoint now accepts `regionses(data: ...)` for `first`, `after`,
  and JSON `where.data` filters. The frontend sends the generated
  `Demo_rpg_dataGetRegionsesInput` object at runtime.
