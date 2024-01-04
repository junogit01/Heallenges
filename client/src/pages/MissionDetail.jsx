import React from 'react';
import { Link } from 'react-router-dom';
import MissionDetailHead from '@components/Mission/MissionDetailHead';
import MissionDetailBody from '@components/Mission/MissionDetailBody';

function MissionDetail() {
  return (
    <main id="main">
      <MissionDetailHead></MissionDetailHead>
      <MissionDetailBody></MissionDetailBody>
    </main>
  );
}

export default MissionDetail;
