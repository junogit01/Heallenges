import React from 'react';
import {Link} from 'react-router-dom';

const CommunityBoard = () => {
  const posts = [
    {id: 1, title: '전체 게시물 1'},
    {id: 2, title: '전체 게시물 2'},
    {id: 3, title: '전체 게시물 3'},
    // ... 여러 게시물 데이터 추가
  ];

  return (
    <div className='community-board'>
      <h3>게시판 목록</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/community/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityBoard;
