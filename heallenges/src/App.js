import Home from '@pages/Home';
import Layout from '@pages/Layout';
import Mypage from '@pages/Mypage';
import Login from '@pages/Login';
import {Route, Routes} from 'react-router-dom';
import Signup from '@pages/Signup';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Home from '@pages/Home';
import Layout from '@pages/Layout';
import Community from '@pages/Communitys';
import Notice from '@pages/Notice';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/community' element={<Community />} />
        <Route path='/community/notice' element={<Notice />} />
      </Route>
    </Routes>
  );
}

export default App;
