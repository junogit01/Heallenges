// CommunityInsert.jsx

import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { loginState } from '@recoils/login';
import CommunityHeader from '@components/Community/CommunityHeader';

function CommunityInsert() {
  const navigate = useNavigate();

  // 로그인이 안되면 로그인 페이지로 이동
  const loginUser = useRecoilValue(loginState);
  if (!loginUser.id && !loginUser.email) navigate('/login');

  // React Hook Form의 useForm 훅 사용
  const { register, handleSubmit } = useForm();

  // 카테고리 값을 변경해주는 함수 / 프론트(한글) -> 노드(숫자)
  const getCategoryValue = categoryName => {
    switch (categoryName) {
      case '공지 게시판':
        return 1;
      case '자유 게시판':
        return 2;
      // case '문의 게시판':
      //   return 3;
      default:
        return 2;
    }
  };

  // 폼 제출 시 실행되는 함수 (데이터를 서버로 전송)
  const onSubmit = async data => {
    try {
      // 폼 유효성 검사
      if (!data.title || !data.contents) {
        // 필수 필드가 비어있는 경우
        Swal.fire({
          title: '입력 오류',
          text: '제목과 내용은 필수 입력 사항입니다.',
          icon: 'error',
        });
        return;
      }

      // 사용자가 공지 게시판에 글을 작성할 권한이 있는지 확인
      if (data.category === '공지 게시판' && loginUser.email !== 'admin@naver.com') {
        Swal.fire({
          title: '권한 없음',
          text: '공지 게시판 글은 관리자만 작성할 수 있습니다.',
          icon: 'error',
        });
        return;
      }

      // 유저 아이디, 제목, 내용, 카테고리 이미지 추가
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({ user_id: loginUser.id, ...data, category: getCategoryValue(data.category) }),
      );
      formData.append('image', data.image[0]);

      // 서버로 데이터 전송
      const resp = await axios.post('http://localhost:8001/community/', formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      // const resp = await axios.post('http://heallenges.cafe24app.com/community/', formData, {
      //   headers: { 'Content-type': 'multipart/form-data' },
      // });

      // 게시물 추가 성공 시 SweetAlert로 성공 알림
      if (resp.data.status === 200) {
        navigate(`/community/${resp.data.data.insertId}`);
      } else {
        // 게시물 추가 실패 시 SweetAlert로 에러 알림
        Swal.fire({
          title: '게시물 입력 실패',
          text: '다시 시도해주세요.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main id="main">
      <CommunityHeader />
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            {/* 폼 영역 */}
            <form className="col-sm-12" onSubmit={handleSubmit(onSubmit)}>
              <table className="table">
                <tbody>
                  <tr>
                    <td>제목</td>
                    <td>
                      {/* 제목 입력 필드 */}
                      <input type="text" className="form-control" {...register('title')} />
                    </td>
                  </tr>
                  <tr>
                    <td>카테고리</td>
                    <td>
                      {/* 카테고리 선택 드롭다운 */}
                      <select className="form-select" {...register('category')} defaultValue="자유 게시판">
                        <option value="">카테고리 선택</option>
                        <option value="공지 게시판">공지 게시판</option>
                        <option value="자유 게시판">자유 게시판</option>
                        {/* <option value="문의 게시판">문의 게시판</option> */}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>
                      {/* 내용 입력 텍스트 영역 */}
                      <textarea cols="80" rows="10" className="form-control" {...register('contents')}></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>이미지 첨부</td>
                    <td>
                      {/* 이미지 업로드 필드 */}
                      <input type="file" accept="image/*" className="form-control" {...register('image')} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-end">
                      {/* 제출 및 취소 버튼 */}
                      <button type="submit" className="btn btn-outline-secondary">
                        입력
                      </button>{' '}
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/community')}>
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
    </main>
  );
}

export default CommunityInsert;
