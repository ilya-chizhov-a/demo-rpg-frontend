import { Grid, Skeleton, Stack } from '@chakra-ui/react';

import { DetailSkeletonPanel } from 'src/shared/ui';

export function MonsterDetailSkeleton() {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(320px, 460px) minmax(0, 1fr)',
      }}
    >
      <Skeleton aspectRatio="8 / 9" borderRadius="md" />
      <Stack gap="4">
        <DetailSkeletonPanel lineWidths={['80%', '64%', '92%']} titleWidth="52%" />
        <DetailSkeletonPanel lineWidths={['88%', '72%', '64%', '76%']} titleWidth="38%" />
        <DetailSkeletonPanel lineWidths={['84%', '76%', '68%']} titleWidth="42%" />
      </Stack>
    </Grid>
  );
}
