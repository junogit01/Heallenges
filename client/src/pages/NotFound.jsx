import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div class="d-flex align-items-center justify-content-center vh-100">
      <div class="text-center">
        <h1 class="display-1 fw-bold">404</h1>
        <p class="fs-3">
          {' '}
          <span class="text-danger">이런!</span> 페이지가 존재하지 않습니다.
        </p>
        <p class="lead">페이지가 존재하지 않습니다. 지속적 발생시 문의하기로 문의 부탁드립니다..</p>
        <Link to="/" class="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
