"use client";

import React, { useState, useEffect, useRef } from 'react';
import LiquidGlass, { LiquidGlassPresets } from './LiquidGlass';
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  ArrowPathIcon, 
  PhotoIcon,
  BeakerIcon,
  EyeIcon,
  Bars3Icon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';

export default function LiquidGlassScrollDemo() {
  const [backgroundImage, setBackgroundImage] = useState(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  );
  
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Panel state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ x: 24, y: 24 });
  const [panelSize, setPanelSize] = useState({ width: 320, height: 500 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const panelRef = useRef<HTMLDivElement>(null);

  // Background image options
  const backgroundOptions = [
    {
      name: 'Mountain Vista',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Mountain landscape with varied textures'
    },
    {
      name: 'City Lights',
      url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      description: 'Night city with bright lights'
    },
    {
      name: 'Ocean Waves',
      url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Ocean with dynamic patterns'
    },
    {
      name: 'Forest Path',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Dense forest with complex details'
    },
    {
      name: 'Desert Sunset',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Gradient sunset colors'
    },
    {
      name: 'Galaxy',
      url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2093&q=80',
      description: 'Starry galaxy with color variations'
    }
  ];

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setScrollPosition(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Track manual scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!isAutoScrolling) {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        setScrollPosition(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAutoScrolling]);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as Element).classList.contains('drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - panelPosition.x,
        y: e.clientY - panelPosition.y
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: panelSize.width,
      height: panelSize.height
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPanelPosition({
          x: Math.max(0, Math.min(window.innerWidth - panelSize.width, e.clientX - dragOffset.x)),
          y: Math.max(0, Math.min(window.innerHeight - (isCollapsed ? 60 : panelSize.height), e.clientY - dragOffset.y))
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        setPanelSize({
          width: Math.max(280, Math.min(600, resizeStart.width + deltaX)),
          height: Math.max(200, Math.min(800, resizeStart.height + deltaY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, panelSize, isCollapsed]);

  return (
    <div className="relative min-h-[300vh]">
      {/* Fixed background that moves based on scroll */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: `center ${scrollPosition}%`,
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollPosition * 0.5}px)`,
          transition: isAutoScrolling ? 'none' : 'transform 0.1s ease-out'
        }}
      />

      {/* Glass overlay for better contrast */}
      <div 
        className="fixed inset-0 z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Draggable, Resizable, Collapsible Controls panel */}
      <div 
        ref={panelRef}
        className={`fixed z-50 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          left: `${panelPosition.x}px`,
          top: `${panelPosition.y}px`,
          width: `${panelSize.width}px`,
          height: isCollapsed ? 'auto' : `${panelSize.height}px`,
          transition: isCollapsed ? 'height 0.3s ease' : 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        <LiquidGlass {...LiquidGlassPresets.iOS} style={{ 
          padding: '0',
          height: '100%',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}>
          {/* Header with drag handle and collapse button */}
          <div className="drag-handle flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <Bars3Icon className="w-5 h-5 text-white/60" />
              <BeakerIcon className="w-5 h-5 text-white/80" />
              <h2 className="text-lg font-semibold text-white">Glass Refraction Test</h2>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(!isCollapsed);
              }}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isCollapsed ? (
                <ChevronDownIcon className="w-5 h-5 text-white/80" />
              ) : (
                <ChevronUpIcon className="w-5 h-5 text-white/80" />
              )}
            </button>
          </div>

          {/* Collapsible content */}
          {!isCollapsed && (
            <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: `${panelSize.height - 80}px` }}>
              {/* Background Image Selection */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Background Image
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {backgroundOptions.map((bg, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setBackgroundImage(bg.url);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        backgroundImage === bg.url 
                          ? 'bg-white/30 text-white' 
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      <div className="font-medium">{bg.name}</div>
                      <div className="text-xs text-white/60">{bg.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Controls */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Animation
                </label>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoScrolling(!isAutoScrolling);
                  }}
                  className={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                    isAutoScrolling 
                      ? 'bg-green-500/30 text-green-100' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <ArrowPathIcon className="w-4 h-4 inline mr-2" />
                  {isAutoScrolling ? 'Stop Auto Scroll' : 'Start Auto Scroll'}
                </button>
                <p className="text-white/60 text-xs mt-1">
                  {isAutoScrolling ? 'Auto-scrolling background' : 'Scroll manually to test'}
                </p>
              </div>

              {/* Panel Controls */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Panel Controls
                </label>
                <div className="space-y-2">
                  <div className="text-xs text-white/60">
                    • Drag header to move panel
                  </div>
                  <div className="text-xs text-white/60">
                    • Drag bottom-right to resize
                  </div>
                  <div className="text-xs text-white/60">
                    • Click arrows to collapse/expand
                  </div>
                </div>
              </div>

              {/* Current Settings Display */}
              <div className="bg-white/10 p-3 rounded">
                <div className="text-white/80 text-sm font-medium mb-2">Current Settings</div>
                <div className="space-y-1 text-xs text-white/60">
                  <div>Position: {panelPosition.x}, {panelPosition.y}</div>
                  <div>Size: {panelSize.width}×{panelSize.height}</div>
                  <div>Background: {backgroundOptions.find(bg => bg.url === backgroundImage)?.name}</div>
                  <div>Auto-scroll: {isAutoScrolling ? 'ON' : 'OFF'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Resize handle */}
          {!isCollapsed && (
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-white/20 hover:bg-white/30 transition-colors"
              onMouseDown={handleResizeMouseDown}
              style={{
                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
              }}
            >
              <ArrowsPointingOutIcon className="w-3 h-3 text-white/60 absolute bottom-0 right-0" />
            </div>
          )}
        </LiquidGlass>
      </div>

      {/* Main content with glass panels */}
      <div className="relative z-30 pt-20">
        
        {/* Hero section */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <LiquidGlass {...LiquidGlassPresets.dramatic} style={{ padding: '40px', marginBottom: '2rem' }}>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  <EyeIcon className="w-12 h-12 inline mr-4" />
                  Liquid Glass Refraction Test
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Watch how the glass panels distort and refract the background as it moves behind them. 
                  This demonstrates true glass-like behavior.
                </p>
              </LiquidGlass>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <LiquidGlass {...LiquidGlassPresets.iOS} style={{ padding: '30px' }}>
                <h3 className="text-2xl font-semibold text-white mb-4">iOS Style Glass</h3>
                <p className="text-white/80 mb-4">
                  Apple&apos;s signature glass effect with subtle blur and perfect transparency.
                </p>
                <div className="space-y-2 text-white/70">
                  <div>• Backdrop blur: 25px</div>
                  <div>• Saturation: 125%</div>
                  <div>• Tint opacity: 0.12</div>
                </div>
              </LiquidGlass>

              <LiquidGlass {...LiquidGlassPresets.blue} style={{ padding: '30px' }}>
                <h3 className="text-2xl font-semibold text-white mb-4">Blue Tinted Glass</h3>
                <p className="text-white/80 mb-4">
                  Colored glass with blue tinting that enhances the background.
                </p>
                <div className="space-y-2 text-white/70">
                  <div>• Blue tint: rgb(59, 130, 246)</div>
                  <div>• Enhanced saturation</div>
                  <div>• Stronger blur effect</div>
                </div>
              </LiquidGlass>
            </div>
          </div>
        </div>

        {/* Scrolling section */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
              <LiquidGlass {...LiquidGlassPresets.purple} style={{ padding: '30px' }}>
                <h2 className="text-3xl font-bold text-white mb-4">Connected Glass Structure</h2>
                <p className="text-white/80">
                  Large connected glass panels that show how the background 
                  refracts through different glass intensities.
                </p>
              </LiquidGlass>
            </div>

            {/* Large connected glass structure */}
            <div className="relative">
              {/* Main central panel */}
              <div className="flex justify-center">
                <LiquidGlass 
                  {...LiquidGlassPresets.dramatic} 
                  style={{ 
                    padding: '60px',
                    width: '600px',
                    height: '400px',
                    borderRadius: '40px'
                  }}
                >
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Main Glass Panel</h3>
                    <p className="text-white/80 mb-6">
                      This large glass panel shows maximum refraction effects.
                      Notice how the background behind it appears distorted.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/10 p-3 rounded">
                        <div className="text-white font-semibold">Blur: 35px</div>
                        <div className="text-white/60">Maximum distortion</div>
                      </div>
                      <div className="bg-white/10 p-3 rounded">
                        <div className="text-white font-semibold">Saturation: 150%</div>
                        <div className="text-white/60">Enhanced colors</div>
                      </div>
                    </div>
                  </div>
                </LiquidGlass>
              </div>

              {/* Connected side panels */}
              <div className="flex justify-between items-center mt-8">
                <LiquidGlass 
                  {...LiquidGlassPresets.iOS} 
                  style={{ 
                    padding: '30px',
                    width: '250px',
                    height: '180px',
                    borderRadius: '20px'
                  }}
                >
                  <h4 className="text-lg font-semibold text-white mb-3">Left Wing</h4>
                  <p className="text-white/70 text-sm">
                    Subtle iOS-style glass with gentle background distortion.
                  </p>
                </LiquidGlass>

                <LiquidGlass 
                  {...LiquidGlassPresets.blue} 
                  style={{ 
                    padding: '30px',
                    width: '250px',
                    height: '180px',
                    borderRadius: '20px'
                  }}
                >
                  <h4 className="text-lg font-semibold text-white mb-3">Right Wing</h4>
                  <p className="text-white/70 text-sm">
                    Blue-tinted glass showing color refraction effects.
                  </p>
                </LiquidGlass>
              </div>

              {/* Bottom extension */}
              <div className="flex justify-center mt-8">
                <LiquidGlass 
                  variant="liquid"
                  tintColor="168, 85, 247"
                  tintOpacity={0.18}
                  style={{ 
                    padding: '40px',
                    width: '400px',
                    height: '120px',
                    borderRadius: '60px'
                  }}
                >
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-white mb-2">Bottom Extension</h4>
                    <p className="text-white/70 text-sm">
                      Purple-tinted liquid glass with flowing characteristics.
                    </p>
                  </div>
                </LiquidGlass>
              </div>
            </div>
          </div>
        </div>

        {/* Test section */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl w-full">
            <LiquidGlass {...LiquidGlassPresets.dark} style={{ padding: '40px' }}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                <PhotoIcon className="w-8 h-8 inline mr-3" />
                Refraction Analysis
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">What You Should See:</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• Background content blurred through glass</li>
                    <li>• Colors enhanced by saturation</li>
                    <li>• Tinted overlays creating depth</li>
                    <li>• Smooth transitions as content moves</li>
                    <li>• Different glass intensities</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Control Panel Features:</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• Drag header to move panel</li>
                    <li>• Resize from bottom-right corner</li>
                    <li>• Collapse/expand for better view</li>
                    <li>• Switch backgrounds easily</li>
                    <li>• Auto-scroll for smooth testing</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <ChevronDownIcon className="w-6 h-6 text-white/60 mx-auto animate-bounce" />
                <p className="text-white/60 text-sm mt-2">
                  Move the control panel to get a better view of the glass effects
                </p>
              </div>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </div>
  );
} 