import React, { useContext } from 'react';
import PageLayout from '../components/PageLayout';
import Projects from '../components/Projects';
import { PortfolioContext } from '../App';

const ProjectsPage = () => {
  const { projects } = useContext(PortfolioContext);
  return (
    <PageLayout title="Projects">
      <Projects projects={projects} />
    </PageLayout>
  );
};

export default ProjectsPage;
