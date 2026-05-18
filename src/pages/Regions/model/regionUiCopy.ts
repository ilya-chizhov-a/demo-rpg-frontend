import type { RegionLocale } from './RegionItemViewModel';
import regionUiCopyData from './regionUiCopy.data.json';

interface RegionCoverPlaceholderCopy {
  readonly title: string;
  readonly description: (regionTitle: string) => string;
}

export interface RegionsPageCopy {
  readonly activeFilterLabel: (activeClimate: string | null) => string;
  readonly allClimateButton: string;
  readonly cardOpenAction: string;
  readonly capabilitiesAriaLabel: string;
  readonly climateButtonsAriaLabel: string;
  readonly detail: {
    readonly backAriaLabel: string;
    readonly backLabel: string;
    readonly backendPending: string;
    readonly communityBadge: string;
    readonly communityDescription: string;
    readonly communityTitle: string;
    readonly errorDescription: string;
    readonly errorTitle: string;
    readonly factsTitle: string;
    readonly fieldClimate: string;
    readonly fieldPublished: string;
    readonly fieldRegionId: string;
    readonly fieldVersion: string;
    readonly localeLabel: string;
    readonly noDescription: string;
  };
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly filterLabel: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly noDescription: string;
  readonly publishedLabel: string;
  readonly regionDetailExplainerFooterNote: string;
  readonly regionDetailExplainerSummary: string;
  readonly retryActionLabel: string;
  readonly showMoreActionLabel: string;
  readonly versionLabel: string;
  readonly worldSectionAriaLabel: string;
}

const fallbackLocale: RegionLocale = 'en';

interface RegionCoverPlaceholderCopyData {
  readonly title: string;
  readonly descriptionTemplate: string;
}

type RegionsPageCopyData = Omit<RegionsPageCopy, 'activeFilterLabel'> & {
  readonly activeFilterFallback: string;
};

interface RegionUiCopyData {
  readonly regionCoverPlaceholderCopy: Record<RegionLocale, RegionCoverPlaceholderCopyData>;
  readonly regionsPageCopy: Record<RegionLocale, RegionsPageCopyData>;
}

const regionUiData = regionUiCopyData as RegionUiCopyData;

const regionCoverPlaceholderCopy = Object.fromEntries(
  Object.entries(regionUiData.regionCoverPlaceholderCopy).map(([locale, copy]) => [
    locale,
    {
      title: copy.title,
      description: (regionTitle: string) =>
        copy.descriptionTemplate.replaceAll('{regionTitle}', regionTitle),
    },
  ]),
) as Record<RegionLocale, RegionCoverPlaceholderCopy>;

const regionsPageCopy = Object.fromEntries(
  Object.entries(regionUiData.regionsPageCopy).map(([locale, copy]) => {
    const { activeFilterFallback, ...pageCopy } = copy;

    return [
      locale,
      {
        ...pageCopy,
        activeFilterLabel: (activeClimate: string | null) =>
          activeClimate ?? activeFilterFallback,
      },
    ];
  }),
) as Record<RegionLocale, RegionsPageCopy>;

export function getRegionCoverPlaceholderTitle(locale: RegionLocale): string {
  return getRegionCoverPlaceholderCopy(locale).title;
}

export function getRegionCoverPlaceholderDescription(
  locale: RegionLocale,
  regionTitle: string,
): string {
  return getRegionCoverPlaceholderCopy(locale).description(regionTitle);
}

export function getRegionsPageCopy(locale: RegionLocale): RegionsPageCopy {
  return regionsPageCopy[locale] ?? regionsPageCopy[fallbackLocale];
}

function getRegionCoverPlaceholderCopy(locale: RegionLocale): RegionCoverPlaceholderCopy {
  return regionCoverPlaceholderCopy[locale] ?? regionCoverPlaceholderCopy[fallbackLocale];
}
