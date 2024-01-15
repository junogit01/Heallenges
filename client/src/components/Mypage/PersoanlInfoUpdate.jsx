import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilCallback, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { loginState } from '@recoils/login';
import { userState } from '@recoils/users';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';
import PersonalInfo from './PersonalInfo';

function PersonalInfoUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModify, setIsModify] = useState(true);

  const loginUser = useRecoilValue(loginState);
  if (loginUser?.id === '' && loginUser?.email === '') navigate('/login');

  const user = useRecoilValue(userState);
  const getUserRecoild = useRecoilCallback(
    ({ set }) =>
      async id => {
        try {
          const resp = await axios.get('/mypage/' + id);
          set(userState, resp.data.data);
        } catch (error) {
          Swal.fire({
            title: '회원정보 수집 중 에러 발생',
            text: '다시 시도해주세요.',
            icon: 'error',
          });
        }
      },
    [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  // 다음 주소 찾기 구현
  // npm i react-daum-postcode
  const daum = useDaumPostcodePopup(postcodeScriptUrl);
  const handleComplete = data => {
    let address = '';
    let extraAddress = '';

    if (data.userSelectedType === 'R') address = data.roadAddress;
    else address = data.jibunAddress;

    if (data.userSelectedType === 'R') {
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) extraAddress += data.bname;
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddress += extraAddress !== '' ? ', ' + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraAddress !== '') extraAddress = ' (' + extraAddress + ')';

      // 전송 버튼이 활성화되기 위해서는 다음 주소가 할당한 필드가 기본적으로 validate(검증), 필드에 커서가 위치한 적이 있는가(touch),
      // 마지막으로 필드가 수정된 적이 있는가(dirty)를 모두 true로 설정하여 검증완료 및 수정이 된 상태로 변경해서 submit 버튼이 실행된다
      setValue('address.postcode', data.zonecode, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
      setValue('address.main', address, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
      // 커서를 상세주소 필드로 이동한다.
    }
  };
  const getAddress = () => {
    daum({ onComplete: handleComplete });
  };

  const submitEvent = useCallback(
    async data => {
      try {
        const formData = new FormData();

        const files = document.querySelector('input[name="profile"]').files;
        formData.append('data', JSON.stringify(data));
        formData.append('profile', files[0]);

        const resp = await axios({
          method: 'put',
          url: 'http://localhost:8001/mypage/' + id,
          headers: { 'Content-type': 'multipart/form-data' },
          data: formData,
        });
        if (resp.data.status === 200) {
          Swal.fire({
            title: '수정완료', // Alert 제목
            text: '회원정보 수정이 완료되었습니다.', // Alert 내용
            icon: 'success', // Alert 타입
          });
          setIsModify(!isModify);
          navigate('/mypage/' + id);
        } else {
          Swal.fire({
            title: '회원정보 수정 처리 중 에러 발생',
            text: '다시 시도해주세요.',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    [navigate, id, isModify],
  );

  const errorEvent = error => console.error(error);

  useEffect(() => {
    getUserRecoild(id);
  }, [getUserRecoild, id]);

  useEffect(() => {
    setValue('email', user?.[0]?.email, { shouldValidate: true, shouldTouch: true, shouldDirty: true });
    setValue('nickname', user?.[0]?.nickname, { shouldValidate: true, shouldTouch: true, shouldDirty: true });
    setValue('about_me', user?.[0]?.about_me, { shouldValidate: true, shouldTouch: true, shouldDirty: true });
    setValue('blog_url', user?.[0]?.blog_url, { shouldValidate: true, shouldTouch: true, shouldDirty: true });
  }, [user, setValue]);

  return (
    <>
      {isModify ? (
        <section id="about" className="container d-flex  flex-row justify-content-center align-items-center">
          <div className="container">
            <div className="row gy-4 ">
              <div className="col-lg-4">
                <img src={user[0]?.profile_image} className="img-thumbnail" alt="" />
                <div className="col-sm-12 mb-4">
                  <label htmlFor="profile" className="form-label">
                    프로필 이미지 수정하기
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="profile"
                    name="profile"
                    accept="image/*"
                    {...register('profile')}
                  />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="content ps-lg-4">
                  <form className="row" onSubmit={handleSubmit(submitEvent, errorEvent)}>
                    <table className="table">
                      <tbody>
                        <tr className="">
                          <th className="fs-4">이름</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={user[0]?.name}
                              disabled></input>
                          </td>
                        </tr>
                        <tr>
                          <th className="fs-4">이메일</th>
                          <td>
                            <input type="hidden" id="email" {...register('email')} />
                            <input type="text" className="form-control" value={user[0]?.email} disabled></input>
                          </td>
                        </tr>
                        <tr>
                          <th className="fs-4"> 닉네임</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              id="nickname"
                              {...register('nickname', {
                                required: {
                                  value: true,
                                  message: '닉네임은 필수 입력 사항입니다',
                                },
                              })}></input>
                          </td>
                        </tr>
                        <tr>
                          <th className="fs-4">자기소개</th>
                          <td>
                            <input type="text" className="form-control" id="about_me" {...register('about_me')}></input>
                          </td>
                        </tr>
                        <tr>
                          <th className="fs-4">블로그</th>
                          <td>
                            <input type="text" className="form-control" id="blog_url" {...register('blog_url')}></input>
                          </td>
                        </tr>

                        <tr className=" form-group col-md-4">
                          <th className="fs-4">주소</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              id="postcode"
                              readOnly
                              {...register('address.postcode')}></input>
                          </td>
                        </tr>
                        <tr>
                          <th className="fs-4">
                            <button type="button" className="btn btn-outline-secondary" onClick={getAddress}>
                              주소찾기
                            </button>
                          </th>
                          <td>
                            <input
                              type="text"
                              className="form-control "
                              id="address"
                              readOnly
                              {...register('address.main', {
                                required: {
                                  value: true,
                                  message: '주소는 필수 입력 사항입니다',
                                },
                              })}></input>
                          </td>
                        </tr>
                        <tr>
                          <th className="fs-4">가입일</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              id="created_at"
                              disabled
                              value={user[0]?.Created}></input>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-5">
                      <button type="submit" className="btn btn-outline-primary me-2 btn-lg justify-content-center">
                        수정완료
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <PersonalInfo />
      )}
    </>
  );
}

export default PersonalInfoUpdate;
