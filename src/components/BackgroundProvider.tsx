"use client";

import React, { createContext, useContext, useEffect } from 'react';

interface BackgroundContextType {
  // Simplified background context for glass morphism effect
  initialized: boolean;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

interface BackgroundProviderProps {
  children: React.ReactNode;
}

// Use a single, beautiful high-resolution image for consistent liquid glass effect
const STATIC_BACKGROUND_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&h=1600&q=90';

export function BackgroundProvider({ children }: BackgroundProviderProps) {
  useEffect(() => {
    // Set simple static background on body
    const body = document.body;
    
    // Apply static background directly to body
    body.style.backgroundImage = `url(${STATIC_BACKGROUND_URL})`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center center';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundAttachment = 'fixed';
    
    // Clean up any existing dynamic background elements
    const bgContainer = document.getElementById('static-bg-container');
    const overlay = document.getElementById('bg-overlay');
    
    if (bgContainer) {
      bgContainer.remove();
    }
    if (overlay) {
      overlay.remove();
    }
    
    return () => {
      // Clean up on unmount
      body.style.backgroundImage = 'none';
      body.style.backgroundSize = '';
      body.style.backgroundPosition = '';
      body.style.backgroundRepeat = '';
      body.style.backgroundAttachment = '';
    };
  }, []);

  return (
    <BackgroundContext.Provider value={{ initialized: true }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export default BackgroundProvider; 