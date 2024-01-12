// Communitys.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityHeader from '../components/Community/CommunityHeader';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import CommunityBoard from '../components/Community/CommunityBoard';
import { communityListState } from '../recoils/Community';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '@recoils/login';

const Community = () => {
  const navigate = useNavigate();

  // 로그인이 안되면 로그인페이지로 이동
  const loginUser = useRecoilValue(loginState);
  if (loginUser?.id === '' && loginUser?.email === '') navigate('/login');

  // 전체 게시물을 리코일 (communityListState) 불러오기
  const [allPosts, setAllPosts] = useRecoilState(communityListState);

  const handleCategoryChange = category => {
    // 여기에 원하는 로직을 추가하거나 필요한 경우 상태 업데이트 등을 수행
    console.log('Selected Category:', category);
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch('http://localhost:8001/community');
        const data = await response.json();
        setAllPosts(data.data || []);
      } catch (error) {
        // console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchAllPosts();
  }, [setAllPosts]);

  return (
    <>
      <main id="main">
        {/* 커뮤니티 헤더 */}
        <CommunityHeader />

        {/* 본문 */}
        <section id="blog" className="blog" style={{ marginTop: '30px' }}>
          <div className="container" data-aos="fade-up">
            <div className="row g-5">
              <div className="col-lg-9" data-aos="fade-up" data-aos-delay={200}>
                <div className="row gy-5 posts-list">
                  {/* CommunityBoard에 전체게시판의 글 데이터 전달 */}
                  <CommunityBoard posts={allPosts} handleCategoryChange={handleCategoryChange} />
                </div>
              </div>
              {/* Sidebar */}
              <CommunitySidebar />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Community;
