import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    return NextResponse.json({ items: SOCIAL_MEDIA_CONFIG });
  } catch (error) {
    console.error('Error loading social media items:', error);
    return NextResponse.json({ error: 'Failed to load social media items' }, { status: 500 });
  }
} 