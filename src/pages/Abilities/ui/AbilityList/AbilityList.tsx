import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { AbilitiesViewModel } from '../../model/AbilitiesViewModel';
import { AbilityCard } from '../AbilityCard/AbilityCard';

interface AbilityListProps {
  readonly vm: AbilitiesViewModel;
}

export const AbilityList = observer(({ vm }: AbilityListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.catalogState.showRefreshing}
      columns={{ base: 1, md: 2, xl: 4 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <AbilityCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
