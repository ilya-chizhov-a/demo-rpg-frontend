import { makeAutoObservable } from 'mobx';

import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import { container } from 'src/shared/lib';
import { LocaleService } from 'src/shared/model';
import {
  getPlaceholderPageCopy,
  getPlaceholderRouteCopy,
  placeholderRoutes,
  type PlaceholderPageCopy,
  type PlaceholderRouteCopy,
  type PlaceholderRouteDescriptor,
  type PlaceholderRouteKey,
} from './placeholderRoutes';

export class PlaceholderPageViewModel implements IViewModel {
  public routeKey: PlaceholderRouteKey = 'home';

  constructor(private readonly localeService: LocaleService) {
    makeAutoObservable<this, 'localeService'>(
      this,
      {
        localeService: false,
      },
      { autoBind: true },
    );
  }

  public setup(routeKey?: unknown): void {
    if (isPlaceholderRouteKey(routeKey)) {
      this.routeKey = routeKey;
    }
  }

  public mount(): void {
    // Placeholder pages have no side effects.
  }

  public unmount(): void {
    // Placeholder pages have no subscriptions to dispose.
  }

  public get descriptor(): PlaceholderRouteDescriptor {
    return placeholderRoutes[this.routeKey];
  }

  public get title(): string {
    return this.routeCopy.title || this.descriptor.title;
  }

  public get capability(): string {
    return this.routeCopy.capability || this.descriptor.capability;
  }

  public get statusLabel(): string {
    return this.pageCopy.statusLabels[this.descriptor.status];
  }

  public get description(): string {
    return this.descriptor.status === 'Blocked'
      ? this.pageCopy.blockedDescription
      : this.pageCopy.draftDescription;
  }

  public get colorPalette(): 'orange' | 'red' {
    return this.descriptor.status === 'Blocked' ? 'red' : 'orange';
  }

  public get sectionNav(): readonly ActiveNavigationItem[] | null {
    if (!this.descriptor.sectionNavKey) return null;

    return getSectionNavigationItems(
      this.descriptor.sectionNavKey,
      this.descriptor.route,
      this.localeService.ui.navigation,
    );
  }

  public get sectionAriaLabel(): string {
    return `${this.title} ${this.pageCopy.sectionAriaSuffix}`;
  }

  public get pageCopy(): PlaceholderPageCopy {
    return getPlaceholderPageCopy(this.localeService.locale);
  }

  private get routeCopy(): PlaceholderRouteCopy {
    return getPlaceholderRouteCopy(this.routeKey, this.localeService.locale);
  }
}

container.register(
  PlaceholderPageViewModel,
  () => new PlaceholderPageViewModel(container.get(LocaleService)),
  { scope: 'transient' },
);

function isPlaceholderRouteKey(value: unknown): value is PlaceholderRouteKey {
  return typeof value === 'string' && Object.hasOwn(placeholderRoutes, value);
}
