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

export function prepareRegionCardCoverImage(
  source: RegionCoverImageSource | null | undefined,
  title: string,
): PreparedImageSlot | null {
  return prepareRegionCoverImage(source, title, 520, 292, false);
}

export function prepareRegionHeroCoverImage(
  source: RegionCoverImageSource | null | undefined,
  title: string,
): PreparedImageSlot | null {
  return prepareRegionCoverImage(source, title, 1200, 420, true);
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
  eager: boolean,
): PreparedImageSlot | null {
  if (!source?.mimeType.startsWith('image/')) return null;

  return prepareImgproxyImageSlot({
    alt: `${title} region cover image`,
    eager,
    gravity: 'sm',
    height,
    resizeMode: 'fill',
    sourceUrl: source.url,
    width,
  });
}
