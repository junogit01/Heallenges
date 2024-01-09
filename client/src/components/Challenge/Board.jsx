import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardCard from './BoardCard';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
const Board = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [list, setList] = useState([]);

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
        const { data } = await axios.get(`http://localhost:8001/challenges`);
        if (filter === 'All') setList(data.data[0] ?? []);
        else setList(data.data[0].filter(el => el.type === filter) ?? []);
      } catch (e) {
        console.error(e);
      }
    };
    getList();
  }, [filter]);
  return (
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
  );
};

export default Board;

const CardWrapper = styled.div`
  width: 100%;
  min-height: 40rem;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;
