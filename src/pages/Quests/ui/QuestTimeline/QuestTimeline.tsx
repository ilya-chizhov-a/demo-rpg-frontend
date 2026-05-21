import { Badge, Box, Button, Flex, Grid, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import { DetailFactField, StatePanel } from 'src/shared/ui';
import type { QuestDetailViewModel } from '../../model/QuestDetailViewModel';
import type { QuestRewardDescriptor } from '../../model/QuestStepViewModel';
import { QuestStepImageVisual } from '../QuestStepImageVisual/QuestStepImageVisual';

interface QuestTimelineProps {
  readonly vm: QuestDetailViewModel;
}

export const QuestTimeline = observer(function QuestTimeline({ vm }: QuestTimelineProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p={{ base: '5', md: '6' }}
    >
      <Flex align="center" gap="3" justify="space-between" mb="4" wrap="wrap">
        <Heading as="h2" fontSize="xl">
          {vm.copy.detail.timelineTitle}
        </Heading>
        <Badge colorPalette="cyan" variant="subtle">
          {vm.copy.stepCountLabel}: {vm.stepCountLabel}
        </Badge>
      </Flex>

      {vm.hasSteps ? (
        <Stack as="ol" gap="0" listStyleType="none" m="0" p="0">
          {vm.steps.map((step) => (
            <Box
              as="li"
              borderBottomColor="rgba(148, 163, 184, 0.18)"
              borderBottomWidth="1px"
              key={step.id}
              py="5"
              _first={{ pt: '0' }}
              _last={{ borderBottomWidth: '0', pb: '0' }}
            >
              <Grid gap="4" templateColumns={{ base: '1fr', lg: 'minmax(260px, 360px) 1fr' }}>
                <QuestStepImageVisual
                  image={step.image}
                  placeholderDescription={step.imagePlaceholderDescription}
                  placeholderTitle={vm.copy.detail.imagePlaceholderTitle}
                />
                <Box minW="0">
                  <Flex align="flex-start" gap="3" justify="space-between" wrap="wrap">
                    <Box minW="0">
                      <Heading as="h3" fontSize="lg" lineHeight="1.25">
                        {step.title}
                      </Heading>
                      <Text color="#c9d2da" lineHeight="1.6" mt="2">
                        {step.description}
                      </Text>
                    </Box>
                    <Badge colorPalette="green" variant="subtle">
                      {vm.copy.detail.stepXpLabel}: {step.xpLabel}
                    </Badge>
                  </Flex>

                  <SimpleGrid as="dl" columns={{ base: 1, md: 2 }} gapX="4" mt="4">
                    <LinkFact href={step.npcHref} label={vm.copy.detail.stepNpcLabel} value={step.npcTitle} />
                    <LinkFact
                      href={step.locationHref}
                      label={vm.copy.detail.stepLocationLabel}
                      value={step.locationTitle}
                    />
                    <DetailFactField
                      label={vm.copy.detail.stepFileNameLabel}
                      value={step.imageFileName}
                    />
                    <DetailFactField
                      label={vm.copy.detail.stepFileDimensionsLabel}
                      value={step.imageDimensionsLabel}
                    />
                    <DetailFactField
                      label={vm.copy.detail.stepFileStatusLabel}
                      value={step.imageStatus}
                    />
                  </SimpleGrid>

                  <RewardList rewards={step.rewards} vm={vm} />
                </Box>
              </Grid>
            </Box>
          ))}
        </Stack>
      ) : (
        <StatePanel
          description={vm.copy.detail.emptyStepsDescription}
          title={vm.copy.detail.emptyStepsTitle}
        />
      )}
    </Box>
  );
});

interface LinkFactProps {
  readonly href: string;
  readonly label: string;
  readonly value: string;
}

function LinkFact({ href, label, value }: LinkFactProps) {
  return (
    <Flex
      align="center"
      as="div"
      borderBottomColor="rgba(103, 232, 249, 0.14)"
      borderBottomWidth="1px"
      gap="3"
      justify="space-between"
      py="3"
    >
      <Text as="dt" color="#9aa7b1" flexShrink="0" fontSize="xs" lineHeight="1.2">
        {label}
      </Text>
      <Button
        asChild
        color="#67e8f9"
        fontSize="sm"
        fontWeight="bold"
        h="auto"
        minW="0"
        px="0"
        py="0"
        textAlign="right"
        variant="plain"
        whiteSpace="normal"
        _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
      >
        <RouterLink to={href}>{value}</RouterLink>
      </Button>
    </Flex>
  );
}

interface RewardListProps {
  readonly rewards: readonly QuestRewardDescriptor[];
  readonly vm: QuestDetailViewModel;
}

function RewardList({ rewards, vm }: RewardListProps) {
  return (
    <Box borderLeftColor="rgba(34, 211, 238, 0.32)" borderLeftWidth="2px" mt="5" pl="4">
      <Heading as="h4" color="#f4f7f8" fontSize="md">
        {vm.copy.detail.rewardsTitle}
      </Heading>
      {rewards.length > 0 ? (
        <Stack as="ul" gap="3" listStyleType="none" mt="3" p="0">
          {rewards.map((reward) => (
            <RewardItem key={reward.id} reward={reward} vm={vm} />
          ))}
        </Stack>
      ) : (
        <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2">
          {vm.copy.detail.rewardsEmptyDescription}
        </Text>
      )}
    </Box>
  );
}

interface RewardItemProps {
  readonly reward: QuestRewardDescriptor;
  readonly vm: QuestDetailViewModel;
}

function RewardItem({ reward, vm }: RewardItemProps) {
  return (
    <Box
      bg="rgba(15, 21, 29, 0.62)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      p="3"
    >
      <Flex align="flex-start" gap="3" justify="space-between" wrap="wrap">
        <Box minW={{ base: '100%', md: '220px' }}>
          <Button
            asChild
            color="#67e8f9"
            minH="32px"
            px="0"
            variant="plain"
            _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
          >
            <RouterLink to={reward.href}>{reward.title}</RouterLink>
          </Button>
          <Text color="#9aa7b1" fontSize="sm">
            {vm.copy.detail.rewardItemTypeLabel}: {reward.itemTypeTitle}
          </Text>
        </Box>
        <Flex gap="2" wrap="wrap">
          <Badge colorPalette="cyan" variant="subtle">
            {vm.copy.detail.rewardQuantityLabel}: {reward.quantityLabel}
          </Badge>
          <Badge colorPalette="green" variant="subtle">
            {vm.copy.detail.rewardBonusXpLabel}: {reward.bonusXpLabel}
          </Badge>
          <Badge colorPalette="purple" variant="subtle">
            {reward.rarityLabel}
          </Badge>
          <Badge colorPalette="teal" variant="subtle">
            {vm.copy.detail.rewardMarketValueLabel}: {reward.marketValueLabel}
          </Badge>
        </Flex>
      </Flex>
    </Box>
  );
}
