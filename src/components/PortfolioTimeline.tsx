'use client';

import React, { useState, useEffect } from 'react';
import { ContentItem } from '../types/portfolio';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import TagsDisplay from './TagsDisplay';
import { useTagHighlight } from './TagHighlightContext';

interface PortfolioTimelineProps {
  items: ContentItem[];
  organizedData: {
    experience: ContentItem[];
    projects: ContentItem[];
    research: ContentItem[];
    awards: ContentItem[];
    community: ContentItem[];
    media: ContentItem[];
  };
  filteredType: string;
  setActiveSection: (section: string) => void;
}

export const PortfolioTimeline: React.FC<PortfolioTimelineProps> = ({
  items,
  organizedData,
  filteredType,
  setActiveSection
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { highlightedTags } = useTagHighlight();

  // Function to toggle item expansion
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  // Get items to display based on filter
  const getItemsToDisplay = () => {
    if (filteredType === 'all') {
      return items;
    }
    
    // Return items of the selected type
    return items.filter(item => item.type === filteredType);
  };

  const displayItems = getItemsToDisplay();

  // Group items by category for rendering
  const renderTimelineByCategory = () => {
    const categories = ['Experience', 'Projects', 'Research', 'Awards', 'Community', 'Media'];
    
    return categories.map(category => {
      const categoryItems = displayItems.filter(item => item.category === category);
      
      if (categoryItems.length === 0) return null;
      
      return (
        <div key={category} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{category}</h2>
          <div className="space-y-6">
            {categoryItems.map(item => renderTimelineItem(item))}
          </div>
        </div>
      );
    });
  };

  // Render a single timeline item
  const renderTimelineItem = (item: ContentItem) => {
    const isExpanded = expandedItems.includes(item.id);
    
    return (
      <div 
        key={item.id} 
        className={`glass p-5 rounded-xl transition-all duration-300 ${
          isExpanded ? 'bg-opacity-20' : 'bg-opacity-10 hover:bg-opacity-15'
        }`}
        onClick={() => toggleExpand(item.id)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            
            {item.company && (
              <div className="text-white/80 mb-1">
                {item.company}
              </div>
            )}
            
            <div className="text-white/70 text-sm mb-3">
              {item.date}
              {item.location && ` • ${item.location}`}
            </div>
            
            <p className="text-white/80 mb-4">
              {item.description}
            </p>
            
            {item.tags && item.tags.length > 0 && (
              <TagsDisplay 
                tags={item.tags} 
                highlightedTags={highlightedTags}
                className="mt-4"
              />
            )}
            
            {item.content && (
              <div className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-white/10 pt-4 mt-2">
                  <p className="text-white/70 whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {item.content && (
            <button 
              className={`p-2 rounded-full transition-transform duration-300 ${
                isExpanded ? 'rotate-90' : ''
              }`}
              aria-label={isExpanded ? "Collapse" : "Expand"}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(item.id);
              }}
            >
              <ChevronRightIcon className="w-5 h-5 text-white/70" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderTimelineByCategory()}
    </div>
  );
}; 