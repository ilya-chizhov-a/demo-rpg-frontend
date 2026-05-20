import { Badge, Box, Button, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { MonsterDetailViewModel } from '../../model/MonsterDetailViewModel';

interface MonsterAbilityListProps {
  readonly vm: MonsterDetailViewModel;
}

export const MonsterAbilityList = observer(({ vm }: MonsterAbilityListProps) => {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Flex align="center" gap="3" justify="space-between" mb="4" wrap="wrap">
        <Heading as="h2" fontSize="xl">
          {vm.copy.detail.abilitiesTitle}
        </Heading>
        <Button
          asChild
          color="#67e8f9"
          minH="36px"
          size="sm"
          variant="outline"
          _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
        >
          <RouterLink to={vm.abilitiesHref}>{vm.copy.detail.abilityCatalogAction}</RouterLink>
        </Button>
      </Flex>

      {vm.hasAbilities ? (
        <Stack as="ul" gap="0" listStyleType="none">
          {vm.abilities.map((ability) => (
            <Box
              as="li"
              borderBottomColor="rgba(148, 163, 184, 0.18)"
              borderBottomWidth="1px"
              key={ability.id}
              py="4"
              _first={{ pt: '0' }}
              _last={{ borderBottomWidth: '0', pb: '0' }}
            >
              <Flex align="flex-start" gap="4" justify="space-between" wrap="wrap">
                <Box flex="1" minW={{ base: '100%', md: '280px' }}>
                  <Heading as="h3" fontSize="md">
                    {ability.title}
                  </Heading>
                  <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2">
                    {ability.description}
                  </Text>
                </Box>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2" minW={{ base: '100%', md: '280px' }}>
                  <Badge colorPalette="teal" variant="subtle">
                    {vm.copy.detail.abilityKindLabel}: {ability.kindLabel}
                  </Badge>
                  <Badge colorPalette="purple" variant="subtle">
                    {vm.copy.detail.abilitySchoolLabel}: {ability.schoolLabel}
                  </Badge>
                  <Badge colorPalette="cyan" variant="subtle">
                    {vm.copy.detail.abilityLevelLabel}: {ability.levelLabel}
                  </Badge>
                  <Badge colorPalette="green" variant="subtle">
                    {vm.copy.detail.abilityDamageLabel}: {ability.damageLabel}
                  </Badge>
                  <Badge colorPalette="cyan" variant="subtle">
                    {vm.copy.detail.abilityCooldownLabel}: {ability.cooldownLabel}
                  </Badge>
                </SimpleGrid>
              </Flex>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box borderTopColor="rgba(148, 163, 184, 0.18)" borderTopWidth="1px" pt="4">
          <Heading as="h3" fontSize="md">
            {vm.copy.detail.abilitiesEmptyTitle}
          </Heading>
          <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2">
            {vm.copy.detail.abilitiesEmptyDescription}
          </Text>
        </Box>
      )}
    </Box>
  );
});
