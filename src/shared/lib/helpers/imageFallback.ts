export function applyImageFallback(image: HTMLImageElement): boolean {
  if (image.dataset.fallbackApplied === 'true') return false;

  const fallbackSrc = image.dataset.fallbackSrc;
  if (!fallbackSrc) return false;

  image.dataset.fallbackApplied = 'true';
  image.srcset = '';
  image.src = fallbackSrc;

  return true;
}

export function hasAppliedImageFallback(image: HTMLImageElement): boolean {
  return image.dataset.fallbackApplied === 'true';
}
