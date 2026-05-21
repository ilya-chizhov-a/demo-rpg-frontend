import type { SupportedLocale } from 'src/shared/model';
import guidesCopyByLocaleData from './guideCopy.data.json';

export type GuideLocale = SupportedLocale;
export type GuideBlockedPageKind = 'balancePatch' | 'news' | 'newsDetail';
export type GuideSectionItemId = 'about' | 'balancePatch' | 'blog' | 'news';

export interface GuideSectionItemCopy {
  readonly id: GuideSectionItemId;
  readonly label: string;
  readonly to: string;
}

export interface BlogPageCopy {
  readonly applySearchActionLabel: string;
  readonly authorLabel: string;
  readonly cardOpenAction: string;
  readonly closeFiltersActionLabel: string;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly featuredLabel: string;
  readonly filterPanelTitle: string;
  readonly guideSectionAriaLabel: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly imagePlaceholderDescription: string;
  readonly imagePlaceholderTitle: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly noExcerpt: string;
  readonly openFiltersActionLabel: string;
  readonly payloadPreviewTitle: string;
  readonly retryActionLabel: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly showMoreActionLabel: string;
}

export interface BlogPostDetailCopy {
  readonly authorBioTitle: string;
  readonly backAriaLabel: string;
  readonly backLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly guideSectionAriaLabel: string;
  readonly imageMetadataTitle: string;
  readonly imagePlaceholderDescription: string;
  readonly imagePlaceholderTitle: string;
  readonly noBody: string;
  readonly noExcerpt: string;
  readonly notFoundDescription: string;
  readonly notFoundTitle: string;
  readonly publishedLabel: string;
  readonly relatedLinks: readonly GuideActionCopy[];
  readonly relatedTitle: string;
  readonly sourceLabel: string;
  readonly unknownValue: string;
}

export interface AboutPageCopy {
  readonly actions: readonly GuideActionCopy[];
  readonly architectureItems: readonly ArchitectureItemCopy[];
  readonly comparisonColumns: readonly ComparisonColumnCopy[];
  readonly evaluationSteps: readonly GuideActionCopy[];
  readonly guideSectionAriaLabel: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly introTitle: string;
  readonly introText: string;
  readonly sourceLinks: readonly GuideActionCopy[];
}

export interface GuideActionCopy {
  readonly description: string;
  readonly href: string;
  readonly label: string;
  readonly title: string;
}

export interface ArchitectureItemCopy {
  readonly description: string;
  readonly label: string;
}

export interface ComparisonColumnCopy {
  readonly items: readonly string[];
  readonly title: string;
}

export interface GuideBlockedPageCopy {
  readonly actionHref: string;
  readonly actionLabel: string;
  readonly badges: readonly string[];
  readonly blockedReason: string;
  readonly capabilityLabel: string;
  readonly description: string;
  readonly guideSectionAriaLabel: string;
  readonly eyebrow: string;
  readonly plannedBlocks: readonly string[];
  readonly previewTitle: string;
  readonly routeLabel: string;
  readonly sourceLabel: string;
  readonly sourceValue: string;
  readonly statusLabel: string;
  readonly title: string;
}

export interface GuidesCopy {
  readonly about: AboutPageCopy;
  readonly blog: BlogPageCopy;
  readonly blogPost: BlogPostDetailCopy;
  readonly blockedPages: Record<GuideBlockedPageKind, GuideBlockedPageCopy>;
  readonly sectionItems: readonly GuideSectionItemCopy[];
}

const fallbackLocale: GuideLocale = 'en';

const guidesCopyByLocale = guidesCopyByLocaleData as Record<GuideLocale, GuidesCopy>;

export function getGuidesCopy(locale: GuideLocale): GuidesCopy {
  return guidesCopyByLocale[locale] ?? guidesCopyByLocale[fallbackLocale];
}
