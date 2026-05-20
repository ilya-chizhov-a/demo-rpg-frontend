import { Badge, Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import { CatalogFactRow } from 'src/shared/ui';
import type { MonsterDetailViewModel } from '../../model/MonsterDetailViewModel';

interface MonsterDetailHeaderProps {
  readonly vm: MonsterDetailViewModel;
}

export const MonsterDetailHeader = observer(({ vm }: MonsterDetailHeaderProps) => {
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
          <Badge colorPalette="teal" variant="subtle">
            {vm.kindLabel}
          </Badge>
          <Badge colorPalette="purple" variant="subtle">
            {vm.factionAlignmentLabel}
          </Badge>
        </Flex>
        <Text>{vm.localeLabel}</Text>
      </Flex>
      <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} lineHeight="1.05" mt="4">
        {vm.title}
      </Heading>
      <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" mt="4">
        {vm.description}
      </Text>

      <Flex align="center" gap="4" mt="5" wrap="wrap">
        {vm.canOpenFaction ? (
          <Button
            asChild
            color="#67e8f9"
            minH="44px"
            px="0"
            variant="plain"
            _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
          >
            <RouterLink to={vm.factionHref}>
              {vm.copy.detail.fieldFaction}: {vm.factionTitle}
            </RouterLink>
          </Button>
        ) : null}
      </Flex>

      <SimpleGrid
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: 3 }}
        gapX="4"
        mt="4"
        pt="2"
      >
        <CatalogFactRow label={vm.copy.detail.fieldLevel} value={vm.levelLabel} />
        <CatalogFactRow label={vm.copy.detail.fieldHp} value={vm.hpLabel} />
        <CatalogFactRow label={vm.copy.detail.fieldBaseDamage} value={vm.baseDamageLabel} />
      </SimpleGrid>
    </Box>
  );
});
