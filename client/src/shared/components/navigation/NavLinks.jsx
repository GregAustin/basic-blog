import './NavLinks.css';

import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import React from 'react';

const NavLinks = () => {
  return (
    <Nav as='ul' className='nav-pills'>
      <Nav.Item as='li'>
        <Nav.Link as={NavLink} to='/' end>
          ALL USERS
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as='li'>
        <Nav.Link as={NavLink} to='/u1/blogs'>
          MY BLOGS
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as='li'>
        <Nav.Link as={NavLink} to='/blogs/new'>
          ADD BLOG
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavLinks;
