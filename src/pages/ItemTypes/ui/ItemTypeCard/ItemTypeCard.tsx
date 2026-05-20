import { observer } from 'mobx-react-lite';

import { ReferenceCatalogCard, ReferenceCodeMark } from 'src/shared/ui';
import type { ItemTypeItemViewModel } from '../../model/ItemTypeItemViewModel';
import type { ItemTypesPageCopy } from '../../model/itemTypesUiCopy';

interface ItemTypeCardProps {
  readonly copy: ItemTypesPageCopy;
  readonly item: ItemTypeItemViewModel;
}

export const ItemTypeCard = observer(({ copy, item }: ItemTypeCardProps) => {
  return (
    <ReferenceCatalogCard
      actionLabel={copy.cardActionLabel}
      actionTo={item.itemsHref}
      badge={item.code}
      description={item.description}
      facts={[
        { label: copy.codeLabel, value: item.code },
        { label: copy.itemsCountLabel, value: item.itemsCountLabel },
      ]}
      localeLabel={item.localeLabel}
      mark={<ReferenceCodeMark label={item.codeMark} />}
      title={item.title}
    />
  );
});
