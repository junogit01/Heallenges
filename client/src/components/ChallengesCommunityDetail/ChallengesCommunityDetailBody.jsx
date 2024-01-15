import React, { useState, useEffect } from 'react';
import ChallengesDetailSideBar from '../ChallengesDetail/ChallengeDetailSideBar';
import ChallengesCommunityDetailPost from './ChallengesCommunityDetailPost';
import ChallengesCommunityDetailComment from './ChallengesCommunityDetailComment';
import ChallengesCommunityDetailBtn from './ChallengesCommunityDetailBtn';

// import ChallengesCommunityList from './ChallengesCommunityList';

function ChallengesCommunityDetailBody() {
  return (
    <div className="container-md">
      <main id="main" style={{ marginTop: '30px' }}>
        <section id="blog" className="blog">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-9">
                <div className="row gy-2 posts-list">
                  <div>
                    <ChallengesCommunityDetailPost />
                  </div>
                </div>
              </div>
              <ChallengesDetailSideBar />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ChallengesCommunityDetailBody;
