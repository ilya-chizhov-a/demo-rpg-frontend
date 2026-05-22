import { ObservableRequest } from '../ObservableRequest';

const GRAPHQL_NOT_FOUND_CODE = 'NOT_FOUND';
const HTTP_NOT_FOUND_STATUS = 404;

export interface NullableGraphQLDetailResult<TItem> {
  readonly item: TItem | null;
}

export function createNullableGraphQLDetailRequest<TResponse, TItem>(
  request: (signal: AbortSignal, id: string) => Promise<TResponse>,
  selectItem: (response: TResponse) => TItem,
): ObservableRequest<NullableGraphQLDetailResult<TItem>, [string]> {
  return ObservableRequest.of(async (signal, id) => ({
    item: await readNullableGraphQLRow(() => request(signal, id), selectItem),
  }));
}

export function hasLoadedNullGraphQLDetail<TItem>(
  request: {
    readonly data: NullableGraphQLDetailResult<TItem> | null;
    readonly isLoaded: boolean;
  },
  id: string,
): boolean {
  return Boolean(id) && request.isLoaded && !request.data?.item;
}

export async function readNullableGraphQLResult<TResult>(
  request: () => Promise<TResult>,
): Promise<TResult | null> {
  try {
    return await request();
  } catch (error) {
    if (isGraphQLNotFoundError(error)) return null;
    throw error;
  }
}

async function readNullableGraphQLRow<TResult, TItem>(
  request: () => Promise<TResult>,
  selectItem: (response: TResult) => TItem,
): Promise<TItem | null> {
  const response = await readNullableGraphQLResult(request);
  return response ? selectItem(response) : null;
}

function isGraphQLNotFoundError(error: unknown): boolean {
  if (!isRecord(error)) return false;

  const response = error.response;
  if (!isRecord(response)) return false;

  const errors = response.errors;
  if (!Array.isArray(errors)) return false;

  return errors.some((item: unknown) => {
    if (!isRecord(item)) return false;
    const extensions = item.extensions;
    if (!isRecord(extensions)) return false;

    return (
      extensions.code === GRAPHQL_NOT_FOUND_CODE ||
      extensions.statusCode === HTTP_NOT_FOUND_STATUS
    );
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object';
}
