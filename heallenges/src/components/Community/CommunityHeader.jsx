import React from 'react';
import {Link} from 'react-router-dom';

function CommunityHeader() {
  return (
    <div
      className='breadcrumbs d-flex align-items-center'
      style={{backgroundImage: 'url("assets/img/blog-header.jpg")'}}
    >
      <div className='container position-relative d-flex flex-column align-items-center'>
        <h2>커뮤니티</h2>
        <ol>
          <li>
            <Link to='/'>메인</Link>
          </li>
          <li>커뮤니티</li>
        </ol>
      </div>
    </div>
  );
}

export default CommunityHeader;
