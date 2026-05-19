import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { LocationsViewModel } from '../../model/LocationsViewModel';

interface LocationsHeaderProps {
  readonly vm: LocationsViewModel;
}

export const LocationsHeader = observer(function LocationsHeader({ vm }: LocationsHeaderProps) {
  return (
    <Box as="section" aria-labelledby="locations-title" mb="8">
      <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mb="2">
        {vm.copy.headerEyebrow}
      </Text>
      <Heading as="h1" fontSize="4xl" id="locations-title" lineHeight="1.05">
        {vm.copy.headerTitle}
      </Heading>
      <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" maxW="760px" mt="3">
        {vm.copy.headerDescription}
      </Text>
      <Flex
        as="ul"
        aria-label={vm.copy.capabilitiesAriaLabel}
        gap="2"
        listStyleType="none"
        m="0"
        mt="5"
        p="0"
        wrap="wrap"
      >
        {vm.copy.headerBadges.map((badge, index) => (
          <Badge
            as="li"
            borderColor={index === 0 ? undefined : 'rgba(103, 232, 249, 0.34)'}
            colorPalette={index === 0 ? 'blue' : undefined}
            color={index === 0 ? undefined : '#c9d2da'}
            key={badge}
            size="lg"
            variant={index === 0 ? 'subtle' : 'outline'}
          >
            {badge}
          </Badge>
        ))}
      </Flex>
    </Box>
  );
});
