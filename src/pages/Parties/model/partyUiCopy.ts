import type { PartyLocale } from './PartyItemViewModel';
import partyUiCopyData from './partyUiCopy.data.json';

export type PartyFullFilter = 'all' | 'open' | 'full';

export interface PartiesPageCopy {
  readonly capabilitiesAriaLabel: string;
  readonly cardOpenAction: string;
  readonly detail: PartyDetailCopy;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly filterButtonsAriaLabel: string;
  readonly filterLabel: string;
  readonly formationLabel: (value: string) => string;
  readonly fullStateLabel: (isFull: boolean) => string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly heroesSectionAriaLabel: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly memberCountLabel: (count: number) => string;
  readonly membersLabel: string;
  readonly noMotto: string;
  readonly resetFiltersActionLabel: string;
  readonly retryActionLabel: string;
  readonly showMoreActionLabel: string;
  readonly statusLabel: string;
  readonly unknownHeroLabel: string;
}

export interface PartyDetailCopy {
  readonly backAriaLabel: string;
  readonly backLabel: string;
  readonly classLabel: string;
  readonly emptyMembersDescription: string;
  readonly emptyMembersTitle: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly factsTitle: string;
  readonly fieldFormation: string;
  readonly fieldLocale: string;
  readonly fieldMemberCount: string;
  readonly fieldPublished: string;
  readonly fieldStatus: string;
  readonly fieldVersion: string;
  readonly formulasTitle: string;
  readonly heroVeteranBadge: string;
  readonly levelLabel: string;
  readonly membersTitle: string;
  readonly notFoundDescription: string;
  readonly notFoundTitle: string;
  readonly openHeroAction: string;
  readonly unknownValue: string;
}

const fallbackLocale: PartyLocale = 'en';

interface CountCopyData {
  readonly few?: string;
  readonly many?: string;
  readonly one?: string;
  readonly other?: string;
}

interface FullStateCopyData {
  readonly full: string;
  readonly open: string;
}

type PartiesPageCopyData = Omit<
  PartiesPageCopy,
  'formationLabel' | 'fullStateLabel' | 'memberCountLabel'
> & {
  readonly fullStateLabels: FullStateCopyData;
  readonly memberCount: CountCopyData;
};

interface PartyUiCopyData {
  readonly partiesPageCopy: Record<PartyLocale, PartiesPageCopyData>;
  readonly partyFormationLabels: Record<string, Record<PartyLocale, string>>;
  readonly partyFullFilterLabels: Record<PartyFullFilter, Record<PartyLocale, string>>;
}

const partyUiData = partyUiCopyData as PartyUiCopyData;

const partiesPageCopy = Object.fromEntries(
  Object.entries(partyUiData.partiesPageCopy).map(([locale, copy]) => {
    const copyLocale = locale as PartyLocale;
    const { fullStateLabels, memberCount, ...pageCopy } = copy;

    return [
      locale,
      {
        ...pageCopy,
        formationLabel: (value: string) => getPartyFormationLabel(value, copyLocale),
        fullStateLabel: (isFull: boolean) =>
          isFull ? fullStateLabels.full : fullStateLabels.open,
        memberCountLabel: (count: number) =>
          formatMemberCount(copyLocale, count, memberCount),
      },
    ];
  }),
) as Record<PartyLocale, PartiesPageCopy>;

const partyFormationLabels = partyUiData.partyFormationLabels;
const partyFullFilterLabels = partyUiData.partyFullFilterLabels;

export function getPartiesPageCopy(locale: PartyLocale): PartiesPageCopy {
  return partiesPageCopy[locale] ?? partiesPageCopy[fallbackLocale];
}

export function getPartyFullFilterLabel(
  filter: PartyFullFilter,
  locale: PartyLocale,
): string {
  return partyFullFilterLabels[filter][locale] ?? partyFullFilterLabels[filter][fallbackLocale];
}

function getPartyFormationLabel(value: string, locale: PartyLocale): string {
  const labels = partyFormationLabels[value];
  return labels?.[locale] ?? labels?.[fallbackLocale] ?? value;
}

function formatMemberCount(locale: PartyLocale, count: number, copy: CountCopyData): string {
  const template =
    locale === 'ru' ? getRussianCountTemplate(count, copy) : getDefaultCountTemplate(count, copy);
  const formattedCount = locale === 'en' ? String(count) : new Intl.NumberFormat(locale).format(count);
  return template.replaceAll('{count}', formattedCount);
}

function getDefaultCountTemplate(count: number, copy: CountCopyData): string {
  if (count === 1 && copy.one) return copy.one;
  return copy.other ?? copy.many ?? copy.one ?? '{count}';
}

function getRussianCountTemplate(count: number, copy: CountCopyData): string {
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
