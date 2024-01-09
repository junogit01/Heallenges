// CommunitySidebar.jsx
// CommunitySidebar.jsx
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { searchKeywordState } from '@recoils/Community';
import { useRecoilState } from 'recoil';

function CommunitySidebar() {
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);
  const [community, setCommunity] = useState({
    data: [],
  });

  const getCommunity = useCallback(async () => {
    try {
      const resp = await (searchKeyword
        ? axios.get(`http://localhost:8001/community/search?keyword=${searchKeyword}`)
        : axios.get('http://localhost:8001/community'));

      setCommunity(resp.data);
    } catch (error) {
      console.error('Error fetching rank:', error);
    }
  }, [searchKeyword]);

  const handleSearchSubmit = async event => {
    event.preventDefault();
    getCommunity(); // 이 부분이 변경되었습니다.
  };

  useEffect(() => {
    getCommunity();
  }, [getCommunity, searchKeyword]);

  return (
    <div className="col-lg-3">
      {/* Search widget */}
      <div className="card mb-4">
        <div className="card-header">검색</div>
        <div className="card-body">
          <form onSubmit={handleSearchSubmit} className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="검색할 내용을 작성해주세요"
              aria-label="Enter search term..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              검색
            </button>
          </form>
        </div>
      </div>

      {/* Categories widget */}
      <div className="card mb-4">
        <div className="card-header">카테고리</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <ul className="list-unstyled mb-0">
                <li>
                  <h4>
                    <Link to="/community">전체게시판</Link>
                  </h4>
                </li>
                <li>{/* <Link to="/community/notice">공지사항</Link> */}</li>
                <li>
                  <h4>
                    <Link to="/community/notice">공지게시판</Link>
                  </h4>
                </li>
                <li>
                  <h4>
                    <Link to="/community/free">자유게시판</Link>
                  </h4>
                </li>
                <li>
                  <h4>
                    <Link to="/community/qna">문의게시판</Link>
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
