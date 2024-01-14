import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from '@recoils/login';
import { challengeSearchKeywordState } from '@recoils/challenge';

const ChallengeMainSidebar = () => {
  const [user, setUser] = useRecoilState(loginState);
  const [id, setId] = useState(0);
  const navigate = useNavigate();

  // 리코일에 검색 입력값 저장
  const [searchKeyword, setSearchKeyword] = useRecoilState(challengeSearchKeywordState);
  const [inputsearchValues, setInputsearchValues] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setSearchKeyword(inputsearchValues);
    setInputsearchValues('');
  };
  const handleChange = e => {
    setInputsearchValues(e.target.value);
  };
  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트 될 때 검색어 초기화
      setSearchKeyword('');
    };
  }, [setSearchKeyword]);

  const handleLink = (user, id) => {
    if (!user?.email) {
      alert('로그인이 필요한 서비스입니다.');
      navigate(`/login`);
    } else navigate(`/challenges/add`); // ${id}가 왜 사용했는지 확인 요망
    // navigate(`/challenges/${id}`);
  };

  return (
    <div className="col-lg-3">
      {/* Search widget */}
      <form className="card mb-4" onSubmit={handleSubmit}>
        <div className="card-header">검색</div>
        <div className="card-body">
          <div className="input-group" onSubmit={handleSubmit}>
            <input
              type="search"
              className="form-control"
              placeholder="검색할 도전을 작성해주세요"
              aria-label="Enter search term..."
              value={inputsearchValues}
              onChange={handleChange}
            />
            <button className="btn btn-primary" type="submit">
              검색
            </button>
          </div>
        </div>
      </form>

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
