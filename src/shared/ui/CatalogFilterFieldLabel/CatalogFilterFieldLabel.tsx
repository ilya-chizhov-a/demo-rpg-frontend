import { Box } from '@chakra-ui/react';

interface CatalogFilterFieldLabelProps {
  readonly id: string;
  readonly label: string;
}

export function CatalogFilterFieldLabel({ id, label }: CatalogFilterFieldLabelProps) {
  return (
    <Box asChild color="#9aa7b1" display="block" fontSize="xs" mb="1">
      <label htmlFor={id}>{label}</label>
    </Box>
  );
}
