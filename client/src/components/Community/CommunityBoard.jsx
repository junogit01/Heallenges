import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Pagination from 'react-js-pagination';
import { loginState } from '@recoils/login';
import { CommunitysearchKeywordState } from '@recoils/Community';

// 카테고리 번호를 받아와 해당 카테고리 이름을 반환하는 함수
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

// 커뮤니티 게시판 컴포넌트
const CommunityBoard = () => {
  const navigate = useNavigate();

  // 로그인이 안되면 로그인 페이지로 이동
  const loginUser = useRecoilValue(loginState);
  if (loginUser?.id === '' && loginUser?.email === '') navigate('/login');

  // Recoil 상태로부터 검색어 가져오기
  const searchKeyword = useRecoilValue(CommunitysearchKeywordState);
  // 게시물 상태 관리
  const [allPosts, setAllPosts] = useState([]);
  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 현재 페이지와 페이지 당 표시할 게시물 수 설정
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    // API 호출하여 게시물 데이터 가져오기
    const fetchAllPosts = async () => {
      try {
        // const response = await fetch('http://localhost:8001/community');
        const response = await axios.get('http://heallenges.cafe24app.com/community');
        const data = await response.json();
        setAllPosts(data.data || []);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    // 컴포넌트가 마운트될 때 한 번 실행
    fetchAllPosts();
  }, []);

  // 검색된 게시물 필터링
  // const searchallPosts = allPosts.filter(data => data?.title.toLowerCase().includes(searchKeyword.toLowerCase()));
  const searchallPosts = allPosts.filter(data => {
    const title = data?.title;
    return typeof title === 'string' && title.includes(searchKeyword);
  });

  // 카테고리 변경 핸들러
  const handleCategoryChange = category => {
    // 선택된 카테고리가 변경되면 현재 페이지를 1로 초기화
    setCurrentPage(1);
    setSelectedCategory(category === 'all' ? 'all' : parseInt(category));
  };

  // 필터된 게시물 목록
  const filteredBoardList = searchallPosts.filter(
    post => selectedCategory === 'all' || post.category === selectedCategory,
  );

  // 현재 페이지에 표시할 게시물의 범위 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = Math.max(0, indexOfLastPost - postsPerPage);
  const currentPosts = filteredBoardList.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = pageNumber => {
    const newPageNumber = Math.min(Math.max(1, pageNumber), Math.ceil(filteredBoardList.length / postsPerPage));
    setCurrentPage(newPageNumber);
  };

  // JSX 반환
  return (
    <div className="card mb-4">
      <div className="mt-3">
        {/* 게시판 제목 */}
        <h3>&nbsp;게시판 목록</h3>

        {/* 카테고리 선택 버튼들 */}
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
          {/* 현재 페이지에 표시할 게시물들 매핑 */}
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              {/* 게시물 정보 표시 */}
              <th scope="row">{indexOfFirstPost + index + 1}</th>
              <td>{getCategoryName(post.category)}</td>
              <td>
                {/* 게시물 제목에 링크 추가 */}
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
