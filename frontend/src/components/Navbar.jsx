import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAdminPage = false }) => {
  const [isDark, setIsDark] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check initial theme from localStorage or body class
    const isLightMode = document.body.classList.contains('light');
    setIsDark(!isLightMode);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.body.classList.toggle('light', !newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const toggleMobileNav = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <nav id="navbar" style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none' }}>
        <Link to="/" className="nav-logo" onClick={closeMobile}>AKX<span>.</span></Link>
        
        {!isAdminPage ? (
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/admin" style={{ color: 'var(--accent2)', fontWeight: 'bold' }}>Admin</Link></li>
          </ul>
        ) : (
          <ul className="nav-links">
            <li><Link to="/">View Site</Link></li>
            <li><Link to="/admin/dashboard" style={{ color: 'var(--accent2)', fontWeight: 'bold' }}>Dashboard</Link></li>
          </ul>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button className="theme-btn" id="themeToggle" onClick={toggleTheme} title="Toggle theme">
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} id="themeIcon"></i>
          </button>
          {!isAdminPage && (
            <button className="hamburger" id="hamburger" onClick={toggleMobileNav}>
              <i className={`fas ${isMobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          )}
        </div>
      </nav>

      {!isAdminPage && (
        <div className={`mobile-nav ${isMobileOpen ? 'open' : ''}`} id="mobileNav">
          <a href="#about" onClick={closeMobile}>About</a>
          <a href="#skills" onClick={closeMobile}>Skills</a>
          <a href="#projects" onClick={closeMobile}>Projects</a>
          <a href="#experience" onClick={closeMobile}>Experience</a>
          <a href="#contact" onClick={closeMobile}>Contact</a>
          <Link to="/admin" onClick={closeMobile} style={{ color: 'var(--accent2)', fontWeight: 'bold' }}>Admin Panel</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
