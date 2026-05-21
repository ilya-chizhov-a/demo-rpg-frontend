import { runInAction } from 'mobx';

import {
  Demo_Rpg_DataGetDialogsesOrderByField,
  Demo_Rpg_DataOrderFieldType,
  Demo_Rpg_DataSortOrder,
} from 'src/__generated__/graphql-request';
import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  container,
  createCatalogViewStateFromRequest,
  createLocaleFallbacks,
  makeAutoBoundObservable,
  replaceCatalogItems,
  resetCatalogRequestState,
  shouldRequestInitialData,
  type CatalogViewState,
} from 'src/shared/lib';
import { LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  DialogsDataSource,
  type DialogNode,
  type DialogsRequestData,
} from '../api/DialogsDataSource';
import { DialogItemViewModel } from './DialogItemViewModel';
import { getDialogsPageCopy, type DialogLocale, type DialogsPageCopy } from './dialogsUiCopy';

const DIALOGS_PAGE_SIZE = 24;

// Keep this display string in sync with api/Dialogs.graphql until the widget can import raw GraphQL.
const DIALOGS_QUERY = `query Dialogs($data: Demo_rpg_dataGetDialogsesInput) {
  dialogses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          line_count
          lines { emotion speaker text { en ru zh } }
          npc_id { id data { display_label_en name { en ru zh } role title { en ru zh } } }
          slug
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class DialogsViewModel implements IViewModel {
  private readonly itemCache = new Map<string, DialogItemViewModel>();
  private readonly loadedItems: DialogNode[] = [];

  constructor(
    public readonly dataSource: DialogsDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'itemCache' | 'localeService'>(this, {
      itemCache: false,
      localeService: false,
    });
  }

  public setup(): void {
    // Dialogs has no route params yet.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    resetCatalogRequestState(this.dataSource, this.loadedItems, this.itemCache);
  }

  public get items(): readonly DialogItemViewModel[] {
    return this.loadedItems.map((node) => this.getItemViewModel(node));
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewStateFromRequest(this.dataSource.request, this.loadedItems);
  }

  public get payloadPreview(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      locale: this.locale,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
    };
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/dialogs',
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/dialogs',
      },
      fieldAttribution: [
        { path: 'dialogs.data.slug', owningSubgraph: 'data' },
        { path: 'dialogs.data.npc_id', owningSubgraph: 'data' },
        { path: 'dialogs.data.line_count', owningSubgraph: 'data' },
        { path: 'dialogs.data.lines', owningSubgraph: 'data' },
      ],
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Dialogs',
          request: DIALOGS_QUERY,
        },
      },
      variables: this.payloadPreview,
    };
  }

  public get locale(): DialogLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('quests', '/dialogs', this.localeService.ui.navigation);
  }

  public get copy(): DialogsPageCopy {
    return getDialogsPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    if (!this.catalogState.canLoadMore) return;
    const result = await this.dataSource.request.fetch(this.nextPageRequestData);
    if (result.ok) {
      runInAction(() => {
        this.loadedItems.push(...result.value.items);
      });
    }
  }

  private async loadInitial(): Promise<void> {
    const result = await this.dataSource.request.fetch(this.currentRequestData);
    if (result.ok) {
      runInAction(() => {
        replaceCatalogItems(this.loadedItems, this.itemCache, result.value.items);
      });
    }
  }

  private getItemViewModel(node: DialogNode): DialogItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new DialogItemViewModel(
      node,
      () => this.locale,
      () => this.copy,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get currentRequestData(): DialogsRequestData {
    return {
      first: DIALOGS_PAGE_SIZE,
      orderBy: [
        {
          direction: Demo_Rpg_DataSortOrder.Asc,
          field: Demo_Rpg_DataGetDialogsesOrderByField.Data,
          path: 'slug',
          type: Demo_Rpg_DataOrderFieldType.Text,
        },
      ],
    };
  }

  private get nextPageRequestData(): DialogsRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      edges: this.loadedItems.slice(0, 3).map((node) => ({
        id: node.id,
        lineCount: node.data.line_count,
        lines: node.data.lines.slice(0, 2).map((line) => ({
          emotion: line.emotion,
          speaker: line.speaker,
          text: line.text[this.locale] || line.text.en,
        })),
        speakerNpc: {
          id: node.data.npc_id.id,
          name: node.data.npc_id.data.name[this.locale] || node.data.npc_id.data.name.en,
        },
        slug: node.data.slug,
      })),
      pageInfo: this.dataSource.request.data.pageInfo,
      totalCount: this.catalogState.totalCount,
      visibleCount: this.catalogState.visibleCount,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.loadedItems.flatMap((node) =>
      createLocaleFallbacks(
        this.locale,
        [
          { path: `dialogs.${node.id}.data.npc_id.data.name`, value: node.data.npc_id.data.name },
          { path: `dialogs.${node.id}.data.npc_id.data.title`, value: node.data.npc_id.data.title },
          ...node.data.lines.map((line, index) => ({
            path: `dialogs.${node.id}.data.lines.${index}.text`,
            value: line.text,
          })),
        ],
        'en',
      ),
    );
  }
}

container.register(
  DialogsViewModel,
  () => new DialogsViewModel(container.get(DialogsDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
