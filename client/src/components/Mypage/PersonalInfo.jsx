import AOS from 'aos';
import 'aos/dist/aos';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';

function PersonalInfo() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <section id="about" className="container">
        <div className="container" data-aos="fade-up">
          <div className="row gy-4" data-aos="fade-up">
            <div className="col-lg-4">
              <img src="images/about.jpg" className="img-fluid" alt="" />
            </div>
            <div className="col-lg-8">
              <div className="content ps-lg-5">
                <table className="table ">
                  <tr>
                    <th>이름</th>
                    <td>이준호</td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td>test@test.com</td>
                  </tr>
                  <tr>
                    <th>비밀번호</th>
                    <td>*********</td>
                  </tr>
                  <tr>
                    <th>닉네임</th>
                    <td>아무개</td>
                  </tr>
                  <tr>
                    <th>생년월일</th>
                    <td>2023-12-27</td>
                  </tr>
                  <tr>
                    <th>자기소개</th>
                    <td>안녕하세요?</td>
                  </tr>
                  <tr>
                    <th>블로그</th>
                    <td>
                      <Link to="http://www.naver.com">블로그</Link>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan="2">주소</th>
                    <td>우편번호</td>
                  </tr>
                  <tr>
                    <td>도로명주소</td>
                  </tr>
                  <tr>
                    <th>가입일</th>
                    <td>2023-12-25</td>
                  </tr>
                  <tr>
                    <th>점수</th>
                    <td>10000</td>
                  </tr>
                </table>
                <div className="mt-20">
                  <button type="button" className="btn btn-outline-primary">
                    수정하기
                  </button>
                  <button type="button" className="btn btn-outline-primary">
                    수정완료
                  </button>
                  <button type="button" className="btn btn-outline-danger">
                    회원탈퇴
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PersonalInfo;
