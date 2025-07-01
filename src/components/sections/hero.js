import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

// Custom typewriter hook
const useTypewriter = (text, speed = 50, startDelay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    setDisplayText('');
    setIsComplete(false);
    
    const timeout = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(prevText => prevText + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayText, isComplete };
};

// Rotating typewriter component
const RotatingTypewriter = ({ texts, speed = 50, delay = 1000, deleteSpeed = 30 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const current = texts[currentIndex];
      
      if (isWaiting) {
        const waitTimeout = setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, delay);
        return () => clearTimeout(waitTimeout);
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          const deleteTimeout = setTimeout(() => {
            setCurrentText(currentText.slice(0, -1));
          }, deleteSpeed);
          return () => clearTimeout(deleteTimeout);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      } else {
        if (currentText.length < current.length) {
          const typeTimeout = setTimeout(() => {
            setCurrentText(current.slice(0, currentText.length + 1));
          }, speed);
          return () => clearTimeout(typeTimeout);
        } else {
          setIsWaiting(true);
        }
      }
    };

    const cleanup = handleTyping();
    return cleanup;
  }, [currentText, currentIndex, isDeleting, isWaiting, texts, speed, delay, deleteSpeed]);

  return (
    <span className="rotating-text">
      {currentText}
      <span className="typing-cursor">|</span>
    </span>
  );
};

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;
  position: relative;

  /* Subtle animated background gradient */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse 80% 80% at 50% -20%,
      rgba(204, 68, 68, 0.03),
      transparent
    );
    pointer-events: none;
    z-index: -1;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .hero-content {
    width: 100%;
    max-width: 1000px;
  }

  .hero-main {
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-gap: 60px;
    align-items: flex-start;
    margin-bottom: 80px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: 40px;
      margin-bottom: 60px;
    }

    .hero-text {
      h1 {
        margin: 0 0 20px 4px;
        color: var(--green);
        font-family: var(--font-mono);
        font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
        font-weight: 400;

        @media (max-width: 480px) {
          margin: 0 0 15px 2px;
        }
      }

      .name-container {
        margin: 0 0 30px 0;
        line-height: 1.1;
        min-height: 1.2em;
        
        .typed-name {
          background: linear-gradient(
            135deg,
            var(--lightest-slate) 0%,
            var(--white) 50%,
            var(--lightest-slate) 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }

        .name-cursor {
          display: inline-block;
          margin-left: 4px;
          color: var(--green);
          font-weight: 400;
          animation: blink 1s infinite;
          background: none;
          -webkit-text-fill-color: var(--green);
        }
      }



      .tagline-text {
        margin: 0 0 50px 0;
        max-width: 540px;
        font-size: var(--fz-lg);
        line-height: 1.6;
        
        .highlight-text {
          color: var(--green);
          font-weight: 500;
          position: relative;
          
          &:after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--green), transparent);
            opacity: 0.6;
          }
        }

        .rotating-text {
          position: relative;
          color: var(--green);
          font-weight: 500;
        }
        
        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
          color: var(--green);
          animation: blink 1s infinite;
        }
      }

      .skills-section {
        margin: 0 0 50px 0;
        
        h4 {
          margin-bottom: 20px;
          color: var(--lightest-slate);
          font-size: var(--fz-lg);
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

        .skills-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0;
          margin: 0;
          max-width: 540px;

          .skill-pill {
            padding: 8px 16px;
            border-radius: 20px;
            background: transparent;
            border: 1px solid var(--lightest-slate);
            font-family: var(--font-mono);
            font-size: var(--fz-xs);
            color: var(--lightest-slate);
            font-weight: 400;
            cursor: default;
            transition: all 0.2s ease;

            &:hover {
              border-color: var(--green);
              color: var(--green);
              transform: translateY(-1px);
            }
          }
        }
      }

      .contact-buttons {
        display: flex;
        gap: 20px;

        @media (max-width: 480px) {
          gap: 15px;
        }
      }

      .icon-button {
        ${({ theme }) => theme.mixins.flexCenter};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--lightest-slate);
        background-color: transparent;
        color: var(--lightest-slate);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        position: relative;
        overflow: hidden;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(204, 68, 68, 0.1), transparent);
          transition: left 0.5s;
        }

        &:hover {
          border-color: var(--green);
          color: var(--green);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(204, 68, 68, 0.2);

          &:before {
            left: 100%;
          }
        }

        svg {
          width: 18px;
          height: 18px;
          stroke-width: 1.5px;
          fill: none;
          stroke: currentColor;
          z-index: 1;
        }
      }
    }

    .hero-pic {
      position: relative;
      max-width: 300px;
      justify-self: end;

      @media (max-width: 768px) {
        justify-self: center;
        max-width: 250px;
      }

      .wrapper {
        ${({ theme }) => theme.mixins.boxShadow}
        display: block;
        position: relative;
        width: 100%;
        border-radius: var(--border-radius);
        background-color: var(--light-slate);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover,
        &:focus {
          outline: 0;
          transform: translate(-4px, -4px);

          &:after {
            transform: translate(8px, 8px);
          }

          .img {
            filter: none;
          }

          &:before {
            opacity: 0;
          }
        }

        .img {
          position: relative;
          border-radius: var(--border-radius);
          filter: grayscale(100%) contrast(1);
          transition: var(--transition);
          z-index: 3;
          display: block;
          width: 100%;
        }

        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--navy);
          border-radius: var(--border-radius);
          opacity: 0.8;
          z-index: 2;
          transition: var(--transition);
        }

        &:after {
          content: '';
          position: absolute;
          border: 2px solid var(--green);
          top: 14px;
          left: 14px;
          width: 100%;
          height: 100%;
          border-radius: var(--border-radius);
          z-index: 1;
          opacity: 0.8;
          pointer-events: none;
          transition: var(--transition);
        }
      }
    }
  }

  /* Shimmer animation for the main heading */
  @keyframes shimmer {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  /* Cursor blink animation */
  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);



  // Typewriter text configurations
  const nameText = "Parth Chandak";
  const rotatingTexts = [
    "creative technologist",
    "researcher", 
    "engineer",
    "team leader",
    "inventor"
  ];

  // Use typewriter hook for name only
  const nameTypewriter = useTypewriter(nameText, 100, 500);

  const heroContent = (
    <div className="hero-main">
      <div className="hero-text">
        <h1>Hi, my name is</h1>
        
        <div className="name-container">
          <h2 className="big-heading typed-name">
            {nameTypewriter.displayText}
            {nameTypewriter.isComplete && <span className="name-cursor">_</span>}
          </h2>
        </div>
        
        <p className="tagline-text">
          I am a{' '}
          {nameTypewriter.isComplete && (
            <RotatingTypewriter 
              texts={rotatingTexts}
              speed={80}
              delay={2000}
              deleteSpeed={50}
            />
          )}. I specialize in cutting-edge human-computer interaction. I bridge hardware and software to create innovative user experiences.
        </p>

        <div className="skills-section">
          <div className="skills-pills">
            <span className="skill-pill">Python</span>
            <span className="skill-pill">JavaScript</span>
            <span className="skill-pill">React</span>
            <span className="skill-pill">C/C++</span>
            <span className="skill-pill">MATLAB</span>
            <span className="skill-pill">SolidWorks</span>
            <span className="skill-pill">Figma</span>
            <span className="skill-pill">ProtoPie</span>
            <span className="skill-pill">Blender</span>
            <span className="skill-pill">Arduino</span>
            <span className="skill-pill">Raspberry Pi</span>
            <span className="skill-pill">3D Printing</span>
            <span className="skill-pill">Linux</span>
            <span className="skill-pill">JIRA</span>
            <span className="skill-pill">Hardware Prototyping</span>
            <span className="skill-pill">Manufacturing Systems</span>
            <span className="skill-pill">Autonomous Vehicle UX</span>
            <span className="skill-pill">Human-Computer Interaction</span>
            <span className="skill-pill">Haptic Feedback</span>
            <span className="skill-pill">Unity</span>
          </div>
        </div>

      </div>

      <div className="hero-pic">
        <div className="wrapper">
          <StaticImage
            className="img"
            src="../../images/me.jpg"
            width={300}
            height={300}
            quality={95}
            formats={['AUTO', 'WEBP', 'AVIF']}
            alt="Parth Chandak"
          />
        </div>
      </div>
    </div>
  );

  const items = [heroContent];

  return (
    <StyledHeroSection id="about">
      <div className="hero-content">
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
