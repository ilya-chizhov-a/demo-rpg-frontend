import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';
import type { QuestDetailStepNode } from '../api/QuestDetailDataSource';

export type QuestStepImageFile = QuestDetailStepNode['image'];

export function prepareQuestStepImage(
  image: QuestStepImageFile,
  title: string,
): PreparedImageSlot | null {
  return prepareImgproxyImageSlot({
    alt: title,
    height: 360,
    resizeMode: 'fit',
    sourceUrl: image.url,
    width: 520,
  });
}

export function getQuestStepImageMetadata(image: QuestStepImageFile): Record<string, unknown> {
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
