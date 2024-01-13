/* eslint-disable camelcase */
import moment from 'moment';
import React, { useEffect } from 'react';

//
const Board = ({ user_id, title, nickname, category, view_cnt, like_cnt, created_at, contents, Image }) => {
  useEffect(() => {
    // console.log('Board 컴포넌트가 마운트되었습니다.');
  }, [user_id, title, nickname, category, view_cnt, like_cnt, created_at, contents, Image]); // 빈 배열을 두어 컴포넌트가 마운트될 때만 실행되도록 설정

  // 카테고리 값을 변경해주는 함수 / 노드(숫자) -> 프론트(한글)로 변경
  const getCategoryString = categoryNumber => {
    switch (category) {
      case 1:
        return '공지';
      case 2:
        return '자유';
      case 3:
        return '문의';
      default:
        return '자유';
    }
  };
  const categoryString = getCategoryString(category);

  return (
    // 게시물(보드)에 해당하는 내용
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-9">
          <article>
            <header className="mb-4">
              {/* 제목 */}
              <h1 className="fw-bolder mb-3">{title}</h1>
              <div className="text-muted fst-italic mb-2">
                {/* 작성자 */}
                <div>
                  <h5>작성자: {nickname || '사용자 없음'}</h5>
                </div>
                {/* 카테고리, 작성일, 조회수, 좋아요 수 표시 */}
                카테고리: {categoryString} / 게시일: {moment(created_at).format('YYYY-MM-DD HH:mm:ss')} / 조회수{' '}
                {view_cnt} / 좋아요 {like_cnt}
              </div>
            </header>
            {/* 이미지표시 / 이미지가 존재할 때만 렌더링 */}
            {Image && (
              <figure className="mb-4">
                <img className="img-fluid rounded" src={Image} alt="이미지 없음" />
              </figure>
            )}
            {/* 내용 */}
            <section className="mb-5" style={{ minHeight: '100px', height: 'auto', overflow: 'hidden' }}>
              <p className="fs-5 mb-4" style={{ whiteSpace: 'pre' }}>
                {contents || '내용 없음'}2
              </p>
            </section>
          </article>
          <div className="card-body"></div>
        </div>
      </div>
    </div>
  );
};

export default Board;
