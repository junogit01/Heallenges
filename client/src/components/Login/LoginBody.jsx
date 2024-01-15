import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '@recoils/login';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function LoginBody2() {
  const setLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  // 이미 로그인 한 유저가 혹여나 로그인 페이지로 이동 시 메인페이지로 이동
  const loginUser = useRecoilValue(loginState);
  if (loginUser?.id !== '' && loginUser?.email !== '') navigate('/');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const submitEvent = useCallback(
    async data => {
      const resp = await axios.post('/login', data);
      if (resp.data.status === 200) {
        setLogin(resp.data.data);
        navigate('/');
        return;
      } else if (resp.data.status === 401 || resp.data.status === 403 || resp.data.status === 500) {
        Swal.fire({
          title: '로그인 처리중 에러 발생', // Alert 제목
          text: '이메일 혹은 비밀번호를 다시 입력해주세요.', // Alert 내용
          icon: 'error', // Alert 타입
        });
      }
    },
    [setLogin, navigate],
  );
  const errorEvent = error => console.error(error);

  return (
    <section style={{ paddingTop: '100px', marginBottom: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <div className="title-wrap d-flex justify-content-center" style={{ paddingBottom: '15px' }}></div>
          </div>
        </div>
        <div className="row justify-content-center">
          <form className="col-sm-5" onSubmit={handleSubmit(submitEvent, errorEvent)}>
            <div className="col-sm-12 position-relative form-group mb-5">
              <label htmlFor="email" className="form-label fs-3 mb-3">
                이메일 :{' '}
                <span style={{ color: 'orange' }} className="fs-5">
                  {errors.email?.message}
                </span>
              </label>
              <input
                type="text"
                className="form-control p-2"
                id="email"
                name="email"
                {...register('email', {
                  required: {
                    value: true,
                    message: '이메일을 입력해주세요',
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '이메일 형식이 아닙니다.',
                  },
                })}
              />
            </div>

            <div className="col-sm-12 position-relative form-group mb-5">
              <label htmlFor="password" className="form-label fs-3 mb-3">
                비밀번호 :{' '}
                <span style={{ color: 'orange' }} className="fs-5">
                  {errors.password?.message}
                </span>
              </label>
              <input
                type="password"
                className="form-control p-2"
                id="password"
                name="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: '비밀번호를 입력해주세요',
                  },
                })}
              />
            </div>

            <div className="col-sm-12 position-relative form-group d-flex justify-content-between">
              <button type="submit" className="btn btn-primary btn-md me-2">
                로그인
              </button>{' '}
              <button type="button" className="btn btn-primary btn-md" onClick={() => navigate('/signup')}>
                회원가입
              </button>
            </div>
          </form>
          <hr className="mt-5 mb-5" />
          <div className="d-flex justify-content-center">
            <GoogleOAuthProvider clientId="241669845547-flvgh9p9k5n2ed7hrjoiq0i53ouuil2o.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const decode = jwtDecode(credentialResponse.credential);

                  console.log(decode);
                  setLogin({ email: decode.email, name: decode.name });
                  navigate('/');
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginBody2;
