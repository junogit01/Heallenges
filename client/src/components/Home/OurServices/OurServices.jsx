import { Link } from 'react-router-dom';

function OurServices() {
  return (
    <section id="services-list" className="services-list container-md">
      <div className="container">
        <div className="section-header d-flex justify-content-center mb-5 mt-5">
          <h2>제공 서비스</h2>
        </div>

        <div className="row gy-5">
          <div className="col-lg-4 col-md-6 service-item d-flex ">
            <div className="icon flex-shrink-0 d-flex justify-content-center me-3">
              <i className="bi bi-trophy fs-1 " style={{ color: '#f57813' }}></i>
            </div>
            <div>
              <h4 className="title d-flex">
                <Link to="/challenges" className="text-decoration-none">
                  도전
                </Link>
              </h4>
              <p className="description">항상 작심삼일로 끝나지 않았나요? 우리 함께해요.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 service-item d-flex">
            <div className="icon flex-shrink-0 d-flex justify-content-center me-3">
              <i className="bi bi-people fs-1" style={{ color: '#15a04a' }}></i>
            </div>
            <div>
              <h4 className="title d-flex">
                <Link to="/community" className="text-decoration-none">
                  커뮤니티
                </Link>
              </h4>
              <p className="description">많은 사람과 이야기를 나눠보며 다양한 얘기를 해보세요.</p>
            </div>
          </div>
          {/* <!-- End Service Item --> */}
          <div className="col-lg-4 col-md-6 service-item d-flex">
            <div className="icon flex-shrink-0 me-3">
              <i className="bi bi-list-stars fs-1" style={{ color: '#15bfbc' }}></i>
            </div>
            <div>
              <h4 className="title">
                <Link to="/rank" className="text-decoration-none">
                  랭킹
                </Link>
              </h4>
              <p className="description">함께 경쟁하며 성장할 수 있도록 해요</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OurServices;
