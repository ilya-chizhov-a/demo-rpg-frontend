import { makeAutoObservable } from 'mobx';

import type { IViewModel } from 'src/shared/config';
import { container } from 'src/shared/lib';
import { LocaleService } from 'src/shared/model';
import { getHomeCopy, type HomeCopy } from './homeCopy';
import { HomeCapabilityItemViewModel } from './HomeCapabilityItemViewModel';

export class HomeViewModel implements IViewModel {
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
    // Home currently renders committed fallback copy while CMS tables are pending.
  }

  public mount(): void {
    // No live CMS request yet.
  }

  public unmount(): void {
    // No subscriptions to dispose.
  }

  public get hero(): HomeCopy['hero'] {
    return this.copy.hero;
  }

  public get capabilitySection(): HomeCopy['capabilitySection'] {
    return this.copy.capabilitySection;
  }

  public get capabilities(): readonly HomeCapabilityItemViewModel[] {
    return this.copy.capabilityRows.map(
      ({ description, href, title }) =>
        new HomeCapabilityItemViewModel({
          actionLabel: this.copy.capabilityActionLabel,
          description,
          href,
          title,
        }),
    );
  }

  private get copy(): HomeCopy {
    return getHomeCopy(this.localeService.locale);
  }
}

container.register(HomeViewModel, () => new HomeViewModel(container.get(LocaleService)), {
  scope: 'transient',
});
