import { Box, Grid, Skeleton, Stack } from '@chakra-ui/react';
import { DetailSkeletonPanel } from 'src/shared/ui';

export function LocationDetailSkeleton() {
  return (
    <Stack gap="4">
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
          <Skeleton h="10" w="260px" />
          <DetailSkeletonPanel lineWidths={['full', 'full', '60%']} titleWidth="180px" />
          <DetailSkeletonPanel lineWidths={['full', 'full', 'full', '70%']} titleWidth="160px" />
        </Stack>
      </Grid>
      <Box
        bg="rgba(18, 24, 32, 0.82)"
        borderColor="rgba(103, 232, 249, 0.14)"
        borderRadius="md"
        borderWidth="1px"
        p="6"
      >
        <Skeleton h="6" mb="5" w="160px" />
        <Skeleton h="220px" mb="4" />
        <Skeleton h="4" mb="3" />
        <Skeleton h="4" w="70%" />
      </Box>
    </Stack>
  );
}
