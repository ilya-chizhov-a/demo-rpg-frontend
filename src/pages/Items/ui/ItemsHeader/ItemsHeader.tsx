import { observer } from 'mobx-react-lite';

import { CatalogHeader } from 'src/shared/ui';
import type { ItemsViewModel } from '../../model/ItemsViewModel';

interface ItemsHeaderProps {
  readonly vm: ItemsViewModel;
}

export const ItemsHeader = observer(function ItemsHeader({ vm }: ItemsHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.capabilitiesAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="840px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="items-title"
      titleSize={{ base: '4xl', md: '5xl' }}
    />
  );
});
