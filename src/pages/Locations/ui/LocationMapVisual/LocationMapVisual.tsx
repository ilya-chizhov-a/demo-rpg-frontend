import { Box, Image } from '@chakra-ui/react';
import type { SyntheticEvent } from 'react';

import type { LocationImageSlot } from '../../model/locationImages';
import { applyImageFallback } from '../imageFallback';
import { LocationMapPlaceholder } from '../LocationMapPlaceholder/LocationMapPlaceholder';

interface LocationMapVisualProps {
  readonly image: LocationImageSlot | null;
  readonly kindLabel: string;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function LocationMapVisual({
  image,
  kindLabel,
  placeholderDescription,
  placeholderTitle,
}: LocationMapVisualProps) {
  if (!image) {
    return (
      <LocationMapPlaceholder
        aria-label={placeholderTitle}
        className="location-card-map"
        gridSize="24px 24px"
        h={{ base: '176px', md: '184px' }}
        kindLabel={kindLabel}
        minW="0"
        placeholderDescription={placeholderDescription}
        placeholderTitle={placeholderTitle}
        role="img"
        titleFontSize="lg"
        w="full"
      />
    );
  }

  return (
    <Box
      bg="#071018"
      h={{ base: '176px', md: '184px' }}
      minW="0"
      overflow="hidden"
      position="relative"
      w="full"
      _after={{
        bg: 'linear-gradient(180deg, rgba(2, 7, 13, 0) 44%, rgba(2, 7, 13, 0.52) 100%)',
        content: '""',
        inset: 0,
        pointerEvents: 'none',
        position: 'absolute',
      }}
    >
      <Image
        alt={image.alt}
        className="location-card-map"
        data-fallback-src={image.fallbackSrc}
        draggable={false}
        h="full"
        key={image.src}
        loading={image.loading}
        onError={handleMapImageError}
        objectFit="cover"
        objectPosition="center center"
        src={image.src}
        srcSet={image.srcSet}
        w="full"
      />
    </Box>
  );
}

function handleMapImageError(event: SyntheticEvent<HTMLImageElement>): void {
  applyImageFallback(event.currentTarget);
}
