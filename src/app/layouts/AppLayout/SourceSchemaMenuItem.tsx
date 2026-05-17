import { Badge, Box, Flex, Link, Menu, Text } from '@chakra-ui/react';

import type { SourceSchemaLink } from './AppLayoutViewModel';
import { HeaderNavIcon } from './AppLayoutIcons';

interface SourceSchemaMenuItemProps {
  readonly link: SourceSchemaLink;
}

export function SourceSchemaMenuItem({ link }: SourceSchemaMenuItemProps) {
  return (
    <Menu.Item asChild value={link.href}>
      <Link href={link.href} rel="noreferrer" target="_blank" _hover={{ textDecoration: 'none' }}>
        <Flex
          align="flex-start"
          color="#f4f7f8"
          gap="3"
          px="4"
          py="3"
          transition="background 120ms ease, color 120ms ease"
          w="100%"
          _hover={{ bg: 'rgba(34, 211, 238, 0.1)', color: '#67e8f9' }}
        >
          <Box color={link.iconColor} flex="0 0 auto" mt="0.5">
            <HeaderNavIcon name={link.icon} size={22} />
          </Box>
          <Box minW="0">
            <Flex align="center" gap="2" wrap="wrap">
              <Text as="span" fontSize="sm" fontWeight="bold">
                {link.label}
              </Text>
              <Badge bg={link.badgeBg} color={link.badgeColor} size="sm" variant="solid">
                {link.subgraph}
              </Badge>
            </Flex>
            <Text color="#9aa7b1" fontSize="xs" lineHeight="1.35" mt="1">
              {link.description}
            </Text>
          </Box>
        </Flex>
      </Link>
    </Menu.Item>
  );
}
