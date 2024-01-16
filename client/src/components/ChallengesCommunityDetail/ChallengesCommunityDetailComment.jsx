// import React, { useCallback, useEffect, useState } from 'react';
// import { useRecoilValue, useRecoilCallback } from 'recoil';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import {
//   challengesListSelector,
//   challengesBoardCommentState,
//   challengesBoardState,
//   deleteChallengeBoardComment,
// } from '@recoils/challenge';
// import Pagination from 'react-js-pagination';
// import one from './Paging.module.css';
// import { loginState } from '@recoils/login';

// function ChallengesCommunityDetailComment() {
//   const { challengeId, id } = useParams();
//   const navigate = useNavigate();
//   const loginUser = useRecoilValue(loginState);
//   const board = useRecoilValue(challengesBoardState);
//   const commentList = useRecoilValue(challengesBoardCommentState);

//   console.log(commentList);
//   const { insertChallengeBoardComment, getChallengeBoardDetail, deleteChallengeBoardComment } =
//     useRecoilValue(challengesListSelector);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       post_id: board[0].id,
//       user_id: loginUser.id,
//       contents: '',
//     },
//   });

//   const submitEvent = useCallback(
//     async data => {
//       try {
//         const resp = await insertChallengeBoardComment(challengeId, id, data);
//         setTimeout(function () {
//           window.location.replace(`/challenges/${challengeId}/board/${id}`);
//         }, 1000);
//       } catch (error) {
//         window.location.replace(`/challenges/${challengeId}/board/${id}`);
//       }
//     },
//     [challengeId, id, insertChallengeBoardComment],
//   );

//   const deleteEvent = useCallback(
//     async data => {
//       try {
//         const resp = await deleteChallengeBoardComment(challengeId, id, data);
//         setTimeout(function () {
//           window.location.replace(`/challenges/${challengeId}/board/${id}`);
//         }, 1000);
//       } catch (error) {
//         Swal.fire({
//           title: '댓글 삭제 중 에러 발생',
//           text: '다시 시도해주십시오',
//           icon: 'error',
//         });
//       }
//     },
//     [challengeId, id, deleteChallengeBoardComment],
//   );

//   useEffect(() => {
//     getChallengeBoardDetail(challengeId, id);
//   }, [challengeId, id, getChallengeBoardDetail]);

//   const errorEvent = error => {
//     Swal.fire({
//       title: '댓글 작성 중 에러 발생',
//       text: '다시 시도해주십시오',
//       icon: 'error',
//     });
//   };
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5; // 페이지당 항목 수
//   const totalItems = commentList.length; // 총 항목 수

//   const handlePageChange = page => {
//     setPage(page);
//   };

//   const indexOfLastItem = page * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentComments = commentList.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="card bg-light">
//       <div className="card-body">
//         <form
//           className="mb-4"
//           onSubmit={handleSubmit(submitEvent, errorEvent)}
//           style={{ display: 'flex', flexDirection: 'column' }}>
//           <div className="mb-2"></div>
//           <textarea
//             className="form-control"
//             rows="3"
//             placeholder="댓글을 입력해주세요"
//             name="contents"
//             id="contents"
//             {...register('contents', {
//               required: {
//                 value: true,
//                 message: '내용을 입력해주세요.',
//               },
//             })}></textarea>
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
//             <button type="submit" className="btn btn-primary">
//               입력
//             </button>
//           </div>
//         </form>
//         <div className="d-flex align-items-start flex-column">
//           {currentComments?.map((data, index) => (
//             <>
//               <div className="flex-shrink-0 d-flex flex-row" style={{ width: '650px' }} key={data?.id}>
//                 <img
//                   className="rounded-circle"
//                   src={data?.profile_image}
//                   alt="사진"
//                   style={{ maxHeight: '50px', maxWidth: '50px', marginRight: '1rem' }}
//                 />
//                 <div className="ms-3">
//                   <div className="fw-bold">{data?.nickname || '사용자 없음'}</div>
//                   <p style={{ whiteSpace: 'pre-wrap' }}>{data?.contents}</p>
//                   <div className="mt-3 d-flex flex-row">
//                     <p>{data?.created}</p>
//                     {loginUser.id === data.user_id ? (
//                       <button
//                         type="button"
//                         className="btn btn-primary btn-sm"
//                         style={{ marginLeft: '20px', height: '30px' }}
//                         onClick={() => deleteEvent(data?.id)}>
//                         삭제
//                       </button>
//                     ) : (
//                       ''
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </>
//           ))}
//         </div>
//         {/* 페이지네이션 컴포넌트 */}
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <Pagination
//             activePage={page}
//             itemsCountPerPage={10}
//             totalItemsCount={totalItems}
//             pageRangeDisplayed={5}
//             prevPageText="‹"
//             nextPageText="›"
//             onChange={handlePageChange}
//             innerClass={one.pagination}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChallengesCommunityDetailComment;

import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { challengesListSelector, challengesBoardCommentState, challengesBoardState } from '@recoils/challenge';
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
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComments = commentList.slice(indexOfFirstItem, indexOfLastItem);
  const [comments, setComments] = useRecoilState(challengesBoardCommentState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      post_id: board[0]?.id,
      user_id: loginUser?.id,
      contents: '',
    },
  });

  // const submitEvent = useCallback(
  //   async data => {
  //     try {
  //       await insertChallengeBoardComment(challengeId, id, data);
  //       navigate(`/challenges/${challengeId}/board/${id}`);
  //     } catch (error) {
  //       navigate(`/challenges/${challengeId}/board/${id}`);
  //     }
  //   },
  //   [challengeId, id, insertChallengeBoardComment, navigate],
  // );
  const submitEvent = useCallback(
    async data => {
      try {
        const newComment = await insertChallengeBoardComment(challengeId, id, data);
        window.location.reload([true]);
      } catch (error) {
        Swal.fire({
          title: '댓글 작성 중 에러 발생',
          text: '다시 시도해주십시오',
          icon: 'error',
        });
      }
    },
    [challengeId, id, insertChallengeBoardComment, setComments],
  );

  const deleteEvent = useCallback(
    async commentId => {
      try {
        await deleteChallengeBoardComment(challengeId, id, commentId);
        window.location.reload([true]);
      } catch (error) {
        Swal.fire({
          title: '댓글 삭제 중 에러 발생',
          text: '다시 시도해주십시오',
          icon: 'error',
        });
      }
    },
    [challengeId, id, deleteChallengeBoardComment, navigate],
  );

  useEffect(() => {
    getChallengeBoardDetail(challengeId, id);
  }, [challengeId, id, getChallengeBoardDetail]);

  const handlePageChange = page => {
    setPage(page);
  };

  return (
    <div className="card bg-light">
      <div className="card-body">
        {/* Comment form */}
        <form
          className="mb-4"
          onSubmit={handleSubmit(submitEvent)}
          style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea
            className="form-control"
            rows="3"
            placeholder="댓글을 입력해주세요"
            {...register('contents', {
              required: '내용을 입력해주세요.',
            })}></textarea>
          {errors.contents && <p className="text-danger">{errors.contents.message}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit" className="btn btn-primary">
              입력
            </button>
          </div>
        </form>

        {/* Comments display */}
        <div className="d-flex align-items-start flex-column">
          {currentComments?.map(data => (
            <div className="flex-shrink-0 d-flex flex-row" style={{ width: '650px' }} key={data?.id}>
              <img
                className="rounded-circle"
                src={data?.profile_image}
                alt="사진"
                style={{ maxHeight: '50px', maxWidth: '50px', marginRight: '1rem' }}
              />
              <div className="ms-3">
                <div className="fw-bold">{data?.nickname || '사용자 없음'}</div>
                <p style={{ whiteSpace: 'pre-wrap' }}>{data?.contents}</p>
                <div className="mt-3 d-flex flex-row">
                  <p>{data?.created}</p>
                  {loginUser.id === data.user_id && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ marginLeft: '20px', height: '30px' }}
                      onClick={() => deleteEvent(data?.id)}>
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={commentList.length}
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
