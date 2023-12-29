// Community.jsx

import React from 'react';
import CommunityHeader from '../components/Community/CommunityHeader';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import CommunityBoard from '../components/Community/CommunityBoard';

const Community = () => {
  // 전체게시판의 글 데이터
  const allPosts = [
    {id: 1, title: '전체 게시물 1'},
    {id: 2, title: '전체 게시물 2'},
    {id: 3, title: '전체 게시물 3'},
    {id: 4, title: '전체 게시물 1'},
    {id: 5, title: '전체 게시물 2'},
    {id: 6, title: '전체 게시물 3'},
    {id: 7, title: '전체 게시물 1'},
    {id: 8, title: '전체 게시물 2'},
    {id: 9, title: '전체 게시물 3'},
    // ... 다른 게시물 데이터
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
                  {/* CommunityBoard에 전체게시판의 글 데이터 전달 */}
                  <CommunityBoard posts={allPosts} />
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

export default Community;