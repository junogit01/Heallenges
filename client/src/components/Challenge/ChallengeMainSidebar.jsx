import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from '@recoils/login';

const ChallengeMainSidebar = () => {
  const [user, setUser] = useRecoilState(loginState);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLink = (user, id) => {
    if (!user?.email) {
      alert('로그인이 필요한 서비스입니다.');
      navigate(`/login`);
    } else navigate(`/challenges/add`); // ${id}가 왜 사용했는지 확인 요망
    // navigate(`/challenges/${id}`);
  };
  const removeCategoryQuery = () => {
    searchParams.delete('category');
    setSearchParams(searchParams);
  };
  const setCategoryQuery = value => {
    searchParams.set('category', value);
    setSearchParams(searchParams);
  };
  return (
    <div className="col-lg-3">
      {/* Search widget */}
      <div className="card mb-4">
        <div className="card-header">검색</div>
        <div className="card-body">
          <form action="" className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="검색할 내용을 작성해주세요"
              aria-label="Enter search term..."
            />
            <button className="btn btn-primary" type="submit">
              검색
            </button>
          </form>
        </div>
      </div>

      {/* Side widget */}
      {/* <div className="card mb-4">
        <div className="card-header">Side Widget</div>
        <div className="card-body">
          You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5
          card component!
        </div>
      </div> */}

      {/* Write post widget */}
      <div className="card mb-4">
        <div className="card-header">도전 생성</div>
        <div
          className="card-body"
          onClick={() => {
            handleLink(user, id);
            setId(id + 1);
          }}>
          <div className="btn btn-primary">도전 생성</div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeMainSidebar;
