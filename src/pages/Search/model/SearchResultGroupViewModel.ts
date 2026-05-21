import type { SearchGroupResult, SearchRowNode } from '../api/SearchDataSource';
import { SearchResultItemViewModel } from './SearchResultItemViewModel';
import { getSearchTableConfig } from './searchResultConfig';
import type { SearchLocale, SearchPageCopy } from './searchUiCopy';

export class SearchResultGroupViewModel {
  private readonly itemCache = new Map<string, SearchResultItemViewModel>();

  constructor(
    private readonly group: SearchGroupResult,
    private readonly getLocale: () => SearchLocale,
    private readonly getCopy: () => SearchPageCopy,
    private readonly getQuery: () => string,
  ) {}

  public get id(): string {
    return this.group.tableId;
  }

  public get title(): string {
    return this.copy.tableLabel(this.group.tableId).title;
  }

  public get domainLabel(): string {
    return this.copy.domainLabel(this.group.domain);
  }

  public get domainBadgePalette(): 'blue' | 'purple' {
    return this.group.domain === 'cms' ? 'purple' : 'blue';
  }

  public get sourceCode(): string {
    return `${this.group.domain}.${getSearchTableConfig(this.group.tableId).sourceTable}`;
  }

  public get visibleCount(): number {
    return this.group.rows.length;
  }

  public get totalCount(): number {
    return this.group.totalCount;
  }

  public get countLabel(): string {
    const label = this.copy.tableLabel(this.group.tableId).resultLabel;
    return `${this.visibleCount}/${this.totalCount} ${label}`;
  }

  public get overflowLabel(): string | null {
    const hiddenCount = this.totalCount - this.visibleCount;
    return hiddenCount > 0 ? this.copy.resultOverflowLabel(hiddenCount) : null;
  }

  public get items(): readonly SearchResultItemViewModel[] {
    return this.group.rows.map((row) => this.getItemViewModel(row));
  }

  private getItemViewModel(row: SearchRowNode): SearchResultItemViewModel {
    const cached = this.itemCache.get(row.id);
    if (cached) return cached;

    const item = new SearchResultItemViewModel(
      row,
      this.group.tableId,
      this.group.domain,
      this.getLocale,
      this.getCopy,
      this.getQuery,
    );
    this.itemCache.set(row.id, item);
    return item;
  }

  private get copy(): SearchPageCopy {
    return this.getCopy();
  }
}
