import './NavLinks.css';

import React, { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <Nav as='ul' className='nav-pills'>
      <Nav.Item as='li'>
        <Nav.Link as={NavLink} to='/' end>
          ALL USERS
        </Nav.Link>
      </Nav.Item>
      {auth.isLoggedIn && (
        <Nav.Item as='li'>
          <Nav.Link as={NavLink} to={`/${auth.userId}/blogs`}>
            MY BLOGS
          </Nav.Link>
        </Nav.Item>
      )}
      {auth.isLoggedIn && (
        <Nav.Item as='li'>
          <Nav.Link as={NavLink} to='/blogs/new'>
            ADD BLOG
          </Nav.Link>
        </Nav.Item>
      )}
      {!auth.isLoggedIn && (
        <Nav.Item as='li'>
          <Nav.Link as={NavLink} to='/auth'>
            LOGIN
          </Nav.Link>
        </Nav.Item>
      )}
      {auth.isLoggedIn && (
        <Nav.Item as='li'>
          <Nav.Link as={Button} onClick={auth.logout}>
            LOGOUT
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default NavLinks;
