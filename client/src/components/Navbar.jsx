import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginState } from '@recoils/login';
import { useRecoilValue, useRecoilCallback, useSetRecoilState } from 'recoil';
import ContactModal from './Modal/ContactModal';

function NavHeader() {
  const [isLogin, setIslogin] = useState(false);
  const loginUser = useRecoilValue(loginState);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser?.id === '' && loginUser?.email === '' && loginUser?.name === '') setIslogin(false);
    else return setIslogin(true);
  }, [loginUser]);

  const setLoginUser = useSetRecoilState(loginState);
  const localStorage = window.localStorage;

  const logout = () => {
    setLoginUser({ name: '', email: '', id: '' });
    localStorage.removeItem('login/loginState');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="images/ci_heallenges_02.png" alt="" style={{ width: '170px', height: '30px' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Heallenges
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body align-items-center">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 ">
                <li className="nav-item"></li>
                <li className="nav-item">
                  <Link className="nav-link me-5" to="/challenges">
                    챌린지
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-5" to="/community">
                    커뮤니티
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link me-5" to="/rank">
                    랭킹
                  </Link>
                </li>
                {isLogin ? (
                  <li className="nav-item dropdown ">
                    <Link
                      className="nav-link dropdown-toggle me-5"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      더보기
                    </Link>
                    <ul className="dropdown-menu me-5">
                      <li>
                        <Link className="dropdown-item" to={'/mypage/' + loginUser?.id}>
                          마이페이지
                        </Link>
                      </li>
                      <li>
                        <ContactModal />
                      </li>

                      <li>
                        <Link className="dropdown-item" to="/" onClick={logout}>
                          로그아웃
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  // 로그인 상태가 아닌 경우 더보기 메뉴를 표시하지 않음
                  <div className="d-flex align-items-center">
                    <Link to="/login" className="nav-link me-5">
                      로그인
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavHeader;
