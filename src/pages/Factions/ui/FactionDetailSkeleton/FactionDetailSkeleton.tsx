import { Grid, Skeleton, Stack } from '@chakra-ui/react';
import { DetailSkeletonPanel } from 'src/shared/ui';

export function FactionDetailSkeleton() {
  return (
    <Stack gap="4">
      <Grid
        alignItems="start"
        gap={{ base: '4', lg: '5' }}
        templateColumns={{
          base: 'minmax(0, 1fr)',
          xl: 'minmax(0, min(640px, 48vw)) minmax(360px, 1fr)',
        }}
      >
        <Skeleton
          borderColor="rgba(103, 232, 249, 0.14)"
          borderRadius="md"
          borderWidth="1px"
          h={{ base: '320px', md: '520px', xl: '640px' }}
          w="full"
        />
        <Stack gap="4">
          <DetailSkeletonPanel lineWidths={['full', 'full', '60%']} titleWidth="180px" />
          <DetailSkeletonPanel lineWidths={['full', 'full', 'full', '70%']} titleWidth="160px" />
        </Stack>
      </Grid>
      <Grid gap="4" templateColumns={{ base: 'minmax(0, 1fr)', xl: 'repeat(2, minmax(0, 1fr))' }}>
        <DetailSkeletonPanel lineWidths={['full', 'full', '65%']} titleWidth="180px" />
        <DetailSkeletonPanel lineWidths={['full', 'full', '65%']} titleWidth="140px" />
      </Grid>
    </Stack>
  );
}
