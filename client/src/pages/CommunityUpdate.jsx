// CommunityUpdate.jsx

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import CommunityHeader from '../components/Community/CommunityHeader';
import { useRecoilValue, useRecoilState } from 'recoil';
import { loginState } from '@recoils/login';
import { communityState } from '@recoils/Community';

function CommunityUpdate() {
  const navigate = useNavigate();

  // 게시물 아이디(http://localhost:3000/community/177(<--))를 가져오기 위해 사용
  const { id } = useParams();

  // 로그인이 안되면 로그인 페이지로 이동
  const loginUser = useRecoilValue(loginState);
  if (!loginUser.id && !loginUser.email) navigate('/login');

  // React Hook Form의 useForm 사용
  const { register, handleSubmit, setValue } = useForm();

  // communityState로 기존 게시물에 작성된 값을 가져오기 위해 사용
  const [community] = useRecoilState(communityState(id));

  // 폼 초기값 설정
  useEffect(() => {
    // 순서대로 기존 게시물에 있던 title, category, contents, Image 값 호출
    if (community && community.board) {
      setValue('title', community.board.title);
      setValue('category', getCategoryString(community.board.category));
      setValue('contents', community.board.contents);
      if (community.board.Image) {
        const imageFileName = community.board.Image;
        setValue('image', imageFileName);
        console.log('Community Image:', imageFileName);
      }
    }
  }, [community, setValue, id]);

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

  // 카테고리 값을 변경해주는 함수 / 노드(숫자) -> 프론트(한글)
  const getCategoryString = categoryNumber => {
    switch (categoryNumber) {
      case 1:
        return '공지 게시판';
      case 2:
        return '자유 게시판';
      case 3:
        return '문의 게시판';
      default:
        return '자유 게시판';
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
      formData.append('data', JSON.stringify({ ...data, category: getCategoryValue(data.category), id: id }));
      formData.append('image', data.image[0]);

      // 백엔드로 수정 요청
      const resp = await axios.put(`/community/${id}`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      // const resp = await axios.put(`http://heallenges.cafe24app.com/community/${id}`, formData, {
      //   headers: { 'Content-type': 'multipart/form-data' },
      // });

      if (resp.data.status === 200) {
        // 수정 성공 시 알람 창
        navigate(`/community/${id}`);
      } else {
        // 수정 실패 시 알람 창
        Swal.fire({
          title: '게시물 수정 실패',
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
                        {/* <option value="문의 게시판">문의 게시판</option> */}
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
                      <input type="file" accept="image/*" className="form-control" {...register('image')} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-end">
                      <button type="submit" className="btn btn-outline-secondary">
                        수정
                      </button>{' '}
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/community/' + id)}>
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

export default CommunityUpdate;
