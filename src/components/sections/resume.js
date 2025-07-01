import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledResumeSection = styled.section`
  max-width: 900px;

  .resume-intro {
    color: var(--light-slate);
    font-size: var(--fz-lg);
    margin-bottom: 40px;
    line-height: 1.6;
  }

  .resume-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: 30px;
    }
  }

  .resume-section {
    .section-title {
      color: var(--lightest-slate);
      font-size: var(--fz-xl);
      margin-bottom: 20px;
    }

    .section-item {
      margin-bottom: 25px;

      .item-title {
        color: var(--lightest-slate);
        font-size: var(--fz-lg);
        margin-bottom: 5px;
      }

      .item-subtitle {
        color: var(--green);
        font-family: var(--font-mono);
        font-size: var(--fz-sm);
        margin-bottom: 5px;
      }

      .item-date {
        color: var(--slate);
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        margin-bottom: 10px;
      }

      .item-description {
        color: var(--light-slate);
        font-size: var(--fz-sm);
        line-height: 1.5;

        ul {
          margin: 10px 0;
          padding-left: 20px;

          li {
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  .resume-download {
    text-align: center;
    margin-top: 50px;

    .download-btn {
      ${({ theme }) => theme.mixins.bigButton};
      background-color: transparent;
      color: var(--green);
      border: 1px solid var(--green);
      padding: 1.25rem 1.75rem;
      font-size: var(--fz-sm);
      font-family: var(--font-mono);
      text-decoration: none;
      transition: var(--transition);

      &:hover,
      &:focus {
        background-color: var(--green-tint);
        outline: none;
      }
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-top: 15px;

    .skill-item {
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      padding: 5px 0;

      &:before {
        content: '▹';
        color: var(--green);
        margin-right: 8px;
      }
    }
  }
`;

const Resume = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'MATLAB', 'Python', 'JavaScript', 'React', 'SolidWorks CAD', '3D Modeling',
    'Manufacturing Engineering', 'UX Design', 'Hardware Prototyping', 'VBA',
    'LEAN Manufacturing', 'MES/MRP/ERP Systems'
  ];

  const languages = [
    'English (Native)', 'Hindi (Fluent)', 'Marathi (Fluent)', 
    'German (Conversational)', 'Marwari (Conversational)'
  ];

  return (
    <StyledResumeSection id="resume" ref={revealContainer}>
      <h2 className="numbered-heading">Resume</h2>

      <p className="resume-intro">
        With 6+ years of experience bridging mechanical engineering and creative technology, 
        I specialize in developing innovative user experiences for autonomous vehicles and 
        manufacturing systems. My work spans from research and development to team leadership 
        and operational excellence.
      </p>

      <div className="resume-content">
        <div className="resume-section">
          <h3 className="section-title">Experience</h3>
          
          <div className="section-item">
            <h4 className="item-title">Creative Technologist</h4>
            <div className="item-subtitle">Zoox</div>
            <div className="item-date">January 2022 - Present</div>
            <div className="item-description">
              Lead development of cutting-edge user experiences for autonomous vehicles. 
              Create hardware and software prototypes, operational tools, and safety systems 
              for dense urban environments.
            </div>
          </div>

          <div className="section-item">
            <h4 className="item-title">Manufacturing Engineer</h4>
            <div className="item-subtitle">Zoox</div>
            <div className="item-date">October 2018 - January 2022</div>
            <div className="item-description">
              Engineered MES/MRP/ERP systems, developed BOMs, and implemented automation 
              solutions. Achieved 100% team capacity increase while maintaining quality standards.
            </div>
          </div>

          <div className="section-item">
            <h4 className="item-title">Engineering Intern</h4>
            <div className="item-subtitle">Tesla</div>
            <div className="item-date">May - August 2018</div>
            <div className="item-description">
              Contributed to Supercharger program development, created VBA and PowerQuery 
              solutions for data analysis, and supported site design initiatives.
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h3 className="section-title">Education & Certifications</h3>
          
          <div className="section-item">
            <h4 className="item-title">Mechanical Engineering</h4>
            <div className="item-subtitle">Washington State University</div>
            <div className="item-date">2014 - 2018</div>
            <div className="item-description">
              WSU Honors Program graduate with focus on materials research and engineering design.
            </div>
          </div>

          <div className="section-item">
            <h4 className="item-title">UX Design Certificate</h4>
            <div className="item-subtitle">UC Berkeley Extension</div>
            <div className="item-date">2020</div>
          </div>

          <div className="section-item">
            <h4 className="item-title">SolidWorks Associate</h4>
            <div className="item-subtitle">Certified Professional</div>
            <div className="item-date">2018</div>
          </div>

          <h3 className="section-title" style={{ marginTop: '40px' }}>Technical Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <div key={i} className="skill-item">{skill}</div>
            ))}
          </div>

          <h3 className="section-title" style={{ marginTop: '30px' }}>Languages</h3>
          <div className="skills-grid">
            {languages.map((language, i) => (
              <div key={i} className="skill-item">{language}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="resume-download">
        <a href="https://tiny.cc/parthchandakresume" className="download-btn" target="_blank" rel="noopener noreferrer">
          Download Full Resume
        </a>
      </div>
    </StyledResumeSection>
  );
};

export default Resume; 