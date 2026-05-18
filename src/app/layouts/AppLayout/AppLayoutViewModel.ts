import { makeAutoObservable } from 'mobx';

import {
  type ActiveNavigationItem,
  type IViewModel,
  type PrimaryNavigationIcon,
  type PrimaryNavigationItem,
  withActivePrimaryNavigationItems,
} from 'src/shared/config';
import { container } from 'src/shared/lib';
import {
  LocaleService,
  type LocaleOption,
  type SourceSchemaLinkId,
  type SupportedLocale,
  type UiCopy,
} from 'src/shared/model';

export interface SourceSchemaLink {
  readonly badgeBg: string;
  readonly badgeColor: string;
  readonly description: string;
  readonly href: string;
  readonly icon: PrimaryNavigationIcon;
  readonly iconColor: string;
  readonly id: SourceSchemaLinkId;
  readonly label: string;
  readonly subgraph: 'cms' | 'data';
}

interface SourceSchemaLinkDefinition {
  readonly badgeBg: string;
  readonly badgeColor: string;
  readonly href: string;
  readonly icon: PrimaryNavigationIcon;
  readonly iconColor: string;
  readonly id: SourceSchemaLinkId;
  readonly subgraph: SourceSchemaLink['subgraph'];
}

const sourceSchemaLinkDefinitions: readonly SourceSchemaLinkDefinition[] = [
  {
    badgeBg: 'rgba(56, 189, 248, 0.16)',
    badgeColor: '#7dd3fc',
    href: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/regions',
    icon: 'regions',
    iconColor: '#38bdf8',
    id: 'regionsTable',
    subgraph: 'data',
  },
  {
    badgeBg: 'rgba(56, 189, 248, 0.16)',
    badgeColor: '#7dd3fc',
    href: 'https://cloud.revisium.io/demo-rpg-data/schema/regions',
    icon: 'regions',
    iconColor: '#38bdf8',
    id: 'regionsSchema',
    subgraph: 'data',
  },
  {
    badgeBg: 'rgba(56, 189, 248, 0.16)',
    badgeColor: '#7dd3fc',
    href: 'https://cloud.revisium.io/demo-rpg-data/schema/classes',
    icon: 'classes',
    iconColor: '#38bdf8',
    id: 'classesSchema',
    subgraph: 'data',
  },
  {
    badgeBg: 'rgba(45, 212, 191, 0.16)',
    badgeColor: '#5eead4',
    href: 'https://cloud.revisium.io/app/revisium/demo-rpg-cms/master/draft',
    icon: 'data',
    iconColor: '#2dd4bf',
    id: 'cmsDraft',
    subgraph: 'cms',
  },
];

export class AppLayoutViewModel implements IViewModel {
  public isLanguageMenuOpen = false;
  public isNavigationDialogOpen = false;

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
    this.localeService.hydrateFromClientStorage();
  }

  public unmount(): void {
    // The app shell owns its mounted language button state; no cleanup is needed.
  }

  public getPrimaryNavItems(
    pathname: string,
  ): readonly ActiveNavigationItem<PrimaryNavigationItem>[] {
    return withActivePrimaryNavigationItems(pathname, this.localeService.ui.navigation);
  }

  public get sourceSchemaLinks(): readonly SourceSchemaLink[] {
    const copy = this.sourceSchemaCopy;

    return sourceSchemaLinkDefinitions.map((definition) => ({
      ...definition,
      description: copy.links[definition.id].description,
      label: copy.links[definition.id].label,
    }));
  }

  public get sourceSchemaMenuDescription(): string {
    return this.sourceSchemaCopy.menuDescription;
  }

  public get sourceSchemaMenuTitle(): string {
    return this.sourceSchemaCopy.menuTitle;
  }

  public get brandHomeAriaLabel(): string {
    return this.localeService.ui.appShell.brandHomeAria;
  }

  public get closePrimaryNavigationLabel(): string {
    return this.localeService.ui.appShell.closePrimaryNavigation;
  }

  public get currentLanguageBadgeLabel(): string {
    return this.localeService.ui.appShell.currentLanguageBadge;
  }

  public get footerBadgeLabel(): string {
    return this.localeService.ui.appShell.footerBadge;
  }

  public get footerLinkLabel(): string {
    return this.localeService.ui.appShell.footerLinkLabel;
  }

  public get footerText(): string {
    return this.localeService.ui.appShell.footerText;
  }

  public get languageAriaLabel(): string {
    return `${this.localeService.ui.appShell.languageAriaLabelPrefix}: ${this.currentLocaleName}`;
  }

  public get openPrimaryNavigationLabel(): string {
    return this.localeService.ui.appShell.openPrimaryNavigation;
  }

  public get primaryNavigationAriaLabel(): string {
    return this.localeService.ui.appShell.primaryNavigation;
  }

  public get primaryNavigationDialogAriaLabel(): string {
    return this.localeService.ui.appShell.primaryNavigationDialog;
  }

  public get skipToContentLabel(): string {
    return this.localeService.ui.appShell.skipToContent;
  }

  public get sourceSchemaTriggerAriaLabel(): string {
    return this.localeService.ui.appShell.sourceSchemaTriggerAria;
  }

  public get currentLocale(): SupportedLocale {
    return this.localeService.locale;
  }

  public get currentLocaleName(): string {
    return this.localeService.currentOption.nativeLabel;
  }

  public get localeOptions(): readonly LocaleOption[] {
    return this.localeService.options;
  }

  public setLocale(locale: SupportedLocale): void {
    this.localeService.setLocale(locale);
  }

  public setLanguageMenuOpen(isOpen: boolean): void {
    this.isLanguageMenuOpen = isOpen;
  }

  public setNavigationDialogOpen(isOpen: boolean): void {
    this.isNavigationDialogOpen = isOpen;
    if (isOpen) {
      this.isLanguageMenuOpen = false;
    }
  }

  public closeLanguageMenu(): void {
    this.isLanguageMenuOpen = false;
  }

  public closeNavigationDialog(): void {
    this.isNavigationDialogOpen = false;
  }

  private get sourceSchemaCopy(): UiCopy['sourceSchema'] {
    return this.localeService.ui.sourceSchema;
  }
}

container.register(AppLayoutViewModel, () => new AppLayoutViewModel(container.get(LocaleService)), {
  scope: 'transient',
});
