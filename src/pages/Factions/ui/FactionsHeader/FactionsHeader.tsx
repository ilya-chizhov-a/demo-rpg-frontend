import { observer } from 'mobx-react-lite';
import { CatalogHeader } from 'src/shared/ui';

import type { FactionsViewModel } from '../../model/FactionsViewModel';

interface FactionsHeaderProps {
  readonly vm: FactionsViewModel;
}

export const FactionsHeader = observer(function FactionsHeader({ vm }: FactionsHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.capabilitiesAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="760px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="factions-title"
      titleSize={{ base: '4xl', md: '5xl' }}
    />
  );
});
