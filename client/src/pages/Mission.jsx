import { useEffect } from 'react';

import MissionBody from '@components/Mission/MissionBody';
import MissionHead from '@components/Mission/MissionHead';

import AOS from 'aos';

function Mission() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <MissionHead></MissionHead>

      <MissionBody></MissionBody>
    </>
  );
}

export default Mission;
