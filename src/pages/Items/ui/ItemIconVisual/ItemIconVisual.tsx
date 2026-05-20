import { Text } from '@chakra-ui/react';

import type { PreparedImageSlot } from 'src/shared/lib';
import { ItemImageVisual } from '../ItemImageVisual/ItemImageVisual';

interface ItemIconVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderLabel: string;
}

export function ItemIconVisual({ image, placeholderLabel }: ItemIconVisualProps) {
  return (
    <ItemImageVisual
      containerProps={{
        alignItems: 'center',
        bg: 'rgba(3, 10, 18, 0.72)',
        borderColor: 'rgba(103, 232, 249, 0.18)',
        borderRadius: 'md',
        borderWidth: '1px',
        display: 'flex',
        flex: '0 0 88px',
        h: '88px',
        justifyContent: 'center',
        overflow: 'hidden',
        w: '88px',
      }}
      image={image}
      imagePadding="2"
      placeholder={
        <Text color="#9aa7b1" fontSize="xs" lineHeight="1.2" px="2" textAlign="center">
          {placeholderLabel}
        </Text>
      }
    />
  );
}
