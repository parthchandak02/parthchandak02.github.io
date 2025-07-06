"use client";

import React from 'react';
import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  TrophyIcon, 
  RocketLaunchIcon,
  CodeBracketIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/solid';

export interface TimelineItem {
  title: string;
  cardTitle: string;
  cardSubtitle?: string;
  cardDetailedText?: string;
  date?: string;
  icon?: 'work' | 'education' | 'award' | 'project' | 'code' | 'office';
  url?: string;
}

interface GlassTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const iconMap = {
  work: BriefcaseIcon,
  education: AcademicCapIcon,
  award: TrophyIcon,
  project: RocketLaunchIcon,
  code: CodeBracketIcon,
  office: BuildingOfficeIcon,
};

export default function GlassTimeline({ items, className = '' }: GlassTimelineProps) {
  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Central timeline line */}
      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-white/20 via-white/40 to-white/20 rounded-full">
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 via-purple-400/50 to-pink-400/30 rounded-full blur-sm"></div>
      </div>

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => {
          const IconComponent = item.icon ? iconMap[item.icon] : BriefcaseIcon;
          const isEven = index % 2 === 0;
          
          return (
            <div key={index} className="relative flex items-center">
              {/* Timeline icon - using glassmorphism principles */}
              <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20 ${
                'w-16 h-16 rounded-full flex items-center justify-center'
              } glass-icon-container`}>
                <div className="glass-icon">
                  <IconComponent className="w-6 h-6 text-white/90" />
                </div>
              </div>

              {/* Content card - alternating layout */}
              <div className={`relative w-full md:w-5/12 ml-20 md:ml-0 ${
                isEven 
                  ? 'md:pr-16' 
                  : 'md:ml-auto md:pl-16'
              }`}>
                
                {/* Date badge */}
                <div className={`inline-block mb-4 ${
                  isEven ? '' : 'md:text-right md:float-right'
                }`}>
                  <span className="glass-badge">
                    {item.date || item.title}
                  </span>
                </div>

                {/* Main content card */}
                <div className="glass-card group">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
                      {item.cardTitle}
                    </h3>
                    
                    {item.cardSubtitle && (
                      <h4 className="text-lg font-medium text-white/80 mb-3">
                        {item.cardSubtitle}
                      </h4>
                    )}
                    
                    <p className="text-white/70 leading-relaxed mb-4">
                      {item.cardDetailedText}
                    </p>
                    
                    {item.url && (
                      <button 
                        onClick={() => window.open(item.url, '_blank')}
                        className="glass-button"
                      >
                        Learn More →
                      </button>
                    )}
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 