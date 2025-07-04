import { useEffect } from 'react';

const SafariBackgroundFix = () => {
  useEffect(() => {
    // Function to apply pure black background using JavaScript inline styles
    // This works because inline styles have higher specificity than CSS rules
    const applyPureBlackBackground = () => {
      // Apply to document root elements
      document.documentElement.style.backgroundColor = '#000000';
      document.body.style.backgroundColor = '#000000';

      // Apply theme color for Safari mobile
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.content = '#000000';
      }

      // Apply overscroll behavior (though Safari may ignore it)
      document.body.style.overscrollBehaviorY = 'none';
      document.documentElement.style.overscrollBehaviorY = 'none';

      // Set extended height for seamless overscroll experience
      document.body.style.minHeight = '300vh';
    };

    // Apply immediately
    applyPureBlackBackground();

    // Also apply after a short delay to ensure it sticks
    const timeoutId = setTimeout(applyPureBlackBackground, 100);

    // Apply on window load to override any other scripts
    const handleLoad = () => applyPureBlackBackground();
    window.addEventListener('load', handleLoad);

    // Apply on resize/orientation change for mobile
    const handleResize = () => applyPureBlackBackground();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default SafariBackgroundFix;
