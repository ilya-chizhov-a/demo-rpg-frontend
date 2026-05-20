import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';

export interface HeroPortraitSource {
  readonly extension: string;
  readonly fileId: string;
  readonly fileName: string;
  readonly hash: string;
  readonly height: number;
  readonly mimeType: string;
  readonly size: number;
  readonly status: string;
  readonly url: string;
  readonly width: number;
}

export type HeroPortraitImageSlot = PreparedImageSlot & {
  readonly fallbackSrc: string;
};

export function prepareHeroPortraitImage(
  source: HeroPortraitSource | null | undefined,
  title: string,
): HeroPortraitImageSlot | null {
  return prepareHeroPortraitSlot(source, title, 420, 630, false);
}

export function prepareHeroDetailPortraitImage(
  source: HeroPortraitSource | null | undefined,
  title: string,
): HeroPortraitImageSlot | null {
  return prepareHeroPortraitSlot(source, title, 560, 840, true);
}

function prepareHeroPortraitSlot(
  source: HeroPortraitSource | null | undefined,
  title: string,
  width: number,
  height: number,
  eager: boolean,
): HeroPortraitImageSlot | null {
  const sourceUrl = source?.url?.trim();
  if (!sourceUrl) return null;
  if (!source?.mimeType?.startsWith('image/')) return null;

  const image = prepareImgproxyImageSlot({
    alt: `${title} hero portrait`,
    eager,
    gravity: 'sm',
    height,
    resizeMode: 'fit',
    sourceUrl,
    width,
  });
  if (!image) return null;

  return {
    ...image,
    fallbackSrc: sourceUrl,
  };
}

export function getHeroPortraitMetadata(
  source: HeroPortraitSource | null | undefined,
): Record<string, unknown> | null {
  if (!source) return null;

  return {
    extension: source.extension,
    fileId: source.fileId,
    fileName: source.fileName,
    hash: source.hash,
    height: source.height,
    mimeType: source.mimeType,
    size: source.size,
    status: source.status,
    url: source.url,
    width: source.width,
  };
}
