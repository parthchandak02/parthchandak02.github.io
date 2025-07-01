import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'lucide-react';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledResearchSection = styled.section`
  max-width: 1000px;
`;

const StyledPublicationsList = styled.div`
  margin-top: 30px;

  .year-section {
    margin-bottom: 40px;

    .year-title {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-lg);
      font-weight: 600;
      margin-bottom: 20px;
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 40px;
        height: 2px;
        background: var(--green);
      }
    }

    .publications {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 12px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }

    .publication-item {
      background-color: var(--light-navy);
      border-radius: var(--border-radius);
      padding: 16px;
      transition: var(--transition);
      cursor: pointer;
      position: relative;
      text-decoration: none;
      color: inherit;
      display: block;

      &:hover {
        transform: translateY(-2px);
        
        .external-icon {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      &.clickable {
        &:hover {
          border: 1px solid var(--green);
        }
      }

      .publication-title {
        color: var(--lightest-slate);
        font-size: var(--fz-sm);
        font-weight: 600;
        line-height: 1.3;
        margin-bottom: 6px;
        padding-right: 20px;
      }

      .publication-journal {
        color: var(--light-slate);
        font-size: var(--fz-xs);
        font-style: italic;
      }

      .external-icon {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.6;
        color: var(--green);
        transition: all 0.2s ease;

        svg {
          width: 14px;
          height: 14px;
          stroke-width: 2px;
        }
      }
    }
  }
`;

const Research = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Verified research papers from authorship CSV
  const publicationsByYear = {
    2025: [
      {
        title: "Ethical, Governance, and Usability Challenges in AI-Powered Virtual Health Assistants: A Systematic Thematic Analysis",
        journal: "International Journal For Multidisciplinary Research",
        url: "https://www.ijfmr.com/research-paper.php?id=39043"
      },
      {
        title: "Augmented Reality Enhances Telemedicine Training: A Systematic Review on Effectiveness and Challenges",
        journal: "International Journal For Multidisciplinary Research",
        url: "https://www.ijfmr.com/research-paper.php?id=38539"
      }
    ],
    2024: [
      {
        title: "The Evolution of Haptic Feedback Systems and the Impact of User Experience: A Literature Review",
        journal: "International Journal of Innovative Research in Management, Production and Supply Chain",
        url: "https://www.ijirmps.org/research-paper.php?id=231735"
      },
      {
        title: "Optimizing Bio-Inspired Phototropic Materials: Addressing Scalability and Durability Challenges for Passive Solar Tracking Systems",
        journal: "ESP International Journal of Advancements in Computational Technology",
        url: "https://www.espjournals.org/IJACT/ijact-v2i4p113"
      },
      {
        title: "Advancing Telemedicine Through Adaptive UX: A Systematic Review of Interface Design for Equity and Accessibility in Diverse Healthcare Settings",
        journal: "Progress in Medical Sciences",
        url: "https://www.promedsci.org/articles/Advancing%20Telemedicine%20Through%20Adaptive%20UX%20%20A%20Systematic%20Review%20of%20Interface%20Design%20for%20Equity%20and%20Accessibility%20in%20Diverse%20Healthcare%20Settings"
      },
      {
        title: "Systematic Review of Healthcare IoT and Rapid Prototyping Applications: Addressing Challenges and Implementation",
        journal: "Progress in Medical Sciences",
        url: "https://www.promedsci.org/articles/Systematic%20Review%20of%20Healthcare%20IoT%20and%20Rapid%20Prototyping%20Applications%20%20Addressing%20Challenges%20and%20Implementation"
      },
      {
        title: "Systematic Review of Integrating User-Centered Design Principles in Rapid Robotic System Prototyping",
        journal: "International Journal of Innovative Research in Management, Production and Supply Chain",
        url: "https://www.ijirmps.org/research-paper.php?id=231741"
      }
    ],
    2023: [
      {
        title: "Leveraging Haptic Feedback in Mixed Reality: Enhancing Training, Skill Acquisition, and Robotic Simulation",
        journal: "Journal of Engineering and Applied Sciences Technology",
        url: null // No published link available in authorship CSV, only DOI
      },
      {
        title: "Rapid Prototyping Technologies and Design Frameworks: Transforming Traditional Manufacturing into Smart Additive Solutions",
        journal: "Journal of Material Sciences & Manufacturing Research",
        url: "https://www.onlinescientificresearch.com/articles/rapid-prototyping-technologies-and-design-frameworks-transforming-traditional-manufacturing-into-smart-additive-solutions.pdf"
      },
      {
        title: "Integrating Advanced Sensor Fusion with User-Centered Design and Rapid Prototyping in Robotics: A Comprehensive Review",
        journal: "International Scientific Journal of Engineering and Management",
        url: "https://isjem.com/download/integrating-advanced-sensor-fusion-with-user-centered-design-and-rapid-prototyping-in-robotics-a-comprehensive-review/"
      }
    ],
    2022: [
      {
        title: "A Comprehensive Review of User-Centric Design in IoT Prototyping for Smart Agriculture: Integrating User Feedback in Hardware and Software Development",
        journal: "International Journal of Innovative Research in Management, Production and Supply Chain",
        url: "https://www.ijirmps.org/research-paper.php?id=231743"
      },
      {
        title: "Rapid Prototyping Methodologies for Smart Shop Tools: Integrating IoT, AI, and User-Centered Design in Engineering Workflows",
        journal: "Journal of Artificial Intelligence, Machine Learning and Data Science",
        url: "https://urfjournals.org/open-access/rapid-prototyping-methodologies-for-smart-shop-tools-integrating-iot-ai-and-user-centered-design-in-engineering-workflows.pdf"
      }
    ],
    2021: [
      {
        title: "Advancing Robotics-Enabled STEM Education in K-12: Frameworks for Comprehensive Learning Outcomes Assessment and Inclusivity",
        journal: "International Journal of Scientific Research in Engineering and Management",
        url: "https://ijsrem.com/download/advancing-robotics-enabled-stem-education-in-k-12-frameworks-for-comprehensive-learning-outcomes-assessment-and-inclusivity/"
      },
      {
        title: "Advances in Human-Robot Interaction: A Systematic Review of Intuitive Interfaces and Communication Modalities",
        journal: "International Journal of Innovative Research in Management, Production and Supply Chain",
        url: "https://www.ijirmps.org/research-paper.php?id=231851"
      }
    ],
    2020: [
      {
        title: "Advancements in Electric Bicycle Technology: A Comprehensive Review of Systems, Monitoring, and Open Source Solutions",
        journal: "International Journal of Innovative Research and Creative Technology",
        url: "https://www.ijirct.org/viewPaper.php?paperId=2412051"
      }
    ],
    2019: [
      {
        title: "Growth and Characterization of Cadmium Telluride and Its Societal, Economic, and Environmental Impact",
        journal: "International Journal For Multidisciplinary Research",
        url: "https://www.ijfmr.com/research-paper.php?id=22647"
      }
    ]
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const handlePublicationClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <StyledResearchSection id="research">
      <h2 className="numbered-heading">Research & Publications</h2>

      <StyledPublicationsList ref={revealContainer}>
        {Object.entries(publicationsByYear)
          .sort(([a], [b]) => parseInt(b) - parseInt(a))
          .map(([year, publications]) => (
            <div key={year} className="year-section">
              <h3 className="year-title">{year}</h3>
              <div className="publications">
                {publications.map((publication, i) => (
                  <div
                    key={i}
                    className={`publication-item ${publication.url ? 'clickable' : ''}`}
                    onClick={() => handlePublicationClick(publication.url)}
                    role={publication.url ? 'button' : 'article'}
                    tabIndex={publication.url ? 0 : -1}
                    onKeyDown={(e) => {
                      if (publication.url && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handlePublicationClick(publication.url);
                      }
                    }}
                  >
                    <div className="publication-title">
                      {publication.title}
                    </div>
                    <div className="publication-journal">
                      {publication.journal}
                    </div>
                    {publication.url && (
                      <div className="external-icon">
                        <ExternalLink />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </StyledPublicationsList>
    </StyledResearchSection>
  );
};

export default Research; 