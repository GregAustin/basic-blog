import './MainHeader.css';

import Container from 'react-bootstrap/Container';
import React from 'react';

const MainHeader = (props) => {
  return (
    <Container>
      <header className='main-header d-flex flex-wrap justify-content-center py-3 mb-4'>{props.children}</header>
    </Container>
  );
};

export default MainHeader;
