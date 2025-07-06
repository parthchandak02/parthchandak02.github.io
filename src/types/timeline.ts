export interface TimelineItem {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  type: 'experience' | 'project' | 'award' | 'education';
  logo?: string;
  icon?: string;
  technologies?: string[];
  link?: string;
  color?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  section: string;
  color?: string;
}

export interface SocialMediaItem {
  id: string;
  label: string;
  icon: string;
  url: string;
  color?: string;
}

export interface PortfolioData {
  timeline: TimelineItem[];
  navigation: NavigationItem[];
  socialMedia: SocialMediaItem[];
} 