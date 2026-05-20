import { ReferenceCatalogItemViewModelBase } from 'src/shared/lib';
import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { ItemTypeNode } from '../api/ItemTypesDataSource';
import type { ItemTypesPageCopy } from './itemTypesUiCopy';

export type ItemTypeLocale = SupportedLocale;

export class ItemTypeItemViewModel extends ReferenceCatalogItemViewModelBase<
  ItemTypeNode,
  ItemTypeLocale,
  ItemTypesPageCopy
> {
  constructor(
    node: ItemTypeNode,
    getLocale: () => ItemTypeLocale,
    getCopy: () => ItemTypesPageCopy,
  ) {
    super(node, getLocale, getCopy);
  }

  public get codeMark(): string {
    const letters = this.code
      .split(/[-_\s]+/)
      .map((part) => part.at(0))
      .join('')
      .slice(0, 3)
      .toUpperCase();
    return letters || this.code.slice(0, 3).toUpperCase() || 'IT';
  }

  public get itemsCountLabel(): string {
    return this.copy.itemsCountUnavailableLabel;
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }
}
