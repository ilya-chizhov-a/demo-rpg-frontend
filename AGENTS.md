# AGENTS.md — demo-rpg-frontend

Operational notes for AI coding agents working in this repo. See `README.md`
for the human-facing overview.

## Ground rules

- **Docs first for page work.** `docs/` is the frontend implementation
  source of truth. Before changing a route, page, shared UI pattern,
  layout, or review rule, update the matching document first:
  `docs/product/pages/...`, `docs/product/page-patterns.md`,
  `docs/design-system/README.md`, or `docs/architecture/frontend.md`.
  Code that contradicts the docs is treated as a bug unless the same PR
  updates the docs and explains the change.
- **For handoff work, start at `docs/handoff/README.md`.** It links the
  product route specs, feature map, design system, art direction, architecture,
  playbooks, roadmap, and review checklist in the intended implementation order.
- **For review work, start at [`REVIEW.md`](./REVIEW.md).** It is the short
  contract for human reviewers, review bots, and AI agents. The detailed
  checklist lives in [`docs/review/frontend-checklist.md`](./docs/review/frontend-checklist.md).
- **Use repo-local review skills when available.**
  [`frontend-self-review`](./.agents/skills/frontend-self-review/SKILL.md)
  is the pre-handoff self-review workflow. [`frontend-general-checks`](./.agents/skills/frontend-general-checks/SKILL.md)
  is the baseline verification workflow. [`frontend-pr-review-iteration`](./.agents/skills/frontend-pr-review-iteration/SKILL.md)
  is the workflow for GitHub review threads. [`frontend-pr-publish`](./.agents/skills/frontend-pr-publish/SKILL.md)
  is the verified branch, commit, push, and PR creation workflow. These skills
  do not create a new source of truth; they enforce `docs/`, `REVIEW.md`,
  `.coderabbit.yaml`, and `cubic.yaml`.
- **Architecture rules live in canonical docs.** Use [`REVIEW.md`](./REVIEW.md)
  and [`docs/architecture/frontend.md`](./docs/architecture/frontend.md) for
  Apollo, FSD, MVVM, DataSource/List/Item ViewModel, DI, generated-file, and
  React component boundaries. Keep this file as the boot pointer, not the full
  policy source.
- **Current bootstrap note:** `/regions` is intentionally minimal while its
  spec is not `Done`; refactor it according to the DataSource/List/Item
  ViewModel shape in the architecture doc before marking it `Done`.

## Adding a page

Start from [`docs/playbooks/add-page.md`](./docs/playbooks/add-page.md) and the
matching page spec. The playbook owns the implementation order; if the spec is
missing or stale, update it before writing code.

## Quality gates

Run before opening a PR:

```bash
npm run verify
```

`npm run verify` runs `markdown:lint`, `skills:lint`, `ui:lint`, `ts:check`,
`lint:ci`, `fsd:check`, and `build`. CI mirrors these. The `vite-plugin-checker` plugin
also surfaces tsc errors during `npm run dev`.

Before handoff or PR update, run the repo-local
[`frontend-general-checks`](./.agents/skills/frontend-general-checks/SKILL.md)
and [`frontend-self-review`](./.agents/skills/frontend-self-review/SKILL.md)
workflows and include the result in the response, PR description, or PR comment.

## Reusing this setup elsewhere

For a new frontend repo, use
[`docs/handoff/bootstrap-new-frontend-project.md`](./docs/handoff/bootstrap-new-frontend-project.md)
as the one-prompt bootstrap guide.

## Env layout

`.env/.env` (committed defaults), `.env/.env.<mode>` (per-mode,
committed), `.env/.env.<mode>.local` (uncommitted overrides). Only
`REACT_APP_*` reaches the client bundle.

## Related repos

- `../demo-rpg-backend` — NestJS subgraph (regions, federation entrypoint)
- `../demo-rpg-docs` — project passport, public architecture summary, product
  story, and bootstrap snapshot
- `../../infrastructure` — Argo CD apps and Helm charts for the dev stand
