import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SwiperImages.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
function SwiperImages() {
  return (
    <>
      {/* <!-- ======= Intro Section ======= --> */}
      <div className="intro intro-carousel swiper position-relative">
        <Swiper
          slidesPerView={1}
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
          <SwiperSlide>
            <img src="images/Heallenges-logo-black.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/main1.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/main2.png" alt="" />
          </SwiperSlide>
        </Swiper>
        <div className="swiper-pagination"></div>
      </div>
      {/* <!-- End Intro Section --> */}
    </>
  );
}

export default SwiperImages;
