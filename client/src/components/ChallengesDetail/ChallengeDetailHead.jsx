import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchKeywordState } from '@recoils/rank';

function ChallengesDetailHead() {
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   // Recoil 상태 업데이트
  //   setSearchKeyword(e.target.value);
  // };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <div className="text-center mx-auto mb-4 " style={{ width: 'fit-content' }}>
          <p className="navbar-brand " style={{ fontSize: '36px', wordSpacing: '17rem' }}>
            &nbsp;도전
          </p>
        </div>
        <div className="d-flex justify-content-end">
          <form className="d-flex " style={{ width: '20rem', marginTop: '7rem', marginRight: '1.5rem' }}>
            <input
              className="form-control"
              type="search"
              placeholder="이름을 입력해 주세요"
              aria-label="Search"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              style={{ width: '30rem' }}
            />
            <i class="bi bi-search" style={{ fontSize: '2rem', marginLeft: '-4rem' }}></i>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default ChallengesDetailHead;
