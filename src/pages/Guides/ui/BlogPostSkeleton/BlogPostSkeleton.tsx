import { Box, Skeleton, Stack } from '@chakra-ui/react';

import { DetailSkeletonPanel } from 'src/shared/ui';

export function BlogPostSkeleton() {
  return (
    <Stack gap="5">
      <Skeleton borderRadius="md" h={{ base: '240px', md: '360px' }} />
      <Box maxW="880px">
        <DetailSkeletonPanel lineWidths={['90%', '72%', '82%', '64%']} titleWidth="56%" />
      </Box>
      <Box maxW="880px">
        <DetailSkeletonPanel lineWidths={['96%', '88%', '92%', '80%', '74%']} titleWidth="34%" />
      </Box>
    </Stack>
  );
}
