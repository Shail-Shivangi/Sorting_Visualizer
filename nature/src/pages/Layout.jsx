// import React from 'react';
import NavBar from "../Components/NavBar";
// import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
const Layout = () => {
  return (
    <>
   <NavBar/>
  <Outlet/>
  <Footer/>
   </>
  )
}

export default Layout;