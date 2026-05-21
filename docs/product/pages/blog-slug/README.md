# Blog Post Detail

| Field | Value |
|---|---|
| Route | `/blog/[slug]` |
| Status | In delivery |
| Pattern | CMS detail |
| Primary capability | Markdown body, hero image, author avatar |

## Purpose

Render one CMS blog post as a public long-form article with file fields and
author reference.

## Context And Entry

- Entry from `/blog`, `/about`, `/news/[slug]`, home, and external links.
- Links to proof pages, source docs, author/source rows, and `/blog`.

## Functional Blocks

| Block | Requirement |
|---|---|
| Header | Title, excerpt, date, author. |
| Guide section subnav | Links to Guides, News, Balance Patch, and About. |
| Hero image | CMS file field when present. |
| Author panel | Author avatar/name/bio. |
| Article body | Trusted markdown subset rendered as semantic headings, paragraphs, and lists without raw HTML injection. |
| Related links | About page, source docs, relevant proof pages. |
| Explainer Widget | Required. |

## Primary Actions

| Action | Result |
|---|---|
| Back | Return to the previous in-app page, or `/blog` when opened directly. |
| Open proof link | Navigate to route from article link. |
| Open cloud row | Open blog post row. |

## States

| State | Requirement |
|---|---|
| Loading | Article skeleton. |
| Loaded | Article body and author render. |
| Not found | Missing post state with back link. |
| Error | Retry. |

## Transitions

| From | Trigger | To |
|---|---|---|
| Blog catalog | Open post | Detail loading |
| Detail loaded | Back action | Previous in-app page or `/blog` |
| Detail loaded | Capability link | Target proof page |

## Data Contract

| Source | Fields |
|---|---|
| `cms.blog_posts` | slug, title, excerpt, body markdown, hero_image, author_id, published_at, og metadata. |
| `cms.blog_authors` | localized name, avatar, localized bio, slug. |

## Explainer Widget

- Summary: "Blog detail shows CMS markdown content, file fields, and author references from Revisium."
- Variables: slug and locale.
- Deep links: post row/schema and author row.
- Subgraphs: `cms`.

## Responsive Rules

- Phone: article single-column with a floating widget trigger.
- Tablet: readable article column with a floating widget trigger.
- Desktop: readable article width with a floating widget trigger.

## Architecture Notes

- Generate document metadata from CMS fields when SSR metadata hooks are implemented.

## Acceptance Criteria

- [x] Article body renders from CMS markdown.
- [x] Hero image and author avatar use Revisium file fields.
- [x] Not-found handles unknown slug.

## Open Questions

- Slug lookup uses a CMS JSON `data.slug` filter until a dedicated slug field
  resolver is introduced.
