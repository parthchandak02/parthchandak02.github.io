"use client";

import React, { ReactNode, HTMLAttributes } from 'react';

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: 'subtle' | 'medium' | 'strong' | 'crisp' | 'clean';
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title?: string;
}

export default function LiquidGlass({
  children,
  className = '',
  variant = 'clean',
  style,
  onClick,
  title,
  ...rest
}: LiquidGlassProps) {
  
  // Unified glass effect configurations - all with pill-shaped border radius
  const glassStyles = {
    subtle: {
      backdropFilter: 'blur(10px) saturate(110%)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    medium: {
      backdropFilter: 'blur(15px) saturate(115%)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
    },
    strong: {
      backdropFilter: 'blur(20px) saturate(120%)',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
    },
    crisp: {
      backdropFilter: 'blur(20px) saturate(120%)',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
    clean: {
      backdropFilter: 'blur(12px) saturate(115%)',
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 6px 14px rgba(0, 0, 0, 0.18)',
    }
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: '9999px', // Unified pill-shaped border radius
    transition: 'all 0.2s ease-out',
    position: 'relative',
    ...glassStyles[variant],
    ...style,
  };

  const hoverStyles = {
    transform: 'translateY(-1px)',
    boxShadow: glassStyles[variant].boxShadow.replace('0.2)', '0.3)').replace('0.18)', '0.25)').replace('0.15)', '0.22)').replace('0.25)', '0.35)'),
  };

  return (
    <div
      className={`liquid-glass liquid-glass-${variant} ${className}`}
      style={baseStyles}
      onClick={onClick}
      title={title}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyles);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, baseStyles);
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// Unified preset system - proper objects that can be spread
export const LiquidGlassPresets = {
  primary: { variant: 'medium' as const },
  secondary: { variant: 'clean' as const },
  subtle: { variant: 'subtle' as const },
  strong: { variant: 'strong' as const },
  crisp: { variant: 'crisp' as const },
  clean: { variant: 'clean' as const },
}; 