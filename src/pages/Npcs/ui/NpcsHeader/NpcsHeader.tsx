import { observer } from 'mobx-react-lite';

import { CatalogHeader } from 'src/shared/ui';
import type { NpcsViewModel } from '../../model/NpcsViewModel';

interface NpcsHeaderProps {
  readonly vm: NpcsViewModel;
}

export const NpcsHeader = observer(function NpcsHeader({ vm }: NpcsHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.capabilitiesAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="780px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="npcs-title"
      titleSize={{ base: '4xl', md: '5xl' }}
    />
  );
});
