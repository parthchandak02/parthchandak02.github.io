import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const StyledProject = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 0;
  overflow: hidden;
  transition: var(--transition);
  height: fit-content;

  &:hover {
    transform: translateY(-3px);
  }

  .project-image {
    position: relative;
    width: 100%;
    height: 120px;
    overflow: hidden;

    a {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;

      &:hover,
      &:focus {
        outline: 0;

        &:before {
          background: transparent;
        }

        .img {
          filter: none;
          transform: scale(1.05);
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        transition: var(--transition);
        background-color: rgba(100, 100, 100, 0.6);
        mix-blend-mode: multiply;
      }
    }

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
      filter: grayscale(100%) contrast(1.2) brightness(80%);
    }
  }

  .project-content {
    padding: 20px;

    .project-overline {
      margin: 0 0 6px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      font-weight: 400;
    }

    .project-title {
      margin: 0 0 10px;
      color: var(--lightest-slate);
      font-size: var(--fz-lg);
      line-height: 1.2;
      font-weight: 600;

      a {
        color: inherit;
        text-decoration: none;

        &:hover,
        &:focus {
          color: var(--green);
        }
      }
    }

    .project-description {
      color: var(--light-slate);
      font-size: var(--fz-sm);
      line-height: 1.5;
      margin: 0 0 12px;

      p {
        margin: 0;
      }
    }

    .project-tech-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 0 15px;
      padding: 0;
      list-style: none;

      li {
        margin: 0 8px 6px 0;
        color: var(--light-slate);
        font-family: var(--font-mono);
        font-size: var(--fz-xxs);
        background-color: var(--navy);
        padding: 3px 8px;
        border-radius: 3px;
        white-space: nowrap;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      color: var(--lightest-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 6px;
        margin-right: 8px;
        color: var(--light-slate);
        
        &:hover,
        &:focus {
          color: var(--green);
        }

        &.external {
          svg {
            width: 18px;
            height: 18px;
          }
        }

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
`;

const Featured = () => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Parth's complete project portfolio from PDF
  const featuredProjects = [
    {
      title: "Damping Ratios of Piloted Systems",
      description: "Boeing project with mentor Arun Nadkarni. Computed damping ratios of low frequency vibration modes to reduce test flight time in Boeing Aircraft. Led DROPS team of 6 multidisciplinary students.",
      tech: ["MATLAB", "Data Analysis", "Aerospace", "Leadership"],
      github: null,
      external: null,
      image: "DAMPING RATIOS OF PILOTED SYSTEMS.png"
    },
    {
      title: "Crimson Code 2018: Caffeine Cycle",
      description: "Centicede: A sunlight-following robot that won 1st Place (Tier 1) at Crimson Code 2018, a software hackathon at Washington State University. Built autonomous navigation and solar tracking.",
      tech: ["Robotics", "Autonomous Systems", "Programming"],
      github: null,
      external: "https://www.youtube.com/watch?v=QSV7GRafcYE&ab_channel=RachelP",
      image: "CRIMSON CODE 2018 CAFFEINE CYCLE.png"
    },
    {
      title: "Engineering Gear System for Parallax Bot",
      description: "Designed, prototyped, and manufactured a gear system for the Parallax Boe Bot to increase speed 2-6x while maintaining frame integrity. Advanced prototype manufacturing and 3D printing.",
      tech: ["3D Printing", "CAD Design", "Manufacturing"],
      github: null,
      external: "https://docs.google.com/document/d/1EV7OALfNL1JoVg1x6hnVh28AcxEjxbVkfXnpLqAkdVQ/pub",
      image: "ENGINEERING GEAR SYSTEM FOR PARALLAX BOT.png"
    },
    {
      title: "Green Fridge",
      description: "Developed a business plan and Android prototype for a sustainable refrigerator and food tracking app at the Harold Frank Engineering Entrepreneurship Institute.",
      tech: ["Android Studio", "Business Dev", "IoT"],
      github: null,
      external: "https://docs.google.com/presentation/d/1_bLkQq9QoceaMoF5b4PTraLD6JmlnD3ex1X2e7vEXUw/pub?start=false&loop=false&delayms=3000&slide=id.g1d15c29612_5_20",
      image: "GREEN FRIDGE.png"
    },
    {
      title: "Audio Analyzing Software",
      description: "Engineered software in Python and MATLAB to analyze audio using Fast Fourier Transforms (FFTs), allowing users to change audio tone and intensity. Crimson Code hackathon project.",
      tech: ["Python", "MATLAB", "Signal Processing", "FFT"],
      github: null,
      external: "https://docs.google.com/presentation/d/1DF_WBMH9vTNgpCi_YjArHipnJaSVwVQM5bEoK1Rlr_g/pub?start=false&loop=false&delayms=3000&slide=id.p",
      image: "AUDIO ANALYZING SOFTWARE.png"
    },
    {
      title: "Cleanroom Workbench Design",
      description: "Class 1000 cleanroom workbench design with client-specified modules. Used LEAN manufacturing techniques to personalize each workbench and minimize waste.",
      tech: ["LEAN Manufacturing", "Systems Design", "Process Optimization"],
      github: null,
      external: "https://hub.wsu.edu/sdex/clean-workbench/me-415-spring-2017-cougar-lean-clean-bench/",
      image: "CLEANROOM WORKBENCH DESIGN AND ASSEMBLY.png"
    },
    {
      title: "Research: A Take on Safety",
      description: "Experience in SolidWorks: Design, manufacturing and testing a system for ACRT Furnaces. Designed, prototyped and manufactured safety systems with focus on reliability.",
      tech: ["SolidWorks", "Safety Engineering", "Manufacturing"],
      github: null,
      external: "https://5060fe2a-21f6-4168-87bc-844e8420aca6.filesusr.com/ugd/b4fe76_249474a18d564d5f905b29c900d73a51.pdf",
      image: "RESEARCH A TAKE ON SAFETY.png"
    },
    {
      title: "Microprocessor Programming",
      description: "Worked with Abhishek Ganarappu & Shrunga Malavalli on mobile app development platform for Dr. Arda Gozen's research team at WSU. Testing on mbed LPC 1768 for complex signals.",
      tech: ["Embedded Systems", "Mobile Dev", "Signal Processing"],
      github: null,
      external: null,
      image: "MICROPROCESSOR PROGRAMMING FOR TRANSMISSION OF COMPLEX SIGNALS.png"
    },
    {
      title: "Swordmaking: Katanas",
      description: "Experience in modern applications of material science. An analysis of historically prominent swordmaking materials and what modern materials would be best to create a katana.",
      tech: ["Material Science", "Metallurgy", "Research"],
      github: null,
      external: "https://docs.google.com/presentation/d/1vAqGh0TWLQM2GiXjxPQJJrxcDxniXsF-FqUPePml7S8/pub?start=false&loop=false&delayms=3000&slide=id.p",
      image: "SWORDMAKING KATANAS.png"
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Featured Projects
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map((project, i) => {
            const { external, title, tech, github, description, image } = project;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                {image && (
                  <div className="project-image">
                    <a href={external || github || '#'} aria-label={title}>
                      <img
                        className="img"
                        src={require(`@images/projects/${image}`).default}
                        alt={title}
                      />
                    </a>
                  </div>
                )}

                <div className="project-content">
                  <p className="project-overline">Featured Project</p>

                  <h3 className="project-title">
                    <a href={external || github || '#'}>{title}</a>
                  </h3>

                  <div className="project-description">
                    <p>{description}</p>
                  </div>

                  {tech && tech.length && (
                    <ul className="project-tech-list">
                      {tech.map((techItem, i) => (
                        <li key={i}>{techItem}</li>
                      ))}
                    </ul>
                  )}

                  <div className="project-links">
                    {github && (
                      <a href={github} aria-label="GitHub Link">
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {external && (
                      <a href={external} aria-label="External Link" className="external">
                        <Icon name="External" />
                      </a>
                    )}
                  </div>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
