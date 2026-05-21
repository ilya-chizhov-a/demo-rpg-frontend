import type { PreparedImageSlot } from 'src/shared/lib';
import { CatalogMediaPlaceholder, CatalogMediaVisual } from 'src/shared/ui';

interface BlogImageVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
  readonly size?: 'card' | 'hero';
}

export function BlogImageVisual({
  image,
  placeholderDescription,
  placeholderTitle,
  size = 'card',
}: BlogImageVisualProps) {
  return (
    <CatalogMediaVisual
      containerProps={{
        alignItems: 'center',
        aspectRatio: size === 'hero' ? '16 / 7' : '16 / 9',
        bg: 'rgba(3, 10, 18, 0.72)',
        borderBottomColor: 'rgba(103, 232, 249, 0.12)',
        borderBottomWidth: size === 'card' ? '1px' : '0',
        borderRadius: size === 'hero' ? 'md' : undefined,
        display: 'flex',
        justifyContent: 'center',
        minH: size === 'hero' ? { base: '240px', md: '360px' } : undefined,
        overflow: 'hidden',
        position: 'relative',
        w: 'full',
      }}
      image={image}
      imageProps={{ objectFit: 'cover' }}
      placeholder={
        <CatalogMediaPlaceholder
          boxProps={{ px: '5' }}
          description={placeholderDescription}
          descriptionProps={{ fontSize: 'sm', lineHeight: '1.4' }}
          title={placeholderTitle}
        />
      }
    />
  );
}
