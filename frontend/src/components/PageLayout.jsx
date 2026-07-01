import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * PageLayout wraps every public page with Navbar, Footer,
 * scroll-to-top behaviour, toast notifications, and the
 * IntersectionObserver for fade-in animations.
 */
const PageLayout = ({ children, title }) => {
  const [showBackTop, setShowBackTop] = useState(false);
  const [toastMsg, setToastMsg]   = useState('');
  const [showToast, setShowToast] = useState(false);

  // Update document title per page
  useEffect(() => {
    document.title = title ? `${title} | Ashish Kumar Xess` : 'Ashish Kumar Xess | Portfolio';
  }, [title]);

  // Scroll-to-top button + fade-in observer
  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-in, .skill-card').forEach((el) => observer.observe(el));
    }, 150);

    // Scroll page to top on each navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [children]);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // Clone children and inject triggerToast so any child can call it
  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { onShowToast: triggerToast })
      : child
  );

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh' }}>
        {childrenWithProps}
      </main>
      <Footer />

      {/* Toast */}
      <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
        <i className="fas fa-check-circle"></i>{' '}
        <span id="toastMsg">{toastMsg}</span>
      </div>

      {/* Back to top */}
      <button
        className={`back-top ${showBackTop ? 'show' : ''}`}
        id="backTop"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
};

export default PageLayout;
