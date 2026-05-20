# Frontend Architecture

This repo uses React Router v7 SSR, MobX MVVM, `graphql-request`, GraphQL
codegen, and Feature-Sliced Design.

## Hard Rules

- Do not add Apollo Client.
- Do not call `graphql-request` directly from React components.
- Do not build GraphQL variables, sort payloads, or filter payloads in JSX.
- Do not create service singletons outside DI.
- Do not edit generated files under `src/__generated__/`.
- Do not silence Steiger boundary errors.
- Do not move page-specific behaviour into `shared`.
- Do not ship a page without a matching page spec.
- Do not put non-trivial business logic in React components.
- Do not mix unrelated abstraction levels in one method.
- Do not put more than one non-trivial React component in a file.

## FSD Layers

```text
src/
  app/       route modules, app-level providers, shell wiring
  pages/     route-level page slices
  widgets/   reusable cross-page UI, e.g. ExplainerWidget
  features/  reusable user actions when they emerge
  entities/  domain entity UI/model helpers when reuse is real
  shared/    DI, request primitives, services, config, low-level UI
```

Dependency direction is top-down only:

`app -> pages -> widgets/features/entities -> shared`

## Page Slice Contract

Each page slice follows this shape:

```text
src/pages/<Page>/
  api/<Page>.graphql
  api/<Page>DataSource.ts
  model/<Page>ViewModel.ts
  model/<Entity>ItemViewModel.ts
  ui/<Page>Page/<Page>Page.tsx
  index.ts
```

Route modules under `src/app/routes/*.tsx` are thin shells that render the page.
Route modules should not contain business logic, request logic, or formatting
logic.

Stub route modules use the shared stub registry/factory under
`src/app/route-stubs/` so placeholder metadata stays in one place and route
files do not repeat the same JSX wrapper.

## MVVM Contract

ViewModels own:

- request lifecycle;
- route params converted into state;
- filters, sort, cursor, locale-dependent query variables;
- derived display data;
- page actions;
- ExplainerDescriptor construction;
- cleanup.

Views own:

- semantic markup;
- rendering observable state;
- forwarding user events to the ViewModel;
- layout composition;
- accessible labels and landmarks.

React components do not own business state with `useState` or fetch data with
`useEffect` directly. The `useViewModel` hook drives setup/mount/unmount.

Derived read models should be MobX computed getters. If JSX reads a value more
than once, if a value combines request data with filters/route params, or if a
value names a business concept, put it behind a computed getter on a ViewModel
or Item ViewModel.

## DataSource Pattern

Non-trivial pages use a DataSource class, following the `revisium-admin`
pattern.

DataSources own:

- generated SDK method calls;
- `ObservableRequest` instances;
- request cancellation and `reset`;
- GraphQL connection extraction into items, `pageInfo`, and `totalCount`;
- transport-level error and abort handling;
- mapping raw operation responses into page-facing data structures.

DataSources do not own:

- JSX labels;
- route navigation decisions;
- UI state such as selected tab or active drawer;
- page-specific display formatting;
- ExplainerDescriptor construction.

Register page DataSources through DI. Use request/transient scope for
page-owned request state. Use singleton scope only for long-lived cross-page
services.

Small bootstrap pages may call `ApiService` directly while scaffolding, but a
page must move API access into a DataSource before its spec status becomes
`Done`.

## List And Item ViewModel Pattern

Catalogs and repeated row/card surfaces should follow this shape:

```text
api/<Page>DataSource.ts          API calls and response extraction
model/<Page>ViewModel.ts         page/list state, filters, actions, item cache
model/<Entity>ItemViewModel.ts   row display getters, links, badges, item actions
ui/<Page>Page/<Page>Page.tsx         page composition
ui/<Entity>List/<Entity>List.tsx     list rendering
ui/<Entity>Item/<Entity>Item.tsx     one row/card
```

Use an Item ViewModel when an item has any of:

- a route or external link;
- formatted labels, badges, chips, or fallback text;
- permission or availability logic;
- copy/open/toggle actions;
- file preview metadata;
- computed/formula labels;
- subgraph or field attribution.

The page/list ViewModel may cache Item ViewModels by stable row id so refreshes
preserve item-level state. Avoid creating ad hoc item objects in JSX.

Small reference catalogs with the same shell, empty/error/loading handling, and
Explainer Widget wiring may use the shared reference catalog helpers:
`ReferenceCatalogViewModelBase` for common request/list lifecycle and the
`ReferenceCatalogItemViewModelBase` for localized item title/description/code
getters, plus the `ReferenceCatalogPage` widget for page composition. Page
slices still own their copy, request variables, response samples, locale
fallback attribution, and row/card components.

## Method Shape And SOLID Rules

Keep methods at one abstraction level.

Good method shape:

- public action validates state and orchestrates one workflow;
- private method builds GraphQL variables;
- private method maps response to item models;
- private method builds links;
- computed getter exposes display state.

Avoid methods that fetch data, parse response trees, build route URLs, mutate
selection state, and format labels in the same block.

Apply these SOLID rules pragmatically:

- Single responsibility: ViewModel, DataSource, Item ViewModel, Service, and
  React component each have one reason to change.
- Open/closed: extend page-specific behavior in the page slice before changing
  shared primitives.
- Liskov/interface segregation: keep shared interfaces small; do not add
  optional feature methods that every page must carry. The shared lifecycle
  `IViewModel` intentionally requires `setup`, `mount`, and `unmount` so
  `useViewModel` can drive all pages uniformly; a lifecycle method may be a
  no-op when a page has no work for that phase.
- Dependency inversion: ViewModels depend on DataSources/services injected by
  DI, not directly on module-level singletons or browser globals.

## Services And Persisted State

Use services for cross-page concerns:

- environment and API clients;
- router/navigation helpers;
- auth/permissions if added;
- file helpers;
- storage-backed preferences;
- long-lived UI state shared across routes.

Image URL derivation is a cross-page concern. When image rendering is
implemented, add a shared image helper/service that converts absolute
Revisium/admin original URLs into slot-sized `imgproxy` URLs according to the
design-system media rules. Page ViewModels or Item ViewModels choose the
semantic slot and dimensions; React components render the prepared URL and
`srcset` but do not build `imgproxy` paths manually. The original file URL may
remain in metadata, source links, and Explainer Widget samples.

Persisted state must go through a service or dedicated state ViewModel. Do not
read/write `localStorage`, `sessionStorage`, cookies, or browser globals inside
React components. Inject browser-backed dependencies so SSR and tests can
replace them.

## React Component Rules

- Components are `observer` when reading observable state.
- Components receive a model and render it; they do not transform raw GraphQL
  responses.
- Event handlers call model actions with already-available UI values.
- One non-trivial React component per file.
- Every non-test component file under `src/**/ui/` lives in a same-named folder,
  for example `ui/RegionCard/RegionCard.tsx`; `ui/RegionCard.tsx` and
  component-folder `index.ts` barrels are not allowed.
- Split `Header`, `Filters`, `List`, `Item`, `Empty`, `Error`, and modal/sheet
  components once they carry meaningful markup or logic.
- Component files should not register DI services or instantiate DataSources.
- Reusable low-level UI components may live in `src/shared/ui/<Component>/<Component>.tsx`
  only after at least two real page/widget consumers use the same behavior.
  Export them from `src/shared/ui/index.ts`; do not add `index.ts` inside the
  component folder itself.
- Shared layout components accept page/widget content as slots. `shared` must
  not import `pages` or `widgets`.

## Data Fetching

- GraphQL documents live in `src/pages/<Page>/api/*.graphql`.
- Run `npm run gql:codegen` after adding or changing operations.
- Use the generated SDK from DataSources or from `ApiService` only in very small
  bootstrap ViewModels.
- Wrap page requests with `ObservableRequest` or an equivalent MobX-owned request model.
- Abort in-flight requests on unmount or route changes when supported.
- Keep previous successful data visible during refresh when possible.

## SSR Requirements

- Route content must render valid shell and headings during SSR.
- Data pages should be designed so their Explainer Widget text can be present in
  initial HTML once loader-backed SSR data is added.
- Avoid client-only layout decisions that change page structure after hydration.
- `isClient` checks are allowed only for browser APIs.

## Explainer Descriptor Ownership

Each page ViewModel exposes:

```ts
public get explainer(): ExplainerDescriptor
```

The descriptor is computed from current request state and page state. The
widget consumes it and renders. The widget never fetches, never reads route
params, and never reaches into DI.

## Error Handling

Map low-level errors into page states:

- Apollo Router unreachable;
- specific subgraph unavailable when detectable;
- schema/query mismatch;
- unsupported filter/sort combination.

Empty result sets and missing rows are normal page states, not transport or
request errors. Model them separately as `Empty` and `Not found`.

Raw error details may be available behind a disclosure, but the default page
state must be readable by a visitor.

## Testing Expectations

Minimum per implemented page:

- ViewModel unit coverage for variables, states, and descriptor construction
  when logic is non-trivial.
- Rendering coverage for loaded, loading, error, and empty states.
- Accessibility smoke checks for keyboard-reachable controls.
- Responsive manual screenshot/audit notes for phone, tablet, desktop until
  automated visual checks exist.

## Quality Commands

Run before PR handoff:

```bash
npm run verify
```
