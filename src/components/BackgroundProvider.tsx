"use client";

import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ThreeBackground component with no SSR
const ThreeBackground = dynamic(() => import('./ThreeBackground'), { ssr: false });

// Define background type
export type BackgroundType = 'line-glass';

interface BackgroundContextType {
  backgroundVisible: boolean;
  setBackgroundVisible: (visible: boolean) => void;
}

export const BackgroundContext = createContext<BackgroundContextType>({
  backgroundVisible: true,
  setBackgroundVisible: () => {},
});

interface BackgroundProviderProps {
  children: ReactNode;
}

// Static background fallback - using CSS black background instead of image
const STATIC_BACKGROUND_URL = null;

// Spline background URL
const SPLINE_URL = 'https://prod.spline.design/G7OypgfWCWHxpZRt/scene.splinecode';

// Spline Background Component using the web component approach
const SplineBackground: React.FC = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if script is already loaded to avoid duplicate loading
    const existingScript = document.querySelector('script[src*="spline-viewer.js"]');
    if (existingScript) {
      setSplineLoaded(true);
      return;
    }

    // Load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.22/build/spline-viewer.js';
    script.onload = () => {
      setSplineLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Spline viewer');
      setHasError(true);
    };
    document.head.appendChild(script);

    return () => {
      // Don't remove script on unmount - keep it for other backgrounds
    };
  }, []);

  // Fallback to static background if Spline fails
  if (hasError) {
    return null; // Return null to use the CSS black background
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
        url: SPLINE_URL,
        loading: "lazy",
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

export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({ children }) => {
  const [backgroundVisible, setBackgroundVisible] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BackgroundContext.Provider value={{ backgroundVisible, setBackgroundVisible }}>
      {mounted && backgroundVisible && <ThreeBackground />}
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);

export default BackgroundProvider; 