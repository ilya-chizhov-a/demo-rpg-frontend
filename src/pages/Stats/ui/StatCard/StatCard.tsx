import { observer } from 'mobx-react-lite';

import { ReferenceCatalogCard, ReferenceCodeMark } from 'src/shared/ui';
import type { StatItemViewModel } from '../../model/StatItemViewModel';
import type { StatsPageCopy } from '../../model/statsUiCopy';

interface StatCardProps {
  readonly copy: StatsPageCopy;
  readonly item: StatItemViewModel;
}

export const StatCard = observer(({ copy, item }: StatCardProps) => {
  return (
    <ReferenceCatalogCard
      actionLabel={copy.cardActionLabel}
      actionTo={item.itemsHref}
      badge={item.code}
      description={item.description}
      facts={[
        { label: copy.abbreviationLabel, value: item.abbreviation },
        { label: copy.codeLabel, value: item.code },
        { label: copy.valueFormatLabel, value: item.valueFormatLabel },
      ]}
      localeLabel={item.localeLabel}
      mark={<ReferenceCodeMark label={item.codeMark} />}
      title={item.title}
    />
  );
});
