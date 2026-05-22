import type { SupportedLocale } from 'src/shared/model';
import homeCopyByLocaleData from './homeCopy.data.json';

export interface HomeCta {
  readonly label: string;
  readonly href: string;
}

export interface HomeHeroContent {
  readonly title: string;
  readonly subtitle: string;
  readonly primaryCta: HomeCta;
  readonly secondaryCta: HomeCta;
}

export interface HomeSectionContent {
  readonly title: string;
  readonly description?: string;
}

export interface HomeCapabilityRow {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

export interface HomeCopy {
  readonly capabilityActionLabel: string;
  readonly capabilitySection: HomeSectionContent;
  readonly hero: HomeHeroContent;
  readonly capabilityRows: readonly HomeCapabilityRow[];
}

const homeCopyByLocale = homeCopyByLocaleData as Record<SupportedLocale, HomeCopy>;

export function getHomeCopy(locale: SupportedLocale): HomeCopy {
  return homeCopyByLocale[locale] ?? homeCopyByLocale.en;
}
