import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { challengesListSelector, challengesBoardState, challengesState } from '@recoils/challenge';

function ChallengesCommunityDetailHead() {
  const { challengeId, id } = useParams();

  const challengesBoard = useRecoilValue(challengesState);
  const challengesBoardDetail = useRecoilValue(challengesBoardState);
  const { getChallengeDetail, getChallengeBoardDetail } = useRecoilValue(challengesListSelector);

  useEffect(() => {
    getChallengeDetail(challengeId);
    getChallengeBoardDetail(challengeId, id);
  }, [challengeId, id]);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <div className="text-center mx-auto mb-4 " style={{ width: 'fit-content' }}>
          <p className="navbar-brand " style={{ fontSize: '36px', justifyContent: 'center' }}>
            {challengesBoard[0]?.title}
          </p>
        </div>
        {/* <div className="d-flex justify-content-end">
          <form className="d-flex " style={{ width: '20rem', marginTop: '7rem', marginRight: '1.5rem' }}>
            <input
              className="form-control"
              type="search"
              placeholder="을 입력해 주세요"
              aria-label="Search"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              style={{ width: '30rem' }}
            />
            <i className="bi bi-search" style={{ fontSize: '2rem', marginLeft: '-4rem' }}></i>
          </form>
        </div> */}
      </div>
    </nav>
  );
}

export default ChallengesCommunityDetailHead;
