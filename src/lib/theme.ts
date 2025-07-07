/**
 * Clean, Minimal, Impactful Typography System - 2025 Edition
 * 
 * This file contains all font configurations optimized for modern design portfolios.
 * Features Space Grotesk - a geometric sans-serif with character and impact.
 * 
 * WHY SPACE GROTESK?
 * - Modern geometric design with clean lines
 * - Excellent readability at all sizes
 * - Character and impact without being overly decorative
 * - Perfect for all-caps navigation
 * - Professional yet distinctive
 * - Available on Google Fonts
 * 
 * CURRENT TYPOGRAPHY HIERARCHY:
 * 
 * Primary Font (Space Grotesk):
 * - Base font for the entire application
 * - Clean, readable, modern
 * - Used as fallback for all text
 * 
 * Navigation Font (Space Grotesk Bold):
 * - ALL CAPS formatting for impact
 * - Bold weight (600-700)
 * - Extra letter spacing for readability
 * - Used for: Left navigation, right social bar, timeline tags
 * 
 * Title Font (Space Grotesk Medium):
 * - Medium to bold weights (500-700)
 * - Used for: Main headings, timeline card titles, about section title
 * 
 * Secondary Font (Space Grotesk Light):
 * - Light to regular weights (300-500)
 * - Used for: Body text, descriptions, dates, locations
 * 
 * HOW TO CHANGE FONTS:
 * 
 * 1. To change the entire font family:
 *    - Update the font import in layout.tsx
 *    - Update the font names in fontConfig below
 *    - All elements will automatically use the new font
 * 
 * 2. To change specific font roles:
 *    - Update the corresponding font configuration below
 *    - Modify the font weights as needed
 *    - The changes will apply to all elements using that font class
 * 
 * 3. To adjust the all-caps navigation:
 *    - Modify the CSS in globals.css (.font-navigation)
 *    - Adjust letter-spacing, font-weight, or text-transform
 */

export const fontConfig = {
  // Primary Font - Base font for the entire application
  primary: {
    name: 'Space Grotesk',
    variable: '--font-primary',
    usage: 'Base font for entire application, fallback for all text',
    weights: ['300', '400', '500', '600', '700'],
    characteristics: 'Clean, modern geometric sans-serif with excellent readability'
  },
  
  // Navigation Font - Bold, all-caps for impact
  navigation: {
    name: 'Space Grotesk',
    variable: '--font-navigation',
    usage: 'Left navigation, right social bar, timeline tags (ALL CAPS)',
    weights: ['600', '700'],
    characteristics: 'Bold, all-caps, extra letter spacing for maximum impact',
    special: 'Automatically applies uppercase, bold weight, and letter spacing'
  },
  
  // Title Font - Medium weight for headings
  title: {
    name: 'Space Grotesk',
    variable: '--font-title',
    usage: 'Main headings, timeline card titles, about section title',
    weights: ['500', '600', '700'],
    characteristics: 'Medium to bold weights for visual hierarchy'
  },
  
  // Secondary Font - Light weight for body text
  secondary: {
    name: 'Space Grotesk',
    variable: '--font-secondary',
    usage: 'Body text, descriptions, dates, locations, details',
    weights: ['300', '400', '500'],
    characteristics: 'Light to regular weights for comfortable reading'
  }
};

/**
 * Typography Scale
 * Consistent sizing across the portfolio
 */
export const typographyScale = {
  // Navigation text sizes
  navigation: {
    mobile: 'text-xs',
    desktop: 'text-sm'
  },
  
  // Title text sizes
  title: {
    hero: 'text-4xl md:text-6xl',
    section: 'text-2xl md:text-3xl',
    card: 'text-lg md:text-xl'
  },
  
  // Body text sizes
  body: {
    large: 'text-lg md:text-xl',
    regular: 'text-base md:text-lg',
    small: 'text-sm md:text-base'
  }
};

/**
 * Font Weight Scale
 * Consistent weights for different contexts
 */
export const fontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700'
};

/**
 * Letter Spacing Scale
 * For different text contexts
 */
export const letterSpacing = {
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
};

// Central theme configuration for the portfolio
export const theme = {
  colors: {
    // Primary reddish theme
    primary: '#E53E3E', // Red-500
    primaryLight: '#FC8181', // Red-300
    primaryDark: '#C53030', // Red-600
    
    // Glass effect colors
    glass: {
      primary: 'rgba(229, 62, 62, 0.1)', // Primary red with transparency
      secondary: 'rgba(197, 48, 48, 0.15)', // Darker red with transparency
      accent: 'rgba(252, 129, 129, 0.08)', // Light red with transparency
    },
    
    // Text colors
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      tertiary: 'rgba(255, 255, 255, 0.6)',
    },
    
    // Background overlays
    overlay: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.15)',
      strong: 'rgba(255, 255, 255, 0.2)',
    },
    
    // State colors (keeping red theme)
    states: {
      hover: 'rgba(229, 62, 62, 0.2)',
      active: 'rgba(229, 62, 62, 0.3)',
      focus: 'rgba(229, 62, 62, 0.15)',
    }
  },
  
  // Glass morphism presets
  glass: {
    primary: {
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(20px) saturate(120%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 0 20px -5px rgba(255, 255, 255, 0.4)',
    },
    secondary: {
      background: 'rgba(229, 62, 62, 0.1)',
      backdropFilter: 'blur(16px) saturate(130%)',
      border: '1px solid rgba(229, 62, 62, 0.3)',
      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.1), inset 0 0 16px -3px rgba(229, 62, 62, 0.2)',
    },
    accent: {
      background: 'rgba(252, 129, 129, 0.08)',
      backdropFilter: 'blur(12px) saturate(110%)',
      border: '1px solid rgba(252, 129, 129, 0.2)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    }
  },
  
  // Timeline specific styling
  timeline: {
    iconBackground: '#E53E3E', // Consistent red for all icons
    iconColor: '#FFFFFF',
    lineColor: 'rgba(229, 62, 62, 0.3)',
    pointColor: '#E53E3E',
    cardGlow: 'rgba(229, 62, 62, 0.1)',
  },
  
  // Navigation colors
  navigation: {
    background: 'rgba(255, 255, 255, 0.12)',
    hover: 'rgba(229, 62, 62, 0.2)',
    active: 'rgba(229, 62, 62, 0.3)',
    indicator: '#E53E3E',
  },
  
  // Social media (keeping brand colors but with red fallback)
  social: {
    linkedin: '#0077B5',
    github: '#333333',
    email: '#E53E3E', // Use theme red
    calendar: '#E53E3E', // Use theme red
  },
  
  // Spacing and sizing
  spacing: {
    timelineIconSize: '64px', // 16 * 4 = 64px
    timelineIconPadding: '16px',
    timelineLineWidth: '2px',
    timelinePointSize: '12px',
  },
  
  // Typography - Updated for Space Grotesk
  typography: {
    fontFamily: 'Space Grotesk, system-ui, sans-serif',
    headings: {
      color: '#FFFFFF',
      weight: '600',
    },
    body: {
      color: 'rgba(255, 255, 255, 0.8)',
      weight: '400',
    },
    accent: {
      color: '#E53E3E',
      weight: '500',
    }
  }
};

// Helper functions for consistent styling
export const getGlassStyle = (variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
  const glassConfig = theme.glass[variant];
  return {
    background: glassConfig.background,
    backdropFilter: glassConfig.backdropFilter,
    WebkitBackdropFilter: glassConfig.backdropFilter,
    border: glassConfig.border,
    boxShadow: glassConfig.boxShadow,
  };
};

export const getTimelineIconStyle = () => ({
  width: theme.spacing.timelineIconSize,
  height: theme.spacing.timelineIconSize,
  backgroundColor: theme.timeline.iconBackground,
  color: theme.timeline.iconColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: `2px solid rgba(255, 255, 255, 0.2)`,
  boxShadow: `0 4px 16px rgba(229, 62, 62, 0.3)`,
});

export const getNavigationStyle = (isActive: boolean = false) => ({
  backgroundColor: isActive ? theme.navigation.active : 'transparent',
  color: theme.colors.text.primary,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.navigation.hover,
  }
});

export default theme; 