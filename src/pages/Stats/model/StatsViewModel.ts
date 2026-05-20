import {
  Demo_Rpg_DataGetStatsesOrderByField,
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
import { StatsDataSource, type StatNode, type StatsRequestData } from '../api/StatsDataSource';
import { StatItemViewModel, type StatLocale } from './StatItemViewModel';
import { getStatsPageCopy, type StatsPageCopy } from './statsUiCopy';

const STATS_PAGE_SIZE = 100;

// Keep this display string in sync with api/Stats.graphql until the widget can import raw GraphQL.
const STATS_QUERY = `query Stats($data: Demo_rpg_dataGetStatsesInput) {
  statses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          abbreviation
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

export class StatsViewModel
  extends ReferenceCatalogViewModelBase<
    StatNode,
    StatItemViewModel,
    StatsRequestData,
    StatsPageCopy,
    StatLocale,
    UiCopy['shared'],
    LocaleService
  >
  implements IViewModel
{
  constructor(dataSource: StatsDataSource, localeService: LocaleService) {
    super(
      dataSource,
      localeService,
      (node, getLocale, getCopy) =>
        new StatItemViewModel(
          node,
          getLocale,
          getCopy,
        ),
    );
  }

  public get explainer(): ExplainerDescriptor {
    return this.createExplainerDescriptor({
      cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/stats',
      cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/stats',
      fieldAttribution: [
        { path: 'stats.data.name', owningSubgraph: 'data' },
        { path: 'stats.data.description', owningSubgraph: 'data' },
        { path: 'stats.data.code', owningSubgraph: 'data' },
        { path: 'stats.data.abbreviation', owningSubgraph: 'data' },
      ],
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.createLocaleFallbackDescriptors('stats'),
      operationName: 'Stats',
      request: STATS_QUERY,
      responseSample: this.responseSample,
      summary: this.copy.explainerSummary,
    });
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('items', '/stats', this.localeService.ui.navigation);
  }

  public get copy(): StatsPageCopy {
    return getStatsPageCopy(this.locale);
  }

  protected get currentRequestData(): StatsRequestData {
    return this.createLocalizedNameRequestData(
      STATS_PAGE_SIZE,
      Demo_Rpg_DataGetStatsesOrderByField.Data,
      Demo_Rpg_DataSortOrder.Asc,
      Demo_Rpg_DataOrderFieldType.Text,
    );
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      items: this.nodes.slice(0, 4).map((node) => ({
        abbreviation: node.data.abbreviation,
        code: node.data.code,
        id: node.id,
        name: node.data.name,
        valueFormat: this.copy.valueFormatSignedModifierLabel,
      })),
      pageInfo: this.dataSource.request.data.pageInfo,
      totalCount: this.viewState.totalCount,
    };
  }
}

container.register(
  StatsViewModel,
  () => new StatsViewModel(container.get(StatsDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
