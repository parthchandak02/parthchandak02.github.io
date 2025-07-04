import React from 'react';
import PropTypes from 'prop-types';
import GlobalStyles from './global-styles';
import PortfolioLayout from './portfolio-layout';

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <div
      style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
      }}>
      <PortfolioLayout>{children}</PortfolioLayout>
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
