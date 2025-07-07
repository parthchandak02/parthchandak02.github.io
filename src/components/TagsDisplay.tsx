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
import LiquidGlass, { LiquidGlassPresets } from './LiquidGlass';
import ExpandableTag from './ExpandableTag';

interface Tag {
  name: string;
  icon: string;
}

interface TagsDisplayProps {
  tags: {
    [category: string]: Tag[];
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

export default function TagsDisplay({ tags, className = '' }: TagsDisplayProps) {
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
                {categoryTags.map((tag) => (
                  <ExpandableTag
                    key={tag.name}
                    name={tag.name}
                    icon={tag.icon}
                    size="medium"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 