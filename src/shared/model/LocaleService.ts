import { makeAutoObservable } from 'mobx';

import { container, isClient } from 'src/shared/lib';
import { uiCopyByLocale, type UiCopy } from './UiCopy';

export type SupportedLocale = 'en' | 'ru' | 'zh';

export interface LocaleOption {
  readonly value: SupportedLocale;
  readonly label: string;
  readonly nativeLabel: string;
}

export const defaultLocale: SupportedLocale = 'en';

const defaultLocaleOption: LocaleOption = {
  value: defaultLocale,
  label: 'EN',
  nativeLabel: 'English',
};

const localeOptions: readonly LocaleOption[] = [
  defaultLocaleOption,
  { value: 'ru', label: 'RU', nativeLabel: 'Русский' },
  { value: 'zh', label: 'ZH', nativeLabel: '中文' },
] as const;
export const supportedLocaleValues: readonly SupportedLocale[] = localeOptions.map(
  (option) => option.value,
);
export const localeStorageKey = 'branching-tales.locale';

export function getLocaleNativeLabel(locale: SupportedLocale): string {
  return (
    localeOptions.find((option) => option.value === locale)?.nativeLabel ??
    defaultLocaleOption.nativeLabel
  );
}

export class LocaleService {
  public locale: SupportedLocale = getInitialLocale();

  constructor() {
    makeAutoObservable<this, 'applyLocale' | 'persistLocale'>(
      this,
      {
        applyLocale: false,
        persistLocale: false,
      },
      { autoBind: true },
    );
    this.syncDocumentLocale();
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
      this.applyLocale(storedLocale);
    }
  }

  public setLocale(locale: SupportedLocale): void {
    this.applyLocale(locale);
    this.persistLocale(locale);
  }

  public syncDocumentLocale(): void {
    if (!isClient()) return;

    const root = globalThis.document.documentElement;

    root.lang = this.locale;
    root.dataset.localeReady = 'true';
    if (this.locale === defaultLocale) {
      delete root.dataset.persistedLocale;
    } else {
      root.dataset.persistedLocale = this.locale;
    }
  }

  private applyLocale(locale: SupportedLocale): void {
    this.locale = locale;
    this.syncDocumentLocale();
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
  return supportedLocaleValues.some((locale) => locale === value);
}

function readStoredLocale(): string | null {
  try {
    return globalThis.localStorage.getItem(localeStorageKey);
  } catch {
    return null;
  }
}

function getInitialLocale(): SupportedLocale {
  if (!isClient()) return defaultLocale;

  const storedLocale = readStoredLocale();

  return isSupportedLocale(storedLocale) ? storedLocale : defaultLocaleOption.value;
}
