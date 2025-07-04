import React from 'react';
import SEO from '../components/seo';
import PortfolioLayout from '../components/portfolio-layout';
import BackgroundManager from '../components/background-manager';
import InteractiveTimeline from '../components/interactive-timeline';

const IndexPage = () => (
  <>
    <SEO />
    <BackgroundManager />
    <PortfolioLayout>
      <InteractiveTimeline />
    </PortfolioLayout>
  </>
);

export default IndexPage;
