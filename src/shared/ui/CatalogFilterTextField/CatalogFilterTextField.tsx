import { Box, Input } from '@chakra-ui/react';

import { CatalogFilterFieldLabel } from '../CatalogFilterFieldLabel/CatalogFilterFieldLabel';

interface CatalogFilterTextFieldProps {
  readonly id: string;
  readonly label: string;
  readonly onChange: (value: string) => void;
  readonly placeholder: string;
  readonly value: string;
}

export function CatalogFilterTextField({
  id,
  label,
  onChange,
  placeholder,
  value,
}: CatalogFilterTextFieldProps) {
  return (
    <Box minW="0">
      <CatalogFilterFieldLabel id={id} label={label} />
      <Input
        bg="rgba(15, 21, 29, 0.82)"
        borderColor="rgba(103, 232, 249, 0.24)"
        id={id}
        minH="44px"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </Box>
  );
}
