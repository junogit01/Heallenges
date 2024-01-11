import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
  challengesListSelector,
  challengesBoardCommentState,
  challengesBoardState,
  deleteChallengeBoardComment,
} from '@recoils/challenge';
import { userState } from '@recoils/users';
import Pagination from 'react-js-pagination';
import one from './Paging.module.css';
import { loginState } from '@recoils/login';

function ChallengesCommunityDetailComment() {
  const { challengeId, id } = useParams();
  const navigate = useNavigate();
  const loginUser = useRecoilValue(loginState);
  const board = useRecoilValue(challengesBoardState);
  const commentList = useRecoilValue(challengesBoardCommentState);

  const { insertChallengeBoardComment, getChallengeBoardDetail, deleteChallengeBoardComment } =
    useRecoilValue(challengesListSelector);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      post_id: board[0].id,
      user_id: loginUser.id,
      contents: '',
    },
  });

  const submitEvent = useCallback(
    async data => {
      try {
        const resp = await insertChallengeBoardComment(challengeId, id, data);
        if (resp.data.status === '200') {
          navigate('/');
        }
      } catch (error) {
        window.location.replace(`/challenges/${challengeId}/board/${id}`);
      }
    },
    [challengeId, id, insertChallengeBoardComment, navigate],
  );

  const deleteEvent = useCallback(async data => {
    try {
      const resp = await deleteChallengeBoardComment(challengeId, id, data);
      window.location.replace(`/challenges/${challengeId}/board/${id}`);
    } catch (error) {
      Swal.fire({
        title: '댓글 삭제 중 에러 발생',
        text: '다시 시도해주십시오',
        icon: 'error',
      });
    }
  });

  useEffect(() => {
    getChallengeBoardDetail(challengeId, id);
  }, [challengeId, id, getChallengeBoardDetail]);

  const errorEvent = error => {
    Swal.fire({
      title: '댓글 작성 중 에러 발생',
      text: '다시 시도해주십시오',
      icon: 'error',
    });
  };
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 항목 수
  const totalItems = commentList.length; // 총 항목 수

  const handlePageChange = page => {
    setPage(page);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComments = commentList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="card bg-light">
      <div className="card-body">
        <form
          className="mb-4"
          onSubmit={handleSubmit(submitEvent, errorEvent)}
          style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="mb-2"></div>
          <textarea
            className="form-control"
            rows="3"
            placeholder="댓글을 입력해주세요"
            name="contents"
            id="contents"
            {...register('contents', {
              required: {
                value: true,
                message: '내용을 입력해주세요.',
              },
            })}></textarea>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit" className="btn btn-primary">
              입력
            </button>
          </div>
        </form>
        <div className="d-flex align-items-start flex-column">
          {currentComments?.map((data, index) => (
            <>
              <div className="flex-shrink-0 d-flex flex-row" style={{ width: '650px' }} key={data?.id}>
                <img
                  className="rounded-circle"
                  src={data?.profile_image}
                  alt="사진"
                  style={{ maxHeight: '50px', maxWidth: '50px', marginRight: '1rem' }}
                />
                <div className="ms-3">
                  <div className="fw-bold">{data?.nickname || '사용자 없음'}</div>
                  <p>{data?.contents}</p>
                  <div className="mt-3 d-flex flex-row">
                    <p>{data?.created}</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ marginLeft: '20px', height: '30px' }}
                      onClick={() => deleteEvent(data?.id)}>
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        {/* 페이지네이션 컴포넌트 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalItems}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
            innerClass={one.pagination}
          />
        </div>
      </div>
    </div>
  );
}

export default ChallengesCommunityDetailComment;
