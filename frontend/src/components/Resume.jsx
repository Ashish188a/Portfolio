import React from 'react';

const Resume = ({ onShowToast }) => {
  const handleResumeDownload = (e) => {
    e.preventDefault();
    onShowToast('Resume download will be available once uploaded!');
  };

  return (
    <section id="resume">
      <div className="container">
        <div className="resume-box fade-in">
          <div className="resume-info">
            <h3>📄 Download My Resume</h3>
            <p>Get a complete overview of my skills, experience, projects, and education in a single document. Updated and ready to share.</p>
          </div>
          <a href="#" className="btn-primary" id="resumeBtn" onClick={handleResumeDownload}>
            <i className="fas fa-download"></i> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
