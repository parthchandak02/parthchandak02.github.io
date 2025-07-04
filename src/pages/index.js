import React from 'react';
import PortfolioLayout from '../components/portfolio-layout';
import LiquidBackground from '../components/liquid-background';
import InteractiveTimeline from '../components/interactive-timeline';

const IndexPage = () => (
  <>
    <LiquidBackground />
    <PortfolioLayout>
      <InteractiveTimeline />
    </PortfolioLayout>
  </>
);

export default IndexPage;
