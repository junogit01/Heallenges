import { useCallback, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { loginState } from '@recoils/login';
import { useRecoilValue, useRecoilCallback, useSetRecoilState } from 'recoil';

function NavHeader() {
  const [isLogin, setIslogin] = useState(false);
  const loginUser = useRecoilValue(loginState);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser?.id === '' && loginUser?.email === '' && loginUser?.name === '') setIslogin(false);
    else return setIslogin(true);
  }, [loginUser]);

  const setLoginUser = useSetRecoilState(loginState);
  const localStorage = window.localStorage;

  const logout = () => {
    setLoginUser({ name: '', email: '', id: '' });
    localStorage.removeItem('login/loginState');
    localStorage.removeItem('user');
    navigate('/');
  };
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
                      <LinkContainer to={'/mypage/' + loginUser?.id} className=" fs-5 text-center">
                        <Nav.Link>마이페이지</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/contact" className="fs-5 text-center">
                        <Nav.Link>문의하기</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/" className="fs-5 text-center">
                        <Nav.Link onClick={logout}>로그아웃</Nav.Link>
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
    </>
  );
}

export default NavHeader;
