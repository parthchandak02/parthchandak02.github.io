import React from 'react';

const GlobalStyles = () => {
  const styles = `
    :root {
      /* Premium Modern Font Stack */
      --font-heading: 'Space Grotesk', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --font-body: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
      
      /* Glass UI Colors */
      --glass-bg: rgba(255, 255, 255, 0.08);
      --glass-bg-strong: rgba(255, 255, 255, 0.12);
      --glass-border: rgba(255, 255, 255, 0.18);
      --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      --glass-shadow-strong: 0 12px 40px rgba(0, 0, 0, 0.4);
      
      /* Gradient Colors */
      --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      --gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      --gradient-text: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      
      /* Modern Colors */
      --text-primary: #ffffff;
      --text-secondary: #e2e8f0;
      --text-muted: #94a3b8;
      --accent-blue: #3b82f6;
      --accent-purple: #8b5cf6;
      --accent-pink: #ec4899;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* 🎯 CRITICAL: Immediate dark screen - prevents any white flash */


    html {
      font-size: 16px;
      scroll-behavior: smooth;
      background: #000000 !important;
      /* 🎯 SAFARI MOBILE WHITE PADDING FIX - Use dvh for seamless viewport */
      height: 100%;
      height: -webkit-fill-available;
      min-height: 100vh; /* Fallback for older browsers */
      min-height: 100dvh; /* Dynamic viewport height - fixes Safari mobile white padding */
    }

    body {
      font-family: var(--font-body);
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%) !important;
      background-color: #000000 !important;
      color: var(--text-primary);
      line-height: 1.65;
      overflow-x: hidden;
      font-weight: 400;
      letter-spacing: 0.01em;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      /* 🎯 SAFARI MOBILE WHITE PADDING FIX - Use dvh for seamless viewport */
      min-height: 100vh; /* Fallback for older browsers */
      min-height: -webkit-fill-available;
      min-height: 100dvh; /* Dynamic viewport height - fixes Safari mobile white padding */
      /* 🎨 SEAMLESS DARK BACKGROUND - extends infinitely beyond content boundaries */
      min-height: 200vh; /* Extends background way beyond content */
      margin: 0;
      padding: 0;
      position: relative;
    }

    /* Additional background layer for body to ensure seamless dark experience */
    body::before {
      content: '';
      position: fixed;
      top: -200vh;
      left: -200vw;
      right: -200vw;
      bottom: -200vh;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%);
      z-index: -9998;
      pointer-events: none;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
      font-weight: 600;
      line-height: 1.25;
      letter-spacing: -0.02em;
      text-rendering: optimizeLegibility;
    }

    /* Glass morphism utility classes */
    .glass {
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--glass-border);
      box-shadow: var(--glass-shadow);
    }

    .glass-strong {
      background: var(--glass-bg-strong);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--glass-border);
      box-shadow: var(--glass-shadow-strong);
    }

    .gradient-text {
      background: var(--gradient-text);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .gradient-border {
      position: relative;
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .gradient-border::before {
      content: '';
      position: absolute;
      inset: 0;
      padding: 1px;
      background: var(--gradient-primary);
      border-radius: inherit;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
      -webkit-mask-composite: xor;
    }

    /* Smooth animations */
    * {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Modern scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* 🎨 SEAMLESS DARK BACKGROUND - extends infinitely beyond content boundaries */
    html, body, #___gatsby, #gatsby-focus-wrapper {
      background: #000000 !important;
      background-color: #000000 !important;
      min-height: 100vh; /* Fallback for older browsers */
      min-height: 100dvh; /* Dynamic viewport height - fixes Safari mobile white padding */
      /* Extend background infinitely in all directions */
      min-height: 200vh; /* Extends background way beyond content */
      margin: 0;
      padding: 0;
    }

    /* Ensure the root document background extends beyond scroll boundaries */
    html::before {
      content: '';
      position: fixed;
      top: -100vh;
      left: -100vw;
      right: -100vw;
      bottom: -100vh;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%);
      z-index: -9999;
      pointer-events: none;
    }

    /* Override any potential white backgrounds */
    div, section, main, article, aside {
      background-color: transparent;
    }

    /* Ensure main container uses full viewport height */
    .main-container {
      min-height: 100vh; /* Fallback for older browsers */
      min-height: 100dvh; /* Dynamic viewport height - fixes Safari mobile white padding */
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%) !important;
      margin: 0;
      padding: 0;
    }

    /* 🎯 iOS Safe Area Insets Support */
    @supports (padding-top: constant(safe-area-inset-top)) {
      html {
        --safe-area-inset-top: constant(safe-area-inset-top);
        --safe-area-inset-right: constant(safe-area-inset-right);
        --safe-area-inset-bottom: constant(safe-area-inset-bottom);
        --safe-area-inset-left: constant(safe-area-inset-left);
      }
    }

    @supports (padding-top: env(safe-area-inset-top)) {
      html {
        --safe-area-inset-top: env(safe-area-inset-top);
        --safe-area-inset-right: env(safe-area-inset-right);
        --safe-area-inset-bottom: env(safe-area-inset-bottom);
        --safe-area-inset-left: env(safe-area-inset-left);
      }
    }

    /* PWA Display Mode Specific Styles */
    @media (display-mode: standalone) {
      html, body {
        height: 100%;
        min-height: 100vh;
        min-height: calc(100% + env(safe-area-inset-top));
        background: #000000 !important;
      }
    }

    @media (display-mode: fullscreen) {
      html, body {
        height: 100%;
        min-height: 100vh;
        background: #000000 !important;
      }
    }

    /* 🎨 MOBILE SEAMLESS BACKGROUND - extends beyond overscroll boundaries */
    @media screen and (max-width: 768px) {
      html, body {
        height: 100%;
        height: -webkit-fill-available;
        overflow-x: hidden;
        /* Force dark background on mobile - extends beyond overscroll */
        background: #000000 !important;
        background-color: #000000 !important;
        min-height: 300vh; /* Extra height for overscroll areas */
      }
      
      body {
        position: relative;
        min-height: 100vh; /* Fallback for older browsers */
        min-height: calc(var(--vh, 1vh) * 100);
        min-height: 100dvh; /* Dynamic viewport height - fixes Safari mobile white padding */
        /* 🎯 iOS Safe Area Support for Mobile */
        min-height: calc(100% + env(safe-area-inset-top));
        min-height: 300vh; /* Extra height for seamless overscroll experience */
        padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%) !important;
      }

      /* Mobile-specific background extension for overscroll areas */
      body::after {
        content: '';
        position: fixed;
        top: -300vh;
        left: -100vw;
        right: -100vw;
        bottom: -300vh;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%);
        z-index: -9997;
        pointer-events: none;
      }
      
      /* Fix for iOS Safari bottom padding */
      .safe-bottom {
        padding-bottom: env(safe-area-inset-bottom);
      }
    }

    /* iOS Specific Fixes */
    @media screen and (-webkit-min-device-pixel-ratio: 2) {
      html, body {
        background: #000000 !important;
        background-color: #000000 !important;
        min-height: 100vh; /* Fallback for older browsers */
        min-height: 100dvh; /* Dynamic viewport height - fixes Safari mobile white padding */
        margin: 0;
        padding: 0;
      }
    }

    /* Fix for iOS status bar area */
    @media screen and (orientation: landscape) and (max-width: 896px) {
      html {
        padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
      }
    }

    /* 🎯 Gatsby Webpack Overlay Dark Theme */
    #webpack-dev-server-client-overlay {
      background: #000000 !important;
      color: #ffffff !important;
    }

    #webpack-dev-server-client-overlay div {
      background: #000000 !important;
      color: #ffffff !important;
    }

    /* Target Gatsby's development overlay */
    [data-gatsby-overlay] {
      background: #000000 !important;
      color: #ffffff !important;
    }

    [data-gatsby-overlay] * {
      background: transparent !important;
      color: #ffffff !important;
    }

    /* Target any generic overlay */
    .overlay, .development-overlay {
      background: #000000 !important;
      color: #ffffff !important;
    }

    /* Override Fast Refresh overlay */
    [id*="webpack"], [class*="webpack"], [id*="overlay"], [class*="overlay"] {
      background: #000000 !important;
      color: #ffffff !important;
    }

    /* Target the specific "Preparing requested page" overlay */
    div[style*="position: fixed"][style*="z-index"] {
      background: #000000 !important;
      color: #ffffff !important;
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
};

export default GlobalStyles;
