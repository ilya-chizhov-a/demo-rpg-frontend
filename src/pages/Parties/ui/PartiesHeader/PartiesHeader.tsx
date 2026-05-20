import { observer } from 'mobx-react-lite';

import { CatalogHeader } from 'src/shared/ui';
import type { PartiesViewModel } from '../../model/PartiesViewModel';

interface PartiesHeaderProps {
  readonly vm: PartiesViewModel;
}

export const PartiesHeader = observer(function PartiesHeader({ vm }: PartiesHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.capabilitiesAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="780px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="parties-title"
      titleSize={{ base: '4xl', md: '5xl' }}
    />
  );
});
