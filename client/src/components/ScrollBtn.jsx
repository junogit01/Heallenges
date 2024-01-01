import React, { useState, useEffect } from 'react';
import './ScrollBtn.css';
function ScrollBtn() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div className="scroll__container">
        <button id="top" onClick={scrollToTop} type="button">
          <i class="bi bi-arrow-up"></i>
        </button>
      </div>
    )
  );
}

export default ScrollBtn;
