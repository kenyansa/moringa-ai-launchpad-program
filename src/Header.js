import React from 'react';
import './Header.css';
import nboImage from './assets/nbo.png';

function Header() {
  return (
    <div className="header">
      <img src={nboImage} alt="Logo" className="logo" />
      <h2 className="title">Nairobi Air Quality Index</h2>
      <h5 className="sponsor">Powered by AirQo</h5>
    </div>
  );
}

export default Header;
