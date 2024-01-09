import React, { useState, useEffect, useCallback } from 'react';
import { loginState } from '@recoils/login';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilStateLoadable, useRecoilValue } from 'recoil';
import { communityState, communityListSelector } from '@recoils/Community';
import CommunityHeader from '../components/Community/CommunityHeader';
import axios from 'axios';

function CommunityInsert() {
  const navigate = useNavigate();

  // 로그인이 안되면 로그인페이지로 이동
  const loginUser = useRecoilValue(loginState);
  if (!loginUser.id && !loginUser.email) navigate('/login');

  const user = useRecoilValue(loginState);
  const [community, setCommunity] = useState({
    id: '',
    user_id: '',
    title: '',
    category: '',
    contents: '',
    Image: '',
  });
  console.log(community);

  // const communityLoadable = useRecoilStateLoadable(communityState());
  const { insertCommunity } = useRecoilValue(communityListSelector);

  const changeBoard = e => {
    const { name, value } = e.target;
    setCommunity(prevCommunity => ({ ...prevCommunity, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setCommunity(prevCommunity => ({ ...prevCommunity, Image: file }));
  };

  const insertCommunityEvent = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        try {
          // 제목과 내용이 비어있는지 확인
          if (!community.title || !community.contents) {
            alert('제목과 내용을 입력해주세요.'); // 또는 다른 사용자 피드백 방식 사용
            return;
          }

          const userSnapshot = await snapshot.getPromise(loginState);
          const newData = {
            ...community,
            user_id: userSnapshot.id && String(userSnapshot.id), // 유효한 ID로 변환
            category: getCategoryValue(community.category),
          };

          console.log('Sending data to server:', newData);
          insertCommunity(newData);
          navigate('/community');
        } catch (error) {
          console.error('Error while inserting community:', error);
        }
      },
    [community, insertCommunity, user.id, navigate],
  );

  const submitEvent = useCallback(
    async data => {
      try {
        const formData = new FormData();

        const files = document.querySelector('input[name="profile"]').files;
        formData.append('data', JSON.stringify(data));
        formData.append('profile', files[0]);

        const resp = await axios({
          method: 'post',
          url: 'http://localhost:8001/community/',
          headers: { 'Content-type': 'multipart/form-data' },
          data: formData,
        });
        if (resp.data.status === 200) {
          // Swal.fire({
          //   title: '수정완료', // Alert 제목
          //   text: '회원정보 수정이 완료되었습니다..', // Alert 내용
          //   icon: 'success', // Alert 타입
          // });
          // setIsModify(!isModify);
          // navigate('/mypage/' + id);
        } else {
          // Swal.fire({
          //   title: '회원정보 수정 처리 중 에러 발생', // Alert 제목
          //   text: '다시 시도해주세요.', // Alert 내용
          //   icon: 'error', // Alert 타입
          // });
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    // [navigate, id, isModify],
  );

  // useEffect(() => {
  //   if (communityLoadable.state === 'hasValue' && communityLoadable.contents !== community) {
  //     setCommunity(communityLoadable.contents);
  //   }
  // }, [communityLoadable, community]);

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

  return (
    <main id="main">
      {/* Breadcrumbs 부분 */}
      <CommunityHeader />
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            <form className="col-sm-12">
              <table className="table">
                <tbody>
                  <tr>
                    <td>타이틀</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={community.title}
                        onChange={changeBoard}
                      />
                    </td>
                  </tr>
                  <tr>
                    {/* 선택 자유 공지 문의 인데 자유를 기본선택으로 */}

                    <td>카테고리</td>
                    <td>
                      <select
                        name="category"
                        className="form-select"
                        value={community.category || '자유 게시판'}
                        onChange={changeBoard}>
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
                      <textarea
                        cols="80"
                        rows="10"
                        name="contents"
                        className="form-control"
                        value={community.contents}
                        onChange={changeBoard}></textarea>
                    </td>
                  </tr>
                  <tr>
                    {/* <div className="col-sm-12 mb-4">
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
                </div> */}
                    <td>이미지 첨부</td>
                    <td>
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-end">
                      <button type="submit" className="btn btn-outline-secondary" onClick={insertCommunityEvent}>
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
