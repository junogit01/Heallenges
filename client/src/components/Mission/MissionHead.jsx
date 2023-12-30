import React from "react";
import { Link } from "react-router-dom";

function MissionHead({}) {
  return (
    <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: 'url("/images/blog-header.jpg")' }}>
      <div className="container position-relative d-flex flex-column align-items-center">
        <h2>미션</h2>
        <ol>
          <li>
            <Link to="/mission">일일미션</Link>
          </li>
          <li>
            <Link to="/mission/week">주간미션</Link>
          </li>
          <li>
            <Link to="/mission/month">월간미션</Link>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default MissionHead;
