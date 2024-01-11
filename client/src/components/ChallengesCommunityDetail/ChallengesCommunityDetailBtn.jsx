import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@recoils/login';
import { useNavigate, useParams } from 'react-router-dom';
import { challengesState, challengesListSelector, challengesBoardState } from '@recoils/challenge';

function ChallengesCommunityDetailBtn() {
  const loginUser = useRecoilValue(loginState);
  const navigate = useNavigate();
  const { challengeId, id } = useParams();

  const challengesBoardDetail = useRecoilValue(challengesBoardState);
  const { getChallengeBoardDetail } = useRecoilValue(challengesListSelector);

  // const deleteEvent = useCallback(async data => {
  //   try {
  //       const resp = await deleteChallengeBoardComment(id)
  //   }
  // })

  useEffect(() => {
    async function fetchData() {
      await getChallengeBoardDetail(challengeId, id);
    }
    fetchData();
  }, [challengeId, id]);

  return (
    <div className="mb-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          <button type="button" className="btn btn-danger btn-lg" style={{ margin: '0 5px' }}>
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
