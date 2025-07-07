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
  community: {
    icon: UsersIcon,
    label: 'Community',
    maxTagsPerRow: 4
  },
  media: {
    icon: TrophyIcon,
    label: 'Media',
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className={`flex flex-col gap-4 md:gap-6 ${className}`}>
      {Object.entries(tags).map(([category, categoryTags]) => {
        if (!categoryTags?.length || !CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]) {
          return null;
        }

        const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
        const CategoryIcon = config.icon;
        const isCategoryExpanded = expandedCategory === category;

        return (
          <div key={category} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            {/* Category Icon */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setExpandedCategory(isCategoryExpanded ? null : category)}
            >
              <LiquidGlass 
                className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 shrink-0 transition-all duration-300 ${
                  isCategoryExpanded ? 'scale-110' : ''
                }`}
                title={config.label}
              >
                <CategoryIcon className="w-5 h-5 md:w-6 md:h-6" />
              </LiquidGlass>
              <span className={`text-white/80 text-sm md:text-base font-medium font-navigation transition-all duration-300 ${
                isCategoryExpanded ? 'opacity-100' : 'opacity-0 md:opacity-100'
              }`}>
                {config.label}
              </span>
            </div>

            {/* Tags Grid */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categoryTags.map((tag) => {
                const IconComponent = getIconComponent(tag.icon);
                const isExpanded = expandedTag === tag.name;

                return IconComponent ? (
                  <div 
                    key={tag.name}
                    className="relative"
                    onMouseEnter={() => setExpandedTag(tag.name)}
                    onMouseLeave={() => setExpandedTag(null)}
                    onClick={() => setExpandedTag(isExpanded ? null : tag.name)}
                  >
                    <LiquidGlass 
                      className={`flex items-center h-8 md:h-10 transition-all duration-300 ${
                        isExpanded 
                          ? 'px-3 scale-105' 
                          : 'w-8 md:w-10 justify-center'
                      }`}
                      title={tag.name}
                    >
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className={`text-white text-sm whitespace-nowrap transition-all duration-300 ml-2 ${
                        isExpanded ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 overflow-hidden'
                      }`}>
                        {tag.name}
                      </span>
                    </LiquidGlass>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
} 