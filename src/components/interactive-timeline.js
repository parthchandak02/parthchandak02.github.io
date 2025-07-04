import React, { useMemo, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import TimelineIcon from './timeline-icon';

// Stable CompanyLogo component outside of render to prevent flickering
const CompanyLogo = React.memo(({ logo, company, fallbackIcon, category }) => {
  const [imageError, setImageError] = useState(false);

  if (!logo || imageError) {
    return <TimelineIcon icon={fallbackIcon} category={category} size={16} />;
  }

  return (
    <img
      src={`/images/job-logo-icons/${logo}`}
      alt={company}
      style={{
        width: '1.5rem',
        height: '1.5rem',
        objectFit: 'contain',
        borderRadius: '4px',
      }}
      onError={() => setImageError(true)}
    />
  );
});

CompanyLogo.propTypes = {
  logo: PropTypes.string,
  company: PropTypes.string,
  fallbackIcon: PropTypes.string,
  category: PropTypes.string,
};

CompanyLogo.displayName = 'CompanyLogo';

const InteractiveTimeline = ({ activeFilter = 'about' }) => {
  // Query all content from different directories
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/(jobs|research|media|community|awards|projects)/" }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        nodes {
          frontmatter {
            title
            subtitle
            company
            publication
            location
            range
            date
            order
            category
            icon
            description
            image
            companyLogo
          }
          fileAbsolutePath
        }
      }
    }
  `);

  // Process and normalize the data
  const timelineData = useMemo(() => data.allMarkdownRemark.nodes.map(node => {
    const { frontmatter } = node;
    return {
      title: frontmatter.title,
      subtitle: frontmatter.subtitle || frontmatter.company || frontmatter.publication || '',
      location: frontmatter.location || '',
      date: frontmatter.date,
      range: frontmatter.range || frontmatter.date,
      category: frontmatter.category,
      icon: frontmatter.icon || 'briefcase',
      description: frontmatter.description,
      image: frontmatter.image,
      companyLogo: frontmatter.companyLogo,
    };
  }), [data]);

  // Filter the data based on active filter and ensure proper sorting
  const filteredData = useMemo(() => {
    let result = [];

    if (activeFilter === 'about') {
      result = timelineData; // Show all for about section
    } else if (activeFilter === 'contact') {
      result = []; // No timeline for contact
    } else {
      result = timelineData.filter(item => item.category === activeFilter);
    }

    // Ensure descending chronological order (latest first)
    return result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // Descending order (newest first)
    });
  }, [timelineData, activeFilter]);

  // Clean minimal design - no color coding
  const categoryColors = {
    Experience: 'rgba(255, 255, 255, 0.1)',
    Research: 'rgba(255, 255, 255, 0.1)',
    Projects: 'rgba(255, 255, 255, 0.1)',
    'Media & Press': 'rgba(255, 255, 255, 0.1)',
    Awards: 'rgba(255, 255, 255, 0.1)',
    'Community Service': 'rgba(255, 255, 255, 0.1)',
  };

  return (
    <div
      id="timeline-section"
      style={{
        background: 'transparent',
        minHeight: '100vh',
        padding: '0',
      }}>
      {/* Show contact section or timeline */}
      {activeFilter === 'contact' ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
          <div
            className="glass"
            style={{
              padding: '3rem',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
            }}>
            <h2
              style={{
                color: '#ff6b6b',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontFamily: '"Space Grotesk", "SF Pro Display", system-ui, sans-serif',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
              Get In Touch
            </h2>
            <p
              style={{
                color: '#ccc',
                fontSize: '1.2rem',
                lineHeight: 1.7,
                fontFamily: '"Inter", "SF Pro Text", system-ui, sans-serif',
              }}>
              Feel free to reach out through any of the social links on the right sidebar. I'm
              always interested in discussing new opportunities, collaborative projects, or
              innovative technology solutions in autonomous systems and UX design.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '1.5rem',
              transform: 'translateX(-50%)',
              height: '100%',
              width: '1px',
              background:
                'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent)',
              borderRadius: '1px',
            }}
            aria-hidden="true"
          />

          {/* Timeline Items */}
          {filteredData.map((item, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                paddingLeft: '4rem',
                marginBottom: '1.5rem',
              }}>
              {/* Timeline Icon */}
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  left: '1.5rem',
                  top: '1rem',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#888',
                  overflow: 'hidden',
                }}>
                <CompanyLogo
                  logo={item.companyLogo}
                  company={item.company}
                  fallbackIcon={item.icon}
                  category={item.category}
                />
              </div>

              {/* Timeline Card */}
              <div
                className="glass"
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                }}>
                {/* Category indicator */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: categoryColors[item.category] || '#ff6b6b',
                    borderRadius: '20px 20px 0 0',
                  }}
                />

                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: '"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#888',
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                    {item.category}
                  </span>
                  <time
                    style={{
                      fontSize: '0.85rem',
                      fontFamily: '"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace',
                      fontWeight: '500',
                      color: '#888',
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                    {item.range}
                  </time>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    marginBottom: '0.5rem',
                    fontFamily: '"Space Grotesk", "SF Pro Display", system-ui, sans-serif',
                    fontWeight: '600',
                    color: 'white',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}>
                  {item.title}
                </h3>

                {/* Subtitle */}
                {item.subtitle && (
                  <div
                    style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                      marginBottom: '0.5rem',
                      fontFamily: '"Inter", "SF Pro Text", system-ui, sans-serif',
                      fontWeight: '500',
                      color: '#bbb',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                    }}>
                    <span>{item.subtitle}</span>
                    {item.location && (
                      <>
                        <span style={{ color: '#666' }}>•</span>
                        <span style={{ color: '#888' }}>{item.location}</span>
                      </>
                    )}
                  </div>
                )}

                {/* Project Image */}
                {item.image && (
                  <div
                    className="glass"
                    style={{
                      marginTop: '1rem',
                      marginBottom: '1rem',
                      padding: '0.75rem',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}>
                    <img
                      src={`/images/projects/${item.image}`}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '300px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        display: 'block',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                      }}
                      onError={e => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Description */}
                <p
                  style={{
                    lineHeight: 1.7,
                    color: '#ccc',
                    fontFamily: '"Inter", "SF Pro Text", system-ui, sans-serif',
                    fontSize: '1rem',
                    letterSpacing: '0.01em',
                    marginTop: '1rem',
                  }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {filteredData.length === 0 && (
            <div
              className="glass"
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                borderRadius: '20px',
                marginLeft: '4rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}>
              <p
                style={{
                  color: '#888',
                  fontSize: '1.1rem',
                  fontFamily: '"Inter", "SF Pro Text", system-ui, sans-serif',
                }}>
                No items in this category yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

InteractiveTimeline.propTypes = {
  activeFilter: PropTypes.string,
};

export default InteractiveTimeline;
