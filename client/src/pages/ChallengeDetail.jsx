import ChallengesDetailHead from '@components/ChallengesDetail/ChallengeDetailHead';
import ChallengesDetailBody from '@components/ChallengesDetail/ChallengesDetailBody';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ChallengesDetail() {
  const [challengeDetail, setChallengeDetail] = useState([]);
  const boardId = useParams().id;

  useEffect(() => {
    const getDetailList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8001/challenges/${boardId}`);
        setChallengeDetail(data.data[0]);
      } catch (e) {
        console.error(e);
      }
    };
    getDetailList();
  }, []);

  return (
    <>
      <ChallengesDetailHead title={challengeDetail?.title} />
      <ChallengesDetailBody data={challengeDetail} title={challengeDetail?.title} id={challengeDetail} />
    </>
  );
}

export default ChallengesDetail;
