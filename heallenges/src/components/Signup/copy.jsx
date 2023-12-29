

import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

function Signup() {
  const navigate = useNavigate();

  // react-hook-form 설정
  // npm i react-hook-form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      // 기본값은 필드에 있는 id, name 속성이 아니라 { ...register('email', {검증조건})} 에 기술한 email 이 서버로 전송되는 key가 된다
      // 전송은 { email: 'abc@abc.com' } 형태
      email: '기본값을 여기에 기술합니다.'
    },
    mode: 'onBlur'    // 기본값은 onSubmit
  });

  // 다음 주소 찾기 구현
  // npm i react-daum-postcode
  const daum = useDaumPostcodePopup(postcodeScriptUrl);
  const handleComplete = (data) => {
    let address = '';
    let extraAddress = '';

    if (data.userSelectedType === 'R') address = data.roadAddress;
    else address = data.jibunAddress;

    if (data.userSelectedType === 'R') {
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) extraAddress += data.bname;
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraAddress !== '') extraAddress = ' (' + extraAddress + ')';

      // 전송 버튼이 활성화되기 위해서는 다음 주소가 할당한 필드가 기본적으로 validate(검증), 필드에 커서가 위치한 적이 있는가(touch), 
      // 마지막으로 필드가 수정된 적이 있는가(dirty)를 모두 true로 설정하여 검증완료 및 수정이 된 상태로 변경해서 submit 버튼이 실행된다
      setValue('address.postcode', data.zonecode, { shouldValidate: true, shouldTouch: true, shouldDirty: true })
      setValue('address.main', address, { shouldValidate: true, shouldTouch: true, shouldDirty: true })
      setValue('address.extra', extraAddress, { shouldValidate: true, shouldTouch: true, shouldDirty: true });
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("addressDetail").focus();
    }
  }
  const getAddress = () => {
    daum({ onComplete: handleComplete })
  }

  // <form className="row" onSubmit={handleSubmit(submitEvent, errorEvent)}> 
  // 여기서 handleSubmit에서 지정한 성공시 실행할 메서드. 매개변수 data에 ...register('이름', {제약조건})을 설정한 모든 필드의
  // 값이 담아서 넘어온다 ...register('이름', {제약조건}) 저정 안한 필드는 개별적으로 따로 제어해야 한다
  const submitEvent = useCallback(async (data) => {
    try {
      // 저는 파일 업로드를 위해 formData로 변경했습니다
      const formData = new FormData();

      // 파일 업로드를 위한 file 필드는 react-hook-form 이 값을 객체로 가져오기 때문에 업로드 파일 처리를 할 수 없어 따로 추출함
      const files = document.querySelector('input[name="profile"]').files;
      formData.append('data', JSON.stringify(data))
      formData.append('profile', files[0])

      // 이 값을 서버에 전송한다. 이미지 업로드가 있어서 headers에 { "Content-type": "multipart/form-data" }를 지정
      // 만약 이미지 업로드가 없다면 headers 필요없고 formData로 변환할 필요없이 바로 매개변수로 받은 data를 바로 전송하면 된다
      const resp = await axios({
        method: 'POST',
        url: 'http://localhost:8000/users/signup',
        headers: { "Content-type": "multipart/form-data" },
        data: formData
      })
      // console.log(resp);
      navigate('/login');
    } catch (error) {
      console.error(error)
    }
  }, [navigate]);
  const errorEvent = (error) => console.error(error)


  return (
    <main id="main">
      <section className="section-about">
        <div className="container">
          <form className="row" onSubmit={handleSubmit(submitEvent, errorEvent)}>

            <div className="col-sm-12 mb-3">
              <label htmlFor="email" className="form-label">
                이메일: <span style={{ color: 'orange' }}>{errors.email?.message}</span>
              </label>
              <input type="text" className="form-control" id="email" {...register('email', {
                required: { value: true, message: '이메일은 필수 입력 사항입니다' },
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: '이메일 형식이 아닙니다' }
              })}
              />
            </div>

            <div className="col-sm-12 mb-3">
              <label htmlFor="password" className="form-label">
                패스워드: <span style={{ color: 'orange' }}>{errors.password?.message}</span>
              </label>
              <input type="password" className="form-control" id="password" {...register('password', {
                required: { value: true, message: '패스워드는 필수 입력 사항입니다' },
                // 8글자 이상 25글자 이하
                pattern: { value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/, message: '영문, 숫자, 특수문자를 조합하여 8글자 이상 입력해 주세요' },
              })} />
            </div>
            <div className="col-sm-12 mb-3">
              <label htmlFor="name" className="form-label">
                이름: <span style={{ color: 'orange' }}>{errors.name?.message}</span>
              </label>
              <input type="text" className="form-control" id="name" {...register('name', {
                required: { value: true, message: '이름은 필수 입력 사항입니다' },
              })} />
            </div>

            <div className="col-sm-12 form-group mb-3">
              <div className="row">
                <label htmlFor="phone" className="form-label">전화번호: </label>
                <div className="col-sm">
                  {/* phone.one 형태로 지정하면 { phone: {one: value, two: value, three: value} } 형태로 만들어 준다 */}
                  <input type="text" className="form-control" id="phone" {...register('phone.one')} />
                </div>
                <div className="col-sm-5">
                  <input type="text" className="form-control" {...register('phone.two')} />
                </div>
                <div className="col-sm-5">
                  <input type="text" className="form-control" {...register('phone.three')} />
                </div>
              </div>
            </div>

            <div className="col-sm-12 form-group mb-3">
              <div className="row">
                <label htmlFor="address" className="form-label">
                  주소: <span style={{ color: 'orange' }}>{errors.address?.main?.message}</span>
                </label>
                <div className="col-sm-2 mb-1">
                  <input type="text" className="form-control" id="postcode" readOnly {...register('address.postcode')} />
                </div>
                <div className="col-sm-10 input-group mb-2">
                  <input type="text" className="form-control" id="address" readOnly {...register('address.main', {
                    required: { value: true, message: '주소는 필수 입력 사항입니다' },
                  })} />
                  <button type="button" className="btn btn-outline-secondary" onClick={getAddress}>주소찾기</button>
                </div>
                <div className="col-6">
                  <input type="text" className="form-control" id="addressDetail" {...register('address.detail')} placeholder="상세 주소를 입력해 주세요" />
                </div>
                <div className="col-6">
                  <input type="text" className="form-control" id="addressExtra" readOnly {...register('address.extra')} />
                </div>
              </div>
            </div>

            <div className="col-sm-12 mb-3">
              <label htmlFor="profile" className="form-label">프로파일 이미지</label>
              <input type="file" className="form-control" id="profile" name="profile" accept="image/*" {...register('profile')} />
            </div>
            <div className="col-sm-12">
              <button type="submit" className="btn btn-danger" style={{ paddingTop: '10px' }}>SEND</button>{' '}
              <button type="reset" className="btn btn-primary" style={{ paddingTop: '10px' }}>RESET</button>
            </div>
          </form>
        </div>
      </section>

    </main>
  )
}

export default Signup;

Signup.defaultProps = {
  sub: ''
};








----------------------- Modal ------------------


import axios from 'axios';
import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function UpdatePasswordModal(props) {
  const { show, handleClose, id } = props;
  const navigate = useNavigate()

  // react-hook-form 정의
  const { register, handleSubmit, setValue, getValues, setError, formState: { errors } } = useForm({
    defaultValues: {
      current: '',
      mode: 'onBlur'
    }
  });

  // 모달 창을 닫을때 기본 값을 모두 초기화 한다. 이때 validate, touch, dirty도 모두 기본 값으로 지정
  const closeEvent = useCallback(() => {
    setValue('current', '', { shouldValidate: false, shouldTouch: false, shouldDirty: false });
    setValue('password', '', { shouldValidate: false, shouldTouch: false, shouldDirty: false });
    setValue('confirm', '', { shouldValidate: false, shouldTouch: false, shouldDirty: false });

    // 모달 창 닫기
    handleClose();
  }, [setValue, handleClose])

  const onSubmit = useCallback(async (data) => {
    // {...register('이름')}으로 등록한 값은 모두 여기에 객체로 담긴다
    console.log(data);

    // 그 받은 값에 필요한 값 추가. 저는 id가 필요해서 props로 받은 해당 유저의 id 값을 추가
    const sendData = { ...data, id: id }

    // 서버 전송
    const resp = await axios.post('http://localhost:8000/users/change/', sendData);
    // console.log(resp);

    // 기존 비밀번호가 매칭되지 않는 경우 500번 코드 전송. 500번이 전송되면 강제로 current 필으에 에러가 발생시켜 에러 메시지가
    // 화면에 표시되게 하기 위해 setError 메서드 사용
    if (resp.data.code === 500) {
      setError(
        'current', // 에러 핸들링할 input요소 name
        { message: '비밀번호가 일치하지 않습니다.' }, // 에러 메세지
        { shouldFocus: true }, // 에러가 발생한 input으로 focus 이동
      );
    } else if (resp.data.code === 200) {
      closeEvent();
      navigate('/userList');
    }
  }, [closeEvent, setError, navigate, id]);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="current">
            <Form.Label>패스워드</Form.Label>
            <Form.Control type="password" {...register("current", {
              required: { value: true, message: '변경전 비밀번호를 입력해주세요' },
            })}
            />
            {errors.current && <p className="errorMsg">{errors.current.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>새로운 패스워드</Form.Label>
            <Form.Control type="password" {...register("password", {
              required: { value: true, message: '새로운 비밀번호를 입력해주세요' },
              pattern: { value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/, message: '영문, 숫자, 특수문자를 조합하여 8글자 이상 입력해 주세요' },
            })}
            />
            {errors.password && <p className="errorMsg">{errors.password.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm">
            <Form.Label>패스워드 확인</Form.Label>
            <Form.Control type="password" {...register("confirm", {

              // 검증 로직
              // getValues()는 hook- form이 관리하는 모든 필드 값을 가져오고  getValues('password')는 password 값만 가져온다
              // 이 값이 현재 필드의 값(data)와 같은지를 체크. 같으면 true(리엑트는 boolean 값은 화면에 표시 안함), 맞지 않으면 에러 문구 출력
              validate: {
                compare: (data) => (getValues('password') === data) ? true : '패스워드가 같지 않습니다',
              }
            })}
            />
            {errors.confirm && <p className="errorMsg">{errors.confirm.message}</p>}
          </Form.Group>

          <hr />

          <Button variant="outline-secondary" type="submit">Submit</Button>{' '}
          <Button variant="outline-secondary" onClick={closeEvent}>Close</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdatePasswordModal;




















CREATE TABLE user(
  id            INT             NOT NULL    AUTO_INCREMENT    COMMENT '사용자 아이디',
  name          VARCHAR(50)     NOT NULL                      COMMENT '사용자 이름',
  email         VARCHAR(50)     NOT NULL                      COMMENT '사용자 이메일',
  password      VARCHAR(256)    NOT NULL                      COMMENT '사용자 비밀번호',
  cellphone     VARCHAR(100)    NULL                          COMMENT '사용자 휴대폰 번호',
  zip           VARCHAR(10)     NULL                          COMMENT '우편번호',
  address       VARCHAR(256)    NULL                          COMMENT '주소',
  addressDetail VARCHAR(256)    NULL                          COMMENT '상세 주소',
  profileImageName  VARCHAR(256)    NULL                      COMMENT '화면에 표시할 이미지 주소',
  profileImagePath  VARCHAR(256)    NULL                      COMMENT '이미지가 저장되는 절대패스',
  grade         VARCHAR(2)                  DEFAULT 1         COMMENT '회원 등급',
  refreshToken  VARCHAR(256)    NULL,
  createdAt     DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  updatedAt     DATETIME        NULL        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  CONSTRAINT user_id_pk PRIMARY KEY(id),
  CONSTRAINT user_email_uk UNIQUE(email),
  CONSTRAINT user_grade_fk FOREIGN KEY(grade) REFERENCES userGrade(gradeCode)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);








const submitEvent = useCallback(async (data) => {
    try {
      const formData = new FormData();
      const files = document.querySelector('input[name="profile"]').files;
      formData.append('data', JSON.stringify(data))
      formData.append('profile', files[0])

      // eslint-disable-next-line no-unused-vars
      const resp = await axios({
        method: 'POST',
        url: 'http://localhost:8000/users/signup',
        headers: { "Content-type": "multipart/form-data" },
        data: formData
      })
      // console.log(resp);
      navigate('/login');
    } catch (error) {
      console.error(error)
    }
  }, [navigate]);
  
  
  
  
  
  ----------- router ------------
  
  const imageUploadPath = 'http://localhost:8000/images/users/';

const uploadName = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'images', 'users')),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: {fileSize: 1024 * 1024 * 3},
});

router.post('/signup', uploadName.single('profile'), async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    console.log(data);
    const cellphone = data.phone.one.trim() !== '' ? `${data.phone.one}-${data.phone.two}-${data.phone.three}` : '';

    const profileImageName = req.file ? `${imageUploadPath}${req.file.filename}` : `${imageUploadPath}noimage.jpg`;
    const profileImagePath = req.file ? req.file.path : '';

    const insertData = {
      ...data,
      cellphone,
      zip: data.address.postcode,
      address: data.address.main,
      addressDetail: data.address.detail,
      profileImageName, // req.file.filename,
      profileImagePath,
    };

    console.log(insertData);
    const resp = await userService.signup(insertData);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});













------------------- recoil --------------------

// recoils/login.js

import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist({
  key: 'login',
  storage: localStorage,
});

export const loginState = atom({
  key: 'login/loginState',
  default: {id: '', email: ''},
  effects: [persistAtom],
});






// :pgom/ksx


import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import SubIntroSingle from '@components/SubIntroSingle';
import AlertModal from '@components/common/AlertModal'
import { loginState } from '@recoils/login'

function Login() {
  const navigate = useNavigate();

  // Modal
  const [modalShow, setModalShow] = React.useState(false);

  // recoil
  const setUser = useSetRecoilState(loginState);

  const [data, setData] = useState({ email: '', password: '' });
  const changeData = useCallback((evt) => {
    setData((data) => ({ ...data, [evt.target.name]: evt.target.value }));
  }, []);

  const login = useCallback(async (evt) => {
    evt.preventDefault();
    const resp = await axios.post('http://localhost:8000/users/login', data);
    console.log(resp);
    if (resp.data.code === 201) {
      // const storage = window.sessionStorage;
      // storage.setItem('name', resp.data.user.name);
      // storage.setItem('email', resp.data.user.email);
      // storage.setItem('id', resp.data.user.id);
      setUser(resp.data.user);
      navigate('/userList');
      return;
    } else {
      setModalShow(true);
      setData({ email: '', password: '' })
    }
  }, [data, setUser, navigate]);

  return (
    <main id="main">
      {/* ======= Modal ======= */}
      <AlertModal show={modalShow} onHide={() => setModalShow(false)} title="알림" content="아이디 / 패스워드를 확인해 주세요" />

      {/* ======= Intro Single ======= */}
      <SubIntroSingle title="We Do Great Design For Creative Folks" pathName="Login"></SubIntroSingle>

      {/* =======Team Section ======= */}
      <section style={{ paddingTop: '-100px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title-wrap d-flex justify-content-between" style={{ paddingBottom: '15px' }}>
                <div className="title-box">
                  <h2 className="title-a">LOGIN</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <form className="col-sm-12">
              <div className="col-sm-12 position-relative form-group mb-3">
                <label htmlFor="email" className="form-label">E-Mail</label>
                <input type="text" className="form-control" id="email" name="email"
                  value={data.email} onChange={changeData} />
              </div>
              <div className="col-sm-12 position-relative form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password"
                  value={data.password} onChange={changeData} />
              </div>

              <div className="col-sm-12 position-relative form-group">
                <button type="submit" className="btn btn-danger btn-sm" onClick={login}>SEND</button>{' '}
                <button type="reset" className="btn btn-primary btn-sm">RESET</button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Login;

Login.defaultProps = {
  sub: ''
};










// UserList.jsx

import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import { useRecoilValue } from 'recoil';

import SubIntroSingle from '@components/SubIntroSingle';
import { loginState } from '@recoils/login'

function UserList() {
  const navigate = useNavigate();

  // recoil에 유저 정보가 없으면 로그인으로 이동시킨다
  const user = useRecoilValue(loginState)
  if (user?.id === '' && user?.email === '') navigate('/login')

  const [userList, setUserList] = useState({ no: '', size: '', total: '', users: [] })

  const getUserList = useCallback(async (no = 1, size = 5) => {
    try {
      const resp = await axios.get('http://localhost:8000/users/', { params: { no, size } });
      // console.log(resp.data.list);
      setUserList(resp.data.list);
    } catch (error) {
      console.error(error)
    }
  }, []);

  useEffect(() => {
    getUserList(1, 10)
  }, [getUserList])

  return (
    <main id="main">

      {/* ======= Intro Single ======= */}
      <SubIntroSingle title="사용자 목록" sub="User List" pathName="UserList"></SubIntroSingle>

      {/*  ======= Property Grid =======  */}
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>전화번호</th>
                    <th>주소</th>
                    <th>가입일</th>
                    <th>변경일</th>
                  </tr>
                </thead>
                <tbody>
                  {userList?.users?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td><Link to={"/userDetail/" + user.id}>{user.email}</Link></td>
                      <td>{user.cellphone}</td>
                      <td>{user.address} {user.addressDetail}</td>
                      <td>{moment(user.createdAt).format('YYYY-MM-DD hh:mm:ss')}</td>
                      <td>{moment(user.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={7} className="text-end">
                      <button className="btn btn-outline-secondary" onClick={() => navigate('/signup')}>ADD</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
export default UserList;

UserList.defaultProps = {
  sub: ''
};








import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.min.css';
import './assets/vendor/animate.css/animate.min.css';
import './assets/css/style.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

// npm i redux@4.2.1 react-redux@8.1.3 redux-thunk@2.4.2
// npm i  redux-logger
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import rootStore from './stores/';

// import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';

const store = createStore(rootStore, applyMiddleware(reduxThunk));
// const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <RecoilRoot>
          
            <App />
          
        </RecoilRoot>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();




