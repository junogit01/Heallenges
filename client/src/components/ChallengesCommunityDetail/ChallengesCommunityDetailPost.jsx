import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { challengesState, challengesListSelector, challengesBoardState } from '@recoils/challenge';
import { useParams, useNavigate } from 'react-router-dom';
import ChallengesCommunityDetailComment from './ChallengesCommunityDetailComment';
import { loginState } from '@recoils/login';
import ChallengesCommunityDetailBtn from './ChallengesCommunityDetailBtn';
import Swal from 'sweetalert2';

function ChallengesCommunityDetailPost() {
  const { challengeId, id } = useParams();
  const challengesBoardDetail = useRecoilValue(challengesBoardState);
  const { getChallengeBoardDetail } = useRecoilValue(challengesListSelector);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const loginUser = useRecoilValue(loginState);
  if (!loginUser.id && !loginUser.email) navigate('/login');

  const getPost = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await getChallengeBoardDetail(challengeId, id);
      if (!challengesBoardDetail) {
        Swal.fire({
          title: '데이터 불러오기 실패',
          text: '1초뒤 다시 접속합니다.',
          icon: 'error',
        });
        setTimeout(() => {
          window.location.replace(`/challenges/${challengeId}/board/${id}`);
        }, 1000);
      }
    } catch (error) {
      Swal.fire({
        title: '데이터 불러오기 실패',
        text: '1초뒤 다시 접속합니다.',
        icon: 'error',
      });
      setTimeout(() => {
        window.location.replace(`/challenges/${challengeId}/board/${id}`);
      }, 1000);
    }
    setIsLoading(false);
  }, [getChallengeBoardDetail]);

  useEffect(() => {
    getPost();
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    ); // 로딩 인디케이터 표시
  }

  // 조건부 렌더링을 통해 challengesBoardDetail이 존재하는 경우에만 내용을 표시합니다.
  return (
    <>
      {challengesBoardDetail && challengesBoardDetail.length > 0 && (
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-9" style={{ width: '100%' }}>
              <article>
                <header className="mb-4">
                  <h1 className="fw-bolder mb-3" style={{ wordWrap: 'break-word', wordBreak: 'keep-all' }}>
                    {challengesBoardDetail?.[0]?.title}
                  </h1>
                  <div className="text-muted fst-italic mb-2">
                    <div>
                      <h5>작성자: {challengesBoardDetail?.[0]?.name}</h5>
                      {/* {challengesBoardDetail?.[0]?.name} */}
                    </div>
                    카테고리 : {challengesBoardDetail?.[0]?.category} / 게시일: {challengesBoardDetail?.[0]?.created} /
                    조회수: {challengesBoardDetail?.[0]?.view_cnt}
                  </div>
                </header>
                {/* 이미지가 존재할 때만 렌더링 */}
                {challengesBoardDetail?.[0]?.image && (
                  <figure className="mb-4">
                    <img className="img-fluid rounded" src={challengesBoardDetail?.[0]?.image} alt="이미지 없음" />
                  </figure>
                )}

                <section
                  className="mb-5"
                  style={{
                    minHeight: '200px',
                    height: 'auto',
                    whiteSpace: 'pre-wrap', // 공백을 유지하면서 줄바꿈 허용
                    wordWrap: 'break-word', // 긴 단어를 잘라서 강제로 줄바꿈
                    wordBreak: 'keep-all',
                  }}>
                  <p className="fs-5 mb-4" style={{ overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                    {challengesBoardDetail?.[0]?.contents}
                  </p>
                </section>
              </article>
              <div className="d-flex justify-content-end">
                <table>
                  <tbody>
                    <tr>
                      <td>{challengesBoardDetail?.[0]?.category !== '인증' ? <ChallengesCommunityDetailBtn /> : ''}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card-body">
                <div className="card bg-light ">
                  <ChallengesCommunityDetailComment />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChallengesCommunityDetailPost;
