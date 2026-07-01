import React from 'react';

const defaultSkills = [
  { name: 'GitHub', icon: '🐙', percentage: 85 },
  { name: 'JavaScript', icon: '⚡', percentage: 80 },
  { name: 'MongoDB', icon: '🍃', percentage: 80 },
  { name: 'Python', icon: '🐍', percentage: 85 },
  { name: 'Java', icon: '☕', percentage: 80 },
  { name: 'Flask', icon: '🌶️', percentage: 80 },
  { name: 'HTML & CSS', icon: '🌐', percentage: 70 },
  { name: 'DSA', icon: '🧠', percentage: 78 },
  { name: 'REST APIs', icon: '🔗', percentage: 80 },
];

const Skills = ({ skills = [] }) => {
  const displaySkills = skills.length > 0 ? skills : defaultSkills;

  return (
    <section id="skills">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">What I Know</div>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-sub">A curated set of tools and technologies I work with to build solid backend systems.</p>
        </div>
        <div className="skills-grid">
          {displaySkills.map((skill, index) => {
            const delayClass = `fade-in-delay-${(index % 4) + 1}`;
            return (
              <div 
                key={skill._id || index} 
                className={`skill-card fade-in ${delayClass}`}
              >
                <span className="skill-icon">{skill.icon}</span>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-bar-wrap">
                  <div 
                    className="skill-bar" 
                    style={{ 
                      width: `${skill.percentage}%`,
                      transform: 'scaleX(1)' // Trigger visible directly in React for smooth loading
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
