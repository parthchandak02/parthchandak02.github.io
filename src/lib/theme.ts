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