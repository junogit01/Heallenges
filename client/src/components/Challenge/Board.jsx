import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardCard from './BoardCard';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const Board = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [list, setList] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  console.log(category);
  console.log(list);
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
            category: category ? category : '',
          },
        });

        setList(data.data[0]);
        // if (filter === 'All') setList(data.data[0] ?? []);
        // else setList(data.data[0].filter(el => el.type === filter) ?? []);
      } catch (e) {
        console.error(e);
      }
    };
    getList();
  }, [category]);

  const totalItems = list.length; // 총 항목 수

  // 현재 페이지에 해당하는 항목들 계산
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  // const handlePageChange = page => {
  //   setCurrentPage(page);
  // };

  return (
    <>
      <CardWrapper className="row gap-x-2.5 card">
        {list.map(el => (
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
        {/* <Pagination
          activePage={currentPage}
          itemsCountPerPage={9}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          hideFirstLastPages
        /> */}
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
