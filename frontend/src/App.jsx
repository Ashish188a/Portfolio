import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { API_URL } from './config';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import EducationPage from './pages/EducationPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Shared data provider
export const PortfolioContext = React.createContext({});

function App() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, projectsRes, expRes] = await Promise.all([
          fetch(`${API_URL}/api/skills`),
          fetch(`${API_URL}/api/projects`),
          fetch(`${API_URL}/api/experience`)
        ]);
        if (skillsRes.ok) setSkills(await skillsRes.json());
        if (projectsRes.ok) setProjects(await projectsRes.json());
        if (expRes.ok) setExperiences(await expRes.json());
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ skills, projects, experiences }}>
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PortfolioContext.Provider>
  );
}

export default App;
