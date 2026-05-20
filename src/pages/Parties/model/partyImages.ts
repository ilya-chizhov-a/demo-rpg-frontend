import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';
import type { PartyHeroNode } from '../api/PartiesDataSource';

export type PartyHeroPortraitFile = PartyHeroNode['data']['portrait'];

export function preparePartyHeroAvatar(
  portrait: PartyHeroPortraitFile,
  title: string,
): PreparedImageSlot | null {
  return prepareImgproxyImageSlot({
    alt: title,
    height: 128,
    resizeMode: 'fit',
    sourceUrl: portrait.url,
    width: 96,
  });
}

export function preparePartyDetailHeroPortrait(
  portrait: PartyHeroPortraitFile,
  title: string,
): PreparedImageSlot | null {
  return prepareImgproxyImageSlot({
    alt: title,
    height: 320,
    resizeMode: 'fit',
    sourceUrl: portrait.url,
    width: 240,
  });
}

export function getPartyHeroPortraitMetadata(
  portrait: PartyHeroPortraitFile,
): Record<string, unknown> {
  return {
    fileName: portrait.fileName,
    height: portrait.height,
    mimeType: portrait.mimeType,
    url: portrait.url,
    width: portrait.width,
  };
}
