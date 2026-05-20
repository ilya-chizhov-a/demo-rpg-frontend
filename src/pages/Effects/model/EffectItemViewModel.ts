import { ReferenceCatalogItemViewModelBase } from 'src/shared/lib';
import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { EffectNode } from '../api/EffectsDataSource';
import type { EffectsPageCopy } from './effectsUiCopy';

export type EffectLocale = SupportedLocale;

export class EffectItemViewModel extends ReferenceCatalogItemViewModelBase<
  EffectNode,
  EffectLocale,
  EffectsPageCopy
> {
  constructor(
    node: EffectNode,
    getLocale: () => EffectLocale,
    getCopy: () => EffectsPageCopy,
  ) {
    super(node, getLocale, getCopy);
  }

  public get codeMark(): string {
    const normalized = this.code.replace(/[^a-z0-9]/gi, '').toUpperCase();
    if (normalized.length <= 3) return normalized || 'EFX';
    return `${normalized.slice(0, 2)}${normalized.slice(-1)}`;
  }

  public get kind(): string {
    return this.node.data.kind;
  }

  public get kindLabel(): string {
    return this.copy.kindLabel(this.kind);
  }

  public get defaultDurationLabel(): string {
    return this.formatDefaultDuration(this.node.data.default_duration);
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }

  private formatDefaultDuration(value: string | number | null | undefined): string {
    const displayValue = String(value ?? '').trim();
    return displayValue || this.copy.durationUnavailableLabel;
  }
}
