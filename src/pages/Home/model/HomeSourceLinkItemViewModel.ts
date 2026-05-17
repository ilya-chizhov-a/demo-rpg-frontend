interface HomeSourceLinkItemParams {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

export class HomeSourceLinkItemViewModel {
  public readonly title: string;
  public readonly description: string;
  public readonly href: string;

  constructor(params: HomeSourceLinkItemParams) {
    this.title = params.title;
    this.description = params.description;
    this.href = params.href;
  }

  public get key(): string {
    return this.href;
  }

  public get isExternal(): boolean {
    return this.href.startsWith('http://') || this.href.startsWith('https://');
  }

  public get target(): string | undefined {
    return this.isExternal ? '_blank' : undefined;
  }

  public get rel(): string | undefined {
    return this.isExternal ? 'noreferrer' : undefined;
  }
}
