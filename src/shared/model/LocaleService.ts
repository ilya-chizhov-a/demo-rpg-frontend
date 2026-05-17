import { makeAutoObservable } from 'mobx';

import { container } from 'src/shared/lib';

export type SupportedLocale = 'en' | 'ru' | 'zh';

export interface LocaleOption {
  readonly value: SupportedLocale;
  readonly label: string;
  readonly nativeLabel: string;
}

const defaultLocaleOption: LocaleOption = { value: 'en', label: 'EN', nativeLabel: 'English' };

const localeOptions: readonly LocaleOption[] = [
  defaultLocaleOption,
  { value: 'ru', label: 'RU', nativeLabel: 'Russian' },
  { value: 'zh', label: 'ZH', nativeLabel: 'Chinese' },
] as const;

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

  public setLocale(locale: SupportedLocale): void {
    this.locale = locale;
  }
}

container.register(LocaleService, () => new LocaleService(), { scope: 'clientSingleton' });
