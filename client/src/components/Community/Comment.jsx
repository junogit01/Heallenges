import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { loginState } from '@recoils/login';
import { communityCommentState } from '@recoils/Community';

const Comment = ({ comments }) => {
  const { id } = useParams();
  const loginUser = useRecoilValue(loginState);

  const isCommentOwner = comment => loginUser.id === comment.user_id;

  const deleteComment = useRecoilCallback(({ set }) => async commentId => {
    try {
      await axios.delete(`http://localhost:8001/community/comment/${commentId}`);

      const updatedComments = comments.filter(comment => comment.comment_id !== commentId);
      set(communityCommentState, updatedComments);

      Swal.fire({
        title: '댓글 삭제',
        text: '댓글이 성공적으로 삭제되었습니다.',
        icon: 'success',
      });
      window.location.replace(`/community/${id}`);
    } catch (error) {
      Swal.fire({
        title: '댓글 삭제 실패',
        text: '댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
        icon: 'error',
      });
    }
  });

  const handleDeleteComment = commentId => {
    deleteComment(commentId);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const totalComments = comments.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [comments, setCurrentPage]);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  return (
    <div>
      {currentComments.map((comment, index) => (
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
                    {comment.create_date
                      ? moment(comment.create_date).format('YYYY년 MM월 DD일 HH:mm:ss')
                      : '날짜 없음'}
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
      ))}
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
          linkClass="page-link custom-pagination-button" // 새로운 클래스 추가
        />
      </div>
    </div>
  );
};

export default Comment;
