import { Grid, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { RegionDetailViewModel } from '../../model/RegionDetailViewModel';
import { RegionBackendPanel } from '../RegionBackendPanel/RegionBackendPanel';
import { RegionCoverVisual } from '../RegionCoverVisual/RegionCoverVisual';
import { RegionDetailHeader } from '../RegionDetailHeader/RegionDetailHeader';
import { RegionDetailPanel } from '../RegionDetailPanel/RegionDetailPanel';

interface RegionDetailOverviewProps {
  readonly vm: RegionDetailViewModel;
}

export const RegionDetailOverview = observer(({ vm }: RegionDetailOverviewProps) => {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(0, min(840px, 58vw)) minmax(360px, 1fr)',
      }}
    >
      <RegionCoverVisual
        climate={vm.climateLabel}
        image={vm.coverImage}
        isImageLoaded={vm.isCoverImageLoaded}
        isImageUnavailable={vm.isCoverImageUnavailable}
        onImageError={(image) => vm.handleCoverImageError(image)}
        onImageLoad={() => vm.handleCoverImageLoad()}
        placeholderDescription={vm.coverPlaceholderDescription}
        placeholderTitle={vm.coverPlaceholderTitle}
        variant="hero"
      />

      <Stack gap="4" minW="0">
        <RegionDetailHeader vm={vm} />
        <RegionDetailPanel vm={vm} />
        <RegionBackendPanel copy={vm.copy.detail} />
      </Stack>
    </Grid>
  );
});
