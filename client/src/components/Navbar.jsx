// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function NavHeader() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">Heallenges</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav align-items-right">
//           <Nav className="me-auto">
//             <Nav.Link href="/">메인</Nav.Link>
//             <Nav.Link href="/challenges">도전</Nav.Link>
//             <Nav.Link href="/challenges">미션</Nav.Link>
//             <Nav.Link href="/challenges">랭킹</Nav.Link>
//             <NavDropdown title="더보기" id="basic-nav-dropdown">
//               <NavDropdown.Item href="/mypage">마이페이지</NavDropdown.Item>
//               <NavDropdown.Item href="/contact">문의하기</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="/">로그아웃</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function NavHeader() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      {['xl'].map(expand => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary">
          <Container fluid className="align-items-center">
            <Navbar.Brand href="/" className="fs-4 fw-bold me-5 align-items-center text-primary">
              {'    '}
              <img
                src="images/Heallenges-logo-black-trophy-500.png"
                alt=""
                style={{ width: '250px', height: '70px' }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>더보기</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="align-items-center">
                <Nav className="justify-content-evenly flex-grow-1 pe-3 align-items-center">
                  <Link to="/" className="fs-5 text-decoration-none text-body-secondary">
                    메인
                  </Link>
                  <Link to="/challenges" className="fs-5 text-decoration-none text-body-secondary">
                    도전
                  </Link>
                  <Link to="/community" className="fs-5 text-decoration-none text-body-secondary">
                    커뮤니티
                  </Link>
                  <Link to="/mission" className="fs-5 text-decoration-none text-body-secondary">
                    미션
                  </Link>
                  <Link to="/rank" className="fs-5 text-decoration-none text-body-secondary">
                    랭킹
                  </Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3 me-10 align-items-center">
                  {isLogin ? (
                    <NavDropdown
                      title="더보기"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                      className="me-5 justify-content-center">
                      <LinkContainer to="/mypage" className=" fs-5 text-center">
                        <Nav.Link>마이페이지</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/contact" className="fs-5 text-center">
                        <Nav.Link>문의하기</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/" className="fs-5 text-center">
                        <Nav.Link>로그아웃</Nav.Link>
                      </LinkContainer>
                    </NavDropdown>
                  ) : (
                    // 로그인 상태가 아닌 경우 더보기 메뉴를 표시하지 않음
                    <div className="d-flex align-items-center">
                      <Link to="/login" className="fs-5 text-decoration-none text-body-secondary me-4">
                        로그인
                      </Link>
                      <Link to="/signup" className="fs-5 text-decoration-none text-body-secondary">
                        회원가입
                      </Link>
                    </div>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {/* <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand me-2" href="">
            <img
              src="images/Heallenges-logo-black-trophy-500.png"
              height="16"
              alt="Heallenges Logo"
              loading="lazy"
              style={{ width: '200px', height: '90px' }}
            />
          </a>

          <button
            data-mdb-collapse-init
            class="navbar-toggler"
            type="button"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarButtonsExample">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item d-flex">
                <Link to="/" className="nav-link">
                  메인
                </Link>
                <Link className="nav-link" href="/challenges">
                  도전
                </Link>
                <a className="nav-link" href="#">
                  Dashboard
                </a>
                <a className="nav-link" href="#">
                  Dashboard
                </a>
              </li>
            </ul>

            <div class="d-flex align-items-center">
              <button data-mdb-ripple-init type="button" class="btn btn-link px-3 me-2">
                Login
              </button>
              <button data-mdb-ripple-init type="button" class="btn btn-primary me-3">
                Sign up for free
              </button>
            </div>
          </div>
        </div>
      </nav> */}
    </>
  );
}

export default NavHeader;
