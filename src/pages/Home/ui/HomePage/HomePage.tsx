import { Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { useViewModel } from 'src/shared/lib';
import { PageShell } from 'src/shared/ui';
import { HomeViewModel } from '../../model/HomeViewModel';
import { HomeCapabilityGrid } from '../HomeCapabilityGrid/HomeCapabilityGrid';
import { HomeHero } from '../HomeHero/HomeHero';

export const HomePage = observer(() => {
  const vm = useViewModel(HomeViewModel);

  return (
    <PageShell py="0">
      <Stack gap="0">
        <HomeHero vm={vm} />
        <HomeCapabilityGrid vm={vm} />
      </Stack>
    </PageShell>
  );
});
