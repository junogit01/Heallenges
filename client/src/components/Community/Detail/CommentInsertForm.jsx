// CommentInsertFrom
// 댓글 입력

import React, { useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { loginState } from '@recoils/login';

function CommentInsertForm() {
  // URL 파라미터에서 게시물 ID 가져오기
  const { id } = useParams();

  // 현재 로그인된 사용자 정보 가져오기
  const loginUser = useRecoilValue(loginState);

  // React Router의 navigate 훅 사용
  const navigate = useNavigate();

  // 댓글 상태 초기화
  const [comment, setComment] = useState({
    post_id: Number(id),
    user_id: Number(loginUser.id),
    contents: '',
  });

  // 댓글 내용이 변경될 때 호출되는 함수
  const handleChange = event => {
    setComment(prevComment => ({ ...prevComment, contents: event.target.value }));
  };

  // 댓글 삽입 콜백 함수 생성
  const insertCommentCallback = useRecoilCallback(
    ({ set }) =>
      async comment => {
        try {
          // 댓글 삽입 API 호출
          const resp = await axios.post(`/community/comment`, comment);

          // 만약 댓글이 속한 게시물의 ID가 존재한다면 해당 게시물을 다시 가져오기
          if (resp.data.post_id !== undefined) {
            // await insertCommentSelector();
          }

          return resp.data;
        } catch (error) {
          // 댓글 삽입 중 에러가 발생한 경우 콘솔에 로그 출력 및 에러 전파
          console.error('Error inserting comment:', error);
          throw error;
        }
      },
    [],
  );

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      // 댓글 삽입 콜백 함수 호출
      const response = await insertCommentCallback(comment);

      // 응답이 정상적으로 처리되었다면 성공 알림 표시 및 해당 게시물 페이지로 이동
      if (response && response.status === 200) {
        // await
        Swal.fire({
          title: '댓글 입력 성공',
          text: '댓글이 성공적으로 등록되었습니다.',
          icon: 'success',
        });

        setTimeout(() => {
          window.location.replace(`/community/${id}`);
        }, 1000);
      } else {
        // 응답이 정상적으로 처리되지 않았다면 실패 알림 표시
        await Swal.fire({
          title: '댓글 입력 실패',
          text: '댓글 입력에 실패했습니다. 다시 시도해주세요.',
          icon: 'error',
        });
      }
    } catch (error) {
      // 서버로 댓글 삽입 중 에러가 발생한 경우 오류 알림 표시
      await Swal.fire({
        title: '오류 발생',
        text: '댓글 입력 중 오류가 발생했습니다. 다시 시도해주세요.',
        icon: 'error',
      });
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="mb-4"></div>
      {/* 댓글 내용을 입력하는 textarea */}
      <textarea
        className="form-control"
        rows="3"
        placeholder="댓글을 입력해주세요"
        value={comment.contents}
        onChange={handleChange}></textarea>
      {/* 댓글 입력 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button type="submit" className="btn btn-primary">
          입력
        </button>
      </div>
    </form>
  );
}

export default CommentInsertForm;
