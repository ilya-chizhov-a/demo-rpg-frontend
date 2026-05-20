import { Box, Text } from '@chakra-ui/react';

import type { PreparedImageSlot } from 'src/shared/lib';
import { ItemImageVisual } from '../ItemImageVisual/ItemImageVisual';

interface ItemDetailIconVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function ItemDetailIconVisual({
  image,
  placeholderDescription,
  placeholderTitle,
}: ItemDetailIconVisualProps) {
  return (
    <ItemImageVisual
      containerProps={{
        alignItems: 'center',
        aspectRatio: '1 / 1',
        bg: 'rgba(3, 10, 18, 0.72)',
        display: 'flex',
        justifyContent: 'center',
        minH: { base: '220px', md: '280px' },
        overflow: 'hidden',
        position: 'relative',
        w: 'full',
      }}
      image={image}
      imagePadding="8"
      placeholder={
        <Box maxW="360px" px="6" textAlign="center">
          <Text color="#f4f7f8" fontSize="xl" fontWeight="bold">
            {placeholderTitle}
          </Text>
          <Text color="#9aa7b1" lineHeight="1.5" mt="2">
            {placeholderDescription}
          </Text>
        </Box>
      }
    />
  );
}
