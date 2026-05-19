import { Box, Image, Text } from '@chakra-ui/react';
import { useEffect, useState, type SyntheticEvent } from 'react';

import { applyImageFallback, hasAppliedImageFallback } from 'src/shared/lib';
import type { FactionCrestImageSlot } from '../../model/factionImages';

interface FactionDetailCrestVisualProps {
  readonly alignmentLabel: string;
  readonly image: FactionCrestImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function FactionDetailCrestVisual({
  alignmentLabel,
  image,
  placeholderDescription,
  placeholderTitle,
}: FactionDetailCrestVisualProps) {
  const [isImageUnavailable, setImageUnavailable] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const showPlaceholder = image === null || isImageUnavailable || !isImageLoaded;

  useEffect(() => {
    setImageUnavailable(false);
    setImageLoaded(false);
  }, [image?.fallbackSrc, image?.src]);

  return (
    <Box
      alignItems="center"
      aria-label={showPlaceholder ? placeholderTitle : undefined}
      aspectRatio="1"
      bg="#071018"
      borderColor="rgba(103, 232, 249, 0.28)"
      borderRadius="md"
      borderWidth="1px"
      display="flex"
      justifyContent="center"
      minW="0"
      overflow="hidden"
      p={{ base: '6', md: '8' }}
      position="relative"
      role={showPlaceholder ? 'img' : undefined}
      shadow="inset 0 0 52px rgba(34, 211, 238, 0.1)"
      w="full"
    >
      {showPlaceholder ? (
        <Box maxW="360px" minW="0" textAlign="center">
          <Text color="#67e8f9" fontSize="sm" fontWeight="bold" lineHeight="1.2" mb="3">
            {alignmentLabel}
          </Text>
          <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" lineHeight="1.15">
            {placeholderTitle}
          </Text>
          <Text color="#9aa7b1" fontSize="sm" lineHeight="1.45" mt="3">
            {placeholderDescription}
          </Text>
        </Box>
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
          loading={image.loading}
          objectFit="contain"
          opacity={isImageLoaded ? 1 : 0}
          onError={(event) => handleCrestImageError(event, setImageUnavailable, setImageLoaded)}
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

function handleCrestImageError(
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
