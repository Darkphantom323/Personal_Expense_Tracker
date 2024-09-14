import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";
const Navbar = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <nav className="navbar">
    <h2 className="navbar-title">Expense Tracker</h2>
    <div className="navbar-content">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/" className="navbar-link">Summary</Link></li>
        <li className="navbar-item"><Link to="/add" className="navbar-link">Add Expense</Link></li>
        <li className="navbar-item"><Link to="/list" className="navbar-link">Expense List</Link></li>
        <li className="navbar-item"><Link to="/charts" className="navbar-link">Charts</Link></li>
      </ul>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  </nav>
  );
};

export default Navbar;
