import {Link} from 'react-router-dom';

function LoginHeader() {
  return (
    // <!-- ======= Breadcrumbs ======= -->
    <div className="breadcrumbs d-flex align-items-center">
      <div className="container position-relative d-flex flex-column align-items-center">
        <h2>로그인</h2>
        <ol>
          <li>
            <Link to="/">메인</Link>
          </li>
        </ol>
      </div>
    </div>
    // <!-- End Breadcrumbs -->
  );
}

export default LoginHeader;
