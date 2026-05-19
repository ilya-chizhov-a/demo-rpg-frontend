import { Grid, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { LocationDetailViewModel } from '../../model/LocationDetailViewModel';
import { LocationDetailHeader } from '../LocationDetailHeader/LocationDetailHeader';
import { LocationDetailMapVisual } from '../LocationDetailMapVisual/LocationDetailMapVisual';
import { LocationDetailPanel } from '../LocationDetailPanel/LocationDetailPanel';

interface LocationDetailOverviewProps {
  readonly vm: LocationDetailViewModel;
}

export const LocationDetailOverview = observer(({ vm }: LocationDetailOverviewProps) => {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(0, min(840px, 58vw)) minmax(360px, 1fr)',
      }}
    >
      <LocationDetailMapVisual
        image={vm.mapImage}
        kindLabel={vm.kindLabel}
        placeholderDescription={vm.mapPlaceholderDescription}
        placeholderTitle={vm.mapPlaceholderTitle}
      />

      <Stack gap="4" minW="0">
        <LocationDetailHeader vm={vm} />
        <LocationDetailPanel vm={vm} />
      </Stack>
    </Grid>
  );
});
