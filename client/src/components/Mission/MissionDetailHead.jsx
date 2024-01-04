import React from 'react';
import { Breadcrumb, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MissionDetailHead() {
  const style = { textDecoration: 'none', color: 'black' };

  return (
    <Breadcrumb className="mb-4 mt-0">
      <Container
        fluidBreadcrumb
        className="mb-4 d-flex align-items-center justify-content-center"
        style={{ backgroundImage: 'url("/images/blog-header.jpg")', height: '5rem', fontSize: '42px' }}>
        미션 상세페이지
      </Container>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="auto">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/mission" style={style}>
                    목록으로
                  </Link>
                </li>
              </ol>
            </nav>
          </Col>
        </Row>
      </Container>
    </Breadcrumb>
  );
}

export default MissionDetailHead;
