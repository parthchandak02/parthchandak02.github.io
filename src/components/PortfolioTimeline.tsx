'use client';

import React from 'react';
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
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import LiquidGlass, { LiquidGlassPresets } from './LiquidGlass';
import { ContentItem } from '../lib/contentLoader';
import { theme } from '../lib/theme';

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
  const IconComponent = iconMap[item.icon as keyof typeof iconMap] || BriefcaseIcon;
  const styles = getTypeStyles(item.type);
  
  return (
    <div className="relative flex items-start pb-12">
      {/* Left column - Timeline track with icon */}
      <div className="flex flex-col items-center flex-shrink-0 relative">
        {/* Timeline line - extends from top to bottom */}
        {!isLast && (
          <div className="absolute top-16 bottom-0 w-0.5 bg-white/20 left-1/2 transform -translate-x-1/2" />
        )}
        
        {/* Glass morphism icon container - perfectly circular */}
        <div className="relative z-10 mb-2">
          <LiquidGlass
            {...LiquidGlassPresets.primary}
            className="
              w-16 h-16 rounded-full 
              border border-white/10
              sm:w-14 sm:h-14 
              lg:w-16 lg:h-16
              relative
            "
          >
            {/* Icon/Logo positioned absolutely in center */}
            <div className="
              absolute inset-0 
              flex items-center justify-center
            ">
              {item.companyLogo ? (
                <img 
                  src={`/images/${item.companyLogo}`}
                  alt={`${item.company} logo`}
                  className="
                    w-10 h-10 object-contain
                    sm:w-8 sm:h-8
                    lg:w-10 lg:h-10
                  "
                />
              ) : (
                <IconComponent className="
                  w-7 h-7 text-white
                  sm:w-6 sm:h-6
                  lg:w-7 lg:h-7
                " />
              )}
            </div>
          </LiquidGlass>
        </div>
        

      </div>
      
      {/* Content Card */}
      <div className="flex-1 min-w-0 ml-8">
        <LiquidGlass 
          {...styles.preset}
          className="timeline-card group rounded-2xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden
                     p-4 hover:p-6
                     min-h-[100px] hover:min-h-[200px]"
        >
          {/* Compact Header - Always Visible */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-base font-semibold text-white mb-1 truncate group-hover:text-lg transition-all duration-300">
                {item.title}
              </h3>
              <p className="text-white/90 text-sm font-medium mb-1 truncate">
                {item.company}
              </p>
              <div className="flex items-center gap-1 text-white/70 text-xs">
                <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xs font-medium text-white/80 group-hover:text-sm transition-all duration-300">
                {item.date}
              </span>
            </div>
          </div>
          
          {/* Category Badge - Always Visible in Bottom Right */}
          <div className="flex justify-end mb-2 group-hover:mb-4 transition-all duration-300">
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${styles.badgeColor} flex-shrink-0`}>
              {styles.badgeText}
            </span>
          </div>
          
                     {/* Expandable Content - Hidden by default, shown on hover */}
           <div className="expandable-content opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[600px] transition-all duration-300 ease-in-out">
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
                         className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                       />
                     </a>
                   ) : (
                     <img 
                       src={`/images/${item.image}`}
                       alt={item.title}
                       className="w-full h-48 object-cover"
                     />
                   )}
                 </div>
               </div>
             )}
             
             {/* Description */}
             <div className={`${item.image ? 'mb-4' : 'pt-2 border-t border-white/10 mb-4'}`}>
               <p className="text-white/80 text-sm leading-relaxed">
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
    <div className={`max-w-4xl mx-auto px-6 py-12 ${className}`}>
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