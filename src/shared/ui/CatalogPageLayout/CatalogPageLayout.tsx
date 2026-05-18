import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { PageShell } from '../PageShell/PageShell';

interface CatalogPageLayoutProps {
  readonly header: ReactNode;
  readonly sectionSubnav?: ReactNode;
  readonly toolbar: ReactNode;
  readonly loading: ReactNode;
  readonly error: ReactNode;
  readonly empty: ReactNode;
  readonly list: ReactNode;
  readonly footerAction?: ReactNode;
  readonly explainer: ReactNode;
}

export function CatalogPageLayout({
  empty,
  error,
  explainer,
  footerAction,
  header,
  list,
  loading,
  sectionSubnav,
  toolbar,
}: CatalogPageLayoutProps) {
  return (
    <PageShell>
      {header}
      {sectionSubnav}

      <Box minW="0">
        {toolbar}
        {loading}
        {error}
        {empty}
        {list}
        {footerAction}
      </Box>
      {explainer}
    </PageShell>
  );
}
