import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <Link to="index.html" className="logo d-flex align-items-center">
                <span>Heallenges</span>
              </Link>
              <p>내용 삽입</p>
              <div className="social-links d-flex mt-3">
                <Link to="#" className="twitter">
                  <i className="bi bi-twitter"></i>
                </Link>
                <Link to="#" className="facebook">
                  <i className="bi bi-facebook"></i>
                </Link>
                <Link to="#" className="instagram">
                  <i className="bi bi-instagram"></i>
                </Link>
                <Link to="#" className="linkedin">
                  <i className="bi bi-linkedin"></i>
                </Link>
              </div>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bi bi-dash"></i> <Link to="#">Home</Link>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <Link to="#">About us</Link>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <Link to="#">Services</Link>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <Link to="#">Terms of service</Link>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <Link to="#">Privacy policy</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i className="bi bi-dash"></i> <Link to="/challenges">도전</Link>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <Link to="/community">커뮤니티</Link>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <Link to="/mission">미션</Link>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <Link to="/rank">랭킹</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>
                서울특별시 광진구 능동로 195-16 <br />
                6층 멀티캠퍼스 (세종대학교 김원관 6층)
                <br />
                대한민국 <br />
                <br />
                <strong>Call:</strong> +82 02-1111-1111
                <br />
                <strong>Email:</strong> contact@heallenges.com
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <div className="container">
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Heallenges</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
