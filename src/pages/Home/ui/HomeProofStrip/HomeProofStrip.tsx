import { Box, SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { HomeViewModel } from '../../model/HomeViewModel';
import { HomeProofStripItem } from '../HomeProofStripItem/HomeProofStripItem';

interface HomeProofStripProps {
  readonly vm: HomeViewModel;
}

export const HomeProofStrip = observer(({ vm }: HomeProofStripProps) => {
  return (
    <Box
      as="section"
      aria-label="Codex highlights"
      bg="rgba(18, 24, 32, 0.86)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      overflow="hidden"
    >
      <SimpleGrid columns={{ base: 1, md: 4 }}>
        {vm.proofNodes.map((item) => (
          <HomeProofStripItem item={item} key={item.key} />
        ))}
      </SimpleGrid>
    </Box>
  );
});
