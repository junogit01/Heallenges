import Header from "@components/Header";
import Footer from "@components/Footer";
import React from "react";
import { Outlet } from "react-router-dom";
import ScrollTopButton from "@components/ScrollTop";
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollTopButton />
    </>
  );
}

export default Layout;
