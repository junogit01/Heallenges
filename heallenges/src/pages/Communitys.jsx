import React from 'react';
// import {Link} from 'react-router-dom';

import CommunityHeader from '../components/Community/CommunityHeader';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import CommunityBoard from '../components/Community/CommunityBoard'; // CommunityBoard import 추가

function Community() {
  return (
    <>
      <main id='main'>
        {/* Breadcrumbs 부분 */}
        <CommunityHeader />

        {/* Blog Section 부분 */}
        <section id='blog' className='blog'>
          <div className='container' data-aos='fade-up'>
            <div className='row g-5'>
              <div className='col-lg-8' data-aos='fade-up' data-aos-delay={200}>
                <div className='row gy-5 posts-list'>
                  {/* CommunityBoard 추가 */}
                  <CommunityBoard />
                </div>
              </div>
              {/* Sidebar 부분 */}
              <CommunitySidebar />
            </div>
          </div>
        </section>
        {/* End Blog Section */}
      </main>
    </>
  );
}

export default Community;
