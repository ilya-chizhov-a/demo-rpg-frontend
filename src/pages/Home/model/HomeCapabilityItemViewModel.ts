export type HomeCapabilityStatus = 'live' | 'next' | 'blocked';
export type HomeCapabilityStatusPalette = 'gray' | 'green' | 'purple';

interface HomeCapabilityItemParams {
  readonly title: string;
  readonly actionLabel: string;
  readonly description: string;
  readonly label: string;
  readonly href: string;
  readonly status: HomeCapabilityStatus;
  readonly statusLabel: string;
}

const statusPalette: Record<HomeCapabilityStatus, HomeCapabilityStatusPalette> = {
  blocked: 'gray',
  live: 'green',
  next: 'purple',
};

export class HomeCapabilityItemViewModel {
  public readonly title: string;
  public readonly actionLabel: string;
  public readonly description: string;
  public readonly label: string;
  public readonly href: string;
  public readonly status: HomeCapabilityStatus;
  private readonly statusLabelValue: string;

  constructor(params: HomeCapabilityItemParams) {
    this.title = params.title;
    this.actionLabel = params.actionLabel;
    this.description = params.description;
    this.label = params.label;
    this.href = params.href;
    this.status = params.status;
    this.statusLabelValue = params.statusLabel;
  }

  public get key(): string {
    return this.href;
  }

  public get statusLabel(): string {
    return this.statusLabelValue;
  }

  public get statusPalette(): HomeCapabilityStatusPalette {
    return statusPalette[this.status];
  }
}
