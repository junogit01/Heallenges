import React, { useState } from 'react';
import moment from 'moment';

const Comment = ({ comments }) => {
  const commentsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / commentsPerPage);
  const maxVisiblePages = 10;
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
    <div key={`comment-${index + 1}`} className="d-flex align-items-start mb-4">
      <div className="comment-img">
        <img
          src="/images/blog/comments-1.jpg"
          alt=""
          style={{ maxHeight: '5rem', maxWidth: '5rem', marginRight: '1rem' }}
        />
      </div>
      <div className="d-flex flex-column">
        <h5>
          <p>{comment.nickname || '사용자 없음'}</p>
        </h5>
        <time dateTime={comment.create_date ? moment(comment.create_date).format('YYYY-MM-DD HH:mm:ss') : ''}>
          {comment.create_date ? moment(comment.create_date).format('DD MMM, YYYY HH:mm:ss') : '날짜 없음'}
        </time>
      </div>
      <button type="button" className="btn btn-link btn-sm btn-rounded ml-auto">
        삭제
      </button>
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
      {/* Pagination */}
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
