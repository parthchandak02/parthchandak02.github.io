"use client";

import React from 'react';

export default function GlassRefractionFilters() {
  return (
    <svg 
      className="glass-refraction-filters" 
      width="0" 
      height="0"
      aria-hidden="true"
    >
      <defs>
        {/* Base Glass Refraction Filter */}
        <filter id="glass-refraction" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="2"
            seed="1"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Enhanced Glass Refraction on Hover */}
        <filter id="glass-refraction-hover" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.025"
            numOctaves="3"
            seed="2"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.1 0 0 0 0
                    0 1.1 0 0 0
                    0 0 1.1 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Liquid Glass Distortion */}
        <filter id="liquid-distortion" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves="4"
            seed="3"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              values="0.008 0.012;0.012 0.008;0.008 0.012"
              dur="8s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.05 0 0 0 0
                    0 1.05 0 0 0
                    0 0 1.15 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Chromatic Aberration Effect */}
        <filter id="chromatic-aberration" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset in="SourceGraphic" dx="1" dy="0" result="redChannel" />
          <feOffset in="SourceGraphic" dx="0" dy="0" result="greenChannel" />
          <feOffset in="SourceGraphic" dx="-1" dy="0" result="blueChannel" />
          
          <feColorMatrix
            in="redChannel"
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="red"
          />
          <feColorMatrix
            in="greenChannel"
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="green"
          />
          <feColorMatrix
            in="blueChannel"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="blue"
          />
          
          <feComposite in="red" in2="green" operator="screen" result="redGreen" />
          <feComposite in="redGreen" in2="blue" operator="screen" />
        </filter>

        {/* Wave Distortion Effect */}
        <filter id="wave-distortion" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02 0.01"
            numOctaves="2"
            seed="4"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              values="0.02 0.01;0.025 0.015;0.02 0.01"
              dur="6s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.3" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.02 0 0 0 0
                    0 1.02 0 0 0
                    0 0 1.08 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Button Refraction */}
        <filter id="button-refraction" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.02"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="1"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.2" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>

        {/* Enhanced Button Refraction on Hover */}
        <filter id="button-refraction-hover" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025 0.025"
            numOctaves="2"
            seed="6"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.05 0 0 0 0
                    0 1.05 0 0 0
                    0 0 1.1 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Base Refraction */}
        <filter id="base-refraction" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.015"
            numOctaves="1"
            seed="7"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="1.5"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.3" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>

        {/* Strong Refraction */}
        <filter id="strong-refraction" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves="3"
            seed="8"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.1 0 0 0 0
                    0 1.1 0 0 0
                    0 0 1.2 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Real-time Refraction (Dynamic) */}
        <filter id="realtime-refraction" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="2"
            seed="9"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="var(--refraction-intensity, 15)"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="calc(var(--blur-intensity, 12px) * 0.08)" result="blur" />
          <feColorMatrix
            type="matrix"
            values="calc(1 + var(--refractive-index, 1.5) * 0.05) 0 0 0 0
                    0 calc(1 + var(--refractive-index, 1.5) * 0.05) 0 0 0
                    0 0 calc(1 + var(--refractive-index, 1.5) * 0.1) 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Large Panel Refraction */}
        <filter id="large-refraction" x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves="4"
            seed="10"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.08 0 0 0 0
                    0 1.08 0 0 0
                    0 0 1.15 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Enhanced Large Panel Refraction on Hover */}
        <filter id="large-refraction-hover" x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.010 0.015"
            numOctaves="5"
            seed="11"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.15 0 0 0 0
                    0 1.15 0 0 0
                    0 0 1.25 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Icon Refraction */}
        <filter id="icon-refraction" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.02"
            numOctaves="2"
            seed="12"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.05 0 0 0 0
                    0 1.05 0 0 0
                    0 0 1.1 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Badge Refraction */}
        <filter id="badge-refraction" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.025"
            numOctaves="1"
            seed="13"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="1.5"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.2" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>

        {/* Advanced Liquid Refraction with Animation */}
        <filter id="liquid-refraction-advanced" x="-70%" y="-70%" width="240%" height="240%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.005 0.008"
            numOctaves="6"
            seed="14"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              values="0.005 0.008;0.008 0.005;0.010 0.012;0.008 0.005;0.005 0.008"
              dur="12s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="seed"
              values="14;15;16;17;14"
              dur="16s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.1 0 0 0 0
                    0 1.1 0 0 0
                    0 0 1.3 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>

        {/* Glass Distortion for Main Demo */}
        <filter id="glass-distortion" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="3"
            seed="1"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feColorMatrix
            type="matrix"
            values="1.05 0 0 0 0
                    0 1.05 0 0 0
                    0 0 1.1 0 0
                    0 0 0 1 0"
            result="colorMatrix"
          />
          <feComposite in="blur" in2="colorMatrix" operator="over" />
        </filter>
      </defs>
    </svg>
  );
} 