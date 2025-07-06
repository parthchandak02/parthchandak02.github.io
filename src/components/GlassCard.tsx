"use client";

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong';
  onClick?: () => void;
}

export default function GlassCard({ 
  children, 
  className = '', 
  variant = 'default',
  onClick 
}: GlassCardProps) {
  const baseClass = variant === 'strong' ? 'glass-strong' : 'glass-card';
  
  return (
    <div 
      className={`${baseClass} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
} 