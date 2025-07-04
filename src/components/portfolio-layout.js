import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Tag from './tag';
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiCplusplus,
  SiUnity,
  SiLinux,
  SiFigma,
  SiBlender,
  SiJira,
  SiArduino,
  SiRaspberrypi,
} from 'react-icons/si';
import { FaCode, FaCog, FaProjectDiagram, FaPalette, FaLightbulb, FaCube } from 'react-icons/fa';
import { GiGears } from 'react-icons/gi';
import { MdPrecisionManufacturing } from 'react-icons/md';

const PortfolioLayout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile/tablet and initialize scroll bounce protection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Reset navigation button styles when active section changes
  useEffect(() => {
    // Reset all navigation buttons to default state
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
      const itemId = button.getAttribute('data-item-id');
      if (itemId === activeSection) {
        button.style.color = '#ff6b6b';
      } else {
        button.style.color = '#888';
        button.style.background = 'none';
      }
    });
  }, [activeSection]);

  // Scroll to section instead of just filtering
  const scrollToSection = sectionId => {
    setActiveSection(sectionId);

    if (sectionId === 'about') {
      // Scroll to top for about section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'contact') {
      // Scroll to bottom for contact
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      // Scroll to timeline and filter by category
      const timelineElement = document.getElementById('timeline-section');
      if (timelineElement) {
        timelineElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Pass the active section to children for filtering - memoized to prevent unnecessary re-renders
  const childrenWithProps = useMemo(
    () =>
      React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeFilter: activeSection });
        }
        return child;
      }),
    [children, activeSection],
  );

  const [roleTypewriterText, setRoleTypewriterText] = useState('');
  const [skillTextStates, setSkillTextStates] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [skillHoverStates, setSkillHoverStates] = useState({});
  const [nameVisible, setNameVisible] = useState(false);
  const [isTypingRole, setIsTypingRole] = useState(false);

  const roles = [
    'Engineer',
    'Inventor',
    'Team leader',
    'Creative technologist',
    'Researcher',
    'Prototyper',
    'Entrepreneur',
    'Designer',
    'Maker',
    'Developer',
  ];

  const staticText =
    'I specialize in cutting-edge human-computer interaction. I bridge hardware and software to create innovative user experiences.';

  const skillCategories = [
    {
      title: 'Software Tools & Skills',
      categoryIcon: FaCode,
      skills: [
        { name: 'Python', icon: SiPython },
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'React', icon: SiReact },
        { name: 'C++', icon: SiCplusplus },
        { name: 'Unity', icon: SiUnity },
        { name: 'Linux', icon: SiLinux },
      ],
    },
    {
      title: 'Engineering Tools & Skills',
      categoryIcon: GiGears,
      skills: [
        { name: 'Arduino', icon: SiArduino },
        { name: 'Raspberry Pi', icon: SiRaspberrypi },
        { name: '3D Modeling', icon: FaCube },
        { name: 'Manufacturing', icon: MdPrecisionManufacturing },
      ],
    },
    {
      title: 'Project Management',
      categoryIcon: FaProjectDiagram,
      skills: [
        { name: 'Jira', icon: SiJira },
        { name: 'Agile', icon: FaCog },
      ],
    },
    {
      title: 'Creativity Tools',
      categoryIcon: FaPalette,
      skills: [
        { name: 'Figma', icon: SiFigma },
        { name: 'Blender', icon: SiBlender },
      ],
    },
    {
      title: 'Entrepreneurial Skills',
      categoryIcon: FaLightbulb,
      skills: [
        { name: 'Innovation', icon: FaLightbulb },
        { name: 'Leadership', icon: FaCog },
      ],
    },
  ];

  // Sequential animation effect - one at a time, no overlap
  useEffect(() => {
    const cleanup = [];

    // Stage 3: Role typewriter animation (defined before use)
    const startRoleAnimation = () => {
      const roleTimeouts = [];
      const roleIntervals = [];

      const animateRole = roleIndex => {
        const currentRole = roles[roleIndex];
        // Role animation in progress
        setIsTypingRole(true);
        let charIndex = 0;

        // Type the role
        const typeTimer = setInterval(() => {
          if (charIndex <= currentRole.length) {
            setRoleTypewriterText(currentRole.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeTimer);
            setIsTypingRole(false);

            // Hold complete text for 3 seconds
            const holdTimeout = setTimeout(() => {
              setIsTypingRole(true);
              // Erase the text
              let eraseIndex = currentRole.length;
              const eraseTimer = setInterval(() => {
                if (eraseIndex > 0) {
                  setRoleTypewriterText(currentRole.slice(0, eraseIndex - 1));
                  eraseIndex--;
                } else {
                  clearInterval(eraseTimer);
                  setIsTypingRole(false);

                  // Move to next role after pause
                  const nextTimeout = setTimeout(() => {
                    const nextIndex = (roleIndex + 1) % roles.length;
                    animateRole(nextIndex);
                  }, 800); // Longer pause between roles

                  roleTimeouts.push(nextTimeout);
                }
              }, 50); // Faster erase
              roleIntervals.push(eraseTimer);
            }, 3000); // Hold for 3 seconds
            roleTimeouts.push(holdTimeout);
          }
        }, 150); // Slower, more readable typing
        roleIntervals.push(typeTimer);
      };

      animateRole(0); // Start with first role

      cleanup.push(() => {
        roleTimeouts.forEach(timeout => clearTimeout(timeout));
        roleIntervals.forEach(interval => clearInterval(interval));
      });
    };

    // Skip header animation and go straight to name and role
    setNameVisible(true);
    setTimeout(() => {
      startRoleAnimation();
    }, 800); // Start role animation after name appears

    return () => {
      cleanup.forEach(cleanupFn => cleanupFn());
    };
  }, []);

  // Initialize skill states and create individual random timers for each skill
  useEffect(() => {
    // Create initial state for all skills (start with icon only)
    const initialStates = {};
    const timeouts = [];
    const intervals = [];

    skillCategories.forEach((category, categoryIndex) => {
      category.skills.forEach((skill, skillIndex) => {
        const skillKey = `${categoryIndex}-${skillIndex}`;
        initialStates[skillKey] = false;

        // Create individual timer for each skill with random delays
        const randomInitialDelay = Math.random() * 20000; // 0-20 seconds initial delay
        const randomInterval = 30000 + Math.random() * 30000; // 30-60 seconds interval

        const initialTimeout = setTimeout(() => {
          // Start the repeating animation for this skill
          const skillInterval = setInterval(() => {
            setSkillTextStates(prev => ({
              ...prev,
              [skillKey]: true,
            }));

            // Hide after 3 seconds
            setTimeout(() => {
              setSkillTextStates(prev => ({
                ...prev,
                [skillKey]: false,
              }));
            }, 3000);
          }, randomInterval);

          intervals.push(skillInterval);
        }, randomInitialDelay);

        timeouts.push(initialTimeout);
      });
    });

    setSkillTextStates(initialStates);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  const navigationItems = [
    { number: '00', label: 'ABOUT', id: 'about' },
    { number: '01', label: 'EXPERIENCE', id: 'experience' },
    { number: '02', label: 'RESEARCH', id: 'research' },
    { number: '03', label: 'PROJECTS', id: 'projects' },
    { number: '04', label: 'MEDIA', id: 'media' },
    { number: '05', label: 'COMMUNITY', id: 'community' },
    { number: '06', label: 'AWARDS', id: 'awards' },
    { number: '07', label: 'CONTACT', id: 'contact' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/parth-chandak',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      url: 'https://github.com/parth-chandak',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'Calendar',
      url: 'https://calendly.com/parth-chandak',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:parth.chandak@example.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ];

  // Common glass styles for sidebars
  const getGlassStyles = (isMobileBar = false) => ({
    background: isMobileBar ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
    border: isMobileBar
      ? '1px solid rgba(255, 255, 255, 0.12)'
      : '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: isMobileBar ? '20px' : 'clamp(16px, 3vw, 24px)',
    zIndex: 1000,
    boxShadow: isMobileBar
      ? `
       0 25px 50px rgba(0, 0, 0, 0.5),
       0 12px 40px rgba(255, 255, 255, 0.08),
       inset 0 1px 0 rgba(255, 255, 255, 0.15),
       inset 0 -1px 0 rgba(255, 255, 255, 0.05)
     `
      : `
       0 20px 40px rgba(0, 0, 0, 0.4),
       0 8px 32px rgba(255, 255, 255, 0.05),
       inset 0 1px 0 rgba(255, 255, 255, 0.1),
       inset 0 -1px 0 rgba(255, 255, 255, 0.03)
     `,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  });

  return (
    <div className="main-container" style={{ position: 'relative', minHeight: '100dvh' }}>
      {/* Left Navigation - Responsive */}
      <div
        className="left-sidebar"
        style={{
          position: 'fixed',
          zIndex: 1000,
          ...(isMobile
            ? {
              // Mobile: Top horizontal bar - proper centering with equal margins
              top: '1rem',
              left: '1rem',
              right: '1rem',
              width: 'auto', // Let it size naturally
              height: 'auto',
              padding: '1rem',
              minHeight: '100px', // Ensure enough height for 2 rows
            }
            : {
              // Desktop: Left vertical bar - proper centering
              top: '2rem',
              left: '2rem',
              bottom: '2rem',
              width: 'clamp(120px, 15vw, 180px)',
              height: 'auto',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }),
          ...getGlassStyles(isMobile),
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = `
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 12px 40px rgba(255, 107, 107, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05)
          `;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.03)
          `;
        }}>
        <nav style={{ width: '100%', height: '100%' }}>
          <div
            style={{
              display: 'grid',
              ...(isMobile
                ? {
                  // Mobile: 4 columns, 2 rows to fit all 8 items
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  alignItems: 'center',
                  justifyItems: 'center',
                  width: '100%',
                  height: '100%',
                }
                : {
                  // Desktop: Single column vertical layout
                  gridTemplateColumns: '1fr',
                  gridTemplateRows: 'repeat(8, 1fr)',
                  gap: '0.5rem',
                  alignItems: 'center',
                  justifyItems: 'stretch',
                  width: '100%',
                  height: '100%',
                }),
            }}>
            {navigationItems.map(item => (
              <button
                key={item.id}
                className="nav-button"
                data-item-id={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  width: '100%',
                  height: '100%',
                  padding: isMobile ? '0.5rem 0.25rem' : '0.75rem 0',
                  margin: '0',
                  background: 'none',
                  border: 'none',
                  color: activeSection === item.id ? '#ff6b6b' : '#888',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.55rem' : 'clamp(0.7rem, 1.8vw, 0.85rem)',
                  fontWeight: '600',
                  fontFamily:
                    '"JetBrains Mono", "SF Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
                  transition: 'all 0.3s ease',
                  borderRadius: '8px',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '0.1rem' : '0.5rem',
                }}
                onMouseEnter={e => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = '#bbb';
                    if (isMobile) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }
                }}
                onMouseLeave={e => {
                  // Always reset to the correct state based on active section
                  if (activeSection === item.id) {
                    e.currentTarget.style.color = '#ff6b6b';
                  } else {
                    e.currentTarget.style.color = '#888';
                  }
                  if (isMobile) {
                    e.currentTarget.style.background = 'none';
                  }
                }}>
                <span
                  style={{
                    color: '#ff6b6b',
                    fontSize: isMobile ? '0.5rem' : '0.75rem',
                    fontWeight: '700',
                    lineHeight: '1',
                  }}>
                  {item.number}
                </span>
                <span
                  className="nav-label"
                  style={{
                    fontSize: isMobile ? '0.45rem' : 'inherit',
                    lineHeight: isMobile ? '1' : 'inherit',
                    fontWeight: isMobile ? '500' : '600',
                  }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="main-content"
        style={{
          ...(isMobile
            ? {
              // Mobile: Account for top and bottom bars with proper spacing
              marginTop: '8rem', // Account for taller grid navigation
              marginBottom: '6rem',
              marginLeft: '1rem',
              marginRight: '1rem',
            }
            : {
              // Desktop: Account for left and right sidebars with generous spacing
              marginLeft: 'clamp(200px, 22vw, 280px)', // Increased from 18vw to 22vw
              marginRight: 'clamp(120px, 12vw, 160px)', // Increased from 8vw to 12vw
              marginTop: '2rem',
              marginBottom: '2rem',
            }),
          flex: 1,
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
        }}>
        {/* Hero Section */}
        <section
          style={{
            minHeight: '100dvh', // Dynamic viewport height - fixes Safari mobile white padding
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'left',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
          <div style={{ width: '100%' }}>
            <h1
              style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontFamily:
                  '"Space Grotesk", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #ff6b6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: nameVisible ? 1 : 0,
                transform: nameVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: nameVisible ? 'nameGlow 3s ease-in-out infinite alternate' : 'none',
              }}>
              Parth Chandak
            </h1>

            {/* Role section right after name */}
            <div
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                marginBottom: '2rem',
                fontFamily:
                  '"JetBrains Mono", "SF Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
                color: '#ff6b6b',
                opacity: nameVisible ? 1 : 0,
                transform: nameVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                minHeight: '2rem',
              }}>
              {roleTypewriterText}
              <span
                style={{
                  opacity: isTypingRole ? 1 : 0,
                  animation: isTypingRole ? 'blink 1s infinite' : 'none',
                  color: '#ff6b6b',
                }}>
                _
              </span>
            </div>

            {/* Description section without typewriter */}
            <div
              style={{
                fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                lineHeight: 1.65,
                color: '#e2e8f0',
                marginBottom: '3rem',
                fontFamily:
                  '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontWeight: '400',
                letterSpacing: '0.01em',
                opacity: nameVisible ? 1 : 0,
                transform: nameVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}>
              {staticText}
            </div>

            <div style={{ marginBottom: '3rem' }}>
              {skillCategories.map((category, categoryIndex) => {
                const CategoryIcon = category.categoryIcon;
                const isCategoryHovered = hoveredCategory === categoryIndex;

                return (
                  <div key={category.title} style={{ marginBottom: '2rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '0.75rem',
                      }}>
                      {/* Category Icon */}
                      <div
                        className="glass"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: isCategoryHovered
                            ? 'rgba(255, 107, 107, 0.15)'
                            : 'rgba(255, 255, 255, 0.05)',
                          border: isCategoryHovered
                            ? '1px solid rgba(255, 107, 107, 0.4)'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          color: isCategoryHovered ? '#ff6b6b' : '#888',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          flexShrink: 0,
                        }}
                        onMouseEnter={() => setHoveredCategory(categoryIndex)}
                        onMouseLeave={() => setHoveredCategory(null)}>
                        <CategoryIcon size={18} />
                      </div>

                      {/* Skills Container */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          flex: 1,
                        }}>
                        {category.skills.map((skill, skillIndex) => {
                          const IconComponent = skill.icon;
                          const totalIndex = categoryIndex * 10 + skillIndex;
                          const skillKey = `${categoryIndex}-${skillIndex}`;
                          const showThisSkillText = skillTextStates[skillKey] ?? false;
                          const isExpanded = isCategoryHovered || showThisSkillText;

                          // Track hover state for this specific skill
                          const isHovered = skillHoverStates[skillKey] || false;
                          const shouldShowText = isExpanded || isHovered;

                          return (
                            <Tag
                              key={skill.name}
                              variant={showThisSkillText && !isCategoryHovered ? 'accent' : 'skill'}
                              size="medium"
                              icon={IconComponent}
                              onHoverExpand={hovered => {
                                setSkillHoverStates(prev => ({
                                  ...prev,
                                  [skillKey]: hovered,
                                }));
                              }}
                              style={{
                                animation: `fadeInUp 0.6s ease ${totalIndex * 0.1}s both`,
                                minWidth: '40px',
                                maxWidth: shouldShowText ? '200px' : '40px',
                                width: shouldShowText ? 'auto' : '40px',
                                overflow: 'hidden',
                                paddingRight: shouldShowText ? '1rem' : '0.5rem',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              }}>
                              <span
                                style={{
                                  marginLeft: '0.5rem',
                                  opacity: shouldShowText ? 1 : 0,
                                  transform: shouldShowText ? 'translateX(0)' : 'translateX(-10px)',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  whiteSpace: 'nowrap',
                                }}>
                                {skill.name}
                              </span>
                            </Tag>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <div id="timeline-section">{childrenWithProps}</div>
      </div>

      {/* Right Social Links - Responsive */}
      <div
        className="right-sidebar"
        style={{
          position: 'fixed',
          zIndex: 1000,
          ...(isMobile
            ? {
              // Mobile: Bottom horizontal bar - proper centering with equal margins
              bottom: '1rem',
              left: '1rem',
              right: '1rem',
              width: 'auto', // Let it size naturally
              height: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
            }
            : {
              // Desktop: Right vertical bar - proper centering
              top: '2rem',
              right: '2rem',
              bottom: '2rem',
              width: 'clamp(60px, 6vw, 80px)',
              height: 'auto',
              padding: '2rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }),
          ...getGlassStyles(isMobile),
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = `
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 12px 40px rgba(255, 107, 107, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05)
          `;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.03)
          `;
        }}>
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              color: '#888',
              background: 'none',
              border: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              padding: '0',
              margin: '0',
            }}
            onMouseEnter={e => {
              e.target.style.color = '#ff6b6b';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.target.style.color = '#888';
              e.target.style.background = 'none';
              e.target.style.transform = 'scale(1)';
            }}
            title={link.name}>
            {link.icon}
          </a>
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        @keyframes nameGlow {
          0% {
            filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.3));
          }
          100% {
            filter: drop-shadow(0 0 20px rgba(255, 107, 107, 0.6));
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes skillTextReveal {
          from {
            opacity: 0;
            transform: translateX(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes skillTextHide {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(-10px) scale(0.95);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          40%,
          43% {
            transform: translateX(-50%) translateY(-10px);
          }
          70% {
            transform: translateX(-50%) translateY(-5px);
          }
          90% {
            transform: translateX(-50%) translateY(-2px);
          }
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .nav-label {
            font-size: 0.5rem !important;
            line-height: 1.1 !important;
          }
        }
        
        /* Extra small screens (iPhone SE, etc.) */
        @media (max-width: 430px) {
          .nav-label {
            font-size: 0.45rem !important;
            line-height: 1 !important;
          }
        }
        
        /* Very narrow screens */
        @media (max-width: 375px) {
          .nav-label {
            font-size: 0.4rem !important;
          }
        }
          
          /* Enhanced glass effect for mobile bars */
          .left-sidebar,
          .right-sidebar {
            backdrop-filter: blur(25px) saturate(200%) !important;
            -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
            box-shadow: 
              0 30px 60px rgba(0, 0, 0, 0.6),
              0 15px 45px rgba(255, 255, 255, 0.1),
              inset 0 2px 0 rgba(255, 255, 255, 0.2),
              inset 0 -2px 0 rgba(255, 255, 255, 0.08) !important;
          }
          
          /* Special styling for top navigation bar */
          .left-sidebar {
            z-index: 1001 !important;
          }
          
          /* Ensure navigation items fit properly */
          .left-sidebar nav > div {
            width: 100% !important;
          }
          
          .left-sidebar nav button {
            min-height: 40px !important;
            flex-direction: column !important;
            gap: 0.1rem !important;
          }
          
          /* Add subtle glow effect for mobile */
          .left-sidebar::before,
          .right-sidebar::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, 
              rgba(255, 107, 107, 0.1) 0%, 
              rgba(255, 255, 255, 0.05) 50%, 
              rgba(255, 107, 107, 0.1) 100%);
            border-radius: 22px;
            z-index: -1;
            opacity: 0.6;
          }
        }

        /* Ensure smooth transitions for all responsive changes */
        .left-sidebar,
        .right-sidebar,
        .main-content {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        /* Additional responsive spacing adjustments */
        @media (min-width: 769px) and (max-width: 1200px) {
          .main-content {
            margin-left: max(200px, 20vw) !important;
            margin-right: max(120px, 10vw) !important;
            padding: 0 2rem !important;
          }
        }

        @media (min-width: 1201px) {
          .main-content {
            margin-left: max(240px, 22vw) !important;
            margin-right: max(140px, 12vw) !important;
            padding: 0 3rem !important;
          }
        }

        /* Ensure timeline content doesn't get too close to sidebars */
        .timeline-container {
          max-width: min(900px, calc(100vw - 400px)) !important;
        }

        /* Mobile-specific timeline fixes */
        @media (max-width: 768px) {
          .main-content {
            /* Override desktop spacing for mobile - give timeline more breathing room */
            marginLeft: 0.5rem !important;
            marginRight: 0.5rem !important;
            padding: 0 0.5rem !important;
          }
          
          .timeline-container {
            /* Full width on mobile with minimal padding */
            max-width: 100% !important;
            padding: 0 0.75rem !important;
            margin: 0 !important;
          }
          
          /* Adjust timeline items for mobile */
          .timeline-item {
            padding-left: 4rem !important;
            margin-bottom: 2rem !important;
          }
          
          /* Timeline cards on mobile - prevent overlap with icons */
          .timeline-item .glass {
            margin-left: 0.5rem !important;
            margin-right: 0 !important;
            padding: 1.25rem !important;
          }
          
          /* Fix vertical line positioning for mobile */
          .timeline-line {
            left: 1.5rem !important;
            transform: translateX(-50%) !important;
          }
          
          /* Fix timeline icon positioning for mobile */
          .timeline-icon {
            left: 1.5rem !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </div>
  );
};

PortfolioLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PortfolioLayout;
