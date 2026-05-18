import { Badge, Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { HomeViewModel } from '../../model/HomeViewModel';

interface HomeHeroProps {
  readonly vm: HomeViewModel;
}

export const HomeHero = observer(({ vm }: HomeHeroProps) => {
  const { hero } = vm;

  return (
    <Box
      as="section"
      aria-labelledby="home-title"
      pb={{ base: '8', lg: '10' }}
      pt={{ base: '2', lg: '4' }}
    >
      <Stack align="flex-start" gap="6" maxW="960px">
        <Flex aria-label={vm.heroBadgesAriaLabel} gap="2" wrap="wrap">
          {hero.badges.map((badge) => (
            <Badge colorPalette={badge.palette} key={badge.label} size="lg" variant="subtle">
              {badge.label}
            </Badge>
          ))}
        </Flex>

        <Box>
          <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} id="home-title" lineHeight="1.02">
            {hero.title}
          </Heading>
          <Text
            color="var(--color-text-supporting)"
            fontSize={{ base: 'lg', md: 'xl' }}
            lineHeight="1.6"
            maxW="820px"
            mt="5"
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

        <Text color="#9aa7b1" fontSize="sm" lineHeight="1.6" maxW="720px">
          {hero.fallbackNote}{' '}
          <Link asChild color="#67e8f9" fontWeight="medium">
            <RouterLink to={hero.fallbackLink.href}>{hero.fallbackLink.label}</RouterLink>
          </Link>
        </Text>
      </Stack>
    </Box>
  );
});
