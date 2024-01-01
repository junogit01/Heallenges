import Footer from '@components/Footer';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollBtn from '@components/ScrollBtn';
import NavHeader from '@components/Navbar';

function Layout() {
  return (
    <>
      {/* <Header /> */}
      <NavHeader />
      <Outlet />
      <Footer />
      <ScrollBtn />
    </>
  );
}

export default Layout;
