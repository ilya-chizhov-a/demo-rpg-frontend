import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';
import type { NpcNode } from '../api/NpcsDataSource';

export type NpcPortraitFile = NpcNode['data']['portrait'];

export function prepareNpcPortraitImage(
  portrait: NpcPortraitFile,
  title: string,
): PreparedImageSlot | null {
  return prepareImgproxyImageSlot({
    alt: title,
    height: 480,
    resizeMode: 'fit',
    sourceUrl: portrait.url,
    width: 360,
  });
}

export function prepareNpcDetailPortraitImage(
  portrait: NpcPortraitFile,
  title: string,
): PreparedImageSlot | null {
  return prepareImgproxyImageSlot({
    alt: title,
    height: 720,
    resizeMode: 'fit',
    sourceUrl: portrait.url,
    width: 540,
  });
}

export function getNpcPortraitMetadata(portrait: NpcPortraitFile): Record<string, unknown> {
  return {
    fileName: portrait.fileName,
    height: portrait.height,
    mimeType: portrait.mimeType,
    url: portrait.url,
    width: portrait.width,
  };
}
