import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MissionBody() {
  const navigate = useNavigate();
  const [mission, setMission] = useState({
    status: '',
    message: '',
    pageno: 1,
    pagesize: 7,
    total: 0,
    totalPage: 1,
    data: [],
  });

  const getMission = useCallback(async (no = 1, size = 6) => {
    const resp = await axios.get('http://localhost:8001/mission/day', { params: { no, size } });
    setMission(resp.data);
  }, []);

  useEffect(() => {
    getMission();
  }, [getMission]);

  return (
    <section id="blog" className="blog">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
            {/* <div className="row gy-5 posts-list"> */}
            <div className="col-lg-4">
              <div className="mission-items-container">
                {mission.data.map(list => (
                  <article key={list.id} className="d-flex flex-column mission-item">
                    <div className="post-img">
                      <img
                        src="/images/blog/blog-1.jpg"
                        alt=""
                        onClick={() => {
                          navigate('/mission/detail');
                        }}
                        className="img-fluid"
                        style={{ cursor: 'pointer' }}
                      />
                    </div>

                    <h2 className="title">
                      <Link to="/mission/detail">{list.title}</Link>
                    </h2>

                    <div className="meta-top">
                      <ul>
                        <li className="d-flex align-items-center">
                          <i className="bi bi-person"></i>활동포인트 : {list.reward}
                        </li>
                        <li className="d-flex align-items-center">
                          <i className="bi bi-clock"></i>
                          {list.mission_type}
                        </li>
                        <li className="d-flex align-items-center">
                          <i className="bi bi-chat-dots"></i> <a href="blog-details.html">12 Comments</a>
                        </li>
                      </ul>
                    </div>

                    <div className="content">
                      <p>{list.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="blog-pagination">
              <ul className="justify-content-center">
                <li>
                  <a href="#">1</a>
                </li>
                <li className="active">
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
              </ul>
            </div>
            {/* <!-- End blog pagination --> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionBody;
