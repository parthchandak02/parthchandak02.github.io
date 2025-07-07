"use client";

import React, { ReactNode, HTMLAttributes } from 'react';

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: 'subtle' | 'medium' | 'strong' | 'liquid';
  tintColor?: string;
  tintOpacity?: number;
  blurIntensity?: number;
  saturation?: number;
  innerShadow?: boolean;
  noise?: boolean;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title?: string;
}

export default function LiquidGlass({
  children,
  className = '',
  variant = 'medium',
  tintColor = '255, 255, 255',
  tintOpacity = 0.15,
  blurIntensity = 20,
  saturation = 120,
  innerShadow = true,
  noise = true,
  style = {},
  title,
  ...props
}: LiquidGlassProps) {
  
  // Variant presets based on research
  const variants = {
    subtle: {
      blur: 12,
      saturation: 110,
      tintOpacity: 0.08,
      shadowBlur: 15,
      shadowSpread: -3
    },
    medium: {
      blur: 20,
      saturation: 120,
      tintOpacity: 0.15,
      shadowBlur: 20,
      shadowSpread: -5
    },
    strong: {
      blur: 30,
      saturation: 130,
      tintOpacity: 0.25,
      shadowBlur: 25,
      shadowSpread: -7
    },
    liquid: {
      blur: 25,
      saturation: 140,
      tintOpacity: 0.2,
      shadowBlur: 30,
      shadowSpread: -8
    }
  };

  const config = variants[variant];

  // Create noise pattern (simple SVG approach from research)
  const noisePattern = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeBlend mode='screen'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E`;

  const liquidGlassStyle: React.CSSProperties = {
    // Base glass effect (from working examples)
    background: `rgba(${tintColor}, ${tintOpacity})`,
    backdropFilter: `blur(${blurIntensity || config.blur}px) saturate(${saturation || config.saturation}%)`,
    WebkitBackdropFilter: `blur(${blurIntensity || config.blur}px) saturate(${saturation || config.saturation}%)`,
    
    // Border and shape
    border: `1px solid rgba(${tintColor}, ${Math.min(tintOpacity * 2, 0.4)})`,
    borderRadius: '20px',
    
    // Outer shadow
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.12),
      0 4px 16px rgba(0, 0, 0, 0.08)
      ${innerShadow ? `, inset 0 0 ${config.shadowBlur}px ${config.shadowSpread}px rgba(255, 255, 255, 0.4)` : ''}
    `,
    
    // Position and overflow
    position: 'relative',
    overflow: 'hidden',
    
    // Performance optimizations
    willChange: 'transform',
    isolation: 'isolate',
    
    ...style
  };

  return (
    <div 
      className={`liquid-glass ${className}`}
      style={liquidGlassStyle}
      title={title}
      {...props}
    >
      {/* Noise overlay (if enabled) */}
      {noise && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("${noisePattern}")`,
            mixBlendMode: 'soft-light',
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}
      
      {/* Glass tint overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, 
            rgba(${tintColor}, ${tintOpacity * 0.5}) 0%,
            rgba(${tintColor}, ${tintOpacity * 0.8}) 100%
          )`,
          pointerEvents: 'none',
          zIndex: 2
        }}
      />
      
      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Export preset configurations for easy use
export const LiquidGlassPresets = {
  // Primary glass style (main UI elements)
  primary: {
    tintColor: '255, 255, 255',
    tintOpacity: 0.12,
    blurIntensity: 20,
    saturation: 120,
    variant: 'medium' as const
  },
  
  // Secondary variant with red tint
  secondary: {
    tintColor: '229, 62, 62',
    tintOpacity: 0.1,
    blurIntensity: 16,
    saturation: 130,
    variant: 'medium' as const
  },
  
  // Legacy presets for compatibility (now using red theme)
  iOS: {
    tintColor: '255, 255, 255',
    tintOpacity: 0.12,
    blurIntensity: 20,
    saturation: 120,
    variant: 'medium' as const
  },
  
  dark: {
    tintColor: '229, 62, 62',
    tintOpacity: 0.15,
    blurIntensity: 18,
    saturation: 125,
    variant: 'medium' as const
  },
  
  // Red variants for consistency
  blue: {
    tintColor: '229, 62, 62',
    tintOpacity: 0.12,
    blurIntensity: 20,
    saturation: 120,
    variant: 'medium' as const
  },
  
  purple: {
    tintColor: '229, 62, 62',
    tintOpacity: 0.12,
    blurIntensity: 20,
    saturation: 120,
    variant: 'medium' as const
  },
  
  // High-impact variant
  dramatic: {
    tintColor: '229, 62, 62',
    tintOpacity: 0.2,
    blurIntensity: 30,
    saturation: 140,
    variant: 'strong' as const
  }
}; 