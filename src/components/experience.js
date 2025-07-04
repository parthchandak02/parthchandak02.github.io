import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Experience = () => {
  // Query job data from markdown files
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___order], order: ASC }
      ) {
        nodes {
          frontmatter {
            title
            company
            location
            range
            order
            description
          }
        }
      }
    }
  `);

  const jobs = data.allMarkdownRemark.nodes;

  return (
    <section
      style={{
        padding: '6rem 2rem',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
      <h2
        className="gradient-text"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          marginBottom: '4rem',
          textAlign: 'center',
          fontFamily: 'var(--font-heading)',
          fontWeight: '700',
          letterSpacing: '-0.02em',
        }}>
        Experience
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {jobs.map((job, index) => (
          <div
            key={index}
            className="glass"
            style={{
              padding: '2.5rem',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = 'var(--glass-shadow-strong)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
            }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'var(--gradient-primary)',
                borderRadius: '20px 20px 0 0',
              }}
            />

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 1.8rem)',
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}>
              {job.frontmatter.title}
            </h3>

            <div
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-body)',
                fontWeight: '500',
                color: 'var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
              <span>{job.frontmatter.company}</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--text-secondary)' }}>{job.frontmatter.location}</span>
            </div>

            <div
              style={{
                fontSize: '0.95rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: '400',
                color: 'var(--text-muted)',
                padding: '0.25rem 0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                display: 'inline-block',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
              {job.frontmatter.range}
            </div>

            <p
              style={{
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                letterSpacing: '0.01em',
              }}>
              {job.frontmatter.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
