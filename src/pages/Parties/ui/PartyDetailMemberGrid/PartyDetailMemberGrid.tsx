import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { StatePanel } from 'src/shared/ui';
import type { PartyDetailViewModel } from '../../model/PartyDetailViewModel';
import { PartyDetailMemberCard } from '../PartyDetailMemberCard/PartyDetailMemberCard';

interface PartyDetailMemberGridProps {
  readonly vm: PartyDetailViewModel;
}

export const PartyDetailMemberGrid = observer(({ vm }: PartyDetailMemberGridProps) => {
  if (!vm.hasMembers) {
    return (
      <StatePanel
        description={vm.copy.detail.emptyMembersDescription}
        title={vm.copy.detail.emptyMembersTitle}
      />
    );
  }

  return (
    <Box>
      <Heading as="h2" fontSize="2xl" mb="4">
        {vm.copy.detail.membersTitle}
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap="4">
        {vm.members.map((member) => (
          <PartyDetailMemberCard
            copy={vm.copy}
            formatLevel={vm.formatLevel}
            key={member.id}
            member={member}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
});
