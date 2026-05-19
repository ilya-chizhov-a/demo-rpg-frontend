# Region Detail

| Field              | Value                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| Route              | `/regions/[id]`                                                       |
| Status             | In delivery                                                           |
| Pattern            | Federated detail                                                      |
| Primary capability | Revisium-owned fields plus backend-owned fields on one GraphQL entity |

## Purpose

Demonstrate the region detail shell from Revisium-owned data first, then Apollo
Federation once backend enrichment fields are present in the composed schema.

## Context And Entry

- Entry from `/regions` cards.
- Links back to `/regions`.
- Links to related heroes, locations, factions, or monsters if reverse relations are available.

## Functional Blocks

| Block                  | Requirement                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| Back action            | Visible link back to `/regions` above the detail body.                                     |
| World navigation       | Section links sit directly below the back action.                                          |
| Overview               | Desktop two-column inspector: real-ratio cover image on the left, data panels on the right. |
| Region header          | Name, climate, description, source chips, and locale.                                      |
| Facts                  | Region id, climate, published date, version, and cover file metadata.                      |
| Community notes        | Game-facing unavailable state until likes, views, comments, or approved equivalents exist. |
| Related data           | Optional related locations/heroes once query supports them.                                |
| Federation explanation | Visible field attribution chips on rendered fields.                                        |
| Explainer Widget       | Required with federation disclosure and SDL excerpt.                                       |

## Primary Actions

| Action                 | Result                                                   |
| ---------------------- | -------------------------------------------------------- |
| Back to catalog        | Navigate to `/regions` from a visible back button.       |
| Open source row        | Available from the Explainer Widget, not page chrome.    |
| View federation source | Opens backend source/SDL link once available.            |

## States

| State                 | Requirement                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| Loading               | Stable detail skeleton with reserved cover and data panels.                                              |
| Loaded                | Shows data-owned region fields and the community-notes unavailable block.                               |
| Not found             | Region id does not exist or GraphQL returns an id error; link back to catalog.                          |
| Partial backend error | Revisium fields remain visible; backend block shows unavailable state if GraphQL supports partial data. |
| Error                 | Visitor-readable error.                                                                                 |

## Transitions

| From          | Trigger    | To             |
| ------------- | ---------- | -------------- |
| Catalog       | Card click | Detail loading |
| Detail loaded | Back click | Catalog        |

## Data Contract

| Source                | Fields                                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `data.regions`        | `id`, `data.name`, `data.description`, `data.cover_image.{fileId,url,hash,fileName,mimeType,width,height}`, `data.climate` |
| `backend.RegionsNode` | Blocked until `likes`, `viewCount`, `comments` or approved equivalents appear in the composed schema.                      |

## Explainer Widget

- Summary: "This page shows a Revisium-owned region detail and where backend-owned federation fields will attach."
- Surfaces: GraphQL required; REST/MCP if equivalents exist.
- Variables: GraphQL region id; locale remains visible through rendered field
  state and fallback notes.
- Field attribution: `name`, `description`, `cover_image`, `climate` -> `data`; community notes/stats/comments -> `backend` once available.
- Federation: unavailable note until backend `extend type RegionsNode` is present.
- Deep links: matching cloud region row.
- Subgraphs: `data`; add `backend` once backend fields are present.

## Responsive Rules

- Phone: overview stacks cover image first, then region data; the image fits
  container width.
- Desktop: overview uses a stable two-column inspector with the real-ratio cover
  image on the left and all region data on the right, matching `/locations/[id]`.
- Desktop cover cell matches the rendered image aspect ratio so no empty side
  space appears around `object-fit: contain` art.
- World section navigation sits directly below the back action, above the
  desktop overview grid.
- While narrowing the desktop viewport, the cover column shrinks before the data
  column can clip.
- Community-notes block stays in the right data stack below the facts panel
  until backend fields are available.
- The required `cover_image` renders through imgproxy as the hero media. The
  climate text badge remains the source of meaning when art is unavailable or abstract.
- If `data.cover_image.url` is missing or invalid, `/regions/[id]` renders the
  region media placeholder for the hero image slot instead of checked-in
  per-region fallback art. Keep it page-owned until another real page or widget
  needs the same component.
- Facts rows use separators only between rows, without a trailing divider after
  the final field.
- Facts rows keep compact vertical spacing for scan-friendly desktop panels.
- Facts panel keeps a smaller bottom padding so the final row does not leave a
  visually empty footer.

## Architecture Notes

- Backend enrichment remains blocked until fields are present in the composed schema.
- ViewModel must handle route id, locale, missing row errors, and backend-unavailable state.

## Acceptance Criteria

- [x] Renders Revisium-owned region text fields from GraphQL.
- [x] Renders required `cover_image` from GraphQL through imgproxy.
- [x] Required `cover_image` reserves layout and renders without layout shift on phone/tablet/desktop.
- [x] Field ownership is visible in the page UI and widget for data-owned fields.
- [x] Backend-unavailable state is visible while federation fields are absent.
- [x] Desktop detail overview places the cover image left and region data right.
- [x] Desktop cover cell matches the image ratio without empty side gutters.
- [x] World section navigation appears below the back action.
- [x] Desktop overview can narrow without clipping the data column.
- [ ] Renders at least one backend-owned field in the same GraphQL result.
- [ ] Widget shows federation SDL excerpt and source link.
- [ ] Partial backend failure is handled once GraphQL exposes partial backend fields.

## Open Questions

- Confirm exact backend fields: `likes`, `viewCount`, `comments`, or alternatives.
- Confirm backend source link target for SDL excerpt.
