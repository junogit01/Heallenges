import React, { useState, useEffect } from 'react';
import ChallengesDetailSideBar from '../ChallengesDetail/ChallengeDetailSideBar';
import ChallengesCommunityList from './ChallengesCommunityList';

function ChallengesCommunityBody() {
  return (
    <div className="container-md">
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
    </div>
  );
}

export default ChallengesCommunityBody;
