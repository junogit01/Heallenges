import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilCallback, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { loginState } from '@recoils/login';
import { userState } from '@recoils/users';
import Swal from 'sweetalert2';
import PersonalInfoUpdate from './PersoanlInfoUpdate';

import UpdatePasswordModal from './UpdatePasswordModal';

function PersonalInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModify, setIsModify] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginUser = useRecoilValue(loginState);
  if (loginUser?.id === '' && loginUser?.email === '') navigate('/login');

  const setLoginUser = useSetRecoilState(loginState);

  // 유저 정보 가져오기
  const user = useRecoilValue(userState);
  const getUserRecoild = useRecoilCallback(
    ({ set }) =>
      async id => {
        try {
          const resp = await axios.get('http://localhost:8001/mypage/' + id);
          set(userState, resp.data);
        } catch (error) {
          console.error(error.message);
        }
      },
    [],
  );
  // 수정 화면 전환
  const clickModify = () => {
    setIsModify(!isModify);
  };

  // 회원 탈퇴 (Swal 활용)
  const deleteUser = useCallback(() => {
    Swal.fire({
      title: '회원 탈퇴를 진행하시겠습니까??',
      text: '다시 되돌릴 수 없습니다. 신중하세요.',
      icon: 'warning',

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '승인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(async result => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        try {
          const resp = await axios.delete('http://localhost:8001/mypage/' + id);
          if (resp.data.status === 200) {
            Swal.fire('회원탈퇴가 완료되었습니다.', '그동안 감사했습니다.', 'success');
            setLoginUser({ name: '', email: '', id: '' });
            localStorage.removeItem('login');
            localStorage.removeItem('user');
            navigate('/');
          } else {
            Swal.fire('회원탈퇴 처리 되지 않았습니다.', '다시 시도해주시기 바랍니다.', 'error');
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    });
  }, [id, navigate, setLoginUser]);

  useEffect(() => {
    getUserRecoild(id);
  }, [getUserRecoild, id]);

  return (
    <>
      {isModify ? (
        <PersonalInfoUpdate />
      ) : (
        <section id="about" className="container d-flex  flex-row justify-content-center align-items-center">
          <div className="container">
            <div className="row gy-4 ">
              <div className="col-lg-4">
                <img src={user?.data?.[0]?.profile_image} className="img-thumbnail" alt="" />
              </div>
              <div className="col-lg-8">
                <div className="content ps-lg-4">
                  <table className="table">
                    <tr className="">
                      <th className="fs-4">이름</th>
                      <td>{user?.data?.[0]?.name}</td>
                    </tr>
                    <tr>
                      <th className="fs-4">이메일</th>
                      <td>{user?.data?.[0]?.email}</td>
                    </tr>
                    <tr>
                      <th className="fs-4"> 닉네임</th>
                      <td>{user?.data?.[0]?.nickname}</td>
                    </tr>
                    <tr>
                      <th className="fs-4">자기소개</th>
                      <td>{user?.data?.[0]?.about_me}</td>
                    </tr>
                    <tr>
                      <th className="fs-4">블로그</th>
                      <td>{user?.data?.[0]?.blog_url}</td>
                    </tr>
                    <tr>
                      <th className="fs-4">우편번호</th>
                      <td>{user?.data?.[0]?.zipcode}</td>
                    </tr>
                    <tr>
                      <th className="fs-4">상세주소</th>
                      <td>{user?.data?.[0]?.address}</td>
                    </tr>
                    <tr>
                      <th className="fs-4">가입일</th>
                      <td>{user?.data?.[0]?.Created}</td>
                    </tr>
                    <tr>
                      <th className="fs-4">점수</th>
                      <td>{user?.data?.[0]?.reward_cnt}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <h2 className="text-center mt-5">참여중인 대회</h2>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    도전번호
                  </th>
                  <th scope="col" className="text-center">
                    도전명
                  </th>
                  <th scope="col" className="text-center">
                    카테고리
                  </th>
                </tr>
              </thead>
              <tbody>
                {user?.challenge?.map(challenge => (
                  <tr key={challenge?.id}>
                    <th className="text-center">{challenge?.id}</th>
                    <td className="text-center">
                      <Link to={'/challenges/' + challenge?.id}>{challenge?.title}</Link>
                    </td>
                    <td className="text-center">{challenge?.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 d-flex justify-content-center">
              <button type="button" className="btn btn-outline-primary me-5 btn-lg" onClick={clickModify}>
                {isModify ? '수정완료' : '수정하기'}
              </button>
              <button type="button" className="btn btn-outline-primary me-5 btn-lg" onClick={() => handleShow(true)}>
                비밀번호변경
              </button>
              <UpdatePasswordModal show={show} handleClose={handleClose} id={user?.data?.[0]?.id}></UpdatePasswordModal>
              <button type="button" className="btn btn-outline-danger me-2 btn-lg" onClick={deleteUser}>
                회원탈퇴
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default PersonalInfo;
