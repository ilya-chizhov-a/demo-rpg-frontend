import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { EffectsViewModel } from '../../model/EffectsViewModel';
import { EffectCard } from '../EffectCard/EffectCard';

interface EffectListProps {
  readonly vm: EffectsViewModel;
}

export const EffectList = observer(({ vm }: EffectListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.viewState.showRefreshing}
      columns={{ base: 1, lg: 2 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <EffectCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
