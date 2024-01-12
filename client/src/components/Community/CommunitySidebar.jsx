// // CommunitySidebar.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CommunitysearchKeywordState } from '@recoils/Community';

function CommunitySidebar({ handleCategoryChange }) {
  const [searchKeyword, setSearchKeyword] = useRecoilState(CommunitysearchKeywordState);
  // console.log('sidebar:', searchKeyword);
  // console.log(CommunitysearchKeywordState);
  const [inputsearchValue, setInputsearchValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setSearchKeyword(inputsearchValue);
    setInputsearchValue('');
  };

  const handleChange = e => {
    // console.log('handleCategoryChange called with category:', category);
    setInputsearchValue(e.target.value);
  };

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트 될 때 검색어 초기화
      setSearchKeyword('');
    };
  }, [setSearchKeyword]);

  return (
    <div className="col-lg-3">
      {/* Search widget */}
      <form className="card mb-4" onSubmit={handleSubmit}>
        <div className="card-header">검색</div>
        <div className="card-body">
          <div action="" className="input-group" onSubmit={handleSubmit}>
            <input
              type="search"
              className="form-control"
              placeholder="검색할 제목을 작성해주세요"
              aria-label="Enter search term..."
              value={inputsearchValue}
              onChange={handleChange}
            />
            <button className="btn btn-primary" type="submit">
              검색
            </button>
          </div>
        </div>
      </form>

      {/* Categories widget */}
      {/* <div className="card mb-4">
        <div className="card-header">카테고리</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <Link to="/community" className="btn btn-primary">
                    전체게시판
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/community/notice" className="btn btn-primary">
                    공지게시판
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/community/free" className="btn btn-primary">
                    자유게시판
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/community/qna" className="btn btn-primary">
                    문의게시판
                  </Link>
                </li> */}
      {/*  */}
      {/* <li className="mb-2">
                  <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange('all')}>
                    전체게시판
                  </button>
                </li>
                <li className="mb-2">
                  <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange(1)}>
                    공지게시판
                  </button>
                </li>
                <li className="mb-2">
                  <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange(2)}>
                    자유게시판
                  </button>
                </li>
                <li className="mb-2">
                  <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange(3)}>
                    문의게시판
                  </button>
                </li> */}
      {/* </ul>
            </div>
          </div>
        </div>
      </div> */}

      {/* Write post widget */}
      <div className="card mb-4">
        <div className="card-header">글쓰기</div>
        <div className="card-body">
          <Link to="/community/write" className="btn btn-primary">
            글 작성하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CommunitySidebar;
