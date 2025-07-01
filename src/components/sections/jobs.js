import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Briefcase } from 'lucide-react';
import Timeline from '../timeline';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 1000px;

  .inner {
    display: grid;
    grid-gap: 30px;

    @media (max-width: 768px) {
      grid-gap: 20px;
    }
  }
`;

const Jobs = () => {
  const revealTitle = useRef(null);
  const revealTimeline = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Job data with consistent structure
  const jobsData = [
    {
      title: "Creative Technologist",
      company: "Zoox",
      location: "Foster City, CA",
      range: "Present",
      description: "Leading innovative technology solutions at the intersection of autonomous vehicles and user experience design."
    },
    {
      title: "Manufacturing Engineer",
      company: "Zoox", 
      location: "Foster City, CA",
      range: "Jan 2022",
      description: "Optimized manufacturing processes and developed automation solutions for autonomous vehicle production systems."
    },
    {
      title: "Engineering Intern",
      company: "Tesla",
      location: "Fremont, CA",
      range: "2018",
      description: "Contributed to electric vehicle manufacturing processes and quality control systems development."
    },
    {
      title: "Boeing Scholar",
      company: "Boeing",
      location: "Seattle, WA",
      range: "May 2018",
      description: "Participated in aerospace engineering research and development programs as part of the Boeing scholarship program."
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTimeline.current, srConfig(200));
  }, []);

  return (
    <StyledJobsSection id="jobs">
      <h2 className="numbered-heading" ref={revealTitle}>
        Experience
      </h2>

      <div className="inner">
        <div ref={revealTimeline}>
          <Timeline 
            items={jobsData}
            icon={Briefcase}
          />
        </div>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
