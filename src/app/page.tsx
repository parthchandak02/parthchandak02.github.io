"use client";

import React, { useState, useEffect } from 'react';
import { PortfolioTimeline } from '../components/PortfolioTimeline';
import { LeftNavigation } from '../components/LeftNavigation';
import { RightSocialBar } from '../components/RightSocialBar';
import TypewriterText from '../components/TypewriterText';
import TagsDisplay from '../components/TagsDisplay';
import { portfolioData } from '../content/portfolio-data';
import { getOrganizedTimeline, organizeTimelineData } from '../utils/organizePortfolioData';
import { useTagHighlight } from '../components/TagHighlightContext';
import { validatePortfolioTagsOrThrow } from '../utils/validateTags';

// Transform and organize portfolio data by category and date
const STATIC_CONTENT_ITEMS = getOrganizedTimeline(
  portfolioData.timeline.map(item => ({
    ...item,
    category: item.type.charAt(0).toUpperCase() + item.type.slice(1), // Convert 'experience' -> 'Experience'
    order: item.order || 0, // Use order from data or default to 0
    content: item.content || item.description, // Use content if available, fallback to description
  }))
);

// Get organized data for grouped display
const ORGANIZED_TIMELINE_DATA = organizeTimelineData(STATIC_CONTENT_ITEMS);

// Validate portfolio tags (will throw error if invalid icons are found)
if (typeof window !== 'undefined') {
  // Only run on client-side to avoid SSR issues
  try {
    validatePortfolioTagsOrThrow(portfolioData);
  } catch (error) {
    console.error(error);
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [filteredType, setFilteredType] = useState<string>('all');
  const { highlightedTags } = useTagHighlight();

  // Intersection Observer for main sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -100px 0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId === 'about' || sectionId === 'contact') {
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id="about"], section[id="contact"]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <div className="content-container w-full">
        <LeftNavigation 
          items={portfolioData.navigation} 
          activeSection={activeSection} 
          onSectionClick={(sectionId) => setActiveSection(sectionId)} 
        />
        
        <RightSocialBar links={portfolioData.socialMedia} />
        
        <div className="px-4 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto">
          <section id="about" className="min-h-[80vh] flex flex-col justify-center">
            <div className="glass p-6 md:p-8 lg:p-10 rounded-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <TypewriterText text="Parth Chandak" />
              </h1>
              <h2 className="text-xl md:text-2xl text-white/80 mb-6">
                {portfolioData.about.currentPosition} | {portfolioData.about.location}
              </h2>
              <p className="text-lg text-white/70 max-w-3xl mb-8">
                {portfolioData.about.content}
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
                <TagsDisplay 
                  tags={Object.values(portfolioData.about.tags).flat()} 
                  highlightedTags={highlightedTags}
                />
              </div>
            </div>
          </section>
          
          <section id="timeline" className="py-16 md:py-24">
            <PortfolioTimeline 
              items={STATIC_CONTENT_ITEMS} 
              organizedData={ORGANIZED_TIMELINE_DATA}
              filteredType={filteredType}
              setActiveSection={setActiveSection}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
