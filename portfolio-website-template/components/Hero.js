'use client';

import React from 'react';

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-name">Your Name</h1>
          {/* TODO: Replace "Your Name" with your actual name */}
          <h2 className="hero-title">Full Stack Web Developer</h2>
          <p className="hero-description">
            {/* TODO: Replace this with your personal description */}
            Building modern web applications with cutting-edge technologies. 
            Passionate about creating clean, efficient, and scalable solutions.
          </p>
          <div className="hero-buttons">
            <button onClick={scrollToProjects} className="btn btn-primary">
              View Projects
            </button>
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              GitHub
            </a>
            {/* TODO: Replace "yourusername" with your actual GitHub username */}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
