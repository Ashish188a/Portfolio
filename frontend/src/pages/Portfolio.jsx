import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { API_URL } from '../config';

const Portfolio = () => {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  
  // Toast notifications state
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  // Back to Top button state
  const [showBackTop, setShowBackTop] = useState(false);

  // Trigger toast alert
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // Fetch portfolio data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, projectsRes, expRes] = await Promise.all([
          fetch(`${API_URL}/api/skills`),
          fetch(`${API_URL}/api/projects`),
          fetch(`${API_URL}/api/experience`)
        ]);

        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();
          setSkills(skillsData);
        }
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setProjects(projectsData);
        }
        if (expRes.ok) {
          const expData = await expRes.json();
          setExperiences(expData);
        }
      } catch (error) {
        console.error('Error fetching portfolio data from MERN API:', error);
        // Toast notification of connection issue (but fallback static list will render)
        triggerToast('Failed to fetch live database records. Displaying cached information.');
      }
    };

    fetchData();
  }, []);

  // Set up scroll visibility observer (animations)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    // Give Vite a short moment to render database elements before observing
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in, .skill-card');
      elements.forEach((el) => observer.observe(el));
    }, 150);

    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [skills, projects, experiences]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      
      <Hero projectsCount={projects.length} skillsCount={skills.length} />
      
      <About />
      
      <Skills skills={skills} />
      
      <Projects projects={projects} />
      
      <Experience experiences={experiences} />
      
      <Education experiences={experiences} />
      
      <Resume onShowToast={triggerToast} />
      
      <Contact onShowToast={triggerToast} />
      
      <Footer />

      {/* Toast Alert popup */}
      <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
        <i className="fas fa-check-circle"></i> 
        <span id="toastMsg">{toastMsg}</span>
      </div>

      {/* Back to Top float button */}
      <button 
        className={`back-top ${showBackTop ? 'show' : ''}`} 
        id="backTop" 
        onClick={scrollToTop}
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
};

export default Portfolio;
