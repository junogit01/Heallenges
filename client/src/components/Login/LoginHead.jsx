import { Link } from 'react-router-dom';

function LoginHeader() {
  return (
    // <!-- ======= Breadcrumbs ======= -->
    <div className="breadcrumbs d-flex align-items-center mt-5">
      <div
        className="container position-relative d-flex flex-column align-items-center justify-content-center"
        // style={{ backgroundImage: 'URL(images/about.jpg)', width: '100%', height: '500px', objectFit: 'fill' }}
      >
        <h1 className="fs-1">로그인</h1>
      </div>
    </div>
    // <!-- End Breadcrumbs -->
  );
}

export default LoginHeader;
