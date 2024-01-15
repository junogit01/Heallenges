// Communitys.jsx
import CommunityHeader from '../components/Community/CommunityHeader';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import CommunityBoard from '../components/Community/CommunityBoard';

const Community = () => {
  return (
    <>
      <main id="main">
        {/* 커뮤니티 헤더 */}
        <CommunityHeader />

        {/* 본문 */}
        <section style={{ marginTop: '30px' }}>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-9">
                <div className="row gy-5 posts-list">
                  {/* CommunityBoard에 전체 게시판의 글 데이터를 전달 */}
                  <CommunityBoard />
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
