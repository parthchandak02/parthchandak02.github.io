import React from 'react';
import PortfolioLayout from '../components/portfolio-layout';
import BackgroundManager from '../components/background-manager';
import InteractiveTimeline from '../components/interactive-timeline';

const IndexPage = () => (
  <>
    <BackgroundManager />
    <PortfolioLayout>
      <InteractiveTimeline />
    </PortfolioLayout>
  </>
);

export default IndexPage;
