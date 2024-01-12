import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { challengesSearchKeywordState } from '@recoils/challenge';

function ChallengesDetailSideBar() {
  const [searchKeyword, setSearchKeyword] = useRecoilState(challengesSearchKeywordState);
  const [inputsearchValue, setInputsearchValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setSearchKeyword(inputsearchValue);
    setInputsearchValue('');
  };

  const handleChange = e => {
    setInputsearchValue(e.target.value);
  };

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트 될 때 검색어 초기화
      setSearchKeyword('');
    };
  }, [setSearchKeyword]);

  const { id } = useParams();
  return (
    <div className="col-lg-3">
      {/* Search widget */}
      <div className="card mb-4">
        <div className="card-header fs-3">검색</div>
        <div className="card-body">
          <form action="" className="input-group" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="검색할 내용을 작성해주세요"
              aria-label="Enter search term..."
              value={inputsearchValue}
              onChange={handleChange}
            />
            <button className="btn btn-primary" type="submit">
              검색
            </button>
          </form>
        </div>
      </div>

      {/* Categories widget */}
      <div className="card mb-4">
        <div className="card-header fs-3">카테고리</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <ul className="list-unstyled mb-0">
                <li>
                  <h4>
                    <Link to={`/challenges/${id}`}>도전</Link>
                  </h4>
                </li>
                <li>
                  <h4>
                    <Link to={`/challenges/${id}/board`}>커뮤니티</Link>
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Side widget */}
      {/* <div className="card mb-4">
        <div className="card-header">Side Widget</div>
        <div className="card-body">
          You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5
          card component!
        </div>
      </div> */}

      {/* Write post widget */}
      <div className="card mb-4">
        <div className="card-header fs-3">글쓰기</div>
        <div className="card-body">
          <Link to={`/challenges/${id}/board/insert`} className="btn btn-primary">
            게시글 작성
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChallengesDetailSideBar;
