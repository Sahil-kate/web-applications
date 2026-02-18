'use client';

import React from 'react';

const ProjectCard = ({ title, description, techStack, githubUrl, liveUrl, imageUrl }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        {imageUrl ? (
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span>Project Image</span>
        )}
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tech">
          {techStack.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-buttons">
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary btn-small"
          >
            GitHub
          </a>
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary btn-small"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
