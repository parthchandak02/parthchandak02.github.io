import React from 'react';

const GlobalStyles = () => {
  const styles = `
    :root {
      /* Modern Font Stack */
      --font-heading: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
      
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

    html {
      font-size: 16px;
      scroll-behavior: smooth;
      background: #000000 !important;
    }

    body {
      font-family: var(--font-body);
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%);
      color: var(--text-primary);
      line-height: 1.6;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
      font-weight: 600;
      line-height: 1.2;
      letter-spacing: -0.025em;
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

    /* Ensure consistent dark background everywhere */
    html, body, #___gatsby, #gatsby-focus-wrapper {
      background: #000000 !important;
      min-height: 100vh;
    }

    /* Override any potential white backgrounds */
    div, section, main, article, aside {
      background-color: transparent;
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
};

export default GlobalStyles;
