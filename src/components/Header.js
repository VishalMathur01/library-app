import React from 'react';
import './Header.css'; // Import CSS for styling

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <img src="https://static1.bigstockphoto.com/1/0/1/large1500/101507639.jpg" alt="Site Logo" className="site-logo" />
      </div>
      <div className="title-container">
        <h1>Library Management System</h1>
      </div>
    </header>
  );
};

export default Header;