import { Stack } from '@chakra-ui/react';

import { DetailSkeletonPanel } from 'src/shared/ui';

export function PartyDetailSkeleton() {
  return (
    <Stack gap="4">
      <DetailSkeletonPanel lineWidths={['74%', '92%', '68%']} titleWidth="46%" />
      <DetailSkeletonPanel lineWidths={['88%', '72%', '64%', '76%']} titleWidth="38%" />
      <DetailSkeletonPanel lineWidths={['92%', '78%', '84%', '66%']} titleWidth="42%" />
    </Stack>
  );
}
