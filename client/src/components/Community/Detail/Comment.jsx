// Comment
// 댓글 삭제

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { loginState } from '@recoils/login';
import { communityCommentState } from '@recoils/Community';

// 댓글을 표시하고 삭제하는 컴포넌트
const Comment = ({ comments }) => {
  // 현재 게시물의 아이디
  const { id } = useParams();

  // Recoil을 사용하여 로그인한 유저 정보 가져오기
  const loginUser = useRecoilValue(loginState);

  // 댓글 작성자와 로그인한 유저를 비교하여 댓글 삭제 권한 확인
  const isCommentOwner = comment => loginUser.id === comment.user_id;

  // 댓글 삭제 함수, useRecoilCallback을 사용하여 Recoil 상태 업데이트
  const deleteComment = useRecoilCallback(({ set }) => async commentId => {
    try {
      // 서버에 댓글 삭제 요청
      await axios.delete(`/community/comment/${commentId}`);

      // 삭제된 댓글을 제외한 업데이트된 댓글 목록 생성
      const updatedComments = comments.filter(comment => comment.comment_id !== commentId);

      // Recoil 상태 업데이트
      set(communityCommentState, updatedComments);

      // 댓글 삭제 성공 시 SweetAlert로 알림
      Swal.fire({
        title: '댓글 삭제',
        text: '댓글이 성공적으로 삭제되었습니다.',
        icon: 'success',
      });

      // 1초 후에 해당 게시물 페이지로 이동
      setTimeout(() => {
        window.location.replace(`/community/${id}`);
      }, 1000);
    } catch (error) {
      // 서버에서 댓글 삭제 실패 시 SweetAlert로 알림
      await Swal.fire({
        title: '댓글 삭제 실패',
        text: '댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
        icon: 'error',
      });
    }
  });

  // 댓글 삭제 버튼 클릭 시 댓글 삭제 함수 호출
  const handleDeleteComment = commentId => {
    deleteComment(commentId);
  };

  // 현재 페이지 및 페이지 당 표시할 댓글 수 설정
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const totalComments = comments.length;

  // 댓글 목록이 업데이트될 때마다 현재 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [comments, setCurrentPage]);

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 표시할 댓글 목록 계산
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // JSX 반환
  return (
    <div>
      {/* 댓글 목록 렌더링 */}
      {currentComments.map((comment, index) => (
        <div key={`comment-${index + 1}`} className="card bg-light mb-4">
          <div className="card-body">
            <div className="d-flex align-items-start">
              {/* 프로필 이미지 */}
              <div className="flex-shrink-0">
                <img
                  className="rounded-circle"
                  src={comment.profile_image}
                  alt="프로필 사진"
                  style={{ maxHeight: '50px', maxWidth: '50px', marginRight: '1rem' }}
                />
              </div>
              <div className="ms-3">
                {/* 댓글 작성자 정보 및 내용 */}
                <div className="fw-bold">{comment.nickname || '사용자 없음'}</div>
                <p
                  style={{
                    maxWidth: '500px',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    wordBreak: 'keep-all',
                  }}>
                  {comment.contents}
                </p>

                {/* 댓글 작성일 및 삭제 버튼 */}
                <div className="mt-3">
                  <time dateTime={comment.create_date ? moment(comment.create_date).format('YYYY-MM-DD HH:mm:ss') : ''}>
                    {comment.create_date
                      ? moment(comment.create_date).format('YYYY년 MM월 DD일 HH:mm:ss')
                      : '날짜 없음'}
                  </time>
                  {/* 댓글 작성자에게만 보이는 삭제 버튼 */}
                  {isCommentOwner(comment) && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ marginLeft: '20px' }}
                      onClick={() => handleDeleteComment(comment.comment_id)}>
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 페이지네이션 컴포넌트 */}
      <div className="d-flex justify-content-center mt-3">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={commentsPerPage}
          totalItemsCount={totalComments}
          pageRangeDisplayed={10}
          prevPageText="‹"
          nextPageText="›"
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link custom-pagination-button"
        />
      </div>
    </div>
  );
};

export default Comment;
