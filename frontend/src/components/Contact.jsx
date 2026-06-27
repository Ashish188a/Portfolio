import React, { useState } from 'react';
import { API_URL } from '../config';

const Contact = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      onShowToast('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok) {
        onShowToast("Message sent successfully! I'll get back to you soon.");
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        onShowToast(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      onShowToast('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-sub">Have an opportunity or just want to say hi? My inbox is always open.</p>
        </div>
        <div className="contact-grid">
          <div className="fade-in fade-in-delay-1">
            <div className="contact-info-item">
              <div className="contact-icon"><i className="fas fa-envelope"></i></div>
              <div>
                <h4>Email</h4>
                <a href="mailto:axess293@gmail.com">axess293@gmail.com</a>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon"><i className="fas fa-phone"></i></div>
              <div>
                <h4>Phone</h4>
                <a href="tel:+917258944301">+91 7258944301</a>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div>
                <h4>Location</h4>
                <p>India 🇮🇳</p>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn"><i className="fab fa-github"></i> GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn"><i className="fab fa-linkedin"></i> LinkedIn</a>
              <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="social-btn"><i className="fas fa-code"></i> LeetCode</a>
            </div>
          </div>
          <div className="fade-in fade-in-delay-2">
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  placeholder="What's this about?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  placeholder="Tell me about the opportunity or project..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ alignSelf: 'flex-start' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
