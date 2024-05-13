import React from 'react';
import { Outlet } from 'react-router-dom';
import Navber from '../page/navber/navber'


import Footer from '../page/footer/footer';



const Layout = () => {
  return (
    <div>

      <Navber></Navber>

      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default Layout;
