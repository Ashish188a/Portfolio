import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap fade-in">
            <div>
              <div className="about-avatar">AKX</div>
              <div className="about-badge">
                <i className="fas fa-graduation-cap"></i>
                B.Tech in CSE
              </div>
            </div>
          </div>
          <div className="about-text fade-in fade-in-delay-2">
            <div className="section-label">Who I Am</div>
            <h2 className="section-title">About Me</h2>
            <p>I'm <strong>Ashish Kumar Xess</strong>, a passionate Developer. I hold a Bachelor's Degree in Computer Science Engineering from Cambridge Institute of Technology Ranchi and a Diploma in Computer Science Engineering from Birla Institute of Technology, Mesra.</p>
            <p>My experience as a Backend Developer Intern at Vital Skills has given me hands-on exposure to real-world development workflows, API design, and database management with MongoDB.</p>
            <p><strong>Career Objective:</strong> To leverage my software engineering skills and problem-solving mindset in a dynamic team environment, contributing to impactful products while growing as a full-stack engineer.</p>
            <div className="about-highlights">
              <div className="highlight-item"><i className="fas fa-map-marker-alt"></i> India</div>
              <div className="highlight-item"><i className="fas fa-envelope"></i> axess293@gmail.com</div>
              <div className="highlight-item"><i className="fas fa-phone"></i> +91 7258944301</div>
              <div className="highlight-item"><i className="fas fa-briefcase"></i> Open to Work</div>
              <div className="highlight-item"><i className="fas fa-code-branch"></i> Developer</div>
              <div className="highlight-item"><i className="fas fa-laptop-code"></i> JavaScript, MongoDB &amp; Git</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
