# Blog Catalog

| Field | Value |
|---|---|
| Route | `/blog` |
| Status | In delivery |
| Pattern | CMS catalog |
| Primary capability | CMS posts, authors, markdown content |

## Purpose

Show Revisium as a CMS for long-form explanatory content and provide a deeper
essay surface for the Branching Tales 80/20 story.

## Context And Entry

- Entry from home, about, news posts, footer, and external DevRel links.
- Blog cards link to `/blog/[slug]`.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Blog purpose and CMS capability chips. |
| Guide section subnav | Links to Guides, News, Balance Patch, and About; blocked siblings stay visibly blocked. |
| Featured post | Curated or newest welcome/launch essay until a `pinned` CMS field exists. |
| Result summary | Visible post count plus active search/category terms when filters are available. |
| Post list | Title, excerpt, author, `published_at`, hero image if available. |
| Search filter | Client-visible search field filters the loaded CMS rows until server search fields are confirmed. |
| Explainer Widget | Required; explains CMS tables. |

## Primary Actions

| Action | Result |
|---|---|
| Open post | Navigate to `/blog/[slug]`. |
| Filter/search | Filters loaded CMS rows client-side until CMS search query shape is confirmed. |
| Open author/cloud source | Opens linked source. |

## States

| State | Requirement |
|---|---|
| Loading | Stable post list skeleton. |
| Loaded | Featured and list sections render. |
| Empty | Explain no posts have been seeded. |
| Error | CMS-readable error with retry. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Blog catalog | Open post | `/blog/[slug]` |
| Blog catalog | Filter/search | Filtered catalog |
| Empty | Clear filters | Default catalog |

## Data Contract

| Source | Fields |
|---|---|
| `cms.blog_posts` | `slug`, localized `title`/`excerpt`/`body`, `published_at`, `author_id`, `hero_image`. |
| `cms.blog_authors` | localized name, avatar, localized bio, slug. |

## Explainer Widget

- Summary: "Blog shows Revisium CMS rows driving long-form public content."
- Variables: locale, search term, pagination, `orderBy: publishedAt desc`.
- Deep links: blog posts/authors tables and selected rows.
- Subgraphs: `cms`.

## Responsive Rules

- Phone: featured post first, cards single-column.
- Tablet: featured post and list share a two-column layout with the widget visible.
- Desktop: featured post plus dense list; widget right.

## Architecture Notes

- Markdown rendering must sanitize or only render trusted CMS content according to chosen library.

## Acceptance Criteria

- [x] Blog list is CMS-driven.
- [x] Author data is resolved from CMS rows.
- [x] Widget links to CMS source tables.

## Open Questions

- Decide whether the CMS schema needs `pinned` or category fields before enabling pinned/category UX.
- Server-side CMS search query shape is not confirmed; the v1 UI filters loaded rows client-side.
