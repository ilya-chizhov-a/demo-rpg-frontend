import { SimpleGrid, Skeleton, Stack } from '@chakra-ui/react';

import { DetailSkeletonPanel } from 'src/shared/ui';

export function QuestDetailSkeleton() {
  return (
    <Stack gap="4">
      <DetailSkeletonPanel lineWidths={['78%', '92%', '64%']} titleWidth="46%" />
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
        <DetailSkeletonPanel lineWidths={['88%', '72%', '64%', '76%']} titleWidth="38%" />
        <DetailSkeletonPanel lineWidths={['80%', '64%', '92%']} titleWidth="52%" />
      </SimpleGrid>
      <Stack
        bg="rgba(18, 24, 32, 0.9)"
        borderColor="rgba(103, 232, 249, 0.16)"
        borderRadius="md"
        borderWidth="1px"
        gap="4"
        p="6"
      >
        <Skeleton height="28px" maxW="240px" />
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
          <Skeleton height="220px" />
          <Stack gap="3">
            <Skeleton height="28px" />
            <Skeleton height="84px" />
            <Skeleton height="140px" />
          </Stack>
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
