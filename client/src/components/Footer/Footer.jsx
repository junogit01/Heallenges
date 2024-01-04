import { Link } from 'react-router-dom';
import FooterModal from './FooterModal';

function Footer() {
  return (
    // <!-- Footer -->
    <footer className="text-center text-lg-start bg-body-tertiary text-muted mt-5">
      <section className="d-flex justify-content-lg-around p-4 border-bottom">
        <FooterModal />
      </section>
      <section className="">
        <div className="container text-center text-md-start mt-5 mb-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Heallenges
              </h6>
              <p>여러분의 모든 도전을 응원합니다.</p>
              <div>
                <a href="https://www.facebook.com" className="me-4 text-reset text-decoration-none">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.twitter.com" className="me-4 text-reset text-decoration-none">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="https://www.instagram.com" className="me-4 text-reset text-decoration-none">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">주요 서비스</h6>
              <p>
                <Link to="/challenges" className="text-reset text-decoration-none">
                  도전
                </Link>
              </p>
              <p>
                <Link to="/rank" className="text-reset text-decoration-none">
                  랭킹
                </Link>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">자주가는 사이트</h6>
              <p>
                <Link to="/community" className="text-reset text-decoration-none">
                  커뮤니티
                </Link>
              </p>
              <p>
                <Link to="/contact" className="text-reset text-decoration-none">
                  문의하기
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">찾아오시는 길</h6>
              <p>
                <i className="bi bi-house me-2"></i> 서울특별시 광진구 능동로 195-16 6층
              </p>
              <p>
                <i className="bi bi-envelope me-2"></i> contact@heallenges.com
              </p>
              <p>
                <i className="bi bi-phone me-2"></i> + 82 02 123 4567
              </p>
              <p>
                <i className="bi bi-printer me-2"></i> + 82 02 456 7891
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Copyright --> */}
      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright <span className="text-reset fw-bold">Heallenges</span>
      </div>
    </footer>
    // <!-- Footer -->
  );
}

export default Footer;
