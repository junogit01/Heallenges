import React from 'react';
import styled from 'styled-components';
import ChallengeMain from '@components/Challenge/ChallengeMain';

function Challenges() {
  return (
    <Wrapper>
      <Title>도전</Title>
      <ChallengeMain />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 50px 0;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
`;
export default Challenges;
