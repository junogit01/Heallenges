import React from 'react';
import Home from '@pages/Home';
import Layout from '@pages/Layout';
import Rank from '@pages/Rank';
import Mypage from '@pages/Mypage';
import Login from '@pages/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from '@pages/Signup';

import Community from '@pages/Communitys';
import CommunityNotice from '@pages/CommunityNotice';
import CommunityFree from '@pages/CommunityFree';
import CommunityQna from '@pages/CommunityQna';
import CommunityBoardDetail from '@pages/CommunityBoardDetail';
import CommunityInsert from '@pages/CommunityInsert';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/:id" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* 커뮤니티 */}
        <Route path="/community" element={<Community />} />
        <Route path="/community/notice" element={<CommunityNotice />} />
        <Route path="/community/free" element={<CommunityFree />} />
        <Route path="/community/qna" element={<CommunityQna />} />
        <Route path="/community/:id" element={<CommunityBoardDetail />} />
        <Route path="/community/write" element={<CommunityInsert />} />
      </Route>
    </Routes>
  );
}

export default App;
