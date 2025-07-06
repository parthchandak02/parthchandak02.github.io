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
  technologies?: string | string[];
  color?: string;
  link?: string;
  image?: string;
  companyLogo?: string;
  subtitle?: string;
  content?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  section: string;
  folder: string;
  color?: string;
}

export interface SocialMediaItem {
  id: string;
  label: string;
  icon: string;
  url: string;
  color?: string;
}

// Client-side API fetchers
export async function getAllContentItems(): Promise<ContentItem[]> {
  try {
    const response = await fetch('/api/content');
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching content items:', error);
    return [];
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

export async function getNavigationItems(): Promise<NavigationItem[]> {
  try {
    const response = await fetch('/api/navigation');
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    return [];
  }
}

export async function getSocialMediaItems(): Promise<SocialMediaItem[]> {
  try {
    const response = await fetch('/api/social');
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching social media items:', error);
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