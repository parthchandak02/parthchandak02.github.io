import React, { useMemo, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import TimelineIcon from './timeline-icon';

// Import company logos
import arthLogo from '../images/company-logos/arth-systems-logo.png';
import bergLogo from '../images/company-logos/berg-logo.png';
import boeingLogo from '../images/company-logos/boeing-logo.png';
import cubeLogo from '../images/company-logos/cube-logo.png';
import teslaLogo from '../images/company-logos/tesla-logo.png';
import wsuLogo from '../images/company-logos/washington-state-uni-logo.png';
import zooxLogo from '../images/company-logos/zoox-logo.png';

// Company logo mapping
const companyLogos = {
  'arth-systems-logo.png': arthLogo,
  'berg-logo.png': bergLogo,
  'boeing-logo.png': boeingLogo,
  'cube-logo.png': cubeLogo,
  'tesla-logo.png': teslaLogo,
  'washington-state-uni-logo.png': wsuLogo,
  'zoox-logo.png': zooxLogo,
};

// Stable CompanyLogo component outside of render to prevent flickering
const CompanyLogo = React.memo(({ logo, company, fallbackIcon, category }) => {
  const [imageError, setImageError] = useState(false);

  // Get the imported logo or fallback to icon
  const logoSrc = logo && companyLogos[logo];

  if (!logoSrc || imageError) {
    return <TimelineIcon icon={fallbackIcon} category={category} size={20} />;
  }

  return (
    <img
      src={logoSrc}
      alt={company}
      style={{
        width: '2rem',
        height: '2rem',
        objectFit: 'contain',
        borderRadius: '6px',
        filter: 'brightness(1.1) contrast(1.2)', // Brighter and more contrast for visibility
        background: 'transparent', // Clear background - no square
        padding: '1px', // Minimal padding for better fit
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

const InteractiveTimeline = React.memo(({ activeFilter = 'about' }) => {
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
  const timelineData = useMemo(
    () =>
      data.allMarkdownRemark.nodes.map(node => {
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
      }),
    [data],
  );

  // Map navigation IDs to actual category values in markdown files
  const categoryMapping = {
    experience: 'Experience',
    research: 'Research',
    projects: 'Projects',
    media: 'Media & Press',
    awards: 'Awards',
    community: 'Community Service',
  };

  // Filter the data based on active filter and ensure proper sorting
  const filteredData = useMemo(() => {
    let result = [];

    if (activeFilter === 'about') {
      result = timelineData; // Show all for about section
    } else if (activeFilter === 'contact') {
      result = []; // No timeline for contact
    } else {
      // Map the navigation ID to the actual category value
      const actualCategory = categoryMapping[activeFilter];
      result = timelineData.filter(item => item.category === actualCategory);
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
        minHeight: '100dvh', // Dynamic viewport height - fixes Safari mobile white padding
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
                fontFamily:
                  '"Space Grotesk", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
              Get In Touch
            </h2>
            <p
              style={{
                color: '#e2e8f0',
                fontSize: '1.2rem',
                lineHeight: 1.65,
                fontFamily:
                  '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontWeight: '400',
                letterSpacing: '0.01em',
              }}>
              Feel free to reach out through any of the social links on the right sidebar. I'm
              always interested in discussing new opportunities, collaborative projects, or
              innovative technology solutions in autonomous systems and UX design.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="timeline-container"
          style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical line */}
          <div
            className="timeline-line"
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
          {filteredData.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                maxWidth: '600px',
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
                <h3
                  style={{
                    color: '#888',
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    fontFamily: '"Space Grotesk", "SF Pro Display", system-ui, sans-serif',
                    fontWeight: '500',
                  }}>
                  No items in this category yet.
                </h3>
                <p
                  style={{
                    color: '#666',
                    fontSize: '1rem',
                    fontFamily: '"Inter", "SF Pro Text", system-ui, sans-serif',
                  }}>
                  Check back soon for updates in this section.
                </p>
              </div>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <div
                key={index}
                className="timeline-item"
                style={{
                  position: 'relative',
                  paddingLeft: '4rem',
                  marginBottom: '1.5rem',
                }}>
                {/* Timeline Icon */}
                <div
                  className="glass timeline-icon"
                  style={{
                    position: 'absolute',
                    left: '1.5rem',
                    top: '1rem',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
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
                        fontFamily:
                          '"JetBrains Mono", "SF Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
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
                        fontFamily:
                          '"JetBrains Mono", "SF Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
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
                      fontFamily:
                        '"Space Grotesk", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontWeight: '600',
                      color: 'white',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.25,
                      textRendering: 'optimizeLegibility',
                    }}>
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  {item.subtitle && (
                    <div
                      style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                        marginBottom: '0.5rem',
                        fontFamily:
                          '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                        fontWeight: '500',
                        color: '#cbd5e1',
                        letterSpacing: '0.01em',
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
                      lineHeight: 1.65,
                      color: '#e2e8f0',
                      fontFamily:
                        '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontSize: 'clamp(0.95rem, 2.2vw, 1.05rem)',
                      fontWeight: '400',
                      letterSpacing: '0.01em',
                      marginTop: '1rem',
                      textRendering: 'optimizeLegibility',
                    }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
});

InteractiveTimeline.displayName = 'InteractiveTimeline';

InteractiveTimeline.propTypes = {
  activeFilter: PropTypes.string,
};

export default InteractiveTimeline;
