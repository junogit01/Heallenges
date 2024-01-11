// // CommunitySidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CommunitysearchKeywordState } from '@recoils/Community';

function CommunitySidebar() {
  const [searchKeyword, setSearchKeyword] = useRecoilState(CommunitysearchKeywordState);

  return (
    <div className="col-lg-3">
      {/* Search widget */}
      {/* form을 쓰면 엔터가 되게 가능하고 div 쓰면 엔터 불가능 */}
      <div className="card mb-4">
        <div className="card-header">검색</div>
        <div className="card-body">
          <div action="" className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="검색할 내용을 작성해주세요"
              aria-label="Enter search term..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            {/* <button className="btn btn-primary" type="submit">
              검색
            </button> */}
          </div>
        </div>
      </div>

      {/* Categories widget */}
      <div className="card mb-4">
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
