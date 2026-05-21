import {
  type Demo_Rpg_DataGetLocationsesInput,
  type Demo_Rpg_DataGetNpcsesInput,
  type Demo_Rpg_DataGetQuestsesInput,
  type QuestLocationOptionsQuery,
  type QuestNpcOptionsQuery,
  type QuestsQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type QuestNode = QuestsQuery['questses']['edges'][number]['node'];
export type QuestLocationOptionNode =
  QuestLocationOptionsQuery['locationses']['edges'][number]['node'];
export type QuestNpcOptionNode = QuestNpcOptionsQuery['npcses']['edges'][number]['node'];
export type QuestsRequestData = Demo_Rpg_DataGetQuestsesInput;
export type QuestLocationsRequestData = Demo_Rpg_DataGetLocationsesInput;
export type QuestNpcsRequestData = Demo_Rpg_DataGetNpcsesInput;

export interface QuestsResult {
  readonly items: readonly QuestNode[];
  readonly locations: readonly QuestLocationOptionNode[];
  readonly npcs: readonly QuestNpcOptionNode[];
  readonly pageInfo: QuestsQuery['questses']['pageInfo'];
  readonly totalCount: number;
}

export class QuestsDataSource {
  public readonly request: ObservableRequest<
    QuestsResult,
    [QuestsRequestData, QuestLocationsRequestData, QuestNpcsRequestData]
  >;
  private locationsCache: readonly QuestLocationOptionNode[] | null = null;
  private locationsCacheKey: string | null = null;
  private npcsCache: readonly QuestNpcOptionNode[] | null = null;
  private npcsCacheKey: string | null = null;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data, locationsData, npcsData) =>
      this.fetchQuests(signal, data, locationsData, npcsData),
    );
  }

  public reset(): void {
    this.request.reset();
    this.locationsCache = null;
    this.locationsCacheKey = null;
    this.npcsCache = null;
    this.npcsCacheKey = null;
  }

  private async fetchQuests(
    signal: AbortSignal,
    data: QuestsRequestData,
    locationsData: QuestLocationsRequestData,
    npcsData: QuestNpcsRequestData,
  ): Promise<QuestsResult> {
    const locationsKey = JSON.stringify(locationsData);
    const npcsKey = JSON.stringify(npcsData);
    const questsPromise = this.api.sdk.Quests({ data }, undefined, signal);
    const cachedLocations = this.locationsCache;
    const cachedNpcs = this.npcsCache;
    const hasMatchingLocationsCache =
      cachedLocations !== null && this.locationsCacheKey === locationsKey;
    const hasMatchingNpcsCache = cachedNpcs !== null && this.npcsCacheKey === npcsKey;
    const locationsPromise = hasMatchingLocationsCache
      ? Promise.resolve(cachedLocations)
      : this.fetchAllLocations(signal, locationsData);
    const npcsPromise = hasMatchingNpcsCache
      ? Promise.resolve(cachedNpcs)
      : this.fetchAllNpcs(signal, npcsData);

    const [questsResponse, locations, npcs] = await Promise.all([
      questsPromise,
      locationsPromise,
      npcsPromise,
    ]);
    this.locationsCache = locations;
    this.locationsCacheKey = locationsKey;
    this.npcsCache = npcs;
    this.npcsCacheKey = npcsKey;
    return this.mapResponse(questsResponse, locations, npcs);
  }

  private async fetchAllLocations(
    signal: AbortSignal,
    data: QuestLocationsRequestData,
  ): Promise<readonly QuestLocationOptionNode[]> {
    const locations: QuestLocationOptionNode[] = [];
    let requestData: QuestLocationsRequestData = data;

    for (;;) {
      const response = await this.api.sdk.QuestLocationOptions({ data: requestData }, undefined, signal);
      locations.push(...response.locationses.edges.map(({ node }) => node));

      if (!response.locationses.pageInfo.hasNextPage) return locations;
      const nextCursor = response.locationses.pageInfo.endCursor;
      if (!nextCursor || nextCursor === requestData.after) return locations;
      requestData = {
        ...data,
        after: nextCursor,
      };
    }
  }

  private async fetchAllNpcs(
    signal: AbortSignal,
    data: QuestNpcsRequestData,
  ): Promise<readonly QuestNpcOptionNode[]> {
    const npcs: QuestNpcOptionNode[] = [];
    let requestData: QuestNpcsRequestData = data;

    for (;;) {
      const response = await this.api.sdk.QuestNpcOptions({ data: requestData }, undefined, signal);
      npcs.push(...response.npcses.edges.map(({ node }) => node));

      if (!response.npcses.pageInfo.hasNextPage) return npcs;
      const nextCursor = response.npcses.pageInfo.endCursor;
      if (!nextCursor || nextCursor === requestData.after) return npcs;
      requestData = {
        ...data,
        after: nextCursor,
      };
    }
  }

  private mapResponse(
    response: QuestsQuery,
    locations: readonly QuestLocationOptionNode[],
    npcs: readonly QuestNpcOptionNode[],
  ): QuestsResult {
    const connection = response.questses;
    return {
      items: connection.edges.map(({ node }) => node),
      locations,
      npcs,
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  QuestsDataSource,
  () => new QuestsDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
