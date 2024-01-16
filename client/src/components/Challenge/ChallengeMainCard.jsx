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
      <img
        style={{ cursor: 'pointer', maxHeight: '9rem', marginTop: '0.7rem' }}
        src={image}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body" style={{ marginBottom: '-0.7rem' }}>
        <h6 className="card-title">{title}</h6>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group mx-3" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>
          도전 기간
        </li>
        <li className="list-group-item" style={{ fontSize: '0.8rem' }}>
          {getTimeFromDate(start) + '~' + getTimeFromDate(end)}
        </li>
        <li className="list-group-item" style={{ fontSize: '0.8rem' }}>
          {'보상포인트 : ' + reward}
        </li>
      </ul>
    </div>
  );
};

export default BoardCard;
