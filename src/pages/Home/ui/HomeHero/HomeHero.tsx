import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { HomeViewModel } from '../../model/HomeViewModel';

interface HomeHeroProps {
  readonly vm: HomeViewModel;
}

const heroVerticalPadding = {
  base: 'clamp(72px, 14svh, 132px)',
  md: 'clamp(84px, 15svh, 150px)',
} as const;

export const HomeHero = observer(({ vm }: HomeHeroProps) => {
  const { hero } = vm;

  return (
    <Box
      as="section"
      aria-labelledby="home-title"
      alignItems="flex-start"
      display="flex"
      mx="calc(var(--page-shell-gutter) * -1)"
      overflow="hidden"
      px={{ base: 'var(--page-shell-gutter)', md: 'var(--page-shell-gutter)' }}
      pb={heroVerticalPadding}
      pt={heroVerticalPadding}
      position="relative"
    >
      <Stack align="flex-start" gap="6" maxW="840px" position="relative" zIndex="2">
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '5xl', xl: '6xl' }}
            id="home-title"
            lineHeight="1.02"
            maxW="760px"
            textShadow="0 3px 24px rgba(0, 0, 0, 0.74)"
          >
            {hero.title}
          </Heading>
          <Text
            color="var(--color-text-supporting)"
            fontSize={{ base: 'lg', md: 'xl' }}
            lineHeight="1.6"
            maxW="820px"
            mt="5"
            textShadow="0 2px 18px rgba(0, 0, 0, 0.72)"
          >
            {hero.subtitle}
          </Text>
        </Box>

        <Flex gap="3" wrap="wrap">
          <Button
            asChild
            bg="#22d3ee"
            color="var(--color-text-on-accent)"
            size="lg"
            _hover={{ bg: '#67e8f9' }}
          >
            <RouterLink to={hero.primaryCta.href}>{hero.primaryCta.label}</RouterLink>
          </Button>
          <Button
            asChild
            borderColor="rgba(103, 232, 249, 0.38)"
            color="#f4f7f8"
            size="lg"
            variant="outline"
            _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
          >
            <RouterLink to={hero.secondaryCta.href}>{hero.secondaryCta.label}</RouterLink>
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
});
