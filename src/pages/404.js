import React from 'react';
import { Link } from 'gatsby';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not Found" />
    <div
      style={{
        minHeight: '100dvh', // Dynamic viewport height - fixes Safari mobile white padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        background: '#000000',
        color: '#ffffff',
        margin: 0,
        padding: 0,
      }}>
      <h1 style={{ fontSize: '8rem', marginBottom: '1rem', color: '#666' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Page Not Found</h2>
      <Link
        to="/"
        style={{
          padding: '12px 24px',
          backgroundColor: '#007acc',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
        }}>
        Go Home
      </Link>
    </div>
  </>
);

export default NotFoundPage;
