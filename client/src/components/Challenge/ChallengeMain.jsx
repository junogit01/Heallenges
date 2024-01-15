import React from 'react';
import styled from 'styled-components';
import Board from './Board.jsx';
import ChallengeMainSidebar from './ChallengeMainSidebar.jsx';

const ChallengeMain = () => {
  return (
    <Wrapper>
      <Main id="main">
        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="row g-5">
              <div className="col-lg-9" data-aos="fade-up" data-aos-delay={200}>
                <div className="row gy-2 posts-list">
                  <Board />
                </div>
              </div>
              <ChallengeMainSidebar />
            </div>
          </div>
        </section>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 50px 0;
`;

const Main = styled.main`
  width: 90vw;
  margin-top: 30px;
`;
export default ChallengeMain;
