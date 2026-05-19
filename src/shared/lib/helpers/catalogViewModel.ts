import type { ObservableRequest } from '../ObservableRequest';

export interface CatalogResult<TNode> {
  readonly items: readonly TNode[];
  readonly totalCount: number;
}

export interface CatalogViewState {
  readonly canLoadMore: boolean;
  readonly hasNextPage: boolean;
  readonly showEmpty: boolean;
  readonly showError: boolean;
  readonly showList: boolean;
  readonly showLoading: boolean;
  readonly showRefreshing: boolean;
  readonly totalCount: number;
  readonly visibleCount: number;
}

export interface CatalogViewStateInput {
  readonly hasError: boolean;
  readonly hasNextPage?: boolean;
  readonly isLoaded: boolean;
  readonly isLoading: boolean;
  readonly totalCount: number;
  readonly visibleCount: number;
}

export function createCatalogViewState(input: CatalogViewStateInput): CatalogViewState {
  const showLoading = input.isLoading && !input.isLoaded;
  const showRefreshing = input.isLoading && input.isLoaded;
  const showError = input.hasError;
  const hasNextPage = Boolean(input.hasNextPage);

  return {
    canLoadMore: hasNextPage && !showLoading && !showRefreshing,
    hasNextPage,
    showEmpty: input.isLoaded && input.visibleCount === 0 && !showError,
    showError,
    showList: input.visibleCount > 0,
    showLoading,
    showRefreshing,
    totalCount: input.totalCount,
    visibleCount: input.visibleCount,
  };
}

export function shouldRequestInitialData<Args extends unknown[]>(
  request: ObservableRequest<unknown, Args>,
): boolean {
  return !request.isLoaded && !request.isLoading;
}

export function resetCatalogState<TNode>(
  loadedItems: TNode[],
  itemCache: Map<string, unknown>,
): void {
  loadedItems.length = 0;
  itemCache.clear();
}

export function replaceCatalogItems<TNode>(
  loadedItems: TNode[],
  itemCache: Map<string, unknown>,
  items: readonly TNode[],
): void {
  resetCatalogState(loadedItems, itemCache);
  loadedItems.push(...items);
}

export function totalCatalogCount<TNode, Args extends unknown[]>(
  request: ObservableRequest<CatalogResult<TNode>, Args>,
  loadedItems: readonly TNode[],
): number {
  return request.data?.totalCount ?? loadedItems.length;
}

export function isInitialLoading<Args extends unknown[]>(
  request: ObservableRequest<unknown, Args>,
): boolean {
  return request.isLoading && !request.isLoaded;
}

export function isRefreshing<Args extends unknown[]>(
  request: ObservableRequest<unknown, Args>,
): boolean {
  return request.isLoading && request.isLoaded;
}

export function hasRequestError<Args extends unknown[]>(
  request: ObservableRequest<unknown, Args>,
): boolean {
  return Boolean(request.error);
}
