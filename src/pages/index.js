import React, { useState, useEffect } from 'react';
import SEO from '../components/seo';
import PortfolioLayout from '../components/portfolio-layout';
import BackgroundManager from '../components/background-manager';
import InteractiveTimeline from '../components/interactive-timeline';
import LogoLoader from '../components/logo-loader';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Only show loading on client side
  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
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
