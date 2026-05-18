import { Badge, Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { useViewModel } from 'src/shared/lib';
import { ExplainerWidgetViewModel } from '../../model/ExplainerWidgetViewModel';
import type { ExplainerDescriptor } from '../../model/types';
import { ExplainerContent } from '../ExplainerContent/ExplainerContent';

interface ExplainerWidgetProps {
  readonly descriptor: ExplainerDescriptor;
  readonly headingId: string;
  readonly isLoading?: boolean;
}

export const ExplainerWidget = observer(function ExplainerWidget({
  descriptor,
  headingId,
  isLoading = false,
}: ExplainerWidgetProps) {
  const vm = useViewModel(ExplainerWidgetViewModel);
  const panelId = `${headingId}-panel`;

  return (
    <Box bottom={{ base: '4', md: '6' }} position="fixed" right={{ base: '4', md: '6' }} zIndex="overlay">
      <Button
        aria-controls={panelId}
        aria-expanded={vm.isOpen}
        aria-label={vm.isOpen ? vm.copy.closeAria : vm.copy.openAria}
        bg="white"
        borderColor="blue.300"
        borderRadius="full"
        borderWidth="1px"
        boxShadow="0 12px 30px rgba(30, 64, 175, 0.18)"
        color="blue.950"
        h="56px"
        minW={{ base: '56px', md: '156px' }}
        onClick={() => vm.toggleOpen()}
        px={{ base: '0', md: '4' }}
        type="button"
        variant="plain"
      >
        <Flex align="center" gap="3">
          <Flex
            align="center"
            bg="white"
            borderColor="gray.200"
            borderRadius="full"
            borderWidth="1px"
            boxShadow="inset 0 0 0 1px rgba(15, 23, 42, 0.04)"
            h="36px"
            justify="center"
            w="36px"
          >
            <RevisiumIcon />
          </Flex>
          <Box display={{ base: 'none', md: 'block' }} textAlign="left">
            <Text fontSize="sm" fontWeight="bold" lineHeight="1.1">
              Revisium
            </Text>
            <Text color="blue.700" fontSize="xs" lineHeight="1.1" mt="1">
              {vm.copy.sourceView}
            </Text>
          </Box>
        </Flex>
      </Button>

      {vm.isOpen ? (
        <Box
          as="section"
          aria-labelledby={headingId}
          bg="#f4f8ff"
          borderColor="blue.300"
          borderRadius="md"
          borderWidth="1px"
          bottom={{ base: '72px', md: '80px' }}
          boxShadow="0 22px 60px rgba(15, 23, 42, 0.22)"
          display="grid"
          gridTemplateRows="auto minmax(0, 1fr)"
          h={{ base: 'calc(100dvh - 112px)', md: 'min(720px, calc(100dvh - 128px))' }}
          id={panelId}
          minW="0"
          overflow="hidden"
          position="absolute"
          right="0"
          role="region"
          w={{ base: 'calc(100vw - 32px)', md: '420px' }}
        >
          <Box bg="blue.950" color="white" p="4">
            <Stack gap="2">
              <Flex align="center" gap="2" justify="space-between">
                <Badge bg="whiteAlpha.200" color="blue.50" variant="solid">
                  {vm.copy.referenceBadge}
                </Badge>
                <Button
                  aria-label={vm.copy.closeAria}
                  color="blue.50"
                  minH="36px"
                  minW="36px"
                  onClick={() => vm.close()}
                  px="0"
                  type="button"
                  variant="plain"
                >
                  X
                </Button>
              </Flex>
              <Text color="blue.100" fontSize="sm" fontWeight="bold">
                {vm.copy.howThisUsesRevisium}
              </Text>
              <Flex align="flex-end" gap="3" justify="space-between">
                <Heading as="h2" fontSize="lg" id={headingId}>
                  {vm.copy.heading}
                </Heading>
                <Text color="blue.100" fontSize="xs">
                  cloud.revisium.io
                </Text>
              </Flex>
            </Stack>
          </Box>

          <Box display="grid" gap="4" minH="0" overflowY="auto" overscrollBehavior="contain" p="4">
            <ExplainerContent
              descriptor={descriptor}
              copy={vm.copy}
              sharedCopy={vm.sharedCopy}
              isLoading={isLoading}
              isSectionOpen={(section) => vm.isTechnicalSectionOpen(section)}
              onToggleSection={(section) => vm.toggleTechnicalSection(section)}
            />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
});

function RevisiumIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 32 32" width="22">
      <path
        d="M7 7h10.8c4.3 0 7.2 2.4 7.2 5.9 0 2.3-1.4 4.2-3.6 5.1l3.8 6.8h-5.6l-3.4-6.1H7v-4.1h10.3c1.6 0 2.5-.6 2.5-1.7s-.9-1.7-2.5-1.7H7V7Z"
        fill="currentColor"
      />
      <path
        d="M7 17.7h5.5l9.3 7.1h-7.2L7 19.1v-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
