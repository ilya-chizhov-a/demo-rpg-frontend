import type { NpcLocale } from './NpcItemViewModel';
import npcUiCopyData from './npcUiCopy.data.json';

export interface NpcsPageCopy {
  readonly allLocationsButton: string;
  readonly capabilitiesAriaLabel: string;
  readonly cardOpenAction: string;
  readonly detail: NpcDetailCopy;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly heroesSectionAriaLabel: string;
  readonly locationButtonsAriaLabel: string;
  readonly locationLabel: string;
  readonly locationKindValueLabel: (value: string) => string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly noDescription: string;
  readonly npcsSectionAriaLabel: string;
  readonly portraitPlaceholderDescription: (npcTitle: string) => string;
  readonly portraitPlaceholderTitle: string;
  readonly resetFiltersActionLabel: string;
  readonly retryActionLabel: string;
  readonly roleLabel: (value: string) => string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly showMoreActionLabel: string;
}

export interface NpcDetailCopy {
  readonly backAriaLabel: string;
  readonly backLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly factsTitle: string;
  readonly fieldLocation: string;
  readonly fieldLocale: string;
  readonly fieldPortraitDimensions: string;
  readonly fieldPortraitFile: string;
  readonly fieldPortraitMimeType: string;
  readonly fieldPublished: string;
  readonly fieldRole: string;
  readonly fieldVersion: string;
  readonly locationKindLabel: string;
  readonly locationTitle: string;
  readonly noDescription: string;
  readonly openLocationAction: string;
  readonly portraitMetadataTitle: string;
  readonly unknownValue: string;
}

const fallbackLocale: NpcLocale = 'en';

type NpcsPageCopyData = Omit<
  NpcsPageCopy,
  'locationKindValueLabel' | 'portraitPlaceholderDescription' | 'roleLabel'
> & {
  readonly portraitPlaceholderDescriptionTemplate: string;
};

interface NpcUiCopyData {
  readonly locationKindLabels: Record<string, Record<NpcLocale, string>>;
  readonly npcRoleLabels: Record<string, Record<NpcLocale, string>>;
  readonly npcsPageCopy: Record<NpcLocale, NpcsPageCopyData>;
}

const npcUiData = npcUiCopyData as NpcUiCopyData;

const npcsPageCopy = Object.fromEntries(
  Object.entries(npcUiData.npcsPageCopy).map(([locale, copy]) => {
    const copyLocale = locale as NpcLocale;
    const { portraitPlaceholderDescriptionTemplate, ...pageCopy } = copy;

    return [
      locale,
      {
        ...pageCopy,
        locationKindValueLabel: (value: string) => getLocationKindLabel(value, copyLocale),
        portraitPlaceholderDescription: (npcTitle: string) =>
          portraitPlaceholderDescriptionTemplate.replaceAll('{npcTitle}', npcTitle),
        roleLabel: (value: string) => getNpcRoleLabel(value, copyLocale),
      },
    ];
  }),
) as Record<NpcLocale, NpcsPageCopy>;

const locationKindLabels = npcUiData.locationKindLabels;
const npcRoleLabels = npcUiData.npcRoleLabels;

export function getNpcsPageCopy(locale: NpcLocale): NpcsPageCopy {
  return npcsPageCopy[locale] ?? npcsPageCopy[fallbackLocale];
}

function getNpcRoleLabel(value: string, locale: NpcLocale): string {
  const labels = npcRoleLabels[value];
  return labels?.[locale] ?? labels?.[fallbackLocale] ?? value;
}

function getLocationKindLabel(value: string, locale: NpcLocale): string {
  const labels = locationKindLabels[value];
  return labels?.[locale] ?? labels?.[fallbackLocale] ?? value;
}
