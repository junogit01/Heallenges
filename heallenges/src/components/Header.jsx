import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Header() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const selectHeader = document.querySelector("#header");
      if (selectHeader) {
        window.scrollY > 100
          ? selectHeader.classList.add("sticked")
          : selectHeader.classList.remove("sticked");
      }
    };

    document.addEventListener("scroll", handleScroll);

    // Cleanup 함수 등록
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mobile nav toggle
  const mobileNavToggle = () => {
    const mobileNavShow = document.querySelector(".mobile-nav-show");
    const mobileNavHide = document.querySelector(".mobile-nav-hide");

    if (mobileNavShow && mobileNavHide) {
      document.body.classList.toggle("mobile-nav-active");
      mobileNavShow.classList.toggle("d-none");
      mobileNavHide.classList.toggle("d-none");
    }
  };

  // Toggle mobile nav dropdowns
  useEffect(() => {
    const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");

    const handleDropdownClick = (event) => {
      if (mobileNavActive) {
        event.preventDefault();
        event.target.classList.toggle("active");
        event.target.nextElementSibling.classList.toggle("dropdown-active");

        let dropDownIndicator = event.target.querySelector(
          ".dropdown-indicator"
        );
        dropDownIndicator.classList.toggle("bi-chevron-up");
        dropDownIndicator.classList.toggle("bi-chevron-down");
      }
    };

    navDropdowns.forEach((el) => {
      el.addEventListener("click", handleDropdownClick);
    });

    // Cleanup 함수 등록
    return () => {
      navDropdowns.forEach((el) => {
        el.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [mobileNavActive]);

  return (
    <header
      id="header"
      className={`header d-flex align-items-center fixed-top ${
        mobileNavActive ? "mobile-nav-active" : ""
      }`}
    >
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          {/* <!-- <img src="assets/img/logo.png" alt=""> --> */}
          <h1 className="d-flex align-items-center">Heallenges</h1>
        </Link>

        <i
          className="mobile-nav-toggle mobile-nav-show bi bi-list"
          onClick={mobileNavToggle}
        ></i>
        <i
          className={`mobile-nav-toggle mobile-nav-hide d-none bi bi-x`}
          onClick={mobileNavToggle}
        ></i>

        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <Link to="/" className="active">
                메인
              </Link>
            </li>
            <li>
              <Link to="/challenges">도전</Link>
            </li>
            <li>
              <Link to="/community">커뮤니티</Link>
            </li>
            <li>
              <Link to="/mission">미션</Link>
            </li>
            <li>
              <Link to="/rank">랭킹</Link>
            </li>
            {isLogin ? (
              <li className="dropdown">
                <Link to="#">
                  <span>더보기</span>{" "}
                  <i className="bi bi-chevron-down dropdown-indicator"></i>
                </Link>
                <ul>
                  <li>
                    <Link to="/mypage">마이 페이지</Link>
                  </li>
                  <li>
                    <Link to="/contact">문의하기</Link>
                  </li>
                  <li>
                    <Link to="/">로그아웃</Link>
                  </li>
                </ul>
              </li>
            ) : // 로그인 상태가 아닌 경우 더보기 메뉴를 표시하지 않음
            null}
          </ul>
        </nav>
        {/* <!-- .navbar --> */}
      </div>
    </header>
  );
}

export default Header;
