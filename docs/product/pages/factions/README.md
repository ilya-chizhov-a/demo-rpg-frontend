# Factions Catalog

| Field              | Value                                  |
| ------------------ | -------------------------------------- |
| Route              | `/factions`                            |
| Status             | In delivery                            |
| Pattern            | World reference catalog                |
| Primary capability | SVG crest file, alignment enum, filter |

## Purpose

Show a compact world-atlas reference catalog with enum filtering and stable SVG
crest file previews.

## Context And Entry

- Entry from home, world section subnav, monster/hero pages, search results,
  and dictionary navigation.
- Faction cards link to `/factions/[id]`.

## Functional Blocks

| Block            | Requirement                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| Header           | Faction catalog purpose and capability chips.                                                     |
| Alignment filter | Server-side JSON filter chips using `where.data.path = ["alignment"]`; no visible result summary text. |
| Faction list     | Stable crest slot, name, localized alignment, short description, locale, published/version facts. |
| Pagination       | Shows connection `pageInfo`; load-more fetches the next cursor.                                  |
| Explainer Widget | Required; shows `Factions` operation, variables, response sample, cloud links.                   |

## Primary Actions

| Action           | Result                                                            |
| ---------------- | ----------------------------------------------------------------- |
| Filter alignment | Updates the JSON equality payload and refreshes the connection.   |
| Reset filter     | Clears the alignment equality payload.                            |
| Load more        | Fetches the next cursor and updates widget variables.             |
| Open faction     | Navigate to `/factions/[id]`.                                     |

## States

| State   | Requirement                                                       |
| ------- | ----------------------------------------------------------------- |
| Loading | Stable crest placeholders.                                        |
| Loaded  | Cards render crests and localized labels.                         |
| Empty   | Show "No factions match this filter" plus reset when filtered.    |
| Error   | Name GraphQL/router failure where possible and keep retry action. |

## Transitions

| From           | Trigger          | To                                                                            |
| -------------- | ---------------- | ----------------------------------------------------------------------------- |
| Loaded catalog | Filter alignment | JSON payload updates and the list refreshes with server-side filter variables |
| Loaded catalog | Load more        | Appended results                                                              |
| Loaded catalog | Open faction     | `/factions/[id]`                                                              |
| Empty          | Reset filter     | Default catalog                                                               |

## Data Contract

| Source          | Fields                                                                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data.factions` | `id`, `versionId`, `publishedAt`, localized `name`/`description`, `alignment`, `crest.{fileId,fileName,hash,height,mimeType,size,status,url,width}`, `pageInfo`, `totalCount`. |

## Explainer Widget

- Summary: "Factions show enum filtering and SVG crest files from Revisium."
- Variables: alignment filter, locale, cursor, page size, and generated `data`
  input payload.
- Response sample: current visible faction edges plus crest file metadata.
- Deep links: factions table/schema.
- Subgraphs: `data`.

## Responsive Rules

- Phone: faction cards use one column on narrow screens and two columns once
  the available width can hold compact cards without horizontal page scroll.
- Tablet: faction cards use two or three columns depending on available width.
- Desktop: faction cards use no more than four columns. Factions trade density
  for readable localized alignment labels, so they intentionally do not use the
  five-column `/regions` and `/locations` grid.
- Crest previews reserve a fixed square media slot at the top of each card.
  Use imgproxy `rs:fit` so the full uploaded SVG remains visible. Missing or
  invalid file metadata renders a page-owned placeholder in the same slot.
- Faction card titles reserve a fixed two-line height and descriptions reserve
  a fixed three-line height, matching the world catalog rhythm.
- Faction facts render as a single vertical definition list. Fact values do
  not wrap except the alignment value, which may wrap to two lines for long
  localized enum labels.
- Alignment badges and crest-placeholder labels may wrap to two lines and must
  not overflow their cards in Russian or Chinese locales.
- Faction card primary action buttons reuse the world section navigation hover:
  cyan fill, accent border, and on-accent text on hover/focus.

## Architecture Notes

- ViewModel owns locale/filter/cursor and `explainer`.
- Route module stays thin.
- Crest rendering should use the shared imgproxy helper with the original
  Revisium URL retained in the Explainer Widget response sample.
- Alignment labels localize known enum values and fall back to the raw API value
  for unrecognized seed data.

## Acceptance Criteria

- [x] Crest SVG slots render without layout shift and use imgproxy when valid
      file metadata is present.
- [x] Missing or invalid crest metadata keeps the same stable crest slot with a
      page-owned placeholder label.
- [x] Alignment enum is visible and filterable with server-side JSON equality
      variables.
- [x] Explainer Widget shows query, variables, response sample, source links,
      and locale fallbacks.

## Future Changes

- Extend related sections if hero-to-faction relation is restored in schema.
