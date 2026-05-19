# Classes Catalog

| Field              | Value                                             |
| ------------------ | ------------------------------------------------- |
| Route              | `/classes`                                        |
| Status             | In delivery                                       |
| Pattern            | Small reference catalog                           |
| Primary capability | Enum-like reference table with required icon file |

## Purpose

Show class profiles as part of the hero codex. The page still proves that
heroes can reference a small class table, but the visible framing is class
comparison, roles, and stat growth.

## Context And Entry

- Entry from hero filters, hero detail pages, search results, and Heroes section subnav.
- Links to `/heroes` with a class filter when supported.

## Functional Blocks

| Block            | Requirement                                                     |
| ---------------- | --------------------------------------------------------------- |
| Header           | Explain classes as hero roles with compact stat-growth context. |
| Class list       | Icon, name, description, role/archetype fields if present.      |
| Related heroes   | Optional count or link to heroes filtered by class.             |
| Explainer Widget | Required.                                                       |

## Primary Actions

| Action                 | Result                                                |
| ---------------------- | ----------------------------------------------------- |
| Filter heroes by class | Navigate to `/heroes` with class filter if supported. |
| Open source row        | Available from the Explainer Widget, not page chrome. |

## States

| State   | Requirement                |
| ------- | -------------------------- |
| Loading | Skeleton list.             |
| Loaded  | Reference rows render.     |
| Empty   | Explain missing seed data. |
| Error   | Retry.                     |

## Transitions

| From           | Trigger                        | To                          |
| -------------- | ------------------------------ | --------------------------- |
| Catalog loaded | Filter heroes by class         | `/heroes` with class filter |
| Catalog loaded | Revisium cloud deep-link click | External Revisium Cloud row |

## Data Contract

| Source         | Fields                                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data.classes` | `id`, localized `name`/`description`, `icon.{fileId,url,hash,fileName,mimeType,width,height}`, `primary_stat`, `base_hp`, `hp_per_level`, `mp_per_level`. |

## Explainer Widget

- Summary: "Classes show a small Revisium reference table with a required file field used as a foreign-key target by heroes."
- Variables: locale.
- Deep links: classes table/schema and selected class row when a row action is
  present.
- Subgraphs: `data`.

## Responsive Rules

- Phone: one-column simple list with fixed icon boxes.
- Tablet: two-column reference list with the widget visible.
- Desktop: compact table.
- Class icons render through imgproxy `rs:fit` in a stable 96x96 pixel square
  media slot so the full uploaded glyph remains visible and card layout does
  not shift while images load. If an icon URL is absent or invalid, the card
  keeps the same 96x96 pixel slot and renders a page-owned placeholder label.

## Architecture Notes

- This page should be very small; do not overbuild.

## Acceptance Criteria

- [x] Class rows are visible and link to hero filters.
- [x] Class icon slots render as stable 96x96 pixel squares without layout
  shift and use imgproxy when `icon.url` and `icon.mimeType` are valid image
  metadata.
- [x] Missing or invalid icon metadata keeps the same stable 96x96 pixel icon
  slot with a page-owned placeholder label.
- [x] Widget explains FK target role.

## Open Questions

- Decide whether class detail route is needed; not planned for v1.
- Add `starting_ability_ids` once the FK-expanded query is confirmed to return within the router timeout.
- The current dev data returns class `icon.fileId` values, but `url`, `hash`,
  `mimeType`, filename, and dimensions are empty or zero. Backfill that file
  metadata before replacing the placeholder slots with real class glyphs.
