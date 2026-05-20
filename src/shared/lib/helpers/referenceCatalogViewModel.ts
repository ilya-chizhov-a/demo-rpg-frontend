import { makeAutoObservable } from 'mobx';

import type { Either, ObservableRequest } from '../ObservableRequest';
import {
  createCatalogViewStateFromRequest,
  replaceCatalogItems,
  resetCatalogState,
  shouldRequestInitialData,
  type CatalogResult,
  type CatalogViewState,
} from './catalogViewModel';
import { createLocaleFallbacks, type LocaleFallbackDescriptor } from './localeFallbacks';

export interface ReferenceCatalogRequestOwner<TNode, TArgs extends unknown[]> {
  readonly request: ObservableRequest<CatalogResult<TNode>, TArgs>;
  reset(): void;
}

type FetchReferenceCatalog<TNode> = () => Promise<Either<unknown, CatalogResult<TNode>>>;
type CreateReferenceCatalogItem<TNode, TItem, TLocale extends string, TCopy> = (
  node: TNode,
  getLocale: () => TLocale,
  getCopy: () => TCopy,
) => TItem;

interface ReferenceCatalogLocaleService<TLocale extends string, TSharedCopy> {
  readonly locale: TLocale;
  readonly ui: {
    readonly shared: TSharedCopy;
  };
}

interface ReferenceCatalogNode {
  readonly id: string;
}

type ReferenceCatalogSubgraph = 'backend' | 'cms' | 'data';

export interface ReferenceCatalogLocalizedNode<TLocale extends string> {
  readonly id: string;
  readonly data: {
    readonly description: Record<TLocale, string> & { readonly en: string };
    readonly name: Record<TLocale, string> & { readonly en: string };
  };
}

export interface ReferenceCatalogCodeNode<TLocale extends string>
  extends ReferenceCatalogLocalizedNode<TLocale> {
  readonly data: ReferenceCatalogLocalizedNode<TLocale>['data'] & {
    readonly code: string;
  };
}

interface ReferenceCatalogItemCopy {
  readonly noDescription: string;
}

interface ReferenceCatalogExplainerConfig<TLocale extends string> {
  readonly cloudSchema: string;
  readonly cloudTable: string;
  readonly fieldAttribution: readonly {
    readonly owningSubgraph: ReferenceCatalogSubgraph;
    readonly path: string;
  }[];
  readonly footerNote: string;
  readonly localeFallbacks: readonly LocaleFallbackDescriptor<TLocale>[];
  readonly operationName: string;
  readonly request: string;
  readonly responseSample: Record<string, unknown> | null;
  readonly summary: string;
}

export class ReferenceCatalogState<TNode, TItem, TArgs extends unknown[]> {
  private readonly itemCache = new Map<string, TItem>();
  private readonly loadedItems: TNode[] = [];

  constructor(
    private readonly requestOwner: ReferenceCatalogRequestOwner<TNode, TArgs>,
    private readonly getNodeId: (node: TNode) => string,
    private readonly createItem: (node: TNode) => TItem,
    private readonly fetchCatalog: FetchReferenceCatalog<TNode>,
  ) {
    makeAutoObservable<this, 'createItem' | 'fetchCatalog' | 'getNodeId' | 'requestOwner'>(
      this,
      {
        createItem: false,
        fetchCatalog: false,
        getNodeId: false,
        requestOwner: false,
      },
      { autoBind: true },
    );
  }

  public get items(): readonly TItem[] {
    return this.loadedItems.map((node) => this.getItem(node));
  }

  public get nodes(): readonly TNode[] {
    return this.loadedItems;
  }

  public get viewState(): CatalogViewState {
    return createCatalogViewStateFromRequest(this.requestOwner.request, this.loadedItems);
  }

  public async mountInitial(): Promise<void> {
    if (!shouldRequestInitialData(this.requestOwner.request)) return;
    await this.loadInitial();
  }

  public async loadInitial(): Promise<void> {
    const result = await this.fetchCatalog();
    if (result.ok) {
      replaceCatalogItems(this.loadedItems, this.itemCache, result.value.items);
    }
  }

  public reset(): void {
    this.requestOwner.reset();
    resetCatalogState(this.loadedItems, this.itemCache);
  }

  private getItem(node: TNode): TItem {
    const id = this.getNodeId(node);
    const cached = this.itemCache.get(id);
    if (cached) return cached;

    const item = this.createItem(node);
    this.itemCache.set(id, item);
    return item;
  }
}

export abstract class ReferenceCatalogViewModelBase<
  TNode extends ReferenceCatalogNode,
  TItem,
  TRequestData,
  TCopy,
  TLocale extends string,
  TSharedCopy,
  TLocaleService extends ReferenceCatalogLocaleService<TLocale, TSharedCopy>,
> {
  protected readonly catalog: ReferenceCatalogState<TNode, TItem, [TRequestData]>;

  protected constructor(
    public readonly dataSource: ReferenceCatalogRequestOwner<TNode, [TRequestData]>,
    protected readonly localeService: TLocaleService,
    createItem: CreateReferenceCatalogItem<TNode, TItem, TLocale, TCopy>,
  ) {
    this.catalog = new ReferenceCatalogState(
      dataSource,
      (node) => node.id,
      (node) =>
        createItem(
          node,
          () => this.locale,
          () => this.copy,
        ),
      () => this.dataSource.request.fetch(this.currentRequestData),
    );
  }

  public setup(): void {
    // Reference catalogs in this section do not own route params yet.
  }

  public async mount(): Promise<void> {
    await this.catalog.mountInitial();
  }

  public unmount(): void {
    this.catalog.reset();
  }

  public get items(): readonly TItem[] {
    return this.catalog.items;
  }

  public get viewState(): CatalogViewState {
    return this.catalog.viewState;
  }

  public get locale(): TLocale {
    return this.localeService.locale;
  }

  public get sharedCopy(): TSharedCopy {
    return this.localeService.ui.shared;
  }

  public async retry(): Promise<void> {
    await this.catalog.loadInitial();
  }

  protected get nodes(): readonly TNode[] {
    return this.catalog.nodes;
  }

  protected get pageInfo(): CatalogResult<TNode>['pageInfo'] | null {
    return this.dataSource.request.data?.pageInfo ?? null;
  }

  protected get catalogExplainerVariables(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      locale: this.locale,
      pageInfo: this.pageInfo,
    };
  }

  protected createLocalizedNameRequestData<TField, TSortOrder, TOrderFieldType>(
    first: number,
    field: TField,
    direction: TSortOrder,
    type: TOrderFieldType,
  ): {
    first: number;
    orderBy: {
      direction: TSortOrder;
      field: TField;
      path: string;
      type: TOrderFieldType;
    }[];
  } {
    return {
      first,
      orderBy: [
        {
          direction,
          field,
          path: `name.${this.locale}`,
          type,
        },
      ],
    };
  }

  protected createLocaleFallbackDescriptors(
    entityPath: string,
  ): LocaleFallbackDescriptor<TLocale>[] {
    return this.nodes.flatMap((node) => {
      const localizedNode = node as unknown as ReferenceCatalogLocalizedNode<TLocale>;
      return createLocaleFallbacks(
        this.locale,
        [
          { path: `${entityPath}.${localizedNode.id}.data.name`, value: localizedNode.data.name },
          {
            path: `${entityPath}.${localizedNode.id}.data.description`,
            value: localizedNode.data.description,
          },
        ],
        'en' as TLocale,
      );
    });
  }

  protected createExplainerDescriptor(config: ReferenceCatalogExplainerConfig<TLocale>) {
    return {
      deepLinks: {
        cloudSchema: config.cloudSchema,
        cloudTable: config.cloudTable,
      },
      fieldAttribution: config.fieldAttribution,
      footerNote: config.footerNote,
      localeFallbacks: config.localeFallbacks,
      responseSample: config.responseSample,
      subgraphsInUse: ['data'] as const,
      summary: config.summary,
      surfaces: {
        graphql: {
          operationName: config.operationName,
          request: config.request,
        },
      },
      variables: this.catalogExplainerVariables,
    };
  }

  public abstract get copy(): TCopy;

  protected abstract get currentRequestData(): TRequestData;
}

export function getReferenceCatalogItemTitle<TLocale extends string>(
  node: ReferenceCatalogLocalizedNode<TLocale>,
  locale: TLocale,
): string {
  return getReferenceCatalogLocalizedText(node.data.name, locale) || node.id;
}

export function getReferenceCatalogItemDescription<TLocale extends string>(
  node: ReferenceCatalogLocalizedNode<TLocale>,
  locale: TLocale,
  fallback: string,
): string {
  return getReferenceCatalogLocalizedText(node.data.description, locale) || fallback;
}

export function usesReferenceCatalogLocaleFallback<TLocale extends string>(
  node: ReferenceCatalogLocalizedNode<TLocale>,
  locale: TLocale,
): boolean {
  return !node.data.name[locale] || !node.data.description[locale];
}

export abstract class ReferenceCatalogItemViewModelBase<
  TNode extends ReferenceCatalogCodeNode<TLocale>,
  TLocale extends string,
  TCopy extends ReferenceCatalogItemCopy,
> {
  public readonly itemsHref = '/items';

  protected constructor(
    protected readonly node: TNode,
    private readonly getLocale: () => TLocale,
    private readonly getCopy: () => TCopy,
  ) {}

  public get id(): string {
    return this.node.id;
  }

  public get title(): string {
    return getReferenceCatalogItemTitle(this.node, this.locale);
  }

  public get description(): string {
    return getReferenceCatalogItemDescription(this.node, this.locale, this.copy.noDescription);
  }

  public get code(): string {
    return this.node.data.code;
  }

  public get usesLocaleFallback(): boolean {
    return usesReferenceCatalogLocaleFallback(this.node, this.locale);
  }

  protected get locale(): TLocale {
    return this.getLocale();
  }

  protected get copy(): TCopy {
    return this.getCopy();
  }
}

function getReferenceCatalogLocalizedText<TLocale extends string>(
  value: Record<TLocale, string> & { readonly en: string },
  locale: TLocale,
): string {
  return value[locale] || value.en;
}
