'use client';

import React, { useState } from 'react';
import { 
  CodeBracketIcon,
  BriefcaseIcon,
  BeakerIcon,
  StarIcon,
  UsersIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import * as Si from 'react-icons/si';
import * as Tb from 'react-icons/tb';
import LiquidGlass, { LiquidGlassPresets } from './LiquidGlass';

interface Tag {
  name: string;
  icon: string;
}

interface TagsDisplayProps {
  tags: {
    technical: Tag[];
    project_management: Tag[];
    research: Tag[];
    experience: Tag[];
    community: Tag[];
    team: Tag[];
    media: Tag[];
    awards: Tag[];
  };
  className?: string;
}

// Category configuration with icons and display names - using uniform timeline styling
const CATEGORY_CONFIG = {
  technical: {
    icon: CodeBracketIcon,
    label: 'Technical',
    maxTagsPerRow: 5
  },
  project_management: {
    icon: BriefcaseIcon,
    label: 'Project Management',
    maxTagsPerRow: 4
  },
  research: {
    icon: BeakerIcon,
    label: 'Research',
    maxTagsPerRow: 4
  },
  experience: {
    icon: StarIcon,
    label: 'Experience',
    maxTagsPerRow: 4
  },
  team: {
    icon: UsersIcon,
    label: 'Team',
    maxTagsPerRow: 4
  }
};

// Helper function to get the icon component from the icon string
const getIconComponent = (iconName: string) => {
  if (iconName.startsWith('Si')) {
    return (Si as any)[iconName];
  } else if (iconName.startsWith('Tb')) {
    return (Tb as any)[iconName];
  }
  return null;
};

export default function TagsDisplay({ tags, className = '' }: TagsDisplayProps) {
  const [expandedTag, setExpandedTag] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className={`flex flex-col gap-6 md:gap-8 ${className}`}>
      {Object.entries(tags).map(([category, categoryTags]) => {
        if (!categoryTags?.length || !CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]) {
          return null;
        }

        const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
        const CategoryIcon = config.icon;
        const isCategoryHovered = hoveredCategory === category;

        return (
          <div key={category} className="flex flex-col gap-3">
            {/* Category Section - Using CSS Grid to anchor category icon */}
            <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
              {/* Category Icon with Tooltip - Fixed Position */}
              <div className="relative flex-shrink-0">
                <LiquidGlass
                  className={`w-12 h-12 md:w-14 md:h-14 transition-all duration-300 ${
                    isCategoryHovered ? 'scale-110' : ''
                  }`}
                  style={{ 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  title={config.label}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <CategoryIcon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                </LiquidGlass>
                
                {/* Tooltip - positioned above the icon */}
                {isCategoryHovered && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-30 backdrop-blur-sm">
                    {config.label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                  </div>
                )}
              </div>

              {/* Tags Grid - Flexible Area */}
              <div className="flex flex-wrap gap-3 md:gap-4 min-w-0">
                {categoryTags.map((tag) => {
                  const IconComponent = getIconComponent(tag.icon);
                  const isExpanded = expandedTag === tag.name;

                  return IconComponent ? (
                    <LiquidGlass
                      key={tag.name}
                      onMouseEnter={() => setExpandedTag(tag.name)}
                      onMouseLeave={() => setExpandedTag(null)}
                      onClick={() => setExpandedTag(isExpanded ? null : tag.name)}
                      className={`relative inline-flex items-center h-10 md:h-12 transition-[width] duration-300 ease-in-out overflow-hidden cursor-pointer ${
                        isExpanded
                          ? 'w-auto pr-3'
                          : 'w-10 md:w-12'
                      }`}
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title={tag.name}
                    >
                      {/* Icon Container - Always centered in fixed space */}
                      <div 
                        className="flex items-center justify-center flex-shrink-0 w-10 md:w-12 h-full"
                      >
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      
                      {/* Text that appears on expansion */}
                      <span className={`text-white text-sm md:text-base transition-all duration-300 ease-in-out whitespace-nowrap ${
                        isExpanded ? 'opacity-100 max-w-none' : 'opacity-0 max-w-0 overflow-hidden'
                      }`}>
                        {tag.name}
                      </span>
                    </LiquidGlass>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 