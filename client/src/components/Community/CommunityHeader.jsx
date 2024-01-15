import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// 링크의 영어를 한글로 변환하는 함수
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
  // 현재 페이지의 URL 정보 가져오기
  const location = useLocation();
  // URL을 '/'를 기준으로 나눈 후 빈 문자열 제거
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // JSX 반환
  return (
    // <nav className="navbar navbar-light bg-light">
    //   <div className="container-fluid">
    //     <div className="text-center mx-auto mb-4 " style={{ width: 'fit-content' }}>
    //       <p className="navbar-brand " style={{ fontSize: '36px', justifyContent: 'center' }}>
    //         커뮤니티
    //       </p>
    //     </div>
    //   </div>
    // </nav>

    <div className="navbar navbar-light" style={{ height: '10.5rem' }}>
      <div className="container position-relative d-flex flex-column align-items-center">
        {/* 페이지 제목 */}
        <h2>커뮤니티</h2>
        {/* 경로 표시를 위한 오름차순 목록 */}
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center' }}>
          {/* 홈 링크 */}
          <li>
            <Link to="/">메인</Link>
          </li>
          {/* 경로의 각 세그먼트에 대한 목록 생성 */}
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              {/* 구분자 */}
              <li style={{ margin: '0 8px' }}>/</li>
              {/* 현재 세그먼트가 마지막이면 텍스트로 표시, 그렇지 않으면 링크 생성 */}
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
