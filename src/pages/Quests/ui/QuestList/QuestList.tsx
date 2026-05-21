import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { QuestsViewModel } from '../../model/QuestsViewModel';
import { QuestCard } from '../QuestCard/QuestCard';

interface QuestListProps {
  readonly vm: QuestsViewModel;
}

export const QuestList = observer(function QuestList({ vm }: QuestListProps) {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.catalogState.showRefreshing}
      columns={{ base: 1, lg: 2, xl: 3 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <QuestCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
