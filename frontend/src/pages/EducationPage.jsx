import React, { useContext } from 'react';
import PageLayout from '../components/PageLayout';
import Education from '../components/Education';
import { PortfolioContext } from '../App';

const EducationPage = () => {
  const { experiences } = useContext(PortfolioContext);
  return (
    <PageLayout title="Education">
      <Education experiences={experiences} />
    </PageLayout>
  );
};

export default EducationPage;
