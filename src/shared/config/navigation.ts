export interface NavigationItem {
  readonly label: string;
  readonly to: string;
}

export interface ActiveNavigationItem extends NavigationItem {
  readonly isActive: boolean;
}

export const primaryNavItems: readonly NavigationItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Heroes', to: '/heroes' },
  { label: 'Items', to: '/items' },
  { label: 'Monsters', to: '/monsters' },
  { label: 'World', to: '/regions' },
  { label: 'Quests', to: '/quests' },
  { label: 'Guides', to: '/blog' },
  { label: 'Search', to: '/search' },
] as const;

const primaryActiveRoutes = {
  '/': ['/'],
  '/blog': ['/blog', '/news', '/balance-patch'],
  '/heroes': ['/heroes', '/classes', '/abilities', '/npcs', '/parties'],
  '/items': ['/items', '/item-types', '/stats', '/effects'],
  '/monsters': ['/monsters'],
  '/quests': ['/quests', '/dialogs'],
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
): readonly ActiveNavigationItem[] {
  return primaryNavItems.map((item) => ({
    ...item,
    isActive: (primaryActiveRoutesByTarget[item.to] ?? [item.to]).some((target) =>
      isRouteActive(pathname, target),
    ),
  }));
}

export function getSectionNavigationItems(
  sectionKey: SectionNavKey,
  pathname: string,
): readonly ActiveNavigationItem[] {
  return withActiveNavigationItems(sectionNavItems[sectionKey], pathname);
}
