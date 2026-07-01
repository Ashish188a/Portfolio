import React, { useContext } from 'react';
import PageLayout from '../components/PageLayout';
import Experience from '../components/Experience';
import { PortfolioContext } from '../App';

const ExperiencePage = () => {
  const { experiences } = useContext(PortfolioContext);
  return (
    <PageLayout title="Experience">
      <Experience experiences={experiences} />
    </PageLayout>
  );
};

export default ExperiencePage;
