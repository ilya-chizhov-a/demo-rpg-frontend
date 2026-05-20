import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { CatalogFactRow } from 'src/shared/ui';

import type { AbilityItemViewModel } from '../../model/AbilityItemViewModel';
import type { AbilitiesPageCopy } from '../../model/abilityUiCopy';
import { AbilityIconVisual } from '../AbilityIconVisual/AbilityIconVisual';

interface AbilityCardProps {
  readonly copy: AbilitiesPageCopy;
  readonly item: AbilityItemViewModel;
}

export const AbilityCard = observer(({ copy, item }: AbilityCardProps) => {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      minH="330px"
      p="5"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.2)"
      transition="box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease"
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.5)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.28)',
      }}
    >
      <Flex align="flex-start" gap="4">
        <AbilityIconVisual image={item.iconImage} placeholderLabel={copy.iconPlaceholderLabel} />

        <Box flex="1" minW="0">
          <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between">
            <Badge colorPalette="teal" variant="subtle">
              {copy.kindLabel(item.kind)}
            </Badge>
            <Text flexShrink="0">{item.localeLabel}</Text>
          </Flex>
          <Heading
            as="h2"
            fontSize="xl"
            lineHeight="1.2"
            mt="4"
            overflow="hidden"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              display: '-webkit-box',
            }}
          >
            {item.title}
          </Heading>
          <Text
            color="#9aa7b1"
            h="4.2em"
            lineHeight="1.4"
            mt="2"
            overflow="hidden"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              display: '-webkit-box',
            }}
          >
            {item.description}
          </Text>
        </Box>
      </Flex>

      <SimpleGrid
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: 2 }}
        gapX="4"
        pt="2"
      >
        <CatalogFactRow label={copy.levelLabel} value={item.levelLabel} />
        <CatalogFactRow label={copy.schoolFieldLabel} value={copy.schoolLabel(item.school)} />
        <CatalogFactRow label={copy.damageLabel} value={item.damageLabel} />
        <CatalogFactRow label={copy.cooldownLabel} value={item.cooldownLabel} />
      </SimpleGrid>
    </Box>
  );
});
