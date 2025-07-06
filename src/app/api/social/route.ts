import { NextResponse } from 'next/server';

// Add this for static export compatibility
export const dynamic = 'force-static';

export interface SocialMediaItem {
  id: string;
  label: string;
  icon: string;
  url: string;
  color?: string;
}

const SOCIAL_MEDIA_CONFIG: SocialMediaItem[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/parthchandak02',
    color: '#0077B5'
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: 'github',
    url: 'https://github.com/parthchandak02',
    color: '#333'
  },
  {
    id: 'email',
    label: 'Email',
    icon: 'EnvelopeIcon',
    url: 'mailto:parth.chandak02@gmail.com',
    color: '#EF4444'
  },
  {
    id: 'calendar',
    label: 'Schedule Call',
    icon: 'CalendarDaysIcon',
    url: 'http://tiny.cc/parthchandakbook',
    color: '#06B6D4'
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: 'DocumentTextIcon',
    url: 'https://tiny.cc/parthchandakresume',
    color: '#8B5CF6'
  }
];

export async function GET() {
  try {
    return NextResponse.json({ items: SOCIAL_MEDIA_CONFIG });
  } catch (error) {
    console.error('Error loading social media items:', error);
    return NextResponse.json({ error: 'Failed to load social media items' }, { status: 500 });
  }
} 