import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

const CONTENT_DIRECTORY = path.join(process.cwd(), 'src/content');

function getAboutData(): AboutData | null {
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

export async function GET() {
  try {
    const aboutData = getAboutData();
    
    if (!aboutData) {
      return NextResponse.json({ error: 'About data not found' }, { status: 404 });
    }
    
    return NextResponse.json(aboutData);
  } catch (error) {
    console.error('Error loading about content:', error);
    return NextResponse.json({ error: 'Failed to load about content' }, { status: 500 });
  }
} 