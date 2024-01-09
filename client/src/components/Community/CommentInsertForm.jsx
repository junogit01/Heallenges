import React, { useState } from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';

import { loginState } from '@recoils/login';
import { communityListSelector } from '@recoils/Community';

function CommentInsertForm() {
  const { id } = useParams();
  const loginUser = useRecoilValue(loginState);
  const navigate = useNavigate();

  // console.log('Current ID:', id); // 게시물 id
  // console.log('Current ID:', loginUser.id); // 유저 id

  const insertComment = useRecoilValue(communityListSelector).insertComment;

  const [comment, setComment] = useState({
    post_id: Number(id),
    user_id: Number(loginUser.id),
    contents: '',
  });

  const handleChange = event => {
    setComment(prevComment => ({ ...prevComment, contents: event.target.value }));
  };

  const handleSubmit = useRecoilCallback(
    ({ set }) =>
      async event => {
        event.preventDefault();

        try {
          // console.log('댓글 전송 데이터:', comment);
          const response = await insertComment(comment);
          // console.log('댓글이 성공적으로 제출되었습니다.', response);
          // console.log('try문 안에 확인', comment);

          // 응답이 정상적으로 받아와졌을 때 처리
          // if (response && response.status === 200) {
          //   console.log('댓글 등록 성공:', response.message);

          //   // 원하는 작업 수행
          // } else {
          //   console.log('댓글 등록 실패:', response.message);
          //   // 실패한 경우에 대한 처리
          // }
          // /posts/${id}
          navigate(`/community/${id}`, { replace: true });
        } catch (error) {
          console.error('댓글 제출 중 오류:', error);
          if (error.response) {
            // 서버 응답이 있을 경우 응답 내용을 출력
            console.error('Server Response:', error.response.data);
          }
        }
      },
    [comment, insertComment],
  );

  return (
    <form className="mb-4" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="mb-4"></div>
      <textarea
        className="form-control"
        rows="3"
        placeholder="댓글을 입력해주세요"
        value={comment.contents}
        onChange={handleChange}></textarea>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button type="submit" className="btn btn-primary">
          입력
        </button>
      </div>
    </form>
  );
}

export default CommentInsertForm;
