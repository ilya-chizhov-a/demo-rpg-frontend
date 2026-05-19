import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';

export interface FactionCrestSource {
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

export type FactionCrestImageSlot = PreparedImageSlot & {
  readonly fallbackSrc: string;
};

export function prepareFactionCrestImage(
  source: FactionCrestSource | null | undefined,
  title: string,
): FactionCrestImageSlot | null {
  return prepareFactionCrestImageSlot(source, title, 360, false);
}

export function prepareFactionDetailCrestImage(
  source: FactionCrestSource | null | undefined,
  title: string,
): FactionCrestImageSlot | null {
  return prepareFactionCrestImageSlot(source, title, 640, true);
}

function prepareFactionCrestImageSlot(
  source: FactionCrestSource | null | undefined,
  title: string,
  size: number,
  eager: boolean,
): FactionCrestImageSlot | null {
  const sourceUrl = source?.url?.trim();
  if (!sourceUrl) return null;
  if (!source?.mimeType?.startsWith('image/')) return null;

  const image = prepareImgproxyImageSlot({
    alt: `${title} faction crest`,
    eager,
    gravity: 'ce',
    height: size,
    resizeMode: 'fit',
    sourceUrl,
    width: size,
  });
  if (!image) return null;

  return {
    ...image,
    fallbackSrc: sourceUrl,
  };
}

export function getFactionCrestMetadata(
  source: FactionCrestSource | null | undefined,
): Record<string, unknown> | null {
  if (!source) return null;

  return {
    extension: source.extension,
    fileId: source.fileId,
    fileName: source.fileName,
    hash: source.hash,
    mimeType: source.mimeType,
    size: source.size,
    status: source.status,
    url: source.url,
    width: source.width,
    height: source.height,
  };
}
