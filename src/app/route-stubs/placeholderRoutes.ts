import type { SectionNavKey } from 'src/shared/config';
import type { SupportedLocale } from 'src/shared/model';
import placeholderRoutesData from './placeholderRoutes.data.json';

export interface PlaceholderRouteDescriptor {
  readonly title: string;
  readonly route: string;
  readonly status: 'Blocked' | 'Draft';
  readonly capability: string;
  readonly source: string;
  readonly sectionNavKey?: SectionNavKey;
}

export interface PlaceholderRouteCopy {
  readonly title: string;
  readonly capability: string;
}

export interface PlaceholderPageCopy {
  readonly blockedDescription: string;
  readonly capabilityLabel: string;
  readonly draftDescription: string;
  readonly implementationNote: string;
  readonly implementationTitle: string;
  readonly openImplementedCatalog: string;
  readonly routeLabel: string;
  readonly sectionAriaSuffix: string;
  readonly sourceLabel: string;
  readonly statusLabels: Record<PlaceholderRouteDescriptor['status'], string>;
}

interface PlaceholderRoutesData {
  readonly routes: Record<string, PlaceholderRouteDescriptor>;
  readonly routeCopyByLocale: Record<SupportedLocale, Record<string, PlaceholderRouteCopy>>;
  readonly pageCopyByLocale: Record<SupportedLocale, PlaceholderPageCopy>;
}

const placeholderRoutesSource = placeholderRoutesData as PlaceholderRoutesData;

export type PlaceholderRouteKey = keyof typeof placeholderRoutesData.routes;

export const placeholderRoutes = placeholderRoutesSource.routes as Record<
  PlaceholderRouteKey,
  PlaceholderRouteDescriptor
>;

const placeholderRouteCopyByLocale = placeholderRoutesSource.routeCopyByLocale as Record<
  SupportedLocale,
  Record<PlaceholderRouteKey, PlaceholderRouteCopy>
>;

const placeholderPageCopyByLocale = placeholderRoutesSource.pageCopyByLocale;

export function getPlaceholderRouteCopy(
  key: PlaceholderRouteKey,
  locale: SupportedLocale,
): PlaceholderRouteCopy {
  return placeholderRouteCopyByLocale[locale][key] ?? placeholderRouteCopyByLocale.en[key];
}

export function getPlaceholderPageCopy(locale: SupportedLocale): PlaceholderPageCopy {
  return placeholderPageCopyByLocale[locale] ?? placeholderPageCopyByLocale.en;
}
