import React from 'react';
import PageLayout from '../components/PageLayout';
import Contact from '../components/Contact';
import Resume from '../components/Resume';

const ContactPage = () => (
  <PageLayout title="Contact">
    <Resume />
    <Contact />
  </PageLayout>
);

export default ContactPage;
