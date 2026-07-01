import React from 'react';

const defaultEducations = [
  {
    title: "Bachelor's Degree, Computer Science Engineering",
    company: "Cambridge Institute of Technology Ranchi",
    period: "2022 - 2026",
    duties: [
      "Attended Cambridge University of Technology",
      "Studied advanced topics in Computer Science Engineering, Software Architecture, and System Design",
      "Designed and implemented programming projects using JavaScript, Node.js, and MongoDB",
      "Engaged in collaborative development using GitHub for version control"
    ]
  },
  {
    title: "Diploma of Education, Computer Science Engineering",
    company: "Birla Institute of Technology, Mesra",
    period: "2017 - 2021",
    duties: [
      "Studied core computer science concepts: data structures, algorithms, OS, DBMS",
      "Built hands-on coding projects in Java and Python throughout the program",
      "Developed strong foundations in object-oriented programming"
    ]
  }
];

const Education = ({ experiences = [] }) => {
  // Filter for education items
  const educationItems = experiences.filter(
    (exp) =>
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
  );

  const displayEducations = educationItems.length > 0 ? educationItems : defaultEducations;

  return (
    <section id="education">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">Academic Background</div>
          <h2 className="section-title">Education</h2>
          <p className="section-sub">My academic journey and qualifications in computer science.</p>
        </div>
        <div className="timeline">
          {displayEducations.map((edu, index) => {
            const delayClass = `fade-in-delay-${(index % 2) + 1}`;
            
            return (
              <div key={edu._id || index} className={`timeline-item fade-in ${delayClass}`}>
                <div className="timeline-dot"><i className="fas fa-graduation-cap"></i></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div className="job-title">{edu.title}</div>
                    <div className="job-period">{edu.period}</div>
                  </div>
                  <div className="job-company">
                    <i className="fas fa-university" style={{ marginRight: '0.4rem' }}></i>
                    {edu.company}
                  </div>
                  {edu.duties && edu.duties.length > 0 && (
                    <ul className="job-duties">
                      {edu.duties.map((duty, idx) => (
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

export default Education;
