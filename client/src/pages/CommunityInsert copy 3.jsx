import React, { useState, useCallback } from 'react';
import { loginState } from '@recoils/login';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { communityListSelector } from '@recoils/Community';
import CommunityHeader from '../components/Community/CommunityHeader';
import axios from 'axios';

function CommunityInsert() {
  const navigate = useNavigate();
  const loginUser = useRecoilValue(loginState);

  if (!loginUser.id && !loginUser.email) {
    navigate('/login');
  }

  const [community, setCommunity] = useState({
    id: '',
    user_id: '',
    title: '',
    category: '',
    contents: '',
    Image: '',
  });

  const { insertCommunity } = useRecoilValue(communityListSelector);

  const changeBoard = e => {
    const { name, value } = e.target;
    setCommunity(prevCommunity => ({ ...prevCommunity, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setCommunity(prevCommunity => ({ ...prevCommunity, Image: file || '' }));
  };

  const insertCommunityEvent = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        try {
          if (!community.title || !community.contents) {
            alert('제목과 내용을 입력해주세요.');
            return;
          }

          const userSnapshot = await snapshot.getPromise(loginState);
          const newData = {
            ...community,
            user_id: userSnapshot.id && String(userSnapshot.id),
            category: getCategoryValue(community.category),
          };

          const formData = new FormData();
          formData.append('title', newData.title);
          formData.append('category', newData.category);
          formData.append('contents', newData.contents);
          // 이미지를 선택한 경우에만 FormData에 추가
          if (newData.Image) {
            formData.append('image', newData.Image);
          }
          formData.append('user_id', newData.user_id);

          console.log('Sending data to server:', formData);
          console.log(newData.title);
          console.log(newData.category);
          console.log(newData.contents);
          console.log(newData.Image);
          console.log(newData.user_id);
          insertCommunity(formData);
          navigate('/community');
        } catch (error) {
          console.error('Error while inserting community:', error);
        }
      },
    [community, insertCommunity, navigate],
  );

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
