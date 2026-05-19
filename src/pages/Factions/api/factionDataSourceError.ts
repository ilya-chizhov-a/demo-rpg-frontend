export function createFactionDataSourceError(context: string, error: unknown): Error {
  if (error instanceof Error) {
    return new Error(`${context}: ${error.message}`);
  }
  return new Error(context);
}
