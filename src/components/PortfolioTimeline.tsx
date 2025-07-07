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
import { ContentItem } from '../types/portfolio';

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
        {/* Timeline line - creates seamless connection from icon to icon */}
        {!isLast && (
          <div className="absolute top-6 md:top-8 w-0.5 bg-gradient-to-b from-white/40 via-white/30 to-white/40 left-1/2 transform -translate-x-1/2 z-0" 
               style={{ height: 'calc(100% + 2rem)' }} />
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
          className={`timeline-card group rounded-2xl cursor-pointer relative p-6 hover:shadow-lg`}
          onClick={toggleExpanded}
        >
          <div className="relative">
            {/* --- Compact, Always Visible Content --- */}
            {/* This part has a stable structure and is all left-aligned */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white font-title text-base md:text-lg break-words leading-tight">
                {item.title}
              </h3>
              
              <div className="text-white/80 text-sm md:text-base font-secondary">
                  <span>{item.date}</span>
              </div>

              <div className="text-sm">
                <span className="text-white/90 font-medium font-title">
                  {item.company}
                </span>
              </div>

              {item.location && item.location.trim() !== '' && (
                <div className="flex items-center gap-1 text-white/70 text-sm">
                  <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                  <span className="break-words">{item.location}</span>
                </div>
              )}

              <div>
                <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${styles.badgeColor} font-navigation`}>
                    {styles.badgeText}
                </span>
              </div>
            </div>

            {/* --- Expandable Content --- */}
            {/* This part animates smoothly */}
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100 mt-4 pt-4 border-t border-white/20' : 'max-h-0 opacity-0'}`}
            >
              <div className="space-y-4">
                {/* Project Image */}
                {item.image && (
                  <div className="relative overflow-hidden rounded-lg">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                        <img src={`/images/${item.image}`} alt={item.title} className="w-full h-48 md:h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
                      </a>
                    ) : (
                      <img src={`/images/${item.image}`} alt={item.title} className="w-full h-48 md:h-56 object-cover" />
                    )}
                  </div>
                )}
                
                {/* Description */}
                <div>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed font-secondary break-words">
                    {item.description}
                  </p>
                </div>
                
                {/* Technologies */}
                {item.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(item.technologies) ? item.technologies : [item.technologies]).map((tech: string) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-white/10 text-white/90 rounded-md backdrop-blur-sm font-navigation">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Link Icon for the article/project */}
                {item.link && (
                    <div className="flex justify-start">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 -ml-2">
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                      </a>
                    </div>
                )}
              </div>
            </div>
            
            {/* --- Expand/Collapse Indicator --- */}
            {/* Positioned at bottom right of the card */}
            <div className="absolute bottom-0 right-0">
                {isExpanded ? (
                  <ChevronUpIcon className="w-5 h-5 text-white/60" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-white/60" />
                )}
            </div>
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
      <div>
        {items.map((item, index) => (
          <div key={index} className={`py-0 ${isAtBottom ? 'at-bottom' : ''}`}>
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