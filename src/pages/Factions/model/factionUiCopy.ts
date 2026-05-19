import type { FactionLocale } from './FactionItemViewModel';
import factionUiCopyData from './factionUiCopy.data.json';

export interface FactionsPageCopy {
  readonly allAlignmentsButton: string;
  readonly alignmentButtonsAriaLabel: string;
  readonly alignmentLabel: (alignment: string) => string;
  readonly capabilitiesAriaLabel: string;
  readonly cardOpenAction: string;
  readonly crestPlaceholderDescription: (factionTitle: string) => string;
  readonly crestPlaceholderTitle: string;
  readonly detail: {
    readonly backAriaLabel: string;
    readonly backLabel: string;
    readonly datasetLabel: string;
    readonly errorDescription: string;
    readonly errorTitle: string;
    readonly factsTitle: string;
    readonly fieldAlignment: string;
    readonly fieldCrestDimensions: string;
    readonly fieldCrestFile: string;
    readonly fieldCrestMimeType: string;
    readonly fieldFactionId: string;
    readonly fieldPublished: string;
    readonly fieldVersion: string;
    readonly localeLabel: string;
    readonly noDescription: string;
    readonly noRelatedMonstersDescription: string;
    readonly noRelatedMonstersTitle: string;
    readonly noRelatedNpcsDescription: string;
    readonly noRelatedNpcsTitle: string;
    readonly openMonsterAction: string;
    readonly openNpcAction: string;
    readonly relatedHpLabel: string;
    readonly relatedLevelLabel: string;
    readonly relatedLocationLabel: string;
    readonly relatedMonstersTitle: string;
    readonly relatedNpcsTitle: string;
    readonly relatedRoleLabel: string;
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
  readonly fieldAlignment: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly noDescription: string;
  readonly publishedLabel: string;
  readonly resetFiltersActionLabel: string;
  readonly retryActionLabel: string;
  readonly showMoreActionLabel: string;
  readonly versionLabel: string;
  readonly worldSectionAriaLabel: string;
}

const fallbackLocale: FactionLocale = 'en';

type FactionsPageCopyData = Omit<
  FactionsPageCopy,
  'alignmentLabel' | 'crestPlaceholderDescription'
> & {
  readonly crestPlaceholderDescriptionTemplate: string;
};

interface FactionUiCopyData {
  readonly alignmentLabelsByLocale: Record<FactionLocale, Record<string, string>>;
  readonly factionsPageCopy: Record<FactionLocale, FactionsPageCopyData>;
}

const factionUiData = factionUiCopyData as FactionUiCopyData;

const factionsPageCopy = Object.fromEntries(
  Object.entries(factionUiData.factionsPageCopy).map(([locale, copy]) => {
    const { crestPlaceholderDescriptionTemplate, ...pageCopy } = copy;
    return [
      locale,
      {
        ...pageCopy,
        crestPlaceholderDescription: (factionTitle: string) =>
          crestPlaceholderDescriptionTemplate.replaceAll('{factionTitle}', factionTitle),
      },
    ];
  }),
) as Record<FactionLocale, Omit<FactionsPageCopy, 'alignmentLabel'>>;

const alignmentLabelsByLocale = factionUiData.alignmentLabelsByLocale;

export function getFactionsPageCopy(locale: FactionLocale): FactionsPageCopy {
  const copy = factionsPageCopy[locale] ?? factionsPageCopy[fallbackLocale];
  return {
    ...copy,
    alignmentLabel: (alignment: string) => getAlignmentLabel(locale, alignment),
  };
}

function getAlignmentLabel(locale: FactionLocale, alignment: string): string {
  const normalized = alignment.trim().toLowerCase().replaceAll(/[-_]+/g, ' ');
  return (
    alignmentLabelsByLocale[locale]?.[normalized] ??
    alignmentLabelsByLocale[fallbackLocale][normalized] ??
    formatUnknownAlignment(alignment)
  );
}

function formatUnknownAlignment(value: string): string {
  return value
    .replaceAll(/[-_]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
