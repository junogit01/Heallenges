import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Challenges.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Challenges() {
  return (
    <section id="recent-posts" className="recent-posts">
      <div className="container" data-aos="fade-up">
        <div className="section-header d-flex justify-content-center mb-5 mt-5">
          <h2>최근 개설된 도전</h2>
        </div>
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          freeMode={true}
          centeredSlides={true}
          height={50}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="mySwiper">
          <SwiperSlide className="mb-5">
            <div className="card" style={{}}>
              <img src="images/cards-1.jpg" className="card-img-top" alt="..." style={{ height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to="/challenge/:id" className="text-decoration-none">
                    한강 러닝 메이트를 모집합니다
                  </Link>
                </h5>
                <p className="card-text">
                  <Link to="/challenge/:id" className="text-decoration-none">
                    한강에서 같이 달리실 분을 모집합니다
                  </Link>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img src="images/cards-2.jpg" className="card-img-top" alt="..." style={{ height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to="/challenge/:id" className="text-decoration-none">
                    시흥 앞바다 산책 하실분을 모집합니다
                  </Link>
                </h5>
                <p className="card-text">
                  <Link to="/challenge/:id" className="text-decoration-none">
                    시흥 앞바다에서 같이 산책하실 분을 모집합니다
                  </Link>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img src="images/cards-3.jpg" className="card-img-top" alt="..." style={{ height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to="/challenge/:id" className="text-decoration-none">
                    식습관 개선 프로젝트
                  </Link>
                </h5>
                <p className="card-text">
                  <Link to="/challenge/:id" className="text-decoration-none">
                    식습관 개선을 위해 노력하실 분을 모집합니다
                  </Link>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img src="images/cards-4.jpg" className="card-img-top" alt="..." style={{ height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to="/challenge/:id" className="text-decoration-none">
                    김포 카페 탐방기
                  </Link>
                </h5>
                <p className="card-text">
                  <Link to="/challenge/:id" className="text-decoration-none">
                    김포 및 인근지역에서 같이 카페를 탐방하실 분을 모집합니다
                  </Link>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img src="images/blog/blog-recent-5.jpg" className="card-img-top" alt="..." style={{ height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Challenges;
