import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Skills',     to: '/skills' },
  { label: 'Projects',   to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Education',  to: '/education' },
  { label: 'Contact',    to: '/contact' },
];

const Navbar = ({ isAdminPage = false }) => {
  const [isDark, setIsDark] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isLightMode = document.body.classList.contains('light');
    setIsDark(!isLightMode);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.body.classList.toggle('light', !newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const isActive = (to) =>
    to === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(to);

  return (
    <>
      <nav id="navbar" style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none' }}>
        <Link to="/" className="nav-logo">AKX<span>.</span></Link>

        {!isAdminPage ? (
          <ul className="nav-links">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  style={{
                    color: isActive(to) ? 'var(--accent)' : '',
                    borderBottom: isActive(to) ? '2px solid var(--accent)' : '2px solid transparent',
                    paddingBottom: '2px',
                    transition: 'color 0.2s, border-color 0.2s'
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/admin" style={{ color: 'var(--accent2)', fontWeight: 'bold' }}>Admin</Link>
            </li>
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
            <button className="hamburger" id="hamburger" onClick={() => setIsMobileOpen(!isMobileOpen)}>
              <i className={`fas ${isMobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          )}
        </div>
      </nav>

      {!isAdminPage && (
        <div className={`mobile-nav ${isMobileOpen ? 'open' : ''}`} id="mobileNav">
          {navItems.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              style={{ color: isActive(to) ? 'var(--accent)' : '' }}
            >
              {label}
            </Link>
          ))}
          <Link to="/admin" style={{ color: 'var(--accent2)', fontWeight: 'bold' }}>Admin Panel</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
