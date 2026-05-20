import { Grid, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { NpcDetailViewModel } from '../../model/NpcDetailViewModel';
import { NpcDetailHeader } from '../NpcDetailHeader/NpcDetailHeader';
import { NpcDetailPanel } from '../NpcDetailPanel/NpcDetailPanel';
import { NpcDetailPortraitVisual } from '../NpcDetailPortraitVisual/NpcDetailPortraitVisual';

interface NpcDetailOverviewProps {
  readonly vm: NpcDetailViewModel;
}

export const NpcDetailOverview = observer(({ vm }: NpcDetailOverviewProps) => {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(320px, 420px) minmax(0, 1fr)',
      }}
    >
      <NpcDetailPortraitVisual
        image={vm.portraitImage}
        placeholderDescription={vm.portraitPlaceholderDescription}
        placeholderTitle={vm.portraitPlaceholderTitle}
      />

      <Stack gap="4" minW="0">
        <NpcDetailHeader vm={vm} />
        <NpcDetailPanel vm={vm} />
      </Stack>
    </Grid>
  );
});
