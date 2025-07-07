"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface BackgroundContextType {
  initialized: boolean;
  useSplineBackground: boolean;
  setUseSplineBackground: (use: boolean) => void;
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

// Static background fallback
const STATIC_BACKGROUND_URL = '/images/background-pattern/background-pattern.png';

// Spline Background Component using the web component approach
const SplineBackground: React.FC = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.22/build/spline-viewer.js';
    script.onload = () => {
      setSplineLoaded(true);
                  // Spline viewer loaded successfully
    };
    script.onerror = () => {
      console.error('Failed to load Spline viewer');
      setHasError(true);
    };
    document.head.appendChild(script);

    return () => {
      // Clean up script on unmount
      const existingScript = document.querySelector('script[src*="spline-viewer.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Fallback to static background if Spline fails
  if (hasError) {
    return null;
  }

  if (!splineLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-0">
        <div className="text-white text-lg">Loading 3D Background...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      {React.createElement('spline-viewer', {
        url: "https://prod.spline.design/bp4iPiqmdxML9k9I/scene.splinecode",
        loading: "eager",
        'mouse-events': "global",
        style: {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }
      })}
      
      {/* Subtle overlay to ensure content readability */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export function BackgroundProvider({ children }: BackgroundProviderProps) {
  const [useSplineBackground, setUseSplineBackground] = useState(true);

  useEffect(() => {
    const body = document.body;
    
    if (!useSplineBackground) {
      // Fallback to static background
      body.style.backgroundImage = `url(${STATIC_BACKGROUND_URL})`;
      body.style.backgroundSize = '600px 600px';
      body.style.backgroundPosition = 'center';
      body.style.backgroundRepeat = 'repeat';
      body.style.backgroundAttachment = 'fixed';
    } else {
      // Clear static background when using Spline
      body.style.backgroundImage = 'none';
      body.style.backgroundSize = '';
      body.style.backgroundPosition = '';
      body.style.backgroundRepeat = '';
      body.style.backgroundAttachment = '';
    }
    
    return () => {
      // Clean up on unmount
      body.style.backgroundImage = 'none';
      body.style.backgroundSize = '';
      body.style.backgroundPosition = '';
      body.style.backgroundRepeat = '';
      body.style.backgroundAttachment = '';
    };
  }, [useSplineBackground]);

  return (
    <BackgroundContext.Provider value={{ 
      initialized: true, 
      useSplineBackground, 
      setUseSplineBackground 
    }}>
      {useSplineBackground && <SplineBackground />}
      <div className="relative z-10">
        {children}
      </div>
    </BackgroundContext.Provider>
  );
}

export default BackgroundProvider; 