import React, { useState, useEffect } from 'react';
import SEO from '../components/seo';
import PortfolioLayout from '../components/portfolio-layout';
import BackgroundManager from '../components/background-manager';
import InteractiveTimeline from '../components/interactive-timeline';
import LogoLoader from '../components/logo-loader';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Manage loading states more efficiently
  useEffect(() => {
    // Prevent flash of white content
    setShouldShowLoader(true);

    // Auto-complete loading if it takes too long (fallback)
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 second max loading time

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Show loader during initial load
  if (isLoading && shouldShowLoader) {
    return <LogoLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <SEO />
      <BackgroundManager />
      <PortfolioLayout>
        <InteractiveTimeline />
      </PortfolioLayout>
    </>
  );
};

export default IndexPage;
