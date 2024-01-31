import React, { useEffect, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { challengesListSelector, challengesBoardState, challengesState } from '@recoils/challenge';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { loginState } from '@recoils/login';

function ChallengesCommunityInsertBody() {
  // url에서 파라미터 수집
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Recoil을 통해 상태 가져오기
  const challengesBoard = useRecoilValue(challengesState);
  const { getChallengeDetail, getChallengeBoardDetail } = useRecoilValue(challengesListSelector);

  // 로그인 정보 가져와 로그인하지 않은 경우 로그인 페이지로 리다이렉트.
  const loginUser = useRecoilValue(loginState);
  if (!loginUser.id && !loginUser.email) navigate('/login');

  // React-hook-form을 이용한  폼 상태 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      contents: '',
      user_id: loginUser.id,
      challenge_id: challengeId,
      id: challengeId,
    },
    mode: 'onBlur',
  });

  const submitEvent = useCallback(
    async data => {
      try {
        // 관리자 확인
        if (data.category === '공지사항' && loginUser.id !== challengesBoard[0]?.host_id) {
          Swal.fire({
            title: '권한 없음',
            text: '공지 게시판 글은 관리자만 작성할 수 있습니다.',
            icon: 'error',
          });
          return;
        }
        if (data.category === '인증' && data.image.length > 0) {
          Swal.fire({
            title: '포인트가 적립되었습니다.',
            text: '마이페이지에서 확인해주세요.',
            icon: 'success',
          });
        } else if (data.category === '인증' && data.image.length === 0) {
          Swal.fire({
            title: '포인트가 적립되지 않았습니다.',
            text: '인증샷을 첨부해주세요.',
            icon: 'warning',
          });
          return;
        }
        // 파일 업로드를 위해 formData로 변경
        const formData = new FormData();

        // 파일 업로드를 위한 file 필드는 react-hook-form 이 값을 객체로 가져오기 때문에 업로드 파일 처리를 할 수 없어 따로 추출함
        const files = document.querySelector('input[name="image"]').files;
        formData.append('data', JSON.stringify(data));
        formData.append('image', files[0]);

        // 이 값을 서버에 전송한다. 이미지 업로드가 있어서 headers에 { "Content-type": "multipart/form-data" }를 지정
        // 만약 이미지 업로드가 없다면 headers 필요없고 formData로 변환할 필요없이 바로 매개변수로 받은 data를 바로 전송하면 된다
        const resp = await axios({
          method: 'POST',
          url: `/challenges/${challengeId}/board`,
          headers: { 'Content-type': 'multipart/form-data' },
          data: formData,
        });
        if (resp.data.status === 501) {
          Swal.fire({
            title: '게시글 작성 오류', // Alert 제목
            text: '다시 시도해주십시오.', // Alert 내용
            icon: 'error', // Alert 타입
          });
        } else if (resp.data.status === 502 || resp.data.status === 503) {
          Swal.fire({
            title: '게시글 처리 중 에러 발생', // Alert 제목
            text: '다시 입력해주십시오', // Alert 내용
            icon: 'error', // Alert 타입
          });
        }
        // insertId를 통해 작성한 게시글로 이동
        navigate(`/challenges/${challengeId}/board/${resp?.data?.data?.insertId}`);
      } catch (error) {
        console.error(error);
      }
    },
    [navigate],
  );
  const errorEvent = error => console.error(error);

  const getParticipants = useCallback(async () => {
    setIsLoading(true);
    try {
      const participantsResponse = await axios.get(`/challenges/${challengeId}/participants`);
      const participantsData = participantsResponse?.data?.data;
      if (!participantsData?.includes(loginUser.id)) {
        Swal.fire({
          title: '도전 참가 후 작성하실 수 있습니다.',
          text: ' ',
          icon: 'error',
        });
        navigate(`/challenges/${challengeId}`);
      }
    } catch (error) {
      Swal.fire({
        title: '데이터 불러오기 실패',
        text: '다시 접속해주세요.',
        icon: 'error',
      });
      navigate(`/challenges/${challengeId}`);
    }
    setIsLoading(false);
  }, [challengeId, loginUser.id]);

  useEffect(() => {
    getParticipants();
  }, [getParticipants]);

  useEffect(() => {
    getChallengeDetail(challengeId);
  }, [challengeId]);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    ); // 로딩 인디케이터 표시
  }

  return (
    <section className="property-grid grid">
      <div className="container">
        <div className="row">
          <form className="col-sm-12" onSubmit={handleSubmit(submitEvent, errorEvent)}>
            <table className="table">
              <tbody>
                <tr>
                  <td>제목</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      {...register('title', {
                        required: {
                          value: true,
                          message: '제목을 입력해주세요',
                        },
                        pattern: {
                          value: /^.{1,50}$/,
                          message: '50자이상 입력이 불가합니다.',
                        },
                      })}
                    />
                    <input type="hidden" value={challengeId} {...register('id')} />
                    <span style={{ color: 'orange' }} className="fs-5">
                      {errors.title?.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>카테고리</td>
                  <td>
                    <select
                      className="form-select"
                      {...register('category', {
                        required: {
                          value: true,
                          message: '카테고리를 선택해주세요',
                        },
                      })}
                      defaultValue="자유">
                      <option value="">카테고리 선택</option>
                      <option value="공지사항">공지사항</option>
                      <option value="자유">자유</option>
                      <option value="인증">인증</option>
                    </select>
                    <span style={{ color: 'orange' }} className="fs-5">
                      {errors.category?.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>내용</td>
                  <td>
                    <textarea
                      cols="80"
                      rows="10"
                      className="form-control"
                      {...register('contents', {
                        required: {
                          value: true,
                          message: '내용을 입력해주세요',
                        },
                      })}></textarea>
                    <span style={{ color: 'orange' }} className="fs-5">
                      {errors.contents?.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>이미지 첨부</td>
                  <td>
                    <input type="file" className="form-control" {...register('image')} />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="text-end">
                    <button type="submit" className="btn btn-outline-secondary">
                      입력
                    </button>{' '}
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate(`/challenges/${challengeId}/board`)}>
                      취소
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ChallengesCommunityInsertBody;
