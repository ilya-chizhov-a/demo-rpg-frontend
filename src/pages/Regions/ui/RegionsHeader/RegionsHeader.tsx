import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { RegionsViewModel } from '../../model/RegionsViewModel';

interface RegionsHeaderProps {
  readonly vm: RegionsViewModel;
}

export const RegionsHeader = observer(function RegionsHeader({ vm }: RegionsHeaderProps) {
  return (
    <Box as="section" aria-labelledby="regions-title" mb="8">
      <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mb="2">
        {vm.copy.headerEyebrow}
      </Text>
      <Heading as="h1" fontSize="4xl" id="regions-title" lineHeight="1.05">
        {vm.copy.headerTitle}
      </Heading>
      <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" maxW="720px" mt="3">
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
            colorPalette={index === 0 ? 'blue' : undefined}
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
