import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// 영어를 한글로 변환하는 함수
const translateToKorean = name => {
  switch (name) {
    case 'community':
      return '커뮤니티';
    case 'free':
      return '자유';
    case 'notice':
      return '공지';
    case 'qna':
      return '질문';
    // 필요한 경우에 계속 추가
    default:
      return name;
  }
};

function CommunityHeader() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div
      className="breadcrumbs d-flex align-items-center"
      style={{ backgroundImage: 'url("assets/img/blog-header.jpg")' }}>
      <div className="container position-relative d-flex flex-column align-items-center">
        <h2>커뮤니티</h2>
        <ol>
          <li>
            <Link to="/">메인</Link>
          </li>
          {pathSegments.map((segment, index) => (
            <li key={index}>
              {index === pathSegments.length - 1 ? (
                translateToKorean(segment) // 마지막 요소인 경우 일반 텍스트로 표시
              ) : (
                <Link to={`/${segment}`}>{translateToKorean(segment)}</Link> // 그 외의 경우 링크로 표시
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CommunityHeader;
