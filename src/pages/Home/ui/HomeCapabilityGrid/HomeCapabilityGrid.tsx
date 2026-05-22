import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { HomeViewModel } from '../../model/HomeViewModel';
import { HomeCapabilityCard } from '../HomeCapabilityCard/HomeCapabilityCard';

interface HomeCapabilityGridProps {
  readonly vm: HomeViewModel;
}

export const HomeCapabilityGrid = observer(({
  vm,
}: HomeCapabilityGridProps) => {
  const { capabilitySection } = vm;

  return (
    <Box
      aria-labelledby="home-capabilities-title"
      as="section"
      pb={{ base: '6', md: '8' }}
    >
      <Heading as="h2" fontSize="2xl" id="home-capabilities-title">
        {capabilitySection.title}
      </Heading>
      <Text color="#9aa7b1" lineHeight="1.6" maxW="760px" mt="2">
        {capabilitySection.description}
      </Text>
      <SimpleGrid alignItems="stretch" as="div" columns={{ base: 1, md: 2, xl: 3 }} gap="4" mt="5">
        {vm.capabilities.map((item) => (
          <HomeCapabilityCard item={item} key={item.key} />
        ))}
      </SimpleGrid>
    </Box>
  );
});
