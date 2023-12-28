// Notice.jsx

import React from 'react';

import CommunityHeader from '../components/Community/CommunityHeader';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import NoticeBoard from './NoticeBoard'; // NoticeBoard import 추가

function Notice() {
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
                  {/* NoticeBoard 추가 */}
                  <NoticeBoard />
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

export default Notice;
