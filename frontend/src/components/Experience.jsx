import React from 'react';

const defaultExperiences = [
  {
    title: 'Backend Developer Intern',
    company: 'Vital Skills Internship',
    period: '2024',
    duties: [
      'Developed and maintained RESTful APIs using Flask for web applications',
      'Designed and managed MongoDB database schemas and queries',
      'Implemented user authentication and authorization with JWT',
      'Collaborated with frontend team to integrate backend services',
      'Participated in code reviews and followed best practices for clean, maintainable code',
      'Debugged and resolved backend issues to improve application performance'
    ]
  }
];

const Experience = ({ experiences = [] }) => {
  // Only display work experience (non-education)
  const workExperiences = experiences.filter(
    (exp) =>
      !(
        exp.title.toLowerCase().includes('diploma') ||
        exp.title.toLowerCase().includes('degree') ||
        exp.title.toLowerCase().includes('education') ||
        exp.title.toLowerCase().includes('institute') ||
        exp.title.toLowerCase().includes('university') ||
        exp.title.toLowerCase().includes('school') ||
        exp.company.toLowerCase().includes('diploma') ||
        exp.company.toLowerCase().includes('degree') ||
        exp.company.toLowerCase().includes('education') ||
        exp.company.toLowerCase().includes('institute') ||
        exp.company.toLowerCase().includes('university') ||
        exp.company.toLowerCase().includes('school')
      )
  );

  const displayExperiences = workExperiences.length > 0 ? workExperiences : defaultExperiences;

  return (
    <section id="experience">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">My Journey</div>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-sub">Professional experience that shaped my skills and development philosophy.</p>
        </div>
        <div className="timeline">
          {displayExperiences.map((exp, index) => {
            const delayClass = `fade-in-delay-${(index % 2) + 1}`;
            
            return (
              <div key={exp._id || index} className={`timeline-item fade-in ${delayClass}`}>
                <div className="timeline-dot"><i className="fas fa-laptop-code"></i></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div className="job-title">{exp.title}</div>
                    <div className="job-period">{exp.period}</div>
                  </div>
                  <div className="job-company">
                    <i className="fas fa-building" style={{ marginRight: '0.4rem' }}></i>
                    {exp.company}
                  </div>
                  {exp.duties && exp.duties.length > 0 && (
                    <ul className="job-duties">
                      {exp.duties.map((duty, idx) => (
                        <li key={idx}>{duty}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
