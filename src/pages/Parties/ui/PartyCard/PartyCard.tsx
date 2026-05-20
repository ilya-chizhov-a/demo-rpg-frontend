import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { CatalogActionButton, CatalogFactRow } from 'src/shared/ui';

import type { PartyItemViewModel } from '../../model/PartyItemViewModel';
import type { PartiesPageCopy } from '../../model/partyUiCopy';
import { PartyMemberAvatar } from '../PartyMemberAvatar/PartyMemberAvatar';

interface PartyCardProps {
  readonly copy: PartiesPageCopy;
  readonly item: PartyItemViewModel;
}

export const PartyCard = observer(({ copy, item }: PartyCardProps) => {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      gridTemplateRows="auto auto auto 1fr auto"
      minH="430px"
      minW="0"
      p="5"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.22)"
      transition="box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease"
      _focusWithin={{
        borderColor: '#67e8f9',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.16), 0 22px 44px rgba(0, 0, 0, 0.32)',
      }}
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.58)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.32)',
      }}
    >
      <Box>
        <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between">
          <Badge colorPalette={item.isFull ? 'green' : 'cyan'} variant="subtle">
            {copy.fullStateLabel(item.isFull)}
          </Badge>
          <Text flexShrink="0">{item.localeLabel}</Text>
        </Flex>
        <Heading
          as="h2"
          fontSize="xl"
          h="2.4em"
          lineHeight="1.2"
          mt="4"
          overflow="hidden"
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            display: '-webkit-box',
          }}
        >
          {item.title}
        </Heading>
        <Text
          color="#9aa7b1"
          h="3.9em"
          lineHeight="1.3"
          mt="2"
          overflow="hidden"
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            display: '-webkit-box',
          }}
        >
          {item.motto}
        </Text>
      </Box>

      <SimpleGrid as="dl" borderTopColor="rgba(103, 232, 249, 0.14)" borderTopWidth="1px" pt="2">
        <CatalogFactRow label={copy.membersLabel} value={copy.memberCountLabel(item.memberCount)} />
        <CatalogFactRow label={copy.statusLabel} value={copy.fullStateLabel(item.isFull)} />
        <CatalogFactRow label={copy.filterLabel} value={copy.formationLabel(item.formation)} />
      </SimpleGrid>

      <Box>
        <Text color="#9aa7b1" fontSize="xs" mb="2">
          {copy.membersLabel}
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
          {item.members.map((member) => (
            <PartyMemberAvatar key={member.id} member={member} />
          ))}
        </SimpleGrid>
      </Box>

      <Box alignSelf="end">
        <CatalogActionButton to={item.detailHref}>{copy.cardOpenAction}</CatalogActionButton>
      </Box>
    </Box>
  );
});
