import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import type { HomeSourceLinkItemViewModel } from '../../model/HomeSourceLinkItemViewModel';

interface HomeSourceLinkCardProps {
  readonly item: HomeSourceLinkItemViewModel;
}

export function HomeSourceLinkCard({ item }: HomeSourceLinkCardProps) {
  return (
    <Box
      as="article"
      bg="rgba(18, 24, 32, 0.82)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      p="5"
    >
      <Heading as="h3" fontSize="lg">
        {item.isExternal ? (
          <Link
            alignItems="center"
            color="#67e8f9"
            display="inline-flex"
            href={item.href}
            minH="11"
            rel={item.rel}
            target={item.target}
          >
            {item.title}
          </Link>
        ) : (
          <Link asChild color="#67e8f9" display="inline-flex" minH="11">
            <RouterLink to={item.href}>{item.title}</RouterLink>
          </Link>
        )}
      </Heading>
      <Text color="#9aa7b1" lineHeight="1.55" mt="2">
        {item.description}
      </Text>
    </Box>
  );
}
