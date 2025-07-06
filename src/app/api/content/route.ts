import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
  technologies?: string | string[];
  color?: string;
  link?: string;
  image?: string;
  companyLogo?: string;
  subtitle?: string;
  content?: string;
}

const CONTENT_DIRECTORY = path.join(process.cwd(), 'src/content');

// Navigation configuration
const NAVIGATION_CONFIG = [
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

function getAllContentItems(): ContentItem[] {
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
        companyLogo: data.companyLogo || data.iconOverride, // Map iconOverride to companyLogo
        subtitle: data.subtitle,
        content: content
      };
      
      items.push(item);
    }
  }
  
  // Sort by date (newest first) and then by order
  return items.sort((a, b) => {
    const dateA = new Date(a.date || '1970-01-01');
    const dateB = new Date(b.date || '1970-01-01');
    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime();
    }
    return (a.order || 0) - (b.order || 0);
  });
}

export async function GET() {
  try {
    const items = getAllContentItems();
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error loading content:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
} 