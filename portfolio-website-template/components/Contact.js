'use client';

import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
            {/* TODO: Replace this with your personal contact message */}
            I'm always interested in hearing about new opportunities and exciting projects. 
            Feel free to reach out if you'd like to connect!
          </p>
          <div className="contact-links">
            <a 
              href="mailto:your.email@example.com" 
              className="contact-link"
            >
              <span>📧</span>
              your.email@example.com
              {/* TODO: Replace with your actual email */}
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span>💼</span>
              LinkedIn
              {/* TODO: Replace "yourusername" with your LinkedIn username */}
            </a>
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span>🐙</span>
              GitHub
              {/* TODO: Replace "yourusername" with your GitHub username */}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
