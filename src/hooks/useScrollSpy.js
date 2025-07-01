import { useState, useEffect, useCallback } from 'react';

const useScrollSpy = (sectionIds = [], options = {}) => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  const { 
    threshold = 0.3, 
    rootMargin = '-20% 0px -70% 0px',
    offsetTop = 100 
  } = options;

  // Update URL hash when active section changes
  const updateUrlHash = useCallback((sectionId) => {
    if (typeof window === 'undefined' || !sectionId) return;
    
    const newHash = `#${sectionId}`;
    const currentHash = window.location.hash;
    
    if (currentHash !== newHash) {
      // Use replaceState to avoid adding entries to browser history
      const newUrl = `${window.location.pathname}${window.location.search}${newHash}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, []);

  // Handle initial page load with hash
  const handleInitialHash = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      // Scroll to the section from URL hash
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offsetPosition = element.offsetTop - offsetTop;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        setActiveSection(hash);
      }, 100);
    } else if (!hash && sectionIds.length > 0) {
      // If no hash, set the first section as active (usually 'about' or 'hero')
      const firstSection = sectionIds[0];
      setActiveSection(firstSection);
      updateUrlHash(firstSection);
    }
    setIsInitialized(true);
  }, [sectionIds, offsetTop, updateUrlHash]);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min((scrollTop / documentHeight) * 100, 100);
    setScrollProgress(progress);
  }, []);

  const updateSectionProgress = useCallback((entries) => {
    const newSectionProgress = {};
    
    entries.forEach(entry => {
      const sectionId = entry.target.id;
      const rect = entry.target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, -rect.top);
        const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const progress = Math.min((visibleHeight / rect.height) * 100, 100);
        
        newSectionProgress[sectionId] = progress;
      } else {
        newSectionProgress[sectionId] = 0;
      }
    });
    
    setSectionProgress(prev => ({ ...prev, ...newSectionProgress }));
  }, []);

  // Initialize on mount
  useEffect(() => {
    if (sectionIds.length > 0 && !isInitialized) {
      handleInitialHash();
    }
  }, [sectionIds, isInitialized, handleInitialHash]);

  // Handle browser back/forward navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionIds.includes(hash)) {
        const element = document.getElementById(hash);
        if (element) {
          const offsetPosition = element.offsetTop - offsetTop;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setActiveSection(hash);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [sectionIds, offsetTop]);

  useEffect(() => {
    const handleScroll = () => {
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress]);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        updateSectionProgress(entries);
        
        let maxRatio = 0;
        let currentActiveSection = '';

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            currentActiveSection = entry.target.id;
          }
        });

        // If no section is intersecting enough, find the closest one
        if (!currentActiveSection) {
          const scrollTop = window.pageYOffset + offsetTop;
          let closestSection = '';
          let minDistance = Infinity;

          sectionIds.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const elementTop = rect.top + window.pageYOffset;
              const distance = Math.abs(scrollTop - elementTop);
              
              if (distance < minDistance) {
                minDistance = distance;
                closestSection = sectionId;
              }
            }
          });
          
          currentActiveSection = closestSection;
        }

        if (currentActiveSection !== activeSection) {
          setActiveSection(currentActiveSection);
          // Update URL hash when section changes (only after initialization)
          if (isInitialized && currentActiveSection) {
            updateUrlHash(currentActiveSection);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observe all sections
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, activeSection, threshold, rootMargin, offsetTop, updateSectionProgress, isInitialized, updateUrlHash]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetPosition = element.offsetTop - offsetTop;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL hash when manually scrolling to section
      updateUrlHash(sectionId);
    }
  }, [offsetTop, updateUrlHash]);

  return {
    activeSection,
    scrollProgress,
    sectionProgress,
    scrollToSection
  };
};

export default useScrollSpy; 