// PostItem.js

import React from 'react';
import {Link} from 'react-router-dom';

const PostItem = ({post, linkTo}) => {
  return (
    <div className='post-item'>
      {/* 제목에 대한 링크 */}
      {/* 
          지금은 제목 classname을 post-author에 있는거로 해서 일시적으로 변경
          앞으로 이 CSS 어떤식으로 할건지 팀원이랑 논의가 필요할듯 
      */}
      <div className='post-author'>
        <Link to={linkTo}>제목: {post.title}</Link>
      </div>
      {/* 작성자, 좋아요, 조회수, 댓글 수 세로 정렬 표시 */}
      {/* <div className='post-title' style={{marginTop: '5px', marginLeft: '10px'}}>
        작성자: {post.author || '익명'}
      </div>
      <div className='post-likes' style={{marginLeft: '10px'}}>
        좋아요: {post.likes || 0}
      </div>
      <div className='post-views' style={{marginLeft: '10px'}}>
        조회수: {post.views || 0}
      </div>
      <div className='post-comments' style={{marginLeft: '10px'}}>
        댓글 수: {post.comments || 0}
      </div> */}

      {/* 작성자, 좋아요, 조회수, 댓글 수 가로 정렬 표시 */}
      <div className='post-content' style={{display: 'flex', alignItems: 'center'}}>
        <div className='post-title' style={{marginRight: '10px'}}>
          작성자: {post.author || '익명'}
        </div>
        <div className='post-likes' style={{marginRight: '10px'}}>
          좋아요: {post.likes || 0}
        </div>
        <div className='post-views' style={{marginRight: '10px'}}>
          조회수: {post.views || 0}
        </div>
        <div className='post-comments'>댓글 수: {post.comments || 0}</div>
      </div>
    </div>
  );
};

export default PostItem;
