import React, { useState, useEffect } from 'react';
import ChallengesDetailSideBar from '../ChallengesDetail/ChallengeDetailSideBar';
import ChallengesCommunityList from './ChallengesCommunityList';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { challengesBoardListState, challengesListSelector } from '@recoils/challenge';
import { useParams } from 'react-router-dom';

function ChallengesCommunityBody() {
  const { id } = useParams();
  const boardList = useRecoilValue(challengesBoardListState);
  const { getChallengeBoardList } = useRecoilValue(challengesListSelector);

  useEffect(() => {
    getChallengeBoardList(id);
  }, [id]);

  return (
    <>
      <main id="main" style={{ marginTop: '30px' }}>
        <section id="blog" className="blog">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-9">
                <div className="row gy-2 posts-list">
                  <div>
                    <ChallengesCommunityList />
                  </div>
                </div>
              </div>
              <ChallengesDetailSideBar />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ChallengesCommunityBody;
