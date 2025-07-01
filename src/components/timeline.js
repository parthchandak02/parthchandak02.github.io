import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase, Heart, Newspaper, Trophy } from 'lucide-react';
import styled from 'styled-components';

const StyledVerticalTimeline = styled(VerticalTimeline)`
  // Remove all the custom positioning - let the library handle it with layout prop
  
  .vertical-timeline-element-icon {
    box-shadow: none !important;
    border: none !important;
    background: transparent !important;
    
    svg {
      width: 20px;
      height: 20px;
      color: var(--green);
    }
  }
  
  .vertical-timeline-element-date {
    color: var(--light-slate) !important;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }
  
  .vertical-timeline::before {
    background: var(--lightest-navy);
  }
  
  .vertical-timeline-element-content {
    background: var(--light-navy) !important;
    color: var(--lightest-slate) !important;
    border-radius: var(--border-radius);
    box-shadow: 0 10px 30px -15px var(--navy-shadow) !important;
    
    .vertical-timeline-element-content-arrow {
      border-right-color: var(--light-navy) !important;
    }
    
    h3 {
      color: var(--lightest-slate);
      font-size: var(--fz-xl);
      margin-bottom: 5px;
    }
    
    h4 {
      color: var(--green);
      font-size: var(--fz-lg);
      font-weight: 400;
      margin-bottom: 10px;
    }
    
    p {
      color: var(--light-slate);
      font-size: var(--fz-sm);
      line-height: 1.5;
      margin-bottom: 0;
    }
    
    .company {
      color: var(--green);
    }
    
    .location {
      color: var(--light-slate);
      font-style: italic;
      font-size: var(--fz-sm);
    }
  }
`;

const Timeline = ({ items = [], icon: Icon, type = 'jobs' }) => {
  const getIcon = (itemType) => {
    // If Icon prop is passed, use it (legacy support)
    if (Icon) {
      return <Icon />;
    }
    
    // Otherwise use type-based icons
    switch (itemType || type) {
      case 'jobs':
        return <Briefcase />;
      case 'community':
        return <Heart />;
      case 'media':
        return <Newspaper />;
      case 'awards':
        return <Trophy />;
      default:
        return <Briefcase />;
    }
  };

  // If no items, return empty timeline
  if (!items || items.length === 0) {
    return (
      <StyledVerticalTimeline 
        layout="1-column-left"
        lineColor="var(--lightest-navy)"
      >
      </StyledVerticalTimeline>
    );
  }

  return (
    <StyledVerticalTimeline 
      layout="1-column-left"
      lineColor="var(--lightest-navy)"
    >
      {items.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          date={item.date || item.range} // Handle both date and range fields
          icon={getIcon(item.type)}
          iconStyle={{
            background: 'transparent',
            color: 'var(--green)',
            border: 'none',
            boxShadow: 'none'
          }}
        >
          <h3>{item.title}</h3>
          {item.company && (
            <h4>
              <span className="company">@ {item.company}</span>
              {item.location && <span className="location"> • {item.location}</span>}
            </h4>
          )}
          {item.organization && (
            <h4>
              <span className="company">{item.organization}</span>
              {item.location && <span className="location"> • {item.location}</span>}
            </h4>
          )}
          {item.publication && (
            <h4>
              <span className="company">{item.publication}</span>
              {item.location && <span className="location"> • {item.location}</span>}
            </h4>
          )}
          <p>{item.description}</p>
        </VerticalTimelineElement>
      ))}
    </StyledVerticalTimeline>
  );
};

export default Timeline; 