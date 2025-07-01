import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useScrollSpy } from '@hooks';
import { navLinks } from '@config';

const StyledScrollTracker = styled.div`
  position: fixed;
  top: 50%;
  left: ${props => props.isCollapsed ? '40px' : '40px'};
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: rgba(0, 0, 0, 0.9);
  padding: ${props => props.isCollapsed ? '25px 15px' : '25px 20px'};
  border-radius: 15px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  width: ${props => props.isCollapsed ? '60px' : 'auto'};
  min-width: ${props => props.isCollapsed ? '60px' : '180px'};
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  
  @media (max-width: 1080px) {
    left: ${props => props.isCollapsed ? '20px' : '20px'};
    padding: ${props => props.isCollapsed ? '20px 12px' : '20px 15px'};
    gap: 12px;
    width: ${props => props.isCollapsed ? '50px' : 'auto'};
    min-width: ${props => props.isCollapsed ? '50px' : '160px'};
  }

  @media (max-width: 768px) {
    left: ${props => props.isCollapsed ? '15px' : '15px'};
    padding: ${props => props.isCollapsed ? '18px 10px' : '18px 12px'};
    gap: 10px;
    width: ${props => props.isCollapsed ? '45px' : 'auto'};
    min-width: ${props => props.isCollapsed ? '45px' : '140px'};
    /* Always collapsed on mobile */
    width: 45px !important;
    min-width: 45px !important;
    padding: 18px 10px !important;
  }
  
  @media (max-width: 480px) {
    left: 8px;
    width: 40px !important;
    min-width: 40px !important;
    padding: 12px 6px !important;
    gap: 8px;
    border-radius: 12px;
  }

  /* Hover effect on desktop */
  @media (min-width: 769px) {
    &:hover {
      width: auto;
      min-width: 180px;
      padding: 25px 20px;
      left: 40px;
      
      @media (max-width: 1080px) {
        min-width: 160px;
        padding: 20px 15px;
        left: 20px;
      }
    }
  }
`;

const ScrollItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${props => props.isCollapsed ? '8px 4px' : '8px 12px'};
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  justify-content: ${props => props.isCollapsed ? 'center' : 'flex-start'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: ${props => props.isCollapsed ? 'scale(1.1)' : 'translateX(5px)'};
  }

  &.active {
    background-color: rgba(204, 68, 68, 0.15);
    border: 1px solid rgba(204, 68, 68, 0.3);
  }

  /* Desktop hover expansion */
  @media (min-width: 769px) {
    ${StyledScrollTracker}:hover & {
      padding: 8px 12px;
      justify-content: flex-start;
    }
  }
`;

const ScrollNumber = styled.div`
  color: ${props => props.isActive ? '#cc4444' : 'rgba(255, 255, 255, 0.5)'};
  font-family: var(--font-mono);
  font-size: ${props => props.isCollapsed ? 'var(--fz-xs)' : 'var(--fz-xs)'};
  font-weight: 600;
  width: ${props => props.isCollapsed ? 'auto' : '20px'};
  text-align: center;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: var(--fz-xxs);
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ScrollLabel = styled.div`
  color: ${props => props.isActive ? '#cc4444' : 'rgba(255, 255, 255, 0.8)'};
  font-family: var(--font-sans);
  font-size: var(--fz-xxs);
  margin-left: 15px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  font-weight: ${props => props.isActive ? '600' : '400'};
  opacity: ${props => props.isCollapsed ? '0' : '1'};
  visibility: ${props => props.isCollapsed ? 'hidden' : 'visible'};
  width: ${props => props.isCollapsed ? '0' : 'auto'};
  overflow: hidden;
  white-space: nowrap;

  /* Always show on desktop hover */
  @media (min-width: 769px) {
    ${StyledScrollTracker}:hover & {
      opacity: 1;
      visibility: visible;
      width: auto;
      margin-left: 15px;
    }
  }

  /* Always hide on mobile */
  @media (max-width: 768px) {
    opacity: 0 !important;
    visibility: hidden !important;
    width: 0 !important;
    margin-left: 0 !important;
  }
`;

const ScrollTracker = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const trackerRef = useRef(null);
  
  // Get section IDs from navLinks
  const sectionIds = navLinks.map(link => link.url.replace('/#', ''));
  
  // Initialize scroll spy
  const { activeSection, scrollToSection } = useScrollSpy(sectionIds, {
    threshold: 0.3,
    rootMargin: '-10% 0px -60% 0px',
    offsetTop: 100
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine if should be collapsed
  useEffect(() => {
    // Always collapsed on mobile/tablet
    if (windowWidth <= 768) {
      setIsCollapsed(true);
    } else {
      // On desktop, expand if hovered or if there's plenty of space
      setIsCollapsed(!isHovered && windowWidth < 1200);
    }
  }, [windowWidth, isHovered]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleClick = (sectionId) => {
    scrollToSection(sectionId);
  };

  const handleMouseEnter = () => {
    if (windowWidth > 768) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!isMounted) {
    return null;
  }

  const shouldCollapse = windowWidth <= 768 || (!isHovered && windowWidth < 1200);

  return (
    <StyledScrollTracker
      ref={trackerRef}
      isCollapsed={shouldCollapse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {navLinks.map(({ url, name }, i) => {
        const sectionId = url.replace('/#', '');
        const isActive = activeSection === sectionId;
        
        return (
          <ScrollItem 
            key={i}
            className={isActive ? 'active' : ''}
            onClick={() => handleClick(sectionId)}
            title={windowWidth <= 768 ? `Navigate to ${name} section` : ''}
            isCollapsed={shouldCollapse}
          >
            <ScrollNumber isActive={isActive} isCollapsed={shouldCollapse}>
              {String(i).padStart(2, '0')}
            </ScrollNumber>
            <ScrollLabel isActive={isActive} isCollapsed={shouldCollapse}>
              {name}
            </ScrollLabel>
          </ScrollItem>
        );
      })}
    </StyledScrollTracker>
  );
};

export default ScrollTracker; 