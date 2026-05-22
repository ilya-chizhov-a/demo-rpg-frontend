export type HomeCapabilityArtworkKind =
  | 'guides'
  | 'heroes'
  | 'items'
  | 'monsters'
  | 'quests'
  | 'world';

const artworkKindByHref: Record<string, HomeCapabilityArtworkKind> = {
  '/blog': 'guides',
  '/heroes': 'heroes',
  '/items': 'items',
  '/monsters': 'monsters',
  '/quests': 'quests',
  '/regions': 'world',
};

const artworkImageSrcByHref: Partial<Record<string, string>> = {
  '/blog': '/assets/home/cards/guides-codex-notes.png',
  '/heroes': '/assets/home/cards/heroes-class-web.png',
  '/items': '/assets/home/cards/items-gear-schematic.png',
  '/monsters': '/assets/home/cards/monsters-bestiary-threats.png',
  '/quests': '/assets/home/cards/quests-branching-paths.png',
  '/regions': '/assets/home/cards/world-atlas-routes.png',
};

interface HomeCapabilityItemParams {
  readonly title: string;
  readonly actionLabel: string;
  readonly description: string;
  readonly href: string;
}

export class HomeCapabilityItemViewModel {
  public readonly title: string;
  public readonly actionLabel: string;
  public readonly description: string;
  public readonly href: string;

  constructor(params: HomeCapabilityItemParams) {
    this.title = params.title;
    this.actionLabel = params.actionLabel;
    this.description = params.description;
    this.href = params.href;
  }

  public get key(): string {
    return this.href;
  }

  public get artworkKind(): HomeCapabilityArtworkKind {
    return artworkKindByHref[this.href] ?? 'world';
  }

  public get artworkImageSrc(): string | null {
    return artworkImageSrcByHref[this.href] ?? null;
  }
}
