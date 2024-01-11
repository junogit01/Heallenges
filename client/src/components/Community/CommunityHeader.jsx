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
    case 'write':
      return '글쓰기';
    case 'update':
      return '글수정';
    // 필요한 경우에 계속 추가
    default:
      return name + '번 게시물';
  }
};

function CommunityHeader() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="navbar navbar-light bg-light" style={{ height: '10.5rem' }}>
      <div className="container position-relative d-flex flex-column align-items-center">
        <h2>커뮤니티</h2>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center' }}>
          <li>
            <Link to="/">메인</Link>
          </li>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <li style={{ margin: '0 8px' }}>/</li>
              <li>
                {index === pathSegments.length - 1 ? (
                  translateToKorean(segment)
                ) : segment === 'update' && index === pathSegments.length - 2 ? (
                  translateToKorean(segment)
                ) : (
                  <Link to={`/${segment}`}>{translateToKorean(segment)}</Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CommunityHeader;
