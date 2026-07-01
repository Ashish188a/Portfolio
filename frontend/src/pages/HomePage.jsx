import React, { useContext } from 'react';
import PageLayout from '../components/PageLayout';
import Hero from '../components/Hero';
import { PortfolioContext } from '../App';

const HomePage = () => {
  const { projects, skills } = useContext(PortfolioContext);
  return (
    <PageLayout title="Home">
      <Hero projectsCount={projects.length} skillsCount={skills.length} />
    </PageLayout>
  );
};

export default HomePage;
