import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LiquidBackground from './liquid-background';
import ScatteredLogoBackground from './scattered-logo-background';

/**
 * BackgroundManager Component
 *
 * Easy background switching system - just change the SELECTED_BACKGROUND variable below!
 *
 * HOW TO SWITCH BACKGROUNDS:
 * 1. Open this file (src/components/background-manager.js)
 * 2. Find the SELECTED_BACKGROUND variable
 * 3. Change it to one of: 'scattered-logos', 'liquid', 'none'
 * 4. Save and the background will update automatically
 *
 * BACKGROUND OPTIONS:
 * - 'scattered-logos': Company logos scattered across background
 * - 'liquid': Animated liquid orbs (original background)
 * - 'none': Just clean dark background
 */

const BackgroundManager = ({ className = '', style = {}, onBackgroundChange = null }) => {
  // Available background types
  const backgroundTypes = {
    liquid: {
      name: 'Liquid Orbs',
      description: 'Animated liquid orbs with dark gradients',
      component: LiquidBackground,
    },
    'scattered-logos': {
      name: 'Scattered Logos',
      description: 'Company logos scattered across background',
      component: ScatteredLogoBackground,
      props: {
        enabled: true,
        opacity: 0.08,
        density: 0.3,
      },
    },
    none: {
      name: 'No Background',
      description: 'Pure dark background',
      component: null,
    },
  };

  // 🎯 EASY BACKGROUND SWITCHING - Just change this value:
  // Options: 'scattered-logos', 'liquid', 'none'
  const SELECTED_BACKGROUND = 'scattered-logos'; // ← Change this to switch backgrounds

  const [currentBackground] = useState(SELECTED_BACKGROUND);

  // Get current background info
  const getCurrentBackground = () => backgroundTypes[currentBackground];

  // Notify of background change
  useEffect(() => {
    if (onBackgroundChange) {
      onBackgroundChange(currentBackground);
    }
    // eslint-disable-next-line no-console
    console.log(`Background set to: ${backgroundTypes[currentBackground].name}`);
  }, [currentBackground, onBackgroundChange]);

  // Render current background
  const renderCurrentBackground = () => {
    const bgConfig = getCurrentBackground();

    if (!bgConfig || !bgConfig.component) {
      return null;
    }

    const BackgroundComponent = bgConfig.component;
    const props = bgConfig.props || {};

    return <BackgroundComponent {...props} />;
  };

  return (
    <div
      className={`background-manager ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        // Ensure dark background fallback
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)',
        ...style,
      }}>
      {/* Render the current background */}
      {renderCurrentBackground()}
    </div>
  );
};

BackgroundManager.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onBackgroundChange: PropTypes.func,
};

export default BackgroundManager;
