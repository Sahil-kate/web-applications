'use client';

import React from 'react';

const Skills = () => {
  const skills = {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'],
    Backend: ['Node.js', 'PHP', 'Python'],
    Databases: ['MySQL', 'MongoDB'],
    Tools: ['Git', 'GitHub', 'Postman', 'VS Code']
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <ul className="skill-list">
                {skillList.map((skill) => (
                  <li key={skill} className="skill-item">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
