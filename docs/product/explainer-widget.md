# Explainer Widget

The Explainer Widget is a product feature. It turns each page into a live
Revisium example by showing what the page requested, what came back, which
subgraph owns each field, and where the source data lives.

The product-level evidence contract lives in
`https://github.com/revisium/demo-rpg-docs/blob/master/product.md#explainer-evidence`.
This file is the frontend implementation contract.

## Required On

| Page family | Required |
|---|---|
| Catalog pages | Yes |
| Detail pages | Yes |
| Search | Yes |
| Balance patch | Yes |
| Blog and news | Yes |
| Home | Required only for live CMS/data sections |
| Error pages | No |

## Descriptor Contract

Each page ViewModel exposes a computed `explainer` descriptor. The widget is
presentational and must not fetch data or access DI services.

```ts
interface ExplainerDescriptor {
  summary: string;
  surfaces: {
    graphql: GraphQLSurface;
    rest?: RestSurface;
    mcp?: McpSurface;
  };
  variables: Record<string, unknown>;
  responseSample: unknown | null;
  subgraphsInUse: ReadonlyArray<'data' | 'cms' | 'backend'>;
  fieldAttribution?: ReadonlyArray<{
    path: string;
    owningSubgraph: 'data' | 'cms' | 'backend';
  }>;
  localeFallbacks?: ReadonlyArray<{
    path: string;
    requestedLocale: 'en' | 'ru' | 'zh';
    renderedLocale: 'en' | 'ru' | 'zh';
  }>;
  deepLinks: {
    cloudTable: string;
    cloudSchema: string;
    cloudRow?: string;
    openApi?: string;
    mcpTool?: string;
    federationSdlSource?: string;
  };
  federation?: {
    sdlExcerpt: string;
    summary: string;
  };
}
```

## UI Blocks

| Block | Requirement |
|---|---|
| Trigger | Compact floating Revisium control that is visible without occupying page layout space. |
| Header | Visually distinct Revisium reference header with "How this uses Revisium" label plus subgraph chips inside the expanded panel. |
| Summary | One plain sentence explaining the page capability. |
| Surface tabs | GraphQL always; REST/MCP only when equivalents exist. |
| Request panel | Verbatim request for selected surface. |
| Variables panel | JSON derived from current filters, sort, cursor, locale, row id, or revision. |
| Response sample | Latest successful response, capped for readability but expandable. |
| Deep links | Cloud table/schema and row where applicable; REST/MCP/federation links when applicable. |
| Federation disclosure | Required when `fieldAttribution` has more than one subgraph. |
| Footer note | Public-read and same-origin request note. |

## Responsive Behaviour

- Phone/tablet/desktop: collapsed floating trigger on first paint; the expanded
  panel overlays the page from the lower-right area without reserving a layout
  column.
- Expanded panel max width `420px`, max height constrained to the viewport, and
  internal scrolling for long technical content.
- The widget surface must be visually distinct from ordinary site cards: use a
  Revisium reference header, source-oriented color treatment, and a visible
  external source-links block.
- Technical panels for GraphQL, REST, MCP, variables, response sample, and SDL
  excerpts stay collapsed by default on every breakpoint. The summary, subgraph
  chips, and source links remain visible without expanding technical details.

## Accessibility

- Use `<section aria-labelledby="explainer-heading">`.
- Tabs follow ARIA tabs pattern.
- Phone accordion uses a real `<button>` with `aria-expanded`.
- Code and JSON panels are keyboard-scrollable.
- Copy actions announce success or failure through `aria-live`.
- Subgraph chips carry readable text; color is never the only signal.

## Implementation Constraints

- Place the shared component under `src/widgets/explainer-widget/` once at
  least two implemented pages consume the same widget contract.
- Place shared descriptor types in the widget public API or `src/shared/config`
  only if multiple widgets/pages need them.
- Do not import page slices into the widget.
- Do not introduce Apollo Client or a second GraphQL runtime.
- Syntax highlighting should be lazy-loaded if it risks entry bundle size.
- The response sample must be real data from the page request, not a static mock.
