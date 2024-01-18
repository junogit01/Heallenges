import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@recoils/login';
import { useNavigate, useParams } from 'react-router-dom';
import { challengesState, challengesListSelector, challengesBoardState } from '@recoils/challenge';
import Swal from 'sweetalert2';

function ChallengesCommunityDetailBtn() {
  const loginUser = useRecoilValue(loginState);
  const navigate = useNavigate();
  const { challengeId, id } = useParams();

  const challengesBoardDetail = useRecoilValue(challengesBoardState);
  const { getChallengeBoardDetail, deleteChallengeBoard } = useRecoilValue(challengesListSelector);

  const deleteEvent = useCallback(async () => {
    Swal.fire({
      title: '게시글을 삭제하시겠습니까??',
      text: '',
      icon: 'warning',

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(async result => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        try {
          await deleteChallengeBoard(challengeId, id);
          navigate(`/challenges/${challengeId}/board`);
        } catch (error) {
          console.error(error.message);
        }
      }
    });
  }, [challengeId, id]);

  useEffect(() => {
    async function fetchData() {
      await getChallengeBoardDetail(challengeId, id);
    }
    fetchData();
  }, [challengeId, id]);

  return (
    <div className="mb-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        style={{ margin: '0 5px' }}
        onClick={() => navigate(`/challenges/${challengeId}/board`)}>
        목록
      </button>
      {/* 유저아이디와 게시물의 유저 아이디가 같은지 확인 후 수정 삭제 버튼 활성화 여부 결정 */}
      {loginUser?.id === challengesBoardDetail[0]?.user_id ? (
        <>
          <button
            type="button"
            className="btn btn-warning btn-lg"
            style={{ margin: '0 5px' }}
            onClick={() => navigate(`/challenges/${challengeId}/board/${id}/update`)}>
            수정
          </button>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            style={{ margin: '0 5px' }}
            onClick={() => deleteEvent(challengeId, id)}>
            삭제
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default ChallengesCommunityDetailBtn;
