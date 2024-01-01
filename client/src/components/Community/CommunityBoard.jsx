import React from 'react';
import { useRecoilValue } from 'recoil';
import { allPostsState } from './../../recoils/Community'; // 수정된 부분

const CommunityBoard = () => {
  const posts = useRecoilValue(allPostsState); // 수정된 부분

  return (
    <div className="community-board">
      <h3>게시판 목록</h3>
      <ol>
        {posts.map(post => (
          <li key={post.게시판번호.toString()}>
            <div>
              <strong>글쓴이:</strong> {post.닉네임}
            </div>
            <div>
              <strong>제목:</strong> {post.제목}
            </div>
            <div>
              <strong>좋아요:</strong> {post.좋아요}
            </div>
            <div>
              <strong>조회수:</strong> {post.조회수}
            </div>
            <div>
              <strong>카테고리:</strong> {getCategoryName(post.카테고리)}
            </div>
            {/* 추가적인 정보가 있다면 동일한 방식으로 표시 */}
            <div>
              <br />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

// 카테고리 번호를 카테고리 이름으로 변환하는 함수
const getCategoryName = categoryNumber => {
  switch (categoryNumber) {
    case 1:
      return '공지';
    case 2:
      return '자유';
    case 3:
      return '문의';
    default:
      // 현재 12로 되어있어서 기타로 표시
      return '기타';
  }
};

export default CommunityBoard;
