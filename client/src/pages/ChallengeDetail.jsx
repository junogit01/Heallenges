
import styled from 'styled-components';

import ChallengeAdd from '@components/Challenge/ChallengeAdd';


function ChallengeDetail() {
  

  return (
    <Wrapper>
      <Title>도전 생성</Title>
      <InnerWrapper>
        <ChallengeAdd  />
      </InnerWrapper>
    </Wrapper>
  );
}
export default ChallengeDetail;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 3rem;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;
const InnerWrapper = styled.div`
  width: 60vw;
  height: 80%;
`;


