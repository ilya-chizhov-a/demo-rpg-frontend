import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { PartyDetailViewModel } from '../../model/PartyDetailViewModel';

interface PartyDetailHeaderProps {
  readonly vm: PartyDetailViewModel;
}

export const PartyDetailHeader = observer(({ vm }: PartyDetailHeaderProps) => {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between" wrap="wrap">
        <Flex gap="2" wrap="wrap">
          <Badge colorPalette="cyan" variant="subtle">
            {vm.fullStateLabel}
          </Badge>
          <Badge colorPalette="purple" variant="subtle">
            {vm.formationLabel}
          </Badge>
        </Flex>
        <Text>{vm.localeLabel}</Text>
      </Flex>
      <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} lineHeight="1.05" mt="4">
        {vm.title}
      </Heading>
      <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" mt="4">
        {vm.motto}
      </Text>
    </Box>
  );
});
