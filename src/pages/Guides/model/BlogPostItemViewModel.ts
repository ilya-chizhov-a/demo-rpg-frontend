import { getLocaleNativeLabel } from 'src/shared/model';
import type { PreparedImageSlot } from 'src/shared/lib';
import type { BlogPostNode } from '../api/BlogDataSource';
import { prepareBlogCardImage } from './blogImages';
import type { BlogPageCopy, GuideLocale } from './guideCopy';

type LocalizedBlogText = Record<GuideLocale, string>;

export class BlogPostItemViewModel {
  constructor(
    private readonly node: BlogPostNode,
    private readonly getLocale: () => GuideLocale,
    private readonly getCopy: () => BlogPageCopy,
  ) {}

  public get id(): string {
    return this.node.id;
  }

  public get slug(): string {
    return this.node.data.slug || this.id;
  }

  public get detailHref(): string {
    return `/blog/${this.slug}`;
  }

  public get title(): string {
    return this.localized(this.node.data.title) || this.slug;
  }

  public get excerpt(): string {
    return this.localized(this.node.data.excerpt) || this.copy.noExcerpt;
  }

  public get authorName(): string {
    const author = this.node.data.author_id;
    return this.localized(author.data.name) || author.data.slug || author.id;
  }

  public get authorBio(): string {
    return this.localized(this.node.data.author_id.data.bio);
  }

  public get publishedLabel(): string {
    return this.formatDate(this.node.data.published_at || this.node.publishedAt);
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }

  public get heroImage(): PreparedImageSlot | null {
    return prepareBlogCardImage(this.node.data.hero_image, this.title);
  }

  public get searchText(): string {
    return [
      this.title,
      this.excerpt,
      this.authorName,
      this.authorBio,
      this.node.data.slug,
      this.node.data.title.en,
      this.node.data.excerpt.en,
    ]
      .join(' ')
      .toLowerCase();
  }

  private get locale(): GuideLocale {
    return this.getLocale();
  }

  private get copy(): BlogPageCopy {
    return this.getCopy();
  }

  private localized(value: LocalizedBlogText): string {
    return value[this.locale] || value.en;
  }

  private formatDate(value: string | number): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value || '');
    return new Intl.DateTimeFormat(this.locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
}
