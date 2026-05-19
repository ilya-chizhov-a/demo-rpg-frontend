import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState, type SyntheticEvent } from 'react';

import type { LocationImageSlot } from '../../model/locationImages';
import { applyImageFallback, hasAppliedImageFallback } from '../imageFallback';
import { LocationMapPlaceholder } from '../LocationMapPlaceholder/LocationMapPlaceholder';

interface LocationDetailMapVisualProps {
  readonly image: LocationImageSlot | null;
  readonly kindLabel: string;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function LocationDetailMapVisual({
  image,
  kindLabel,
  placeholderDescription,
  placeholderTitle,
}: LocationDetailMapVisualProps) {
  const [isImageUnavailable, setImageUnavailable] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const aspectRatio = image ? `${image.width} / ${image.height}` : '16 / 9';
  const showPlaceholder = image === null || isImageUnavailable || isImageLoaded === false;

  useEffect(() => {
    setImageUnavailable(false);
    setImageLoaded(false);
  }, [image?.fallbackSrc, image?.src]);

  return (
    <Box
      aria-label={showPlaceholder ? placeholderTitle : undefined}
      bg="#071018"
      borderColor="rgba(103, 232, 249, 0.28)"
      borderRadius="md"
      borderWidth="1px"
      minW="0"
      overflow="hidden"
      position="relative"
      role={showPlaceholder ? 'img' : undefined}
      style={{ aspectRatio }}
      w="full"
    >
      {showPlaceholder ? (
        <LocationMapPlaceholder
          descriptionMaxW="360px"
          gridSize="28px 28px"
          h="full"
          kindLabel={kindLabel}
          minH="inherit"
          placeholderDescription={placeholderDescription}
          placeholderTitle={placeholderTitle}
          titleFontSize="xl"
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
          objectFit="contain"
          objectPosition="center center"
          opacity={isImageLoaded ? 1 : 0}
          onError={(event) => handleMapImageError(event, setImageUnavailable, setImageLoaded)}
          onLoad={() => setImageLoaded(true)}
          position="absolute"
          src={image.src}
          srcSet={image.srcSet}
          w="full"
          css={{
            transition: 'opacity 140ms ease',
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
          }}
        />
      ) : null}
    </Box>
  );
}

function handleMapImageError(
  event: SyntheticEvent<HTMLImageElement>,
  setImageUnavailable: (value: boolean) => void,
  setImageLoaded: (value: boolean) => void,
): void {
  if (hasAppliedImageFallback(event.currentTarget)) {
    setImageLoaded(false);
    setImageUnavailable(true);
    return;
  }
  setImageLoaded(false);
  const fallbackApplied = applyImageFallback(event.currentTarget);
  if (fallbackApplied === false) {
    setImageUnavailable(true);
  }
}
