import { Badge, Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';

import type { HeroDetailViewModel } from '../../model/HeroDetailViewModel';
import { HeroPortraitVisual } from '../HeroPortraitVisual/HeroPortraitVisual';

interface HeroDetailHeaderProps {
  readonly vm: HeroDetailViewModel;
}

export function HeroDetailHeader({ vm }: HeroDetailHeaderProps) {
  return (
    <Grid as="section" gap="5" templateColumns={{ base: '1fr', lg: '420px minmax(0, 1fr)' }}>
      <HeroPortraitVisual
        eyebrow={vm.classLabel}
        image={vm.portraitImage}
        placeholderDescription={vm.portraitPlaceholderDescription}
        placeholderTitle={vm.copy.portraitPlaceholderTitle}
        size="detail"
      />

      <Box minW="0">
        <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mb="2">
          {vm.copy.headerEyebrow}
        </Text>
        <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} lineHeight="1.05">
          {vm.title}
        </Heading>
        <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" mt="3">
          {vm.epithet}
        </Text>
        <Flex gap="2" mt="5" wrap="wrap">
          <Badge colorPalette="cyan" size="lg" variant="subtle">
            {vm.classLabel}
          </Badge>
          <Badge size="lg" variant="outline">
            {vm.levelLabel}
          </Badge>
          {vm.veteranBadgeLabel ? (
            <Badge colorPalette="orange" size="lg" variant="subtle">
              {vm.veteranBadgeLabel}
            </Badge>
          ) : null}
          <Badge size="lg" variant="outline">
            {vm.localeLabel}
          </Badge>
        </Flex>
      </Box>
    </Grid>
  );
}
