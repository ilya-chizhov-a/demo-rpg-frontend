# Bootstrap A New Frontend Project From This Repo

Use this when starting another Revisium-style frontend. The goal is not to copy
Branching Tales content. The goal is to reuse the operating model: docs-first
product contracts, FSD, MVVM, MobX ViewModels, typed GraphQL, review gates, and
handoff prompts.

If the target product also has a separate docs/passport repository, keep the
same boundary model as Branching Tales: the docs repo owns the public passport,
architecture summary, product story, and bootstrap snapshot; the frontend repo
owns exact route behaviour, page specs, layout, implementation status, review
gates, and agent workflows.

## What To Reuse

Copy the ideas and adapt names, routes, and domain language:

- root `AGENTS.md` for coding-agent boot rules;
- root `REVIEW.md` for reviewer and bot rules;
- root `.coderabbit.yaml` and `cubic.yaml` for AI-review bot configuration;
- root `.agents/skills` and `.agents/rules` for repo-local review workflows;
- optional `.claude/skills -> ../.agents/skills` symlink for Claude Code;
- `docs/README.md` for the docs-first workflow;
- `docs/product/page-inventory.md` and `docs/product/pages/_template.md` for
  page contracts;
- `docs/product/site-map.md` for route transitions;
- `docs/product/page-patterns.md` for shared UX contracts;
- `docs/design-system/README.md` for layout, tokens, responsive rules, and
  accessibility;
- `docs/architecture/frontend.md` for FSD, MVVM, DataSource, List/Item
  ViewModel, DI, SSR, and codegen rules;
- `docs/playbooks/add-page.md` for implementation steps;
- `docs/review/frontend-checklist.md` for self-review and PR review.

## What To Replace

- Product name, audience, route map, and business goal.
- Entity names, GraphQL operations, schema fields, and source repositories.
- Visual theme and image prompts.
- Deployment URLs, env names, and cloud/source links.
- Any Branching Tales demo-specific examples.
- Any public product story or route scope that belongs in a separate
  docs/passport repo.

## One-Prompt Bootstrap

Use this prompt in a fresh frontend repo when you want an agent to create the
same kind of setup from this repository:

```text
You are setting up a new frontend repository using
demo-rpg-frontend as the reference architecture.

Reference repo path:
<path-to-demo-rpg-frontend>

Target repo path:
<path-to-new-frontend-repo>

Goal:
Create a docs-first frontend handoff package and architecture baseline for the
target product. Reuse the ideas, structure, review rules, and agent workflow
from demo-rpg-frontend, but replace all Branching Tales domain language with the
target product language.

First inspect these reference files:
- AGENTS.md
- REVIEW.md
- .coderabbit.yaml
- cubic.yaml
- .agents/skills/frontend-self-review/SKILL.md
- .agents/skills/frontend-general-checks/SKILL.md
- .agents/skills/frontend-pr-review-iteration/SKILL.md
- .agents/rules/
- README.md
- docs/README.md
- docs/handoff/README.md
- docs/handoff/bootstrap-new-frontend-project.md
- docs/architecture/frontend.md
- docs/playbooks/add-page.md
- docs/review/frontend-checklist.md
- docs/product/page-inventory.md
- docs/product/pages/_template.md
- docs/product/page-patterns.md
- docs/product/site-map.md
- docs/design-system/README.md

Then inspect the target repo stack and existing code. If there is a companion
docs/passport repo, inspect its source-of-truth boundary section and product
story. Do not invent a new architecture if the target repo already has a
compatible pattern. Adapt the reference rules to the target stack.

Deliverables in the target repo:
1. Root AGENTS.md that points agents to the docs-first workflow.
2. Root REVIEW.md that gives human reviewers and review bots explicit rules.
3. Root .coderabbit.yaml and cubic.yaml that point AI reviewers at the same
   architecture and review rules.
4. Root .agents/skills and .agents/rules that make self-review and PR-review
   iteration follow the same source-of-truth contract.
5. Optional .claude/skills symlink to .agents/skills when the target repo uses
   Claude Code.
6. docs/README.md with reading order and source-of-truth rules.
7. docs/product/project-brief.md with business context.
8. docs/product/page-inventory.md and docs/product/pages/_template.md.
9. docs/product/site-map.md and docs/product/page-patterns.md.
10. docs/design-system/README.md.
11. docs/architecture/frontend.md with FSD/MVVM/DataSource/List/Item ViewModel
   rules adapted to the target repo.
12. docs/playbooks/add-page.md.
13. docs/review/frontend-checklist.md.
14. docs/handoff/README.md with first tasks and required handoff output.

Architecture requirements to preserve:
- Docs are the implementation source of truth.
- Keep product/docs boundaries explicit when a separate docs repo exists.
- Code changes that affect behavior, UX, navigation, data contracts,
  architecture, design, or review policy update docs in the same PR.
- React components render and forward events only.
- ViewModels own state, actions, derived values, and descriptors.
- DataSources own API calls and transport mapping.
- Lists use List ViewModel plus Item ViewModel boundaries when rows have
  formatting, links, actions, permissions, or non-trivial state.
- Use DI for services and long-lived shared state.
- Shared/persisted state belongs in services or state ViewModels, not components.
- One non-trivial React component per file.
- Generated files are never hand-edited.
- Run and report the target repo quality gates.
- Provide one local verification command equivalent to `npm run verify`.

Before editing, present a short plan. After editing, run available checks and
summarize changed files, gaps, and next implementation steps.
```

## Acceptance Criteria

- A new developer can start from `AGENTS.md`, then `docs/handoff/README.md`.
- A review bot can start from `REVIEW.md` and produce architecture-aware
  findings.
- A coding agent can run repo-local self-review and PR-review iteration skills
  without creating a competing source of truth.
- A developer can clone the repo, run one verification command, pick the next
  route from the handoff docs, and open the first PR without asking for generic
  process instructions.
- The target repo has page specs before page implementation starts.
- The first page implementation has a clear DataSource, ViewModel, Item
  ViewModel, React view, and review path.
