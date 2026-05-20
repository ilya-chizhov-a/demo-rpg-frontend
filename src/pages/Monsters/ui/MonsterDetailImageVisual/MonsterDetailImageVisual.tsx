import type { PreparedImageSlot } from 'src/shared/lib';
import { CatalogMediaPlaceholder, CatalogMediaVisual } from 'src/shared/ui';

interface MonsterDetailImageVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function MonsterDetailImageVisual({
  image,
  placeholderDescription,
  placeholderTitle,
}: MonsterDetailImageVisualProps) {
  return (
    <CatalogMediaVisual
      containerProps={{
        alignItems: 'center',
        aspectRatio: '8 / 9',
        bg: 'rgba(3, 10, 18, 0.72)',
        borderColor: 'rgba(103, 232, 249, 0.28)',
        borderRadius: 'md',
        borderWidth: '1px',
        display: 'flex',
        justifyContent: 'center',
        maxH: { base: '620px', xl: '760px' },
        minW: '0',
        overflow: 'hidden',
        position: 'relative',
        w: 'full',
      }}
      image={image}
      placeholder={
        <CatalogMediaPlaceholder
          boxProps={{ maxW: '360px', px: '6' }}
          description={placeholderDescription}
          descriptionProps={{ lineHeight: '1.5' }}
          title={placeholderTitle}
          titleProps={{ fontSize: 'xl' }}
        />
      }
    />
  );
}
