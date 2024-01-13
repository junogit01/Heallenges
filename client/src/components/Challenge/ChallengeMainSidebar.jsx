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
      {/* Categories widget */}
      <div className="cursor-pointer card mb-4">
        <div className="card-header">카테고리</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <ul className="list-unstyled mb-0">
                <li>
                  <Link
                    onClick={removeCategoryQuery}
                    style={{ textDecoration: 'underline', color: '#0d6efd', cursor: 'pointer' }}>
                    {/* <Link to="/community">전체 도전</Link> */}
                    전체 도전
                  </Link>
                </li>
                <li>{/* <Link to="/community/notice">공지사항</Link> */}</li>
                <li>
                  <Link
                    onClick={() => {
                      setCategoryQuery('Healthcare');
                    }}
                    style={{ textDecoration: 'underline', color: '#0d6efd', cursor: 'pointer' }}>
                    {/* <Link to="/community/notice">운동</Link> */}
                    운동
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setCategoryQuery('Nutrition');
                    }}
                    style={{ textDecoration: 'underline', color: '#0d6efd', cursor: 'pointer' }}>
                    {/* <Link to="/community/free">영양</Link> */}
                    영양
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setCategoryQuery('Hobby');
                    }}
                    style={{ textDecoration: 'underline', color: '#0d6efd', cursor: 'pointer' }}>
                    {/* <Link to="/community/qna">취미</Link> */}
                    취미
                  </Link>
                </li>
              </ul>
            </div>
          </div>
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
