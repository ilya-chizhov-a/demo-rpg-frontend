# Design System And Layout

Branching Tales uses fantasy content, but the primary UI is a public RPG codex
and game database. The visual language should feel like a serious, readable
catalog and companion site: dense, scannable, and content-led, without becoming
a fantasy marketing page or developer dashboard chrome.

## Visual Direction

The product direction is **Dark Tactical Atlas**.

The UI should feel like a modern tactical database and world atlas for a fantasy
RPG. It uses a dark, legible codex surface with a restrained game atmosphere:
region art, climate icons, maps, and entity relationships carry the setting,
while navigation, controls, filters, tables, and widgets stay precise and quiet.

Core rules:

- Use a deep midnight navy base, not pure black.
- Add a subtle star-map or atlas-map layer behind page content when it helps the
  world feel less flat.
- Keep the star-map layer low contrast: tiny muted stars, faint constellation
  lines, and quiet grid marks only.
- Use cyan as the primary product accent for active navigation, focus, selected
  filters, and clickable proof states.
- Use teal and emerald as secondary accents for data-positive states.
- Do not use gold/yellow as a system color. It may appear only as a tiny
  content-specific rarity or illustration detail.
- Avoid beige/parchment treatments, ornate frames, filigree, decorative fantasy
  borders, purple-blue gradient blobs, and one-note color themes in app chrome.
  Content art and generated maps may use parchment-inspired source material
  when the asset requires it, but UI surfaces must stay dark tactical atlas.
- Icons are minimal one-tone or two-tone glyphs. Prefer simple line or filled
  silhouettes over detailed illustrations for UI chrome.

## Design Principles

- Dense but readable: prioritize scanning, comparison, related entities, and evidence.
- Restrained fantasy: names, art, climate icons, and maps carry the theme;
  chrome stays quiet.
- Every surface has a job: avoid decorative sections that do not help evaluation.
- Code and data examples belong in the Explainer Widget so the codex stays
  game-facing by default.
- Accessibility and responsive behaviour are required, not polish.

## Layout System

| Area              | Requirement                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| App shell         | Sticky top nav, brand link, direct route links, compact language button/menu, footer chip.                      |
| Page header       | Title, one-sentence purpose, capability chips, optional primary CTA.                                            |
| Main content      | Catalog grid/table or detail content.                                                                           |
| Explainer control | Required on data pages; compact floating trigger with an overlay panel that does not reserve page layout space. |
| Footer            | Architecture chip and source links.                                                                             |

The top nav uses the primary destinations from the site map: Home, Heroes,
Items, Monsters, World, Quests, Guides, Search, and a language button. It does
not use route-navigation dropdowns in v1. Secondary dictionary routes are
reachable from section subnav, page content, or stubs, not from header menus.
The language button may open a compact language menu, but it is not a route
dropdown or a technical settings panel.
The top nav remains pinned to the top edge while pages scroll so route changes
and primary navigation stay available on long catalog/detail pages.
The page keeps native scrolling and browser scrollbar affordance. Internal code
and JSON panels may expose their own scroll affordance when needed.
The app shell uses a dark midnight surface over the page atlas background.
Active navigation uses a cyan underline or outlined pill, with no layout shift
between active and inactive states.

Current implementation order:

1. App Shell owns the dark atlas page background, sticky dark midnight top nav,
   compact brand mark, cyan active navigation, skip link, and footer chip.
2. Shared page wrappers inherit shell foreground/background instead of forcing a
   light page color.
3. Individual pages may then migrate cards, panels, filters, and data widgets
   from light surfaces to dark tactical atlas surfaces in focused follow-up
   changes.

## Breakpoints

| Breakpoint     | Rule                                                                             |
| -------------- | -------------------------------------------------------------------------------- |
| `<= 480px`     | Single column, floating widget trigger, filter bottom sheet, 16px page gutters.  |
| `481px-1023px` | Main content column with floating widget trigger, 24px gutters.                  |
| `>= 1024px`    | Main content, floating widget trigger, max content width `1440px`, 32px gutters. |

No page-level horizontal scroll. Fixed-format widgets use stable dimensions via
grid tracks, min/max widths, or aspect ratios.

## Chakra UI

Implementation uses Chakra UI components and responsive style props for layout,
spacing, semantic states, and controls. Do not add route-level CSS files for
page layout; page slices should compose Chakra primitives and only introduce a
local CSS file when a browser feature cannot be expressed through Chakra props.

## Tokens

Use Chakra theme tokens or raw values that map to the semantic palette below.
Exact values may evolve, but the semantic intent stays stable once implemented.

| Token                     | Default     | Usage                                             |
| ------------------------- | ----------- | ------------------------------------------------- |
| `--color-bg`              | `#0b1118`   | Page background.                                  |
| `--color-bg-deep`         | `#070b10`   | Deep shell areas and page edges.                  |
| `--color-bg-atlas`        | `#101923`   | Star-map/atlas overlay base.                      |
| `--color-surface`         | `#121820`   | Cards, panels, popovers.                          |
| `--color-surface-raised`  | `#17212b`   | Hovered cards, active controls, elevated panels.  |
| `--color-surface-muted`   | `#0f151d`   | Secondary panels, table rows, inactive tabs.      |
| `--color-text`            | `#f4f7f8`   | Primary text.                                     |
| `--color-text-supporting` | `#c9d2da`   | Larger supporting copy on dark surfaces.          |
| `--color-text-muted`      | `#9aa7b1`   | Secondary text.                                   |
| `--color-text-subtle`     | `#6f7f8b`   | Metadata, helper text, inactive nav.              |
| `--color-text-on-accent`  | `#071018`   | Text and glyphs on cyan/accent filled controls.   |
| `--color-border`          | `#2a3038`   | Borders and dividers.                             |
| `--color-border-strong`   | `#3a4652`   | Active panels and table headers.                  |
| `--color-accent`          | `#22d3ee`   | Primary actions, active state, selected filters.  |
| `--color-accent-strong`   | `#67e8f9`   | Hover/pressed accent and focus rings.             |
| `--color-accent-muted`    | `#0e7490`   | Filled accent surfaces and quiet badges.          |
| `--color-positive`        | `#34d399`   | Success, available, loaded, data-positive states. |
| `--color-data`            | `#38bdf8`   | `data` subgraph chip.                             |
| `--color-cms`             | `#2dd4bf`   | `cms` subgraph chip.                              |
| `--color-backend`         | `#a78bfa`   | `backend` subgraph chip.                          |
| `--color-danger`          | `#fb7185`   | Error states.                                     |
| `--color-arid`            | `#f97316`   | Arid climate content accent only.                 |
| `--color-alpine`          | `#93c5fd`   | Alpine climate content accent.                    |
| `--color-forest`          | `#4ade80`   | Forest climate content accent.                    |
| `--color-coastal`         | `#22d3ee`   | Coastal climate content accent.                   |
| `--color-marsh`           | `#14b8a6`   | Marsh climate content accent.                     |
| `--radius-sm`             | `4px`       | Inputs, chips.                                    |
| `--radius-md`             | `8px`       | Cards, panels.                                    |
| `--space-1..8`            | `4px` steps | Spacing scale.                                    |

Do not let the UI collapse into one dominant hue. The palette combines neutral
surfaces, cyan actions, blue/teal/purple subgraph chips, climate accents, and
red errors. Yellow/gold is not part of the system palette.

## Backgrounds

The default page background is a dark atlas field:

- Base fill uses `--color-bg`.
- A subtle star-map layer may add tiny points, faint constellation lines, and
  low-opacity map/grid marks.
- The atlas layer must never reduce text contrast or compete with data panels.
- Avoid large glowing orbs, bokeh blobs, strong gradients, and decorative SVG
  scenery.
- Cards and panels sit on solid or lightly translucent slate surfaces so text
  remains stable over the atlas.

The star-map treatment is atmospheric, not illustrative. It should make the
world feel present while the product UI remains the first read.

## Typography

- Use system UI fonts for app chrome and content.
- Use a monospace font for GraphQL, JSON, REST, MCP, and code panels.
- Do not scale font size with viewport width.
- Letter spacing stays `0`.
- Compact surfaces use compact headings; reserve large type for page-level heroes only.

## Components

| Component        | Requirement                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buttons          | Text for clear commands; icon buttons only with accessible labels/tooltips.                                                                                       |
| Links            | Underline or clear affordance in prose; route cards may use block links.                                                                                          |
| Cards            | Max radius `8px`; no card-inside-card layouts.                                                                                                                    |
| Catalog cards    | Use restrained hover lift, cyan border shift, and media scale to clarify clickability without changing layout dimensions.                                         |
| Tables           | Sticky header only when useful; preserve keyboard readability.                                                                                                    |
| Chips            | Short labels for capabilities, subgraphs, statuses, and enums.                                                                                                    |
| Tabs             | Used for GraphQL/REST/MCP surfaces and dense view switches.                                                                                                       |
| Code panels      | Scroll internally, copy action, language label, accessible focus.                                                                                                 |
| Bottom sheets    | Mobile filters only; must be dismissible by button and Escape.                                                                                                    |
| Explainer Widget | Uses a compact floating source-reference trigger; expanded panel has tinted surface, strong Revisium header, close control, and explicit cloud/source link block. |

## Image Delivery And Imgproxy

Revisium admin stores original image files and exposes absolute original URLs,
for example `https://cdn.revisium.io/<file-hash>`. The frontend treats those
URLs as source metadata only. Do not render original CDN URLs directly in
visible `<img>`, `<picture>`, CSS background, or preload tags.

Every visible image must use a derived `imgproxy` URL with dimensions chosen
for the exact UI slot. The current unsigned base URL is:

```text
https://imgproxy.revisium.io/unsafe/
```

Keep this base in one shared helper or service so a future signed path can
replace `/unsafe/` without touching page components.

The URL shape is:

```text
https://imgproxy.revisium.io/unsafe/<processing-options>/plain/<encoded-source-url>@webp
```

Example for a 300x300 catalog thumbnail:

```text
https://imgproxy.revisium.io/unsafe/rs:fit:300:300/plain/https://cdn.revisium.io/8e682e1bf2a57397adf4a58b2ff523d6691e15c3@webp
```

Plain source URLs that contain special characters such as `%`, `?`, or `@`
must be percent-encoded before they are placed after `/plain/`. CDN hash URLs
without query strings can use the readable form shown above.

Implementation rules:

- Build image URLs through one shared helper or service once image rendering is
  implemented; do not hand-concatenate `imgproxy` URLs inside React components.
- The source URL returned by Revisium/admin remains available for metadata,
  Explainer Widget samples, and cloud/source links, but not for rendered image
  bytes.
- Always request slot-sized images. Catalog thumbnails, avatars, cover cards,
  media previews, and detail heroes each define their own target dimensions.
- Use `srcset` for high-density screens. Prefer the same logical slot with
  `dpr:2` for the 2x candidate; if that option is unavailable, request doubled
  physical dimensions explicitly.
- Set stable layout dimensions with `width`/`height`, `aspect-ratio`, or fixed
  grid tracks before the image loads.
- Use `loading="lazy"` for below-the-fold catalog images and keep eager loading
  for the primary LCP image only.
- Keep the output format `webp` by default with the `@webp` suffix unless a
  specific browser or asset requirement changes the rule.

Allowed processing options for app UI:

| Option                         | Use                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `rs:fit:<w>:<h>`               | Default for thumbnails where the full asset must remain visible, such as maps, item icons, portraits, and file previews.  |
| `rs:fill:<w>:<h>`              | Cropped cover treatment for news/blog cards, hero images, and decorative-safe art slots. Pair with explicit `gravity`.    |
| `rs:fill-down:<w>:<h>`         | Cropped treatment that avoids visually inflating small source images. Use for user-provided or uncertain CMS images.      |
| `dpr:2`                        | Retina/high-density `srcset` candidate for the same logical slot.                                                         |
| `g:ce`, `g:sm`, `g:fp:<x>:<y>` | Crop gravity. Use center by default, smart gravity for general art, and focus points only when content provides them.     |
| `q:<value>`                    | Optional quality override for large covers or heroes after visual review. Do not tune quality per component by guesswork. |
| `@webp`                        | Default output format suffix.                                                                                             |

Avoid these in product UI unless a page spec explicitly allows them:

- direct original CDN URLs as rendered image sources;
- `force` resizing, because it distorts assets;
- unbounded dimensions, `0x0` original-size requests, or links that depend on
  the uploaded file's natural size;
- per-component use of security-related options such as source file-size or
  result-dimension overrides;
- inline filters, blur, pixelate, watermark, or format-specific encoder tuning
  as decorative UI effects.

See the upstream
[imgproxy processing documentation](https://docs.imgproxy.net/usage/processing)
for syntax details, but keep application code limited to the approved subset
above.

### Icons And Logo

- App and UI icons are minimal one-tone or two-tone glyphs.
- Use line icons or simple filled silhouettes for navigation, filters, climate,
  settings, and source actions.
- Avoid ornate fantasy symbols, detailed crest art, and multi-color icons in
  app chrome.
- The logo may use a compact square mark plus text. The mark should work in
  one color and in a two-tone cyan/slate variant.
- Content art can be rich, but controls and metadata icons stay quiet.

## Data Visual Treatment

- Catalogs use cards when imagery or summaries matter; tables when comparison matters.
- Region catalogs use atlas cards: stable image area, a separate data area,
  climate glyph and source chip visible without opening the detail page.
- Detail pages group fields by meaning: identity, schema fields, computed fields, related rows, files.
- File previews reserve stable aspect ratios before images load and render
  slot-sized `imgproxy` derivatives instead of original CDN files.
- Formula fields are visually labelled as computed.
- Federated fields show visible subgraph attribution on reference pages.

## Accessibility Baseline

- WCAG 2.2 AA target.
- All interactive controls have visible focus states.
- Touch targets are at least `44px` on mobile.
- Color is never the only state indicator.
- Respect `prefers-reduced-motion`.
- Modals, sheets, accordions, and tabs use correct ARIA patterns.
- Error messages identify the problem and recovery action.
