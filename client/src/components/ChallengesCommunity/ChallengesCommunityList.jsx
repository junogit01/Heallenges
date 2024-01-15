import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { challengesBoardListState, challengesListSelector } from '@recoils/challenge';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import one from '../ChallengesCommunityDetail/Paging.module.css';
import { loginState } from '@recoils/login';
import { challengesSearchKeywordState } from '@recoils/challenge';

function ChallengesCommunityList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const boardList = useRecoilValue(challengesBoardListState);
  const { getChallengeBoardList } = useRecoilValue(challengesListSelector);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const searchKeyword = useRecoilValue(challengesSearchKeywordState);

  const loginUser = useRecoilValue(loginState);
  if (!loginUser.id && !loginUser.email) navigate('/login');

  const searchBoardList = boardList.filter(data => data?.title.toLowerCase().includes(searchKeyword.toLowerCase()));
  useEffect(() => {
    getChallengeBoardList(id);
  }, [id, getChallengeBoardList]);

  const filteredBoardList = searchBoardList.filter(data => {
    return selectedCategory === 'all' || data?.category === selectedCategory;
  });

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setPage(1);
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 항목 수
  const totalItems = filteredBoardList.length; // 총 항목 수

  const handlePageChange = page => {
    setPage(page);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentList = filteredBoardList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="card mb-4">
        <div className="mt-3 d-flex ms-3 me-3">
          <h3 className="me-auto">게시판 목록</h3>
          <button className="btn btn-outline-secondary me-2 mb-2" onClick={() => handleCategoryChange('all')}>
            전체
          </button>
          <button className="btn btn-outline-secondary me-2 mb-2" onClick={() => handleCategoryChange('공지사항')}>
            공지사항
          </button>
          <button className="btn btn-outline-secondary me-2 mb-2" onClick={() => handleCategoryChange('자유')}>
            자유
          </button>
          <button className="btn btn-outline-secondary me-2 mb-2" onClick={() => handleCategoryChange('인증')}>
            인증
          </button>
          {/* 추가적인 카테고리 버튼을 여기에 추가 */}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th className="text-center">카테고리</th>
              <th className="text-center">제목</th>
              <th className="text-center">글쓴이</th>
              <th className="text-center">게시일</th>
              <th className="text-center">조회수</th>
            </tr>
          </thead>
          <tbody>
            {currentList.map(data => (
              <tr key={data?.id}>
                <td className="text-center">{data?.id}</td>
                <td className="text-center">{data?.category}</td>
                <td className="text-center">
                  <Link to={`/challenges/${id}/board/${data?.id}`}>
                    {data?.title.length > 15 ? `${data?.title.slice(0, 15)}...` : data?.title}
                  </Link>
                </td>
                <td className="text-center">{data?.nickname}</td>
                <td className="text-center">{data?.created}</td>
                <td className="text-center">{data?.view_cnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalItems}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
            innerClass={one.pagination}
          />
        </div>
      </div>
    </>
  );
}

export default ChallengesCommunityList;
