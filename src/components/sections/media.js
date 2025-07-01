import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Newspaper } from 'lucide-react';
import Timeline from '../timeline';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledMediaSection = styled.section`
  max-width: 1000px;

  .inner {
    display: grid;
    grid-gap: 30px;

    @media (max-width: 768px) {
      grid-gap: 20px;
    }
  }
`;

const Media = () => {
  const revealTitle = useRef(null);
  const revealTimeline = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Media items with consistent structure (most recent first)
  const mediaItems = [
    {
      title: "Optimizing Data Collection Systems For Next-Generation Electric Transport",
      publication: "Outlook India",
      date: "May 2025",
      url: "https://www.outlookindia.com/hub4business/optimizing-data-collection-systems-for-next-generation-electric-transport"
    },
    {
      title: "Bridging The Trust Gap Between Humans & Autonomous Systems Through Intuitive Interfaces",
      publication: "Free Press Journal",
      date: "May 2025",
      url: "https://www.freepressjournal.in/latest-news/bridging-the-trust-gap-between-humans-autonomous-systems-through-intuitive-interfaces"
    },
    {
      title: "The Creative Technologist: Bridging Engineering, UX, and Robotics",
      publication: "Deccan Chronicle",
      date: "April 2025",
      url: "https://www.deccanchronicle.com/general/the-creative-technologist-bridging-engineering-ux-and-robotics-1875816"
    },
    {
      title: "User-Centered Design Principles in Healthcare Technology: Parallels with Autonomous Systems",
      publication: "Mid-Day",
      date: "April 2025",
      url: "https://www.mid-day.com/buzz/article/user-centered-design-principles-in-healthcare-technology-parallels-with-autonomous-systems-5654"
    },
    {
      title: "User-Centered Design Approaches for Manufacturing Systems",
      publication: "Analytics Insight",
      date: "March 2025",
      url: "https://www.analyticsinsight.net/manufacturing/user-centered-design-approaches-for-manufacturing-systems"
    },
    {
      title: "Leveraging Mixed Reality and Haptic Feedback for Immersive User Experiences",
      publication: "The Hans India",
      date: "December 2024",
      url: "https://www.thehansindia.com/business/leveraging-mixed-reality-and-haptic-feedback-for-immersive-user-experiences-926474"
    },
    {
      title: "Rapid Prototyping Methodologies for Complex Systems: From Concept to Testing",
      publication: "India Hood",
      date: "June 2023",
      url: "https://indiahood.com/interview-rapid-prototyping-methodologies-for-complex-systems-from-concept-to-testing/"
    },
    {
      title: "Advancing Human-Robot Interaction Through Multi-Modal Feedback Systems",
      publication: "India CSR",
      date: "March 2022",
      url: "https://indiacsr.in/interview-advancing-human-robot-interaction-through-intuitive-interfaces/"
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
    <StyledMediaSection id="media">
      <h2 className="numbered-heading" ref={revealTitle}>
        Media & Press
      </h2>

      <div className="inner">
        <div ref={revealTimeline}>
          <Timeline 
            items={mediaItems}
            icon={Newspaper}
          />
        </div>
      </div>
    </StyledMediaSection>
  );
};

export default Media; 