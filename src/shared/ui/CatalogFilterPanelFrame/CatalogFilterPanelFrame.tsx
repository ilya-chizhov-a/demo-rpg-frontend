import { Box, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface CatalogFilterPanelFrameProps {
  readonly children: ReactNode;
  readonly showTitle?: boolean;
  readonly title: string;
  readonly variant?: 'panel' | 'plain';
}

export function CatalogFilterPanelFrame({
  children,
  showTitle = true,
  title,
  variant = 'panel',
}: CatalogFilterPanelFrameProps) {
  const isPanel = variant === 'panel';

  return (
    <Box
      bg={isPanel ? 'rgba(18, 24, 32, 0.9)' : 'transparent'}
      borderColor={isPanel ? 'rgba(103, 232, 249, 0.16)' : 'transparent'}
      borderRadius="md"
      borderWidth={isPanel ? '1px' : '0'}
      display="grid"
      gap="4"
      minW="0"
      p={isPanel ? '4' : '0'}
    >
      {showTitle ? (
        <Heading as="h2" color="var(--color-text)" fontSize="lg">
          {title}
        </Heading>
      ) : null}
      {children}
    </Box>
  );
}
