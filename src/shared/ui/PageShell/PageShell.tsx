import { Box, type BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export const pageShellGutters = 'var(--page-shell-gutter)';
export const pageShellMaxWidth = '1440px';
export const pageShellPaddingY = { base: '6', md: '8' } as const;

interface PageShellProps {
  readonly children: ReactNode;
  readonly minH?: BoxProps['minH'];
  readonly py?: BoxProps['py'];
}

export function PageShell({
  children,
  minH,
  py = pageShellPaddingY,
}: PageShellProps) {
  return (
    <Box as="main" color="inherit" minH={minH} overflowX="clip" px={pageShellGutters} py={py}>
      <Box maxW={pageShellMaxWidth} mx="auto" w="full">
        {children}
      </Box>
    </Box>
  );
}
