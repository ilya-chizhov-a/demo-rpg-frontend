import { DetailFactField } from 'src/shared/ui';

interface RegionDetailFieldProps {
  readonly label: string;
  readonly value: string;
}

export function RegionDetailField({ label, value }: RegionDetailFieldProps) {
  return <DetailFactField label={label} value={value} />;
}
