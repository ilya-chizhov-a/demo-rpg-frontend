import type { ActiveNavigationItem, IViewModel } from 'src/shared/config';
import { container, makeAutoBoundObservable } from 'src/shared/lib';
import { LocaleService } from 'src/shared/model';
import {
  getGuidesCopy,
  type AboutPageCopy,
  type GuideLocale,
} from './guideCopy';
import { getGuideSectionNavigationItems } from './guideSectionNavigation';

export class AboutViewModel implements IViewModel {
  constructor(private readonly localeService: LocaleService) {
    makeAutoBoundObservable<this, 'localeService'>(this, {
      localeService: false,
    });
  }

  public setup(): void {
    // Static route.
  }

  public mount(): void {
    // Static route.
  }

  public unmount(): void {
    // Static route.
  }

  public get copy(): AboutPageCopy {
    return getGuidesCopy(this.locale).about;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getGuideSectionNavigationItems(getGuidesCopy(this.locale).sectionItems, '/about');
  }

  private get locale(): GuideLocale {
    return this.localeService.locale;
  }
}

container.register(AboutViewModel, () => new AboutViewModel(container.get(LocaleService)), {
  scope: 'transient',
});
