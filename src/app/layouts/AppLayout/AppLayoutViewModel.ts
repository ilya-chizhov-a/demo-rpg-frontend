import { makeAutoObservable } from 'mobx';

import {
  type ActiveNavigationItem,
  type IViewModel,
  withActivePrimaryNavigationItems,
} from 'src/shared/config';
import { container } from 'src/shared/lib';
import { LocaleService, type LocaleOption, type SupportedLocale } from 'src/shared/model';

export class AppLayoutViewModel implements IViewModel {
  constructor(private readonly localeService: LocaleService) {
    makeAutoObservable<this, 'localeService'>(
      this,
      {
        localeService: false,
      },
      { autoBind: true },
    );
  }

  public setup(): void {
    // App shell state is shared through services and has no route setup.
  }

  public mount(): void {
    // No app-shell side effects yet.
  }

  public unmount(): void {
    // The app shell owns its mounted language button state; no cleanup is needed.
  }

  public getPrimaryNavItems(pathname: string): readonly ActiveNavigationItem[] {
    return withActivePrimaryNavigationItems(pathname);
  }

  public get localeOptions(): readonly LocaleOption[] {
    return this.localeService.options;
  }

  public get currentLocaleLabel(): string {
    return this.localeService.currentOption.label;
  }

  public get currentLocaleName(): string {
    return this.localeService.currentOption.nativeLabel;
  }

  public isLocaleSelected(locale: SupportedLocale): boolean {
    return this.localeService.locale === locale;
  }

  public setLocale(locale: SupportedLocale): void {
    this.localeService.setLocale(locale);
  }
}

container.register(AppLayoutViewModel, () => new AppLayoutViewModel(container.get(LocaleService)), {
  scope: 'transient',
});
