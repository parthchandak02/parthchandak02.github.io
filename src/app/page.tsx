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
import TagsDisplay from '../components/TagsDisplay';
import { portfolioData } from '../content/portfolio-data';
import { tagsData } from '../content/tags-data';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// Transform portfolio data to match ContentItem interface
const STATIC_CONTENT_ITEMS: ContentItem[] = portfolioData.timeline.map(item => ({
  ...item,
  category: item.type.charAt(0).toUpperCase() + item.type.slice(1), // Convert 'experience' -> 'Experience'
  order: item.order || 0, // Use order from data or default to 0
  content: item.content || item.description, // Use content if available, fallback to description
}));



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

const STATIC_SOCIAL_MEDIA_ITEMS: SocialMediaItem[] = portfolioData.socialMedia;

const STATIC_ABOUT_DATA: AboutData = {
  title: 'About',
  currentPosition: 'Creative Technologist at Zoox',
  location: 'Foster City, CA',
  description: 'Creative technologist specializing in cutting-edge human-computer interaction for autonomous vehicles and robotics.',
  tags: {
    technical: [
      'Python', 'JavaScript', 'React', 'C++', 'C', 'MATLAB', 'Linux', 'Arduino', 'Raspberry Pi', 
      '3D Modeling', '3D Printing', 'SolidWorks', 'AutoCAD', 'Google SketchUp', 'Blender', 'Unity', 
      'ProtoPie', 'Figma', 'CorelDraw', 'CAD Design', 'Manufacturing', 'Mechanical Engineering', 
      'Robotics', 'IoT', 'Computer Vision', 'Neural Networks', 'Machine Learning', 'Hardware Prototyping',
      'Electro-mechanical Systems', 'Sensors', 'Audio Processing', 'User Interface Design', 'PCB Design',
      'Embedded Systems', 'Automation', 'Material Science', 'Data Analysis', 'Algorithm Development', 'Signal Processing'
    ],
    project_management: [
      'Agile', 'JIRA', 'Confluence', 'Smartsheets', 'Google Suite', 'Project Planning', 'Resource Allocation',
      'Team Leadership', 'Cross-functional Collaboration', 'Process Improvement', 'Quality Systems', 'LEAN Manufacturing',
      'PFMEA', 'Risk Management', 'Budget Planning', 'Vendor Management', 'Documentation', 'Technical Writing',
      'Requirements Gathering', 'System Integration', 'Workflow Optimization', 'Data Migration', 'Testing Frameworks',
      'Validation Processes', 'Change Management'
    ],
    research: [
      'Academic Research', 'Peer Review', 'Scientific Writing', 'Literature Review', 'Experimental Design',
      'Data Collection', 'Statistical Analysis', 'Research Methodology', 'Innovation', 'Technology Transfer',
      'Patent Research', 'Competitive Analysis', 'Market Research', 'User Studies', 'Usability Testing',
      'Human-Computer Interaction', 'User Experience Research', 'Accessibility', 'Design Thinking', 'Systematic Review',
      'Grant Writing', 'Publication', 'Conference Presentations', 'Industry Collaboration', 'Technology Assessment'
    ],
    experience: [
      'Autonomous Vehicles', 'Manufacturing Engineering', 'User Experience Design', 'Hardware Development',
      'Supercharger Technology', 'Tesla Semi', 'Site Planning', 'Electrical Systems', 'Civil Engineering',
      'Infrastructure Development', 'Visualization', 'Technical Documentation', 'Vendor Coordination', 'Cost Estimation',
      'Route Planning', 'Logistics', 'Safety Systems', 'Quality Control', 'Production Planning', 'Assembly Fixtures',
      'Test Automation', 'Field Testing', 'Prototyping', 'Design for Manufacturing', 'Technology Integration'
    ],
    community: [
      'Mentorship', 'Team Building', 'Community Service', 'Leadership Development', 'Volunteer Work',
      'Event Organization', 'Public Speaking', 'Workshop Facilitation', 'Knowledge Sharing', 'Peer Support',
      'Collaborative Problem Solving', 'Social Impact', 'Diversity and Inclusion', 'Student Mentoring', 'Professional Development'
    ],
    awards: [
      'Engineering Excellence', 'Innovation Recognition', 'Academic Achievement', 'Leadership Awards',
      'Scholarship Recipient', 'Honor Society', 'Merit Recognition', 'Entrepreneurship', 'Hackathon Winner',
      'Competition Success', 'Research Recognition', 'Technical Achievement', 'Community Impact', 'Professional Recognition', 'Academic Honors'
    ]
  },
  languages: ['English (Native)', 'Hindi (Fluent)', 'Marathi (Fluent)', 'German (Intermediate)', 'Marwari (Conversational)'],
  education: ['B.S. Mechanical Engineering', 'Minor Computer Science', 'Minor Mathematics', 'Washington State University'],
  strengths: ['Maximizer', 'Relator', 'Arranger', 'Harmony', 'Empathy'],
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

  // Using static portfolio data (no API calls needed)
  useEffect(() => {
    console.log('Loaded content items from portfolio-data.ts:', allContentItems.length);
    console.log('Content types available:', [...new Set(allContentItems.map(item => item.type))]);
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

      {/* Right Social Bar - Moved outside main content flow */}
      <div className="fixed z-50">
        <RightSocialBar items={socialMediaItems} />
      </div>

      {/* Main Content */}
      <main className="min-h-screen">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 lg:ml-64">
          {/* Hero Section */}
          <section id="about" className="min-h-screen flex items-center justify-center py-8 md:py-12">
            <div className="max-w-4xl mx-auto px-4 text-center">
              {/* Hero Content */}
              <div className="text-2xl md:text-3xl text-white/80 mb-4 font-secondary">
                Hi, my name is
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in font-title">
                Parth Chandak
              </h1>
              <div className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-secondary">
                I am a{' '}
                <TypewriterText
                  roles={[
                    'Creative Technologist',
                    'Engineer',
                    'Researcher',
                    'Team Leader',
                    'Innovator',
                    'Problem Solver'
                  ]}
                  className="text-white font-medium font-secondary"
                />
              </div>
              {/* Tags Display - Now directly below typewriter text */}
              <div className="max-w-3xl mx-auto mb-12">
                <TagsDisplay 
                  tags={tagsData}
                  className="w-full"
                />
              </div>
              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handleSectionClick('timeline')}
                  className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm font-navigation"
                >
                  View My Work
                </button>
                <button 
                  onClick={() => handleSectionClick('contact')}
                  className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm font-navigation"
                >
                  Get In Touch
                </button>
              </div>
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
          <section id="contact" className="py-20 mb-24 lg:mb-32">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-title">
                Let&apos;s Connect
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto font-secondary">
                I&apos;m always interested in new opportunities and collaborations. 
                Whether you have a project in mind or just want to connect, 
                I&apos;d love to hear from you.
              </p>
              <div className="flex justify-center mt-8">
                <ChevronDownIcon className="w-8 h-8 text-white/60 animate-bounce" />
              </div>
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
