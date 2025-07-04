import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

  // Pass the active section to children for filtering
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeFilter: activeSection });
    }
    return child;
  });

  const [headerText, setHeaderText] = useState('');
  const [roleTypewriterText, setRoleTypewriterText] = useState('');
  const [skillTextStates, setSkillTextStates] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [nameVisible, setNameVisible] = useState(false);
  const [isTypingRole, setIsTypingRole] = useState(false);

  const roles = [
    'an engineer',
    'an inventor',
    'a team leader',
    'a creative technologist',
    'a researcher',
  ];

  const staticText =
    'I specialize in cutting-edge human-computer interaction. I bridge hardware and software to create innovative user experiences.';
  const headerGreeting = 'Hi, my name is';

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

    // Stage 1: Type header text (defined after startRoleAnimation)
    const startHeaderAnimation = () => {
      let headerIndex = 0;
      const headerTimer = setInterval(() => {
        if (headerIndex < headerGreeting.length) {
          setHeaderText(headerGreeting.slice(0, headerIndex + 1));
          headerIndex++;
        } else {
          clearInterval(headerTimer);
          // Stage 2: Show name after header is complete + delay
          setTimeout(() => {
            setNameVisible(true);
            // Stage 3: Start role animation after name settles
            setTimeout(() => {
              startRoleAnimation();
            }, 1200); // Wait for name animation to fully complete
          }, 500); // Pause after header
        }
      }, 100); // Slightly slower for readability

      cleanup.push(() => clearInterval(headerTimer));
    };

    startHeaderAnimation();

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
        initialStates[skillKey] = false; // Start with icon only

        // Create random timer for each skill (5 to 15 seconds - faster and more engaging)
        const randomInterval = Math.random() * 10000 + 5000;
        const randomDelay = Math.random() * 10000; // Random initial delay up to 10 seconds

        const timeout = setTimeout(() => {
          const intervalTimer = setInterval(() => {
            setSkillTextStates(prev => ({
              ...prev,
              [skillKey]: !prev[skillKey],
            }));
          }, randomInterval);

          intervals.push(intervalTimer);
        }, randomDelay);

        timeouts.push(timeout);
      });
    });

    setSkillTextStates(initialStates);

    return () => {
      timeouts.forEach(timer => clearTimeout(timer));
      intervals.forEach(timer => clearInterval(timer));
    };
  }, []);

  const navigationItems = [
    { id: 'about', label: 'ABOUT', number: '00' },
    { id: 'Experience', label: 'EXPERIENCE', number: '01' },
    { id: 'Projects', label: 'PROJECTS', number: '02' },
    { id: 'Research', label: 'RESEARCH', number: '03' },
    { id: 'Awards', label: 'AWARDS', number: '04' },
    { id: 'Community Service', label: 'COMMUNITY', number: '05' },
    { id: 'Media & Press', label: 'MEDIA', number: '06' },
    { id: 'contact', label: 'CONTACT', number: '07' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/parthchandak',
      icon: (
        <svg
          style={{ width: 'clamp(10px, 3vw, 14px)', height: 'clamp(10px, 3vw, 14px)' }}
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      url: 'https://github.com/parthchandak',
      icon: (
        <svg
          style={{ width: 'clamp(10px, 3vw, 14px)', height: 'clamp(10px, 3vw, 14px)' }}
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'Calendar',
      url: 'https://calendly.com/parthchandak',
      icon: (
        <svg
          style={{ width: 'clamp(10px, 3vw, 14px)', height: 'clamp(10px, 3vw, 14px)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:parthchandak02@gmail.com',
      icon: (
        <svg
          style={{ width: 'clamp(10px, 3vw, 14px)', height: 'clamp(10px, 3vw, 14px)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)',
        color: 'white',
        minHeight: '100vh',
        fontFamily:
          '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        display: 'flex',
      }}>
      {/* Left Sidebar - Floating Glass */}
      <div
        className="glass left-sidebar"
        style={{
          position: 'fixed',
          left: 'clamp(0.5rem, 2vw, 2rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(80px, 20vw, 200px)',
          height: 'clamp(420px, 50vh, 500px)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: 'clamp(16px, 3vw, 24px)',
          zIndex: 1000,
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(0.75rem, 1.5vw, 1rem)',
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.03)
          `,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.02)';
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
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.03)
          `;
        }}>
        <nav style={{ marginTop: '0.5rem' }}>
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '0.75rem 0',
                background: 'none',
                border: 'none',
                color: activeSection === item.id ? '#ff6b6b' : '#888',
                fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                fontWeight: '500',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace',
                letterSpacing: '0.05em',
                borderRadius: '8px',
              }}
              onMouseEnter={e => {
                if (activeSection !== item.id) {
                  e.target.style.color = '#bbb';
                  e.target.style.background = 'rgba(255, 255, 255, 0.02)';
                }
              }}
              onMouseLeave={e => {
                if (activeSection !== item.id) {
                  e.target.style.color = '#888';
                  e.target.style.background = 'none';
                }
              }}>
              <span
                style={{
                  color: '#ff6b6b',
                  marginRight: '0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  minWidth: '20px',
                }}>
                {item.number}
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="main-content"
        style={{
          marginLeft: 'clamp(96px, 24vw, 240px)',
          marginRight: 'clamp(82px, 10vw, 128px)',
          flex: 1,
          padding: '0 clamp(1rem, 3vw, 2rem)',
        }}>
        {/* Hero Section */}
        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'left',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
          <div style={{ width: '100%' }}>
            <p
              style={{
                color: '#ff6b6b',
                fontSize: '1rem',
                marginBottom: '1rem',
                fontFamily: '"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace',
                minHeight: '1.5rem',
              }}>
              {headerText}
              <span
                style={{
                  opacity: headerText.length === headerGreeting.length ? 0 : 1,
                  animation: 'blink 1s infinite',
                  color: '#ff6b6b',
                }}>
                _
              </span>
            </p>

            <h1
              style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontFamily: '"Space Grotesk", "SF Pro Display", system-ui, sans-serif',
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
                fontFamily: '"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace',
                color: '#ff6b6b',
                opacity: nameVisible ? 1 : 0,
                transform: nameVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                minHeight: '2rem',
              }}>
              I am {roleTypewriterText}
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
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                lineHeight: 1.6,
                color: '#cccccc',
                marginBottom: '3rem',
                opacity: nameVisible ? 1 : 0,
                transform: nameVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
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

                          // Different colors for automatic vs hover expansion
                          const getSkillColors = () => {
                            if (showThisSkillText && !isCategoryHovered) {
                              // Automatic expansion - light red
                              return {
                                background: 'rgba(255, 107, 107, 0.08)',
                                border: '1px solid rgba(255, 107, 107, 0.2)',
                                color: '#ff9999', // Light red
                              };
                            }
                            // Default state
                            return {
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              color: '#cccccc',
                            };
                          };

                          const currentColors = getSkillColors();

                          return (
                            <div
                              key={skill.name}
                              className="glass"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '0.5rem',
                                paddingRight: isExpanded ? '1rem' : '0.5rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                background: currentColors.background,
                                border: currentColors.border,
                                color: currentColors.color,
                                fontFamily:
                                  '"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace',
                                animation: `fadeInUp 0.6s ease ${totalIndex * 0.1}s both`,
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                minWidth: '40px',
                                maxWidth: isExpanded ? '200px' : '40px',
                                width: isExpanded ? 'auto' : '40px',
                              }}
                              onMouseEnter={e => {
                                // Hover state - strong red color (always the same)
                                e.currentTarget.style.background = 'rgba(255, 107, 107, 0.15)';
                                e.currentTarget.style.border = '1px solid rgba(255, 107, 107, 0.4)';
                                e.currentTarget.style.color = '#ff6b6b';
                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                              }}
                              onMouseLeave={e => {
                                // Reset to current state colors (automatic or default)
                                const resetColors = getSkillColors();
                                e.currentTarget.style.background = resetColors.background;
                                e.currentTarget.style.border = resetColors.border;
                                e.currentTarget.style.color = resetColors.color;
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              }}>
                              <IconComponent
                                size={16}
                                style={{
                                  flexShrink: 0,
                                  transition: 'all 0.3s ease',
                                }}
                              />
                              <span
                                style={{
                                  marginLeft: isExpanded ? '0.5rem' : '0',
                                  opacity: isExpanded ? 1 : 0,
                                  maxWidth: isExpanded ? '150px' : '0',
                                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                }}>
                                {skill.name}
                              </span>
                            </div>
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

        {/* Timeline Content */}
        <div style={{ paddingTop: '4rem' }}>{childrenWithProps}</div>
      </div>

      {/* Right Sidebar - Floating Glass */}
      <div
        className="glass right-sidebar"
        style={{
          position: 'fixed',
          right: 'clamp(0.5rem, 2vw, 2rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(66px, 8vw, 88px)',
          height: 'clamp(420px, 50vh, 500px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.75rem',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(11px, 1.5vw, 22px)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: 'clamp(16px, 3vw, 24px)',
          zIndex: 1000,
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.03)
          `,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.02)';
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
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.03)
          `;
        }}>
        {socialLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              color: '#888',
              background: 'none',
              border: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              padding: '0',
              margin: '0 auto',
              marginBottom: index < socialLinks.length - 1 ? '0.75rem' : '0',
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

        @media (max-width: 768px) {
          .left-sidebar {
            width: 80px !important;
            left: 1rem !important;
            padding: 1.5rem 0.75rem !important;
            height: 420px !important;
          }

          .nav-label {
            display: none;
          }

          .left-sidebar nav button {
            justify-content: center !important;
            padding: 0.6rem 0 !important;
          }

          .left-sidebar nav button span:first-child {
            margin-right: 0 !important;
            min-width: auto !important;
          }

          .main-content {
            margin-left: 96px !important;
            margin-right: 82px !important;
            padding: 0 1rem !important;
          }

          .right-sidebar {
            right: 1rem !important;
            padding: 1.5rem 11px !important;
            width: 66px !important;
            height: 420px !important;
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
