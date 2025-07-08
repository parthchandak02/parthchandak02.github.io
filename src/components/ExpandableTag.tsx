'use client';

import React, { useState } from 'react';
import * as Si from 'react-icons/si';
import * as Tb from 'react-icons/tb';

interface ExpandableTagProps {
  name: string;
  icon: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  expanded?: boolean;
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

// Function to get a color based on the tag name (for consistent colors)
const getTagColor = (name: string) => {
  // Simple hash function to generate a consistent color based on the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use the hash to select from predefined colors
  const colors = [
    '#ffd560', // Yellow
    '#ee4266', // Red
    '#9e88f7', // Purple
    '#54d0ff', // Blue
    '#4ade80', // Green
    '#f97316', // Orange
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

export default function ExpandableTag({ 
  name, 
  icon, 
  className = '', 
  size = 'medium',
  expanded = false
}: ExpandableTagProps) {
  const [userExpanded, setUserExpanded] = useState(false);
  const IconComponent = getIconComponent(icon);
  const tagColor = getTagColor(name);
  
  if (!IconComponent) {
    return null;
  }

  // Tag is expanded if either the prop says so or user interaction has expanded it
  const isExpanded = expanded || userExpanded;

  // Size configurations
  const sizes = {
    small: { 
      circle: 'h-8 w-8', 
      height: 'h-8', 
      iconSize: 'w-4 h-4', 
      text: 'text-xs', 
      padding: 'px-3',
      minWidth: 'min-w-8'
    },
    medium: { 
      circle: 'h-9 w-9', 
      height: 'h-9', 
      iconSize: 'w-4.5 h-4.5', 
      text: 'text-xs', 
      padding: 'px-3.5',
      minWidth: 'min-w-9'
    },
    large: { 
      circle: 'h-10 w-10', 
      height: 'h-10', 
      iconSize: 'w-5 h-5', 
      text: 'text-sm', 
      padding: 'px-4',
      minWidth: 'min-w-10'
    }
  };

  const config = sizes[size];

  return (
    <div
      className={`
        inline-flex items-center
        rounded-full border border-white/20 backdrop-blur-sm
        transition-all duration-300 cursor-pointer
        ${isExpanded ? `${config.height} w-auto ${config.padding}` : config.circle}
        ${isExpanded ? 'bg-white/10' : 'bg-white/5'}
        hover:bg-white/20
        ${className}
      `}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isExpanded ? 'flex-start' : 'center',
        minWidth: isExpanded ? 'auto' : undefined,
      }}
      title={name}
      onMouseEnter={() => setUserExpanded(true)}
      onMouseLeave={() => setUserExpanded(false)}
      onClick={() => setUserExpanded(!userExpanded)}
    >
      <div className="flex items-center justify-center">
        <IconComponent 
          className={`${config.iconSize} ${isExpanded ? 'mr-2' : ''}`} 
          style={{ color: isExpanded ? tagColor : 'rgba(255, 255, 255, 0.8)' }}
        />
      </div>
      
      {isExpanded && (
        <span 
          className={`whitespace-nowrap ${config.text} transition-opacity duration-200`}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
        >
          {name}
        </span>
      )}
    </div>
  );
} 