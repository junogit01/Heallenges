// CommunitySidebar.jsx

import React from 'react';
import {Link} from 'react-router-dom';

function CommunitySidebar() {
  return (
    <div className='col-lg-4' data-aos='fade-up' data-aos-delay={400}>
      <div className='sidebar ps-lg-4'>
        <div className='sidebar-item search-form'>
          <h3 className='sidebar-title'>검색</h3>
          <form action='' className='mt-3'>
            <input type='text' />
            <button type='submit'>
              <i className='bi bi-search' />
            </button>
          </form>
        </div>
        {/* End sidebar search form */}
        <div className='sidebar-item categories'>
          <h3 className='sidebar-title'>카테고리</h3>
          <ul className='mt-3'>
            <li>
              <Link to='/community'>
                {/* 전체게시판 <span>(12)</span>하면 전체게시판 (12) 이런식으로 표기됨 */}
                전체 글
              </Link>
            </li>
            <li>
              <Link to='/community/notice'>공지사항</Link>
            </li>
          </ul>
        </div>
        {/* End sidebar categories */}
      </div>
      {/* End Blog Sidebar */}
    </div>
  );
}

export default CommunitySidebar;
