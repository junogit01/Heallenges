/* eslint-disable no-undef */
import { Link } from 'react-router-dom';
import moment from 'moment';
import React, { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { CommunitysearchKeywordState } from '@recoils/Community';
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
  const searchKeyword = useRecoilValue(CommunitysearchKeywordState);

  const [communitySearch, setCommunitySearch] = useState({
    data: [],
  });

  // 검색
  const getCommunitySearch = useCallback(async () => {
    try {
      const resp = await (searchKeyword
        ? axios.get('http://localhost:8001/community/search', { params: { keyword: searchKeyword } })
        : axios.get('http://localhost:8001/community'));
      setCommunitySearch(resp.data);
    } catch (error) {
      console.error('Error fetching rank:', error);
    }
  }, [searchKeyword]);

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearchButtonClick = () => {
    getCommunitySearch(); // 검색 결과를 가져오는 함수 호출
  };

  // 검색 결과를 사용하여 목록을 필터링
  const filteredPosts = communitySearch.data.length > 0 ? communitySearch.data : allPosts;

  // 현재 페이지와 페이지 당 표시할 게시물 수 설정
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const maxVisiblePages = 10;

  let startPage;
  let endPage;

  // 추가 코드: allPosts가 배열이 아니거나 비어있으면 오류 출력
  if (!Array.isArray(allPosts) || allPosts.length === 0) {
    // console.error('allPosts가 유효한 배열이 아닙니다.');
    return null;
  }

  // 페이지 수에 따라 시작 페이지와 끝 페이지 계산
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
      startPage = currentPage - halfVisiblePages + 1;
      endPage = currentPage + halfVisiblePages;
    }
  }

  // 페이지 번호 배열 생성
  // pagenumshow 없으면 NaN 10개 나옴 있어야 1~10 표시됨
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (pagenumshow, index) => startPage + index);
  const currentPosts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  // 페이지 번호를 렌더링하는 함수
  const renderPageNumbers = pageNumbers.map(number => (
    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
      <button className="page-link" onClick={() => paginate(number)}>
        {number}
      </button>
    </li>
  ));

  // 페이지 변경 함수
  const paginate = pageNumber => {
    const newPage = pageNumber < 1 ? 1 : pageNumber > totalPages ? totalPages : pageNumber;
    setCurrentPage(newPage);
  };

  return (
    <div className="card mb-4">
      <div className="mt-3">
        <h3>&nbsp;게시판 목록</h3>
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
              <th scope="row">{(currentPage - 1) * postsPerPage + index + 1}</th>
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
        <ul className="pagination">
          {/* 처음 페이지로 이동하는 버튼 */}
          <li className="page-item">
            <button className="page-link" onClick={() => paginate(1)}>
              처음
            </button>
          </li>
          {/* 이전 페이지로 이동하는 버튼 */}
          {currentPage > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => paginate(currentPage - 10 < 1 ? 1 : currentPage - 10)}>
                이전
              </button>
            </li>
          )}
          {/* 페이지 번호 표시 */}
          {renderPageNumbers}
          {/* 다음 페이지로 이동하는 버튼 */}
          {currentPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 10 > totalPages ? totalPages : currentPage + 10)}>
                다음
              </button>
            </li>
          )}
          {/* 마지막 페이지로 이동하는 버튼 */}
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
