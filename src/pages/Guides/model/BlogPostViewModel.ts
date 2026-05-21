import {
  Demo_Rpg_CmsGetBlog_PostsesOrderByField,
  Demo_Rpg_CmsSortOrder,
} from 'src/__generated__/graphql-request';
import type { ActiveNavigationItem, IViewModel } from 'src/shared/config';
import {
  container,
  createDetailViewStateFromRequest,
  createLocaleFallbacks,
  hasRequestError,
  isInitialLoading,
  isRefreshing,
  makeAutoBoundObservable,
  type DetailViewState,
  type PreparedImageSlot,
} from 'src/shared/lib';
import { getLocaleNativeLabel, LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  BlogPostDataSource,
  type BlogPostDetailNode,
  type BlogPostsRequestData,
} from '../api/BlogDataSource';
import {
  getBlogImageMetadata,
  prepareBlogAuthorAvatar,
  prepareBlogHeroImage,
} from './blogImages';
import {
  getGuidesCopy,
  type BlogPostDetailCopy,
  type GuideLocale,
} from './guideCopy';
import { getGuideSectionNavigationItems } from './guideSectionNavigation';
import { parseTrustedMarkdown, type BlogMarkdownBlock } from './markdownBlocks';

type LocalizedBlogText = Record<GuideLocale, string>;

const BLOG_POST_QUERY = `query BlogPostBySlug($data: Demo_rpg_cmsGetBlog_postsesInput) {
  blog_postses(data: $data) {
    edges {
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

export class BlogPostViewModel implements IViewModel {
  public readonly backHref = '/blog';
  public slug = '';

  constructor(
    public readonly dataSource: BlogPostDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'localeService'>(this, {
      localeService: false,
    });
  }

  public setup(slug?: unknown): void {
    this.slug = typeof slug === 'string' ? slug : '';
  }

  public async mount(): Promise<void> {
    if (!this.slug || this.dataSource.request.isLoading || this.dataSource.request.isLoaded) return;
    await this.load();
  }

  public unmount(): void {
    this.dataSource.reset();
  }

  public get item(): BlogPostDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get viewState(): DetailViewState {
    return createDetailViewStateFromRequest(this.dataSource.request, {
      hasId: Boolean(this.slug),
      hasItem: Boolean(this.item),
    });
  }

  public get title(): string {
    return this.localized(this.item?.data.title) || this.slug || this.copy.unknownValue;
  }

  public get excerpt(): string {
    return this.localized(this.item?.data.excerpt) || this.copy.noExcerpt;
  }

  public get bodyBlocks(): readonly BlogMarkdownBlock[] {
    const body = this.localized(this.item?.data.body);
    return body ? parseTrustedMarkdown(body) : [{ kind: 'paragraph', text: this.copy.noBody }];
  }

  public get authorName(): string {
    const author = this.item?.data.author_id;
    if (!author) return this.copy.unknownValue;
    return this.localized(author.data.name) || author.data.slug || author.id;
  }

  public get authorBio(): string {
    return this.localized(this.item?.data.author_id.data.bio) || this.copy.unknownValue;
  }

  public get authorAvatar(): PreparedImageSlot | null {
    if (!this.item) return null;
    return prepareBlogAuthorAvatar(this.item.data.author_id.data.avatar, this.authorName);
  }

  public get heroImage(): PreparedImageSlot | null {
    if (!this.item) return null;
    return prepareBlogHeroImage(this.item.data.hero_image, this.title);
  }

  public get publishedLabel(): string {
    if (!this.item) return this.copy.unknownValue;
    return this.formatDate(this.item.data.published_at || this.item.publishedAt);
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }

  public get versionLabel(): string {
    return this.item?.versionId.slice(0, 8) ?? this.copy.unknownValue;
  }

  public get coverMetadata(): Record<string, unknown> | null {
    if (!this.item) return null;
    return getBlogImageMetadata(this.item.data.hero_image);
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getGuideSectionNavigationItems(
      this.guidesCopy.sectionItems,
      `/blog/${this.slug || ''}`,
    );
  }

  public get showLoading(): boolean {
    return isInitialLoading(this.dataSource.request);
  }

  public get showRefreshing(): boolean {
    return isRefreshing(this.dataSource.request);
  }

  public get showError(): boolean {
    return hasRequestError(this.dataSource.request) || !this.slug;
  }

  public get showNotFound(): boolean {
    return this.viewState.showNotFound;
  }

  public get showDetail(): boolean {
    return this.viewState.showDetail;
  }

  public get copy(): BlogPostDetailCopy {
    return this.guidesCopy.blogPost;
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public get locale(): GuideLocale {
    return this.localeService.locale;
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudRow: this.cloudRowHref,
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-cms/schema/blog_posts',
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-cms/master/draft/blog_posts',
      },
      fieldAttribution: [
        { owningSubgraph: 'cms', path: 'blog_posts.data.title' },
        { owningSubgraph: 'cms', path: 'blog_posts.data.body' },
        { owningSubgraph: 'cms', path: 'blog_posts.data.hero_image' },
        { owningSubgraph: 'cms', path: 'blog_posts.data.author_id' },
      ],
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['cms'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'BlogPostBySlug',
          request: BLOG_POST_QUERY,
        },
      },
      variables: {
        data: this.currentRequestData,
        locale: this.locale,
        slug: this.slug,
      },
    };
  }

  public async retry(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    await this.dataSource.request.fetch(this.currentRequestData);
  }

  private get guidesCopy() {
    return getGuidesCopy(this.locale);
  }

  private get currentRequestData(): BlogPostsRequestData {
    return {
      first: 1,
      orderBy: [
        {
          direction: Demo_Rpg_CmsSortOrder.Desc,
          field: Demo_Rpg_CmsGetBlog_PostsesOrderByField.PublishedAt,
        },
      ],
      where: {
        data: {
          equals: this.slug,
          path: ['slug'],
        },
      },
    };
  }

  private get cloudRowHref(): string {
    const rowId = this.item?.id ?? this.slug;
    return `https://cloud.revisium.io/app/revisium/demo-rpg-cms/master/draft/blog_posts/${rowId}`;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item) return null;
    return {
      author: {
        id: this.item.data.author_id.id,
        name: this.item.data.author_id.data.name[this.locale],
      },
      bodyPreview: this.localized(this.item.data.body).slice(0, 180),
      cover: {
        fileName: this.item.data.hero_image.fileName,
        url: this.item.data.hero_image.url,
      },
      id: this.item.id,
      publishedAt: this.item.data.published_at,
      slug: this.item.data.slug,
      title: this.item.data.title[this.locale],
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    return createLocaleFallbacks(
      this.locale,
      [
        { path: `blog_posts.${this.item.id}.data.title`, value: this.item.data.title },
        { path: `blog_posts.${this.item.id}.data.excerpt`, value: this.item.data.excerpt },
        { path: `blog_posts.${this.item.id}.data.body`, value: this.item.data.body },
        {
          path: `blog_posts.${this.item.id}.data.author_id.data.name`,
          value: this.item.data.author_id.data.name,
        },
      ],
      'en',
    );
  }

  private localized(value: LocalizedBlogText | null | undefined): string {
    return value?.[this.locale] ?? value?.en ?? '';
  }

  private formatDate(value: string | number): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat(this.locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
}

container.register(
  BlogPostViewModel,
  () => new BlogPostViewModel(container.get(BlogPostDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
