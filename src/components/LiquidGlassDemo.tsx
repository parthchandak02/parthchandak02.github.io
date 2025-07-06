"use client";

import React, { useState } from 'react';
import LiquidGlass, { LiquidGlassPresets } from './LiquidGlass';
import { BackgroundProvider } from './BackgroundProvider';
import { 
  SwatchIcon, 
  AdjustmentsHorizontalIcon, 
  EyeIcon,
  BeakerIcon,
  RocketLaunchIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export default function LiquidGlassDemo() {
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof LiquidGlassPresets>('iOS');
  const [customSettings, setCustomSettings] = useState({
    tintColor: '255, 255, 255',
    tintOpacity: 0.15,
    blurIntensity: 20,
    saturation: 120,
    variant: 'medium' as const
  });

  const presetKeys = Object.keys(LiquidGlassPresets) as (keyof typeof LiquidGlassPresets)[];

  return (
    <BackgroundProvider>
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
          
          {/* Left side - Preset Examples */}
          <div className="space-y-6">
            <LiquidGlass {...LiquidGlassPresets.iOS} style={{ padding: '24px' }}>
              <h2 className="text-2xl font-bold text-white mb-4">
                <EyeIcon className="inline w-8 h-8 mr-3" />
                New Liquid Glass
              </h2>
              <p className="text-white/90 mb-4">
                Based on research of working liquid glass implementations, this uses:
              </p>
              <ul className="text-white/80 space-y-2">
                <li>• Strong backdrop-filter with blur + saturation</li>
                <li>• Inner shadows (inset box-shadow)</li>
                <li>• Glass tinting with color overlays</li>
                <li>• Simple noise patterns</li>
                <li>• Proper layering and performance</li>
              </ul>
            </LiquidGlass>

            <div className="grid grid-cols-2 gap-4">
              {presetKeys.map((presetKey) => {
                const preset = LiquidGlassPresets[presetKey];
                return (
                  <LiquidGlass
                    key={presetKey}
                    {...preset}
                    style={{ 
                      padding: '20px',
                      cursor: 'pointer',
                      transform: selectedPreset === presetKey ? 'scale(1.02)' : 'scale(1)',
                      transition: 'transform 0.2s ease'
                    }}
                    onClick={() => setSelectedPreset(presetKey)}
                  >
                    <div className="text-center">
                      <SwatchIcon className="w-8 h-8 mx-auto mb-2 text-white/80" />
                      <h3 className="text-white font-semibold capitalize">{presetKey}</h3>
                      <p className="text-white/60 text-sm">
                        {presetKey === 'iOS' ? 'Apple-style' : 
                         presetKey === 'dark' ? 'Dark mode' :
                         presetKey === 'dramatic' ? 'High impact' : 
                         'Colorful tint'}
                      </p>
                    </div>
                  </LiquidGlass>
                );
              })}
            </div>
          </div>

          {/* Right side - Interactive Controls */}
          <div className="space-y-6">
            <LiquidGlass 
              {...customSettings}
              style={{ padding: '24px' }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                <AdjustmentsHorizontalIcon className="inline w-8 h-8 mr-3" />
                Custom Controls
              </h2>
              
              <div className="space-y-4">
                {/* Tint Opacity */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Tint Opacity: {customSettings.tintOpacity.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={customSettings.tintOpacity}
                    onChange={(e) => setCustomSettings(prev => ({ 
                      ...prev, 
                      tintOpacity: Number(e.target.value) 
                    }))}
                    className="w-full accent-blue-400"
                  />
                </div>

                {/* Blur Intensity */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Blur Intensity: {customSettings.blurIntensity}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={customSettings.blurIntensity}
                    onChange={(e) => setCustomSettings(prev => ({ 
                      ...prev, 
                      blurIntensity: Number(e.target.value) 
                    }))}
                    className="w-full accent-purple-400"
                  />
                </div>

                {/* Saturation */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Saturation: {customSettings.saturation}%
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="200"
                    step="5"
                    value={customSettings.saturation}
                    onChange={(e) => setCustomSettings(prev => ({ 
                      ...prev, 
                      saturation: Number(e.target.value) 
                    }))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                {/* Color Presets */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Tint Color
                  </label>
                  <div className="flex gap-2">
                    {[
                      { name: 'White', color: '255, 255, 255' },
                      { name: 'Blue', color: '59, 130, 246' },
                      { name: 'Purple', color: '168, 85, 247' },
                      { name: 'Green', color: '34, 197, 94' },
                      { name: 'Red', color: '239, 68, 68' }
                    ].map(({ name, color }) => (
                      <button
                        key={name}
                        onClick={() => setCustomSettings(prev => ({ ...prev, tintColor: color }))}
                        className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 rounded transition-colors text-white"
                        style={{ 
                          backgroundColor: customSettings.tintColor === color ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' 
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </LiquidGlass>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <LiquidGlass 
                {...LiquidGlassPresets.blue}
                style={{ padding: '20px' }}
              >
                <BeakerIcon className="w-10 h-10 text-white/80 mb-3" />
                <h3 className="text-white font-semibold mb-2">Research-Based</h3>
                <p className="text-white/70 text-sm">
                  Built from analysis of working liquid glass implementations
                </p>
              </LiquidGlass>

              <LiquidGlass 
                {...LiquidGlassPresets.purple}
                style={{ padding: '20px' }}
              >
                <RocketLaunchIcon className="w-10 h-10 text-white/80 mb-3" />
                <h3 className="text-white font-semibold mb-2">Performance</h3>
                <p className="text-white/70 text-sm">
                  Optimized for smooth rendering and cross-browser support
                </p>
              </LiquidGlass>

              <LiquidGlass 
                {...LiquidGlassPresets.dark}
                style={{ padding: '20px' }}
              >
                <CogIcon className="w-10 h-10 text-white/80 mb-3" />
                <h3 className="text-white font-semibold mb-2">Customizable</h3>
                <p className="text-white/70 text-sm">
                  Easy presets and fine-grained control over all parameters
                </p>
              </LiquidGlass>

              <LiquidGlass 
                {...LiquidGlassPresets.dramatic}
                style={{ padding: '20px' }}
              >
                <SwatchIcon className="w-10 h-10 text-white/80 mb-3" />
                <h3 className="text-white font-semibold mb-2">Multiple Styles</h3>
                <p className="text-white/70 text-sm">
                  From subtle to dramatic, with color tinting options
                </p>
              </LiquidGlass>
            </div>
          </div>
        </div>
      </div>
    </BackgroundProvider>
  );
} 