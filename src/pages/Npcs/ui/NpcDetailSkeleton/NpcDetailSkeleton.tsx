import { Grid, Stack, Skeleton } from '@chakra-ui/react';

import { DetailSkeletonPanel } from 'src/shared/ui';

export function NpcDetailSkeleton() {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(320px, 420px) minmax(0, 1fr)',
      }}
    >
      <Skeleton aspectRatio="3 / 4" borderRadius="md" />
      <Stack gap="4">
        <DetailSkeletonPanel lineWidths={['80%', '64%', '92%']} titleWidth="52%" />
        <DetailSkeletonPanel lineWidths={['88%', '72%', '64%', '76%']} titleWidth="38%" />
      </Stack>
    </Grid>
  );
}
