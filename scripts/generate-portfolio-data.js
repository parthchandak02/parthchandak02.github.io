const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration extracted from contentLoader.ts
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

const SOCIAL_MEDIA_CONFIG = [
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

const ICON_MAP = {
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

const TYPE_MAP = {
  'Professional Experience': 'experience',
  'Experience': 'experience',
  'Projects': 'project',
  'Material Science': 'project',
  'Research': 'research',
  'Awards': 'award',
  'Community': 'community',
  'Media': 'media'
};

const THEME_COLOR = '#E53E3E';
const CONTENT_DIRECTORY = path.join(process.cwd(), 'src/content');

// Generate portfolio data from markdown files
function generatePortfolioData() {
  console.log('🚀 Generating portfolio data from markdown files...');
  
  const items = [];
  
  // Process each numbered folder (skip about and contact)
  for (const navItem of NAVIGATION_CONFIG) {
    if (navItem.folder === '00_about' || navItem.folder === '07_contact') {
      continue;
    }
    
    const folderPath = path.join(CONTENT_DIRECTORY, navItem.folder);
    
    if (!fs.existsSync(folderPath)) {
      console.warn(`⚠️  Folder not found: ${folderPath}`);
      continue;
    }
    
    console.log(`📂 Processing ${navItem.folder} (${navItem.label})`);
    
    const files = fs.readdirSync(folderPath);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    for (const file of markdownFiles) {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Process tags from the new format
      let tags = [];
      if (data.tags && Array.isArray(data.tags)) {
        tags = data.tags.map(tag => ({
          name: tag.name,
          icon: tag.icon,
          category: tag.category
        }));
      }
      
      // Parse technologies (legacy support)
      let technologies = [];
      if (data.technologies) {
        if (typeof data.technologies === 'string') {
          technologies = data.technologies.split(',').map(tech => tech.trim());
        } else if (Array.isArray(data.technologies)) {
          technologies = data.technologies;
        }
      }
      
      // Determine the type based on category or fallback to folder
      let itemType = navItem.id;
      if (data.category && TYPE_MAP[data.category]) {
        itemType = TYPE_MAP[data.category];
      }

      const item = {
        id: file.replace('.md', ''),
        title: data.title || 'Untitled',
        company: data.company || '',
        location: data.location || '',
        date: data.range || data.date || '',
        range: data.range,
        description: data.description || content.split('\n')[0] || '',
        category: data.category || navItem.label,
        type: itemType,
        icon: ICON_MAP[data.icon] || navItem.icon || 'DocumentIcon',
        order: data.order || 0,
        technologies,
        tags,
        color: THEME_COLOR,
        link: data.link || data.url,
        image: data.image,
        companyLogo: data.companyLogo,
        iconOverride: data.iconOverride,
        subtitle: data.subtitle,
        content: content
      };
      
      items.push(item);
      console.log(`   ✅ Processed: ${item.title}`);
    }
  }
  
  // Sort by order and then by date
  items.sort((a, b) => {
    if (a.order !== b.order) {
      return b.order - a.order;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Create navigation items for export
  const navigation = NAVIGATION_CONFIG.map(nav => ({
    id: nav.id,
    label: nav.label,
    icon: nav.icon,
    section: nav.section,
    color: nav.color
  }));

  const portfolioData = {
    timeline: items,
    navigation: navigation,
    socialMedia: SOCIAL_MEDIA_CONFIG
  };
  
  return portfolioData;
}

// Generate aggregated tags data from all content files
function generateAggregatedTags(portfolioData) {
  console.log('🏷️  Generating aggregated tags data from content files...');
  
  // Initialize categories map to store unique tags by category
  const categorizedTags = new Map();
  
  // Process tags from each timeline item
  portfolioData.timeline.forEach(item => {
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach(tag => {
        const category = tag.category || 'Uncategorized';
        
        if (!categorizedTags.has(category)) {
          categorizedTags.set(category, new Map());
        }
        
        // Use tag name as key to ensure uniqueness
        categorizedTags.get(category).set(tag.name, {
          name: tag.name,
          icon: tag.icon
        });
      });
    }
  });
  
  // Convert Map to the expected format
  const tagsData = {};
  categorizedTags.forEach((tags, category) => {
    // Convert category name to snake_case for consistency
    const categoryKey = category.toLowerCase().replace(/\s+/g, '_');
    tagsData[categoryKey] = Array.from(tags.values());
  });
  
  console.log('✅ Generated aggregated tags data');
  return tagsData;
}

// Write portfolio data to TypeScript file
function writePortfolioDataFile(portfolioData) {
  console.log('📝 Writing portfolio-data.ts...');
  
  const outputPath = path.join(CONTENT_DIRECTORY, 'portfolio-data.ts');
  
  const fileContent = `// Portfolio data for static export - GitHub Pages compatible
// Auto-generated by scripts/generate-portfolio-data.js
// Do not edit manually - edit markdown files in src/content/ folders instead

export const portfolioData = ${JSON.stringify(portfolioData, null, 2)};
`;
  
  fs.writeFileSync(outputPath, fileContent, 'utf8');
  console.log(`✅ Generated portfolio-data.ts with ${portfolioData.timeline.length} items`);
}

// Write tags data to TypeScript file
function writeTagsDataFile(tagsData) {
  console.log('📝 Writing tags-data.ts...');
  
  const outputPath = path.join(CONTENT_DIRECTORY, 'tags-data.ts');
  
  const fileContent = `// Tags data aggregated from all content files
// Auto-generated by scripts/generate-portfolio-data.js
// Do not edit manually - edit tags in individual content files instead

export const tagsData = ${JSON.stringify(tagsData, null, 2)};
`;
  
  fs.writeFileSync(outputPath, fileContent, 'utf8');
  console.log('✅ Generated tags-data.ts');
}

// Main execution
function main() {
  console.log('🎯 Starting portfolio data generation...\n');
  
  try {
    // Generate portfolio data
    const portfolioData = generatePortfolioData();
    writePortfolioDataFile(portfolioData);
    
    // Generate aggregated tags data
    const tagsData = generateAggregatedTags(portfolioData);
    writeTagsDataFile(tagsData);
    
    console.log('\n🎉 Portfolio data generation completed successfully!');
    console.log(`📊 Generated ${portfolioData.timeline.length} timeline items`);
    console.log('📁 Files updated:');
    console.log('   - src/content/portfolio-data.ts');
    console.log('   - src/content/tags-data.ts');
    
  } catch (error) {
    console.error('❌ Error generating portfolio data:', error);
    process.exit(1);
  }
}

// Run the script
main(); 