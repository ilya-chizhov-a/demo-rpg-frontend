import { Badge, Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { QuestDetailViewModel } from '../../model/QuestDetailViewModel';

interface QuestDetailHeaderProps {
  readonly vm: QuestDetailViewModel;
}

export const QuestDetailHeader = observer(function QuestDetailHeader({
  vm,
}: QuestDetailHeaderProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.92)"
      borderColor="rgba(103, 232, 249, 0.2)"
      borderRadius="md"
      borderWidth="1px"
      p={{ base: '5', md: '6' }}
    >
      <Flex align="center" gap="2" mb="4" wrap="wrap">
        <Badge colorPalette="cyan" variant="subtle">
          {vm.kindLabel}
        </Badge>
        <Badge colorPalette="teal" variant="subtle">
          {vm.copy.levelRequiredLabel}: {vm.levelLabel}
        </Badge>
        <Badge colorPalette="green" variant="subtle">
          {vm.repeatableLabel}
        </Badge>
      </Flex>

      <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} lineHeight="1.08">
        {vm.title}
      </Heading>
      <Text color="#c9d2da" lineHeight="1.65" maxW="920px" mt="4">
        {vm.description}
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="3" mt="5">
        <ContextLink
          href={vm.giverHref}
          label={vm.copy.detail.fieldGiver}
          title={vm.giverTitle}
        />
        {vm.canOpenPrimaryLocation ? (
          <ContextLink
            href={vm.primaryLocationHref}
            label={vm.copy.detail.fieldPrimaryLocation}
            title={vm.primaryLocationTitle}
          />
        ) : (
          <ContextText label={vm.copy.detail.fieldPrimaryLocation} title={vm.primaryLocationTitle} />
        )}
      </SimpleGrid>
    </Box>
  );
});

interface ContextProps {
  readonly label: string;
  readonly title: string;
}

interface ContextLinkProps extends ContextProps {
  readonly href: string;
}

function ContextLink({ href, label, title }: ContextLinkProps) {
  return (
    <Button
      asChild
      borderColor="rgba(103, 232, 249, 0.22)"
      justifyContent="flex-start"
      minH="56px"
      px="4"
      variant="outline"
      _hover={{ bg: 'rgba(34, 211, 238, 0.1)', borderColor: '#67e8f9' }}
    >
      <RouterLink to={href}>
        <Box minW="0" textAlign="left">
          <Text color="#9aa7b1" fontSize="xs">
            {label}
          </Text>
          <Text color="#f4f7f8" fontWeight="bold" overflow="hidden" textOverflow="ellipsis">
            {title}
          </Text>
        </Box>
      </RouterLink>
    </Button>
  );
}

function ContextText({ label, title }: ContextProps) {
  return (
    <Box
      bg="rgba(15, 21, 29, 0.72)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      minH="56px"
      px="4"
      py="2"
    >
      <Text color="#9aa7b1" fontSize="xs">
        {label}
      </Text>
      <Text color="#f4f7f8" fontWeight="bold">
        {title}
      </Text>
    </Box>
  );
}
