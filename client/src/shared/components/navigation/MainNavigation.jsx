import './MainNavigation.css';

import { Link, Outlet } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import React from 'react';

const MainNavigation = () => {
  return (
    <>
      <MainHeader>
        <h1 className='main-navigation__title d-flex align-items-center ps-3 mb-3 mb-md-0 me-md-auto text-dark text-decoration-none'>
          <Link to='/'>The Blog Site</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
      <Outlet />
    </>
  );
};

export default MainNavigation;
