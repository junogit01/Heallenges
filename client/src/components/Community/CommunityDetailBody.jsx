// CommunityBoardDetail.jsx
// 좋아요, 좋아요 취소, 게시물 상세 정보, 게시물 삭제

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Board from '@components/Community/Detail/Board';
import Comment from '@components/Community/Detail/Comment';
import CommentForm from '@components/Community/Detail/CommentInsertForm';
import CommunitySidebar from '@components/Community/Detail/CommunitySidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '@recoils/login';
import { communityState } from '@recoils/Community';
import Swal from 'sweetalert2';
import axios from 'axios';

function CommunityBoardDetail() {
  // 게시물 아이디 가져오기
  const { id } = useParams();
  // React Router의 navigate 함수를 이용하여 페이지 이동 관리
  const navigate = useNavigate();
  // Recoil을 사용하여 전역 상태인 loginUser 가져오기
  const loginUser = useRecoilValue(loginState);

  // 로그인이 되어 있지 않으면 로그인 페이지로 이동
  if (!loginUser.id && !loginUser.email) navigate('/login');

  // Recoil을 사용하여 게시물 상태 가져오기
  const [communityPost, setCommunityPost] = useRecoilState(communityState(id));

  // 좋아요 상태를 관리하는 로컬 상태
  const [liked, setLiked] = useState(false);

  // 좋아요 이벤트 처리 함수
  const likeCommunityEvent = async () => {
    try {
      const response = await axios.post(
        `/community/like/${loginUser.id}/${id}`,
        JSON.stringify({
          post_id: id,
          user_id: loginUser.id,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // resp.data => {message: 'OK', status: 200}
      if (response.data.message !== 'OK') {
        const data = await response.data;
      } else {
        // 좋아요 상태 갱신 및 게시물 정보 갱신
        setLiked(true);
        getCommunityPost();
      }
    } catch (error) {
      // 좋아요 처리 중 오류 발생 시 처리
      console.error('좋아요 오류:', error);
    }
  };

  // 좋아요 취소 이벤트 처리 함수
  const dislikeCommunityEvent = async () => {
    try {
      const response = await axios.delete(`/community/like/${loginUser.id}/${id}`, {
        data: JSON.stringify({
          post_id: id,
          user_id: loginUser.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // resp.data => {message: 'OK', status: 200}
      if (response.data.message !== 'OK') {
        const data = await response.data;
        // 좋아요 취소 오류 처리
        console.error(`좋아요 취소 오류: ${data.message}`);
        return;
      } else {
        // 좋아요 상태 갱신 및 게시물 정보 갱신
        setLiked(false);
        getCommunityPost();
      }
    } catch (error) {
      // 좋아요 취소 처리 중 오류 발생 시 처리
      console.error('좋아요 취소 오류:', error);
    }
  };

  // 게시물 정보를 가져오는 함수
  const getCommunityPost = async () => {
    try {
      const response = await axios.get(`/community/community/${id}`);

      if (response.status !== 200) {
        const data = response.data;
        // 게시글 불러오기 오류 처리
        console.error(`게시글 불러오기 오류: ${data.message}`);
        return;
      }

      // 게시물 정보 갱신
      setCommunityPost(response.data.data);
    } catch (error) {
      // 게시글 불러오기 중 오류 발생 시 처리
      console.error('게시글 불러오기 오류:', error);
    }
  };

  // 페이지가 마운트 될 때와 게시물 아이디가 변경될 때 게시물 정보를 가져오기
  useEffect(() => {
    // 게시물 정보를 가져오는 함수 호출
    getCommunityPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setCommunityPost]);

  // useEffect를 하나 더 추가해서 communityPost.likes가 정의되어 있을 때만 setLiked를 호출.
  useEffect(() => {
    if (communityPost.likes) {
      // 현재 로그인한 사용자의 아이디와 게시물 좋아요 목록을 비교하여 좋아요 상태 갱신
      const userLiked = communityPost.likes.includes(loginUser.id);
      setLiked(userLiked);
    }
  }, [communityPost.likes, loginUser.id]);

  // 게시물 삭제 이벤트 처리 함수
  const deleteCommunityEvent = async () => {
    try {
      const response = await axios.delete(`/community/${id}`);

      if (response.status !== 200) {
        console.error(`게시글 삭제 오류: ${response.data.message}`);
        // 게시물 삭제 오류 시 SweetAlert로 에러 알림
        Swal.fire({
          title: '오류',
          text: '게시물 삭제 오류가 발생했습니다.',
          icon: 'error',
        });
        return;
      }

      // 게시물 삭제 성공 시 SweetAlert로 성공 알림
      Swal.fire({
        title: '게시물 삭제',
        text: '게시물이 삭제 되었습니다.',
        icon: 'success',
      });

      // 게시물 삭제 후 커뮤니티 페이지로 이동
      navigate('/community');
    } catch (error) {
      // 게시글 삭제 중 오류 발생 시 처리
      console.error('게시글 삭제 오류:', error);
    }
  };

  // 게시물이 존재하지 않을 경우 화면에 표시
  if (!communityPost) {
    // console.log('게시글을 찾을 수 없음:', id);
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  // 게시물이 존재하지 않을 경우 화면에 표시
  if (!communityPost.board) {
    // 게시글을 찾을 수 없거나, user_id가 없는 경우
    Swal.fire({
      title: '알림',
      text: '해당 게시물을 확인할 수 없습니다.',
      icon: 'info',
      confirmButtonText: '확인',
    });
    navigate('/community');
    return null; // 리다이렉션 후, 아무것도 렌더링하지 않도록 null을 반환
  }

  // 현재 로그인한 사용자가 게시물 작성자인지 확인 후 수정 및 삭제 버튼 활성화 여부 결정
  const isUserPostOwner = loginUser.id === communityPost.board.user_id;

  return (
    <>
      <main style={{ marginTop: '30px' }}>
        <section>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-9">
                <div className="row gy-2 posts-list">
                  <Board {...communityPost.board} />
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div className="mb-3 d-flex">
                            {/* 좋아요 좋아요 취소 버튼 */}
                            <button
                              type="button"
                              className={`btn ${liked ? 'btn-danger' : 'btn-primary'} btn-lg me-auto`}
                              style={{ margin: '0 5px' }}
                              onClick={liked ? dislikeCommunityEvent : likeCommunityEvent}>
                              {liked ? '좋아요 취소' : '좋아요'}
                            </button>
                            {/* 게시판 리스트 목록으로 이동하는 버튼 */}
                            <button
                              type="button"
                              className="btn btn-primary btn-lg"
                              style={{ margin: '0 5px' }}
                              onClick={() => navigate('/community')}>
                              목록
                            </button>

                            {/* 현재 로그인한 사용자가 게시물 작성자인 경우 수정 및 삭제 버튼 표시 */}
                            {isUserPostOwner && (
                              <>
                                {/* 수정 버튼 */}
                                <button
                                  type="button"
                                  className="btn btn-warning btn-lg"
                                  style={{ margin: '0 5px' }}
                                  onClick={() => navigate(`/community/update/${id}`)}>
                                  수정
                                </button>
                                {/* 삭제 버튼 */}
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
              {/* 커뮤니티 사이드바 컴포넌트 */}
              <CommunitySidebar />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CommunityBoardDetail;
