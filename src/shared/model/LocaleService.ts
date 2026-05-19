import { makeAutoObservable } from 'mobx';

import { container, isClient } from 'src/shared/lib';
import { uiCopyByLocale, type UiCopy } from './UiCopy';

export type SupportedLocale = 'en' | 'ru' | 'zh';

export interface LocaleOption {
  readonly value: SupportedLocale;
  readonly label: string;
  readonly nativeLabel: string;
}

const defaultLocaleOption: LocaleOption = { value: 'en', label: 'EN', nativeLabel: 'English' };

const localeOptions: readonly LocaleOption[] = [
  defaultLocaleOption,
  { value: 'ru', label: 'RU', nativeLabel: 'Русский' },
  { value: 'zh', label: 'ZH', nativeLabel: '中文' },
] as const;
const localeStorageKey = 'branching-tales.locale';

export function getLocaleNativeLabel(locale: SupportedLocale): string {
  return (
    localeOptions.find((option) => option.value === locale)?.nativeLabel ??
    defaultLocaleOption.nativeLabel
  );
}

export class LocaleService {
  public locale: SupportedLocale = 'en';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public get options(): readonly LocaleOption[] {
    return localeOptions;
  }

  public get currentOption(): LocaleOption {
    return localeOptions.find((option) => option.value === this.locale) ?? defaultLocaleOption;
  }

  public get ui(): UiCopy {
    return uiCopyByLocale[this.locale] ?? uiCopyByLocale.en;
  }

  public hydrateFromClientStorage(): void {
    if (!isClient()) return;

    const storedLocale = readStoredLocale();
    if (isSupportedLocale(storedLocale)) {
      this.locale = storedLocale;
    }
  }

  public setLocale(locale: SupportedLocale): void {
    this.locale = locale;
    this.persistLocale(locale);
  }

  private persistLocale(locale: SupportedLocale): void {
    if (!isClient()) return;

    try {
      globalThis.localStorage.setItem(localeStorageKey, locale);
    } catch {
      // Ignore blocked storage; the in-memory locale still updates.
    }
  }
}

container.register(LocaleService, () => new LocaleService(), { scope: 'clientSingleton' });

function isSupportedLocale(value: string | null): value is SupportedLocale {
  return localeOptions.some((option) => option.value === value);
}

function readStoredLocale(): string | null {
  try {
    return globalThis.localStorage.getItem(localeStorageKey);
  } catch {
    return null;
  }
}
