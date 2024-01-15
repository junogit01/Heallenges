// CommunitySidebar.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CommunitysearchKeywordState } from '@recoils/Community';

function CommunitySidebar() {
  // Recoil 상태를 통해 검색어와 검색어를 설정하는 함수 가져오기
  const [searchKeyword, setSearchKeyword] = useRecoilState(CommunitysearchKeywordState);
  // 로컬 상태를 통해 입력된 검색어와 검색어를 설정하는 함수 가져오기
  const [inputsearchValue, setInputsearchValue] = useState('');

  // 검색어 입력 폼 제출 핸들러
  const handleSubmit = e => {
    e.preventDefault();
    setSearchKeyword(inputsearchValue);
    setInputsearchValue('');
  };

  // 검색어 입력 변경 핸들러
  const handleChange = e => {
    setInputsearchValue(e.target.value);
  };

  // 컴포넌트가 마운트 해제될 때 실행되는 useEffect
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
