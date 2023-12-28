import {Link} from 'react-router-dom';

function MyHeader() {
  return (
    // <!-- ======= Breadcrumbs ======= -->
    <div
      class="breadcrumbs d-flex align-items-center"
      style={{backgroundImage: "url('assets/img/about-header.jpg');"}}
    >
      <div class="container position-relative d-flex flex-column align-items-center">
        <h2>마이페이지</h2>
        <ol>
          <li>
            <Link to="/">메인</Link>
          </li>
          <li>마이페이지</li>
        </ol>
      </div>
    </div>
    // <!-- End Breadcrumbs -->
  );
}

export default MyHeader;
