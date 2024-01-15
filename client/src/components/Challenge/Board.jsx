import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardCard from './BoardCard';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { challengeSearchKeywordState } from '@recoils/challenge';
import { useRecoilValue } from 'recoil';

const Board = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const itemsPerPage = 9;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const searchKeyword = useRecoilValue(challengeSearchKeywordState);

  const getFilter = category => {
    if (category === null) return 'All';
    if (category === '운동') return 'Healthcare';
    if (category === '영양') return 'Nutrition';
    if (category === '취미') return 'Hobby';
  };
  const filter = getFilter(searchParams.get('category'));
  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8001/challenges`, {
          params: {
            category: selectedCategory !== 'all' ? selectedCategory : '',
          },
        });

        const filteredData = data.data[0].filter(el => {
          if (selectedCategory === 'all') {
            return true; // 전체 카테고리 선택 시 모든 데이터 반환
          } else {
            return el.type === selectedCategory; // 선택된 카테고리와 일치하는 데이터만 반환
          }
        });

        setList(filteredData);
      } catch (e) {
        console.error(e);
      }
    };
    getList();
  }, [selectedCategory]);

  const totalItems = list.length; // 총 항목 수

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const searchFilteredPosts = list.filter(data => {
    // 타이틀에서 키워드 검색
    const titleKeyword = data?.title.toLowerCase().includes(searchKeyword.toLowerCase());
    // 현재 페이지 범위에 속하는지 확인, 페이지네이션을 위함
    const isPageRange = list.indexOf(data) >= indexOfFirstItem && list.indexOf(data) < indexOfLastItem;

    return searchKeyword ? titleKeyword : isPageRange;
  });

  const handlePageChange = page => {
    setPage(page);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setPage(1);
  };

  return (
    <>
      <CardWrapper className="row gap-x-2.5 card">
        <div className="d-flex justify-content-end" style={{ maxHeight: '3rem' }}>
          <button className="btn btn-outline-secondary me-2 mb-2" onClick={() => handleCategoryChange('all')}>
            전체
          </button>
          <button className="btn btn-outline-secondary me-2 mb-2" onClick={() => handleCategoryChange('운동')}>
            운동
          </button>
          <button className="btn btn-outline-secondary me-2 mb-2" onClick={() => handleCategoryChange('영양')}>
            영양
          </button>
          <button className="btn btn-outline-secondary me-2 mb-2" onClick={() => handleCategoryChange('취미')}>
            취미
          </button>
          {/* 추가적인 카테고리 버튼을 여기에 추가 */}
        </div>
        {searchFilteredPosts.map(el => (
          <BoardCard
            key={el.id}
            id={el.id}
            image={el.main_image}
            title={el.title}
            start={el.start_date}
            end={el.end_date}
            created={el.created}
            reward={el.reward}
          />
        ))}
      </CardWrapper>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          activePage={page}
          itemsCountPerPage={9}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          hideFirstLastPages
        />
      </div>
    </>
  );
};

export default Board;

const CardWrapper = styled.div`
  min-height: 20rem;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;
