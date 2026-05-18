import { Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { useViewModel } from 'src/shared/lib';
import { PageShell } from 'src/shared/ui';
import { HomeViewModel } from '../../model/HomeViewModel';
import { HomeCapabilityGrid } from '../HomeCapabilityGrid/HomeCapabilityGrid';
import { HomeDemoPaths } from '../HomeDemoPaths/HomeDemoPaths';
import { HomeHero } from '../HomeHero/HomeHero';
import { HomeProofStrip } from '../HomeProofStrip/HomeProofStrip';
import { HomeSourceLinks } from '../HomeSourceLinks/HomeSourceLinks';

export const HomePage = observer(() => {
  const vm = useViewModel(HomeViewModel);

  return (
    <PageShell>
      <Stack gap={{ base: '10', lg: '12' }}>
        <HomeHero vm={vm} />
        <HomeProofStrip vm={vm} />
        <HomeCapabilityGrid vm={vm} />
        <HomeDemoPaths vm={vm} />
        <HomeSourceLinks vm={vm} />
      </Stack>
    </PageShell>
  );
});
