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
  
  // Typography
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
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

/**
 * Font Configuration System
 * 
 * This file contains all font configurations for the portfolio.
 * To change fonts, simply update the values here and they will be applied globally.
 * 
 * USAGE EXAMPLES:
 * 
 * 1. Change Navigation Font:
 *    - Update fontConfig.navigation.name to desired font
 *    - Update the font import in layout.tsx
 *    - All navigation elements will automatically use the new font
 * 
 * 2. Change Title Font:
 *    - Update fontConfig.title.name to desired font
 *    - Update the font import in layout.tsx
 *    - All titles and subtitles will automatically use the new font
 * 
 * 3. Change Secondary Font:
 *    - Update fontConfig.secondary.name to desired font
 *    - Update the font import in layout.tsx
 *    - All body text, dates, and locations will automatically use the new font
 * 
 * CURRENT FONT HIERARCHY:
 * 
 * Navigation Font (Montserrat):
 * - Left navigation bar labels
 * - Right social media bar (icons only)
 * - Timeline card category badges
 * - Timeline card technology tags
 * - Button text
 * 
 * Title Font (Source Sans Pro):
 * - About section main title
 * - About section category headings
 * - Timeline card titles
 * - Timeline card company names
 * - Contact section heading
 * 
 * Secondary Font (Source Sans Pro):
 * - About section descriptions
 * - About section details (position, location, etc.)
 * - Timeline card dates
 * - Timeline card locations
 * - Timeline card descriptions
 * - Contact section description
 * 
 * FILES TO UPDATE WHEN CHANGING FONTS:
 * 1. src/app/layout.tsx - Font imports and variable definitions
 * 2. src/lib/theme.ts - Font configuration (this file)
 * 3. src/app/globals.css - Font utility classes (already configured)
 */

export const fontConfig = {
  // Navigation Font - Used for navigation bars, filters, and tags
  navigation: {
    name: 'Montserrat',
    variable: '--font-navigation',
    usage: 'Navigation bars, timeline tags, filters, buttons',
    weights: ['400', '500', '600', '700'],
    characteristics: 'Clean, geometric, perfect for all-caps',
    appliedTo: [
      'LeftNavigation labels',
      'Timeline category badges',
      'Timeline technology tags',
      'About section skill tags',
      'Call-to-action buttons'
    ]
  },
  
  // Title/Subtitle Font - Used for main headings and card titles
  title: {
    name: 'Source Sans Pro',
    variable: '--font-title', 
    usage: 'About section titles, timeline card titles/subtitles',
    weights: ['400', '600', '700'],
    characteristics: 'Strong display font with visual impact',
    appliedTo: [
      'About section main title (Parth Chandak)',
      'About section category headings',
      'Timeline card titles',
      'Timeline card company names',
      'Contact section heading'
    ]
  },
  
  // Secondary/Body Font - Used for details, dates, locations
  secondary: {
    name: 'Source Sans Pro',
    variable: '--font-secondary',
    usage: 'Dates, locations, descriptions, body text',
    weights: ['300', '400', '500'],
    characteristics: 'Excellent readability for details',
    appliedTo: [
      'About section descriptions',
      'About section details',
      'Timeline card dates',
      'Timeline card locations',
      'Timeline card descriptions',
      'Contact section description',
      'Typewriter text'
    ]
  }
};

// CSS Custom Properties for easy font management
export const fontVariables = {
  '--font-navigation': 'var(--font-navigation)',
  '--font-title': 'var(--font-title)',
  '--font-secondary': 'var(--font-secondary)',
};

// Utility classes for easy font application
export const fontClasses = {
  navigation: 'font-navigation',
  title: 'font-title',
  secondary: 'font-secondary',
};

// Alternative font suggestions for easy swapping
export const alternativeFonts = {
  navigation: [
    {
      name: 'Neue Montreal',
      characteristics: 'Modern, structured, excellent for UI',
      googleFont: false,
      source: 'Pangram Pangram Foundry'
    },
    {
      name: 'Clash Grotesk',
      characteristics: 'Clean, efficient, tech-oriented',
      googleFont: false,
      source: 'Fontshare'
    },
    {
      name: 'Inter',
      characteristics: 'Highly legible, UI-focused',
      googleFont: true,
      source: 'Google Fonts'
    }
  ],
  title: [
    {
      name: 'Clash Display',
      characteristics: 'Strong, contemporary, visual impact',
      googleFont: false,
      source: 'Fontshare'
    },
    {
      name: 'Satoshi',
      characteristics: 'Minimalist, clean, modern',
      googleFont: false,
      source: 'Fontshare'
    },
    {
      name: 'Aeonik',
      characteristics: 'Professional, structured, elegant',
      googleFont: false,
      source: 'CoType Foundry'
    }
  ],
  secondary: [
    {
      name: 'Lato',
      characteristics: 'Warm, readable, friendly',
      googleFont: true,
      source: 'Google Fonts'
    },
    {
      name: 'Inter',
      characteristics: 'Neutral, highly readable',
      googleFont: true,
      source: 'Google Fonts'
    },
    {
      name: 'Source Sans 3',
      characteristics: 'Professional, Adobe-quality',
      googleFont: true,
      source: 'Google Fonts'
    }
  ]
};

/**
 * How to Change Fonts:
 * 
 * EXAMPLE: Changing Navigation Font from Montserrat to Inter
 * 
 * 1. Update layout.tsx:
 *    ```typescript
 *    import { Inter, Source_Sans_3 } from "next/font/google";
 *    
 *    const navigationFont = Inter({
 *      variable: "--font-navigation",
 *      subsets: ["latin"],
 *      weight: ["400", "500", "600", "700"],
 *      display: "swap",
 *    });
 *    ```
 * 
 * 2. Update this file (theme.ts):
 *    ```typescript
 *    navigation: {
 *      name: 'Inter',
 *      variable: '--font-navigation',
 *      // ... rest of config
 *    }
 *    ```
 * 
 * 3. The font will automatically apply to all navigation elements!
 * 
 * EXAMPLE: Using a Non-Google Font (like Clash Display)
 * 
 * 1. Download the font files and place them in public/fonts/
 * 2. Update layout.tsx to use local font:
 *    ```typescript
 *    import localFont from 'next/font/local';
 *    
 *    const titleFont = localFont({
 *      src: [
 *        {
 *          path: '../public/fonts/ClashDisplay-Regular.woff2',
 *          weight: '400',
 *          style: 'normal',
 *        },
 *        {
 *          path: '../public/fonts/ClashDisplay-Bold.woff2',
 *          weight: '700',
 *          style: 'normal',
 *        },
 *      ],
 *      variable: '--font-title',
 *      display: 'swap',
 *    });
 *    ```
 * 
 * 3. Update this file to reflect the change
 * 
 * All components will automatically use the new fonts!
 */ 