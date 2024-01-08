// 이상하게 왜인지 모르겠으나 조회수가 2씩 올라감

/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { communityState } from './../recoils/Community';
import CommunityHeader from '../components/Community/CommunityHeader';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import Board from './../components/Community/Board';
import Comment from './../components/Community/Comment';
import CommentForm from '../components/Community/CommentInsertForm';
import { loginState } from '@recoils/login';
import { useRecoilValue } from 'recoil';

function CommunityBoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loginUser = useRecoilValue(loginState);
  const [communityPost, setCommunityPost] = useRecoilState(communityState(id));
  const [liked, setLiked] = useState(false);

  const likeCommunityEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8001/community/like/${loginUser.id}/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: id,
          user_id: loginUser.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(`좋아요 오류: ${data.message}`);
        return;
      }

      setLiked(true);
      getCommunityPost();
    } catch (error) {
      console.error('좋아요 오류:', error);
    }
  };

  const getCommunityPost = async () => {
    try {
      const response = await fetch(`http://localhost:8001/community/community/${id}`);
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

  useEffect(() => {
    getCommunityPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setCommunityPost]);

  const deleteCommunityEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8001/community/${id}`, {
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

  const isUserPostOwner = loginUser.id === communityPost.board.user_id;

  return (
    <>
      <CommunityHeader />
      <main id="main" style={{ marginTop: '30px' }}>
        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="row g-5">
              <div className="col-lg-9" data-aos="fade-up" data-aos-delay={200}>
                <div className="row gy-2 posts-list">
                  <Board {...communityPost.board} />
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div className="mb-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <button
                                type="button"
                                className={`btn btn-primary btn-lg ${liked ? 'btn-disabled' : ''}`}
                                style={{ margin: '0 5px' }}
                                onClick={likeCommunityEvent}
                                disabled={liked}>
                                {liked ? '좋아요 완료' : '좋아요'}
                              </button>
                              {isUserPostOwner && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-warning btn-lg"
                                    style={{ margin: '0 5px' }}
                                    onClick={() => navigate(`/community/update/${id}`)}>
                                    수정
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-lg"
                                    style={{ margin: '0 5px' }}
                                    onClick={deleteCommunityEvent}>
                                    삭제
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="card bg-light">
                    <CommentForm key="comment-form" />
                    <h4>댓글</h4>
                    {communityPost.comments.length === 0 ? (
                      <p>작성된 댓글이 없습니다.</p>
                    ) : (
                      <>
                        <Comment comments={communityPost.comments} />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <CommunitySidebar />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CommunityBoardDetail;
