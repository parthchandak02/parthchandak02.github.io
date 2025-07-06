import { NextResponse } from 'next/server';

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  section: string;
  folder: string;
  color?: string;
}

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

export async function GET() {
  try {
    return NextResponse.json({ items: NAVIGATION_CONFIG });
  } catch (error) {
    console.error('Error loading navigation items:', error);
    return NextResponse.json({ error: 'Failed to load navigation items' }, { status: 500 });
  }
} 