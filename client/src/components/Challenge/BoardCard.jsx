import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const BoardCard = ({ id, image, title, start, end, created, reward }) => {
  const navigate = useNavigate();
  const getTimeFromDate = date => {
    if (date === null || date === undefined) return '알 수 없음';
    return date.substring(0, 10) + ' ' + date.substring(11, 19);
  };
  getTimeFromDate();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={image}
        style={{
          height: '18rem',
          objectFit: 'cover',
        }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{'기간: ' + getTimeFromDate(start) + '~' + getTimeFromDate(end)}</Card.Text>
        <Card.Text>{'생성일: ' + getTimeFromDate(created)}</Card.Text>
        <Card.Text>{'보상: ' + reward}</Card.Text>
        <Button
          variant="primary"
          onClick={() => {
            navigate(`/challenges/${id}`);
          }}>
          자세히 보기
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BoardCard;
