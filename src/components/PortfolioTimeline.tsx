'use client';

import React, { useState } from 'react';
import { 
  BriefcaseIcon, 
  TrophyIcon, 
  ChartBarIcon, 
  CodeBracketIcon, 
  ShoppingCartIcon, 
  AcademicCapIcon,
  MapPinIcon,
  LightBulbIcon,
  BeakerIcon,
  UsersIcon,
  FilmIcon,
  RocketLaunchIcon,
  DocumentIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import LiquidGlass, { LiquidGlassPresets } from './LiquidGlass';
import { ContentItem } from '../lib/contentLoader';

interface PortfolioTimelineProps {
  items: ContentItem[];
  className?: string;
}

const iconMap = {
  BriefcaseIcon,
  TrophyIcon,
  ChartBarIcon,
  CodeBracketIcon,
  ShoppingCartIcon,
  AcademicCapIcon,
  LightBulbIcon,
  BeakerIcon,
  UsersIcon,
  FilmIcon,
  RocketLaunchIcon,
  DocumentIcon,
};

const getTypeStyles = (type: string) => {
  // All content types now use consistent white/glass theme to match navigation
  const badgeText = type.charAt(0).toUpperCase() + type.slice(1);
  
  return {
    preset: LiquidGlassPresets.primary,
    badgeColor: 'bg-white/10 border border-white/20 backdrop-blur-sm', // Glass morphism style like navigation
    badgeText: badgeText
  };
};

const TimelineCard: React.FC<{ item: ContentItem; isLast: boolean }> = ({ item, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[item.icon as keyof typeof iconMap] || BriefcaseIcon;
  const styles = getTypeStyles(item.type);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="relative flex items-start pb-8 md:pb-12">
      {/* Left column - Timeline track with icon */}
      <div className="flex flex-col items-center flex-shrink-0 relative">
        {/* Timeline line - extends from top to bottom */}
        {!isLast && (
          <div className="absolute top-12 md:top-16 bottom-0 w-0.5 bg-white/20 left-1/2 transform -translate-x-1/2" />
        )}
        
        {/* Glass morphism icon container - mobile optimized */}
        <div className="relative z-10 mb-2">
          <LiquidGlass
            {...LiquidGlassPresets.primary}
            className="
              w-12 h-12 rounded-full 
              border border-white/10
              md:w-14 md:h-14 
              lg:w-16 lg:h-16
              relative
            "
          >
            {/* Icon/Logo positioned absolutely in center */}
            <div className="
              absolute inset-0 
              flex items-center justify-center
            ">
              {item.iconOverride ? (
                <img 
                  src={`/images/${item.iconOverride}`}
                  alt={`${item.company} logo`}
                  className="
                    w-6 h-6 object-contain
                    md:w-8 md:h-8
                    lg:w-10 lg:h-10
                  "
                />
              ) : (
                <IconComponent className="
                  w-5 h-5 text-white
                  md:w-6 md:h-6
                  lg:w-7 lg:h-7
                " />
              )}
            </div>
          </LiquidGlass>
        </div>
      </div>
      
      {/* Content Card - Mobile optimized */}
      <div className="flex-1 min-w-0 ml-4 md:ml-8">
        <LiquidGlass 
          {...styles.preset}
          className={`timeline-card group rounded-2xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden
                     ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'} 
                     ${isExpanded ? 'min-h-[200px] md:min-h-[250px]' : 'min-h-[100px] md:min-h-[120px]'}
                     hover:p-6 hover:min-h-[200px] md:hover:min-h-[250px]`}
          onClick={toggleExpanded}
        >
          {/* Mobile: Always show essential info, Desktop: Compact Header */}
          <div className="flex items-start justify-between mb-2 md:mb-2">
            <div className="flex-1 min-w-0 pr-2 md:pr-4">
              <h3 className={`font-semibold text-white mb-1 transition-all duration-300 
                ${isExpanded ? 'text-lg md:text-xl' : 'text-base md:text-base'} 
                group-hover:text-lg md:group-hover:text-xl
                ${isExpanded ? 'line-clamp-none' : 'line-clamp-1 md:truncate'}`}>
                {item.title}
              </h3>
              <p className={`text-white/90 font-medium mb-1 transition-all duration-300
                ${isExpanded ? 'text-sm md:text-base' : 'text-sm md:text-sm'}
                ${isExpanded ? 'line-clamp-none' : 'line-clamp-1 md:truncate'}`}>
                {item.company}
              </p>
              {item.location && item.location.trim() !== '' && (
                <div className="flex items-center gap-1 text-white/70 text-xs md:text-xs">
                  <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                  <span className={isExpanded ? 'line-clamp-none' : 'truncate'}>{item.location}</span>
                </div>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <span className={`font-medium text-white/80 transition-all duration-300
                ${isExpanded ? 'text-sm md:text-base' : 'text-xs md:text-xs'}
                group-hover:text-sm md:group-hover:text-base`}>
                {item.date}
              </span>
            </div>
          </div>
          
          {/* Category Badge - Always Visible */}
          <div className="flex justify-end mb-2 md:mb-2 transition-all duration-300">
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${styles.badgeColor} flex-shrink-0`}>
              {styles.badgeText}
            </span>
          </div>
          
          {/* Mobile: Show/hide content based on isExpanded, Desktop: Hover behavior */}
          <div className={`expandable-content overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'opacity-100 max-h-[600px]' : 'opacity-0 max-h-0'} 
            md:group-hover:opacity-100 md:group-hover:max-h-[600px]`}>
            
            {/* Project Image */}
            {item.image && (
              <div className="pt-2 border-t border-white/10 mb-4">
                <div className="relative overflow-hidden rounded-lg">
                  {item.link ? (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img 
                        src={`/images/${item.image}`}
                        alt={item.title}
                        className="w-full h-32 md:h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </a>
                  ) : (
                    <img 
                      src={`/images/${item.image}`}
                      alt={item.title}
                      className="w-full h-32 md:h-48 object-cover"
                    />
                  )}
                </div>
              </div>
            )}
            
            {/* Description */}
            <div className={`${item.image ? 'mb-4' : 'pt-2 border-t border-white/10 mb-4'}`}>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
            
            {/* Technologies */}
            {item.technologies && (
              <div className="flex flex-wrap gap-2 mb-4">
                {(Array.isArray(item.technologies) ? item.technologies : [item.technologies]).map((tech: string) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 text-xs bg-white/10 text-white/90 rounded-md backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            
            {/* Link */}
            {item.link && (
              <div className="flex justify-start">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>
          
          {/* Subtle Caret Indicator - Bottom Center */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out pointer-events-none">
            {/* Show up caret when expanded (mobile) or on hover (desktop) */}
            <ChevronUpIcon className={`w-4 h-4 text-white/40 transition-all duration-300 absolute ${
              isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            } md:group-hover:opacity-60 md:group-hover:translate-y-0`} />
            
            {/* Show down caret when collapsed and not hovered */}
            <ChevronDownIcon className={`w-4 h-4 text-white/40 transition-all duration-300 absolute ${
              !isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
            } md:group-hover:opacity-0 md:group-hover:-translate-y-1`} />
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
};

export const PortfolioTimeline: React.FC<PortfolioTimelineProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 ${className}`}>
      {/* Timeline Items */}
      <div className="relative">
        {items.map((item, index) => (
          <TimelineCard 
            key={item.id} 
            item={item} 
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}; 