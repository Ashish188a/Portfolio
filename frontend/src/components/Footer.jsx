import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
    <div className="footer-text">
      Designed &amp; Built by <span>Ashish Kumar Xess</span> · axess293@gmail.com · +91 7258944301
    </div>
    <nav className="footer-nav">
      <Link to="/about">About</Link>
      <Link to="/skills">Skills</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/experience">Experience</Link>
      <Link to="/education">Education</Link>
      <Link to="/contact">Contact</Link>
    </nav>
    <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
      © 2026 Ashish Kumar Xess · Made with ❤️ and React / MERN
    </div>
  </footer>
);

export default Footer;
