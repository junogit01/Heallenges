import React, { useEffect } from "react";

// 함수형 컴포넌트
const ScrollTopButton = () => {
  useEffect(() => {
    const scrollTop = document.querySelector(".scroll-top");

    if (scrollTop) {
      const toggleScrollTop = () => {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      };

      window.addEventListener("load", toggleScrollTop);
      document.addEventListener("scroll", toggleScrollTop);

      scrollTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // cleanup 함수 등록
      return () => {
        window.removeEventListener("load", toggleScrollTop);
        document.removeEventListener("scroll", toggleScrollTop);
      };
    }
  }, []); // useEffect의 두 번째 인자로 빈 배열을 전달하여 마운트, 언마운트 시에만 실행되도록 함

  return (
    <div className="scroll-top d-flex align-items-center justify-content-center">
      <i className="bi bi-arrow-up-short"></i>
    </div>
  );
};

export default ScrollTopButton;
