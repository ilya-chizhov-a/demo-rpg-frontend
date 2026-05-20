import type { AbilityLocale } from './AbilityItemViewModel';
import abilityUiCopyData from './abilityUiCopy.data.json';

export interface AbilitiesPageCopy {
  readonly abilitiesSectionAriaLabel: string;
  readonly capabilitiesAriaLabel: string;
  readonly cooldownLabel: string;
  readonly damageLabel: string;
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
  readonly iconPlaceholderLabel: string;
  readonly kindLabel: (value: string) => string;
  readonly levelLabel: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly noDescription: string;
  readonly retryActionLabel: string;
  readonly schoolFieldLabel: string;
  readonly schoolLabel: (value: string) => string;
  readonly showMoreActionLabel: string;
  readonly zeroCooldownLabel: string;
}

const fallbackLocale: AbilityLocale = 'en';

type AbilitiesPageCopyData = Omit<AbilitiesPageCopy, 'kindLabel' | 'schoolLabel'>;

interface AbilityUiCopyData {
  readonly abilitiesPageCopy: Record<AbilityLocale, AbilitiesPageCopyData>;
  readonly abilityKindLabels: Record<string, Record<AbilityLocale, string>>;
  readonly abilitySchoolLabels: Record<string, Record<AbilityLocale, string>>;
}

const abilityUiData = abilityUiCopyData as AbilityUiCopyData;

const abilitiesPageCopy = Object.fromEntries(
  Object.entries(abilityUiData.abilitiesPageCopy).map(([locale, copy]) => {
    const copyLocale = locale as AbilityLocale;

    return [
      locale,
      {
        ...copy,
        kindLabel: (value: string) => getAbilityKindLabel(value, copyLocale),
        schoolLabel: (value: string) => getAbilitySchoolLabel(value, copyLocale),
      },
    ];
  }),
) as Record<AbilityLocale, AbilitiesPageCopy>;

const abilityKindLabels = abilityUiData.abilityKindLabels;
const abilitySchoolLabels = abilityUiData.abilitySchoolLabels;

export function getAbilitiesPageCopy(locale: AbilityLocale): AbilitiesPageCopy {
  return abilitiesPageCopy[locale] ?? abilitiesPageCopy[fallbackLocale];
}

function getAbilityKindLabel(value: string, locale: AbilityLocale): string {
  const labels = abilityKindLabels[value];
  return labels?.[locale] ?? labels?.[fallbackLocale] ?? value;
}

function getAbilitySchoolLabel(value: string, locale: AbilityLocale): string {
  const labels = abilitySchoolLabels[value];
  return labels?.[locale] ?? labels?.[fallbackLocale] ?? value;
}
