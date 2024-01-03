/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
// import moment from 'moment';

import { communityState } from './../recoils/Community';
import CommunityHeader from '../components/Community/CommunityHeader';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import Board from './../components/Community/Board';
import Comment from './../components/Community/Comment';
import CommentForm from './../components/Community/CommentForm';

function CommunityBoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [communityPost, setCommunityPost] = useRecoilState(communityState(id));

  useEffect(() => {
    const getCommunityPost = async () => {
      try {
        const response = await fetch(`http://localhost:8001/community/board/${id}`);
        const data = await response.json();

        if (!response.ok) {
          console.error(`게시글 불러오기 오류: ${data.message}`);
          return;
        }

        setCommunityPost(data.data);
      } catch (error) {
        console.error('게시글 불러오기 오류:', error);
      }
    };

    getCommunityPost();
  }, [id, setCommunityPost]);

  const deleteBoardEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8001/community/board/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(`게시글 삭제 오류: ${data.message}`);
        return;
      }

      console.log('게시글 삭제됨:', id);
      navigate('/community');
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
    }
  };

  if (!communityPost) {
    console.log('게시글을 찾을 수 없음:', id);
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <CommunityHeader />
      <main id="main" style={{ marginTop: '30px' }}>
        {/* Blog Section 부분 */}
        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="row g-5">
              <div className="col-lg-9" data-aos="fade-up" data-aos-delay={200}>
                {/* row gy-2로 댓글 입력창과 댓글 간격 있음 */}
                <div className="row gy-2 posts-list">
                  <Board {...communityPost.board} />
                  <CommentForm key="comment-form" />
                  <h4>댓글 내용</h4>
                  {communityPost.comments.length === 0 ? (
                    <p>작성된 댓글이 없습니다.</p>
                  ) : (
                    <>
                      <div className="mb-3"></div>
                      <Comment comments={communityPost.comments} />
                    </>
                  )}
                  {/* 삭제 버튼 및 이벤트 핸들러 등 추가할 부분 */}
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

export default CommunityBoardDetail;
