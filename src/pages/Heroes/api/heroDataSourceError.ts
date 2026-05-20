export function createHeroDataSourceError(context: string, error: unknown): Error {
  if (error instanceof Error) {
    return new Error(`${context}: ${error.message}`, { cause: error });
  }
  return new Error(context, { cause: error });
}
