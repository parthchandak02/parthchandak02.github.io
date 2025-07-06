"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components';
import { AdjustmentsHorizontalIcon, EyeIcon, BeakerIcon } from '@heroicons/react/24/outline';

interface GlassRefractionControlsProps {
  className?: string;
}

export interface GlassRefractionSettings {
  refractionIntensity: number;
  distortionScale: number;
  liquidFlow: number;
  chromaticAberration: number;
  blurIntensity: number;
  refractiveIndex: number;
  waveAmplitude: number;
  waveFrequency: number;
}

export default function GlassRefractionControls({ className = '' }: GlassRefractionControlsProps) {
  const [settings, setSettings] = useState<GlassRefractionSettings>({
    refractionIntensity: 15,
    distortionScale: 8,
    liquidFlow: 5,
    chromaticAberration: 2,
    blurIntensity: 12,
    refractiveIndex: 1.5,
    waveAmplitude: 3,
    waveFrequency: 0.02
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Update CSS custom properties when settings change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--refraction-intensity', `${settings.refractionIntensity}px`);
    root.style.setProperty('--distortion-scale', `${settings.distortionScale}`);
    root.style.setProperty('--liquid-flow', `${settings.liquidFlow}px`);
    root.style.setProperty('--chromatic-aberration', `${settings.chromaticAberration}px`);
    root.style.setProperty('--blur-intensity', `${settings.blurIntensity}px`);
    root.style.setProperty('--refractive-index', `${settings.refractiveIndex}`);
    root.style.setProperty('--wave-amplitude', `${settings.waveAmplitude}`);
    root.style.setProperty('--wave-frequency', `${settings.waveFrequency}`);
  }, [settings]);

  const handleSettingChange = (key: keyof GlassRefractionSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings({
      refractionIntensity: 15,
      distortionScale: 8,
      liquidFlow: 5,
      chromaticAberration: 2,
      blurIntensity: 12,
      refractiveIndex: 1.5,
      waveAmplitude: 3,
      waveFrequency: 0.02
    });
  };

  const presets = {
    subtle: {
      refractionIntensity: 8,
      distortionScale: 4,
      liquidFlow: 2,
      chromaticAberration: 1,
      blurIntensity: 8,
      refractiveIndex: 1.3,
      waveAmplitude: 2,
      waveFrequency: 0.01
    },
    dramatic: {
      refractionIntensity: 25,
      distortionScale: 15,
      liquidFlow: 12,
      chromaticAberration: 5,
      blurIntensity: 20,
      refractiveIndex: 2.0,
      waveAmplitude: 8,
      waveFrequency: 0.05
    },
    liquid: {
      refractionIntensity: 20,
      distortionScale: 12,
      liquidFlow: 15,
      chromaticAberration: 3,
      blurIntensity: 15,
      refractiveIndex: 1.8,
      waveAmplitude: 6,
      waveFrequency: 0.03
    }
  };

  const applyPreset = (preset: keyof typeof presets) => {
    setSettings(presets[preset]);
  };

  return (
    <div className={`fixed top-8 left-8 z-50 ${className}`}>
      <GlassCard className="p-4 max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BeakerIcon className="w-5 h-5 text-white/80" />
            <h3 className="text-white font-semibold">Glass Refraction Lab</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="glass-button p-2"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            {/* Presets */}
            <div>
              <label className="text-white/80 text-sm font-medium mb-2 block">Quick Presets</label>
              <div className="flex gap-2">
                <button
                  onClick={() => applyPreset('subtle')}
                  className="glass-button text-xs px-3 py-1"
                >
                  Subtle
                </button>
                <button
                  onClick={() => applyPreset('dramatic')}
                  className="glass-button text-xs px-3 py-1"
                >
                  Dramatic
                </button>
                <button
                  onClick={() => applyPreset('liquid')}
                  className="glass-button text-xs px-3 py-1"
                >
                  Liquid
                </button>
              </div>
            </div>

            {/* Refraction Intensity */}
            <div>
              <label className="text-white/80 text-sm font-medium mb-2 block">
                Refraction Intensity: {settings.refractionIntensity}px
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={settings.refractionIntensity}
                onChange={(e) => handleSettingChange('refractionIntensity', Number(e.target.value))}
                className="w-full accent-blue-400"
              />
            </div>

            {/* Distortion Scale */}
            <div>
              <label className="text-white/80 text-sm font-medium mb-2 block">
                Distortion Scale: {settings.distortionScale}
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={settings.distortionScale}
                onChange={(e) => handleSettingChange('distortionScale', Number(e.target.value))}
                className="w-full accent-purple-400"
              />
            </div>

            {/* Liquid Flow */}
            <div>
              <label className="text-white/80 text-sm font-medium mb-2 block">
                Liquid Flow: {settings.liquidFlow}px
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={settings.liquidFlow}
                onChange={(e) => handleSettingChange('liquidFlow', Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Chromatic Aberration */}
            <div>
              <label className="text-white/80 text-sm font-medium mb-2 block">
                Chromatic Aberration: {settings.chromaticAberration}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={settings.chromaticAberration}
                onChange={(e) => handleSettingChange('chromaticAberration', Number(e.target.value))}
                className="w-full accent-pink-400"
              />
            </div>

            {/* Blur Intensity */}
            <div>
              <label className="text-white/80 text-sm font-medium mb-2 block">
                Blur Intensity: {settings.blurIntensity}px
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={settings.blurIntensity}
                onChange={(e) => handleSettingChange('blurIntensity', Number(e.target.value))}
                className="w-full accent-green-400"
              />
            </div>

            {/* Refractive Index */}
            <div>
              <label className="text-white/80 text-sm font-medium mb-2 block">
                Refractive Index: {settings.refractiveIndex}
              </label>
              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.1"
                value={settings.refractiveIndex}
                onChange={(e) => handleSettingChange('refractiveIndex', Number(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>

            {/* Wave Effects */}
            <div>
              <label className="text-white/80 text-sm font-medium mb-2 block">
                Wave Amplitude: {settings.waveAmplitude}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={settings.waveAmplitude}
                onChange={(e) => handleSettingChange('waveAmplitude', Number(e.target.value))}
                className="w-full accent-orange-400"
              />
            </div>

            <div>
              <label className="text-white/80 text-sm font-medium mb-2 block">
                Wave Frequency: {settings.waveFrequency}
              </label>
              <input
                type="range"
                min="0.001"
                max="0.1"
                step="0.001"
                value={settings.waveFrequency}
                onChange={(e) => handleSettingChange('waveFrequency', Number(e.target.value))}
                className="w-full accent-red-400"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetToDefaults}
              className="glass-button w-full"
            >
              Reset to Defaults
            </button>
          </div>
        )}

        {!isExpanded && (
          <div className="text-white/60 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <EyeIcon className="w-4 h-4" />
              <span>Live Glass Refraction</span>
            </div>
            <p className="text-xs">
              Click to expand controls and adjust glass distortion, refraction, and liquid flow effects.
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  );
} 