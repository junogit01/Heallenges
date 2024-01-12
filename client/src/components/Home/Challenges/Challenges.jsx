import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Challenges.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRecoilValue } from 'recoil';
import { challengesListState, challengesListSelector, challengesState } from '@recoils/challenge';

function Challenges() {
  const challengeList = useRecoilValue(challengesListState);
  const {
    getChallengeList,
    // getChallengeDetail,
    // getChallengeBoardList,
    // updateChallengeBoard,
    // insertChallengeBoardComment,
    // deleteChallengeBoardComment,
  } = useRecoilValue(challengesListSelector);

  const challengeState = useEffect(() => {
    getChallengeList(1, 5);
  }, []);

  return (
    <section id="recent-posts" className="recent-posts">
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
          {challengeList?.data?.[0]?.map(data => (
            <SwiperSlide key={data?.id}>
              <div className="card">
                <img
                  src={data?.main_image}
                  className="card-img-top img-thumbnail"
                  alt="..."
                  style={{ height: '300px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{data?.title}</h5>
                  <p className="card-text">{data?.description}</p>
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
