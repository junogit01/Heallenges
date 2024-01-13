import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BoardCard = ({ id, image, title, start, end, created, reward }) => {
  const navigate = useNavigate();
  const getTimeFromDate = date => {
    if (date === null || date === undefined) return '알 수 없음';

    // 수정된 부분: 'yy-mm-dd' 형식으로 변경
    const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: 'long',
      day: 'numeric',
    });

    return formattedDate;
  };
  return (
    <div
      className="card"
      style={{ width: '18rem', maxHeight: '20rem', cursor: 'pointer' }}
      onClick={() => {
        navigate(`/challenges/${id}`);
      }}>
      <img style={{ cursor: 'pointer' }} src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
      <ul className="list-group list-group-flush ">
        <li className="list-group mx-3">미션 기간</li>
        <li className="list-group-item">{getTimeFromDate(start) + '~' + getTimeFromDate(end)}</li>
        <li className="list-group-item">{'보상포인트 : ' + reward}</li>
      </ul>
    </div>
  );
};

export default BoardCard;
