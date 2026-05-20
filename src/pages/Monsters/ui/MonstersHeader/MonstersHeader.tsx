import { observer } from 'mobx-react-lite';

import { CatalogHeader } from 'src/shared/ui';
import type { MonstersViewModel } from '../../model/MonstersViewModel';

interface MonstersHeaderProps {
  readonly vm: MonstersViewModel;
}

export const MonstersHeader = observer(function MonstersHeader({ vm }: MonstersHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.capabilitiesAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="820px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="monsters-title"
      titleSize={{ base: '4xl', md: '5xl' }}
    />
  );
});
