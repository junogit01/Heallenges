import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Challenges.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRecoilValue } from 'recoil';
import { challengesMain, challengesListSelector } from '@recoils/challenge';

function Challenges() {
  const challengeList = useRecoilValue(challengesMain);
  const { getMainChallengeList } = useRecoilValue(challengesListSelector);

  useEffect(() => {
    getMainChallengeList();
  }, [getMainChallengeList]);

  return (
    <section id="recent-posts" className="recent-posts container-md">
      <div className="container">
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
          {challengeList?.data?.map(data => (
            <SwiperSlide key={data?.id}>
              <div className="card">
                <Link to={`/challenges/${data?.id}`}>
                  <img
                    src={data?.main_image}
                    className="card-img-top img-thumbnail"
                    alt="..."
                    style={{ height: '300px' }}
                  />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/challenges/${data?.id}`}>
                      {data?.title.length > 10 ? `${data?.title.slice(0, 15)}...` : data?.title}
                    </Link>
                  </h5>
                  <p className="card-text mb-3">
                    {data?.description.length > 35 ? `${data?.description.slice(0, 35)}...` : data?.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Challenges;
