import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';
import type { ItemNode } from '../api/ItemsDataSource';

export type ItemIconFile = ItemNode['data']['icon'];

interface ItemIconSource {
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

export function prepareItemIconImage(
  icon: ItemIconSource,
  title: string,
): PreparedImageSlot | null {
  if (!icon.url || !icon.mimeType.startsWith('image/')) return null;

  return prepareImgproxyImageSlot({
    alt: title,
    height: 144,
    resizeMode: 'fit',
    sourceUrl: icon.url,
    width: 144,
  });
}

export function prepareItemDetailIconImage(
  icon: ItemIconSource,
  title: string,
): PreparedImageSlot | null {
  if (!icon.url || !icon.mimeType.startsWith('image/')) return null;

  return prepareImgproxyImageSlot({
    alt: title,
    height: 360,
    resizeMode: 'fit',
    sourceUrl: icon.url,
    width: 360,
  });
}

export function getItemIconMetadata(icon: ItemIconSource): Record<string, unknown> {
  return {
    extension: icon.extension,
    fileId: icon.fileId,
    fileName: icon.fileName,
    hash: icon.hash,
    height: icon.height,
    mimeType: icon.mimeType,
    size: icon.size,
    status: icon.status,
    url: icon.url,
    width: icon.width,
  };
}
