import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { API_URL } from '../config';

const AdminDashboard = () => {
  // Shadow global fetch to automatically prepend API_URL for relative backend endpoints
  const fetch = (url, options) => window.fetch(url.startsWith('/api') ? `${API_URL}${url}` : url, options);

  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [username, setUsername] = useState('Admin');

  // Input states for Skills
  const [skillName, setSkillName] = useState('');
  const [skillIcon, setSkillIcon] = useState('💻');
  const [skillPercentage, setSkillPercentage] = useState(80);
  const [skillCategory, setSkillCategory] = useState('Languages');

  // Input states for Projects
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projIcon, setProjIcon] = useState('fas fa-code');
  const [projGithub, setProjGithub] = useState('');
  const [projLive, setProjLive] = useState('');
  const [projFeatures, setProjFeatures] = useState('');
  const [projTags, setProjTags] = useState('');

  // Input states for Experience
  const [expTitle, setExpTitle] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expDuties, setExpDuties] = useState('');

  // Alert/Toast states
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Auth Guard
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const savedUser = localStorage.getItem('adminUsername');
    if (!token) {
      navigate('/admin');
    } else {
      if (savedUser) setUsername(savedUser);
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Load Messages
      const msgRes = await fetch('/api/messages', { headers });
      if (msgRes.ok) setMessages(await msgRes.json());

      // Load Skills
      const skillRes = await fetch('/api/skills');
      if (skillRes.ok) setSkills(await skillRes.json());

      // Load Projects
      const projRes = await fetch('/api/projects');
      if (projRes.ok) setProjects(await projRes.json());

      // Load Experiences
      const expRes = await fetch('/api/experience');
      if (expRes.ok) setExperiences(await expRes.json());

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      triggerToast('Failed to load dashboard data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin');
  };

  /* =========================================================================
     MESSAGE HANDLERS
     ========================================================================= */
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
        triggerToast('Message deleted.');
      } else {
        triggerToast('Failed to delete message.');
      }
    } catch (err) {
      triggerToast('Error: ' + err.message);
    }
  };

  /* =========================================================================
     SKILL HANDLERS
     ========================================================================= */
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillName || !skillIcon || !skillPercentage) {
      triggerToast('Please fill out all fields.');
      return;
    }
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          name: skillName,
          icon: skillIcon,
          percentage: Number(skillPercentage),
          category: skillCategory
        })
      });
      if (res.ok) {
        const newSkill = await res.json();
        setSkills([...skills, newSkill]);
        triggerToast('Skill added successfully!');
        setSkillName('');
        setSkillIcon('💻');
        setSkillPercentage(80);
      } else {
        triggerToast('Failed to add skill.');
      }
    } catch (err) {
      triggerToast('Error adding skill.');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setSkills(skills.filter(s => s._id !== id));
        triggerToast('Skill deleted.');
      } else {
        triggerToast('Failed to delete skill.');
      }
    } catch (err) {
      triggerToast('Error deleting skill.');
    }
  };

  /* =========================================================================
     PROJECT HANDLERS
     ========================================================================= */
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projTitle || !projDesc) {
      triggerToast('Title and Description are required.');
      return;
    }
    const featuresList = projFeatures ? projFeatures.split(',').map(f => f.trim()) : [];
    const tagsList = projTags ? projTags.split(',').map(t => t.trim()) : [];

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          title: projTitle,
          description: projDesc,
          icon: projIcon,
          github: projGithub || '#',
          live: projLive || '#',
          features: featuresList,
          techTags: tagsList
        })
      });
      if (res.ok) {
        const newProj = await res.json();
        setProjects([...projects, newProj]);
        triggerToast('Project added successfully!');
        setProjTitle('');
        setProjDesc('');
        setProjIcon('fas fa-code');
        setProjGithub('');
        setProjLive('');
        setProjFeatures('');
        setProjTags('');
      } else {
        triggerToast('Failed to add project.');
      }
    } catch (err) {
      triggerToast('Error adding project.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
        triggerToast('Project deleted.');
      } else {
        triggerToast('Failed to delete project.');
      }
    } catch (err) {
      triggerToast('Error deleting project.');
    }
  };

  /* =========================================================================
     EXPERIENCE HANDLERS
     ========================================================================= */
  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (!expTitle || !expCompany || !expPeriod) {
      triggerToast('Title, Company, and Period are required.');
      return;
    }
    const dutiesList = expDuties ? expDuties.split('\n').map(d => d.trim()).filter(Boolean) : [];

    try {
      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          title: expTitle,
          company: expCompany,
          period: expPeriod,
          duties: dutiesList,
          order: experiences.length
        })
      });
      if (res.ok) {
        const newExp = await res.json();
        setExperiences([...experiences, newExp]);
        triggerToast('Experience item added!');
        setExpTitle('');
        setExpCompany('');
        setExpPeriod('');
        setExpDuties('');
      } else {
        triggerToast('Failed to add experience.');
      }
    } catch (err) {
      triggerToast('Error adding experience.');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm('Delete this experience item?')) return;
    try {
      const res = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setExperiences(experiences.filter(e => e._id !== id));
        triggerToast('Experience item deleted.');
      } else {
        triggerToast('Failed to delete experience.');
      }
    } catch (err) {
      triggerToast('Error deleting experience.');
    }
  };

  return (
    <>
      <Navbar isAdminPage={true} />
      
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p style={{ color: 'var(--muted)', marginTop: '0.2rem' }}>Welcome back, <strong style={{ color: 'var(--accent2)' }}>{username}</strong></p>
          </div>
          <button className="btn-primary" onClick={handleLogout} style={{ background: 'var(--danger)', boxShadow: 'none' }}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>

        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <i className="fas fa-envelope"></i> Messages ({messages.length})
          </button>
          <button 
            className={`admin-tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <i className="fas fa-tools"></i> Skills ({skills.length})
          </button>
          <button 
            className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <i className="fas fa-folder-open"></i> Projects ({projects.length})
          </button>
          <button 
            className={`admin-tab ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <i className="fas fa-history"></i> Experience ({experiences.length})
          </button>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
            <i className="fas fa-spinner fa-spin fa-3x" style={{ marginBottom: '1rem', color: 'var(--accent2)' }}></i>
            <p>Loading database information...</p>
          </div>
        ) : (
          <div className="admin-content-section">
            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="admin-list-card">
                <h3>Inbox Messages</h3>
                {messages.length === 0 ? (
                  <p style={{ color: 'var(--muted)' }}>No messages received yet.</p>
                ) : (
                  messages.map(msg => (
                    <div key={msg._id} className="message-card">
                      <div className="message-card-header">
                        <div className="message-sender">
                          <h4>{msg.name}</h4>
                          <p>{msg.email}</p>
                        </div>
                        <span className="message-date">{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                      {msg.subject && <div className="message-subject">Sub: {msg.subject}</div>}
                      <div className="message-body">{msg.message}</div>
                      
                      <button 
                        className="btn-icon btn-icon-delete" 
                        onClick={() => handleDeleteMessage(msg._id)}
                        style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
                        title="Delete Message"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="admin-grid-section">
                <div className="admin-form-card">
                  <h3>Add New Skill</h3>
                  <form onSubmit={handleAddSkill} className="contact-form">
                    <div className="form-group">
                      <label>Skill Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Node.js" 
                        value={skillName} 
                        onChange={(e) => setSkillName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Icon (Emoji)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. ⚡" 
                        value={skillIcon} 
                        onChange={(e) => setSkillIcon(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Percentage (0 - 100)</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={skillPercentage} 
                        onChange={(e) => setSkillPercentage(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select value={skillCategory} onChange={(e) => setSkillCategory(e.target.value)}>
                        <option value="Languages">Languages</option>
                        <option value="Frameworks">Frameworks &amp; Libs</option>
                        <option value="Databases">Databases</option>
                        <option value="Frontend">Frontend</option>
                        <option value="General">General / Other</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      <i className="fas fa-plus"></i> Add Skill
                    </button>
                  </form>
                </div>

                <div className="admin-list-card">
                  <h3>Existing Skills</h3>
                  <div className="admin-items-list">
                    {skills.map(skill => (
                      <div key={skill._id} className="admin-item-row">
                        <div className="admin-item-info">
                          <h4><span style={{ marginRight: '0.5rem' }}>{skill.icon}</span> {skill.name}</h4>
                          <p>{skill.category} · {skill.percentage}% proficiency</p>
                        </div>
                        <div className="admin-item-actions">
                          <button className="btn-icon btn-icon-delete" onClick={() => handleDeleteSkill(skill._id)} title="Delete Skill">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="admin-grid-section">
                <div className="admin-form-card">
                  <h3>Add New Project</h3>
                  <form onSubmit={handleAddProject} className="contact-form">
                    <div className="form-group">
                      <label>Project Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. HomeSphere" 
                        value={projTitle} 
                        onChange={(e) => setProjTitle(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Icon (FontAwesome Class)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. fas fa-home" 
                        value={projIcon} 
                        onChange={(e) => setProjIcon(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        placeholder="Enter project summary details..." 
                        value={projDesc} 
                        onChange={(e) => setProjDesc(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>GitHub Link</label>
                      <input 
                        type="text" 
                        placeholder="e.g. https://github.com/..." 
                        value={projGithub} 
                        onChange={(e) => setProjGithub(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Live Demo Link</label>
                      <input 
                        type="text" 
                        placeholder="e.g. https://domain.com" 
                        value={projLive} 
                        onChange={(e) => setProjLive(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Key Features (Comma Separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Secure login, Admin dashboard, REST API" 
                        value={projFeatures} 
                        onChange={(e) => setProjFeatures(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Tech Tags (Comma Separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. React, Node, Express, MongoDB" 
                        value={projTags} 
                        onChange={(e) => setProjTags(e.target.value)} 
                      />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      <i className="fas fa-plus"></i> Add Project
                    </button>
                  </form>
                </div>

                <div className="admin-list-card">
                  <h3>Existing Projects</h3>
                  <div className="admin-items-list">
                    {projects.map(proj => (
                      <div key={proj._id} className="admin-item-row">
                        <div className="admin-item-info">
                          <h4><i className={proj.icon || 'fas fa-code'} style={{ color: 'var(--accent2)', marginRight: '0.5rem' }}></i> {proj.title}</h4>
                          <p>{proj.description.substring(0, 80)}...</p>
                        </div>
                        <div className="admin-item-actions">
                          <button className="btn-icon btn-icon-delete" onClick={() => handleDeleteProject(proj._id)} title="Delete Project">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="admin-grid-section">
                <div className="admin-form-card">
                  <h3>Add Work / Education</h3>
                  <form onSubmit={handleAddExperience} className="contact-form">
                    <div className="form-group">
                      <label>Title / Role</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Backend Developer Intern" 
                        value={expTitle} 
                        onChange={(e) => setExpTitle(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Company / Institute</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Vital Skills Internship" 
                        value={expCompany} 
                        onChange={(e) => setExpCompany(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Time Period</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 2024 or 2021 - 2024" 
                        value={expPeriod} 
                        onChange={(e) => setExpPeriod(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Key Duties / Info (One per line)</label>
                      <textarea 
                        placeholder="e.g. Developed REST APIs using Flask&#10;Designed MongoDB databases" 
                        value={expDuties} 
                        onChange={(e) => setExpDuties(e.target.value)} 
                        style={{ minHeight: '100px' }}
                      />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      <i className="fas fa-plus"></i> Add Journey Item
                    </button>
                  </form>
                </div>

                <div className="admin-list-card">
                  <h3>Existing Journey Items</h3>
                  <div className="admin-items-list">
                    {experiences.map(exp => (
                      <div key={exp._id} className="admin-item-row">
                        <div className="admin-item-info">
                          <h4>{exp.title}</h4>
                          <p>{exp.company} ({exp.period})</p>
                        </div>
                        <div className="admin-item-actions">
                          <button className="btn-icon btn-icon-delete" onClick={() => handleDeleteExperience(exp._id)} title="Delete Experience">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Admin toast */}
      <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
        <i className="fas fa-check-circle"></i> 
        <span id="toastMsg">{toastMsg}</span>
      </div>
    </>
  );
};

export default AdminDashboard;
