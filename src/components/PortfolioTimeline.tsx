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
  groupedItems?: {
    experience: ContentItem[];
    projects: ContentItem[];
    research: ContentItem[];
    awards: ContentItem[];
    community: ContentItem[];
    media: ContentItem[];
  };
  items?: ContentItem[]; // Keep for backward compatibility
  className?: string;
  onSectionInView?: (sectionId: string) => void; // Callback for section visibility
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

const TimelineCard: React.FC<{ item: ContentItem; isLast: boolean; showConnector: boolean }> = ({ 
  item, 
  isLast, 
  showConnector 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[item.icon as keyof typeof iconMap] || BriefcaseIcon;
  const styles = getTypeStyles(item.type);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`relative flex items-start ${isLast ? '' : 'pb-8 md:pb-12'}`}>
      {/* Left column - Timeline track with icon */}
      <div className="flex flex-col items-center flex-shrink-0 relative">
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
          id={item.id}
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
  groupedItems,
  items, 
  className = '',
  onSectionInView
}) => {
  // Set up intersection observer for auto-highlighting navigation
  useEffect(() => {
    if (!onSectionInView || !groupedItems) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when section is in middle 60% of viewport
      threshold: 0.3
    };

    // Create a map of item IDs to their categories
    const itemCategoryMap: { [itemId: string]: string } = {};
    const categoryOrder: (keyof typeof groupedItems)[] = ['experience', 'projects', 'research', 'awards', 'community', 'media'];
    
    categoryOrder.forEach((category) => {
      const items = groupedItems[category] || [];
      items.forEach((item: ContentItem) => {
        itemCategoryMap[item.id] = category;
      });
    });

    let currentCategory = '';
    const observer = new IntersectionObserver((entries) => {
      // Find the most visible entry
      const visibleEntry = entries.find(entry => entry.isIntersecting);
      if (visibleEntry && visibleEntry.target.id) {
        const itemId = visibleEntry.target.id;
        const category = itemCategoryMap[itemId];
        
        if (category && category !== currentCategory) {
          currentCategory = category;
          onSectionInView(category);
        }
      }
    }, observerOptions);

    // Observe timeline cards
    setTimeout(() => {
      const timelineCards = document.querySelectorAll('.timeline-card');
      timelineCards.forEach((card) => {
        if (card.id) {
          observer.observe(card);
        }
      });
    }, 100);

    return () => {
      const timelineCards = document.querySelectorAll('.timeline-card');
      timelineCards.forEach((card) => {
        if (card.id) {
          observer.unobserve(card);
        }
      });
    };
  }, [onSectionInView, groupedItems]);

  // If grouped items are provided, use them; otherwise fallback to flat items
  const displayGrouped = groupedItems || {};
  const displayFlat = items || [];

  // If we have grouped items, render as flat list (grouped and sorted but no headers)
  if (groupedItems) {
    const categoryOrder: (keyof typeof groupedItems)[] = ['experience', 'projects', 'research', 'awards', 'community', 'media'];
    
    // Flatten the grouped items while maintaining category order
    const flattenedItems = categoryOrder.flatMap(category => groupedItems[category] || []);
    
    return (
      <div className={`portfolio-timeline ${className}`}>
        <div className="space-y-0">
          {flattenedItems.map((item: ContentItem, index: number) => (
            <TimelineCard 
              key={item.id}
              item={item}
              isLast={index === flattenedItems.length - 1}
              showConnector={true}
            />
          ))}
        </div>
      </div>
    );
  }

  // Fallback to flat layout for backward compatibility
  return (
    <div className={`portfolio-timeline ${className}`}>
      <div className="space-y-0">
        {displayFlat.map((item: ContentItem, index: number) => (
          <TimelineCard 
            key={item.id}
            item={item}
            isLast={index === displayFlat.length - 1}
            showConnector={true}
          />
        ))}
      </div>
    </div>
  );
}; 