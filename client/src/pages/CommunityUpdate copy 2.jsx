import React, { useState, useEffect } from 'react';
import { loginState } from '@recoils/login';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { communityListSelector } from '@recoils/Community';
import CommunityHeader from '../components/Community/CommunityHeader';

function CommunityUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const loginUser = useRecoilValue(loginState);

  // 로그인이 안되면 로그인페이지로 이동
  if (loginUser?.id === '' && loginUser?.email === '') navigate('/login');

  const user = useRecoilValue(loginState);
  const [community, setCommunity] = useState({
    id: Number(id),
    user_id: '',
    title: '',
    category: '',
    contents: '',
    Image: '',
  });

  const { getCommunityById, updateCommunity } = useRecoilValue(communityListSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버에서 데이터 가져오기
        const data = await getCommunityById(id);
        console.log('Fetched data:', data);
        setCommunity(data);
      } catch (error) {
        console.error('Error while fetching community data:', error);
      }
    };

    // 컴포넌트가 마운트될 때 데이터 가져오기
    fetchData();
  }, [id, getCommunityById]);

  const changeBoard = e => {
    const { name, value } = e.target;
    setCommunity(prevCommunity => ({ ...prevCommunity, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setCommunity(prevCommunity => ({ ...prevCommunity, Image: file }));
  };

  const handleSubmit = useRecoilCallback(
    ({ set }) =>
      async evt => {
        evt.preventDefault();
        try {
          // 제목과 내용이 비어있는지 확인
          if (!community.title || !community.contents) {
            alert('제목과 내용을 입력해주세요.'); // 또는 다른 사용자 피드백 방식 사용
            return;
          }
          // console.log(community);

          const newData = {
            ...community,
            user_id: user.id && String(user.id), // 유효한 ID로 변환
            category: getCategoryValue(community.category),
          };

          // id 값을 추가하여 업데이트 요청을 보냄(호출이 안 됨)
          await updateCommunity(newData);

          navigate('/community');
        } catch (error) {
          console.error('Error while updating community:', error);
        }
      },
    [community, updateCommunity, user.id, navigate],
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
                      <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-end">
                      <button type="submit" className="btn btn-outline-secondary" onClick={handleSubmit}>
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

export default CommunityUpdate;
