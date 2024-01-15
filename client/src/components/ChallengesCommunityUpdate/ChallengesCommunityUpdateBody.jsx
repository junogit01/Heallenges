import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { loginState } from '@recoils/login';
import { useRecoilValue } from 'recoil';
import { challengesListSelector, challengesBoardState } from '@recoils/challenge';
import { useForm } from 'react-hook-form';

function ChallengesCommunityUpdateBody() {
  const loginUser = useRecoilValue(loginState);
  const { challengeId, id } = useParams();
  const navigate = useNavigate();
  if (!loginUser.id && !loginUser.email) navigate('/login');

  const challengesBoard = useRecoilValue(challengesBoardState);
  const { getChallengeDetail, getChallengeBoardDetail } = useRecoilValue(challengesListSelector);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      contents: '',
      id: id,
      challenge_id: challengeId,
    },
    mode: 'onBlur',
  });

  const submitEvent = useCallback(
    async data => {
      try {
        // 저는 파일 업로드를 위해 formData로 변경했습니다
        const formData = new FormData();

        // 파일 업로드를 위한 file 필드는 react-hook-form 이 값을 객체로 가져오기 때문에 업로드 파일 처리를 할 수 없어 따로 추출함
        const files = document.querySelector('input[name="image"]').files;
        formData.append('data', JSON.stringify(data));
        formData.append('image', files[0]);

        // 이 값을 서버에 전송한다. 이미지 업로드가 있어서 headers에 { "Content-type": "multipart/form-data" }를 지정
        // 만약 이미지 업로드가 없다면 headers 필요없고 formData로 변환할 필요없이 바로 매개변수로 받은 data를 바로 전송하면 된다
        const resp = await axios({
          method: 'put',
          url: `/challenges/${challengeId}/board/${id}`,
          headers: { 'Content-type': 'multipart/form-data' },
          data: formData,
        });
        if (resp.data.status === 501) {
          Swal.fire({
            title: '이메일 중복', // Alert 제목
            text: '다른 이메일 계정을 입력해주십시오', // Alert 내용
            icon: 'error', // Alert 타입
          });
        } else if (resp.data.status === 502 || resp.data.status === 503) {
          Swal.fire({
            title: '회원가입 처리 중 에러 발생', // Alert 제목
            text: '다시 입력해주십시오', // Alert 내용
            icon: 'error', // Alert 타입
          });
        }
        navigate(`/challenges/${challengeId}/board/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
    [navigate],
  );
  const errorEvent = error => console.error(error);

  useEffect(() => {
    getChallengeDetail(challengeId);
    if (challengesBoard[0]) {
      setValue('title', challengesBoard[0]?.title);
      setValue('category', challengesBoard[0]?.category);
      setValue('contents', challengesBoard[0]?.contents);
    }
  }, [challengeId]);

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
                      id="title"
                      name="title"
                      {...register('title', {
                        required: {
                          value: true,
                          message: '제목을 입력해주세요',
                        },
                      })}
                    />
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
                          message: '카테고리를 입력해주세요',
                        },
                      })}
                      defaultValue="자유">
                      <option value="">카테고리 선택</option>
                      <option value="공지사항">공지사항</option>
                      <option value="자유">자유</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>내용</td>
                  <td>
                    <textarea
                      cols="80"
                      rows="10"
                      className="form-control"
                      id="contents"
                      name="contents"
                      {...register('contents', {
                        required: {
                          value: true,
                          message: '내용을 반드시 입력해주세요',
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
                      onClick={() => navigate(`/challenges/${challengeId}/board/${id}`)}>
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

export default ChallengesCommunityUpdateBody;
