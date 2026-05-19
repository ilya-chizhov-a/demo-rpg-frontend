import type { LocationLocale } from './LocationItemViewModel';
import locationUiCopyData from './locationUiCopy.data.json';

export interface LocationsPageCopy {
  readonly allRegionsButton: string;
  readonly capabilitiesAriaLabel: string;
  readonly cardOpenAction: string;
  readonly coordinateLabel: string;
  readonly detail: {
    readonly backAriaLabel: string;
    readonly backLabel: string;
    readonly datasetLabel: string;
    readonly dimensionsLabel: string;
    readonly errorDescription: string;
    readonly errorTitle: string;
    readonly factsTitle: string;
    readonly fieldCoordinates: string;
    readonly fieldGalleryCount: string;
    readonly fieldKind: string;
    readonly fieldMapDimensions: string;
    readonly fieldMapFile: string;
    readonly fieldMapMimeType: string;
    readonly fieldPublished: string;
    readonly fieldRegion: string;
    readonly fieldVersion: string;
    readonly fileNameLabel: string;
    readonly galleryEmptyDescription: string;
    readonly galleryEmptyTitle: string;
    readonly galleryItemLabel: (index: number) => string;
    readonly galleryTitle: string;
    readonly hashLabel: string;
    readonly localeLabel: string;
    readonly mimeTypeLabel: string;
    readonly noDescription: string;
    readonly openRegionAction: string;
    readonly unknownValue: string;
  };
  readonly detailExplainerFooterNote: string;
  readonly detailExplainerSummary: string;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly galleryCountLabel: (count: number) => string;
  readonly galleryEmptyPreviewLabel: string;
  readonly galleryLabel: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly mapPlaceholderDescription: (locationTitle: string) => string;
  readonly mapPlaceholderTitle: string;
  readonly noDescription: string;
  readonly publishedLabel: string;
  readonly regionButtonsAriaLabel: string;
  readonly regionLabel: string;
  readonly resetFiltersActionLabel: string;
  readonly retryActionLabel: string;
  readonly showMoreActionLabel: string;
  readonly versionLabel: string;
  readonly worldSectionAriaLabel: string;
}

export const fallbackLocale: LocationLocale = 'en';

interface GalleryCountCopyData {
  readonly few?: string;
  readonly many?: string;
  readonly one?: string;
  readonly other?: string;
}

type LocationsDetailCopyData = Omit<LocationsPageCopy['detail'], 'galleryItemLabel'> & {
  readonly galleryItemLabelTemplate: string;
};

type LocationsPageCopyData = Omit<
  LocationsPageCopy,
  'detail' | 'galleryCountLabel' | 'mapPlaceholderDescription'
> & {
  readonly detail: LocationsDetailCopyData;
  readonly galleryCount: GalleryCountCopyData;
  readonly mapPlaceholderDescriptionTemplate: string;
};

interface LocationUiCopyData {
  readonly locationKindLabelsByLocale: Record<LocationLocale, Record<string, string>>;
  readonly locationsPageCopy: Record<LocationLocale, LocationsPageCopyData>;
}

const locationUiData = locationUiCopyData as LocationUiCopyData;

const locationsPageCopy = Object.fromEntries(
  Object.entries(locationUiData.locationsPageCopy).map(([locale, copy]) => {
    const copyLocale = locale as LocationLocale;
    const {
      detail,
      galleryCount,
      mapPlaceholderDescriptionTemplate,
      ...pageCopy
    } = copy;
    const { galleryItemLabelTemplate, ...detailCopy } = detail;

    return [
      locale,
      {
        ...pageCopy,
        detail: {
          ...detailCopy,
          galleryItemLabel: (index: number) =>
            galleryItemLabelTemplate.replaceAll('{index}', String(index + 1)),
        },
        galleryCountLabel: (count: number) => formatGalleryCount(copyLocale, count, galleryCount),
        mapPlaceholderDescription: (locationTitle: string) =>
          mapPlaceholderDescriptionTemplate.replaceAll('{locationTitle}', locationTitle),
      },
    ];
  }),
) as Record<LocationLocale, LocationsPageCopy>;

const locationKindLabelsByLocale = locationUiData.locationKindLabelsByLocale;

export function getLocationsPageCopy(locale: LocationLocale): LocationsPageCopy {
  return locationsPageCopy[locale] ?? locationsPageCopy[fallbackLocale];
}

export function getLocationKindLabel(locale: LocationLocale, kind: string): string {
  return (
    locationKindLabelsByLocale[locale]?.[kind] ??
    locationKindLabelsByLocale[fallbackLocale][kind] ??
    kind
  );
}

function formatGalleryCount(
  locale: LocationLocale,
  count: number,
  copy: GalleryCountCopyData,
): string {
  const template =
    locale === 'ru'
      ? getRussianGalleryCountTemplate(count, copy)
      : getDefaultCountTemplate(count, copy);

  return template.replaceAll('{count}', String(count));
}

function getDefaultCountTemplate(count: number, copy: GalleryCountCopyData): string {
  if (count === 1 && copy.one) return copy.one;
  return copy.other ?? copy.many ?? copy.one ?? '{count}';
}

function getRussianGalleryCountTemplate(count: number, copy: GalleryCountCopyData): string {
  const absolute = Math.abs(count);
  const lastTwoDigits = absolute % 100;
  const lastDigit = absolute % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return copy.many ?? copy.other ?? '{count}';
  }
  if (lastDigit === 1) {
    return copy.one ?? copy.many ?? '{count}';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return copy.few ?? copy.many ?? '{count}';
  }
  return copy.many ?? copy.other ?? '{count}';
}
