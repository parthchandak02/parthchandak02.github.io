import { ContentItem } from '../types/portfolio';

// Helper function to parse dates for sorting
const parseDate = (dateStr: string): Date => {
  // Handle various date formats
  if (dateStr.includes(' - ')) {
    // Range format like "Jan 2022 - Present" - use start date
    const startDate = dateStr.split(' - ')[0];
    return new Date(startDate);
  }
  return new Date(dateStr);
};

// Map to standardize types
const typeMap: { [key: string]: string } = {
  'experience': 'experience',
  'project': 'projects',
  'projects': 'projects', 
  'research': 'research',
  'award': 'awards',
  'awards': 'awards',
  'community': 'community',
  'media': 'media'
};

// Function to organize timeline data by category and sort by date
export function organizeTimelineData(timeline: ContentItem[]): {
  experience: ContentItem[];
  projects: ContentItem[];
  research: ContentItem[];
  awards: ContentItem[];
  community: ContentItem[];
  media: ContentItem[];
} {
  // Standardize types first
  const normalizedTimeline = timeline.map(item => ({
    ...item,
    type: typeMap[item.type] || item.type
  }));

  // Group by type
  const grouped = {
    experience: [] as ContentItem[],
    projects: [] as ContentItem[],
    research: [] as ContentItem[],
    awards: [] as ContentItem[],
    community: [] as ContentItem[],
    media: [] as ContentItem[]
  };

  normalizedTimeline.forEach(item => {
    const type = item.type as keyof typeof grouped;
    if (grouped[type]) {
      grouped[type].push(item);
    }
  });

  // Sort each group by date (newest to oldest)
  Object.keys(grouped).forEach(key => {
    const typedKey = key as keyof typeof grouped;
    grouped[typedKey].sort((a, b) => {
      const aDate = parseDate(a.date);
      const bDate = parseDate(b.date);
      return bDate.getTime() - aDate.getTime();
    });
  });

  return grouped;
}

// Function to get organized flat timeline (for existing components)
export function getOrganizedTimeline(timeline: ContentItem[]): ContentItem[] {
  const organized = organizeTimelineData(timeline);
  const categoryOrder: (keyof typeof organized)[] = ['experience', 'projects', 'research', 'awards', 'community', 'media'];
  
  return categoryOrder.flatMap(category => organized[category]);
} 