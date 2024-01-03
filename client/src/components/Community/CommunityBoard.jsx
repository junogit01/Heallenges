import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { communityListState, communityState } from './../../recoils/Community';
import { Link } from 'react-router-dom';
import './CommunityBoard.css';

const getCategoryName = categoryNumber => {
  switch (categoryNumber) {
    case 1:
      return '공지';
    case 2:
      return '자유';
    case 3:
      return '문의';
    default:
      return '기타';
  }
};

const CommunityBoard = () => {
  const allPosts = useRecoilValue(communityListState);
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
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
  const currentPosts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

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
    <div className="community-board">
      <h3>게시판 목록</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">카테고리</th>
            <th scope="col">제목</th>
            <th scope="col">글쓴이</th>
            <th scope="col">좋아요</th>
            <th scope="col">조회수</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.게시판번호}>
              <th scope="row">{(currentPage - 1) * postsPerPage + index + 1}</th>
              <td>{getCategoryName(post.카테고리)}</td>
              <td>
                <Link to={`/board/${post.게시판번호}`}>{post.제목}</Link>
              </td>
              <td>{post.닉네임}</td>
              <td>{post.좋아요}</td>
              <td>{post.조회수}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default CommunityBoard;
