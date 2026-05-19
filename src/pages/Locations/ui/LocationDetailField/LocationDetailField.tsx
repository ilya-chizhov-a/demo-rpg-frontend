import { DetailFactField } from 'src/shared/ui';

interface LocationDetailFieldProps {
  readonly label: string;
  readonly value: string;
}

export function LocationDetailField({ label, value }: LocationDetailFieldProps) {
  return <DetailFactField label={label} value={value} />;
}
