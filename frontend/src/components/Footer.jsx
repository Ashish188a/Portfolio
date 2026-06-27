import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-text">
        Designed &amp; Built by <span>Ashish Kumar Xess</span> · axess293@gmail.com · +91 7258944301
      </div>
      <nav className="footer-nav">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
      <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
        © 2024 Ashish Kumar Xess · Made with ❤️ and React / MERN
      </div>
    </footer>
  );
};

export default Footer;
