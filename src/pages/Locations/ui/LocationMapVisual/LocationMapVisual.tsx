import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { SyntheticEvent } from 'react';

import type { LocationImageSlot } from '../../model/locationImages';

interface LocationMapVisualProps {
  readonly image: LocationImageSlot | null;
  readonly kind: string;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function LocationMapVisual({
  image,
  kind,
  placeholderDescription,
  placeholderTitle,
}: LocationMapVisualProps) {
  if (!image) {
    return (
      <Box
        aria-label={placeholderTitle}
        bg="#071018"
        className="location-card-map"
        h={{ base: '176px', md: '184px' }}
        minW="0"
        overflow="hidden"
        position="relative"
        role="img"
        w="full"
        _before={{
          bgImage:
            'linear-gradient(rgba(103, 232, 249, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(103, 232, 249, 0.08) 1px, transparent 1px)',
          bgSize: '24px 24px',
          content: '""',
          inset: 0,
          opacity: 0.5,
          position: 'absolute',
        }}
        _after={{
          bg: 'linear-gradient(135deg, rgba(34, 211, 238, 0.12), rgba(45, 212, 191, 0.08) 48%, rgba(167, 139, 250, 0.12))',
          content: '""',
          inset: 0,
          position: 'absolute',
        }}
      >
        <Flex
          align="center"
          color="var(--color-text-supporting)"
          direction="column"
          h="full"
          justify="center"
          px="5"
          position="relative"
          textAlign="center"
          zIndex="1"
        >
          <Text color="#67e8f9" fontSize="xs" fontWeight="bold" textTransform="uppercase">
            {kind}
          </Text>
          <Text fontSize="lg" fontWeight="bold" mt="2">
            {placeholderTitle}
          </Text>
          <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2" maxW="320px">
            {placeholderDescription}
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      bg="#071018"
      h={{ base: '176px', md: '184px' }}
      minW="0"
      overflow="hidden"
      p="2"
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
        objectFit="contain"
        objectPosition="center center"
        src={image.src}
        srcSet={image.srcSet}
        w="full"
      />
    </Box>
  );
}

function handleMapImageError(event: SyntheticEvent<HTMLImageElement>): void {
  applyMapImageFallback(event.currentTarget);
}

function applyMapImageFallback(image: HTMLImageElement): void {
  if (image.dataset.fallbackApplied === 'true') return;

  image.dataset.fallbackApplied = 'true';
  image.srcset = '';
  image.src = image.dataset.fallbackSrc ?? image.src;
}
