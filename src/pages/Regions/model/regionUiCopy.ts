import type { RegionLocale } from './RegionItemViewModel';

interface RegionCoverPlaceholderCopy {
  readonly title: string;
  readonly description: (regionTitle: string) => string;
}

const fallbackLocale: RegionLocale = 'en';

const regionCoverPlaceholderCopy: Record<RegionLocale, RegionCoverPlaceholderCopy> = {
  en: {
    title: 'Atlas image unavailable',
    description: (regionTitle) => `No cover image is available for ${regionTitle}.`,
  },
  ru: {
    title: 'Изображение атласа недоступно',
    description: (regionTitle) => `Для региона ${regionTitle} нет обложки.`,
  },
  zh: {
    title: '图集图片不可用',
    description: (regionTitle) => `${regionTitle} 暂无封面图片。`,
  },
};

export function getRegionCoverPlaceholderTitle(locale: RegionLocale): string {
  return getRegionCoverPlaceholderCopy(locale).title;
}

export function getRegionCoverPlaceholderDescription(
  locale: RegionLocale,
  regionTitle: string,
): string {
  return getRegionCoverPlaceholderCopy(locale).description(regionTitle);
}

function getRegionCoverPlaceholderCopy(locale: RegionLocale): RegionCoverPlaceholderCopy {
  return regionCoverPlaceholderCopy[locale] ?? regionCoverPlaceholderCopy[fallbackLocale];
}
