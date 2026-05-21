import { Box, Input } from '@chakra-ui/react';

import { CatalogFilterFieldLabel } from '../CatalogFilterFieldLabel/CatalogFilterFieldLabel';

interface CatalogFilterNumberFieldProps {
  readonly id: string;
  readonly label: string;
  readonly onChange: (value: string) => void;
  readonly value: string;
}

export function CatalogFilterNumberField({
  id,
  label,
  onChange,
  value,
}: CatalogFilterNumberFieldProps) {
  return (
    <Box minW="0">
      <CatalogFilterFieldLabel id={id} label={label} />
      <Input
        bg="rgba(15, 21, 29, 0.82)"
        borderColor="rgba(103, 232, 249, 0.24)"
        id={id}
        min="0"
        minH="44px"
        onChange={(event) => onChange(event.target.value)}
        step="1"
        type="number"
        value={value}
      />
    </Box>
  );
}
