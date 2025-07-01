import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email, socialMedia } from '@config';
import { Icon } from '@components/icons';
import { loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledRightSidebar = styled.div`
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 25px 15px;
  border-radius: 15px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  min-width: 60px;
  width: auto;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);

  @media (max-width: 1080px) {
    right: 20px;
    padding: 20px 12px;
    gap: 12px;
    min-width: 50px;
  }

  @media (max-width: 768px) {
    right: 15px;
    padding: 18px 10px;
    gap: 10px;
    min-width: 45px;
  }

  @media (max-width: 480px) {
    right: 8px;
    padding: 12px 6px;
    gap: 8px;
    min-width: 40px;
    border-radius: 12px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;

  @media (max-width: 1080px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    color: rgba(255, 255, 255, 0.7);
    
    @media (max-width: 1080px) {
      width: 36px;
      height: 36px;
      border-radius: 6px;
    }

    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
      border-radius: 6px;
    }

    @media (max-width: 480px) {
      width: 28px;
      height: 28px;
      border-radius: 6px;
    }
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #cc4444;
      transform: translateY(-3px);
    }

    &:active {
      transform: translateY(-1px);
    }

    svg {
      width: 20px;
      height: 20px;

      @media (max-width: 1080px) {
        width: 18px;
        height: 18px;
      }

      @media (max-width: 768px) {
        width: 16px;
        height: 16px;
      }

      @media (max-width: 480px) {
        width: 14px;
        height: 14px;
      }
    }
  }
`;

const EmailLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  writing-mode: vertical-rl;
  letter-spacing: 0.1em;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  min-height: 120px;

  @media (max-width: 1080px) {
    padding: 10px 6px;
    font-size: 11px;
    min-height: 100px;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    padding: 8px 4px;
    font-size: 10px;
    min-height: 80px;
    border-radius: 6px;
    letter-spacing: 0.08em;
  }

  @media (max-width: 480px) {
    padding: 6px 3px;
    font-size: 9px;
    min-height: 60px;
    border-radius: 6px;
    letter-spacing: 0.06em;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #cc4444;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 30px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  margin: 10px auto;

  @media (max-width: 1080px) {
    height: 25px;
    margin: 8px auto;
  }

  @media (max-width: 768px) {
    height: 20px;
    margin: 6px auto;
  }

  @media (max-width: 480px) {
    height: 15px;
    margin: 4px auto;
  }
`;

const RightSidebar = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isHome || prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
    return () => clearTimeout(timeout);
  }, []);

  const content = (
    <StyledRightSidebar>
      <SocialIcons>
        {socialMedia &&
          socialMedia.map(({ url, name }, i) => (
            <a 
              key={i} 
              href={url} 
              aria-label={name} 
              target="_blank" 
              rel="noopener noreferrer"
              title={`Visit ${name} profile`}
            >
              <Icon name={name} />
            </a>
          ))}
      </SocialIcons>
      
      <Divider />
      
      <EmailLink 
        href={`mailto:${email}`} 
        title={`Send email to ${email}`}
      >
        {email}
      </EmailLink>
    </StyledRightSidebar>
  );

  return (
    <>
      {prefersReducedMotion ? (
        content
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? loaderDelay : 0}>
              {content}
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </>
  );
};

RightSidebar.propTypes = {
  isHome: PropTypes.bool,
};

export default RightSidebar; 