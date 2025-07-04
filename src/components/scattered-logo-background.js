import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Import company logos
import arthLogo from '../images/company-logos/arth-systems-logo.png';
import bergLogo from '../images/company-logos/berg-logo.png';
import boeingLogo from '../images/company-logos/boeing-logo.png';
import cubeLogo from '../images/company-logos/cube-logo.png';
import teslaLogo from '../images/company-logos/tesla-logo.png';
import wsuLogo from '../images/company-logos/washington-state-uni-logo.png';
import zooxLogo from '../images/company-logos/zoox-logo.png';

/**
 * ScatteredLogoBackground Component
 *
 * Creates a subtle background pattern with scattered company logos and tech icons
 * Features:
 * - Toggle on/off functionality
 * - Configurable opacity and density
 * - Responsive design
 * - Performance optimized
 */

const ScatteredLogoBackground = ({
  enabled = false,
  opacity = 0.08,
  density = 0.3,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Logo configuration - easy to modify
  const logoConfig = {
    companyLogos: [
      { src: arthLogo, name: 'Arth Systems', weight: 2 },
      { src: bergLogo, name: 'Berg', weight: 2 },
      { src: boeingLogo, name: 'Boeing', weight: 3 },
      { src: cubeLogo, name: 'Cube', weight: 2 },
      { src: teslaLogo, name: 'Tesla', weight: 3 },
      { src: wsuLogo, name: 'WSU', weight: 2 },
      { src: zooxLogo, name: 'Zoox', weight: 3 },
    ],
    // Add tech icons as data URIs for common symbols
    techIcons: [
      {
        name: 'Code',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 3L7.1 4.4 11.7 9H3V11H11.7L7.1 15.6L8.5 17L15 10.5L8.5 3Z"/>
        </svg>`,
        weight: 2,
      },
      {
        name: 'CPU',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 7H7V9H5V7M5 11H7V13H5V11M5 15H7V17H5V15M9 7H11V9H9V7M9 11H11V13H9V11M9 15H11V17H9V15M13 7H15V9H13V7M13 11H15V13H13V11M13 15H15V17H13V15M17 7H19V9H17V7M17 11H19V13H17V11M17 15H19V17H17V15Z"/>
        </svg>`,
        weight: 1,
      },
      {
        name: 'Gear',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.5 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.5 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.22 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.22 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.5 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.5 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z"/>
        </svg>`,
        weight: 1,
      },
    ],
    sizes: {
      min: 20,
      max: 45,
      company: { min: 25, max: 40 },
      tech: { min: 15, max: 30 },
    },
    colors: {
      light: 'rgba(200, 200, 200, 0.6)',
      accent: 'rgba(220, 100, 100, 0.4)',
      tech: 'rgba(180, 180, 180, 0.3)',
    },
  };

  // Update dimensions on resize
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.max(rect.width, window.innerWidth),
        height: Math.max(rect.height, window.innerHeight),
      });
    }
  }, []);

  // Generate weighted logo array
  const getWeightedLogos = useCallback(() => {
    const weighted = [];

    // Add company logos with their weights
    logoConfig.companyLogos.forEach(logo => {
      for (let i = 0; i < logo.weight; i++) {
        weighted.push({ ...logo, type: 'company' });
      }
    });

    // Add tech icons with their weights
    logoConfig.techIcons.forEach(icon => {
      for (let i = 0; i < icon.weight; i++) {
        weighted.push({ ...icon, type: 'tech' });
      }
    });

    return weighted;
  }, []);

  // Generate scattered pattern
  const generatePattern = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled || dimensions.width === 0) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const { width, height } = dimensions;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const weightedLogos = getWeightedLogos();

    // Create a more uniform grid-based distribution
    const baseSpacing = 120; // Base spacing between logos
    const spacing = baseSpacing * (1 / Math.sqrt(density)); // Adjust spacing based on density
    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);
    const logoCount = Math.floor(cols * rows * density * 1.5); // Increased density multiplier

    const logoPromises = [];

    // Generate grid-based positions with randomness
    for (let i = 0; i < logoCount; i++) {
      const randomLogo = weightedLogos[Math.floor(Math.random() * weightedLogos.length)];

      // Grid-based positioning with random offset
      const gridX = (i % cols) * spacing + spacing / 2;
      const gridY = Math.floor(i / cols) * spacing + spacing / 2;

      // Add random offset for more natural look (up to 1/3 of spacing)
      const randomOffsetX = (Math.random() - 0.5) * spacing * 0.6;
      const randomOffsetY = (Math.random() - 0.5) * spacing * 0.6;

      const x = Math.max(50, Math.min(width - 50, gridX + randomOffsetX));
      const y = Math.max(50, Math.min(height - 50, gridY + randomOffsetY));
      const rotation = (Math.random() - 0.5) * 30; // ±15 degrees

      let size;
      if (randomLogo.type === 'company') {
        size =
          logoConfig.sizes.company.min +
          Math.random() * (logoConfig.sizes.company.max - logoConfig.sizes.company.min);
      } else {
        size =
          logoConfig.sizes.tech.min +
          Math.random() * (logoConfig.sizes.tech.max - logoConfig.sizes.tech.min);
      }

      if (randomLogo.type === 'company') {
        // Handle PNG company logos
        logoPromises.push(
          new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
              ctx.save();
              ctx.globalAlpha = opacity * (0.7 + Math.random() * 0.3);
              ctx.translate(x, y);
              ctx.rotate((rotation * Math.PI) / 180);
              ctx.drawImage(img, -size / 2, -size / 2, size, size);
              ctx.restore();
              resolve();
            };
            img.src = randomLogo.src;
          }),
        );
      } else {
        // Handle SVG tech icons
        logoPromises.push(
          new Promise(resolve => {
            const img = new Image();
            const svgBlob = new Blob([randomLogo.svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);

            img.onload = () => {
              ctx.save();
              ctx.globalAlpha = opacity * (0.5 + Math.random() * 0.3);
              ctx.fillStyle = logoConfig.colors.tech;
              ctx.translate(x, y);
              ctx.rotate((rotation * Math.PI) / 180);
              ctx.drawImage(img, -size / 2, -size / 2, size, size);
              ctx.restore();
              URL.revokeObjectURL(url);
              resolve();
            };
            img.src = url;
          }),
        );
      }
    }

    await Promise.all(logoPromises);
    setIsGenerated(true);
  }, [enabled, dimensions, density, opacity, getWeightedLogos]);

  // Handle window resize
  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Generate pattern when enabled or dimensions change
  useEffect(() => {
    if (enabled && dimensions.width > 0) {
      setIsGenerated(false);
      const timer = setTimeout(generatePattern, 100);
      return () => clearTimeout(timer);
    }
  }, [enabled, dimensions, generatePattern]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`scattered-logo-background ${className}`}
      style={{
        position: 'fixed',
        zIndex: -1,
        pointerEvents: 'none',
        // Add dark background base
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)',
        // 🎯 iOS Safe Area Support - Extend to full viewport
        top: 'calc(0px - env(safe-area-inset-top))',
        left: 'calc(0px - env(safe-area-inset-left))',
        right: 'calc(0px - env(safe-area-inset-right))',
        bottom: 'calc(0px - env(safe-area-inset-bottom))',
        width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
        height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))',
        ...style,
      }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isGenerated ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
};

ScatteredLogoBackground.propTypes = {
  enabled: PropTypes.bool,
  opacity: PropTypes.number,
  density: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ScatteredLogoBackground;
