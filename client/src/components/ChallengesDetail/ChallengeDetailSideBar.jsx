import React from 'react';
import { Link, useParams } from 'react-router-dom';

function ChallengesDetailSideBar() {
  const { id } = useParams();
  return (
    <div className="col-lg-3">
      {/* Search widget */}
      <div className="card mb-4">
        <div className="card-header fs-3">검색</div>
        <div className="card-body">
          <form action="" className="input-group">
            <input type="text" className="form-control" placeholder="검색 내용" aria-label="Enter search term..." />
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
                    <Link to={`/challenges/${id}/board`}>전체 게시글</Link>
                  </h4>
                </li>
                <li>
                  <h4>
                    <Link to={`/challenges/${id}/board`}>공지사항</Link>
                  </h4>
                </li>
                <li>
                  <h4>
                    <Link to={`/challenges/${id}/board`}>자유</Link>
                  </h4>
                </li>
                <li>
                  <h4>
                    <Link to="/challenges/:id/board">인증</Link>
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
          <Link to="/community/write" className="btn btn-primary">
            게시글 작성
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChallengesDetailSideBar;
