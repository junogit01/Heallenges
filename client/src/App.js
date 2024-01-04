<<<<<<< HEAD
// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '@pages/Signup';
import Home from '@pages/Home';
import Layout from '@pages/Layout';
import Mypage from '@pages/Mypage';
import Login from '@pages/Login';
import Mission from '@pages/Mission';
import MissionDetail from '@pages/MissionDetail';

import Community from '@pages/Communitys';
import CommunityNotice from '@pages/CommunityNotice';
import CommunityFree from '@pages/CommunityFree';
import CommunityQna from '@pages/CommunityQna';
import CommunityBoardDetail from '@pages/CommunityBoardDetail';

=======
import Home from '@pages/Home';
import Layout from '@pages/Layout';
import Mission from '@pages/Mission';
import MissionDetail from '@pages/MissionDetail';
import Mypage from '@pages/Mypage';
import Login from '@pages/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from '@pages/Signup';
>>>>>>> 020f4d6410f5d6127be27579c203a8077bade2a9
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/mission/:id" element={<MissionDetail />} />
        <Route path="/mypage/:id" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* 커뮤니티 */}
        <Route path="/community" element={<Community />} />
        <Route path="/community/notice" element={<CommunityNotice />} />
        <Route path="/community/free" element={<CommunityFree />} />
        <Route path="/community/qna" element={<CommunityQna />} />
        <Route path="/board/:id/" element={<CommunityBoardDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
