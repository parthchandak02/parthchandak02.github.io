import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Heart } from 'lucide-react';
import Timeline from '../timeline';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledCommunitySection = styled.section`
  max-width: 1000px;

  .inner {
    display: grid;
    grid-gap: 30px;

    @media (max-width: 768px) {
      grid-gap: 20px;
    }
  }
`;

const Community = () => {
  const revealTitle = useRef(null);
  const revealTimeline = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Community data with actual volunteer activities
  const communityData = [
    {
      title: "Rebuilding Together",
      organization: "Community Volunteer",
      date: "April 2024",
      description: "Built a fence under Mr. Frank's guidance from the RTP team, installed a new microwave, added a handrail to the bottom stairs leading to the yard, cleared the area, and mowed the grass."
    },
    {
      title: "Catholic Worker House",
      organization: "Community Volunteer",
      date: "Oct 2023",
      description: "Painted the kitchen, built shelves in the food and tool sheds, and refurbished the landscaping."
    },
    {
      title: "Rebuilding Together",
      organization: "Community Volunteer", 
      date: "April 2023",
      description: "Re-did the entire yard, removed grass, laid down over 200 lbs of crushed gravel, worked on house interiors, installed rails, and cleaned up the backyard."
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
    <StyledCommunitySection id="community">
      <h2 className="numbered-heading" ref={revealTitle}>
        Community Service
      </h2>

      <div className="inner">
        <div ref={revealTimeline}>
          <Timeline 
            items={communityData}
            icon={Heart}
          />
        </div>
      </div>
    </StyledCommunitySection>
  );
};

export default Community; 