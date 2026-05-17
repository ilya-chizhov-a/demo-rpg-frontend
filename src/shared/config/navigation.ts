export interface NavigationItem {
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

export type ActiveNavigationItem<TItem extends NavigationItem = NavigationItem> = TItem & {
  readonly isActive: boolean;
};

export const primaryNavItems: readonly PrimaryNavigationItem[] = [
  { icon: 'home', id: 'home', label: 'Home', to: '/' },
  { icon: 'heroes', id: 'heroes', label: 'Heroes', to: '/heroes' },
  { icon: 'items', id: 'items', label: 'Items', to: '/items' },
  { icon: 'monsters', id: 'monsters', label: 'Monsters', to: '/monsters' },
  { icon: 'world', id: 'world', label: 'World', to: '/regions' },
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
    { label: 'Heroes', to: '/heroes' },
    { label: 'Classes', to: '/classes' },
    { label: 'Abilities', to: '/abilities' },
    { label: 'NPCs', to: '/npcs' },
    { label: 'Parties', to: '/parties' },
  ],
  items: [
    { label: 'Items', to: '/items' },
    { label: 'Item Types', to: '/item-types' },
    { label: 'Stats', to: '/stats' },
    { label: 'Effects', to: '/effects' },
  ],
  quests: [
    { label: 'Quests', to: '/quests' },
    { label: 'Dialogs', to: '/dialogs' },
  ],
  world: [
    { label: 'Regions', to: '/regions' },
    { label: 'Locations', to: '/locations' },
    { label: 'Factions', to: '/factions' },
  ],
} as const satisfies Record<string, readonly NavigationItem[]>;

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
): readonly ActiveNavigationItem<PrimaryNavigationItem>[] {
  return primaryNavItems.map((item) => ({
    ...item,
    isActive: (item.activeTargets ?? primaryActiveRoutesByTarget[item.to] ?? [item.to]).some(
      (target) => isRouteActive(pathname, target),
    ),
  }));
}

export function getSectionNavigationItems(
  sectionKey: SectionNavKey,
  pathname: string,
): readonly ActiveNavigationItem[] {
  return withActiveNavigationItems(sectionNavItems[sectionKey], pathname);
}
