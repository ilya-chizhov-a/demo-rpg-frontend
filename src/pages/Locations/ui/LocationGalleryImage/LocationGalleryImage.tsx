import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState, type SyntheticEvent } from 'react';

import type { LocationImageSlot } from '../../model/locationImages';
import { applyImageFallback, hasAppliedImageFallback } from '../imageFallback';

interface LocationGalleryImageProps {
  readonly image: LocationImageSlot;
  readonly placeholderLabel: string;
}

export function LocationGalleryImage({ image, placeholderLabel }: LocationGalleryImageProps) {
  const [isImageUnavailable, setImageUnavailable] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const showPlaceholder = isImageUnavailable || isImageLoaded === false;
  const shouldRenderImage = isImageUnavailable === false;

  useEffect(() => {
    setImageUnavailable(false);
    setImageLoaded(false);
  }, [image.fallbackSrc, image.src]);

  return (
    <Box bg="#071018" h="220px" overflow="hidden" position="relative" w="full">
      {showPlaceholder ? (
        <GalleryImagePlaceholder label={placeholderLabel} title={image.alt} />
      ) : null}
      {shouldRenderImage ? (
        <Image
          alt={image.alt}
          data-fallback-src={image.fallbackSrc}
          draggable={false}
          h="full"
          htmlHeight={image.height}
          htmlWidth={image.width}
          inset="0"
          loading={image.loading}
          objectFit="cover"
          opacity={isImageLoaded ? 1 : 0}
          onError={(event) => handleGalleryImageError(event, setImageUnavailable, setImageLoaded)}
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

interface GalleryImagePlaceholderProps {
  readonly label: string;
  readonly title: string;
}

function GalleryImagePlaceholder({ label, title }: GalleryImagePlaceholderProps) {
  return (
    <Flex
      align="center"
      color="#9aa7b1"
      direction="column"
      h="full"
      justify="center"
      px="4"
      textAlign="center"
    >
      <Text color="#67e8f9" fontSize="xs" fontWeight="bold" textTransform="uppercase">
        {label}
      </Text>
      <Text fontSize="sm" lineHeight="1.4" mt="2">
        {title}
      </Text>
    </Flex>
  );
}

function handleGalleryImageError(
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
