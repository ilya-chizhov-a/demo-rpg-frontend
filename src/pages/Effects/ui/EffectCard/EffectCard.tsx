import { observer } from 'mobx-react-lite';

import { ReferenceCatalogCard, ReferenceCodeMark } from 'src/shared/ui';
import type { EffectItemViewModel } from '../../model/EffectItemViewModel';
import type { EffectsPageCopy } from '../../model/effectsUiCopy';

interface EffectCardProps {
  readonly copy: EffectsPageCopy;
  readonly item: EffectItemViewModel;
}

export const EffectCard = observer(({ copy, item }: EffectCardProps) => {
  return (
    <ReferenceCatalogCard
      actionLabel={copy.cardActionLabel}
      actionTo={item.itemsHref}
      badge={item.kindLabel}
      description={item.description}
      facts={[
        { label: copy.codeLabel, value: item.code },
        { label: copy.kindFieldLabel, value: item.kindLabel },
        { label: copy.defaultDurationLabel, value: item.defaultDurationLabel },
      ]}
      localeLabel={item.localeLabel}
      mark={
        <ReferenceCodeMark
          accentColor="#5eead4"
          bg="rgba(20, 184, 166, 0.12)"
          borderColor="rgba(94, 234, 212, 0.34)"
          label={item.codeMark}
        />
      }
      title={item.title}
    />
  );
});
