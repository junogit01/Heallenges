import React from 'react';
import CommunityHeader from '../components/Community/CommunityHeader';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import CommunityBoard from './../components/Community/CommunityBoard';

const CommunityFree = () => {
  const freePosts = [
    {id: 1, title: '자유 게시물 1'},
    {id: 2, title: '자유 게시물 2'},
    {id: 3, title: '자유 게시물 3'},
    // ... 여러 자유게시물 데이터 추가
  ];

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
                  <CommunityBoard posts={freePosts} category='자유' />
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
};

export default CommunityFree;
