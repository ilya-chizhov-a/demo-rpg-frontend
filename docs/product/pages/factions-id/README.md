# Faction Detail

| Field              | Value                                                  |
| ------------------ | ------------------------------------------------------ |
| Route              | `/factions/[id]`                                      |
| Status             | In delivery                                            |
| Pattern            | World detail                                           |
| Primary capability | Crest file rendering and reverse-FK relationship lists |

## Purpose

Show a faction row with its crest file, localized lore, file metadata, and
related rows that point back to the faction through available schema FKs.

## Context And Entry

- Entry from `/factions`, monster detail pages, NPC detail pages, and search.
- Links to related monster/NPC rows and the faction cloud row.
- Hero relations are deferred until `data.heroes` exposes a faction FK again.

## Functional Blocks

| Block            | Requirement                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| Back action      | Visible link back to `/factions` above the detail body.                     |
| World navigation | Section links sit directly below the back action.                           |
| Overview         | Desktop two-column inspector: crest on the left, data panels on the right.  |
| Header           | Crest, localized name, alignment, locale, and localized description.        |
| Facts            | Faction id, alignment, published date, version, and crest file metadata.    |
| Related monsters | Monsters with `faction_id` matching this row, with load-more when paged.    |
| Related NPCs     | NPCs with `faction_id` matching this row, with load-more when paged.        |
| Explainer Widget | Required; shows faction, related query variables, response sample, links.   |

## Primary Actions

| Action           | Result                                                     |
| ---------------- | ---------------------------------------------------------- |
| Back to factions | Navigate to `/factions`.                                  |
| Open monster     | Navigate to `/monsters/[id]`.                              |
| Open NPC         | Navigate to `/npcs/[id]`.                                  |
| Load more related | Fetch the next cursor for the selected related section.    |
| Open cloud row   | Open faction row from the Explainer Widget.                |
| Open schema      | Open factions schema from the Explainer Widget.            |

## States

| State           | Requirement                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| Loading         | Stable detail skeleton with reserved crest and data panels.                 |
| Loaded          | Faction, facts, and related lists render.                                   |
| No related rows | Show empty related sections, not page empty.                                |
| Not found       | Error panel with retry and visible back link in the header.                 |
| Error           | Retry panel while preserving the page shell and explainer location.         |

## Transitions

| From             | Trigger          | To                  |
| ---------------- | ---------------- | ------------------- |
| Factions catalog | Open faction     | Detail loading      |
| Detail loaded    | Open related row | Related route       |
| Detail loaded    | Load more related | Appended related rows |
| Detail loaded    | Back action      | `/factions`         |

## Data Contract

| Source          | Fields                                                                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data.factions` | `id`, `versionId`, `publishedAt`, localized `name`/`description`, `alignment`, `crest.{fileId,fileName,hash,height,mimeType,size,status,url,width}`.                          |
| `data.monsters` | Related monster `id`, localized `name`, `kind`, `level`, `hp`, `faction_id`, filtered by `where.data.path = ["faction_id"]`.                                                    |
| `data.npcs`     | Related NPC `id`, localized `name`, localized `title`, `role`, `location_id`, `faction_id`, filtered by `where.data.path = ["faction_id"]`.                                     |

## Explainer Widget

- Summary: "Faction detail shows a file field plus reverse lookup patterns over rows that reference this faction."
- Variables: faction id, locale, related monster/NPC page size, and FK filter
  payloads.
- Response sample: faction row plus related monster/NPC edges.
- Deep links: faction row/schema and related monster/NPC tables.
- Subgraphs: `data`.

## Responsive Rules

- Phone: crest and summary first, facts next, related sections stacked.
- Desktop: overview uses a stable two-column inspector with the crest on the
  left and faction data on the right.
- Related monster and NPC sections render below the overview. On desktop they
  sit side by side when space allows; on smaller screens they stack.
- Related sections show their own load-more control when the connection reports
  another page, and appending one section does not reset the other section's
  visible rows.
- Crest preview reserves a square media slot. Missing or invalid crest metadata
  renders a page-owned placeholder in the same slot.
- Related cards clamp names to two lines and descriptions/facts to stable rows
  so long Russian labels cannot create horizontal overflow.

## Architecture Notes

- Keep the route in the page-level MVVM pattern:
  `FactionDetailDataSource` -> `FactionDetailViewModel` -> detail UI.
- Reverse joins are separate filtered connection requests because generated
  GraphQL does not expose nested reverse relation fields on `data.factions`.
- Heroes are intentionally not shown until the generated schema exposes a
  `data.heroes.faction_id` or equivalent relation.

## Acceptance Criteria

- [x] Crest slot renders without layout shift and metadata appears in page
      facts and widget.
- [x] Related monster and NPC rows are query-driven, not hardcoded.
- [x] Related monster and NPC sections own cursor-driven load-more actions.
- [x] Missing related rows show empty related sections, not a page-level empty.
- [x] `/factions` card action navigates to `/factions/[id]`.
- [x] Desktop detail overview places the crest left and faction data right.

## Open Questions

- Confirm whether hero-to-faction relation should return to `data.heroes` or
  stay represented through monsters/NPCs only.
