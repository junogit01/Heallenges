import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import axios from 'axios';
import { loginState } from '@recoils/login';
import { communityCommentState } from '@recoils/Community';

const Comment = ({ comments }) => {
  // console.log(comments);

  const loginUser = useRecoilValue(loginState);
  const deleteComment = useRecoilCallback(({ snapshot, set }) => async commentId => {
    try {
      // 서버에 DELETE 요청 보내기
      await axios.delete(`http://localhost:8001/community/comment/${commentId}`);

      // 리코일 상태 업데이트
      const commentsSnapshot = await snapshot.getPromise(communityCommentState);
      const updatedComments = commentsSnapshot.filter(comment => comment.comment_id !== commentId);
      set(communityCommentState, updatedComments);

      // 다시 로드하고 싶다면
      // await getComments(postId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  });

  // const commentUser = useRecoilValue(communityCommentState);

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / commentsPerPage);
  const maxVisiblePages = 10;

  // const isCommentOwner = comment => {
  //   const isOwner = loginUser.id === comment.user_id;
  //   console.log(
  //     'loginUser.id:',
  //     loginUser.id,
  //     'comment.user_id:',
  //     // commentUser.user_id,
  //     'isOwner:',
  //     isOwner,
  //   );
  //   return isOwner;
  // };

  const isCommentOwner = comment => {
    const isOwner = loginUser.id === comment.user_id;
    // console.log(comment);
    // console.log(
    //   'loginUser.id:',
    //   loginUser.id,
    //   'comment.user_id:',
    //   comment.user_id, // 수정된 부분
    //   'isOwner:',
    //   isOwner,
    // );
    return isOwner;
  };

  const handleDeleteComment = commentId => {
    // 댓글 삭제 처리 로직을 여기에 추가
    deleteComment(commentId);
    console.log(`Delete comment with id ${commentId}`);
  };

  let startPage;
  let endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    if (currentPage <= halfVisiblePages) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + halfVisiblePages >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfVisiblePages;
      endPage = currentPage + halfVisiblePages;
    }
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
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
            {/* 대댓글 기능인데 현재 쓰지 않음 */}
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
                  className="btn btn-link btn-sm btn-rounded ml-auto"
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

  const renderPageNumbers = pageNumbers.map(number => (
    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
      <button className="page-link" onClick={() => paginate(number)}>
        {number}
      </button>
    </li>
  ));

  const paginate = pageNumber => {
    const newPage = pageNumber < 1 ? 1 : pageNumber > totalPages ? totalPages : pageNumber;
    setCurrentPage(newPage);
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
