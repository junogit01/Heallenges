// CommunityNotice.jsx
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CommunityHeader from '../components/Community/CommunityHeader';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import CommunityBoard from '../components/Community/CommunityBoard';
import { allPostsState } from './../recoils/Community';

const CommunityNotice = () => {
  const [allPosts, setAllPosts] = useRecoilState(allPostsState);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch('http://localhost:8001/community/1');
        const data = await response.json();
        console.log(data); // 서버 응답 구조 확인
        setAllPosts(data.data || []); // Recoil 상태 업데이트
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchAllPosts();
  }, [setAllPosts]); // setAllPosts를 의존성으로 추가

  return (
    <>
      <main id="main">
        {/* Breadcrumbs 부분 */}
        <CommunityHeader />

        {/* Blog Section 부분 */}
        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="row g-5">
              <div className="col-lg-8" data-aos="fade-up" data-aos-delay={200}>
                <div className="row gy-5 posts-list">
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

export default CommunityNotice;
