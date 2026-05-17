import { Box, Image, type BoxProps } from '@chakra-ui/react';

import type { PreparedImageSlot } from 'src/shared/lib';
import { RegionMediaPlaceholder } from '../RegionMediaPlaceholder/RegionMediaPlaceholder';

type RegionCoverVisualVariant = 'hero' | 'strip';

interface RegionCoverVisualProps {
  readonly climate: string;
  readonly image: PreparedImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
  readonly variant?: RegionCoverVisualVariant;
  readonly zoomOnGroupHover?: boolean;
}

interface RegionCoverSlotStyle {
  readonly borderColor: string;
  readonly borderRadius: string;
  readonly borderWidth: string;
  readonly height: BoxProps['h'];
}

const slotStyles: Record<RegionCoverVisualVariant, RegionCoverSlotStyle> = {
  hero: {
    borderColor: 'rgba(103, 232, 249, 0.28)',
    borderRadius: 'md',
    borderWidth: '1px',
    height: { base: '220px', md: '320px' },
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
  placeholderDescription,
  placeholderTitle,
  variant = 'strip',
  zoomOnGroupHover = false,
}: RegionCoverVisualProps) {
  const slotStyle = slotStyles[variant];
  const hoverClassName = zoomOnGroupHover ? 'region-card-visual' : undefined;

  if (!image) {
    return (
      <RegionMediaPlaceholder
        borderColor={slotStyle.borderColor}
        borderRadius={slotStyle.borderRadius}
        borderWidth={slotStyle.borderWidth}
        className={hoverClassName}
        description={placeholderDescription}
        eyebrow={climate}
        height={slotStyle.height}
        title={placeholderTitle}
      />
    );
  }

  return (
    <Box
      bg="#071018"
      borderColor={slotStyle.borderColor}
      borderRadius={slotStyle.borderRadius}
      borderWidth={slotStyle.borderWidth}
      h={slotStyle.height}
      minW="0"
      overflow="hidden"
      position="relative"
      w="full"
      _after={{
        bg: 'linear-gradient(180deg, rgba(2, 7, 13, 0) 42%, rgba(2, 7, 13, 0.52) 100%)',
        content: '""',
        inset: 0,
        pointerEvents: 'none',
        position: 'absolute',
      }}
    >
      <Image
        alt={image.alt}
        className={hoverClassName}
        draggable={false}
        h="full"
        height={image.height}
        loading={image.loading}
        objectFit="cover"
        src={image.src}
        srcSet={image.srcSet}
        transformOrigin="center"
        transition="transform 180ms ease"
        w="full"
        width={image.width}
      />
    </Box>
  );
}
