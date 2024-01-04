import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilStateLoadable, useRecoilValue } from 'recoil';
import { communityState, communityListSelector } from '@recoils/Community';
import { userState } from '@recoils/users';
import { useEffect } from 'react';

function CommunityInsert() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const [community, setCommunity] = useState({
    user_id: '',
    title: '',
    category: '',
    contents: '',
    Image: null,
  });

  const communityLoadable = useRecoilStateLoadable(communityState());
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
    () => () => {
      try {
        const newData = {
          ...community,
          user_id: user.id && String(user.id), // 유효한 ID로 변환
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

  useEffect(() => {
    if (communityLoadable.state === 'hasValue') {
      setCommunity(communityLoadable.contents);
    }
  }, [communityLoadable]);

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
                      <select name="category" className="form-select" value={community.category} onChange={changeBoard}>
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
                      <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/community')}>
                        취소
                      </button>{' '}
                      <button type="submit" className="btn btn-outline-secondary" onClick={insertCommunityEvent}>
                        입력
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
