import React from 'react';

const defaultProjects = [
  {
    title: 'Real-Time Chat App Backend',
    description: 'A secure backend-driven real-time chat application with robust user authentication, user profile management, and message routing.',
    icon: 'fas fa-comments',
    github: 'https://github.com/Ashish188a/Chat_App.git',
    live: '#',
    features: [
      'JWT & Cookie-based secure user authentication',
      'Secure password hashing using bcryptjs',
      'Media/avatar uploads integration via Cloudinary',
      'Message exchange database schema with MongoDB & Mongoose',
      'Modular REST API structure with Express'
    ],
    techTags: ['Node.js', 'Express', 'MongoDB', 'Cloudinary', 'JWT']
  },
  {
    title: 'NFT Market Place DApp',
    description: 'A decentralized marketplace application (DApp) enabling users to mint, buy, and sell NFTs via smart contracts.',
    icon: 'fas fa-store',
    github: 'https://github.com/Ashish188a/NFT.git',
    live: '#',
    features: [
      'Solidity smart contract (SimpleNFT.sol) for minting and ownership',
      'Decentralized token metadata and blockchain transactions',
      'Full-stack architecture integrating frontend client to backend server',
      'Intuitive web interface for viewing and trading digital assets'
    ],
    techTags: ['Solidity', 'Web3', 'React', 'Node.js', 'Express', 'Ethereum']
  }
];

const Projects = ({ projects = [] }) => {
  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="projects">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">What I've Built</div>
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">A selection of projects that showcase my backend development capabilities.</p>
        </div>
        <div className="projects-grid">
          {displayProjects.map((project, index) => (
            <div key={project._id || index} className="project-card fade-in fade-in-delay-1">
              <div className="project-header">
                <div className="project-icon"><i className={project.icon || 'fas fa-code'}></i></div>
                <div className="project-links">
                  <a href={project.github || '#'} className="project-link" title="GitHub" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                  <a href={project.live || '#'} className="project-link" title="Live Demo" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              {project.features && project.features.length > 0 && (
                <ul className="project-features">
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
              {project.techTags && project.techTags.length > 0 && (
                <div className="tech-tags">
                  {project.techTags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Placeholders to keep original design grid structure */}
          {displayProjects.length < 2 && (
            <div className="placeholder-card fade-in fade-in-delay-2">
              <i className="fas fa-plus-circle"></i>
              <h4 style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '0.4rem' }}>More Coming Soon</h4>
              <p style={{ fontSize: '0.85rem' }}>New projects under development. Stay tuned on GitHub!</p>
            </div>
          )}

          {displayProjects.length < 3 && (
            <div className="placeholder-card fade-in fade-in-delay-3">
              <i className="fas fa-code"></i>
              <h4 style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '0.4rem' }}>Project Placeholder</h4>
              <p style={{ fontSize: '0.85rem' }}>Add your next project here — APIs, tools, or open-source contributions.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
