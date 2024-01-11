import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { loginState } from '@recoils/login';
import { communityCommentState } from '@recoils/Community';

const Comment = ({ comments }) => {
  // console.log(comments);

  // 로그인한 아이디와 댓글의 유저 아이디 확인
  const loginUser = useRecoilValue(loginState);
  const isCommentOwner = comment => {
    const isOwner = loginUser.id === comment.user_id;

    return isOwner;
  };

  const deleteComment = useRecoilCallback(({ set }) => async commentId => {
    try {
      // 서버에 DELETE 요청 보내기
      await axios.delete(`http://localhost:8001/community/comment/${commentId}`);

      // 리코일 상태 업데이트
      const updatedComments = comments.filter(comment => comment.comment_id !== commentId);
      set(communityCommentState, updatedComments);

      // 삭제 성공 시 SweetAlert2를 사용하여 메시지 표시
      Swal.fire({
        title: '댓글 삭제',
        text: '댓글이 성공적으로 삭제되었습니다.',
        icon: 'success',
      });
    } catch (error) {
      // console.error('Error deleting comment:', error);

      // 삭제 실패 시 SweetAlert2를 사용하여 에러 메시지 표시
      Swal.fire({
        title: '댓글 삭제 실패',
        text: '댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
        icon: 'error',
      });
    }
  });

  const handleDeleteComment = commentId => {
    deleteComment(commentId);
    // console.log(`Delete comment with id ${commentId}`);
  };

  // 댓글 페이지로 표시에 필요한 상태들을 초기화
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const commentsPerPage = 5; // 1페이지 당 표시될 댓글 수
  const totalComments = comments.length; // 전체 댓글 수
  const totalPages = Math.ceil(totalComments / commentsPerPage); // 전체 페이지 수
  const maxVisiblePages = 10; // 한 번에 보여질 최대 페이지 수

  let startPage;
  let endPage;

  // 전체 페이지 수가 maxVisiblePages 이하일 때, startPage와 endPage를 설정
  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    // 한 번에 보여질 페이지 수의 절반을 계산
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    // (1~5) 현재 페이지가 화면에 5 이하의 페이지에 위치할 때
    if (currentPage <= halfVisiblePages) {
      startPage = 1;
      endPage = maxVisiblePages;
    }
    // (~끝) 현재 페이지가 끝 페이지의 - 5에 위치할 때
    else if (currentPage + halfVisiblePages >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
      // (그 외)
    } else {
      startPage = currentPage - halfVisiblePages + 1;
      endPage = currentPage + halfVisiblePages;
    }
  }

  // 화면에 보여질 페이지 번호 배열 생성
  // pagenumshow 없으면 NaN만 나옴 있어야 1~10 이러고 숫자 표시됨
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (pagenumshow, index) => startPage + index);

  // 현재 페이지에 해당하는 댓글 목록 가져오기
  const currentComments = comments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);

  const renderComments = currentComments.map((comment, index) => (
    <div key={`comment-${index + 1}`} className="card bg-light mb-4">
      <div className="card-body">
        <div className="d-flex align-items-start">
          <div className="flex-shrink-0">
            <img
              className="rounded-circle"
              src={comment.profile_image}
              alt="사진"
              style={{ maxHeight: '50px', maxWidth: '50px', marginRight: '1rem' }}
            />
          </div>
          <div className="ms-3">
            <div className="fw-bold">{comment.nickname || '사용자 없음'}</div>
            <p>{comment.contents}</p>
            {/* 대댓글 기능인데 쓸지 안쓸지 몰라서 보류 */}
            {/* {comment.children && comment.children.length > 0 && (
              <div className="ms-4">
                {comment.children.map((childComment, childIndex) => (
                  <div key={`child-comment-${childIndex + 1}`} className="d-flex mt-4">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle"
                        src={childComment.profile_image || '/images/blog/default-avatar.jpg'}
                        alt="유저 아바타"
                        style={{ maxHeight: '50px', maxWidth: '50px', marginRight: '1rem' }}
                      />
                    </div>
                    <div className="ms-3">
                      <div className="fw-bold">{childComment.nickname || '사용자 없음'}</div>
                      <p>{childComment.contents}</p>
                    </div>
                  </div>
                ))}
              </div>
            )} */}
            <div className="mt-3">
              <time dateTime={comment.create_date ? moment(comment.create_date).format('YYYY-MM-DD HH:mm:ss') : ''}>
                {comment.create_date ? moment(comment.create_date).format('YYYY년 MM월 DD일 HH:mm:ss') : '날짜 없음'}
              </time>
              {isCommentOwner(comment) && (
                // 댓글 삭제 버튼(위치)
                <button
                  type="button"
                  // className= "btn btn-link btn-sm btn-rounded ml-auto"
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
  ));

  // renderPageNumbers 변수는 페이지 네비게이션의 각 페이지 번호를 렌더링하는데 사용
  const renderPageNumbers = pageNumbers.map(number => (
    // 각 페이지 번호에 대한 <li> 요소를 생성.
    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
      {/* 페이지 번호를 클릭할 때 해당 페이지로 이동하도록 onClick 이벤트 설정 */}
      <button className="page-link" onClick={() => paginate(number)}>
        {number}
      </button>
    </li>
  ));

  const paginate = pageNumber => {
    // 새로운 페이지 번호를 계산
    const newPage = pageNumber < 1 ? 1 : pageNumber > totalPages ? totalPages : pageNumber;
    // 계산된 페이지 번호로 현재 페이지를 업데이트
    setCurrentPage(newPage);
    // console.log('newPage', newPage);
  };

  return (
    <div>
      {renderComments}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => paginate(1)}>
              처음
            </button>
          </li>
          {currentPage > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => paginate(currentPage - 10 < 1 ? 1 : currentPage - 10)}>
                이전
              </button>
            </li>
          )}
          {renderPageNumbers}
          {currentPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 10 > totalPages ? totalPages : currentPage + 10)}>
                다음
              </button>
            </li>
          )}
          <li className="page-item">
            <button className="page-link" onClick={() => paginate(totalPages)}>
              마지막
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Comment;
