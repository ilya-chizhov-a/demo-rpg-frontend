# About Page

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Route              | `/about`                                         |
| Status             | Draft                                            |
| Pattern            | Narrative architecture page                      |
| Primary capability | Long-form system design and implementation split |

## Purpose

Explain how the codex frontend, data content platform, and custom backend fit
together without making the main product UI feel like a developer console.

## Context And Entry

- Linked from home secondary CTA, footer chip, Explainer Widget help links, and README.
- Links out to GitHub repos, cloud projects, architecture docs, and first proof pages.

## Functional Blocks

| Block                | Requirement                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| Intro                | Repeat the short Branching Tales 80/20 framing.                                                 |
| Architecture diagram | Render the current frontend/router/backend/Revisium topology.                                   |
| What Revisium did    | Table for schemas, content, files, formulas, branching, search, APIs, federation participation. |
| What we wrote        | Table for backend counters/comments/recommendations/runtime logic and frontend UI.              |
| Evaluation path      | Ordered list of pages to click for a five-minute evaluation.                                    |
| Source links         | GitHub and cloud project links.                                                                 |

## Primary Actions

| Action                    | Result                                                        |
| ------------------------- | ------------------------------------------------------------- |
| View schema-first example | Navigate to `/regions`.                                       |
| View federation example   | Navigate from `/regions` to a concrete `/regions/[id]` route. |
| View branching example    | Navigate to `/balance-patch`.                                 |
| Open source               | Open GitHub repo in a new tab.                                |

## States

| State               | Requirement                                            |
| ------------------- | ------------------------------------------------------ |
| Loaded              | Static narrative renders with links and diagram.       |
| Diagram unavailable | Render text fallback with the same architecture facts. |

## Transitions

| From   | Trigger               | To           |
| ------ | --------------------- | ------------ |
| Loaded | Source link click     | External tab |
| Loaded | Proof page link click | Target route |

## Data Contract

| Source      | Fields                                                   |
| ----------- | -------------------------------------------------------- |
| Static docs | Messaging and architecture content from `demo-rpg-docs`. |

## Explainer Widget

- Not required unless live data is added.
- If included, summary explains that the page is a static architecture narrative, not a Revisium data request.

## Responsive Rules

- Phone: diagram can become a stacked text/table representation.
- Tablet: narrative sections remain single-column for readability.
- Desktop: tables can sit in two-column comparison when space allows.

## Architecture Notes

- Static page may be implemented as a thin route until live data is introduced.
- Keep source links deterministic and easy for agents to parse.

## Acceptance Criteria

- [ ] Page answers "what did Revisium generate and what did we write?"
- [ ] Architecture diagram or fallback is understandable without reading source.
- [ ] Links route visitors to the main proof pages.

## Open Questions

- Decide whether architecture diagram is copied from docs or generated from a shared markdown/source asset.
