import { Badge, Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { RegionItemViewModel } from '../../model/RegionItemViewModel';
import type { RegionsPageCopy } from '../../model/regionUiCopy';
import { RegionCoverVisual } from '../RegionCoverVisual/RegionCoverVisual';

interface RegionCardProps {
  readonly copy: RegionsPageCopy;
  readonly item: RegionItemViewModel;
}

export const RegionCard = observer(({ copy, item }: RegionCardProps) => {
  return (
    <Box
      as="li"
      alignContent="space-between"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="5"
      outline="none"
      position="relative"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.24)"
      transition="transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease"
      minH="260px"
      overflow="hidden"
      _focusWithin={{
        borderColor: '#67e8f9',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.16), 0 22px 44px rgba(0, 0, 0, 0.32)',
        transform: 'translateY(-2px)',
      }}
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.58)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.32)',
        transform: 'translateY(-2px)',
      }}
      css={{
        '&:hover .region-card-visual, &:focus-within .region-card-visual': {
          transform: 'scale(1.035)',
        },
      }}
    >
      <RegionCoverVisual
        climate={item.climate}
        image={item.coverImage}
        placeholderDescription={item.coverPlaceholderDescription}
        placeholderTitle={item.coverPlaceholderTitle}
        zoomOnGroupHover
      />

      <Box px="5">
        <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between">
          <Badge colorPalette="green" variant="subtle">
            {item.climate}
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

      <SimpleGrid
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: 2 }}
        gap="3"
        mx="5"
        pt="4"
      >
        <Box>
          <Text as="dt" color="#9aa7b1" fontSize="xs">
            {copy.publishedLabel}
          </Text>
          <Text as="dd" fontWeight="bold" mt="1">
            {item.publishedLabel}
          </Text>
        </Box>
        <Box>
          <Text as="dt" color="#9aa7b1" fontSize="xs">
            {copy.versionLabel}
          </Text>
          <Text as="dd" fontWeight="bold" mt="1">
            {item.versionLabel}
          </Text>
        </Box>
      </SimpleGrid>

      <Box px="5" pb="5">
        <Button
          asChild
          borderColor="rgba(103, 232, 249, 0.34)"
          color="#67e8f9"
          size="sm"
          transition="background-color 160ms ease, color 160ms ease, transform 160ms ease"
          variant="outline"
          _groupHover={{
            bg: '#22d3ee',
            color: 'var(--color-text-on-accent)',
            transform: 'translateX(2px)',
          }}
        >
          <RouterLink to={item.detailHref}>{copy.cardOpenAction}</RouterLink>
        </Button>
      </Box>
    </Box>
  );
});
