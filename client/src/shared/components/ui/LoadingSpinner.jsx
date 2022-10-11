import './LoadingSpinner.css';

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner-overlay'>
      <Spinner animation='border' role='status' variant='secondary'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
