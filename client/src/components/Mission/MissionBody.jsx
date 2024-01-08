<<<<<<< HEAD
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function MissionBody() {
  const navigate = useNavigate();
  const [mission, setMission] = useState({
    status: '',
    message: '',
    pageno: 1,
    pagesize: 7,
    total: 0,
    totalPage: 1,
    data: [],
  });

  const getMission = useCallback(async (no = 1, size = 6) => {
    const resp = await axios.get('http://localhost:8001/mission', { params: { no, size } });
    setMission(resp.data);
  }, []);

  useEffect(() => {
    getMission();
  }, [getMission]);
  return (
    <div className="mb-5 d-flex justify-content-around ms-5 me-5">
      <div className="row">
        {mission.data.map((mission, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card style={{ width: '18rem', height: '30rem' }}>
              <Card.Img
                variant="top"
                src="/images/blog/blog-1.jpg"
                onClick={() => {
                  navigate('/mission/detail');
                }}
                style={{ cursor: 'pointer' }}
              />
              <Card.Body>
                <Card.Title>
                  <Link to="/mission/detail">{mission.title}</Link>
                </Card.Title>
                <Card.Text>
                  <Link to="/mission/detail">{mission.description}</Link>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <i className="bi bi-person"></i> 활동포인트 : {mission.reward}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="bi bi-clock"></i> {mission.mission_type}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MissionBody;
=======

>>>>>>> ae5b2aaeb362f3bfd922a4c32732c346ec0b7b89
