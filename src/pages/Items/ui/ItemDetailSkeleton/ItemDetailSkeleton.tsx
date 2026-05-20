import { Grid, Stack, Skeleton } from '@chakra-ui/react';

import { DetailSkeletonPanel } from 'src/shared/ui';

export function ItemDetailSkeleton() {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(300px, 420px) minmax(0, 1fr)',
      }}
    >
      <Stack gap="4">
        <Skeleton aspectRatio="1 / 1" borderRadius="md" />
        <DetailSkeletonPanel lineWidths={['88%', '72%', '64%', '76%']} titleWidth="42%" />
      </Stack>
      <Stack gap="4">
        <DetailSkeletonPanel lineWidths={['80%', '64%', '92%']} titleWidth="52%" />
        <DetailSkeletonPanel lineWidths={['88%', '72%', '64%', '76%']} titleWidth="38%" />
        <DetailSkeletonPanel lineWidths={['92%', '78%', '84%']} titleWidth="44%" />
      </Stack>
    </Grid>
  );
}
