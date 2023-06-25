import { useState, useEffect } from "react";

export const useViewport = () => {
  const [viewportSize, setViewportSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });
  const [isViewportLoading, setIsViewportLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;

      // Define breakpoints for mobile, tablet, and desktop sizes
      const mobileBreakpoint = 768;
      const tabletBreakpoint = 1024;

      // Update the viewport size state based on the current window width
      setViewportSize({
        isMobile: innerWidth < mobileBreakpoint,
        isTablet:
          innerWidth >= mobileBreakpoint && innerWidth < tabletBreakpoint,
        isDesktop: innerWidth >= tabletBreakpoint,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the resize handler initially
    handleResize();

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      !viewportSize.isDesktop &&
      !viewportSize.isMobile &&
      !viewportSize.isTablet
    ) {
      return;
    }
    setIsViewportLoading(false);
  }, [viewportSize]);

  return { ...viewportSize, isViewportLoading };
};
