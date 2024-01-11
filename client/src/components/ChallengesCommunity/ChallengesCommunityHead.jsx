import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchKeywordState } from '@recoils/rank';
import { challengesState } from '@recoils/challenge';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { challengesListSelector } from '@recoils/challenge';

function ChallengesCommunityHead() {
  const { id } = useParams();
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);

  const challengesBoard = useRecoilValue(challengesState);
  const { getChallengeDetail } = useRecoilValue(challengesListSelector);
  // console.log(id);
  // console.log(challengesBoard);

  useEffect(() => {
    getChallengeDetail(id);
  }, [id]);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <div className="text-center mx-auto mb-4 " style={{ width: 'fit-content' }}>
          <p className="navbar-brand " style={{ fontSize: '36px', justifyContent: 'center' }}>
            {challengesBoard[0]?.title}
          </p>
        </div>
        {/* <div className="d-flex justify-content-end">
          <form className="d-flex " style={{ width: '20rem', marginTop: '7rem', marginRight: '1.5rem' }}>
            <input
              className="form-control"
              type="search"
              placeholder="을 입력해 주세요"
              aria-label="Search"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              style={{ width: '30rem' }}
            />
            <i className="bi bi-search" style={{ fontSize: '2rem', marginLeft: '-4rem' }}></i>
          </form>
        </div> */}
      </div>
    </nav>
  );
}

export default ChallengesCommunityHead;
