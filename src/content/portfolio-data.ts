// Portfolio data for static export - GitHub Pages compatible
export const portfolioData = {
  // Timeline data organized by type
  timeline: [
    // Experience
    {
      id: 'zoox-manufacturing-engineer',
      title: 'Manufacturing Engineer',
      company: 'Zoox',
      location: 'Foster City, CA',
      date: '2023 - Present',
      description: 'Leading manufacturing engineering initiatives for autonomous vehicle production.',
      type: 'experience',
      icon: 'BriefcaseIcon',
      technologies: ['Manufacturing', 'Automation', 'Quality Control'],
      color: '#E53E3E',
      logo: 'company-logos/zoox-logo.png'
    },
    {
      id: 'zoox-creative-technologist',
      title: 'Creative Technologist',
      company: 'Zoox',
      location: 'Foster City, CA',
      date: '2022 - 2023',
      description: 'Developing creative technology solutions for autonomous vehicle interfaces.',
      type: 'experience',
      icon: 'BriefcaseIcon',
      technologies: ['Creative Technology', 'UI/UX', 'Prototyping'],
      color: '#E53E3E',
      logo: 'company-logos/zoox-logo.png'
    },
    {
      id: 'tesla-engineering-intern',
      title: 'Engineering Intern',
      company: 'Tesla',
      location: 'Palo Alto, CA',
      date: '2021 - 2022',
      description: 'Contributed to engineering projects in electric vehicle development.',
      type: 'experience',
      icon: 'BriefcaseIcon',
      technologies: ['Engineering', 'Electric Vehicles', 'Innovation'],
      color: '#E53E3E',
      logo: 'company-logos/tesla-logo.png'
    },
    {
      id: 'boeing-scholar',
      title: 'Boeing Scholar',
      company: 'Boeing',
      location: 'Seattle, WA',
      date: '2020 - 2021',
      description: 'Research and development in aerospace engineering.',
      type: 'experience',
      icon: 'BriefcaseIcon',
      technologies: ['Aerospace', 'Research', 'Engineering'],
      color: '#E53E3E',
      logo: 'company-logos/boeing-logo.png'
    },
    {
      id: 'berg-engineering-assistant',
      title: 'Engineering Assistant',
      company: 'Berg Engineering',
      location: 'Washington',
      date: '2019 - 2020',
      description: 'Supporting engineering operations and project development.',
      type: 'experience',
      icon: 'BriefcaseIcon',
      technologies: ['Engineering Support', 'Project Management'],
      color: '#E53E3E',
      logo: 'company-logos/berg-logo.png'
    },
    {
      id: 'arth-systems-marketing-intern',
      title: 'Marketing Intern',
      company: 'Arth Systems',
      location: 'Remote',
      date: '2018 - 2019',
      description: 'Marketing and business development for technology solutions.',
      type: 'experience',
      icon: 'BriefcaseIcon',
      technologies: ['Marketing', 'Business Development'],
      color: '#E53E3E',
      logo: 'company-logos/arth-systems-logo.png'
    },
    {
      id: 'wsu-resident-technology-assistant',
      title: 'Resident Technology Assistant',
      company: 'Washington State University',
      location: 'Pullman, WA',
      date: '2017 - 2018',
      description: 'Providing technology support and assistance to university residents.',
      type: 'experience',
      icon: 'BriefcaseIcon',
      technologies: ['Technology Support', 'Customer Service'],
      color: '#E53E3E',
      logo: 'company-logos/washington-state-uni-logo.png'
    },

    // Projects
    {
      id: 'swordmaking-katanas-material-science',
      title: 'Swordmaking & Katanas Material Science',
      company: 'Independent Research',
      location: 'Research Lab',
      date: '2023',
      description: 'Advanced material science research in traditional Japanese swordmaking techniques.',
      type: 'project',
      icon: 'BeakerIcon',
      technologies: ['Material Science', 'Metallurgy', 'Research'],
      color: '#E53E3E',
      image: 'project-photos/swordmaking-katanas-material-science.png'
    },
    {
      id: 'microprocessor-programming-complex-signals',
      title: 'Microprocessor Programming Complex Signals',
      company: 'Academic Project',
      location: 'University Lab',
      date: '2022',
      description: 'Advanced microprocessor programming for complex signal processing applications.',
      type: 'project',
      icon: 'CodeBracketIcon',
      technologies: ['Microprocessors', 'Signal Processing', 'Programming'],
      color: '#E53E3E',
      image: 'project-photos/microprocessor-programming-complex-signals.png'
    },
    {
      id: 'green-fridge-entrepreneurship',
      title: 'Green Fridge Entrepreneurship',
      company: 'Startup Project',
      location: 'Innovation Lab',
      date: '2021',
      description: 'Entrepreneurial project developing sustainable refrigeration solutions.',
      type: 'project',
      icon: 'LightBulbIcon',
      technologies: ['Entrepreneurship', 'Sustainability', 'Innovation'],
      color: '#E53E3E',
      image: 'project-photos/green-fridge-entrepreneurship.png'
    },
    {
      id: 'engineering-gear-system-parallax-bot',
      title: 'Engineering Gear System Parallax Bot',
      company: 'Robotics Project',
      location: 'Engineering Lab',
      date: '2020',
      description: 'Designed and built a parallax robot with advanced gear system engineering.',
      type: 'project',
      icon: 'RocketLaunchIcon',
      technologies: ['Robotics', 'Mechanical Engineering', 'Automation'],
      color: '#E53E3E',
      image: 'project-photos/engineering-gear-system-parallax-bot.png'
    },
    {
      id: 'cleanroom-workbench-design-assembly',
      title: 'Cleanroom Workbench Design & Assembly',
      company: 'Laboratory Project',
      location: 'Cleanroom Facility',
      date: '2019',
      description: 'Designed and assembled specialized workbench for cleanroom environments.',
      type: 'project',
      icon: 'BuildingOfficeIcon',
      technologies: ['Design', 'Assembly', 'Cleanroom Standards'],
      color: '#E53E3E',
      image: 'project-photos/cleanroom-workbench-design-assembly.png'
    },
    {
      id: 'boeing-damping-ratios',
      title: 'Boeing Damping Ratios',
      company: 'Boeing',
      location: 'Seattle, WA',
      date: '2018',
      description: 'Research and analysis of damping ratios in aerospace applications.',
      type: 'project',
      icon: 'ChartBarIcon',
      technologies: ['Aerospace Engineering', 'Data Analysis', 'Research'],
      color: '#E53E3E',
      image: 'project-photos/boeing-damping-ratios.png'
    },
    {
      id: 'audio-analyzing-software',
      title: 'Audio Analyzing Software',
      company: 'Software Project',
      location: 'Development Lab',
      date: '2017',
      description: 'Developed comprehensive software for audio analysis and processing.',
      type: 'project',
      icon: 'CodeBracketIcon',
      technologies: ['Software Development', 'Audio Processing', 'Signal Analysis'],
      color: '#E53E3E',
      image: 'project-photos/audio-analyzing-software.png'
    },
    {
      id: 'acrt-furnace-safety-research',
      title: 'ACRT Furnace Safety Research',
      company: 'Safety Research Project',
      location: 'Research Facility',
      date: '2016',
      description: 'Comprehensive safety research for ACRT furnace operations.',
      type: 'project',
      icon: 'BeakerIcon',
      technologies: ['Safety Engineering', 'Research', 'Furnace Systems'],
      color: '#E53E3E',
      image: 'project-photos/acrt-furnace-safety-research.png'
    },
    {
      id: 'crimson-code-2018',
      title: 'Crimson Code 2018',
      company: 'Hackathon',
      location: 'Washington State University',
      date: '2018',
      description: 'Participated in Crimson Code hackathon with innovative coding solutions.',
      type: 'project',
      icon: 'CodeBracketIcon',
      technologies: ['Hackathon', 'Coding', 'Innovation'],
      color: '#E53E3E',
      image: 'project-photos/crimson-code-2018.png'
    },

    // Awards
    {
      id: 'roty-2017',
      title: 'Resident of the Year 2017',
      company: 'Washington State University',
      location: 'Pullman, WA',
      date: '2017',
      description: 'Recognized as Resident of the Year for outstanding contribution to campus life.',
      type: 'award',
      icon: 'TrophyIcon',
      technologies: ['Leadership', 'Community Service'],
      color: '#E53E3E'
    },
    {
      id: 'harold-frank-fellows-2017',
      title: 'Harold Frank Fellows',
      company: 'Academic Institution',
      location: 'University',
      date: '2017',
      description: 'Selected as Harold Frank Fellow for academic excellence and leadership.',
      type: 'award',
      icon: 'TrophyIcon',
      technologies: ['Academic Excellence', 'Leadership'],
      color: '#E53E3E'
    },
    {
      id: 'housing-dining-advisory-board-2016',
      title: 'Housing & Dining Advisory Board',
      company: 'Washington State University',
      location: 'Pullman, WA',
      date: '2016',
      description: 'Appointed to Housing & Dining Advisory Board for student representation.',
      type: 'award',
      icon: 'UsersIcon',
      technologies: ['Student Leadership', 'Advisory Role'],
      color: '#E53E3E'
    },
    {
      id: 'guy-thornton-engineering-scholarship-2016',
      title: 'Guy Thornton Engineering Scholarship',
      company: 'Engineering Foundation',
      location: 'University',
      date: '2016',
      description: 'Awarded Guy Thornton Engineering Scholarship for academic merit.',
      type: 'award',
      icon: 'TrophyIcon',
      technologies: ['Engineering Excellence', 'Academic Achievement'],
      color: '#E53E3E'
    },
    {
      id: 'robert-finch-memorial-scholarship-2015',
      title: 'Robert Finch Memorial Scholarship',
      company: 'Memorial Foundation',
      location: 'University',
      date: '2015',
      description: 'Recipient of Robert Finch Memorial Scholarship for outstanding performance.',
      type: 'award',
      icon: 'TrophyIcon',
      technologies: ['Academic Excellence', 'Memorial Recognition'],
      color: '#E53E3E'
    },
    {
      id: 'international-merit-award-2015',
      title: 'International Merit Award',
      company: 'International Foundation',
      location: 'Global',
      date: '2015',
      description: 'Recognized with International Merit Award for global academic achievement.',
      type: 'award',
      icon: 'TrophyIcon',
      technologies: ['International Recognition', 'Merit'],
      color: '#E53E3E'
    },
    {
      id: 'honor-roll-2015',
      title: 'Honor Roll',
      company: 'Academic Institution',
      location: 'University',
      date: '2015',
      description: 'Achieved Honor Roll status for exceptional academic performance.',
      type: 'award',
      icon: 'AcademicCapIcon',
      technologies: ['Academic Excellence', 'Honor Roll'],
      color: '#E53E3E'
    },

    // Community
    {
      id: 'rebuilding-together-2024',
      title: 'Rebuilding Together 2024',
      company: 'Community Organization',
      location: 'Local Community',
      date: '2024',
      description: 'Volunteer work with Rebuilding Together for community development.',
      type: 'community',
      icon: 'UsersIcon',
      technologies: ['Community Service', 'Volunteer Work'],
      color: '#E53E3E'
    },
    {
      id: 'rebuilding-together-2023',
      title: 'Rebuilding Together 2023',
      company: 'Community Organization',
      location: 'Local Community',
      date: '2023',
      description: 'Continued volunteer service with Rebuilding Together organization.',
      type: 'community',
      icon: 'UsersIcon',
      technologies: ['Community Service', 'Volunteer Work'],
      color: '#E53E3E'
    },
    {
      id: 'catholic-worker-house-2023',
      title: 'Catholic Worker House',
      company: 'Community Service',
      location: 'Local Community',
      date: '2023',
      description: 'Community service work with Catholic Worker House organization.',
      type: 'community',
      icon: 'UsersIcon',
      technologies: ['Community Service', 'Social Work'],
      color: '#E53E3E'
    }
  ],

  // Navigation items
  navigation: [
    {
      id: 'about',
      label: 'About',
      icon: 'UserIcon',
      section: 'about',
      color: '#E53E3E'
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: 'BriefcaseIcon',
      section: 'experience',
      color: '#E53E3E'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'RocketLaunchIcon',
      section: 'projects',
      color: '#E53E3E'
    },
    {
      id: 'research',
      label: 'Research',
      icon: 'BeakerIcon',
      section: 'research',
      color: '#E53E3E'
    },
    {
      id: 'awards',
      label: 'Awards',
      icon: 'TrophyIcon',
      section: 'awards',
      color: '#E53E3E'
    },
    {
      id: 'community',
      label: 'Community',
      icon: 'UsersIcon',
      section: 'community',
      color: '#E53E3E'
    },
    {
      id: 'media',
      label: 'Media',
      icon: 'FilmIcon',
      section: 'media',
      color: '#E53E3E'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: 'EnvelopeIcon',
      section: 'contact',
      color: '#E53E3E'
    }
  ],

  // Social media links
  socialMedia: [
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
  ]
}; 