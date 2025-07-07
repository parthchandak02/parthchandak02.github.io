'use client';

import React, { useState, useEffect } from 'react';
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
          className={`timeline-card group rounded-2xl transition-all duration-500 ease-in-out cursor-pointer overflow-hidden
                     ${isExpanded ? 'p-6' : 'p-4'}
                     ${isExpanded ? 'min-h-[250px]' : 'min-h-[120px]'}
                     hover:shadow-lg`}
          onClick={toggleExpanded}
        >
          {/* Mobile: Always show essential info, Desktop: Compact Header */}
          <div className={`flex items-start justify-between mb-4 transition-all duration-500 ease-in-out
                          ${isExpanded ? 'mb-6' : 'mb-4'}`}>
            <div className="flex-1 min-w-0 pr-4">
              <h3 className={`font-semibold text-white transition-all duration-500 font-title
                             ${isExpanded ? 'text-lg md:text-xl mb-3' : 'text-base md:text-lg mb-2'}
                             break-words`}>
                {item.title}
              </h3>
              <p className={`text-white/90 font-medium transition-all duration-500 font-title
                            ${isExpanded ? 'text-base md:text-lg mb-3' : 'text-sm md:text-base mb-2'}
                            break-words`}>
                {item.company}
              </p>
              {item.location && item.location.trim() !== '' && (
                <div className="flex items-center gap-1 text-white/70 text-xs md:text-sm font-secondary">
                  <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                  <span className="break-words">{item.location}</span>
                </div>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-medium text-white/80 text-sm md:text-base font-secondary">
                {item.date}
              </span>
            </div>
          </div>
          
          {/* Category Badge - Always Visible */}
          <div className={`flex justify-end transition-all duration-500 ease-in-out
                          ${isExpanded ? 'mb-6' : 'mb-4'}`}>
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${styles.badgeColor} flex-shrink-0 font-navigation`}>
              {styles.badgeText}
            </span>
          </div>
          
          {/* Content Section */}
          <div className={`transition-all duration-500 ease-in-out space-y-4 transform
            ${isExpanded 
              ? 'opacity-100 max-h-[800px] translate-y-0' 
              : 'opacity-0 max-h-0 -translate-y-4 pointer-events-none'}`}>
            
            {/* Project Image */}
            {item.image && (
              <div className="border-t border-white/10 pt-4">
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
                        className="w-full h-48 md:h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </a>
                  ) : (
                    <img 
                      src={`/images/${item.image}`}
                      alt={item.title}
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  )}
                </div>
              </div>
            )}
            
            {/* Description */}
            <div className={`${item.image ? '' : 'border-t border-white/10 pt-4'}`}>
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-secondary break-words">
                {item.description}
              </p>
            </div>
            
            {/* Technologies */}
            {item.technologies && (
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(item.technologies) ? item.technologies : [item.technologies]).map((tech: string) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 text-xs bg-white/10 text-white/90 rounded-md backdrop-blur-sm font-navigation"
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
          
          {/* Expand/Collapse Indicator */}
          <div className="absolute bottom-4 right-4 transition-all duration-500">
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-white/60" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-white/60" />
            )}
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
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const threshold = documentHeight - 100; // Show bottom bar 100px before reaching bottom
      setIsAtBottom(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 ${className}`}>
      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => (
          <div key={index} className={isAtBottom ? 'at-bottom' : ''}>
            <TimelineCard 
              item={item} 
              isLast={index === items.length - 1} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 