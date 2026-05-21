import type { ActiveNavigationItem, IViewModel } from 'src/shared/config';
import { container, makeAutoBoundObservable } from 'src/shared/lib';
import { LocaleService } from 'src/shared/model';
import {
  getGuidesCopy,
  type GuideBlockedPageCopy,
  type GuideBlockedPageKind,
  type GuideLocale,
} from './guideCopy';
import { getGuideSectionNavigationItems } from './guideSectionNavigation';

export class GuideBlockedViewModel implements IViewModel {
  public kind: GuideBlockedPageKind = 'news';
  public pathname = '/news';

  constructor(private readonly localeService: LocaleService) {
    makeAutoBoundObservable<this, 'localeService'>(this, {
      localeService: false,
    });
  }

  public setup(kind?: unknown, pathname?: unknown): void {
    if (isGuideBlockedPageKind(kind)) {
      this.kind = kind;
    }
    if (typeof pathname === 'string') {
      this.pathname = pathname;
    }
  }

  public mount(): void {
    // Blocked route shell.
  }

  public unmount(): void {
    // Blocked route shell.
  }

  public get copy(): GuideBlockedPageCopy {
    return getGuidesCopy(this.locale).blockedPages[this.kind];
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getGuideSectionNavigationItems(getGuidesCopy(this.locale).sectionItems, this.pathname);
  }

  private get locale(): GuideLocale {
    return this.localeService.locale;
  }
}

function isGuideBlockedPageKind(value: unknown): value is GuideBlockedPageKind {
  return value === 'balancePatch' || value === 'news' || value === 'newsDetail';
}

container.register(
  GuideBlockedViewModel,
  () => new GuideBlockedViewModel(container.get(LocaleService)),
  { scope: 'transient' },
);
