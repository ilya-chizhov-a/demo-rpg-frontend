import { Box, Image, type BoxProps } from '@chakra-ui/react';
import { useEffect, useState, type ReactNode } from 'react';

import type { PreparedImageSlot } from 'src/shared/lib';

interface ItemImageVisualProps {
  readonly containerProps: BoxProps;
  readonly image: PreparedImageSlot | null;
  readonly imagePadding: BoxProps['p'];
  readonly placeholder: ReactNode;
}

export function ItemImageVisual({
  containerProps,
  image,
  imagePadding,
  placeholder,
}: ItemImageVisualProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(image) && !imageError;

  useEffect(() => {
    setImageError(false);
  }, [image?.src]);

  return (
    <Box {...containerProps}>
      {showImage && image ? (
        <Image
          alt={image.alt}
          draggable={false}
          h="full"
          htmlHeight={image.height}
          htmlWidth={image.width}
          loading={image.loading}
          objectFit="contain"
          onError={() => setImageError(true)}
          p={imagePadding}
          src={image.src}
          srcSet={image.srcSet}
          w="full"
        />
      ) : (
        placeholder
      )}
    </Box>
  );
}
