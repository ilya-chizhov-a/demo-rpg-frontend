# Locations Catalog

| Field              | Value                                          |
| ------------------ | ---------------------------------------------- |
| Route              | `/locations`                                   |
| Status             | Done                                           |
| Pattern            | Catalog                                        |
| Primary capability | Region FK, map preview, and gallery file array |

## Purpose

Show location rows that belong to regions and preview required map and gallery
file fields.

## Context And Entry

- Entry from home, regions, NPCs, quests, search results, and dictionary navigation.
- Location cards link to `/locations/[id]`.

## Functional Blocks

| Block            | Requirement                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Header           | Locations purpose and capability chips.                                                                                                                                        |
| Filters          | Region filter chips only; no visible result summary text. Region options are loaded through paginated `data.regions` requests so the chip set is not capped to the first page. |
| Location list    | Name, kind, region, map thumbnail, coordinates, gallery count/preview or an empty-gallery placeholder, short description.                                                      |
| Explainer Widget | Required.                                                                                                                                                                      |

## Primary Actions

| Action        | Result                                      |
| ------------- | ------------------------------------------- |
| Filter region | Updates FK equality payload.                |
| Open location | Navigate to `/locations/[id]`.              |
| Open region   | Navigate to `/regions/[id]` when available. |

## States

| State   | Requirement                 |
| ------- | --------------------------- |
| Loading | Map thumbnail placeholders. |
| Loaded  | Cards render locations.     |
| Empty   | Reset filters.              |
| Error   | Retry.                      |

## Transitions

| From           | Trigger       | To                 |
| -------------- | ------------- | ------------------ |
| Loaded catalog | Filter region | Refreshing catalog |
| Loaded catalog | Open location | `/locations/[id]`  |
| Empty          | Reset filters | Default catalog    |

## Data Contract

| Source           | Fields                                                                                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data.locations` | id, localized name/description, `kind`, coordinates, `region_id`, `map.{fileId,url,hash,fileName,mimeType,width,height}`, `gallery[].{fileId,url,hash,fileName,mimeType,width,height}` |
| `data.regions`   | all region ids and localized region labels for filter chips, loaded page by page.                                                                                                      |

## Explainer Widget

- Summary: "Locations show a region foreign key, large map file metadata, coordinates, and a required gallery file array."
- Variables: region filter, canonical `where.data.path = ["region_id"]`, locale, cursor.
- Deep links: locations table/schema.
- Subgraphs: `data`.

## Responsive Rules

- Phone: map thumbnails keep fixed aspect ratio.
- Desktop: same atlas-card arrangement as `/regions`: one column on phone, two
  on tablet, five on wide desktop. Region filtering remains the primary
  region affordance.
- Map previews preserve uploaded map artwork rather than cropping it for
  decorative hover motion; square maps stay centered inside the atlas-card slot.
- Location card titles reserve a fixed two-line height so one-line and two-line
  names keep the region link, description, and facts aligned across the card
  grid. Names start at the top edge of the reserved slot, and longer names
  clamp to two lines.
- Location card descriptions reserve a fixed three-line height. Longer
  descriptions clamp to three lines with an ellipsis, using compact line spacing
  instead of changing card rhythm.
- Location cards use compact fixed internal row gaps rather than distributing
  extra height between rows, so localized copy cannot push the badge/title block
  to different vertical positions across sibling cards. Spacing between the
  region link, description, and facts divider stays intentionally tight while
  preserving the phone touch-target minimum.
- Location facts render as a single vertical definition list. Each fact occupies
  its own row with the label and compact value on one line, separated from the
  next fact by a subtle gray divider. Fact values do not wrap.
- Gallery previews reserve a stable row below card facts. When `gallery[]` is
  empty or all gallery file metadata is invalid, the row renders a page-owned
  empty-gallery label instead of collapsing.

## Architecture Notes

- Reuse file preview rules from items/factions.
- Render `data.locations.map` through the shared imgproxy helper, following the
  `/regions` card-image pipeline rather than rendering original Revisium CDN
  URLs directly.
- If an imgproxy map derivative reports an image load error, the map image falls
  back to the Revisium file URL so the catalog does not show an empty media
  slot. Deferred lazy loads must not be treated as failures by a timer.
- Missing or invalid map URLs render the stable map placeholder instead of
  attempting to construct an imgproxy URL.
- Location `kind` remains the raw API value in the response sample, but card and
  map-placeholder badges render localized display labels from the page copy.
- Use map thumbnails as the primary card media and show up to three gallery
  thumbnails plus the total `gallery[]` count. Defer the full gallery to
  `/locations/[id]`.
- Include `kind` and `coordinates` from the generated schema when available so
  location cards read as atlas records rather than plain image cards.

## Acceptance Criteria

- [x] Region labels are query-driven.
- [x] Map thumbnails render from `data.locations.map` through imgproxy.
- [x] Map thumbnails do not cause layout shift.
- [x] Each location card shows gallery preview/count sourced from `gallery[]`.
- [x] Gallery metadata is visible in the widget response sample.

## Future Changes

- Region FK filtering uses `where.data.path = ["region_id"]` with equality to
  the selected region id.
- If the backend FK JSON shape changes later, update this spec and the
  implementation in the same PR before switching to a nested path.
