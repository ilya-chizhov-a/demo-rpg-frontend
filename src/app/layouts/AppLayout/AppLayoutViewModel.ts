import { makeAutoObservable } from 'mobx';

import {
  type ActiveNavigationItem,
  type IViewModel,
  type PrimaryNavigationIcon,
  type PrimaryNavigationItem,
  withActivePrimaryNavigationItems,
} from 'src/shared/config';
import { container } from 'src/shared/lib';
import { LocaleService, type LocaleOption, type SupportedLocale } from 'src/shared/model';

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

type SourceSchemaLinkId = 'classesSchema' | 'cmsDraft' | 'regionsSchema' | 'regionsTable';

interface SourceSchemaLinkDefinition {
  readonly badgeBg: string;
  readonly badgeColor: string;
  readonly href: string;
  readonly icon: PrimaryNavigationIcon;
  readonly iconColor: string;
  readonly id: SourceSchemaLinkId;
  readonly subgraph: SourceSchemaLink['subgraph'];
}

interface SourceSchemaLinkCopy {
  readonly description: string;
  readonly label: string;
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

const sourceSchemaCopyByLocale: Record<
  SupportedLocale,
  {
    readonly menuDescription: string;
    readonly menuTitle: string;
    readonly links: Record<SourceSchemaLinkId, SourceSchemaLinkCopy>;
  }
> = {
  en: {
    menuDescription: 'Cloud links for source tables and generated schema proof.',
    menuTitle: 'Revisium schemas',
    links: {
      classesSchema: {
        description: 'Classes reference table and schema proof.',
        label: 'Classes schema',
      },
      cmsDraft: {
        description: 'CMS graph planned for landing, blog, and guide content.',
        label: 'Demo RPG CMS',
      },
      regionsSchema: {
        description: 'Generated schema proof for the regions catalog.',
        label: 'Regions schema',
      },
      regionsTable: {
        description: 'Current generated table used by the atlas catalog.',
        label: 'Regions table',
      },
    },
  },
  ru: {
    menuDescription: 'Ссылки Revisium Cloud на исходные таблицы и сгенерированные схемы.',
    menuTitle: 'Схемы Revisium',
    links: {
      classesSchema: {
        description: 'Справочная таблица классов и подтверждение схемы.',
        label: 'Схема классов',
      },
      cmsDraft: {
        description: 'CMS-граф для главной страницы, блога и гайдов.',
        label: 'Demo RPG CMS',
      },
      regionsSchema: {
        description: 'Сгенерированное подтверждение схемы каталога регионов.',
        label: 'Схема регионов',
      },
      regionsTable: {
        description: 'Текущая сгенерированная таблица для каталога атласа.',
        label: 'Таблица регионов',
      },
    },
  },
  zh: {
    menuDescription: 'Revisium Cloud 中源表和生成 schema 证明的链接。',
    menuTitle: 'Revisium schema',
    links: {
      classesSchema: {
        description: '职业参考表和 schema 证明。',
        label: '职业 schema',
      },
      cmsDraft: {
        description: '用于首页、博客和指南内容的 CMS 图。',
        label: 'Demo RPG CMS',
      },
      regionsSchema: {
        description: '区域目录的生成 schema 证明。',
        label: '区域 schema',
      },
      regionsTable: {
        description: '地图目录使用的当前生成表。',
        label: '区域表',
      },
    },
  },
};

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
    // No app-shell side effects yet.
  }

  public unmount(): void {
    // The app shell owns its mounted language button state; no cleanup is needed.
  }

  public getPrimaryNavItems(
    pathname: string,
  ): readonly ActiveNavigationItem<PrimaryNavigationItem>[] {
    return withActivePrimaryNavigationItems(pathname);
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

  private get sourceSchemaCopy(): (typeof sourceSchemaCopyByLocale)[SupportedLocale] {
    return sourceSchemaCopyByLocale[this.currentLocale] ?? sourceSchemaCopyByLocale.en;
  }
}

container.register(AppLayoutViewModel, () => new AppLayoutViewModel(container.get(LocaleService)), {
  scope: 'transient',
});
