'use client';

import React, { useState } from 'react';
import * as Si from 'react-icons/si';
import * as Tb from 'react-icons/tb';
import LiquidGlass from './LiquidGlass';

interface ExpandableTagProps {
  name: string;
  icon: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

// Helper function to get the icon component from the icon string
const getIconComponent = (iconName: string) => {
  if (iconName.startsWith('Si')) {
    return (Si as any)[iconName];
  } else if (iconName.startsWith('Tb')) {
    return (Tb as any)[iconName];
  }
  return null;
};

export default function ExpandableTag({ 
  name, 
  icon, 
  className = '', 
  size = 'medium' 
}: ExpandableTagProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const IconComponent = getIconComponent(icon);
  
  if (!IconComponent) {
    return null;
  }

  // Show expanded state if either clicked to expand OR currently hovering
  const shouldShowExpanded = isExpanded || isHovered;

  // Size configurations
  const sizeConfig = {
    small: {
      height: 'h-8',
      containerWidth: 'w-8',
      expandedWidth: 'w-auto',
      padding: 'pr-3 pl-0',
      icon: 'w-4 h-4',
      iconContainer: 'w-8 h-full',
      text: 'text-xs',
      minWidth: 'min-w-8'
    },
    medium: {
      height: 'h-10 md:h-12',
      containerWidth: 'w-10 md:w-12',
      expandedWidth: 'w-auto',
      padding: 'pr-4 pl-0',
      icon: 'w-5 h-5 md:w-6 md:h-6',
      iconContainer: 'w-10 md:w-12 h-full',
      text: 'text-sm md:text-base',
      minWidth: 'min-w-10 md:min-w-12'
    },
    large: {
      height: 'h-12',
      containerWidth: 'w-12',
      expandedWidth: 'w-auto',
      padding: 'pr-4 pl-0',
      icon: 'w-6 h-6',
      iconContainer: 'w-12 h-full',
      text: 'text-base',
      minWidth: 'min-w-12'
    }
  };

  const config = sizeConfig[size];

  return (
    <LiquidGlass
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        relative inline-flex items-center 
        transition-[width] duration-300 ease-in-out 
        overflow-hidden cursor-pointer
        ${config.height}
        ${config.minWidth}
        ${shouldShowExpanded ? `${config.expandedWidth} ${config.padding}` : config.containerWidth}
        ${className}
      `}
      style={{
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center'
      }}
      title={name}
    >
      {/* Icon Container - Always centered in fixed space */}
      <div className={`flex items-center justify-center flex-shrink-0 ${config.iconContainer}`}>
        <IconComponent className={config.icon} />
      </div>
      
      {/* Text that appears on expansion */}
      <span className={`
        text-white transition-all duration-300 ease-in-out whitespace-nowrap
        ${config.text}
        ${shouldShowExpanded ? 'opacity-100 max-w-none' : 'opacity-0 max-w-0 overflow-hidden'}
      `}>
        {name}
      </span>
    </LiquidGlass>
  );
} 