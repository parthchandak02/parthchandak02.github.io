'use client';

import React from 'react';
import { 
  EnvelopeIcon, 
  CalendarDaysIcon 
} from '@heroicons/react/24/outline';
import LiquidGlass, { LiquidGlassPresets } from './LiquidGlass';
import { SocialMediaItem } from '../lib/contentLoader';

interface RightSocialBarProps {
  items: SocialMediaItem[];
  className?: string;
}

const iconMap = {
  EnvelopeIcon,
  CalendarDaysIcon,
};

// Custom LinkedIn and GitHub icons as SVG
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const customIconMap = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
};

export const RightSocialBar: React.FC<RightSocialBarProps> = ({
  items,
  className = ''
}) => {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getIconComponent = (icon: string) => {
    if (customIconMap[icon as keyof typeof customIconMap]) {
      return customIconMap[icon as keyof typeof customIconMap];
    }
    return iconMap[icon as keyof typeof iconMap] || EnvelopeIcon;
  };

  return (
    <div className={`
      fixed z-50 
      /* Mobile: Bottom center horizontal pill */
      bottom-4 left-1/2 transform -translate-x-1/2 w-auto
      /* Desktop: Right side vertical */
      lg:right-6 lg:top-1/2 lg:bottom-auto lg:left-auto lg:transform lg:-translate-y-1/2 lg:translate-x-0
      ${className}
    `}>
      <LiquidGlass 
        {...LiquidGlassPresets.primary}
        className="
          /* Mobile: horizontal pill shape with proper padding */
          px-4 py-2.5 rounded-full
          /* Desktop: vertical padding with different border radius */
          lg:p-4 lg:rounded-2xl
        "
      >
        <nav className="
          /* Mobile: horizontal flex with proper spacing */
          flex flex-row space-x-4 items-center
          /* Desktop: vertical flex */
          lg:flex-col lg:space-x-0 lg:space-y-4
        ">
          {items.map((item) => {
            const IconComponent = getIconComponent(item.icon);
            
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.url)}
                className="
                  relative rounded-xl transition-all duration-300
                  text-white/70 hover:text-white hover:bg-red-500/20
                  hover:scale-110 transform
                  group flex-shrink-0
                  /* Mobile: compact padding for pill shape */
                  p-2
                  /* Desktop: larger padding */
                  lg:p-3
                "
                title={item.label}
              >
                <IconComponent className="w-5 h-5 lg:w-6 lg:h-6" />
                
                {/* Tooltip only on desktop */}
                <div className="
                  absolute z-10 px-2 py-1 text-xs bg-black/80 text-white rounded
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  pointer-events-none whitespace-nowrap
                  /* Position tooltip appropriately for desktop */
                  hidden lg:block
                  -left-16 top-1/2 transform -translate-y-1/2
                ">
                  {item.label}
                  <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
                </div>
              </button>
            );
          })}
        </nav>
      </LiquidGlass>
    </div>
  );
}; 