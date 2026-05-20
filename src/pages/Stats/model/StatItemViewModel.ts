import { ReferenceCatalogItemViewModelBase } from 'src/shared/lib';
import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { StatNode } from '../api/StatsDataSource';
import type { StatsPageCopy } from './statsUiCopy';

export type StatLocale = SupportedLocale;

export class StatItemViewModel extends ReferenceCatalogItemViewModelBase<
  StatNode,
  StatLocale,
  StatsPageCopy
> {
  constructor(
    node: StatNode,
    getLocale: () => StatLocale,
    getCopy: () => StatsPageCopy,
  ) {
    super(node, getLocale, getCopy);
  }

  public get abbreviation(): string {
    return this.node.data.abbreviation;
  }

  public get codeMark(): string {
    return this.abbreviation || this.code.slice(0, 3).toUpperCase() || 'STA';
  }

  public get valueFormatLabel(): string {
    return this.copy.valueFormatSignedModifierLabel;
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }
}
