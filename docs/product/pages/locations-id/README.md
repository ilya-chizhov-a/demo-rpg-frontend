# Location Detail

| Field              | Value                                                  |
| ------------------ | ------------------------------------------------------ |
| Route              | `/locations/[id]`                                      |
| Status             | In delivery                                            |
| Pattern            | Detail                                                 |
| Primary capability | Large map file, dimensions metadata, and gallery array |

## Purpose

Show a location detail after the user clicks "Open location" in `/locations`.
The first version lands on `/locations/[id]` and focuses on the playable atlas
view: a large map image, localized title/description, region link, coordinates,
file metadata, and the required gallery file array.

## Context And Entry

- Entry from `/locations`, region detail, NPC/quest pages, and search results.
- Links to the region row, related content, and the location cloud row.

## Functional Blocks

| Block            | Requirement                                                           |
| ---------------- | --------------------------------------------------------------------- |
| Back action      | Visible link back to `/locations` above the detail body.                               |
| World navigation | Section links sit directly below the back action.                                     |
| Overview         | Desktop two-column inspector: real-ratio map on the left, data panels on the right.    |
| Header           | Localized location name, kind badge, region link, locale, and description.             |
| Map              | Large map image from `data.locations.map` with reserved aspect ratio.                  |
| Facts            | Coordinates, kind, region, published date, version, and map file fields.               |
| Gallery          | Required `gallery[]` images with stable thumbnails and file metadata.                  |
| Related content  | Deferred until quests/NPCs expose reverse relations.                                  |
| Explainer Widget | Required.                                                                              |

## Primary Actions

| Action            | Result                       |
| ----------------- | ---------------------------- |
| Back to locations | Navigate to `/locations`.                       |
| Open region       | Navigate to `/regions/[id]`.                    |
| Open cloud row    | Open location row from the Explainer Widget.    |
| Open cloud schema | Open locations schema from the Explainer Widget. |

## States

| State     | Requirement              |
| --------- | ------------------------ |
| Loading   | Stable detail skeleton and reserved map area.                       |
| Loaded    | Map, facts, gallery, and metadata render.                           |
| Not found | Error panel with retry and visible back link in the header.         |
| Error     | Retry panel while preserving the page shell and explainer location. |

## Transitions

| From              | Trigger       | To              |
| ----------------- | ------------- | --------------- |
| Locations catalog | Open location | Detail loading  |
| Detail loaded     | Open region   | `/regions/[id]` |
| Detail loaded     | Back action   | `/locations`    |

## Data Contract

| Source           | Fields                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data.locations` | id, name, description, region_id, `map.{fileId,url,hash,fileName,mimeType,width,height}`, `gallery[].{fileId,url,hash,fileName,mimeType,width,height}` |
| `data.regions`   | region label and link.                                                                                                                                 |

## Explainer Widget

- Summary: "Location detail shows image dimensions, file metadata, and file arrays for location art."
- Variables: location id and locale.
- Deep links: location row/schema and region row.
- Subgraphs: `data`.

## Responsive Rules

- Phone: overview stacks map first, then location data; map scroll/zoom is
  avoided in v1 and the image fits container width.
- Desktop: overview uses a stable two-column inspector with the real-ratio map
  on the left and all location data on the right.
- Desktop map cell matches the rendered image aspect ratio so no empty side
  space appears around `object-fit: contain` art.
- World section navigation sits directly below the back action, above the
  desktop overview grid.
- Desktop map can be large but must not block widget visibility.
- While narrowing the desktop viewport, the map column shrinks before the data
  column can clip.
- Gallery thumbnails use fixed media slots so long file names cannot resize
  the grid.
- Facts rows use separators only between rows, without a trailing divider after
  the final field.
- Facts rows keep compact vertical spacing for scan-friendly desktop panels.
- Facts panel keeps a smaller bottom padding so the final row does not leave a
  visually empty footer.

## Architecture Notes

- Use file dimensions and fixed image slots to reserve aspect ratio.
- Keep the route in the page-level MVVM pattern:
  `LocationDetailDataSource` -> `LocationDetailViewModel` -> detail UI.
- Reuse imgproxy derivatives for map and gallery media, with the original
  Revisium URL as the map/gallery fallback when the derivative fails.

## Visual Assets

| Asset           | Source                    | Usage                                                                 |
| --------------- | ------------------------- | --------------------------------------------------------------------- |
| Primary map     | `data.locations.map.url`  | Full-width hero map, rendered with `object-fit: contain` for inspection. |
| Gallery images  | `data.locations.gallery[]` | Thumbnail grid with per-file metadata rows and file URL fallback.      |
| Empty map state | Page-owned CSS placeholder | Used only if the map URL is missing, invalid, or non-image.            |
| Empty gallery   | Page-owned text placeholder | Used only if `gallery[]` has no renderable images.                    |

## Gallery Content Contract

`gallery[]` is supporting location art, not another map. The gallery should
help the visitor understand how the place looks and feels from inside the
world while still proving Revisium file-array handling.

Use these image roles when authoring gallery files:

| Role              | Requirement                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| Establishing shot | Wide view of the location as a place: town, ruin, cave entrance, outpost, grove. |
| Key landmark      | The most recognizable feature: gate, tower, altar, bridge, market, shrine.       |
| Playable area     | A traversal or encounter space: path, hall, plaza, camp, tunnel, courtyard.      |
| Lore detail       | A close detail that belongs to the row: sign, relic, wall mark, campfire, tool.  |
| Activity shot     | Optional lived-in scene for towns or villages when the location supports it.     |

Do not use gallery slots for duplicate map crops, UI screenshots, logo art,
generic decorative fantasy art, text labels, watermarks, or images unrelated to
the concrete location row.

Because the current schema exposes only file metadata for each gallery item,
file names should make the role readable to humans, for example
`goblin-caves-landmark.png` or `silver-citadel-playable-area.png`.

## Acceptance Criteria

- [x] Map renders without layout shift.
- [x] File metadata is visible in page facts and widget.
- [x] Gallery images render from `gallery[]` without layout shift.
- [x] Gallery content roles are documented for authoring.
- [x] `/locations` card action navigates to `/locations/[id]`.
- [x] Desktop detail overview places the map left and location data right.
- [x] Desktop map cell matches the image ratio without empty side gutters.
- [x] World section navigation appears below the back action.
- [x] Desktop overview can narrow without clipping the data column.

## Open Questions

- Confirm which related quest/NPC reverse relations should appear below the
  gallery once backend/data schema exposes them.
