import type { ItemLocale } from './ItemItemViewModel';
import itemUiCopyData from './itemUiCopy.data.json';

export type ItemSortKey =
  | 'market-asc'
  | 'market-desc'
  | 'name-asc'
  | 'published-desc'
  | 'rarity-value';

export const ITEM_SORT_KEYS: readonly ItemSortKey[] = [
  'rarity-value',
  'market-desc',
  'market-asc',
  'name-asc',
  'published-desc',
];

export interface ItemSortOptionDescriptor {
  readonly key: ItemSortKey;
  readonly label: string;
}

export interface ItemsPageCopy {
  readonly applyFiltersActionLabel: string;
  readonly baseValueLabel: string;
  readonly capabilitiesAriaLabel: string;
  readonly cardOpenAction: string;
  readonly detail: ItemDetailCopy;
  readonly closeFiltersActionLabel: string;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyPayloadTitle: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly filterPanelTitle: string;
  readonly filterSheetAriaLabel: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly iconPlaceholderLabel: string;
  readonly itemsSectionAriaLabel: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly marketMaxLabel: string;
  readonly marketMinLabel: string;
  readonly marketValueLabel: string;
  readonly modifierLabel: (count: number) => string;
  readonly nameSearchLabel: string;
  readonly nameSearchPlaceholder: string;
  readonly noDescription: string;
  readonly noModifiersLabel: string;
  readonly openFiltersActionLabel: string;
  readonly payloadPreviewTitle: string;
  readonly rangeValidationMessage: string;
  readonly rarityAllLabel: string;
  readonly rarityLabel: (value: string) => string;
  readonly rarityTagLabel: string;
  readonly raritySelectLabel: string;
  readonly resetFiltersActionLabel: string;
  readonly retryActionLabel: string;
  readonly showMoreActionLabel: string;
  readonly sortLabel: string;
  readonly sortOptions: readonly ItemSortOptionDescriptor[];
  readonly typeAllLabel: string;
  readonly typeSelectLabel: string;
  readonly unknownTypeLabel: string;
  readonly weightLabel: string;
}

export interface ItemDetailCopy {
  readonly backAriaLabel: string;
  readonly backLabel: string;
  readonly computedBadge: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly factsTitle: string;
  readonly fieldBaseValue: string;
  readonly fieldFileDimensions: string;
  readonly fieldFileHash: string;
  readonly fieldFileMimeType: string;
  readonly fieldFileName: string;
  readonly fieldFileSize: string;
  readonly fieldFileStatus: string;
  readonly fieldLocale: string;
  readonly fieldMarketValue: string;
  readonly fieldPublished: string;
  readonly fieldRarity: string;
  readonly fieldRarityMultiplier: string;
  readonly fieldRarityTag: string;
  readonly fieldType: string;
  readonly fieldTypeCode: string;
  readonly fieldVersion: string;
  readonly fieldWeight: string;
  readonly fileMetadataTitle: string;
  readonly filePreviewTitle: string;
  readonly formulasTitle: string;
  readonly iconPlaceholderDescription: (itemTitle: string) => string;
  readonly iconPlaceholderTitle: string;
  readonly modifierStatCodeLabel: string;
  readonly modifierValueLabel: string;
  readonly modifiersEmptyDescription: string;
  readonly modifiersEmptyTitle: string;
  readonly modifiersTitle: string;
  readonly noDescription: string;
  readonly notFoundDescription: string;
  readonly notFoundTitle: string;
  readonly openStatsAction: string;
  readonly openTypeAction: string;
  readonly typeReferenceLabel: string;
  readonly unknownValue: string;
}

const fallbackLocale: ItemLocale = 'en';

type ItemDetailCopyData = Omit<ItemDetailCopy, 'iconPlaceholderDescription'> & {
  readonly iconPlaceholderDescriptionTemplate: string;
};

type ItemsPageCopyData = Omit<
  ItemsPageCopy,
  'detail' | 'modifierLabel' | 'rarityLabel' | 'sortOptions'
> & {
  readonly detail: ItemDetailCopyData;
  readonly sortOptionLabels: Record<ItemSortKey, string>;
};

interface ItemUiCopyData {
  readonly itemsPageCopy: Record<ItemLocale, ItemsPageCopyData>;
  readonly rarityLabels: Record<string, Record<ItemLocale, string>>;
}

const itemUiData = itemUiCopyData as ItemUiCopyData;

const itemsPageCopy = Object.fromEntries(
  Object.entries(itemUiData.itemsPageCopy).map(([locale, copy]) => {
    const copyLocale = locale as ItemLocale;
    const { detail, sortOptionLabels, ...pageCopy } = copy;

    return [
      locale,
      {
        ...pageCopy,
        detail: {
          ...detail,
          iconPlaceholderDescription: (itemTitle: string) =>
            detail.iconPlaceholderDescriptionTemplate.replace('{item}', itemTitle),
        },
        modifierLabel: (count: number) => formatModifierCount(count, copyLocale),
        rarityLabel: (value: string) => getRarityLabel(value, copyLocale),
        sortOptions: ITEM_SORT_KEYS.map((key) => ({ key, label: sortOptionLabels[key] })),
      },
    ];
  }),
) as unknown as Record<ItemLocale, ItemsPageCopy>;

const rarityLabels = itemUiData.rarityLabels;

export function getItemsPageCopy(locale: ItemLocale): ItemsPageCopy {
  return itemsPageCopy[locale] ?? itemsPageCopy[fallbackLocale];
}

function getRarityLabel(value: string, locale: ItemLocale): string {
  const normalized = value.trim().toLowerCase();
  const labels = rarityLabels[normalized];
  return labels?.[locale] ?? labels?.[fallbackLocale] ?? value;
}

function formatModifierCount(count: number, locale: ItemLocale): string {
  if (locale === 'ru') return formatRussianModifierCount(count);
  if (locale === 'en') return `${count} modifier${count === 1 ? '' : 's'}`;
  return `${count} modifier`;
}

function formatRussianModifierCount(count: number): string {
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (mod10 === 1 && mod100 !== 11) return `${count} модификатор`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} модификатора`;
  }
  return `${count} модификаторов`;
}
