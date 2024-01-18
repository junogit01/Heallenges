// CommunityHeader

import React from 'react';

function CommunityHeader() {
  // JSX 반환
  return (
    <div className="navbar navbar-light" style={{ height: '10.5rem' }}>
      <div className="container position-relative d-flex flex-column align-items-center">
        {/* 페이지 제목 */}
        <h2>커뮤니티</h2>
      </div>
    </div>
  );
}

export default CommunityHeader;
