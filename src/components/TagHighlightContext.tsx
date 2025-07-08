'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

interface TagHighlightContextType {
  highlightedTags: string[];
  setHighlightedTags: (tags: string[]) => void;
  highlightTagsFromTimeline: (tags: { name: string; icon: string; category?: string; }[]) => void;
  clearHighlightedTags: () => void;
  disableAutoCollapse: () => void;
  enableAutoCollapse: () => void;
  isAutoCollapseEnabled: boolean;
}

const TagHighlightContext = createContext<TagHighlightContextType | undefined>(undefined);

export function TagHighlightProvider({ children }: { children: React.ReactNode }) {
  const [highlightedTags, setHighlightedTags] = useState<string[]>([]);
  const [autoCollapseTimeout, setAutoCollapseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [autoCollapseEnabled, setAutoCollapseEnabled] = useState<boolean>(true);

  // Function to highlight tags from a timeline item
  const highlightTagsFromTimeline = (tags: { name: string; icon: string; category?: string; }[]) => {
    // Clear any existing timeout
    if (autoCollapseTimeout) {
      clearTimeout(autoCollapseTimeout);
    }

    // Extract tag names
    const tagNames = tags.map(tag => tag.name);
    setHighlightedTags(tagNames);

    // Set a timeout to clear the highlighted tags after 4 seconds
    // but only if auto-collapse is enabled
    if (autoCollapseEnabled) {
      console.log("Setting auto-collapse timeout for timeline tags");
      const timeout = setTimeout(() => {
        console.log("Auto-collapsing timeline tags");
        setHighlightedTags([]);
      }, 4000); // 4 seconds

      setAutoCollapseTimeout(timeout);
    }
  };

  // Function to clear highlighted tags
  const clearHighlightedTags = () => {
    if (autoCollapseTimeout) {
      clearTimeout(autoCollapseTimeout);
      setAutoCollapseTimeout(null);
    }
    setHighlightedTags([]);
  };

  // Function to disable auto-collapse (for TypewriterText)
  const disableAutoCollapse = () => {
    console.log("Disabling auto-collapse");
    setAutoCollapseEnabled(false);
    if (autoCollapseTimeout) {
      clearTimeout(autoCollapseTimeout);
      setAutoCollapseTimeout(null);
    }
  };

  // Function to enable auto-collapse
  const enableAutoCollapse = () => {
    console.log("Enabling auto-collapse");
    setAutoCollapseEnabled(true);
    // Clear any highlighted tags when re-enabling auto-collapse
    clearHighlightedTags();
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (autoCollapseTimeout) {
        clearTimeout(autoCollapseTimeout);
      }
    };
  }, [autoCollapseTimeout]);

  return (
    <TagHighlightContext.Provider 
      value={{ 
        highlightedTags, 
        setHighlightedTags, 
        highlightTagsFromTimeline,
        clearHighlightedTags,
        disableAutoCollapse,
        enableAutoCollapse,
        isAutoCollapseEnabled: autoCollapseEnabled
      }}
    >
      {children}
    </TagHighlightContext.Provider>
  );
}

export function useTagHighlight() {
  const context = useContext(TagHighlightContext);
  if (context === undefined) {
    throw new Error('useTagHighlight must be used within a TagHighlightProvider');
  }
  return context;
} 