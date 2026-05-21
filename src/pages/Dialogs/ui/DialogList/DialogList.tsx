import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { DialogsViewModel } from '../../model/DialogsViewModel';
import { DialogCard } from '../DialogCard/DialogCard';

interface DialogListProps {
  readonly vm: DialogsViewModel;
}

export const DialogList = observer(function DialogList({ vm }: DialogListProps) {
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
        <DialogCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
