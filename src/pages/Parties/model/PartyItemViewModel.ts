import { makeAutoObservable } from 'mobx';

import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { PartyNode } from '../api/PartiesDataSource';
import { PartyMemberViewModel } from './PartyMemberViewModel';

export type PartyLocale = SupportedLocale;

export class PartyItemViewModel {
  private readonly memberCache = new Map<string, PartyMemberViewModel>();

  constructor(
    private readonly node: PartyNode,
    private readonly getLocale: () => PartyLocale,
    private readonly getNoMottoCopy: () => string,
    private readonly getUnknownHeroLabel: () => string,
  ) {
    makeAutoObservable<
      this,
      'memberCache' | 'node' | 'getLocale' | 'getNoMottoCopy' | 'getUnknownHeroLabel'
    >(
      this,
      {
        getLocale: false,
        getNoMottoCopy: false,
        getUnknownHeroLabel: false,
        memberCache: false,
        node: false,
      },
      { autoBind: true },
    );
  }

  public get id(): string {
    return this.node.id;
  }

  public get detailHref(): string {
    return `/parties/${this.node.id}`;
  }

  public get title(): string {
    return this.localized(this.node.data.name) || this.node.id;
  }

  public get motto(): string {
    return this.localized(this.node.data.motto) || this.getNoMottoCopy();
  }

  public get formation(): string {
    return this.node.data.formation;
  }

  public get memberCount(): number {
    return this.node.data.member_count;
  }

  public get isFull(): boolean {
    return this.node.data.is_full;
  }

  public get members(): readonly PartyMemberViewModel[] {
    return this.node.data.hero_ids.map((hero) => this.getMemberViewModel(hero));
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.getLocale());
  }

  public get usesLocaleFallback(): boolean {
    const locale = this.getLocale();
    return (
      !this.node.data.name[locale] ||
      !this.node.data.motto[locale] ||
      this.node.data.hero_ids.some(
        (hero) => !hero.data.name[locale] || !hero.data.epithet[locale],
      )
    );
  }

  private getMemberViewModel(hero: PartyNode['data']['hero_ids'][number]): PartyMemberViewModel {
    const cached = this.memberCache.get(hero.id);
    if (cached) return cached;

    const item = new PartyMemberViewModel(
      hero,
      () => this.getLocale(),
      () => this.getUnknownHeroLabel(),
    );
    this.memberCache.set(hero.id, item);
    return item;
  }

  private localized(value: Record<PartyLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }
}
