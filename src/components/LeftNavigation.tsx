'use client';

import React from 'react';
import { 
  UserIcon, 
  BriefcaseIcon, 
  RocketLaunchIcon, 
  TrophyIcon, 
  EnvelopeIcon,
  BeakerIcon,
  UsersIcon,
  FilmIcon
} from '@heroicons/react/24/outline';
import LiquidGlass, { LiquidGlassPresets } from './LiquidGlass';
import { NavigationItem } from '../types/portfolio';

interface LeftNavigationProps {
  items: NavigationItem[];
  activeSection?: string;
  onSectionClick?: (section: string) => void;
  className?: string;
}

const iconMap = {
  UserIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
  TrophyIcon,
  EnvelopeIcon,
  BeakerIcon,
  UsersIcon,
  FilmIcon,
};

export const LeftNavigation: React.FC<LeftNavigationProps> = ({
  items,
  activeSection,
  onSectionClick,
  className = ''
}) => {
  return (
    <>
      {/* Desktop Navigation - Left Sidebar */}
      <div className={`hidden lg:flex fixed left-6 top-1/2 transform -translate-y-1/2 z-20 ${className}`}>
        <LiquidGlass
          {...LiquidGlassPresets.primary}
          className="w-48 p-4"
        >
          <div className="space-y-4">
            {items.map((item) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              const isActive = activeSection === item.section;
              
              return (
                <button
                  key={item.section}
                  onClick={() => onSectionClick?.(item.section)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium truncate font-navigation">{item.label}</span>
                </button>
              );
            })}
          </div>
        </LiquidGlass>
      </div>

      {/* Mobile Navigation - Top Center, Double Height with Two Rows */}
      <div className={`lg:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-20 w-[calc(100vw-2rem)] max-w-sm ${className}`}>
        <LiquidGlass
          {...LiquidGlassPresets.primary}
          className="w-full p-3"
        >
          <div className="grid grid-cols-4 gap-2">
            {items.map((item) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              const isActive = activeSection === item.section;
              
              return (
                <button
                  key={item.section}
                  onClick={() => onSectionClick?.(item.section)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium text-center leading-tight font-navigation">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LiquidGlass>
      </div>
    </>
  );
}; 