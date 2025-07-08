'use client';

import React from 'react';
import ExpandableTag from './ExpandableTag';
import { Tag } from '../types/portfolio';

interface TagsDisplayProps {
  tags: {
    [category: string]: (string | Tag)[]
  };
  className?: string;
  highlightedTags?: string[];
  maxTagsPerCategory?: number;
}

export default function TagsDisplay({ 
  tags, 
  className = '', 
  highlightedTags = [],
  maxTagsPerCategory = 100
}: TagsDisplayProps) {
  // Helper function to normalize tag objects and add category if not present
  const normalizeTag = (tag: string | Tag, category: string): Tag => {
    if (typeof tag === 'string') {
      return {
        name: tag,
        icon: 'TbCircleDot', // Default icon
        category: category
      };
    }
    // Add category from parent object key if not present in the tag
    return { 
      ...tag, 
      category: tag.category || category 
    };
  };

  // Get all tags from all categories and flatten them into a single array
  const getAllTags = () => {
    const allTags: Tag[] = [];
    
    Object.entries(tags).forEach(([category, tagsList]) => {
      if (tagsList && tagsList.length > 0) {
        // Normalize all tags to Tag objects and add category
        const normalizedTags = tagsList.map(tag => normalizeTag(tag, category));
        allTags.push(...normalizedTags);
      }
    });
    
    return allTags;
  };

  const allTags = getAllTags();
  
  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap gap-3 justify-center">
        {allTags.map((tag, index) => (
          <div key={`tag-${tag.name}-${index}`} className="mb-2">
            <ExpandableTag
              name={tag.name}
              icon={tag.icon}
              expanded={highlightedTags.includes(tag.name)}
              size="medium"
            />
          </div>
        ))}
      </div>
    </div>
  );
} 