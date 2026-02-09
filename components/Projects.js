'use client';

import React from 'react';
import ProjectCard from './ProjectCard';

const Projects = () => {
  // TODO: Replace these with your actual projects
  const projects = [
    {
      title: 'Online Complaint / Ticket System',
      description: 'A comprehensive ticket management system for handling customer complaints and support requests with user authentication and admin dashboard.',
      techStack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/yourusername/complaint-system',
      liveUrl: 'https://complaint-system-demo.com',
      imageUrl: null
      // TODO: Replace with your actual project details
    },
    {
      title: 'Blog Platform',
      description: 'A full-featured blogging platform with user authentication, CRUD operations, comments, and rich text editor for content creation.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/yourusername/blog-platform',
      liveUrl: 'https://blog-platform-demo.com',
      imageUrl: null
    },
    {
      title: 'Notes App',
      description: 'A modern note-taking application with real-time synchronization, markdown support, and responsive design for mobile and desktop.',
      techStack: ['Next.js', 'MongoDB'],
      githubUrl: 'https://github.com/yourusername/notes-app',
      liveUrl: 'https://notes-app-demo.com',
      imageUrl: null
    },
    {
      title: 'Expense Tracker',
      description: 'A personal finance management tool for tracking expenses, generating reports, and visualizing spending patterns with charts.',
      techStack: ['Python', 'MySQL'],
      githubUrl: 'https://github.com/yourusername/expense-tracker',
      liveUrl: 'https://expense-tracker-demo.com',
      imageUrl: null
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
