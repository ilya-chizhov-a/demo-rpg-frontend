# Hero Detail

| Field              | Value                                                             |
| ------------------ | ----------------------------------------------------------------- |
| Route              | `/heroes/[id]`                                                    |
| Status             | In delivery                                                       |
| Pattern            | Detail                                                            |
| Primary capability | Single FK, array FKs, embedded equipment, formulas, portrait file |

## Purpose

Show the full hero dossier after a user selects a portrait tile from `/heroes`.
The detail page owns the dense information: identity, class relation, ability
array FKs, inventory array FKs, embedded equipment rows, formula fields, and
portrait file metadata.

## Context And Entry

- Entry from portrait tiles on `/heroes`, classes, parties, factions, and search
  results.
- Links back to `/heroes`.
- Links to class, abilities, inventory items, and cloud row/schema evidence.
- Does not show the heroes section subnav; detail navigation stays focused on
  the back action and related entity panels.

## Functional Blocks

| Block            | Requirement                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| Header           | Uncropped portrait, display name, localized epithet, level, veteran badge.        |
| Identity panel   | Class, localized name, published/version metadata, portrait metadata.             |
| Formula panel    | `is_veteran`, `total_equipment_modifier`, `equipped_count`.                       |
| Abilities panel  | Resolved `ability_ids[]` with school, kind, level, cooldown, damage.              |
| Inventory panel  | Resolved `inventory_item_ids[]` with rarity, value, weight.                       |
| Equipment panel  | Embedded `equipment[]` rows with slot, referenced item, modifier.                 |
| Explainer Widget | Required with single-FK, array-FK, embedded-array, formula, and file explanation. |

## Primary Actions

| Action           | Result                                               |
| ---------------- | ---------------------------------------------------- |
| Back to heroes   | Navigate to `/heroes`.                               |
| Open related row | Navigate to app route when the related route exists. |
| View schema      | Opens heroes schema from the Explainer Widget.       |

## States

| State     | Requirement                                                        |
| --------- | ------------------------------------------------------------------ |
| Loading   | Stable hero profile skeleton.                                      |
| Loaded    | All panels render; missing optional arrays render as empty panels. |
| Not found | Missing hero message.                                              |
| Error     | Retry and readable failure.                                        |

## Transitions

| From          | Trigger            | To                         |
| ------------- | ------------------ | -------------------------- |
| Hero catalog  | Open portrait tile | Detail loading             |
| Detail loaded | Open related row   | Related route or cloud row |
| Detail loaded | Back action        | `/heroes`                  |

## Data Contract

| Source           | Fields                                                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data.heroes`    | `id`, `data.name`, `data.epithet`, `class_id`, `ability_ids[]`, `inventory_item_ids[]`, `equipment[]`, `portrait`, `level`, `gold`, `constitution`, `is_veteran`, `total_equipment_modifier`, `equipped_count`. |
| `data.classes`   | Resolved through `class_id` for the class label.                                                                                                                                                       |
| `data.abilities` | Resolved through `ability_ids[]` for related ability cards.                                                                                                                                            |
| `data.items`     | Resolved through inventory and equipment item references.                                                                                                                                              |

## Explainer Widget

- Summary: "Hero detail shows single and array foreign keys, embedded equipment, formulas, and file fields in one Revisium row."
- Variables: hero id and locale.
- Field attribution: all fields `data`.
- Deep links: hero row/schema and related table links.
- Subgraphs: `data`.

## Responsive Rules

- Phone: portrait, identity, formulas, abilities, inventory, equipment.
- Tablet/Desktop: uncropped portrait/identity header followed by dense panels.

## Architecture Notes

- Resolve FK data through generated GraphQL where possible; avoid client-side
  joins from static maps.
- Do not recompute formula outputs in the UI; render values from the API.

## Acceptance Criteria

- [x] Catalog portrait tile opens this detail route.
- [x] Detail page does not render sibling-section switcher buttons.
- [x] Array FKs are visible and linked when an app route exists.
- [x] Embedded equipment is clearly separate from referenced inventory items.
- [x] Formula outputs are not recomputed in UI.
- [x] Portrait media uses imgproxy with an uncropped fit and stable fallback slot.

## Open Questions

- Confirm when hero `region_id` and `faction_id` become available so the
  identity panel can add those relationships.
