import { Button } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';

interface CatalogActionButtonProps {
  readonly children: ReactNode;
  readonly to: string;
}

export function CatalogActionButton({ children, to }: CatalogActionButtonProps) {
  return (
    <Button
      asChild
      bg="rgba(18, 24, 32, 0.76)"
      borderColor="rgba(103, 232, 249, 0.24)"
      borderWidth="1px"
      color="var(--color-text-supporting)"
      minH="44px"
      size="sm"
      transition="background-color 160ms ease, border-color 160ms ease, color 160ms ease"
      variant="outline"
      _groupHover={{
        bg: '#22d3ee',
        borderColor: '#67e8f9',
        color: 'var(--color-text-on-accent)',
      }}
      _hover={{
        bg: '#22d3ee',
        borderColor: '#67e8f9',
        color: 'var(--color-text-on-accent)',
      }}
      _focusVisible={{
        bg: '#22d3ee',
        borderColor: '#67e8f9',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.18)',
        color: 'var(--color-text-on-accent)',
      }}
    >
      <RouterLink to={to}>{children}</RouterLink>
    </Button>
  );
}
