import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Client-side content loader using API routes
export interface ContentItem {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  range?: string;
  description: string;
  category: string;
  type: string;
  icon: string;
  order: number;
  technologies: string[];
  color: string;
  link?: string;
  image?: string;
  companyLogo?: string;
  iconOverride?: string;
  subtitle?: string;
  content: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  section: string;
  folder: string;
  color: string;
}

export interface SocialMediaItem {
  id: string;
  label: string;
  icon: string;
  url: string;
  color: string;
}

export interface AboutData {
  title: string;
  currentPosition: string;
  location: string;
  description: string;
  tags: {
    technical: string[];
    project_management: string[];
    research: string[];
    experience: string[];
    community: string[];
    awards: string[];
  };
  languages: string[];
  education: string[];
  strengths: string[];
  content: string;
}

// Check if we're in a server environment
const isServer = typeof window === 'undefined';

// Content directory path
const CONTENT_DIRECTORY = isServer ? path.join(process.cwd(), 'src/content') : '';

// Navigation configuration
const NAVIGATION_CONFIG: NavigationItem[] = [
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

// Social media configuration
const SOCIAL_MEDIA_CONFIG: SocialMediaItem[] = [
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

// Icon mapping for content items
const ICON_MAP: Record<string, string> = {
  'briefcase': 'BriefcaseIcon',
  'innovation': 'LightBulbIcon',
  'trophy': 'TrophyIcon',
  'research': 'BeakerIcon',
  'community': 'UsersIcon',
  'media': 'FilmIcon',
  'code': 'CodeBracketIcon',
  'award': 'TrophyIcon',
  'project': 'RocketLaunchIcon',
  'experience': 'BriefcaseIcon'
};

// Type mapping for content categories
const TYPE_MAP: Record<string, string> = {
  'Experience': 'experience',
  'Projects': 'project',
  'Research': 'research',
  'Awards': 'award',
  'Community': 'community',
  'Media': 'media'
};

const THEME_COLOR = '#E53E3E';

// Static data loading functions (for build time)
export function getAllContentItemsStatic(): ContentItem[] {
  if (!isServer) {
    console.warn('getAllContentItemsStatic should only be called on the server');
    return [];
  }

  const items: ContentItem[] = [];
  
  // Process each numbered folder
  for (const navItem of NAVIGATION_CONFIG) {
    if (navItem.folder === '00_about' || navItem.folder === '07_contact') {
      continue; // Skip about and contact as they're not timeline items
    }
    
    const folderPath = path.join(CONTENT_DIRECTORY, navItem.folder);
    
    if (!fs.existsSync(folderPath)) {
      continue;
    }
    
    const files = fs.readdirSync(folderPath);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    for (const file of markdownFiles) {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Parse technologies
      let technologies: string[] = [];
      if (data.technologies) {
        if (typeof data.technologies === 'string') {
          technologies = data.technologies.split(',').map((tech: string) => tech.trim());
        } else if (Array.isArray(data.technologies)) {
          technologies = data.technologies;
        }
      }
      
      const item: ContentItem = {
        id: file.replace('.md', ''),
        title: data.title || 'Untitled',
        company: data.company || '',
        location: data.location || '',
        date: data.range || data.date || '',
        range: data.range,
        description: data.description || content.split('\n')[0] || '',
        category: data.category || navItem.label,
        type: TYPE_MAP[data.category] || navItem.id,
        icon: ICON_MAP[data.icon] || 'DocumentIcon',
        order: data.order || 0,
        technologies,
        color: THEME_COLOR,
        link: data.link,
        image: data.image,
        companyLogo: data.companyLogo,
        iconOverride: data.iconOverride,
        subtitle: data.subtitle,
        content: content
      };
      
      items.push(item);
    }
  }
  
  // Sort by order and then by date
  return items.sort((a, b) => {
    if (a.order !== b.order) {
      return b.order - a.order;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getAboutDataStatic(): AboutData | null {
  if (!isServer) {
    console.warn('getAboutDataStatic should only be called on the server');
    return null;
  }

  try {
    const aboutPath = path.join(CONTENT_DIRECTORY, '00_about', 'about.md');
    
    if (!fs.existsSync(aboutPath)) {
      return null;
    }
    
    const fileContent = fs.readFileSync(aboutPath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      title: data.title || 'About',
      currentPosition: data.currentPosition || '',
      location: data.location || '',
      description: data.description || '',
      tags: data.tags || {
        technical: [],
        project_management: [],
        research: [],
        experience: [],
        community: [],
        awards: []
      },
      languages: data.languages || [],
      education: data.education || [],
      strengths: data.strengths || [],
      content: content
    };
  } catch (error) {
    console.error('Error loading about data:', error);
    return null;
  }
}

// Client-side data loading functions (for fallback)
export async function getAllContentItems(): Promise<ContentItem[]> {
  if (isServer) {
    return getAllContentItemsStatic();
  }
  
  // Fallback to API route if available (for development)
  try {
    const response = await fetch('/api/content');
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error loading content items:', error);
    return [];
  }
}

export async function getNavigationItems(): Promise<NavigationItem[]> {
  if (isServer) {
    return NAVIGATION_CONFIG;
  }
  
  // Fallback to API route if available (for development)
  try {
    const response = await fetch('/api/navigation');
    const data = await response.json();
    return data.items || NAVIGATION_CONFIG;
  } catch (error) {
    console.error('Error loading navigation items:', error);
    return NAVIGATION_CONFIG;
  }
}

export async function getSocialMediaItems(): Promise<SocialMediaItem[]> {
  if (isServer) {
    return SOCIAL_MEDIA_CONFIG;
  }
  
  // Fallback to API route if available (for development)
  try {
    const response = await fetch('/api/social');
    const data = await response.json();
    return data.items || SOCIAL_MEDIA_CONFIG;
  } catch (error) {
    console.error('Error loading social media items:', error);
    return SOCIAL_MEDIA_CONFIG;
  }
}

export async function getAboutData(): Promise<AboutData | null> {
  if (isServer) {
    return getAboutDataStatic();
  }
  
  // Fallback to API route if available (for development)
  try {
    const response = await fetch('/api/about');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading about data:', error);
    return null;
  }
}

export async function getContentItemsByType(type: string): Promise<ContentItem[]> {
  try {
    const response = await fetch(`/api/content/${type}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching content items by type:', error);
    return [];
  }
}

export async function getContentItemsByCategory(category: string): Promise<ContentItem[]> {
  try {
    const allItems = await getAllContentItems();
    return allItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
  } catch (error) {
    console.error('Error fetching content items by category:', error);
    return [];
  }
}