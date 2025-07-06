import { PortfolioData } from '../types/timeline';

export const portfolioData: PortfolioData = {
  timeline: [
    {
      id: 'senior-engineer-2024',
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Corp',
      location: 'San Francisco, CA',
      date: '2024 - Present',
      description: 'Leading development of scalable web applications using React and Node.js. Mentoring junior developers and architecting cloud solutions. Spearheading migration to microservices architecture.',
      type: 'experience',
      logo: '/logos/tech-innovations.png',
      icon: 'BriefcaseIcon',
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'GraphQL'],
      color: '#3B82F6'
    },
    {
      id: 'best-innovation-award',
      title: 'Best Innovation Award',
      company: 'Tech Conference 2024',
      location: 'San Francisco, CA',
      date: '2024',
      description: 'Recognized for developing an innovative AI-powered analytics dashboard that improved user engagement by 60% and reduced data processing time by 40%.',
      type: 'award',
      logo: '/logos/tech-conference.png',
      icon: 'TrophyIcon',
      color: '#F59E0B'
    },
    {
      id: 'ai-analytics-project',
      title: 'AI-Powered Analytics Dashboard',
      company: 'Personal Project',
      location: 'Open Source',
      date: '2024',
      description: 'Built a comprehensive analytics dashboard with machine learning insights using React, Python, and TensorFlow. Features real-time data visualization and predictive analytics.',
      type: 'project',
      logo: '/logos/github.png',
      icon: 'ChartBarIcon',
      technologies: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI'],
      link: 'https://github.com/username/ai-analytics-dashboard',
      color: '#10B981'
    },
    {
      id: 'software-engineer-2023',
      title: 'Software Engineer',
      company: 'StartupTech LLC',
      location: 'Remote',
      date: '2023 - 2024',
      description: 'Developed full-stack applications using React and Express.js. Implemented CI/CD pipelines and automated testing. Collaborated with cross-functional teams to deliver high-quality products.',
      type: 'experience',
      logo: '/logos/startuptech.png',
      icon: 'CodeBracketIcon',
      technologies: ['React', 'Express.js', 'MongoDB', 'Jest', 'Jenkins'],
      color: '#8B5CF6'
    },
    {
      id: 'ecommerce-platform',
      title: 'E-commerce Platform',
      company: 'Freelance Project',
      location: 'Remote',
      date: '2023',
      description: 'Developed a complete e-commerce platform with payment integration, inventory management, and admin dashboard. Used Next.js, Stripe, and PostgreSQL.',
      type: 'project',
      logo: '/logos/ecommerce.png',
      icon: 'ShoppingCartIcon',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
      link: 'https://github.com/username/ecommerce-platform',
      color: '#EF4444'
    },
    {
      id: 'junior-developer-2022',
      title: 'Junior Developer',
      company: 'Digital Solutions Inc',
      location: 'New York, NY',
      date: '2022 - 2023',
      description: 'Started career developing responsive web applications and learning modern development practices. Contributed to team projects and gained experience with agile methodologies.',
      type: 'experience',
      logo: '/logos/digital-solutions.png',
      icon: 'AcademicCapIcon',
      technologies: ['JavaScript', 'HTML/CSS', 'Bootstrap', 'Git'],
      color: '#06B6D4'
    },
    {
      id: 'computer-science-degree',
      title: 'Bachelor of Science in Computer Science',
      company: 'University of Technology',
      location: 'Boston, MA',
      date: '2018 - 2022',
      description: 'Graduated with honors. Specialized in software engineering and data structures. Participated in hackathons and coding competitions.',
      type: 'education',
      logo: '/logos/university.png',
      icon: 'AcademicCapIcon',
      color: '#6366F1'
    }
  ],
  navigation: [
    {
      id: 'about',
      label: 'About',
      icon: 'UserIcon',
      section: 'about',
      color: '#F59E0B'
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: 'BriefcaseIcon',
      section: 'experience',
      color: '#3B82F6'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'RocketLaunchIcon',
      section: 'projects',
      color: '#10B981'
    },
    {
      id: 'awards',
      label: 'Awards',
      icon: 'TrophyIcon',
      section: 'awards',
      color: '#F59E0B'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: 'EnvelopeIcon',
      section: 'contact',
      color: '#8B5CF6'
    }
  ],
  socialMedia: [
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
  ]
}; 