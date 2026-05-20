import { observer } from 'mobx-react-lite';

import { CatalogHeader } from 'src/shared/ui';
import type { AbilitiesViewModel } from '../../model/AbilitiesViewModel';

interface AbilitiesHeaderProps {
  readonly vm: AbilitiesViewModel;
}

export const AbilitiesHeader = observer(function AbilitiesHeader({ vm }: AbilitiesHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.capabilitiesAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="760px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="abilities-title"
      titleSize={{ base: '4xl', md: '5xl' }}
    />
  );
});
