import { Badge, Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { ClassItemViewModel } from '../../model/ClassItemViewModel';
import type { ClassesPageCopy } from '../../model/classUiCopy';
import { ClassIconVisual } from '../ClassIconVisual/ClassIconVisual';

interface ClassCardProps {
  readonly copy: ClassesPageCopy;
  readonly item: ClassItemViewModel;
}

export const ClassCard = observer(({ copy, item }: ClassCardProps) => {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="5"
      p="5"
    >
      <Flex align="flex-start" gap="4">
        <ClassIconVisual image={item.iconImage} placeholderLabel={copy.iconPlaceholderLabel} />

        <Box flex="1" minW="0">
          <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between">
            <Badge colorPalette="purple" variant="subtle">
              {item.primaryStat}
            </Badge>
            <Text>{item.localeLabel}</Text>
          </Flex>
          <Heading as="h2" fontSize="xl" lineHeight="1.2" mt="4">
            {item.title}
          </Heading>
          <Text color="#9aa7b1" lineHeight="1.55" mt="2">
            {item.description}
          </Text>
        </Box>
      </Flex>

      <SimpleGrid
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: 3 }}
        gap="3"
        pt="4"
      >
        <Stat label={copy.fieldBaseHp} value={item.baseHpLabel} />
        <Stat label={copy.fieldHpGrowth} value={item.hpPerLevelLabel} />
        <Stat label={copy.fieldMpGrowth} value={item.mpPerLevelLabel} />
      </SimpleGrid>

      <Button
        asChild
        borderColor="rgba(103, 232, 249, 0.34)"
        color="#67e8f9"
        minH="44px"
        variant="outline"
        _hover={{ bg: 'rgba(34, 211, 238, 0.12)' }}
      >
        <RouterLink to={item.heroesHref}>{copy.cardActionLabel}</RouterLink>
      </Button>
    </Box>
  );
});

interface StatProps {
  readonly label: string;
  readonly value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <Box>
      <Text color="#9aa7b1" fontSize="xs">
        {label}
      </Text>
      <Text fontWeight="bold" mt="1">
        {value}
      </Text>
    </Box>
  );
}
