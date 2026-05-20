import { CatalogHeader } from 'src/shared/ui';
import type { HeroesViewModel } from '../../model/HeroesViewModel';

interface HeroesHeaderProps {
  readonly vm: HeroesViewModel;
}

export function HeroesHeader({ vm }: HeroesHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.capabilitiesAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="860px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="heroes-title"
      titleSize={{ base: '3xl', md: '5xl' }}
    />
  );
}
