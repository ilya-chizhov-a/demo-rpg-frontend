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
  `/search`, and selected section-subnav examples such as `/classes`.
- Uses the messaging source from `https://github.com/revisium/demo-rpg-docs/blob/master/products/branching-tales/messaging.md`.

## Functional Blocks

| Block                     | Requirement                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| Hero                      | Brand name, codex/database subtitle, primary search/catalog action, secondary guide/catalog action.   |
| Global search             | Search-first entry to `/search`; may be a route card until search data is available.                  |
| Featured databases        | Cards for Heroes, Items, Monsters, World, Quests, and Guides.                                         |
| Latest guides/updates     | Use `cms.blog_posts` as guides/articles; do not claim news is implemented until a news source exists. |
| Featured entities         | Render selected entity routes from `cms.landing_features` using the rendering contract below.         |
| Codex paths               | May link to implemented or stub section routes such as `/classes` to demonstrate subnav flow.         |
| World preview             | Route to `/regions`, `/locations`, and `/factions` through the World family.                          |
| Optional Explainer Widget | Required only beside live CMS/data sections; it is the only visible Revisium proof layer.             |

## Primary Actions

| Action                 | Result                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| Search the codex       | Navigate to `/search`.                                             |
| Browse world           | Navigate to `/regions`.                                            |
| Open a database card   | Navigate to the canonical catalog route for that entity family.    |
| Open guide/update card | Navigate to `/blog` or `/blog/[slug]` once guides are implemented. |

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
| Loaded  | Latest guide/update click | `/blog/[slug]` once guides are implemented. |

## Data Contract

Current implementation uses committed fallback copy only. Live CMS sources remain
the target contract and must replace fallback copy once the tables are available.
There is no confirmed news table yet, so latest updates use `cms.blog_posts`
only when guides/articles are implemented.

| Source                      | Fields                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `cms.landing_hero`          | `title`, `subtitle`, `cta`, `secondary_cta`, optional `bg_image`.                                                               |
| `cms.landing_features`      | `id`, `title`, `slug`, `entity_type`, `status`, `description`, `icon_url`, `route`, `cta_label`, `priority`, `visible_on_home`. |
| `cms.landing_testimonials`  | optional composite quotes.                                                                                                      |
| `cms.blog_posts`            | latest guide/article cards when the blog page is implemented.                                                                   |
| `data.news` or CMS news TBD | blocked until source confirmation.                                                                                              |

`cms.landing_features.status` is one of `implemented`, `planned`, or `stub`.
Home renders only rows where `visible_on_home = true`, ordered by ascending
`priority` and then `title`. Cards show the status badge, `title`,
`description`, and `cta_label`; descriptions clamp to two lines in card grids.
Cards link to `route` when it is an internal route listed in the page inventory.
Use the default section icon when `icon_url` is empty, and do not render raw
original image URLs directly if a future icon uses a file source.

## Explainer Widget

- Required only for sections backed by live CMS/data.
- Summary: "This codex home is assembled from CMS rows and links to the main game database sections."
- Surfaces: GraphQL; REST/MCP only if CMS equivalents exist.
- Deep links: CMS landing tables and guide/article rows where relevant.
- Subgraphs: `cms`; include `data` only if a future confirmed data-backed news
  source is added.

## Responsive Rules

- Phone: hero, CTA group, and first database cards visible without horizontal scroll.
- Tablet: hero plus featured databases in two columns.
- Desktop: constrained hero, dense database grid, and a hint of latest guides or world preview below the first viewport.

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
