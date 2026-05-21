import { runInAction } from 'mobx';
import {
  Demo_Rpg_CmsGetBlog_PostsesOrderByField,
  Demo_Rpg_CmsSortOrder,
  type Demo_Rpg_CmsGetBlog_PostsesOrderByInput,
} from 'src/__generated__/graphql-request';
import type { ActiveNavigationItem, IViewModel } from 'src/shared/config';
import {
  container,
  createCatalogViewStateFromRequest,
  createLocaleFallbacks,
  makeAutoBoundObservable,
  replaceCatalogItems,
  resetCatalogRequestState,
  shouldRequestInitialData,
  type CatalogViewState,
} from 'src/shared/lib';
import { LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import { BlogDataSource, type BlogPostNode, type BlogPostsRequestData } from '../api/BlogDataSource';
import { BlogPostItemViewModel } from './BlogPostItemViewModel';
import { getGuidesCopy, type BlogPageCopy, type GuideLocale } from './guideCopy';
import { getGuideSectionNavigationItems } from './guideSectionNavigation';

const BLOG_PAGE_SIZE = 12;

const BLOG_POSTS_QUERY = `query BlogPosts($data: Demo_rpg_cmsGetBlog_postsesInput) {
  blog_postses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          author_id { id data { avatar { fileName height mimeType size status url width } bio { en ru zh } name { en ru zh } slug } }
          body { en ru zh }
          excerpt { en ru zh }
          hero_image { fileName height mimeType size status url width }
          published_at
          slug
          title { en ru zh }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class BlogViewModel implements IViewModel {
  public isFilterSheetOpen = false;
  public searchTerm = '';
  private readonly itemCache = new Map<string, BlogPostItemViewModel>();
  private readonly loadedItems: BlogPostNode[] = [];

  constructor(
    public readonly dataSource: BlogDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'itemCache' | 'localeService'>(this, {
      itemCache: false,
      localeService: false,
    });
  }

  public setup(): void {
    // Blog has no route params.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    resetCatalogRequestState(this.dataSource, this.loadedItems, this.itemCache);
  }

  public get items(): readonly BlogPostItemViewModel[] {
    const normalizedSearch = this.normalizedSearchTerm;
    const items = this.loadedItems.map((node) => this.getItemViewModel(node));
    if (!normalizedSearch) return items;
    return items.filter((item) => item.searchText.includes(normalizedSearch));
  }

  public get featuredItem(): BlogPostItemViewModel | null {
    return this.items[0] ?? null;
  }

  public get listItems(): readonly BlogPostItemViewModel[] {
    return this.items.slice(this.featuredItem ? 1 : 0);
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewStateFromRequest(
      this.dataSource.request,
      this.loadedItems,
      this.items.length,
    );
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getGuideSectionNavigationItems(this.guidesCopy.sectionItems, '/blog');
  }

  public get copy(): BlogPageCopy {
    return this.guidesCopy.blog;
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public get locale(): GuideLocale {
    return this.localeService.locale;
  }

  public get payloadPreview(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      locale: this.locale,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
      searchTerm: this.searchTerm,
    };
  }

  public get payloadPreviewJson(): string {
    return JSON.stringify(this.payloadPreview, null, 2);
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-cms/schema/blog_posts',
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-cms/master/draft/blog_posts',
      },
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['cms'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'BlogPosts',
          request: BLOG_POSTS_QUERY,
        },
      },
      variables: this.payloadPreview,
    };
  }

  public setSearchTerm(value: string): void {
    this.searchTerm = value;
  }

  public openFilterSheet(): void {
    this.isFilterSheetOpen = true;
  }

  public closeFilterSheet(): void {
    this.isFilterSheetOpen = false;
  }

  public async clearSearch(): Promise<void> {
    this.searchTerm = '';
    if (!this.dataSource.request.isLoaded) {
      await this.loadInitial();
    }
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    if (!this.catalogState.canLoadMore) return;
    const result = await this.dataSource.request.fetch(this.nextPageRequestData);
    if (result.ok) {
      runInAction(() => {
        this.loadedItems.push(...result.value.items);
      });
    }
  }

  private async loadInitial(): Promise<void> {
    const result = await this.dataSource.request.fetch(this.currentRequestData);
    if (result.ok) {
      runInAction(() => {
        replaceCatalogItems(this.loadedItems, this.itemCache, result.value.items);
      });
    }
  }

  private get guidesCopy() {
    return getGuidesCopy(this.locale);
  }

  private get currentRequestData(): BlogPostsRequestData {
    return {
      first: BLOG_PAGE_SIZE,
      orderBy: this.currentOrderBy,
    };
  }

  private get nextPageRequestData(): BlogPostsRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get currentOrderBy(): Demo_Rpg_CmsGetBlog_PostsesOrderByInput[] {
    return [
      {
        direction: Demo_Rpg_CmsSortOrder.Desc,
        field: Demo_Rpg_CmsGetBlog_PostsesOrderByField.PublishedAt,
      },
    ];
  }

  private get normalizedSearchTerm(): string {
    return this.searchTerm.trim().toLowerCase();
  }

  private getItemViewModel(node: BlogPostNode): BlogPostItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new BlogPostItemViewModel(
      node,
      () => this.locale,
      () => this.copy,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      edges: this.loadedItems.slice(0, 3).map((node) => ({
        author: node.data.author_id.data.name[this.locale],
        heroImage: {
          fileName: node.data.hero_image.fileName,
          url: node.data.hero_image.url,
        },
        id: node.id,
        publishedAt: node.data.published_at,
        slug: node.data.slug,
        title: node.data.title[this.locale],
      })),
      pageInfo: this.dataSource.request.data.pageInfo,
      totalCount: this.catalogState.totalCount,
      visibleCount: this.catalogState.visibleCount,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.loadedItems.flatMap((node) =>
      createLocaleFallbacks(
        this.locale,
        [
          { path: `blog_posts.${node.id}.data.title`, value: node.data.title },
          { path: `blog_posts.${node.id}.data.excerpt`, value: node.data.excerpt },
          { path: `blog_posts.${node.id}.data.author_id.data.name`, value: node.data.author_id.data.name },
        ],
        'en',
      ),
    );
  }
}

container.register(
  BlogViewModel,
  () => new BlogViewModel(container.get(BlogDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
