import {
  type Demo_Rpg_DataGetFactionsesInput,
  type Demo_Rpg_DataGetMonstersesInput,
  type MonsterFactionOptionsQuery,
  type MonstersQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type MonsterNode = MonstersQuery['monsterses']['edges'][number]['node'];
export type MonsterFactionOptionNode =
  MonsterFactionOptionsQuery['factionses']['edges'][number]['node'];
export type MonstersRequestData = Demo_Rpg_DataGetMonstersesInput;
export type MonsterFactionsRequestData = Demo_Rpg_DataGetFactionsesInput;

export interface MonstersResult {
  readonly factions: readonly MonsterFactionOptionNode[];
  readonly items: readonly MonsterNode[];
  readonly pageInfo: MonstersQuery['monsterses']['pageInfo'];
  readonly totalCount: number;
}

export class MonstersDataSource {
  public readonly request: ObservableRequest<
    MonstersResult,
    [MonstersRequestData, MonsterFactionsRequestData]
  >;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data, factionsData) =>
      this.fetchMonsters(signal, data, factionsData),
    );
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchMonsters(
    signal: AbortSignal,
    data: MonstersRequestData,
    factionsData: MonsterFactionsRequestData,
  ): Promise<MonstersResult> {
    const [monstersResponse, factions] = await Promise.all([
      this.api.sdk.Monsters({ data }, undefined, signal),
      this.fetchAllFactions(signal, factionsData),
    ]);
    return this.mapResponse(monstersResponse, factions);
  }

  private async fetchAllFactions(
    signal: AbortSignal,
    data: MonsterFactionsRequestData,
  ): Promise<readonly MonsterFactionOptionNode[]> {
    const factions: MonsterFactionOptionNode[] = [];
    let requestData: MonsterFactionsRequestData = data;

    for (;;) {
      const response = await this.api.sdk.MonsterFactionOptions(
        { data: requestData },
        undefined,
        signal,
      );
      factions.push(...response.factionses.edges.map(({ node }) => node));

      if (!response.factionses.pageInfo.hasNextPage) return factions;
      const nextCursor = response.factionses.pageInfo.endCursor;
      if (!nextCursor || nextCursor === requestData.after) return factions;
      requestData = {
        ...data,
        after: nextCursor,
      };
    }
  }

  private mapResponse(
    response: MonstersQuery,
    factions: readonly MonsterFactionOptionNode[],
  ): MonstersResult {
    const connection = response.monsterses;
    return {
      factions,
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  MonstersDataSource,
  () => new MonstersDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
