import React, { Fragment } from 'react';
import './NotFound.css';
const NotFound = () => {
  return (
    <Fragment>
      <div className='App-header'>
        <p style={{ fontSize: '100px', fontWeight: 'bold' }}>404</p>
        <p style={{ fontSize: '100px' }}>Oops!</p>
        <p>we cannot find the page</p>
      </div>
    </Fragment>
  );
};

export default NotFound;
