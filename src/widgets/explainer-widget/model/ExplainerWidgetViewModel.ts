import { makeAutoObservable } from 'mobx';

import type { IViewModel } from 'src/shared/config';
import { container } from 'src/shared/lib';
import { LocaleService, type UiCopy } from 'src/shared/model';

export type ExplainerTechnicalSectionId =
  | 'graphql'
  | 'rest'
  | 'mcp'
  | 'variables'
  | 'responseSample'
  | 'federationSdl';

export class ExplainerWidgetViewModel implements IViewModel {
  public isOpen = false;
  private readonly openTechnicalSections = new Set<ExplainerTechnicalSectionId>();

  constructor(private readonly localeService: LocaleService) {
    makeAutoObservable<this, 'localeService'>(
      this,
      {
        localeService: false,
      },
      { autoBind: true },
    );
  }

  public setup(): void {
    // No route or descriptor setup required.
  }

  public mount(): void {
    // Pure UI state; no side effects.
  }

  public unmount(): void {
    this.isOpen = false;
    this.openTechnicalSections.clear();
  }

  public close(): void {
    this.isOpen = false;
  }

  public toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  public isTechnicalSectionOpen(section: ExplainerTechnicalSectionId): boolean {
    return this.openTechnicalSections.has(section);
  }

  public toggleTechnicalSection(section: ExplainerTechnicalSectionId): void {
    if (this.openTechnicalSections.has(section)) {
      this.openTechnicalSections.delete(section);
      return;
    }
    this.openTechnicalSections.add(section);
  }

  public get copy(): UiCopy['explainer'] {
    return this.localeService.ui.explainer;
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }
}

container.register(
  ExplainerWidgetViewModel,
  () => new ExplainerWidgetViewModel(container.get(LocaleService)),
  { scope: 'transient' },
);
