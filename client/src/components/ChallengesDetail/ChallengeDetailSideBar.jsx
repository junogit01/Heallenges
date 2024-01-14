import React from 'react';
import { Link } from 'react-router-dom';

function ChallengesDetailSideBar() {
  return (
    <div className="col-lg-3">
      {/* Categories widget */}
      <div className="card mb-4">
        <div className="card-header fs-3">챌린지 커뮤니티</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <ul className="list-unstyled mb-0">
                <li>
                  <h4>
                    <Link to="/challenges/:id/board">전체 게시글</Link>
                  </h4>
                </li>
                <li>
                  <h4>
                    <Link to="/challenges/:id/board">공지사항</Link>
                  </h4>
                </li>
                <li>
                  <h4>
                    <Link to="/challenges/:id/board">자유</Link>
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

      {/* Write post widget */}
      <div className="card mb-4">
        <div className="card-header fs-3">글작성</div>
        <div className="card-body">
          <Link to="/community/write" className="btn btn-primary">
            글작성
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChallengesDetailSideBar;
