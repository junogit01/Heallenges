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

  // 로그인이 안되면 로그인페이지로 이동
  const loginUser = useRecoilValue(loginState);
  if (!loginUser.id && !loginUser.email) navigate('/login');

  // React Hook Form의 userForm 사용
  const { register, handleSubmit } = useForm();

  // 카테고리 값을 변경해주는 함수 / 프론트(한글) -> 노드(숫자)
  const getCategoryValue = categoryName => {
    switch (categoryName) {
      case '공지 게시판':
        return 1;
      case '자유 게시판':
        return 2;
      case '문의 게시판':
        return 3;
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

      // 유저아이디, 제목, 내용, 카테고리 이미지 추가
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({ user_id: loginUser.id, ...data, category: getCategoryValue(data.category) }),
      );
      formData.append('image', data.image[0]);

      // back으로 이동
      const resp = await axios.post('http://localhost:8001/community/', formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });

      // 게시물 성공 시 알람 창
      if (resp.data.status === 200) {
        Swal.fire({
          title: '게시물 추가',
          text: '게시물이 추가 되었습니다.',
          icon: 'success',
        });
        // 글 작성 성공 시 http://localhost:3000/community/id로 이동
        navigate(`/community/${resp.data.data.insertId}`);
        // 게시물 실패 시 알람 창
      } else {
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
            <form className="col-sm-12" onSubmit={handleSubmit(onSubmit)}>
              <table className="table">
                <tbody>
                  <tr>
                    <td>제목</td>
                    <td>
                      <input type="text" className="form-control" {...register('title')} />
                    </td>
                  </tr>
                  <tr>
                    <td>카테고리</td>
                    <td>
                      <select className="form-select" {...register('category')} defaultValue="자유 게시판">
                        <option value="">카테고리 선택</option>
                        <option value="공지 게시판">공지 게시판</option>
                        <option value="자유 게시판">자유 게시판</option>
                        <option value="문의 게시판">문의 게시판</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>
                      <textarea cols="80" rows="10" className="form-control" {...register('contents')}></textarea>
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
