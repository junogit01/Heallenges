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
import Swal from 'sweetalert2';

function CommunityBoardDetail() {
  // 게시물아이디 삭제하기 위해서 사용
  const { id } = useParams();
  const navigate = useNavigate();

  // 로그인이 안되면 로그인페이지로 이동
  const loginUser = useRecoilValue(loginState);
  if (!loginUser.id && !loginUser.email) navigate('/login');

  // communityState로 기존 게시물에 작성된 값을 가져오기 위해 사용(이상하게 카테고리만 안 나옴)
  const [communityPost, setCommunityPost] = useRecoilState(communityState(id));

  // 좋아요 관리하기 위한 useState
  const [liked, setLiked] = useState(false);

  // 로컬 스토리지에서 좋아요 상태를 읽어와서 값 설정
  useEffect(() => {
    const storedLikeStatus = localStorage.getItem(`likeStatus_${id}`);
    if (storedLikeStatus === 'liked' || storedLikeStatus === 'disliked') {
      setLiked(storedLikeStatus === 'liked');
    }

    getCommunityPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setCommunityPost]);

  // 좋아요 이벤트 처리
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
        // console.error(`좋아요 오류: ${data.message}`);
        return;
      }

      // 좋아요 상태를 로컬 스토리지에 저장
      localStorage.setItem(`likeStatus_${id}`, 'liked');

      setLiked(true);
      getCommunityPost();
    } catch (error) {
      // console.error('좋아요 오류:', error);
    }
  };

  // 좋아요 취소 이벤트 처리
  const dislikeCommunityEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8001/community/dislike/${loginUser.id}/${id}`, {
        method: 'DELETE',
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
        // console.error(`좋아요 취소 오류: ${data.message}`);
        return;
      }

      // 좋아요 취소 상태를 로컬 스토리지에 저장
      localStorage.setItem(`likeStatus_${id}`, 'disliked');

      setLiked(false);
      getCommunityPost();
    } catch (error) {
      // console.error('좋아요 취소 오류:', error);
    }
  };

  // 게시물(상세내용)을 불러오기 위한 이벤트 처리
  const getCommunityPost = async () => {
    try {
      const response = await fetch(`http://localhost:8001/community/community/${id}`);
      const data = await response.json();

      if (!response.ok) {
        // console.error(`게시글 불러오기 오류: ${data.message}`);
        return;
      }

      setCommunityPost(data.data);
    } catch (error) {
      // console.error('게시글 불러오기 오류:', error);
    }
  };

  // 게시물 삭제 이벤트 처리
  const deleteCommunityEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8001/community/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(`게시글 삭제 오류: ${data.message}`);
        Swal.fire({
          title: '오류',
          text: '게시물 삭제 오류가 발생했습니다.',
          icon: 'error',
        });
        return;
      }

      Swal.fire({
        title: '게시물 삭제',
        text: '게시물이 삭제 되었습니다.',
        icon: 'success',
      });

      navigate('/community');
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
    }
  };

  // 혹시나 게시물이 불러오지 않으면 화면에 표시
  if (!communityPost) {
    // console.log('게시글을 찾을 수 없음:', id);
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  // 유저아이디와 게시물의 유저 아이디가 같은지 확인 후 수정 삭제 버튼 활성화 여부 결정
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
                                className={`btn ${liked ? 'btn-danger' : 'btn-primary'} btn-lg`}
                                style={{ margin: '0 5px' }}
                                onClick={liked ? dislikeCommunityEvent : likeCommunityEvent}>
                                {liked ? '좋아요 취소' : '좋아요'}
                              </button>
                              {/* 유저아이디와 게시물의 유저 아이디가 같은지 확인 후 수정 삭제 버튼 활성화 여부 결정 */}
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
                    {/* 댓글 입력 창 */}
                    <CommentForm key="comment-form" />
                    <h4>댓글</h4>
                    {/* 작성된 댓글 모음 */}
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
