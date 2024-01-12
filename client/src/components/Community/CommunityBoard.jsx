/* eslint-disable no-undef */
import { Link } from 'react-router-dom';
import moment from 'moment';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Pagination from 'react-js-pagination';
import { communityListSelector } from '@recoils/Community';

const getCategoryName = categoryNumber => {
  // 카테고리 번호에 따라 카테고리 이름 반환
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
  // Recoil 상태로부터 전체 게시물 목록 가져오기
  const allPosts = useRecoilValue(communityListSelector);
  // console.log(allPosts);
  // console.log(allPosts.map(post => post.category));

  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 카테고리 변경 핸들러
  const handleCategoryChange = category => {
    // 선택된 카테고리가 변경되면 현재 페이지를 1로 초기화
    setCurrentPage(1);
    setSelectedCategory(category === 'all' ? 'all' : parseInt(category));
  };

  // 필터된 게시물 목록
  const filteredBoardList = allPosts.filter(post => selectedCategory === 'all' || post.category === selectedCategory);

  // 현재 페이지와 페이지 당 표시할 게시물 수 설정
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const handlePageChange = pageNumber => {
    const newPageNumber = Math.min(Math.max(1, pageNumber), Math.ceil(filteredBoardList.length / postsPerPage));
    setCurrentPage(newPageNumber);
  };

  // indexOfLastPost, indexOfFirstPost, currentPosts 계산 부분 수정
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = Math.max(0, indexOfLastPost - postsPerPage);
  const currentPosts = filteredBoardList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="card mb-4">
      <div className="mt-3">
        <h3>&nbsp;게시판 목록</h3>
        {/* 카테고리 버튼들 */}
        <div className="mb-2 d-flex justify-content-end">
          <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange('all')}>
            전체
          </button>
          <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange(1)}>
            공지
          </button>
          <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange(2)}>
            자유
          </button>
          <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange(3)}>
            문의
          </button>
        </div>
      </div>

      {/* 게시물 목록을 표시하는 테이블 */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">카테고리</th>
            <th scope="col">제목</th>
            <th scope="col">글쓴이</th>
            <th scope="col">게시일</th>
            <th scope="col">좋아요</th>
            <th scope="col">조회수</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              {/* 게시물 정보 표시 */}
              <th scope="row">{indexOfFirstPost + index + 1}</th>
              <td>{getCategoryName(post.category)}</td>
              <td>
                <Link to={`/community/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.nickname}</td>
              <td>{moment(post.created_at).format('YYYY-MM-DD')}</td>
              <td>{post.like_cnt}</td>
              <td>{post.view_cnt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <nav className="d-flex justify-content-center">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={postsPerPage}
          totalItemsCount={filteredBoardList.length}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </nav>
    </div>
  );
};

export default CommunityBoard;
