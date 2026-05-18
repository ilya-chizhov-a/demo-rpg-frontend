export interface NavigationItem {
  readonly id?: string;
  readonly label: string;
  readonly to: string;
}

export type PrimaryNavigationIcon =
  | 'about'
  | 'classes'
  | 'data'
  | 'guides'
  | 'heroes'
  | 'home'
  | 'items'
  | 'monsters'
  | 'quests'
  | 'regions'
  | 'search'
  | 'world';

export type PrimaryNavigationId =
  | 'guides'
  | 'heroes'
  | 'home'
  | 'items'
  | 'monsters'
  | 'quests'
  | 'search'
  | 'world';

export interface PrimaryNavigationItem extends NavigationItem {
  readonly activeTargets?: readonly string[];
  readonly id: PrimaryNavigationId;
  readonly icon: PrimaryNavigationIcon;
}

export type SectionNavigationItemId =
  | 'abilities'
  | 'classes'
  | 'dialogs'
  | 'effects'
  | 'factions'
  | 'heroes'
  | 'items'
  | 'itemTypes'
  | 'locations'
  | 'npcs'
  | 'parties'
  | 'quests'
  | 'regions'
  | 'stats';

export interface SectionNavigationItem extends NavigationItem {
  readonly id: SectionNavigationItemId;
}

export type ActiveNavigationItem<TItem extends NavigationItem = NavigationItem> = TItem & {
  readonly isActive: boolean;
};

export interface NavigationCopy {
  readonly primary: Record<PrimaryNavigationId, string>;
  readonly section: Record<SectionNavigationItemId, string>;
}

const defaultNavigationCopy: NavigationCopy = {
  primary: {
    guides: 'Guides',
    heroes: 'Heroes',
    home: 'Home',
    items: 'Items',
    monsters: 'Monsters',
    quests: 'Quests',
    search: 'Search',
    world: 'World',
  },
  section: {
    abilities: 'Abilities',
    classes: 'Classes',
    dialogs: 'Dialogs',
    effects: 'Effects',
    factions: 'Factions',
    heroes: 'Heroes',
    items: 'Items',
    itemTypes: 'Item Types',
    locations: 'Locations',
    npcs: 'NPCs',
    parties: 'Parties',
    quests: 'Quests',
    regions: 'Regions',
    stats: 'Stats',
  },
};

export const primaryNavItems: readonly PrimaryNavigationItem[] = [
  { icon: 'home', id: 'home', label: 'Home', to: '/' },
  { icon: 'world', id: 'world', label: 'World', to: '/regions' },
  { icon: 'heroes', id: 'heroes', label: 'Heroes', to: '/heroes' },
  { icon: 'items', id: 'items', label: 'Items', to: '/items' },
  { icon: 'monsters', id: 'monsters', label: 'Monsters', to: '/monsters' },
  { icon: 'quests', id: 'quests', label: 'Quests', to: '/quests' },
  { icon: 'guides', id: 'guides', label: 'Guides', to: '/blog' },
  { icon: 'search', id: 'search', label: 'Search', to: '/search' },
] as const;

const primaryActiveRoutes = {
  '/': ['/'],
  '/blog': ['/about', '/balance-patch', '/blog', '/news'],
  '/heroes': ['/abilities', '/classes', '/heroes', '/npcs', '/parties'],
  '/items': ['/effects', '/items', '/item-types', '/stats'],
  '/monsters': ['/monsters'],
  '/regions': ['/regions', '/locations', '/factions'],
  '/quests': ['/dialogs', '/quests'],
  '/search': ['/search'],
} as const satisfies Record<string, readonly string[]>;

const primaryActiveRoutesByTarget: Record<string, readonly string[]> = primaryActiveRoutes;

export const sectionNavItems = {
  heroes: [
    { id: 'heroes', label: 'Heroes', to: '/heroes' },
    { id: 'classes', label: 'Classes', to: '/classes' },
    { id: 'abilities', label: 'Abilities', to: '/abilities' },
    { id: 'npcs', label: 'NPCs', to: '/npcs' },
    { id: 'parties', label: 'Parties', to: '/parties' },
  ],
  items: [
    { id: 'items', label: 'Items', to: '/items' },
    { id: 'itemTypes', label: 'Item Types', to: '/item-types' },
    { id: 'stats', label: 'Stats', to: '/stats' },
    { id: 'effects', label: 'Effects', to: '/effects' },
  ],
  quests: [
    { id: 'quests', label: 'Quests', to: '/quests' },
    { id: 'dialogs', label: 'Dialogs', to: '/dialogs' },
  ],
  world: [
    { id: 'regions', label: 'Regions', to: '/regions' },
    { id: 'locations', label: 'Locations', to: '/locations' },
    { id: 'factions', label: 'Factions', to: '/factions' },
  ],
} as const satisfies Record<string, readonly SectionNavigationItem[]>;

export type SectionNavKey = keyof typeof sectionNavItems;

export function isRouteActive(pathname: string, target: string): boolean {
  return target === '/'
    ? pathname === '/'
    : pathname === target || pathname.startsWith(`${target}/`);
}

export function withActiveNavigationItems(
  items: readonly NavigationItem[],
  pathname: string,
): readonly ActiveNavigationItem[] {
  return items.map((item) => ({
    ...item,
    isActive: isRouteActive(pathname, item.to),
  }));
}

export function withActivePrimaryNavigationItems(
  pathname: string,
  copy: NavigationCopy = defaultNavigationCopy,
): readonly ActiveNavigationItem<PrimaryNavigationItem>[] {
  return primaryNavItems.map((item) => ({
    ...item,
    label: copy.primary[item.id],
    isActive: (item.activeTargets ?? primaryActiveRoutesByTarget[item.to] ?? [item.to]).some(
      (target) => isRouteActive(pathname, target),
    ),
  }));
}

export function getSectionNavigationItems(
  sectionKey: SectionNavKey,
  pathname: string,
  copy: NavigationCopy = defaultNavigationCopy,
): readonly ActiveNavigationItem[] {
  return withActiveNavigationItems(
    sectionNavItems[sectionKey].map((item) => ({
      ...item,
      label: copy.section[item.id],
    })),
    pathname,
  );
}
