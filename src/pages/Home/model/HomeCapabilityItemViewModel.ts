export type HomeCapabilityStatus = 'live' | 'next' | 'blocked';
export type HomeCapabilityStatusPalette = 'gray' | 'green' | 'purple';

interface HomeCapabilityItemParams {
  readonly title: string;
  readonly description: string;
  readonly label: string;
  readonly href: string;
  readonly status: HomeCapabilityStatus;
}

const statusLabel: Record<HomeCapabilityStatus, string> = {
  blocked: 'blocked',
  live: 'live',
  next: 'next',
};

const statusPalette: Record<HomeCapabilityStatus, HomeCapabilityStatusPalette> = {
  blocked: 'gray',
  live: 'green',
  next: 'purple',
};

const actionLabel = 'Open section';

export class HomeCapabilityItemViewModel {
  public readonly title: string;
  public readonly description: string;
  public readonly label: string;
  public readonly href: string;
  public readonly status: HomeCapabilityStatus;

  constructor(params: HomeCapabilityItemParams) {
    this.title = params.title;
    this.description = params.description;
    this.label = params.label;
    this.href = params.href;
    this.status = params.status;
  }

  public get key(): string {
    return this.href;
  }

  public get statusLabel(): string {
    return statusLabel[this.status];
  }

  public get statusPalette(): HomeCapabilityStatusPalette {
    return statusPalette[this.status];
  }

  public get actionLabel(): string {
    return actionLabel;
  }
}
