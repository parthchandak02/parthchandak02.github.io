"use client";

import React from 'react';
import { ChevronRightIcon, StarIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface GlassMorphismDemoProps {
  className?: string;
}

export default function GlassMorphismDemo({ className = '' }: GlassMorphismDemoProps) {
  return (
    <div className={`w-full min-h-screen relative overflow-hidden ${className}`}>
      {/* Main connected glass structure */}
      <div className="absolute inset-0 p-8">
        
        {/* Large Central Glass Panel - Main focal point with real-time refraction */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-80 glass-realtime z-30">
          <div className="p-8 h-full flex flex-col justify-center items-center text-center">
            <SparklesIcon className="w-16 h-16 text-white/80 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Liquid Glass Refraction</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Watch how the glass refracts and distorts the background behind it. Use the controls to adjust refraction intensity and liquid flow effects.
            </p>
            <button className="glass-button">
              Explore Lab <ChevronRightIcon className="w-4 h-4 ml-2 inline" />
            </button>
          </div>
        </div>

        {/* Connected Side Panels with different refraction effects */}
        
        {/* Left Wing - Liquid glass effect */}
        <div className="absolute top-1/2 left-20 transform -translate-y-1/2 w-72 h-60 glass-liquid glass-liquid-active z-20" 
             style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }}>
          <div className="p-6 h-full flex flex-col justify-center">
            <StarIcon className="w-12 h-12 text-white/80 mb-3" />
            <h3 className="text-xl font-semibold text-white mb-3">Liquid Flow</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Animated liquid glass with flowing distortion that creates mesmerizing refraction patterns.
            </p>
          </div>
        </div>

        {/* Right Wing - Chromatic aberration glass */}
        <div className="absolute top-1/2 right-20 transform -translate-y-1/2 w-72 h-60 glass-chromatic z-20"
             style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}>
          <div className="p-6 h-full flex flex-col justify-center items-end text-right">
            <HeartIcon className="w-12 h-12 text-white/80 mb-3" />
            <h3 className="text-xl font-semibold text-white mb-3">Chromatic Prism</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Glass with chromatic aberration that splits light like a prism, creating rainbow refraction edges.
            </p>
          </div>
        </div>

        {/* Top Extension - Wave glass */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-80 h-40 glass-wave z-10"
             style={{ clipPath: 'polygon(0 100%, 20% 0, 80% 0, 100% 100%)' }}>
          <div className="p-6 h-full flex flex-col justify-end items-center text-center">
            <h4 className="text-lg font-medium text-white mb-2">Wave Distortion</h4>
            <p className="text-white/50 text-xs">Flowing wave patterns</p>
          </div>
        </div>

        {/* Bottom Extension - Advanced liquid refraction */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-40 glass-card z-10"
             style={{ 
               clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)',
               filter: 'url(#liquid-refraction-advanced)'
             }}>
          <div className="p-6 h-full flex flex-col justify-start items-center text-center">
            <h4 className="text-lg font-medium text-white mb-2">Advanced Refraction</h4>
            <p className="text-white/50 text-xs">Deep liquid glass effect</p>
          </div>
        </div>

        {/* Floating Accent Panels with varying refraction intensities */}
        
        {/* Top Left Accent - Base refraction */}
        <div className="absolute top-32 left-32 w-48 h-32 glass-refraction z-15 rounded-2xl">
          <div className="p-4 h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2"></div>
              <p className="text-white/60 text-sm">Base Refraction</p>
            </div>
          </div>
        </div>

        {/* Top Right Accent - Strong refraction */}
        <div className="absolute top-32 right-32 w-48 h-32 glass-strong z-15 rounded-2xl">
          <div className="p-4 h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2"></div>
              <p className="text-white/60 text-sm">Strong Refraction</p>
            </div>
          </div>
        </div>

        {/* Bottom Left Accent - Liquid glass */}
        <div className="absolute bottom-32 left-32 w-48 h-32 glass-liquid z-15 rounded-2xl">
          <div className="p-4 h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2"></div>
              <p className="text-white/60 text-sm">Liquid Glass</p>
            </div>
          </div>
        </div>

        {/* Bottom Right Accent - Wave distortion */}
        <div className="absolute bottom-32 right-32 w-48 h-32 glass-wave z-15 rounded-2xl">
          <div className="p-4 h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2"></div>
              <p className="text-white/60 text-sm">Wave Glass</p>
            </div>
          </div>
        </div>

        {/* Connecting Lines - Visual glass connections with subtle refraction */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Center to left connection */}
          <div className="absolute top-1/2 left-80 w-24 h-px bg-gradient-to-r from-white/30 to-transparent transform -translate-y-1/2 z-25" style={{ filter: 'url(#base-refraction)' }}></div>
          
          {/* Center to right connection */}
          <div className="absolute top-1/2 right-80 w-24 h-px bg-gradient-to-l from-white/30 to-transparent transform -translate-y-1/2 z-25" style={{ filter: 'url(#base-refraction)' }}></div>
          
          {/* Center to top connection */}
          <div className="absolute top-60 left-1/2 w-px h-24 bg-gradient-to-t from-white/30 to-transparent transform -translate-x-1/2 z-25" style={{ filter: 'url(#base-refraction)' }}></div>
          
          {/* Center to bottom connection */}
          <div className="absolute bottom-60 left-1/2 w-px h-24 bg-gradient-to-b from-white/30 to-transparent transform -translate-x-1/2 z-25" style={{ filter: 'url(#base-refraction)' }}></div>
        </div>

        {/* Ambient glow effects with enhanced refraction */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Central glow with liquid refraction */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-80 rounded-3xl blur-3xl opacity-30" 
               style={{ 
                 background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(59,130,246,0.1) 50%, transparent 100%)',
                 filter: 'url(#liquid-distortion)'
               }}></div>
          
          {/* Side glows with wave effects */}
          <div className="absolute top-1/2 left-20 transform -translate-y-1/2 w-72 h-60 rounded-3xl blur-2xl opacity-20"
               style={{ 
                 background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 100%)',
                 filter: 'url(#wave-distortion)'
               }}></div>
          <div className="absolute top-1/2 right-20 transform -translate-y-1/2 w-72 h-60 rounded-3xl blur-2xl opacity-20"
               style={{ 
                 background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 100%)',
                 filter: 'url(#chromatic-aberration)'
               }}></div>
        </div>

        {/* Floating refraction demonstration elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 glass-liquid rounded-full z-40 flex items-center justify-center">
          <div className="w-4 h-4 bg-white/30 rounded-full"></div>
        </div>
        
        <div className="absolute top-3/4 right-1/4 w-20 h-20 glass-chromatic rounded-xl z-40 flex items-center justify-center">
          <div className="w-6 h-6 bg-white/30 rounded-lg"></div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 glass-wave rounded-lg z-40 flex items-center justify-center">
          <div className="w-3 h-3 bg-white/30 rounded-sm"></div>
        </div>

        {/* Interactive demonstration text */}
        <div className="absolute bottom-12 left-8 z-40">
          <div className="glass-realtime p-4 rounded-xl">
            <h5 className="text-white font-medium mb-2">🧪 Live Glass Physics</h5>
            <p className="text-white/70 text-sm max-w-xs">
              Each panel demonstrates different refraction effects. The glass actually distorts and bends the background image behind it, creating authentic optical effects.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced hover effects with refraction */}
      <style jsx>{`
        .glass-realtime:hover,
        .glass-liquid:hover,
        .glass-chromatic:hover,
        .glass-wave:hover,
        .glass-refraction:hover {
          transform: translateY(-4px) scale(1.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-liquid-active {
          animation: liquid-ripple 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 