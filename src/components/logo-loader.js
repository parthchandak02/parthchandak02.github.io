import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const drawSquare = keyframes`
  0% {
    stroke-dashoffset: 280;
  }
  40% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const drawLetter = keyframes`
  0% {
    stroke-dashoffset: 120;
  }
  40% {
    stroke-dashoffset: 120;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const fillAnimation = keyframes`
  0% {
    fill: transparent;
  }
  85% {
    fill: transparent;
  }
  100% {
    fill: #cc4444;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease-out;

  ${props =>
    props.isComplete &&
    css`
      animation: ${fadeOut} 0.5s ease-out forwards;
    `}
`;

const AnimatedSVG = styled.svg`
  width: 120px;
  height: 120px;

  .square-stroke {
    stroke: #cc4444;
    fill: transparent;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 280;
    stroke-dashoffset: 280;
    animation: ${drawSquare} 3s ease-out forwards;
  }

  .letter-stroke {
    stroke: #cc4444;
    fill: transparent;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
    animation: ${drawLetter} 3s ease-out forwards;
  }

  .letter-fill {
    fill: transparent;
    animation: ${fillAnimation} 3s ease-out forwards;
  }
`;

const LogoLoader = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Animation duration + small delay
    const timer = setTimeout(() => {
      setIsComplete(true);
      // Give fade out animation time to complete
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <LoaderContainer isComplete={isComplete}>
      <AnimatedSVG viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(6, 8)">
          {/* Square outline - draws first */}
          <rect className="square-stroke" x="4" y="8" width="70" height="70" rx="8" ry="8" />

          {/* Letter P outline - draws second */}
          <path
            className="letter-stroke"
            d="M28.5,30.3 L28.5,61 L33.5,61 L33.5,47.5 L43.5,47.5 C48.5,47.5 52.5,43.5 52.5,38.5 C52.5,33.5 48.5,30.3 43.5,30.3 L28.5,30.3 Z M33.5,34.8 L43.5,34.8 C45.7,34.8 47.5,36.6 47.5,38.8 C47.5,41 45.7,42.8 43.5,42.8 L33.5,42.8 L33.5,34.8 Z"
          />

          {/* Letter P fill - appears last */}
          <path
            className="letter-fill"
            d="M28.5,30.3 L28.5,61 L33.5,61 L33.5,47.5 L43.5,47.5 C48.5,47.5 52.5,43.5 52.5,38.5 C52.5,33.5 48.5,30.3 43.5,30.3 L28.5,30.3 Z M33.5,34.8 L43.5,34.8 C45.7,34.8 47.5,36.6 47.5,38.8 C47.5,41 45.7,42.8 43.5,42.8 L33.5,42.8 L33.5,34.8 Z"
          />
        </g>
      </AnimatedSVG>
    </LoaderContainer>
  );
};

LogoLoader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default LogoLoader;
