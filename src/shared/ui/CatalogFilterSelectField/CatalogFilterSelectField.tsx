import { Box } from '@chakra-ui/react';
import type { ChangeEvent, ReactNode } from 'react';

import { CatalogFilterFieldLabel } from '../CatalogFilterFieldLabel/CatalogFilterFieldLabel';

interface CatalogFilterSelectFieldProps {
  readonly children: ReactNode;
  readonly id: string;
  readonly label: string;
  readonly onChange: (value: string) => void;
  readonly value: string;
}

export function CatalogFilterSelectField({
  children,
  id,
  label,
  onChange,
  value,
}: CatalogFilterSelectFieldProps) {
  return (
    <Box minW="0">
      <CatalogFilterFieldLabel id={id} label={label} />
      <Box
        asChild
        bg="rgba(15, 21, 29, 0.82)"
        borderColor="rgba(103, 232, 249, 0.24)"
        borderRadius="md"
        borderWidth="1px"
        color="var(--color-text)"
        h="44px"
        px="3"
        w="full"
      >
        <select
          id={id}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
          value={value}
        >
          {children}
        </select>
      </Box>
    </Box>
  );
}
