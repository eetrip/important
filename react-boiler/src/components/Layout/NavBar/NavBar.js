import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
const NavBar = () => {
  return (
    <div className='navStyle'>
      <Link to='/'>
        <img className='alteration' src={logo} alt='logo' />
      </Link>
    </div>
  );
};

export default NavBar;
