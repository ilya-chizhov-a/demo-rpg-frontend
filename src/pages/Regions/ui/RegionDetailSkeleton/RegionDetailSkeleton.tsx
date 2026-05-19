import { Stack } from '@chakra-ui/react';
import { DetailSkeletonPanel } from 'src/shared/ui';

export function RegionDetailSkeleton() {
  return (
    <Stack gap="4">
      <DetailSkeletonPanel lineWidths={['full', 'full', '60%']} titleWidth="180px" />
      <DetailSkeletonPanel lineWidths={['full', '70%']} titleWidth="160px" />
    </Stack>
  );
}
