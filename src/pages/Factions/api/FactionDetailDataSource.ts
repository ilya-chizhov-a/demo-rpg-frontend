import {
  type Demo_Rpg_DataGetMonstersesInput,
  type Demo_Rpg_DataGetNpcsesInput,
  type FactionDetailQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';
import { createFactionDataSourceError } from './factionDataSourceError';

export type FactionDetailNode = FactionDetailQuery['factions'];
export type FactionDetailMonsterNode =
  FactionDetailQuery['monsterses']['edges'][number]['node'];
export type FactionDetailNpcNode = FactionDetailQuery['npcses']['edges'][number]['node'];
export type FactionDetailPageInfo = FactionDetailQuery['monsterses']['pageInfo'];
export type FactionDetailMonstersRequestData = Demo_Rpg_DataGetMonstersesInput;
export type FactionDetailNpcsRequestData = Demo_Rpg_DataGetNpcsesInput;

export interface FactionDetailResult {
  readonly item: FactionDetailNode;
  readonly monsters: readonly FactionDetailMonsterNode[];
  readonly monstersPageInfo: FactionDetailPageInfo;
  readonly monstersTotalCount: number;
  readonly npcs: readonly FactionDetailNpcNode[];
  readonly npcsPageInfo: FactionDetailPageInfo;
  readonly npcsTotalCount: number;
}

export class FactionDetailDataSource {
  public readonly request: ObservableRequest<
    FactionDetailResult,
    [string, FactionDetailMonstersRequestData, FactionDetailNpcsRequestData]
  >;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, id, monstersData, npcsData) =>
      this.fetchFaction(signal, id, monstersData, npcsData),
    );
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchFaction(
    signal: AbortSignal,
    id: string,
    monstersData: FactionDetailMonstersRequestData,
    npcsData: FactionDetailNpcsRequestData,
  ): Promise<FactionDetailResult> {
    try {
      const response = await this.api.sdk.FactionDetail(
        { id, monstersData, npcsData },
        undefined,
        signal,
      );
      return this.mapResponse(response);
    } catch (error) {
      throw createFactionDataSourceError('Failed to load faction detail', error);
    }
  }

  private mapResponse(response: FactionDetailQuery): FactionDetailResult {
    return {
      item: response.factions,
      monsters: response.monsterses.edges.map(({ node }) => node),
      monstersPageInfo: response.monsterses.pageInfo,
      monstersTotalCount: response.monsterses.totalCount,
      npcs: response.npcses.edges.map(({ node }) => node),
      npcsPageInfo: response.npcses.pageInfo,
      npcsTotalCount: response.npcses.totalCount,
    };
  }
}

container.register(
  FactionDetailDataSource,
  () => new FactionDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
