import React from 'react';
import logo from '../assets/img/icon_dash.png';
import './Logo.css';

const Logo = ({ children }) => {
  return (
    <div className="logo-content">
      <img src={logo} className="logo" alt="logo" />
      {children ? children : <p>Dash&Cash</p>}
    </div>
  );
};

export default Logo;
