# Home Page

| Field              | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| Route              | `/`                                                           |
| Status             | In delivery                                                   |
| Pattern            | Codex/database home                                           |
| Primary capability | Game database entry, search, catalog routing, guides/articles |

## Purpose

Introduce Branching Tales as a public RPG codex and route visitors to the
fastest database section: search, heroes, items, monsters, world, quests, and
guides. Technical proof is secondary and belongs in the Explainer Widget when a
section is backed by live data.

## Context And Entry

- Entry point from docs, direct demo URL, and product walkthroughs.
- Links to `/heroes`, `/items`, `/monsters`, `/regions`, `/quests`, `/blog`,
  and `/search`.
- Uses the messaging source from `https://github.com/revisium/demo-rpg-docs/blob/master/products/branching-tales/messaging.md`.

## Functional Blocks

| Block                     | Requirement                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| Hero                      | Brand name, short codex subtitle, page-level atlas art backdrop, primary search action, secondary atlas action. |
| Global search             | Search-first entry to `/search`; may be a route card until search data is available.                  |
| Featured databases        | Detailed theme-led cards ordered World, Heroes, Items, Monsters, Quests, Guides with a short intro.   |
| Featured entities         | Render selected entity routes from `cms.landing_features` using the rendering contract below.         |
| Optional Explainer Widget | Required only beside live CMS/data sections; it is the only visible Revisium proof layer.             |

## Primary Actions

| Action                 | Result                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| Search the codex       | Navigate to `/search`.                                             |
| Browse world           | Navigate to `/regions`.                                            |
| Open a database card   | Navigate to the canonical catalog route for that entity family.    |

The hero does not show technical fallback notes, status chips, or route-family
badges; those details belong in the sections below the first viewport and in
implementation docs.
Home uses the normal document flow: the hero appears first, then the featured
database grid follows immediately below it. Home must not reserve viewport-sized
scroll gaps or intercept wheel, touch, or keyboard scroll for custom autoscroll
behavior.
The hero uses matching top and bottom vertical padding so the title block has
the same breathing room before the database grid as it has below the sticky
header.
Home does not render a separate proof/highlight strip between the hero and the
featured databases; the first scroll target after the hero is the image-led
database grid.
Home does not render Codex path cards or latest guide/world-preview cards while
those surfaces are fallback links; the route links already live in the hero and
featured database grid.
The featured databases intro stays game-facing and concise; implementation
status details stay out of the Home card captions and can appear after users
navigate into the destination route.
Featured database cards follow primary navigation order after Home, excluding
Search because search is already the hero's primary action.
Featured database cards keep the lower text/action band compact. On tablet and
desktop, the title/description and route action share one row so the artwork
stays dominant and the card does not reserve a tall empty panel beneath it. The
band aligns content to the top and uses tight vertical padding so descriptions
with different line counts do not visually jump. Card images keep only a subtle
bottom vignette, not a heavy dark overlay, so generated artwork stays close to
its source brightness. The card grid keeps cards in a row equal height while the
lower band reserves the same compact height for every card, keeping title
baselines consistent across a row.
Each featured database card uses its own detailed committed tactical-atlas image
instead of reusing one shared crop:

- World: `/assets/home/cards/world-atlas-routes.png` for region interconnections.
- Heroes: `/assets/home/cards/heroes-class-web.png` for party/class relationships.
- Items: `/assets/home/cards/items-gear-schematic.png` for gear/stat schematics.
- Monsters: `/assets/home/cards/monsters-bestiary-threats.png` for threat/drops.
- Quests: `/assets/home/cards/quests-branching-paths.png` for branching task paths.
- Guides: `/assets/home/cards/guides-codex-notes.png` for codex notes.

## States

| State       | Requirement                                                                        |
| ----------- | ---------------------------------------------------------------------------------- |
| CMS loading | Render hero shell and stable card placeholders.                                    |
| CMS loaded  | Render CMS text/images and route cards.                                            |
| CMS empty   | Fall back to committed brand copy and show no broken sections.                     |
| CMS error   | Show the page with fallback copy and a small status note; do not block navigation. |

## Transitions

| From    | Trigger                   | To                                          |
| ------- | ------------------------- | ------------------------------------------- |
| Initial | CMS data resolves         | Loaded landing                              |
| Loaded  | Capability card click     | Target route                                |

## Data Contract

Current implementation uses committed fallback copy only. Live CMS sources remain
the target contract and must replace fallback copy once the tables are available.

Until the CMS landing media fields exist, Home may use one committed generated
editorial atlas asset as its route-specific fixed shell background. This asset
replaces the default shell star-map only on `/` and is page-owned fallback art
for the public entry surface, not a replacement for entity file fields. The
featured database cards use page-owned thematic artwork until CMS feature media
exists. Once `cms.landing_hero.bg_image` or feature media is available, visible
CMS images must follow the shared imgproxy media-field rules.

| Source                      | Fields                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `cms.landing_hero`          | `title`, `subtitle`, `cta`, `secondary_cta`, optional `bg_image`.                                                               |
| `cms.landing_features`      | `id`, `title`, `slug`, `entity_type`, `status`, `description`, `icon_url`, `route`, `cta_label`, `priority`, `visible_on_home`. |
| `cms.landing_testimonials`  | optional composite quotes.                                                                                                      |
| `data.news` or CMS news TBD | blocked until source confirmation.                                                                                              |

`cms.landing_features.status` is one of `implemented`, `planned`, or `stub`.
Home renders only rows where `visible_on_home = true`, ordered by ascending
`priority` and then `title`. Cards show the `title`, `description`, and
`cta_label`; Home cards do not show status badges or secondary category labels.
Descriptions stay short and game-facing, and clamp to two lines in card grids.
Cards link to `route` when it is an internal route listed in the page inventory.
Use the default section icon when `icon_url` is empty, and do not render raw
original image URLs directly if a future icon uses a file source.

## Explainer Widget

- Required only for sections backed by live CMS/data.
- Summary: "This codex home is assembled from CMS rows and links to the main game database sections."
- Surfaces: GraphQL; REST/MCP only if CMS equivalents exist.
- Deep links: CMS landing tables where relevant.
- Subgraphs: `cms`; include `data` only if a future confirmed data-backed news
  source is added.

## Responsive Rules

- Phone: hero, CTA group, and first database cards visible without horizontal scroll.
- The hero and featured database grid stay in normal document order without
  viewport-sized gaps between sections.
- Hero content sits below the top edge of the route background with enough
  breathing room to reveal the atlas art, instead of vertically centering in a
  tall banner.
- Tablet: hero plus featured databases in two columns; image crops keep stable
  aspect ratios.
- Desktop: page-level image background and a three-column/two-row database grid.

## Architecture Notes

- Page slice: `src/pages/Home/`.
- `HomeViewModel` owns committed fallback navigation and messaging while CMS data
  is pending.
- The CMS DataSource should be added before the page is marked `Done`.
- Do not hardcode CMS-managed feature copy after CMS tables are ready.

## Acceptance Criteria

- [x] Visitor can reach a proof page for every headline capability from the home page.
- [ ] Landing copy matches the messaging source.
- [x] CMS absence does not prevent route navigation.
- [ ] Page works on phone, tablet, and desktop.

## Open Questions

- Confirm whether news should be a data or CMS table before exposing `/news`.
- Confirm CMS table availability and messaging source content before replacing
  fallback copy.
