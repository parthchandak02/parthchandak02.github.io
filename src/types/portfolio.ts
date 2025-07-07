// TypeScript interfaces for portfolio data
export interface Tag {
  name: string;
  icon: string;
  category: string;
}

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
  tags: Tag[];
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

export interface TagsData {
  [category: string]: {
    name: string;
    icon: string;
  }[];
}

export interface PortfolioData {
  timeline: ContentItem[];
  navigation: NavigationItem[];
  socialMedia: SocialMediaItem[];
  tags?: TagsData;
  about?: AboutData;
} 