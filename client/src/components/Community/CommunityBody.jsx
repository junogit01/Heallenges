// CommunityBody.jsx
// 게시판 목록(=>Detail폴더의 CommunityList)

import CommunitySidebar from '@components/Community/Detail/CommunitySidebar';
import CommunityList from '@components/Community/Detail/CommunityList';

const Community = () => {
  return (
    <>
      <main id="main">
        {/* 본문 */}
        <section style={{ marginTop: '30px' }}>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-9">
                <div className="row gy-5 posts-list">
                  {/* CommunityBoard에 전체 게시판의 글 데이터를 전달 */}
                  <CommunityList />
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
