// CommunityBoard.js

import React from 'react';
import PostItem from './PostItem';

const CommunityBoard = ({posts}) => {
  const uniquePosts = removeDuplicateIds(posts);

  return (
    <div className='community-board'>
      <h3>게시판 목록</h3>
      <ol>
        {uniquePosts.map((post) => (
          <li key={post.id}>
            {/* PostItem 컴포넌트 내에 Link를 추가하고, 링크는 제목에만 걸도록 수정 */}
            <PostItem post={post} linkTo={`/community/board/${post.id}`} />
          </li>
        ))}
      </ol>
    </div>
  );
};

const removeDuplicateIds = (posts) => {
  const uniqueIds = new Set();
  return posts.filter((post) => {
    if (!uniqueIds.has(post.id)) {
      uniqueIds.add(post.id);
      return true;
    }
    return false;
  });
};

export default CommunityBoard;
