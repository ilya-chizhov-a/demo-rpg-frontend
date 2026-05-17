# Branching Tales Frontend Docs

This directory is the implementation source of truth for `demo-rpg-frontend`.
Future frontend work follows a docs-first workflow:

1. Update the relevant document here.
2. Review the user-visible behaviour, architecture, and acceptance criteria.
3. Implement the code.
4. Update the page status and review checklist evidence in the same change.

If code and docs disagree, the docs are considered the intended contract until
the same PR explicitly changes them.

## Reading Order

| Step | Document                                                                      | Why it matters                                                                 |
| ---- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1    | [Project Brief](./product/project-brief.md)                                   | Business context: audience, goal, positioning, success, scope.                 |
| 2    | [Product Overview](./product/README.md)                                       | Explains the frontend's DevRel purpose and route set.                          |
| 3    | [Page Inventory](./product/page-inventory.md)                                 | Canonical implementation list for every route.                                 |
| 4    | [Site Map And Transitions](./product/site-map.md)                             | Route groups, navigation graph, and user transitions.                          |
| 5    | [Page Patterns](./product/page-patterns.md)                                   | Shared UX contracts for catalog, detail, search, branching, CMS, and errors.   |
| 6    | [Feature Map](./product/feature-map.md)                                       | Shows which Revisium/demo feature is demonstrated on which route.              |
| 7    | [Design System](./design-system/README.md)                                    | Visual language, layout, tokens, responsive rules, and accessibility baseline. |
| 8    | [Art Direction And Image Prompts](./design-system/art-direction.md)           | Branching Tales world rules and reusable prompts for entity imagery.           |
| 9    | [Frontend Architecture](./architecture/frontend.md)                           | FSD, MVVM, DI, GraphQL codegen, SSR, and state ownership.                      |
| 10   | [Add Page Playbook](./playbooks/add-page.md)                                  | Step-by-step workflow for implementing a page.                                 |
| 11   | [Developer Handoff](./handoff/README.md)                                      | What a frontend developer does after receiving the work.                       |
| 12   | [Bootstrap New Frontend Project](./handoff/bootstrap-new-frontend-project.md) | Reusable prompt for applying this setup to another frontend.                   |
| 13   | [Review Contract](../REVIEW.md)                                               | Short review entry point for humans and bots.                                  |
| 14   | [Review Checklist](./review/frontend-checklist.md)                            | PR gate for architecture, UX, accessibility, and quality commands.             |
| 15   | [CodeRabbit Config](../.coderabbit.yaml) and [Cubic Config](../cubic.yaml)    | Machine-readable AI-review rules.                                              |
| 16   | [Agent Skills And Rules](../.agents/README.md)                                | Repo-local self-review, PR review, and architecture-rule workflows.            |
| 17   | [Frontend Roadmap](./roadmap/frontend-pages.md)                               | Delivery milestones and recommended order.                                     |

## Source Hierarchy

The broader product source of truth remains the lightweight `demo-rpg-docs`
passport:

- `https://github.com/revisium/demo-rpg-docs/blob/master/README.md#source-of-truth-boundaries` defines repo ownership boundaries.
- `https://github.com/revisium/demo-rpg-docs/blob/master/product.md` defines
  the public story, route scope, and Revisium proof map.
- `https://github.com/revisium/demo-rpg-docs/blob/master/architecture.md`
  defines the public component boundary.

This repository owns the implementation contract:

- exact route behaviour;
- page composition;
- layout and responsive rules;
- frontend architecture requirements;
- review gates;
- agent playbooks.

When the public product story and frontend docs need to change together, update
both in the same PR. Do not let implementation drift from either layer.

When implementation changes behavior or architecture, docs must change in the
same PR unless the existing document already describes the new behavior exactly.
Reviewers and review bots should treat unexplained docs/code drift as a blocker.

## Required Page Spec Shape

Every page under `docs/product/pages/` uses the same shape:

- `Route`
- `Status`
- `Pattern`
- `Primary capability`
- `Purpose`
- `Context And Entry`
- `Functional Blocks`
- `Primary Actions`
- `States`
- `Transitions`
- `Data Contract`
- `Explainer Widget`
- `Responsive Rules`
- `Architecture Notes`
- `Acceptance Criteria`
- `Open Questions`

This mirrors the `revisium-ux/products/admin/pages/*` documentation pattern so
frontend agents can implement pages from a stable contract instead of inventing
behaviour in code.

## Statuses

| Status      | Meaning                                                                   |
| ----------- | ------------------------------------------------------------------------- |
| Draft       | The page is scoped but not ready for implementation.                      |
| Ready       | The page contract is detailed enough for frontend work.                   |
| In delivery | Code is being implemented against the spec.                               |
| Done        | Page is live, tested, documented, and passes the review checklist.        |
| Blocked     | The page is waiting for schema, backend, infrastructure, or content work. |

## Non-Negotiable Requirements

- Every catalog and detail page must render an Explainer Widget.
- Every page must have loading, error, empty, and responsive states where applicable.
- Every page rendering Revisium localized fields must support `en`, `ru`, and `zh` selection with `en` fallback.
- Every route must be SSR-compatible; useful page content and Explainer Widget text must not depend on client-only rendering.
- Views stay thin. Data loading, state transitions, descriptors, and derived data live in ViewModels.
- Non-trivial API access lives behind DataSources; ViewModels consume
  DataSources, not low-level clients.
- Lists with formatting, links, actions, permissions, or non-trivial state use
  List ViewModel and Item ViewModel boundaries.
- React components contain no business logic, no query-variable construction,
  and no persisted-state access.
- One non-trivial React component lives in one file.
- Generated files under `src/__generated__/` are never edited manually.
- The review gate is `npm run verify`, which runs `markdown:lint`,
  `skills:lint`, `ui:lint`, `ts:check`, `lint:ci`, `fsd:check`, and `build`.
