// CommunityHeader

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CommunityHeader() {
  // 현재 페이지의 URL 정보 가져오기
  const location = useLocation();
  // URL을 '/'를 기준으로 나눈 후 빈 문자열 제거
  const pathSegments = location.pathname.split('/').filter(Boolean);

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
