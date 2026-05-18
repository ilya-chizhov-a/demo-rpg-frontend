interface HomeDemoPathItemParams {
  readonly actionLabel: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly index: number;
  readonly stepLabel: string;
}

export class HomeDemoPathItemViewModel {
  public readonly actionLabel: string;
  public readonly title: string;
  public readonly description: string;
  public readonly href: string;
  private readonly index: number;
  private readonly stepLabelTemplate: string;

  constructor(params: HomeDemoPathItemParams) {
    this.actionLabel = params.actionLabel;
    this.title = params.title;
    this.description = params.description;
    this.href = params.href;
    this.index = params.index;
    this.stepLabelTemplate = params.stepLabel;
  }

  public get key(): string {
    return this.href;
  }

  public get stepLabel(): string {
    return this.stepLabelTemplate.replace('{index}', String(this.index + 1));
  }
}
