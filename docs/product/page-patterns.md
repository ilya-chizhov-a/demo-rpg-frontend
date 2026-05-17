# Shared Page Patterns

These patterns define the default UX contract for pages. Per-page specs may add
requirements, but should not silently weaken these patterns.

## App Shell

- Persistent top navigation with brand link to `/`.
- Primary navigation exposes direct game-database links only: Home, Heroes,
  Items, Monsters, World, Quests, Guides, and Search.
- Top navigation v1 does not use dropdowns for route navigation. Secondary
  routes live in section subnav on catalog/detail pages.
- Footer chip appears on every page except full-screen error pages.
- Footer chip links to `/about` and shows subgraph composition in compact text.
- Global locale switcher is visible in the shell once localization is
  implemented; it may use a compact language menu and must not become a
  technical settings panel.
- Shell must be SSR-rendered and usable before hydration.
- The shell follows the Dark Tactical Atlas direction from the design system:
  dark midnight surface, cyan active state, minimal one-tone or two-tone icons,
  and no gold/yellow system accents.

## Game Database Section Pattern

Used by catalog and detail pages that belong to a game database family:
Heroes, Items, Monsters, World, and Quests.

Functional blocks:

- page header with the game-facing section name and purpose;
- horizontal section subnav for sibling catalogs;
- catalog/detail content;
- related entity sections written as player-facing relationships;
- Explainer Widget as the primary technical source/proof layer.

Rules:

- Section subnav uses links, chips, or tabs. Do not use dropdowns in v1.
- Monsters is a section family even when it has only one v1 route; in that case
  the subnav may be omitted until related monster routes are added.
- Related entities render as named game-facing sections, not raw foreign-key
  fields.
- Detail pages should group relationships by meaning, for example:
  "Dropped by monsters", "Used by heroes", "Quest rewards", "Related type",
  and "Related stat".
- Raw FK, array FK, formula, source table, schema, row, REST, and MCP
  explanations belong in the Explainer Widget.
- JSON filter/sort previews may remain in page controls when a page spec
  requires them; the Explainer Widget still owns the complete variables,
  response sample, and source links.
- If a relationship cannot be resolved yet, do not render a dead route link.
  Prefer a blocked/empty game-facing section in the page spec and source proof
  in the widget.

## Stub Route Pattern

Routes listed in [Page Inventory](./page-inventory.md) may be wired before their
full page implementation so navigation and deep links do not 404 during
delivery.

This is the only explicit exception to the Explainer Widget requirement for
catalog, detail, search, branching, blog, and news pages. A route may use the
stub pattern only while its inventory status is `Draft` or `Blocked`; once the
route status moves to `In delivery`, the matching page spec owns the real page
blocks and widget requirement again.

Rules:

- Stub routes render inside the normal App Shell.
- Stub routes show the page title, route, inventory status, primary capability,
  and a short implementation note.
- Stub routes link back to `/regions` when the target page is not implemented.
- Stub routes do not fetch data, render dead detail links, or claim acceptance
  criteria are complete.
- Adding a stub route does not change the inventory status to `Done`.

## Catalog Page Pattern

Used by `/regions`, `/heroes`, `/items`, `/monsters`, `/quests`, `/parties`,
`/factions`, `/npcs`, `/locations`, `/classes`, `/abilities`, `/item-types`,
`/stats`, `/effects`, `/dialogs`, `/blog`, `/news`.

Functional blocks:

- page header with title, short purpose, capability chips;
- optional filter/sort panel;
- result summary with visible count and active filters;
- result grid or table;
- pagination / load-more control when supported by the API;
- Explainer Widget floating trigger with overlay panel;
- empty state with reset action;
- service-aware error state.

Rules:

- Catalog cards link to detail pages when a detail route exists.
- Image-led catalogs, including `/regions`, use dark atlas cards with a stable
  image area, a separate data area, climate/source chips, and a cyan hover or
  focus border.
- Catalog images must render slot-sized `imgproxy` derivatives, not original
  Revisium/admin CDN URLs. Cards should provide `1x` and `2x` candidates for
  high-density screens.
- Filtering UI must update a JSON payload preview before the request fires.
- Sorting controls must map to explicit `orderBy` JSON.
- Pagination must expose the active cursor in the Explainer Widget variables.
- Total count is shown when the GraphQL connection exposes `totalCount`.

## Detail Page Pattern

Used by entity detail routes.

Functional blocks:

- breadcrumb back to catalog;
- entity hero/header with name, type/category, and key badges;
- primary data panel;
- related entities panel for FKs and reverse joins;
- computed/formula panel when formulas exist;
- file preview panel when the entity owns files;
- Explainer Widget;
- not-found state for missing rows.

Rules:

- Every rendered field must come from the query or a documented derived display helper.
- Detail headers may use a strong art panel or atlas hero only when the
  underlying entity owns meaningful art, map, file, or generated visual context.
- Detail heroes, maps, portraits, and file previews must request dimensions
  for their actual rendered slot through `imgproxy`; the original CDN URL may
  be shown as metadata or source evidence, but not used as rendered image bytes.
- FK fields link to the referenced row in the app when a route exists and to
  `cloud.revisium.io` from the Explainer Widget.
- Formula fields are labelled as computed output, not as hand-authored values.
- File previews show useful metadata when it helps explain Revisium file fields.

## Media Field Pattern

Used by image fields on catalogs, details, news, blog, and home content.

Rules:

- Revisium/admin file fields expose absolute original URLs. Treat them as
  source references.
- Rendered UI images use `imgproxy` derivatives with explicit dimensions from
  the consuming component's layout slot.
- Do not use originals for list thumbnails, cover cards, avatars, map previews,
  or detail media.
- Preserve the original URL in Explainer Widget response samples so the demo
  still shows the stored Revisium value.
- Prefer `rs:fit` when the complete asset matters and `rs:fill` when a fixed
  cover crop is intended.
- Provide a high-density `srcset` candidate with `dpr:2` or doubled physical
  dimensions.
- Keep placeholders, aspect ratios, and skeletons stable so image loading does
  not shift catalog or detail layouts.

## Explainer Widget Pattern

The widget is required on every catalog, detail, search, branching, blog, and
news page. See [Explainer Widget](./explainer-widget.md) for the full contract.
It starts collapsed as a floating Revisium trigger so the page content remains
primary; the full source-reference panel opens only after user intent.

Minimum descriptor per page:

- summary sentence;
- GraphQL operation name and query body;
- variables payload;
- response sample from the latest successful request;
- subgraphs in use;
- source links to cloud table/schema and row when relevant;
- REST and MCP equivalents when available;
- field attribution when more than one subgraph contributes to the rendered data.

## JSON Filter And Sort Panel

Used first on `/regions`, then expanded on `/items` and `/heroes`.

Functional blocks:

- form controls for human input;
- live JSON preview of `where`, `orderBy`, and pagination variables;
- apply/reset controls;
- validation messages for invalid ranges or unsupported filters;
- mobile bottom-sheet behaviour.

Rules:

- The JSON preview updates synchronously as the user edits fields.
- Requests are debounced or explicitly applied; avoid firing on every keystroke
  unless the backend cost is known to be acceptable.
- Empty result state must show the active filter payload and a reset action.
- The Explainer Widget variables panel must use the same payload as the filter panel.

## Locale Pattern

The app supports `en`, `ru`, and `zh` for Revisium `LocalizedString` content.

Rules:

- Locale selection is global.
- Switching locale re-issues queries with locale-specific field selection where
  the GraphQL schema requires explicit sub-fields.
- Missing active-locale content falls back to `en`.
- The UI must mark fallback content in the Explainer Widget.
- UI chrome translations live in frontend i18n, not in Revisium content rows.

## State Pattern

Every data page defines these states:

| State       | Requirement                                                           |
| ----------- | --------------------------------------------------------------------- |
| Initial SSR | Render meaningful shell, heading, and widget summary if possible.     |
| Loading     | Keep layout stable; do not blank the whole page during refresh.       |
| Loaded      | Render data, actions, and Explainer Widget response sample.           |
| Empty       | Explain no rows matched and provide a reset or back action.           |
| Error       | Name the failed service when possible; no raw stack trace by default. |
| Not found   | Detail pages show a route-specific missing-row message.               |

## Responsive Pattern

| Breakpoint            | Layout                                                                           |
| --------------------- | -------------------------------------------------------------------------------- |
| Phone `<= 480px`      | Single column, floating widget trigger, filter bottom sheet, 16px page gutters.  |
| Tablet `481px-1023px` | Main content column with floating widget trigger, 24px gutters.                  |
| Desktop `>= 1024px`   | Main content, floating widget trigger, max content width `1440px`, 32px gutters. |

No horizontal page scroll is allowed. Code panels and JSON panels may scroll
inside their own containers.
