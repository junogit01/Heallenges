import {Link} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos';
import React, {useEffect, useState} from 'react';

function Hero() {
  useEffect(() => {
    AOS.init();
  }, []);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-4">
            <h2 data-aos="fade-up">Focus On Your Challenges</h2>
            <blockquote data-aos="fade-up" data-aos-delay="100">
              <p>올해는 도전해보세요</p>
            </blockquote>
            {isLogin ? (
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                <Link to="/challenges" className="btn-get-started">
                  도전하러가기
                </Link>
              </div>
            ) : (
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                <Link to="/login" className="btn-get-started">
                  로그인
                </Link>
                <Link to="/signup" className="glightbox btn-watch-video d-flex align-items-center">
                  <i className="bi bi-arrow-right-short"></i>
                  <span>회원가입</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
