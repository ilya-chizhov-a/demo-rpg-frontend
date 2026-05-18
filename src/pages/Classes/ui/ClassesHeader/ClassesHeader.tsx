import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { ClassesViewModel } from '../../model/ClassesViewModel';

interface ClassesHeaderProps {
  readonly vm: ClassesViewModel;
}

export const ClassesHeader = observer(function ClassesHeader({ vm }: ClassesHeaderProps) {
  return (
    <Box as="section" aria-labelledby="classes-title" mb="8">
      <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mb="2">
        {vm.copy.headerEyebrow}
      </Text>
      <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} id="classes-title" lineHeight="1.05">
        {vm.copy.headerTitle}
      </Heading>
      <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" maxW="720px" mt="3">
        {vm.copy.headerDescription}
      </Text>
      <Flex aria-label={vm.copy.capabilitiesAriaLabel} gap="2" mt="5" wrap="wrap">
        {vm.copy.headerBadges.map((badge, index) => (
          <Badge
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
