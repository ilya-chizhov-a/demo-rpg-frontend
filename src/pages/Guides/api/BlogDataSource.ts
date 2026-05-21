import {
  type BlogPostBySlugQuery,
  type BlogPostsQuery,
  type Demo_Rpg_CmsGetBlog_PostsesInput,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type BlogPostNode = BlogPostsQuery['blog_postses']['edges'][number]['node'];
export type BlogPostDetailNode = BlogPostBySlugQuery['blog_postses']['edges'][number]['node'];
export type BlogPostsRequestData = Demo_Rpg_CmsGetBlog_PostsesInput;

export interface BlogPostsResult {
  readonly items: readonly BlogPostNode[];
  readonly pageInfo: BlogPostsQuery['blog_postses']['pageInfo'];
  readonly totalCount: number;
}

export interface BlogPostResult {
  readonly item: BlogPostDetailNode | null;
  readonly totalCount: number;
}

export class BlogDataSource {
  public readonly request: ObservableRequest<BlogPostsResult, [BlogPostsRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchPosts(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchPosts(
    signal: AbortSignal,
    data: BlogPostsRequestData,
  ): Promise<BlogPostsResult> {
    const response = await this.api.sdk.BlogPosts({ data }, undefined, signal);
    const connection = response.blog_postses;
    return {
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

export class BlogPostDataSource {
  public readonly request: ObservableRequest<BlogPostResult, [BlogPostsRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchPost(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchPost(
    signal: AbortSignal,
    data: BlogPostsRequestData,
  ): Promise<BlogPostResult> {
    const response = await this.api.sdk.BlogPostBySlug({ data }, undefined, signal);
    const connection = response.blog_postses;
    return {
      item: connection.edges[0]?.node ?? null,
      totalCount: connection.totalCount,
    };
  }
}

container.register(BlogDataSource, () => new BlogDataSource(container.get(ApiService)), {
  scope: 'transient',
});

container.register(
  BlogPostDataSource,
  () => new BlogPostDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
