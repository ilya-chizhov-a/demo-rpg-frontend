import { prepareImgproxyImageSlot, type PreparedImageSlot } from 'src/shared/lib';
import type { BlogPostDetailNode, BlogPostNode } from '../api/BlogDataSource';

export type BlogImageFile =
  | BlogPostNode['data']['author_id']['data']['avatar']
  | BlogPostNode['data']['hero_image']
  | BlogPostDetailNode['data']['author_id']['data']['avatar']
  | BlogPostDetailNode['data']['hero_image'];

export function prepareBlogCardImage(
  image: BlogImageFile,
  title: string,
): PreparedImageSlot | null {
  return prepareImage(image, title, 640, 360, false);
}

export function prepareBlogHeroImage(
  image: BlogImageFile,
  title: string,
): PreparedImageSlot | null {
  return prepareImage(image, title, 960, 520, true);
}

export function prepareBlogAuthorAvatar(
  image: BlogImageFile,
  title: string,
): PreparedImageSlot | null {
  const sourceUrl = image.url.trim();
  if (!sourceUrl || !image.mimeType.startsWith('image/')) return null;
  return prepareImgproxyImageSlot({
    alt: title,
    height: 96,
    resizeMode: 'fill',
    sourceUrl,
    width: 96,
  });
}

export function getBlogImageMetadata(image: BlogImageFile): Record<string, unknown> {
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

function prepareImage(
  image: BlogImageFile,
  title: string,
  width: number,
  height: number,
  eager: boolean,
): PreparedImageSlot | null {
  const sourceUrl = image.url.trim();
  if (!sourceUrl || !image.mimeType.startsWith('image/')) return null;
  return prepareImgproxyImageSlot({
    alt: title,
    eager,
    gravity: 'ce',
    height,
    resizeMode: 'fill',
    sourceUrl,
    width,
  });
}
