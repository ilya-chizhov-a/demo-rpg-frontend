import { Badge, Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { useViewModel } from 'src/shared/lib';
import { CatalogHeader, PageShell, SectionSubnav } from 'src/shared/ui';
import { AboutViewModel } from '../../model/AboutViewModel';
import { GuideFactPanel } from '../GuideFactPanel/GuideFactPanel';

export const AboutPage = observer(function AboutPage() {
  const vm = useViewModel(AboutViewModel);

  return (
    <PageShell>
      <CatalogHeader
        ariaLabel={vm.copy.guideSectionAriaLabel}
        badges={vm.copy.headerBadges}
        description={vm.copy.headerDescription}
        descriptionMaxWidth="840px"
        eyebrow={vm.copy.headerEyebrow}
        title={vm.copy.headerTitle}
        titleId="about-title"
        titleSize={{ base: '3xl', md: '5xl' }}
      />
      <SectionSubnav ariaLabel={vm.copy.guideSectionAriaLabel} items={vm.sectionNavItems} />

      <Stack gap="7">
        <Box maxW="880px">
          <Heading as="h2" fontSize="2xl" mb="3">
            {vm.copy.introTitle}
          </Heading>
          <Text color="#c9d2da" fontSize="lg" lineHeight="1.8">
            {vm.copy.introText}
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4">
          {vm.copy.architectureItems.map((item, index) => (
            <Box
              bg="rgba(18, 24, 32, 0.86)"
              borderColor="rgba(103, 232, 249, 0.16)"
              borderRadius="md"
              borderWidth="1px"
              key={item.label}
              minH="178px"
              p="5"
            >
              <Flex align="center" gap="3" mb="3">
                <Badge colorPalette={index === 0 ? 'cyan' : 'green'} variant="subtle">
                  {index + 1}
                </Badge>
                <Heading as="h3" fontSize="lg">
                  {item.label}
                </Heading>
              </Flex>
              <Text color="#9aa7b1" lineHeight="1.6">
                {item.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
          {vm.copy.comparisonColumns.map((column) => (
            <GuideFactPanel key={column.title} title={column.title}>
              <Stack as="ul" color="#c9d2da" gap="2" lineHeight="1.65" pl="5">
                {column.items.map((item) => (
                  <Text as="li" key={item}>
                    {item}
                  </Text>
                ))}
              </Stack>
            </GuideFactPanel>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
          {vm.copy.actions.map((action) => (
            <GuideFactPanel
              actionHref={action.href}
              actionLabel={action.label}
              description={action.description}
              key={action.href}
              title={action.title}
            />
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4">
          {vm.copy.evaluationSteps.map((step) => (
            <GuideFactPanel
              actionHref={step.href}
              actionLabel={step.label}
              description={step.description}
              key={step.href}
              title={step.title}
            />
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
          {vm.copy.sourceLinks.map((link) => (
            <GuideFactPanel
              actionHref={link.href}
              actionLabel={link.label}
              description={link.description}
              isExternal
              key={link.href}
              title={link.title}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </PageShell>
  );
});
