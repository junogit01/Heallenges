import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchKeywordState } from '@recoils/rank';
import { challengesState } from '@recoils/challenge';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { challengesListSelector } from '@recoils/challenge';

function ChallengesCommunityHead() {
  const { id } = useParams();

  const challengesBoard = useRecoilValue(challengesState);
  const { getChallengeDetail } = useRecoilValue(challengesListSelector);

  useEffect(() => {
    getChallengeDetail(id);
  }, [id]);

  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <div className="text-center mx-auto mb-4 " style={{ width: 'fit-content' }}>
          <p className="navbar-brand " style={{ fontSize: '36px', justifyContent: 'center' }}>
            {challengesBoard[0]?.title}
          </p>
        </div>
      </div>
    </nav>
  );
}

export default ChallengesCommunityHead;
