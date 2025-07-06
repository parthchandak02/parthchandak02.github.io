"use client";

import React, { useState, useEffect } from 'react';
import { BackgroundProvider } from '../components/BackgroundProvider';
import { PortfolioTimeline } from '../components/PortfolioTimeline';
import { LeftNavigation } from '../components/LeftNavigation';
import { RightSocialBar } from '../components/RightSocialBar';
import { 
  ContentItem,
  NavigationItem,
  SocialMediaItem,
  AboutData
} from '../lib/contentLoader';
import TypewriterText from '../components/TypewriterText';
import LiquidGlass, { LiquidGlassPresets } from '../components/LiquidGlass';

// Static data - this will be populated at build time
const STATIC_CONTENT_ITEMS: ContentItem[] = [
  // This will be populated with actual content during build
  // For now, we'll use placeholder data that will be replaced
];

const STATIC_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'about',
    label: 'About',
    icon: 'UserIcon',
    section: 'about',
    folder: '00_about',
    color: '#E53E3E'
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: 'BriefcaseIcon',
    section: 'experience',
    folder: '01_experience',
    color: '#E53E3E'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'RocketLaunchIcon',
    section: 'projects',
    folder: '02_projects',
    color: '#E53E3E'
  },
  {
    id: 'research',
    label: 'Research',
    icon: 'BeakerIcon',
    section: 'research',
    folder: '03_research',
    color: '#E53E3E'
  },
  {
    id: 'awards',
    label: 'Awards',
    icon: 'TrophyIcon',
    section: 'awards',
    folder: '04_awards',
    color: '#E53E3E'
  },
  {
    id: 'community',
    label: 'Community',
    icon: 'UsersIcon',
    section: 'community',
    folder: '05_community',
    color: '#E53E3E'
  },
  {
    id: 'media',
    label: 'Media',
    icon: 'FilmIcon',
    section: 'media',
    folder: '06_media',
    color: '#E53E3E'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'EnvelopeIcon',
    section: 'contact',
    folder: '07_contact',
    color: '#E53E3E'
  }
];

const STATIC_SOCIAL_MEDIA_ITEMS: SocialMediaItem[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/username',
    color: '#0077B5'
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: 'github',
    url: 'https://github.com/username',
    color: '#333'
  },
  {
    id: 'email',
    label: 'Email',
    icon: 'EnvelopeIcon',
    url: 'mailto:your.email@example.com',
    color: '#EF4444'
  },
  {
    id: 'calendar',
    label: 'Schedule Call',
    icon: 'CalendarDaysIcon',
    url: 'https://calendly.com/username',
    color: '#06B6D4'
  }
];

const STATIC_ABOUT_DATA: AboutData = {
  title: 'About',
  currentPosition: 'Engineer & Researcher',
  location: 'Location',
  description: 'I am an innovative engineer and researcher passionate about developing cutting-edge solutions.',
  tags: {
    technical: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js'],
    project_management: ['Agile', 'Scrum', 'Project Leadership'],
    research: ['Machine Learning', 'AI', 'Data Science'],
    experience: ['Full Stack Development', 'System Design'],
    community: ['Open Source', 'Mentoring', 'Community Building'],
    awards: ['Innovation Award', 'Best Project Award']
  },
  languages: ['English', 'Spanish', 'French'],
  education: ['Bachelor of Science in Computer Science'],
  strengths: ['Problem Solving', 'Team Leadership', 'Innovation'],
  content: 'Detailed about content would go here...'
};

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState('about');
  const [filteredType, setFilteredType] = useState<string>('all');
  const [allContentItems, setAllContentItems] = useState<ContentItem[]>(STATIC_CONTENT_ITEMS);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(STATIC_NAVIGATION_ITEMS);
  const [socialMediaItems, setSocialMediaItems] = useState<SocialMediaItem[]>(STATIC_SOCIAL_MEDIA_ITEMS);
  const [aboutData, setAboutData] = useState<AboutData | null>(STATIC_ABOUT_DATA);
  const [loading, setLoading] = useState(false);

  // Load dynamic content if available (for development mode)
  useEffect(() => {
    const loadDynamicData = async () => {
      try {
        // Try to fetch from API routes if available (development mode)
        const responses = await Promise.allSettled([
          fetch('/api/content'),
          fetch('/api/navigation'),
          fetch('/api/social'),
          fetch('/api/about')
        ]);

        const [contentResponse, navResponse, socialResponse, aboutResponse] = responses;

        if (contentResponse.status === 'fulfilled' && contentResponse.value.ok) {
          const contentData = await contentResponse.value.json();
          if (contentData.items) {
            setAllContentItems(contentData.items);
          }
        }

        if (navResponse.status === 'fulfilled' && navResponse.value.ok) {
          const navData = await navResponse.value.json();
          if (navData.items) {
            setNavigationItems(navData.items);
          }
        }

        if (socialResponse.status === 'fulfilled' && socialResponse.value.ok) {
          const socialData = await socialResponse.value.json();
          if (socialData.items) {
            setSocialMediaItems(socialData.items);
          }
        }

        if (aboutResponse.status === 'fulfilled' && aboutResponse.value.ok) {
          const aboutData = await aboutResponse.value.json();
          setAboutData(aboutData);
        }
      } catch (error) {
        console.log('API routes not available, using static data');
      }
    };

    loadDynamicData();
  }, []);

  // Filter content items based on current filter
  const getFilteredItems = () => {
    if (filteredType === 'all') {
      return allContentItems;
    }
    return allContentItems.filter(item => item.type === filteredType);
  };

  // Get unique types for filtering
  const getUniqueTypes = () => {
    const types = allContentItems.map(item => item.type);
    return [...new Set(types)];
  };

  // Intersection Observer for section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -100px 0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Left Navigation */}
      <LeftNavigation
        items={navigationItems}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      {/* Right Social Bar */}
      <RightSocialBar items={socialMediaItems} />

      {/* Main Content */}
      <main className="min-h-screen">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 lg:ml-64 lg:mr-32">
          {/* Hero Section */}
          <section id="about" className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto">
              <LiquidGlass 
                {...LiquidGlassPresets.primary}
                className="p-8 md:p-12 rounded-3xl mb-8"
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl text-white/80 mb-4">
                    Hi, my name is
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                    Parth Chandak
                  </h1>
                  <div className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                    I am a{' '}
                    <TypewriterText
                      roles={[
                        'Engineer',
                        'Researcher',
                        'Creative Technologist',
                        'Team Leader',
                        'Innovator',
                        'Problem Solver'
                      ]}
                      className="text-white font-medium"
                    />
                  </div>
                </div>
                
                {/* Dynamic Tags with Glass Morphism */}
                <div className="mb-12">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {aboutData?.tags && Object.entries(aboutData.tags).map(([category, items]) => (
                      <div key={category} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <h3 className="text-sm font-medium text-white/90 mb-2 capitalize">
                          {category.replace('_', ' ')}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {items.slice(0, 3).map((item, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-white/10 text-white/80 rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                          {items.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-white/10 text-white/80 rounded-full">
                              +{items.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About Content */}
                <div className="text-white/80 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
                  <p className="mb-4">
                    {aboutData?.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h3 className="text-white font-medium mb-2">Current Position</h3>
                      <p className="text-white/70">{aboutData?.currentPosition}</p>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-2">Location</h3>
                      <p className="text-white/70">{aboutData?.location}</p>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-2">Languages</h3>
                      <p className="text-white/70">{aboutData?.languages.join(', ')}</p>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-2">Education</h3>
                      <p className="text-white/70">{aboutData?.education.join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleSectionClick('timeline')}
                    className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    View My Work
                  </button>
                  <button 
                    onClick={() => handleSectionClick('contact')}
                    className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    Get In Touch
                  </button>
                </div>
              </LiquidGlass>
            </div>
          </section>

          {/* Timeline Section */}
          <section id="timeline" className="py-20">
            <div className="max-w-6xl mx-auto">
              <PortfolioTimeline 
                items={getFilteredItems()}
              />
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <div className="max-w-4xl mx-auto text-center">
              <LiquidGlass 
                {...LiquidGlassPresets.primary}
                className="p-8 md:p-12 rounded-3xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Let&apos;s Work Together
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  I&apos;m always interested in new opportunities and collaborations. 
                  Whether you have a project in mind or just want to connect, 
                  I&apos;d love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => window.open('mailto:your.email@example.com')}
                    className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    Send Email
                  </button>
                  <button 
                    onClick={() => window.open('https://calendly.com/username')}
                    className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    Schedule Call
                  </button>
                </div>
              </LiquidGlass>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <BackgroundProvider>
      <PortfolioContent />
    </BackgroundProvider>
  );
}
