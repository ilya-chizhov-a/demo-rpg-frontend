import { Badge, Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import { LocaleSwitch } from 'src/shared/ui';
import type { RegionDetailViewModel } from '../../model/RegionDetailViewModel';
import { RegionCoverVisual } from '../RegionCoverVisual/RegionCoverVisual';

interface RegionDetailHeaderProps {
  readonly vm: RegionDetailViewModel;
}

export const RegionDetailHeader = observer(({ vm }: RegionDetailHeaderProps) => {
  return (
    <Box mb="8">
      <Button
        aria-label="Back to regions catalog"
        asChild
        borderColor="rgba(103, 232, 249, 0.34)"
        color="#67e8f9"
        minH="44px"
        size="md"
        variant="outline"
        _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
      >
        <RouterLink to="/regions">← Back to regions catalog</RouterLink>
      </Button>

      <Box mt="4">
        <RegionCoverVisual
          climate={vm.climate}
          image={vm.coverImage}
          regionId={vm.id}
          variant="hero"
        />
      </Box>

      <Grid
        alignItems="start"
        gap="5"
        mt="5"
        templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) 224px' }}
      >
        <Box minW="0">
          <Flex gap="2" mb="4" wrap="wrap">
            <Badge colorPalette="blue" size="lg" variant="subtle">
              data.regions
            </Badge>
            <Badge colorPalette="green" size="lg" variant="subtle">
              {vm.climate}
            </Badge>
            <Badge colorPalette="gray" size="lg" variant="subtle">
              backend pending
            </Badge>
          </Flex>
          <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} lineHeight="1.1">
            {vm.title}
          </Heading>
          <Text
            color="var(--color-text-supporting)"
            fontSize="lg"
            lineHeight="1.6"
            mt="4"
            maxW="760px"
          >
            {vm.description}
          </Text>
          <Text color="#9aa7b1" fontSize="sm" mt="3">
            Locale: <Text as="strong">{vm.localeLabel}</Text>
          </Text>
        </Box>

        <Flex align={{ base: 'flex-start', lg: 'flex-end' }} direction="column" gap="3" minW="0">
          <LocaleSwitch onChange={(locale) => vm.setLocale(locale)} value={vm.locale} />
        </Flex>
      </Grid>
    </Box>
  );
});
