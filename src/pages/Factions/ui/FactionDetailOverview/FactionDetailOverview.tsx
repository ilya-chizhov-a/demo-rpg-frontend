import { Grid, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { FactionDetailViewModel } from '../../model/FactionDetailViewModel';
import { FactionDetailCrestVisual } from '../FactionDetailCrestVisual/FactionDetailCrestVisual';
import { FactionDetailHeader } from '../FactionDetailHeader/FactionDetailHeader';
import { FactionDetailPanel } from '../FactionDetailPanel/FactionDetailPanel';

interface FactionDetailOverviewProps {
  readonly vm: FactionDetailViewModel;
}

export const FactionDetailOverview = observer(({ vm }: FactionDetailOverviewProps) => {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(0, min(640px, 48vw)) minmax(360px, 1fr)',
      }}
    >
      <FactionDetailCrestVisual
        alignmentLabel={vm.alignmentLabel}
        image={vm.crestImage}
        placeholderDescription={vm.crestPlaceholderDescription}
        placeholderTitle={vm.crestPlaceholderTitle}
      />

      <Stack gap="4" minW="0">
        <FactionDetailHeader vm={vm} />
        <FactionDetailPanel vm={vm} />
      </Stack>
    </Grid>
  );
});
