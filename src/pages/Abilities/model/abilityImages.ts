import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';
import type { AbilityNode } from '../api/AbilitiesDataSource';

export type AbilityIconFile = AbilityNode['data']['icon'];

export function prepareAbilityIconImage(
  icon: AbilityIconFile,
  title: string,
): PreparedImageSlot | null {
  if (!icon.url) return null;

  return prepareImgproxyImageSlot({
    alt: title,
    height: 128,
    resizeMode: 'fit',
    sourceUrl: icon.url,
    width: 128,
  });
}

export function getAbilityIconMetadata(icon: AbilityIconFile): Record<string, unknown> {
  return {
    fileName: icon.fileName,
    height: icon.height,
    mimeType: icon.mimeType,
    url: icon.url,
    width: icon.width,
  };
}
