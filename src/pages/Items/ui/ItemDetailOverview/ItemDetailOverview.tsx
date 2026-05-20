import { Grid, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { ItemDetailViewModel } from '../../model/ItemDetailViewModel';
import { ItemDetailFilePanel } from '../ItemDetailFilePanel/ItemDetailFilePanel';
import { ItemDetailHeader } from '../ItemDetailHeader/ItemDetailHeader';
import { ItemDetailPanel } from '../ItemDetailPanel/ItemDetailPanel';
import { ItemModifierList } from '../ItemModifierList/ItemModifierList';

interface ItemDetailOverviewProps {
  readonly vm: ItemDetailViewModel;
}

export const ItemDetailOverview = observer(({ vm }: ItemDetailOverviewProps) => {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(300px, 420px) minmax(0, 1fr)',
      }}
    >
      <ItemDetailFilePanel vm={vm} />

      <Stack gap="4" minW="0">
        <ItemDetailHeader vm={vm} />
        <ItemDetailPanel vm={vm} />
        <ItemModifierList vm={vm} />
      </Stack>
    </Grid>
  );
});
