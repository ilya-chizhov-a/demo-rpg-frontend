# Project Brief

## One-Line Description

Branching Tales is a public fantasy RPG codex and game database demo. Visitors
browse heroes, items, monsters, regions, quests, guides, and related entities
as a game-facing content site, while the technical proof stays available through
the Explainer Widget.

## Business Purpose

The frontend exists to make the database itself useful first. A visitor should
be able to answer game-facing questions without thinking about implementation:

- Which heroes, classes, abilities, items, monsters, quests, regions, and
  factions exist?
- How do entities relate to each other?
- Which items drop from monsters, reward quests, or support hero builds?
- Which guides or articles explain a system, region, or launch update?
- Can search move across database and editorial content?

For evaluators, each implemented data page still proves the content-platform
story. Revisium is the hidden content platform and the visible proof layer only
when a visitor opens the Explainer Widget: GraphQL operation, variables,
response sample, source table/schema/row links, and REST/MCP equivalents where
available.

## Positioning

Branching Tales is a codex-style game database, not a production game and not a
developer dashboard.

The fantasy RPG domain is useful because it naturally contains:

- regions, locations, factions, heroes, items, monsters, quests, and parties;
- nested arrays and relationships;
- images, portraits, icons, maps, and crests;
- computed values such as rarity, market value, party size, and quest rewards;
- editorial content like guides, update posts, and blog posts.

That makes the product understandable while still exercising serious data
platform features. The main UI should feel like browsing a polished RPG
database similar in structure to public codex and companion sites; the technical
source story belongs in the Explainer Widget.

## Audience

| Audience                  | What they need to see                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Game database visitor     | Fast catalog browsing, search, related entities, guides, and readable detail pages.                         |
| Backend/platform engineer | Real schema, generated APIs, query payloads, response JSON, and source rows in the Explainer Widget.        |
| Tech lead                 | Operational story: federation, revisions, migration path, public read, error handling through proof panels. |
| DevRel/sales engineer     | Stable route path for a five-minute live demo that starts as a real codex site.                             |
| AI coding agent           | Machine-readable page contracts, request examples, source links, and implementation patterns.               |
| Frontend developer        | Clear page specs, design rules, architecture constraints, and review gates.                                 |

## Core Message

For visitors, Branching Tales is a searchable codex: catalogs, detail pages,
related entities, guides, and world previews.

For evaluators, the Explainer Widget shows how Revisium handles the repeatable
80 percent:

- schemas;
- content rows;
- files;
- formulas;
- revisioned data;
- search;
- REST/GraphQL/MCP surfaces;
- federation participation.

The custom application handles the remaining product-specific 20 percent:

- operational counters;
- comments and mutable runtime state;
- recommendations;
- auth if needed;
- UI composition;
- product-specific business logic.

## Product Promise

Within five minutes, a visitor should be able to open the demo, search or browse
one or two sections, and understand the shape of the game database. An
evaluator should then be able to open the Explainer Widget on an implemented
page and answer whether Revisium supports the capability they care about.

Every meaningful page must therefore show:

- rendered content;
- game-facing related entities and navigation;
- the request that produced it, inside the Explainer Widget;
- the response sample, inside the Explainer Widget;
- source data links, inside the Explainer Widget;
- what feature is being demonstrated, inside the Explainer Widget;
- which API surfaces exist, inside the Explainer Widget;
- which subgraph owns fields when federation is involved, inside the Explainer
  Widget.

## V1 Scope

In scope:

- read-only public frontend;
- dictionary catalog and detail pages;
- codex home, catalog, detail, guide/article, and search surfaces;
- Explainer Widget on data pages as the only visible Revisium proof layer;
- localized content rendering;
- responsive layout;
- source links to cloud rows/schemas inside the Explainer Widget;
- GraphQL-first implementation with REST/MCP parity shown where available;
- route/page specs as the implementation contract.

Out of scope:

- user accounts and auth;
- write flows;
- playable combat or quest progression;
- payments/billing;
- admin editing UI;
- production-grade game mechanics;
- mobile native applications.

## Success Criteria

| Goal                 | Success signal                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------- |
| Capability discovery | Every Revisium feature in the feature map has a page that demonstrates it.                  |
| Technical trust      | Every data page exposes query, variables, response sample, and source links.                |
| Federation clarity   | At least one detail page visibly combines Revisium-owned and backend-owned fields.          |
| Handoff readiness    | A frontend developer can implement pages by reading docs without asking for product basics. |
| Demo usability       | Pages work on phone, tablet, and desktop with no horizontal page scroll.                    |

## Product Boundaries

The app should feel like:

- a polished public RPG codex;
- a readable catalog and guide database;
- a content site with optional technical proof available on demand.

The app should not feel like:

- a marketing-only landing page;
- a generic fantasy website;
- a game UI that hides the data/API story;
- a developer console without visual product quality.
- a Revisium marketing landing or admin dashboard.
