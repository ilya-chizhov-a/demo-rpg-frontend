import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';

interface RegionCoverImageSource {
  readonly fileId: string;
  readonly fileName: string;
  readonly hash: string;
  readonly height: number;
  readonly mimeType: string;
  readonly url: string;
  readonly width: number;
}

export type RegionCoverImageSlot = PreparedImageSlot & {
  readonly fallbackSrc: string;
};

export function prepareRegionCardCoverImage(
  source: RegionCoverImageSource | null | undefined,
  title: string,
): RegionCoverImageSlot | null {
  return prepareRegionCoverImage(source, title, 520, 292, 'fill', false);
}

export function prepareRegionHeroCoverImage(
  source: RegionCoverImageSource | null | undefined,
  title: string,
): RegionCoverImageSlot | null {
  const size = getBoundedDetailCoverSize(source);
  return prepareRegionCoverImage(source, title, size.width, size.height, 'fit', true);
}

export function getRegionCoverImageMetadata(
  source: RegionCoverImageSource | null | undefined,
): Record<string, unknown> | null {
  if (!source) return null;

  return {
    fileId: source.fileId,
    fileName: source.fileName,
    hash: source.hash,
    mimeType: source.mimeType,
    url: source.url,
    width: source.width,
    height: source.height,
  };
}

function prepareRegionCoverImage(
  source: RegionCoverImageSource | null | undefined,
  title: string,
  width: number,
  height: number,
  resizeMode: 'fill' | 'fit',
  eager: boolean,
): RegionCoverImageSlot | null {
  const sourceUrl = source?.url?.trim();
  if (!sourceUrl) return null;
  if (!source?.mimeType.startsWith('image/')) return null;

  const image = prepareImgproxyImageSlot({
    alt: `${title} region cover image`,
    eager,
    gravity: 'sm',
    height,
    resizeMode,
    sourceUrl,
    width,
  });
  if (!image) return null;

  return {
    ...image,
    fallbackSrc: sourceUrl,
  };
}

function getBoundedDetailCoverSize(
  source: RegionCoverImageSource | null | undefined,
): { readonly width: number; readonly height: number } {
  const fallbackSize = { width: 840, height: 560 };
  if (!Number.isFinite(source?.width) || !Number.isFinite(source?.height)) return fallbackSize;
  if (!source || source.width <= 0 || source.height <= 0) return fallbackSize;

  const aspectRatio = source.width / source.height;
  const maxWidth = 880;
  const maxHeight = 560;
  let width = maxWidth;
  let height = Math.max(1, Math.round(width / aspectRatio));

  if (height > maxHeight) {
    height = maxHeight;
    width = Math.max(1, Math.round(height * aspectRatio));
  }

  return { width, height };
}
