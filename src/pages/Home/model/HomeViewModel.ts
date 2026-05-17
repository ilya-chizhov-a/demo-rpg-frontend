import { makeAutoObservable } from 'mobx';

import type { IViewModel } from 'src/shared/config';
import { container } from 'src/shared/lib';
import {
  HomeCapabilityItemViewModel,
  type HomeCapabilityStatus,
} from './HomeCapabilityItemViewModel';
import { HomeDemoPathItemViewModel } from './HomeDemoPathItemViewModel';
import { HomeProofItemViewModel } from './HomeProofItemViewModel';
import { HomeSourceLinkItemViewModel } from './HomeSourceLinkItemViewModel';

interface HomeCta {
  readonly label: string;
  readonly href: string;
}

interface HomeHeroBadge {
  readonly label: string;
  readonly palette: 'blue' | 'green' | 'purple';
}

interface HomeHeroContent {
  readonly badges: readonly HomeHeroBadge[];
  readonly title: string;
  readonly subtitle: string;
  readonly primaryCta: HomeCta;
  readonly secondaryCta: HomeCta;
  readonly fallbackNote: string;
  readonly fallbackLink: HomeCta;
}

interface HomeSectionContent {
  readonly title: string;
  readonly description?: string;
}

type CapabilityRow = readonly [
  title: string,
  description: string,
  label: string,
  href: string,
  status: HomeCapabilityStatus,
];
type DemoPathRow = readonly [title: string, description: string, href: string];
type ProofRow = readonly [label: string, value: string, bg: string, border: string, color: string];
type SourceLinkRow = readonly [title: string, description: string, href: string];

const heroContent: HomeHeroContent = {
  badges: [
    { label: 'codex', palette: 'blue' },
    { label: 'world atlas', palette: 'purple' },
    { label: 'guides', palette: 'green' },
  ],
  title: 'Branching Tales',
  subtitle: 'A public RPG database for heroes, items, monsters, regions, quests, and guides.',
  primaryCta: { label: 'Browse heroes', href: '/heroes' },
  secondaryCta: { label: 'Search codex', href: '/search' },
  fallbackNote:
    'The current home uses committed fallback copy while database and guide sections are filled in.',
  fallbackLink: { label: 'Start with the world atlas.', href: '/regions' },
};

const capabilitySection: HomeSectionContent = {
  title: 'Featured databases',
  description:
    'Jump into the main codex sections. Routes still in delivery keep their implementation status visible.',
};

const demoPathsSection: HomeSectionContent = {
  title: 'Codex paths',
  description: 'Start with a catalog, then move into related guides, world lore, and search.',
};

const sourceLinksSection: HomeSectionContent = {
  title: 'Latest guides and world preview',
};

const demoPathsCta: HomeCta = {
  label: 'Open world atlas',
  href: '/regions',
};

const capabilityRows: readonly CapabilityRow[] = [
  [
    'Heroes',
    'Browse playable characters, roles, class links, abilities, and build hooks.',
    'Characters',
    '/heroes',
    'next',
  ],
  [
    'Items',
    'Inspect weapons, gear, item types, stats, effects, and reward links.',
    'Equipment',
    '/items',
    'next',
  ],
  [
    'Monsters',
    'Track enemies, drops, factions, abilities, and encounter notes.',
    'Bestiary',
    '/monsters',
    'next',
  ],
  [
    'World',
    'Open regions now, then follow locations and factions as the atlas expands.',
    'Atlas',
    '/regions',
    'live',
  ],
  [
    'Quests',
    'Follow quest chains, NPCs, locations, repeatable flags, and rewards.',
    'Journal',
    '/quests',
    'next',
  ],
  [
    'Guides',
    'Read articles and updates from the guide catalog while news remains blocked.',
    'Articles',
    '/blog',
    'next',
  ],
];

const demoPathRows: readonly DemoPathRow[] = [
  ['Browse a catalog', 'Start with heroes, items, monsters, or the world atlas.', '/heroes'],
  [
    'Open related sections',
    'Use section tabs to move between classes, abilities, NPCs, and parties.',
    '/classes',
  ],
  [
    'Search the codex',
    'Search routes are wired now and will expand across data and articles.',
    '/search',
  ],
  [
    'Read guides',
    'Guide articles live under the blog route until a separate news source exists.',
    '/blog',
  ],
];

const proofRows: readonly ProofRow[] = [
  [
    'Explore',
    'Heroes and classes',
    'rgba(56, 189, 248, 0.16)',
    'rgba(56, 189, 248, 0.4)',
    '#7dd3fc',
  ],
  ['Collect', 'Items and stats', 'rgba(52, 211, 153, 0.14)', 'rgba(52, 211, 153, 0.36)', '#86efac'],
  [
    'Hunt',
    'Monsters and drops',
    'rgba(167, 139, 250, 0.16)',
    'rgba(167, 139, 250, 0.38)',
    '#c4b5fd',
  ],
  [
    'Travel',
    'Regions and factions',
    'rgba(45, 212, 191, 0.14)',
    'rgba(45, 212, 191, 0.34)',
    '#5eead4',
  ],
];

const sourceLinkRows: readonly SourceLinkRow[] = [
  ['Starter guide', 'A route for launch notes, systems guides, and companion articles.', '/blog'],
  [
    'World preview',
    'Begin with the implemented regions catalog and expand into locations.',
    '/regions',
  ],
  ['Faction index', 'Track alliances, conflicts, and crest-led faction profiles.', '/factions'],
  [
    'Quest journal',
    'Follow quest chains, NPC handoffs, and reward routes as they are delivered.',
    '/quests',
  ],
];

export class HomeViewModel implements IViewModel {
  private readonly capabilityItems = capabilityRows.map(
    ([title, description, label, href, status]) =>
      new HomeCapabilityItemViewModel({ title, description, label, href, status }),
  );
  private readonly demoPathItems = demoPathRows.map(
    ([title, description, href], index) =>
      new HomeDemoPathItemViewModel({ title, description, href, index }),
  );
  private readonly proofItems = proofRows.map(
    ([label, value, bg, border, color], index) =>
      new HomeProofItemViewModel({ label, value, bg, border, color, index }),
  );
  private readonly sourceLinkItems = sourceLinkRows.map(
    ([title, description, href]) => new HomeSourceLinkItemViewModel({ title, description, href }),
  );

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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

  public get hero(): HomeHeroContent {
    return heroContent;
  }

  public get capabilitySection(): HomeSectionContent {
    return capabilitySection;
  }

  public get demoPathsSection(): HomeSectionContent {
    return demoPathsSection;
  }

  public get sourceLinksSection(): HomeSectionContent {
    return sourceLinksSection;
  }

  public get demoPathsCta(): HomeCta {
    return demoPathsCta;
  }

  public get capabilities(): readonly HomeCapabilityItemViewModel[] {
    return this.capabilityItems;
  }

  public get demoPaths(): readonly HomeDemoPathItemViewModel[] {
    return this.demoPathItems;
  }

  public get proofNodes(): readonly HomeProofItemViewModel[] {
    return this.proofItems;
  }

  public get sourceLinks(): readonly HomeSourceLinkItemViewModel[] {
    return this.sourceLinkItems;
  }
}

container.register(HomeViewModel, () => new HomeViewModel(), { scope: 'transient' });
