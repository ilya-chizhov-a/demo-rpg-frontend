import type { PreparedImageSlot } from 'src/shared/lib';
import { CatalogMediaPlaceholder, CatalogMediaVisual } from 'src/shared/ui';

interface MonsterImageVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function MonsterImageVisual({
  image,
  placeholderDescription,
  placeholderTitle,
}: MonsterImageVisualProps) {
  return (
    <CatalogMediaVisual
      containerProps={{
        alignItems: 'center',
        aspectRatio: '4 / 3',
        bg: 'rgba(3, 10, 18, 0.72)',
        borderBottomColor: 'rgba(103, 232, 249, 0.12)',
        borderBottomWidth: '1px',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        w: 'full',
      }}
      image={image}
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
