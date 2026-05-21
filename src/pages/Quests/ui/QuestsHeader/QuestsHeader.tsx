import { observer } from 'mobx-react-lite';

import { CatalogHeader } from 'src/shared/ui';
import type { QuestsViewModel } from '../../model/QuestsViewModel';

interface QuestsHeaderProps {
  readonly vm: QuestsViewModel;
}

export const QuestsHeader = observer(function QuestsHeader({ vm }: QuestsHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.capabilitiesAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="900px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="quests-title"
      titleSize={{ base: '4xl', md: '5xl' }}
    />
  );
});
