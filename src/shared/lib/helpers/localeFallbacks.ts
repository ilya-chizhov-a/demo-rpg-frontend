export interface LocaleFallbackRecord<TLocale extends string> {
  readonly path: string;
  readonly value?: Partial<Record<TLocale, string>> | null;
}

export interface LocaleFallbackDescriptor<TLocale extends string> {
  readonly path: string;
  readonly renderedLocale: TLocale;
  readonly requestedLocale: TLocale;
}

export function createLocaleFallbacks<TLocale extends string>(
  locale: TLocale,
  records: readonly LocaleFallbackRecord<TLocale>[],
  fallbackLocale: TLocale,
): LocaleFallbackDescriptor<TLocale>[] {
  return records.flatMap((record) =>
    record.value?.[locale]
      ? []
      : [
          {
            path: record.path,
            renderedLocale: fallbackLocale,
            requestedLocale: locale,
          },
        ],
  );
}
