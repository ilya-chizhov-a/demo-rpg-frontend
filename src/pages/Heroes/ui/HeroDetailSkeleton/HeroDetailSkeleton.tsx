import { Box, Grid, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react';

export function HeroDetailSkeleton() {
  return (
    <Stack gap="5">
      <Grid gap="5" templateColumns={{ base: '1fr', lg: '420px minmax(0, 1fr)' }}>
        <Skeleton h={{ base: '340px', md: '520px' }} />
        <Box>
          <Skeleton h="32px" maxW="180px" mb="4" />
          <Skeleton h="64px" maxW="520px" mb="4" />
          <Skeleton h="28px" maxW="720px" />
        </Box>
      </Grid>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="4">
        <Skeleton h="280px" />
        <Skeleton h="280px" />
        <Skeleton h="280px" />
      </SimpleGrid>
    </Stack>
  );
}
