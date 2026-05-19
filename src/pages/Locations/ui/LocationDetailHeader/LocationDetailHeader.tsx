import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { LocationDetailViewModel } from '../../model/LocationDetailViewModel';

interface LocationDetailHeaderProps {
  readonly vm: LocationDetailViewModel;
}

export const LocationDetailHeader = observer(({ vm }: LocationDetailHeaderProps) => {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      minW="0"
      p="6"
    >
      <Flex gap="2" mb="4" wrap="wrap">
        <Badge colorPalette="teal" size="lg" variant="subtle">
          {vm.kindLabel}
        </Badge>
        <Badge colorPalette="blue" size="lg" variant="subtle">
          {vm.copy.detail.datasetLabel}
        </Badge>
        <Badge colorPalette="green" size="lg" variant="subtle">
          {vm.galleryCountLabel}
        </Badge>
      </Flex>
      <Heading as="h1" fontSize={{ base: '3xl', md: '3xl' }} lineHeight="1.12">
        {vm.title}
      </Heading>
      <Text color="var(--color-text-supporting)" fontSize="md" lineHeight="1.55" mt="4">
        {vm.description}
      </Text>
      <Flex align="center" color="#9aa7b1" gap="3" mt="3" wrap="wrap">
        <Text fontSize="sm">
          {vm.copy.detail.localeLabel}:{' '}
          <Text as="span" fontWeight="bold">
            {vm.localeLabel}
          </Text>
        </Text>
        {vm.canOpenRegion ? (
          <Button
            asChild
            color="#67e8f9"
            minH={{ base: '44px', md: '36px' }}
            px="0"
            size="sm"
            variant="plain"
            _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
          >
            <RouterLink to={vm.regionHref}>
              {vm.copy.detail.openRegionAction}: {vm.regionTitle}
            </RouterLink>
          </Button>
        ) : null}
      </Flex>
    </Box>
  );
});
