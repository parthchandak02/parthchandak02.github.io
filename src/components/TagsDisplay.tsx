'use client';

import React from 'react';
import { 
  CodeBracketIcon,
  BriefcaseIcon,
  BeakerIcon,
  StarIcon,
  UsersIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import LiquidGlass, { LiquidGlassPresets } from './LiquidGlass';

interface TagsDisplayProps {
  tags: {
    technical: string[];
    project_management: string[];
    research: string[];
    experience: string[];
    community: string[];
    awards: string[];
  };
  className?: string;
}

// Category configuration with icons and display names
const CATEGORY_CONFIG = {
  technical: {
    icon: CodeBracketIcon,
    label: 'Technical',
    color: 'rgb(59, 130, 246)', // Blue
    maxTags: 8
  },
  project_management: {
    icon: BriefcaseIcon,
    label: 'Project Management',
    color: 'rgb(16, 185, 129)', // Green
    maxTags: 6
  },
  research: {
    icon: BeakerIcon,
    label: 'Research',
    color: 'rgb(139, 92, 246)', // Purple
    maxTags: 6
  },
  experience: {
    icon: StarIcon,
    label: 'Experience',
    color: 'rgb(245, 158, 11)', // Amber
    maxTags: 6
  },
  community: {
    icon: UsersIcon,
    label: 'Community',
    color: 'rgb(236, 72, 153)', // Pink
    maxTags: 5
  },
  awards: {
    icon: TrophyIcon,
    label: 'Awards',
    color: 'rgb(239, 68, 68)', // Red
    maxTags: 5
  }
};

// Function to randomly select tags from a category
const getRandomTags = (tags: string[], maxCount: number): string[] => {
  if (tags.length <= maxCount) return tags;
  
  const shuffled = [...tags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, maxCount);
};

export const TagsDisplay: React.FC<TagsDisplayProps> = ({ tags, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-6">
        {Object.entries(CATEGORY_CONFIG).map(([categoryKey, config]) => {
          const categoryTags = tags[categoryKey as keyof typeof tags] || [];
          const displayTags = getRandomTags(categoryTags, config.maxTags);
          const IconComponent = config.icon;
          
          if (displayTags.length === 0) return null;
          
          return (
            <div key={categoryKey} className="flex items-start space-x-4">
              {/* Category Icon */}
              <div className="flex-shrink-0 pt-1">
                <LiquidGlass
                  {...LiquidGlassPresets.secondary}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                >
                  <IconComponent 
                    className="w-6 h-6 text-white" 
                    style={{ color: config.color }}
                  />
                </LiquidGlass>
              </div>
              
              {/* Category Content */}
              <div className="flex-1 min-w-0">
                {/* Category Label */}
                <h3 className="text-white font-medium text-sm mb-3 font-title">
                  {config.label}
                </h3>
                
                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2">
                  {displayTags.map((tag, index) => (
                    <LiquidGlass
                      key={`${categoryKey}-${index}`}
                      {...LiquidGlassPresets.secondary}
                      className="px-3 py-1.5 rounded-full"
                    >
                      <span className="text-xs text-white/90 font-navigation whitespace-nowrap">
                        {tag}
                      </span>
                    </LiquidGlass>
                  ))}
                  {categoryTags.length > config.maxTags && (
                    <LiquidGlass
                      {...LiquidGlassPresets.secondary}
                      className="px-3 py-1.5 rounded-full"
                    >
                      <span className="text-xs text-white/70 font-navigation whitespace-nowrap">
                        +{categoryTags.length - config.maxTags} more
                      </span>
                    </LiquidGlass>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagsDisplay; 