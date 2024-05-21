import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navber from '../page/navber/navber'


import Footer from '../page/footer/footer';




const Layout = () => {

  const location = useLocation()

  const noHeaderFooter = location.pathname.includes('login')
  console.log(noHeaderFooter)
  return (
    <div>

      {noHeaderFooter || <Navber></Navber>}

      

      <Outlet />

      {noHeaderFooter ||  <Footer></Footer>}
     
    </div>
  );
}

export default Layout;
