import type { SupportedLocale } from 'src/shared/model';
import type { HomeCapabilityStatus } from './HomeCapabilityItemViewModel';
import homeCopyByLocaleData from './homeCopy.data.json';

export interface HomeCta {
  readonly label: string;
  readonly href: string;
}

interface HomeHeroBadge {
  readonly label: string;
  readonly palette: 'blue' | 'green' | 'purple';
}

export interface HomeHeroContent {
  readonly badges: readonly HomeHeroBadge[];
  readonly title: string;
  readonly subtitle: string;
  readonly primaryCta: HomeCta;
  readonly secondaryCta: HomeCta;
  readonly fallbackNote: string;
  readonly fallbackLink: HomeCta;
}

export interface HomeSectionContent {
  readonly title: string;
  readonly description?: string;
}

export interface HomeCapabilityRow {
  readonly title: string;
  readonly description: string;
  readonly label: string;
  readonly href: string;
  readonly status: HomeCapabilityStatus;
}

export interface HomeDemoPathRow {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

export interface HomeProofRow {
  readonly label: string;
  readonly value: string;
  readonly bg: string;
  readonly border: string;
  readonly color: string;
}

export interface HomeSourceLinkRow {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

export interface HomeCopy {
  readonly capabilityActionLabel: string;
  readonly capabilitySection: HomeSectionContent;
  readonly demoPathActionLabel: string;
  readonly demoPathStepLabel: string;
  readonly demoPathsCta: HomeCta;
  readonly demoPathsSection: HomeSectionContent;
  readonly hero: HomeHeroContent;
  readonly heroBadgesAriaLabel: string;
  readonly proofStripAriaLabel: string;
  readonly sourceLinksSection: HomeSectionContent;
  readonly statusLabels: Record<HomeCapabilityStatus, string>;
  readonly capabilityRows: readonly HomeCapabilityRow[];
  readonly demoPathRows: readonly HomeDemoPathRow[];
  readonly proofRows: readonly HomeProofRow[];
  readonly sourceLinkRows: readonly HomeSourceLinkRow[];
}

const homeCopyByLocale = homeCopyByLocaleData as Record<SupportedLocale, HomeCopy>;

export function getHomeCopy(locale: SupportedLocale): HomeCopy {
  return homeCopyByLocale[locale] ?? homeCopyByLocale.en;
}
