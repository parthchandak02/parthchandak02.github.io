"use client";

import React, { useState, useEffect } from 'react';
import { BackgroundProvider } from '../components/BackgroundProvider';
import { PortfolioTimeline } from '../components/PortfolioTimeline';
import { LeftNavigation } from '../components/LeftNavigation';
import { RightSocialBar } from '../components/RightSocialBar';
import { 
  getAllContentItems, 
  getNavigationItems, 
  getSocialMediaItems,
  ContentItem,
  NavigationItem,
  SocialMediaItem
} from '../lib/contentLoader';
import { AboutData } from './api/about/route';
import TypewriterText from '../components/TypewriterText';
import LiquidGlass, { LiquidGlassPresets } from '../components/LiquidGlass';

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState('about');
  const [filteredType, setFilteredType] = useState<string>('all');
  const [allContentItems, setAllContentItems] = useState<ContentItem[]>([]);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [socialMediaItems, setSocialMediaItems] = useState<SocialMediaItem[]>([]);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  // Load all content and navigation data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [contentItems, navItems, socialItems, aboutResponse] = await Promise.all([
          getAllContentItems(),
          getNavigationItems(),
          getSocialMediaItems(),
          fetch('/api/about')
        ]);
        
        const aboutData = await aboutResponse.json();
        
        setAllContentItems(contentItems);
        setNavigationItems(navItems);
        setSocialMediaItems(socialItems);
        setAboutData(aboutData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter items based on selected type
  const getFilteredItems = (): ContentItem[] => {
    if (filteredType === 'all' || filteredType === 'about' || filteredType === 'contact') {
      return allContentItems;
    }
    return allContentItems.filter(item => item.type === filteredType);
  };

  // Handle intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    const sections = ['about', 'timeline', 'contact'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (section: string) => {
    if (section === 'about') {
      // Scroll to about section
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection('about');
      setFilteredType('all');
    } else if (section === 'contact') {
      // Scroll to contact section
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection('contact');
      setFilteredType('all');
    } else {
      // Filter timeline by type and scroll to timeline
      const element = document.getElementById('timeline');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection('timeline');
      setFilteredType(section);
    }
  };

  // Background switching removed - using single static background

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <LiquidGlass 
          {...LiquidGlassPresets.primary}
          className="p-8 rounded-2xl"
        >
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading portfolio content...</p>
          </div>
        </LiquidGlass>
      </div>
    );
  }

  return (
      <div className="min-h-screen relative">
        {/* Navigation Components */}
        <LeftNavigation 
          items={navigationItems}
          activeSection={filteredType === 'all' ? activeSection : filteredType}
          onSectionClick={handleSectionClick}
        />
        
        <RightSocialBar 
          items={socialMediaItems}
        />

        {/* Main Content */}
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
                {aboutData?.tags && (
                  <div className="space-y-6">
                    {/* Technical Tags */}
                    {aboutData.tags.technical && aboutData.tags.technical.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white/90 mb-3">Technical Skills</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                          {aboutData.tags.technical.map((tag, index) => (
                            <LiquidGlass
                              key={`tech-${index}`}
                              {...LiquidGlassPresets.secondary}
                              className="px-3 py-1 rounded-full text-xs text-white/90"
                            >
                              {tag}
                            </LiquidGlass>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Experience Tags */}
                    {aboutData.tags.experience && aboutData.tags.experience.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white/90 mb-3">Experience</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                          {aboutData.tags.experience.map((tag, index) => (
                            <LiquidGlass
                              key={`exp-${index}`}
                              {...LiquidGlassPresets.secondary}
                              className="px-3 py-1 rounded-full text-xs text-white/90"
                            >
                              {tag}
                            </LiquidGlass>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Project Management Tags */}
                    {aboutData.tags.project_management && aboutData.tags.project_management.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white/90 mb-3">Project Management</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                          {aboutData.tags.project_management.map((tag, index) => (
                            <LiquidGlass
                              key={`pm-${index}`}
                              {...LiquidGlassPresets.secondary}
                              className="px-3 py-1 rounded-full text-xs text-white/90"
                            >
                              {tag}
                            </LiquidGlass>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Research Tags */}
                    {aboutData.tags.research && aboutData.tags.research.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white/90 mb-3">Research</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                          {aboutData.tags.research.map((tag, index) => (
                            <LiquidGlass
                              key={`research-${index}`}
                              {...LiquidGlassPresets.secondary}
                              className="px-3 py-1 rounded-full text-xs text-white/90"
                            >
                              {tag}
                            </LiquidGlass>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Background switching removed - using single static background for optimal liquid glass effect */}
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
