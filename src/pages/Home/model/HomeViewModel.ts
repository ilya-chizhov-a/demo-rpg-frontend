import { makeAutoObservable } from 'mobx';

import type { IViewModel } from 'src/shared/config';
import { container } from 'src/shared/lib';
import { LocaleService } from 'src/shared/model';
import { getHomeCopy, type HomeCopy } from './homeCopy';
import { HomeCapabilityItemViewModel } from './HomeCapabilityItemViewModel';
import { HomeDemoPathItemViewModel } from './HomeDemoPathItemViewModel';
import { HomeProofItemViewModel } from './HomeProofItemViewModel';
import { HomeSourceLinkItemViewModel } from './HomeSourceLinkItemViewModel';

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

  public get demoPathsSection(): HomeCopy['demoPathsSection'] {
    return this.copy.demoPathsSection;
  }

  public get sourceLinksSection(): HomeCopy['sourceLinksSection'] {
    return this.copy.sourceLinksSection;
  }

  public get demoPathsCta(): HomeCopy['demoPathsCta'] {
    return this.copy.demoPathsCta;
  }

  public get proofStripAriaLabel(): string {
    return this.copy.proofStripAriaLabel;
  }

  public get heroBadgesAriaLabel(): string {
    return this.copy.heroBadgesAriaLabel;
  }

  public get capabilities(): readonly HomeCapabilityItemViewModel[] {
    return this.copy.capabilityRows.map(
      ({ description, href, label, status, title }) =>
        new HomeCapabilityItemViewModel({
          actionLabel: this.copy.capabilityActionLabel,
          description,
          href,
          label,
          status,
          statusLabel: this.copy.statusLabels[status],
          title,
        }),
    );
  }

  public get demoPaths(): readonly HomeDemoPathItemViewModel[] {
    return this.copy.demoPathRows.map(
      ({ description, href, title }, index) =>
        new HomeDemoPathItemViewModel({
          actionLabel: this.copy.demoPathActionLabel,
          description,
          href,
          index,
          stepLabel: this.copy.demoPathStepLabel,
          title,
        }),
    );
  }

  public get proofNodes(): readonly HomeProofItemViewModel[] {
    return this.copy.proofRows.map(
      ({ bg, border, color, label, value }, index) =>
        new HomeProofItemViewModel({ bg, border, color, index, label, value }),
    );
  }

  public get sourceLinks(): readonly HomeSourceLinkItemViewModel[] {
    return this.copy.sourceLinkRows.map(
      ({ description, href, title }) =>
        new HomeSourceLinkItemViewModel({ description, href, title }),
    );
  }

  private get copy(): HomeCopy {
    return getHomeCopy(this.localeService.locale);
  }
}

container.register(HomeViewModel, () => new HomeViewModel(container.get(LocaleService)), {
  scope: 'transient',
});
