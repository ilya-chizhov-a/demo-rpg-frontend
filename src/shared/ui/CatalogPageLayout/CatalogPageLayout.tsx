import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

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
    <Box as="main" color="inherit" overflowX="clip" px={{ base: '4', md: '6', lg: '8' }} py="8">
      <Box maxW="1440px" mx="auto" w="full">
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
      </Box>
    </Box>
  );
}
