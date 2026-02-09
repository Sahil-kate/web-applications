'use client';

import React from 'react';

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">Your Name</div>
        {/* TODO: Replace "Your Name" with your actual name */}
        <ul className="nav-links">
          <li>
            <a href="#home" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}>
              Home
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}>
              Projects
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}>
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
