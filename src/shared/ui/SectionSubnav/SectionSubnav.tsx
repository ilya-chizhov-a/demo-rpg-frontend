import { Box, Button, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import type { ActiveNavigationItem } from 'src/shared/config';

interface SectionSubnavProps {
  readonly ariaLabel: string;
  readonly items: readonly ActiveNavigationItem[];
}

export function SectionSubnav({ ariaLabel, items }: SectionSubnavProps) {
  if (items.length <= 1) return null;

  return (
    <Box
      as="nav"
      aria-label={ariaLabel}
      mb="5"
      overflowX="auto"
      pb="1"
      css={{ scrollbarWidth: 'thin' }}
    >
      <HStack gap="2" minW="max-content">
        {items.map((item) => {
          return (
            <Button
              asChild
              bg={item.isActive ? '#22d3ee' : 'rgba(18, 24, 32, 0.76)'}
              borderColor={item.isActive ? '#67e8f9' : 'rgba(103, 232, 249, 0.24)'}
              borderWidth="1px"
              color={item.isActive ? 'var(--color-text-on-accent)' : 'var(--color-text-supporting)'}
              flex="0 0 auto"
              key={item.to}
              minH="44px"
              size="sm"
              variant={item.isActive ? 'solid' : 'outline'}
              _hover={{
                bg: item.isActive ? '#67e8f9' : 'rgba(34, 211, 238, 0.12)',
                color: item.isActive ? 'var(--color-text-on-accent)' : '#f4f7f8',
              }}
            >
              <RouterLink aria-current={item.isActive ? 'page' : undefined} to={item.to}>
                {item.label}
              </RouterLink>
            </Button>
          );
        })}
      </HStack>
    </Box>
  );
}
