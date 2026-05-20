import { Grid, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { MonsterDetailViewModel } from '../../model/MonsterDetailViewModel';
import { MonsterAbilityList } from '../MonsterAbilityList/MonsterAbilityList';
import { MonsterDetailHeader } from '../MonsterDetailHeader/MonsterDetailHeader';
import { MonsterDetailImageVisual } from '../MonsterDetailImageVisual/MonsterDetailImageVisual';
import { MonsterDetailPanel } from '../MonsterDetailPanel/MonsterDetailPanel';
import { MonsterDropList } from '../MonsterDropList/MonsterDropList';

interface MonsterDetailOverviewProps {
  readonly vm: MonsterDetailViewModel;
}

export const MonsterDetailOverview = observer(({ vm }: MonsterDetailOverviewProps) => {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(320px, 460px) minmax(0, 1fr)',
      }}
    >
      <MonsterDetailImageVisual
        image={vm.image}
        placeholderDescription={vm.imagePlaceholderDescription}
        placeholderTitle={vm.imagePlaceholderTitle}
      />

      <Stack gap="4" minW="0">
        <MonsterDetailHeader vm={vm} />
        <MonsterDetailPanel vm={vm} />
        <MonsterAbilityList vm={vm} />
        <MonsterDropList vm={vm} />
      </Stack>
    </Grid>
  );
});
