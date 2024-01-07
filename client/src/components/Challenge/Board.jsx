import React from 'react';
import styled from 'styled-components';
import BoardCard from './BoardCard';

const Board = () => {
  // 에러가 나서 임의로 변수명을 변경했습니다...!

  return (
    <CardWrapper className="row gap-x-2.5 card">
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
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
