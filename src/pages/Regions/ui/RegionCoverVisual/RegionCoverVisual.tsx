import { Box, Image, type BoxProps } from '@chakra-ui/react';

import type { RegionCoverImageSlot } from '../../model/regionCoverImages';
import { RegionMediaPlaceholder } from '../RegionMediaPlaceholder/RegionMediaPlaceholder';

type RegionCoverVisualVariant = 'hero' | 'strip';

interface RegionCoverVisualProps {
  readonly climate: string;
  readonly image: RegionCoverImageSlot | null;
  readonly isImageLoaded: boolean;
  readonly isImageUnavailable: boolean;
  readonly onImageError: (image: HTMLImageElement) => void;
  readonly onImageLoad: () => void;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
  readonly variant?: RegionCoverVisualVariant;
}

interface RegionCoverSlotStyle {
  readonly borderColor: string;
  readonly borderRadius: string;
  readonly borderWidth: string;
  readonly height?: BoxProps['h'];
}

const slotStyles: Record<RegionCoverVisualVariant, RegionCoverSlotStyle> = {
  hero: {
    borderColor: 'rgba(103, 232, 249, 0.28)',
    borderRadius: 'md',
    borderWidth: '1px',
  },
  strip: {
    borderColor: 'transparent',
    borderRadius: '0',
    borderWidth: '0',
    height: { base: '176px', md: '184px' },
  },
};

export function RegionCoverVisual({
  climate,
  image,
  isImageLoaded,
  isImageUnavailable,
  onImageError,
  onImageLoad,
  placeholderDescription,
  placeholderTitle,
  variant = 'strip',
}: RegionCoverVisualProps) {
  const slotStyle = slotStyles[variant];
  const isHero = variant === 'hero';
  const aspectRatio = getCoverAspectRatio(isHero, image);
  const showPlaceholder = shouldShowPlaceholder(isHero, isImageLoaded, isImageUnavailable, image);
  const coverOverlay = !isHero && !showPlaceholder ? coverOverlayStyle : undefined;
  const imageOpacity = !isHero || isImageLoaded ? 1 : 0;
  const imageTransition = isHero ? 'opacity 140ms ease' : undefined;
  const imageObjectFit = isHero ? 'contain' : 'cover';

  return (
    <Box
      aria-label={showPlaceholder ? placeholderTitle : undefined}
      bg="#071018"
      borderColor={slotStyle.borderColor}
      borderRadius={slotStyle.borderRadius}
      borderWidth={slotStyle.borderWidth}
      h={slotStyle.height}
      minW="0"
      overflow="hidden"
      position="relative"
      role={showPlaceholder ? 'img' : undefined}
      style={aspectRatio ? { aspectRatio } : undefined}
      w="full"
      _after={coverOverlay}
    >
      {showPlaceholder ? (
        <RegionMediaPlaceholder
          description={placeholderDescription}
          descriptionMaxW={isHero ? '360px' : '320px'}
          eyebrow={climate}
          height="full"
          title={placeholderTitle}
          titleFontSize={isHero ? 'xl' : { base: 'md', md: 'lg' }}
        />
      ) : null}
      {image && !isImageUnavailable ? (
        <Image
          alt={image.alt}
          data-fallback-src={image.fallbackSrc}
          draggable={false}
          h="full"
          htmlHeight={image.height}
          htmlWidth={image.width}
          inset="0"
          key={image.src}
          loading={image.loading}
          objectFit={imageObjectFit}
          objectPosition="center center"
          opacity={imageOpacity}
          onError={(event) => onImageError(event.currentTarget)}
          onLoad={onImageLoad}
          position="absolute"
          src={image.src}
          srcSet={image.srcSet}
          w="full"
          css={{
            transition: imageTransition,
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
          }}
        />
      ) : null}
    </Box>
  );
}

const coverOverlayStyle = {
  bg: 'linear-gradient(180deg, rgba(2, 7, 13, 0) 42%, rgba(2, 7, 13, 0.52) 100%)',
  content: '""',
  inset: 0,
  pointerEvents: 'none',
  position: 'absolute',
} as const;

function getCoverAspectRatio(
  isHero: boolean,
  image: RegionCoverImageSlot | null,
): string | undefined {
  if (!isHero) return undefined;
  if (!image) return '16 / 9';
  return `${image.width} / ${image.height}`;
}

function shouldShowPlaceholder(
  isHero: boolean,
  isImageLoaded: boolean,
  isImageUnavailable: boolean,
  image: RegionCoverImageSlot | null,
): boolean {
  if (!image) return true;
  if (isImageUnavailable) return true;
  return isHero && !isImageLoaded;
}
