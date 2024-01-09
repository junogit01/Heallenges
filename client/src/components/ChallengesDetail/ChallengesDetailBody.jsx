import React from 'react';
import ChallengesDetailSideBar from './ChallengeDetailSideBar';

function ChallengesDetailBody() {
  return (
    <>
      <main id="main" style={{ marginTop: '30px' }}>
        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="row g-5">
              <div className="col-lg-9" data-aos="fade-up" data-aos-delay={200}>
                <div className="row gy-2 posts-list">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div className="mb-3" style={{ display: 'flex', justifyContent: 'flex-end' }}></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="card bg-light">
                    <h4>댓글</h4>
                  </div>
                </div>
              </div>
              <ChallengesDetailSideBar />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ChallengesDetailBody;
