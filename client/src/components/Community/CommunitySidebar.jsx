// CommunitySidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function CommunitySidebar() {
  return (
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay={400}>
      <div className="sidebar ps-lg-4">
        <div className="sidebar-item search-form">
          <h3 className="sidebar-title">검색</h3>
          <form action="" className="mt-3">
            <input
              type="text"
              // onChange={handleSearch}
            />
            <button type="submit">
              <i className="bi bi-search" />
            </button>
          </form>
        </div>
        {/* 검색 결과를 표시하는 부분 */}
        {/* <div className='sidebar-item search-results'>
          <h3 className='sidebar-title'>검색 결과</h3>
          <ul className='mt-3'>
            {searchResults.map((result) => (
              <li key={result.id}>
                <Link to={`/community/post/${result.id}`}>{result.title}</Link>
              </li>
            ))}
          </ul>
        </div> */}
        {/* End 검색 결과 */}
        {/* 나머지 사이드바 내용 추가 */}
        <div className="sidebar-item categories">
          <h3 className="sidebar-title">카테고리</h3>
          <ul className="mt-3">
            <div>
              <Link to="/community">전체게시판</Link>
            </div>
            <div>{/* <Link to="/community/notice">공지사항</Link> */}</div>
            <div>
              <Link to="/community/notice">공지게시판</Link>
            </div>
            <div>
              <Link to="/community/free">자유게시판</Link>
            </div>
            <div>
              <Link to="/community/qna">문의게시판</Link>
            </div>
            <div>{/* <Link to="/community/qna">QNA</Link> */}</div>
          </ul>
        </div>
        {/* End sidebar categories */}
        <div className="sidebar-item write-post">
          <h3 className="sidebar-title">글쓰기</h3>
          <Link to="/community/write" className="btn btn-primary mt-3">
            새 글 작성
          </Link>
        </div>
      </div>
      {/* End Blog Sidebar */}
    </div>
  );
}

export default CommunitySidebar;
