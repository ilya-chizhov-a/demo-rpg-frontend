import { observer } from 'mobx-react-lite';

import { CatalogHeader } from 'src/shared/ui';
import type { DialogsViewModel } from '../../model/DialogsViewModel';

interface DialogsHeaderProps {
  readonly vm: DialogsViewModel;
}

export const DialogsHeader = observer(function DialogsHeader({ vm }: DialogsHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.capabilitiesAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="760px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="dialogs-title"
      titleSize={{ base: '4xl', md: '5xl' }}
    />
  );
});
