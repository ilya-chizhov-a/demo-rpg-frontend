import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';

export interface LocationFileSource {
  readonly fileId: string;
  readonly fileName: string;
  readonly hash: string;
  readonly height: number;
  readonly mimeType: string;
  readonly url: string;
  readonly width: number;
}

export type LocationImageSlot = PreparedImageSlot & {
  readonly fallbackSrc: string;
};

export function prepareLocationCardMapImage(
  source: LocationFileSource | null | undefined,
  title: string,
): LocationImageSlot | null {
  const sourceUrl = source?.url?.trim();
  if (!sourceUrl) return null;
  if (!source?.mimeType?.startsWith('image/')) return null;

  const image = prepareImgproxyImageSlot({
    alt: `${title} location map`,
    gravity: 'ce',
    height: 292,
    resizeMode: 'fit',
    sourceUrl,
    width: 520,
  });
  if (!image) return null;

  return {
    ...image,
    fallbackSrc: sourceUrl,
  };
}

export function prepareLocationDetailMapImage(
  source: LocationFileSource | null | undefined,
  title: string,
): LocationImageSlot | null {
  const sourceUrl = source?.url?.trim();
  if (!sourceUrl) return null;
  if (!source?.mimeType?.startsWith('image/')) return null;
  const size = getBoundedDetailMapSize(source);

  const image = prepareImgproxyImageSlot({
    alt: `${title} location map`,
    eager: true,
    gravity: 'ce',
    height: size.height,
    resizeMode: 'fit',
    sourceUrl,
    width: size.width,
  });
  if (!image) return null;

  return {
    ...image,
    fallbackSrc: sourceUrl,
  };
}

export function prepareLocationGalleryThumbnail(
  source: LocationFileSource | null | undefined,
  title: string,
  index: number,
): LocationImageSlot | null {
  const sourceUrl = source?.url?.trim();
  if (!sourceUrl) return null;
  if (!source?.mimeType?.startsWith('image/')) return null;

  const image = prepareImgproxyImageSlot({
    alt: `${title} gallery image ${index + 1}`,
    gravity: 'ce',
    height: 80,
    resizeMode: 'fill',
    sourceUrl,
    width: 80,
  });
  if (!image) return null;

  return {
    ...image,
    fallbackSrc: sourceUrl,
  };
}

export function prepareLocationDetailGalleryImage(
  source: LocationFileSource | null | undefined,
  title: string,
  index: number,
): LocationImageSlot | null {
  const sourceUrl = source?.url?.trim();
  if (!sourceUrl) return null;
  if (!source?.mimeType?.startsWith('image/')) return null;

  const image = prepareImgproxyImageSlot({
    alt: `${title} gallery image ${index + 1}`,
    gravity: 'ce',
    height: 220,
    resizeMode: 'fill',
    sourceUrl,
    width: 360,
  });
  if (!image) return null;

  return {
    ...image,
    fallbackSrc: sourceUrl,
  };
}

export function getLocationFileMetadata(
  source: LocationFileSource | null | undefined,
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

function getBoundedDetailMapSize(source: LocationFileSource): { readonly width: number; readonly height: number } {
  const fallbackSize = { width: 840, height: 560 };
  if (!Number.isFinite(source.width) || !Number.isFinite(source.height)) return fallbackSize;
  if (source.width <= 0 || source.height <= 0) return fallbackSize;

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
