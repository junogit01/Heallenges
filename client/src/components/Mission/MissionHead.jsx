import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MissionHead() {
  const style = { textDecoration: 'none', color: 'black' };
  return (
    <Breadcrumb className="mb-4 mt-0">
      <Container
        fluid
        className="mb-4 d-flex align-items-center justify-content-center"
        style={{ backgroundImage: 'url("/images/blog-header.jpg")', height: '5rem', fontSize: '42px' }}>
        미션
      </Container>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="auto">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/mission/day" style={style}>
                    일일미션
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/mission/week" style={style}>
                    주간미션
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/mission/month" style={style}>
                    월간미션
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

export default MissionHead;
