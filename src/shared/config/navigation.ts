export interface NavigationItem {
  readonly label: string;
  readonly to: string;
}

export type PrimaryNavigationIcon = 'about' | 'classes' | 'data' | 'home' | 'regions' | 'search';

export interface PrimaryNavigationItem extends NavigationItem {
  readonly activeTargets?: readonly string[];
  readonly id: PrimaryNavigationIcon;
  readonly icon: PrimaryNavigationIcon;
}

export type ActiveNavigationItem<TItem extends NavigationItem = NavigationItem> = TItem & {
  readonly isActive: boolean;
};

const dataPrimaryActiveTargets = [
  '/abilities',
  '/dialogs',
  '/effects',
  '/heroes',
  '/items',
  '/item-types',
  '/monsters',
  '/npcs',
  '/parties',
  '/quests',
  '/stats',
] as const;

export const primaryNavItems: readonly PrimaryNavigationItem[] = [
  { icon: 'home', id: 'home', label: 'Home', to: '/' },
  {
    activeTargets: dataPrimaryActiveTargets,
    icon: 'data',
    id: 'data',
    label: 'Data',
    to: '/regions',
  },
  { icon: 'regions', id: 'regions', label: 'Regions', to: '/regions' },
  { icon: 'classes', id: 'classes', label: 'Classes', to: '/classes' },
  { icon: 'search', id: 'search', label: 'Search', to: '/search' },
  { icon: 'about', id: 'about', label: 'About', to: '/about' },
] as const;

const primaryActiveRoutes = {
  '/': ['/'],
  '/about': ['/about', '/blog', '/news', '/balance-patch'],
  '/classes': ['/classes'],
  '/regions': ['/regions', '/locations', '/factions'],
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
