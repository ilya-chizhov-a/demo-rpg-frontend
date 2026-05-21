import type { SearchDomain, SearchRowNode, SearchTableId } from '../api/SearchDataSource';
import {
  createSearchSnippets,
  createSearchTitle,
  formatSearchDate,
  type SearchSnippet,
} from './searchJson';
import {
  getCloudRowHref,
  getSearchTableConfig,
  type SearchTableConfig,
} from './searchResultConfig';
import type { SearchLocale, SearchPageCopy } from './searchUiCopy';

export class SearchResultItemViewModel {
  private readonly config: SearchTableConfig;

  constructor(
    private readonly row: SearchRowNode,
    tableId: SearchTableId,
    private readonly domain: SearchDomain,
    private readonly getLocale: () => SearchLocale,
    private readonly getCopy: () => SearchPageCopy,
    private readonly getQuery: () => string,
  ) {
    this.config = getSearchTableConfig(tableId);
  }

  public get id(): string {
    return this.row.id;
  }

  public get title(): string {
    return createSearchTitle(this.row.json, this.config.titlePaths, this.locale, this.row.id);
  }

  public get metadataLabel(): string {
    return `${this.copy.metadataLabel}: ${formatSearchDate(this.row.updatedAt, this.locale)}`;
  }

  public get resultHref(): string {
    return this.appHref ?? this.sourceHref;
  }

  public get sourceHref(): string {
    return getCloudRowHref(this.config, this.row.id);
  }

  public get isExternalResult(): boolean {
    return this.appHref === null;
  }

  public get resultActionLabel(): string {
    return this.isExternalResult ? this.copy.openSourceActionLabel : this.copy.openResultActionLabel;
  }

  public get sourceCode(): string {
    return `${this.domain}.${this.config.sourceTable}`;
  }

  public get snippets(): readonly SearchSnippet[] {
    return createSearchSnippets(
      this.row.json,
      this.getQuery(),
      this.locale,
      this.copy.snippetFallbackLabel,
    );
  }

  private get appHref(): string | null {
    return this.config.appHref(this.row.id, this.row.json);
  }

  private get locale(): SearchLocale {
    return this.getLocale();
  }

  private get copy(): SearchPageCopy {
    return this.getCopy();
  }
}
