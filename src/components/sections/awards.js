import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Trophy } from 'lucide-react';
import Timeline from '../timeline';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledAwardsSection = styled.section`
  max-width: 1000px;

  .inner {
    display: grid;
    grid-gap: 30px;

    @media (max-width: 768px) {
      grid-gap: 20px;
    }
  }
`;

const Awards = () => {
  const revealTitle = useRef(null);
  const revealTimeline = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Awards data with consistent structure
  const awardsData = [
    {
      title: "Resident Technology Assistant of the Year (OTY)",
      organization: "Department of Residence Life, WSU",
      date: "April 2017",
      description: "Awarded by Department of Residence Life at the end of the year banquet."
    },
    {
      title: "Harold Frank Fellows Kauffman Award",
      organization: "Harold Frank Engineering Entrepreneurship Institute",
      date: "January 2017",
      description: "The Harold Frank Engineering Entrepreneurship Institute offers a unique opportunity to experience how innovation moves from idea to sustainable realization, and gives you the tools to pursue your ideas. Working in interdisciplinary teams, you will learn to manage uncertainty, design, perfect your presentation skills, work with real fiscal and technical constraints, and develop technologies to solve real problems. The institute has an international reputation and is recognized with the prestigious Kauffman award."
    },
    {
      title: "Housing and Dining Advisory Board Certificate of Appreciation",
      organization: "WSU Housing and Dining",
      date: "December 2016",
      description: "Board Member for Housing and Dining Finance Committee at WSU. Helped in discussing a budget of over 7 million USD and voice the student opinion."
    },
    {
      title: "Guy E. Thornton Engineering Scholarship",
      organization: "School of Mechanical and Materials Engineering, WSU",
      date: "August 2016",
      description: "Awarded by the school of Mechanical and Materials Engineering, WSU."
    },
    {
      title: "International Merit Award",
      organization: "Washington State University",
      date: "August 2015",
      description: "Awarded to international students studying at WSU for outstanding academic performance."
    },
    {
      title: "Honor Roll",
      organization: "Associated Students of Washington State University (ASWSU)",
      date: "August 2015",
      description: "Awarded by Associated Students of Washington State University (ASWSU). Reaching one of the highest levels of academic excellence - the President's Honor Roll."
    },
    {
      title: "Robert W. Finch Memorial Scholarship",
      organization: "School of Mechanical and Materials Engineering, WSU",
      date: "August 2015",
      description: "Awarded by the school of Mechanical and Materials Engineering, WSU."
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
    <StyledAwardsSection id="awards">
      <h2 className="numbered-heading" ref={revealTitle}>
        Awards
      </h2>

      <div className="inner">
        <div ref={revealTimeline}>
          <Timeline 
            items={awardsData}
            icon={Trophy}
          />
        </div>
      </div>
    </StyledAwardsSection>
  );
};

export default Awards; 