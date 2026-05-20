import {
  Demo_Rpg_DataGetItem_TypesesOrderByField,
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
  ReferenceCatalogViewModelBase,
} from 'src/shared/lib';
import { LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  ItemTypesDataSource,
  type ItemTypeNode,
  type ItemTypesRequestData,
} from '../api/ItemTypesDataSource';
import { ItemTypeItemViewModel, type ItemTypeLocale } from './ItemTypeItemViewModel';
import { getItemTypesPageCopy, type ItemTypesPageCopy } from './itemTypesUiCopy';

const ITEM_TYPES_PAGE_SIZE = 100;

// Keep this display string in sync with api/ItemTypes.graphql until the widget can import raw GraphQL.
const ITEM_TYPES_QUERY = `query ItemTypes($data: Demo_rpg_dataGetItem_typesesInput) {
  item_typeses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          code
          description { en ru zh }
          name { en ru zh }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class ItemTypesViewModel
  extends ReferenceCatalogViewModelBase<
    ItemTypeNode,
    ItemTypeItemViewModel,
    ItemTypesRequestData,
    ItemTypesPageCopy,
    ItemTypeLocale,
    UiCopy['shared'],
    LocaleService
  >
  implements IViewModel
{
  constructor(dataSource: ItemTypesDataSource, localeService: LocaleService) {
    super(
      dataSource,
      localeService,
      (node, getLocale, getCopy) =>
        new ItemTypeItemViewModel(
          node,
          getLocale,
          getCopy,
        ),
    );
  }

  public get explainer(): ExplainerDescriptor {
    return this.createExplainerDescriptor({
      cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/item_types',
      cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/item_types',
      fieldAttribution: [
        { path: 'item_types.data.name', owningSubgraph: 'data' },
        { path: 'item_types.data.description', owningSubgraph: 'data' },
        { path: 'item_types.data.code', owningSubgraph: 'data' },
      ],
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.createLocaleFallbackDescriptors('item_types'),
      operationName: 'ItemTypes',
      request: ITEM_TYPES_QUERY,
      responseSample: this.responseSample,
      summary: this.copy.explainerSummary,
    });
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('items', '/item-types', this.localeService.ui.navigation);
  }

  public get copy(): ItemTypesPageCopy {
    return getItemTypesPageCopy(this.locale);
  }

  protected get currentRequestData(): ItemTypesRequestData {
    return this.createLocalizedNameRequestData(
      ITEM_TYPES_PAGE_SIZE,
      Demo_Rpg_DataGetItem_TypesesOrderByField.Data,
      Demo_Rpg_DataSortOrder.Asc,
      Demo_Rpg_DataOrderFieldType.Text,
    );
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      items: this.nodes.slice(0, 4).map((node) => ({
        code: node.data.code,
        id: node.id,
        itemsCount: null,
        name: node.data.name,
      })),
      pageInfo: this.dataSource.request.data.pageInfo,
      totalCount: this.viewState.totalCount,
    };
  }
}

container.register(
  ItemTypesViewModel,
  () =>
    new ItemTypesViewModel(container.get(ItemTypesDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
