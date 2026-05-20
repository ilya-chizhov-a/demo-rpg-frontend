import {
  Demo_Rpg_DataGetEffectsesOrderByField,
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
  EffectsDataSource,
  type EffectNode,
  type EffectsRequestData,
} from '../api/EffectsDataSource';
import { EffectItemViewModel, type EffectLocale } from './EffectItemViewModel';
import { getEffectsPageCopy, type EffectsPageCopy } from './effectsUiCopy';

const EFFECTS_PAGE_SIZE = 100;

// Keep this display string in sync with api/Effects.graphql until the widget can import raw GraphQL.
const EFFECTS_QUERY = `query Effects($data: Demo_rpg_dataGetEffectsesInput) {
  effectses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          code
          default_duration
          description { en ru zh }
          kind
          name { en ru zh }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class EffectsViewModel
  extends ReferenceCatalogViewModelBase<
    EffectNode,
    EffectItemViewModel,
    EffectsRequestData,
    EffectsPageCopy,
    EffectLocale,
    UiCopy['shared'],
    LocaleService
  >
  implements IViewModel
{
  constructor(dataSource: EffectsDataSource, localeService: LocaleService) {
    super(
      dataSource,
      localeService,
      (node, getLocale, getCopy) =>
        new EffectItemViewModel(
          node,
          getLocale,
          getCopy,
        ),
    );
  }

  public get explainer(): ExplainerDescriptor {
    return this.createExplainerDescriptor({
      cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/effects',
      cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/effects',
      fieldAttribution: [
        { path: 'effects.data.name', owningSubgraph: 'data' },
        { path: 'effects.data.description', owningSubgraph: 'data' },
        { path: 'effects.data.code', owningSubgraph: 'data' },
        { path: 'effects.data.kind', owningSubgraph: 'data' },
        { path: 'effects.data.default_duration', owningSubgraph: 'data' },
      ],
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.createLocaleFallbackDescriptors('effects'),
      operationName: 'Effects',
      request: EFFECTS_QUERY,
      responseSample: this.responseSample,
      summary: this.copy.explainerSummary,
    });
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('items', '/effects', this.localeService.ui.navigation);
  }

  public get copy(): EffectsPageCopy {
    return getEffectsPageCopy(this.locale);
  }

  protected get currentRequestData(): EffectsRequestData {
    return this.createLocalizedNameRequestData(
      EFFECTS_PAGE_SIZE,
      Demo_Rpg_DataGetEffectsesOrderByField.Data,
      Demo_Rpg_DataSortOrder.Asc,
      Demo_Rpg_DataOrderFieldType.Text,
    );
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      items: this.items.slice(0, 4).map((item) => ({
        code: item.code,
        defaultDuration: item.defaultDurationLabel,
        id: item.id,
        kind: item.kind,
        name: item.title,
      })),
      pageInfo: this.dataSource.request.data.pageInfo,
      totalCount: this.viewState.totalCount,
    };
  }
}

container.register(
  EffectsViewModel,
  () => new EffectsViewModel(container.get(EffectsDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
