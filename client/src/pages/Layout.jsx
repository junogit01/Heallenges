import Footer from '@components/Footer/Footer';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollBtn from '@components/ScrollBtn';
import NavHeader from '@components/Navbar';
import ChatBotModal from '@components/ChatBotModal';

function Layout() {
  return (
    <>
      {/* <Header /> */}
      <NavHeader />
      <Outlet />
      <Footer />
      <ChatBotModal />
      <ScrollBtn />
    </>
  );
}

export default Layout;
