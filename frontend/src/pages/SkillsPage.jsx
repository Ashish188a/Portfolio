import React, { useContext } from 'react';
import PageLayout from '../components/PageLayout';
import Skills from '../components/Skills';
import { PortfolioContext } from '../App';

const SkillsPage = () => {
  const { skills } = useContext(PortfolioContext);
  return (
    <PageLayout title="Skills">
      <Skills skills={skills} />
    </PageLayout>
  );
};

export default SkillsPage;
