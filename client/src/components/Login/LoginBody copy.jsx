import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { loginState } from '@recoils/login';
import axios from 'axios';

function LoginBody() {
  const setLogin = useSetRecoilState(loginState);

  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const changeData = useCallback(evt => {
    setData(data => ({ ...data, [evt.target.name]: evt.target.value }));
  }, []);

  const login = useCallback(
    async evt => {
      evt.preventDefault();
      const resp = await axios.post('http://localhost:8001/login', data);
      if (resp.data.status === 200) {
        setLogin(resp.data.data);
        navigate('/');
        return;
      } else {
        setData({ email: '', password: '' });
      }
    },
    [data, setLogin, navigate],
  );

  return (
    <section style={{ paddingTop: '100px', marginBottom: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <div className="title-wrap d-flex justify-content-center" style={{ paddingBottom: '15px' }}></div>
          </div>
        </div>
        <div className="row justify-content-center">
          <form className="col-sm-5  ">
            <div className="col-sm-12 position-relative form-group mb-5">
              <label htmlFor="email" className="form-label fs-3 mb-3">
                이메일
              </label>
              <input
                type="text"
                className="form-control p-2"
                id="email"
                name="email"
                value={data.email}
                onChange={changeData}
              />
            </div>
            <div className="col-sm-12 position-relative form-group mb-5">
              <label htmlFor="password" className="form-label fs-3 mb-3">
                비밀번호
              </label>
              <input
                type="password"
                className="form-control p-2"
                id="password"
                name="password"
                value={data.password}
                onChange={changeData}
              />
            </div>

            <div className="col-sm-12 position-relative form-group">
              <button type="submit" className="btn btn-primary btn-md me-2" onClick={login}>
                로그인
              </button>{' '}
              <button type="button" className="btn btn-primary btn-md" onClick={() => navigate('/signup')}>
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginBody;
