import ChallengesDetailHead from '@components/ChallengesDetail/ChallengeDetailHead';
import ChallengesDetailBody from '@components/ChallengesDetail/ChallengesDetailBody';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '@recoils/login';

function ChallengesDetail() {
  const [challengeDetail, setChallengeDetail] = useState([]);
  const [participants, setParticipants] = useState(0);
  const [isParticipated, setIsParticipated] = useState('ture'); // 추가: 참가 여부 상태
  const user = useRecoilValue(loginState);
  const userId = user.id;
  const boardId = useParams().id;

  useEffect(() => {
    const getDetailList = async () => {
      try {
        const { data } = await axios.get(`/challenges/${boardId}`);
        setChallengeDetail(data.data[0]);
        setParticipants(data.count[0].participant_count);
        // 추가: '/challenges/check' 라우트를 통해 참가 여부 확인
        const checkResponse = await axios.get(`/challenges/check?userId=${userId}&challengeId=${boardId}`);
        const checkData = checkResponse.data.data;
        setIsParticipated(checkData > 0);
      } catch (e) {
        console.error(e);
      }
    };
    getDetailList();
  }, []);
  return (
    <>
      <ChallengesDetailHead title={challengeDetail?.title} />
      <ChallengesDetailBody
        data={challengeDetail}
        title={challengeDetail?.title}
        id={challengeDetail}
        count={participants}
        isParticipated={isParticipated}
        type={challengeDetail}
      />
    </>
  );
}

export default ChallengesDetail;
