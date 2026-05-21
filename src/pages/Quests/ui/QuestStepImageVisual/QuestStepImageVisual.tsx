import type { PreparedImageSlot } from 'src/shared/lib';
import { CatalogMediaPlaceholder, CatalogMediaVisual } from 'src/shared/ui';

interface QuestStepImageVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function QuestStepImageVisual({
  image,
  placeholderDescription,
  placeholderTitle,
}: QuestStepImageVisualProps) {
  return (
    <CatalogMediaVisual
      containerProps={{
        alignItems: 'center',
        aspectRatio: '13 / 9',
        bg: 'rgba(3, 10, 18, 0.72)',
        borderColor: 'rgba(103, 232, 249, 0.2)',
        borderRadius: 'md',
        borderWidth: '1px',
        display: 'flex',
        justifyContent: 'center',
        minW: '0',
        overflow: 'hidden',
        position: 'relative',
        w: 'full',
      }}
      image={image}
      placeholder={
        <CatalogMediaPlaceholder
          boxProps={{ maxW: '320px', px: '5' }}
          description={placeholderDescription}
          descriptionProps={{ lineHeight: '1.5' }}
          title={placeholderTitle}
        />
      }
    />
  );
}
