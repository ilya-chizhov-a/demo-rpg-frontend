import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';
import type { MonsterDetailNode } from '../api/MonsterDetailDataSource';
import type { MonsterNode } from '../api/MonstersDataSource';

export type MonsterImageFile = MonsterNode['data']['image'] | MonsterDetailNode['data']['image'];

export function prepareMonsterCardImage(
  image: MonsterImageFile,
  title: string,
): PreparedImageSlot | null {
  return prepareImgproxyImageSlot({
    alt: title,
    height: 360,
    resizeMode: 'fit',
    sourceUrl: image.url,
    width: 480,
  });
}

export function prepareMonsterDetailImage(
  image: MonsterImageFile,
  title: string,
): PreparedImageSlot | null {
  return prepareImgproxyImageSlot({
    alt: title,
    eager: true,
    height: 720,
    resizeMode: 'fit',
    sourceUrl: image.url,
    width: 640,
  });
}

export function getMonsterImageMetadata(image: MonsterImageFile): Record<string, unknown> {
  return {
    fileName: image.fileName,
    height: image.height,
    mimeType: image.mimeType,
    size: image.size,
    status: image.status,
    url: image.url,
    width: image.width,
  };
}
