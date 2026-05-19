import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';

interface ClassIconSource {
  readonly fileId: string;
  readonly fileName: string;
  readonly hash: string;
  readonly height: number;
  readonly mimeType: string;
  readonly url: string;
  readonly width: number;
}

export function prepareClassIconImage(
  source: ClassIconSource | null | undefined,
  title: string,
): PreparedImageSlot | null {
  const sourceUrl = source?.url?.trim();
  if (!sourceUrl) return null;
  if (!source?.mimeType?.startsWith('image/')) return null;

  return prepareImgproxyImageSlot({
    alt: `${title} class icon`,
    gravity: 'ce',
    height: 96,
    resizeMode: 'fit',
    sourceUrl,
    width: 96,
  });
}

export function getClassIconMetadata(
  source: ClassIconSource | null | undefined,
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
