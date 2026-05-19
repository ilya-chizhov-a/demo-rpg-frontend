import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';

interface LocationFileSource {
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

export function prepareLocationGalleryThumbnail(
  source: LocationFileSource | null | undefined,
  title: string,
  index: number,
): PreparedImageSlot | null {
  const sourceUrl = source?.url?.trim();
  if (!sourceUrl) return null;
  if (!source?.mimeType?.startsWith('image/')) return null;

  return prepareImgproxyImageSlot({
    alt: `${title} gallery image ${index + 1}`,
    gravity: 'ce',
    height: 80,
    resizeMode: 'fill',
    sourceUrl,
    width: 80,
  });
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
