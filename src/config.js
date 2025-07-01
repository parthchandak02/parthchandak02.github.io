module.exports = {
  email: 'parth.chandak02@gmail.com',

  socialMedia: [
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/parthchandak02',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/parthchandak02',
    },
    {
      name: 'Calendar',
      url: 'https://tiny.cc/parthchandakbook',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Research',
      url: '/#research',
    },
    {
      name: 'Awards',
      url: '/#awards',
    },
    {
      name: 'Community',
      url: '/#community',
    },
    {
      name: 'Media',
      url: '/#media',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#cc4444',      // Red for accents
    navy: '#000000',       // Black  
    darkNavy: '#000000',   // Pure black
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
