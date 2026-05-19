import { Grid, Skeleton, Stack } from '@chakra-ui/react';
import { DetailSkeletonPanel } from 'src/shared/ui';

export function RegionDetailSkeleton() {
  return (
    <Grid
      alignItems="start"
      gap={{ base: '4', lg: '5' }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        xl: 'minmax(0, min(840px, 58vw)) minmax(360px, 1fr)',
      }}
    >
      <Skeleton
        borderColor="rgba(103, 232, 249, 0.14)"
        borderRadius="md"
        borderWidth="1px"
        h={{ base: '220px', md: '360px', xl: '560px' }}
        w="full"
      />
      <Stack gap="4">
        <DetailSkeletonPanel lineWidths={['full', 'full', '60%']} titleWidth="180px" />
        <DetailSkeletonPanel lineWidths={['full', 'full', 'full', '70%']} titleWidth="160px" />
        <DetailSkeletonPanel lineWidths={['full', '70%']} titleWidth="160px" />
      </Stack>
    </Grid>
  );
}
