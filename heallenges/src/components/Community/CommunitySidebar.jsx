// CommunitySidebar.jsx

import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function CommunitySidebar() {
  // // 검색 결과를 저장할 상태
  // const [searchResults, setSearchResults] = useState([]);

  // // 검색어 입력 시 호출되는 함수
  // const handleSearch = (event) => {
  //   // 예제로 검색 결과를 미리 생성 (실제로는 검색 API 등을 이용하여 데이터를 가져와야 함)
  //   const searchData = [
  //     {id: 1, title: '검색 결과 1'},
  //     {id: 2, title: '검색 결과 2'},
  //     // ... 검색 결과 데이터
  //   ];

  //   // 입력된 검색어
  //   const searchTerm = event.target.value.toLowerCase();

  //   // 검색 결과 중 검색어와 일치하는 결과를 필터링
  //   const filteredResults = searchData.filter((result) =>
  //     result.title.toLowerCase().includes(searchTerm)
  //   );

  //   // 검색 결과 상태 업데이트
  //   setSearchResults(filteredResults);
  // };

  return (
    <div className='col-lg-4' data-aos='fade-up' data-aos-delay={400}>
      <div className='sidebar ps-lg-4'>
        <div className='sidebar-item search-form'>
          <h3 className='sidebar-title'>검색</h3>
          <form action='' className='mt-3'>
            <input
              type='text'
              // onChange={handleSearch}
            />
            <button type='submit'>
              <i className='bi bi-search' />
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
        <div className='sidebar-item categories'>
          <h3 className='sidebar-title'>카테고리</h3>
          <ul className='mt-3'>
            <li>
              <Link to='/community'>전체</Link>
            </li>
            <li>
              <Link to='/community/notice'>공지</Link>
            </li>
            <li>
              <Link to='/community/free'>자유</Link>
            </li>
            <li>
              <Link to='/community/qna'>질문</Link>
            </li>
          </ul>
        </div>
        {/* End sidebar categories */}
      </div>
      {/* End Blog Sidebar */}
    </div>
  );
}

export default CommunitySidebar;
