/**
 * Google Analytics 4 Helper
 * Handles pageview tracking, custom events, and user interactions
 */

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "set",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track a pageview in GA4
 * @param path - The page path (e.g., "/about")
 * @param title - The page title
 */
export const trackPageView = (path: string, title: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
    });
  }
};

/**
 * Track custom events
 * @param eventName - Name of the event
 * @param parameters - Event parameters
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, parameters);
  }
};

/**
 * Track CTA button clicks
 * @param ctaName - Name/label of the CTA
 * @param ctaLocation - Where on the page the CTA is located
 * @param ctaUrl - Destination URL
 */
export const trackCTAClick = (
  ctaName: string,
  ctaLocation: string,
  ctaUrl?: string
) => {
  trackEvent("cta_click", {
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_url: ctaUrl,
  });
};

/**
 * Track external link clicks
 * @param url - The external URL
 * @param linkText - Text of the link
 */
export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent("external_link_click", {
    link_url: url,
    link_text: linkText,
    link_domain: new URL(url).hostname,
  });
};

/**
 * Track scroll depth
 * @param percentage - Scroll depth percentage (25, 50, 75, 100)
 */
export const trackScrollDepth = (percentage: number) => {
  trackEvent("scroll_depth", {
    scroll_percentage: percentage,
  });
};

/**
 * Track file downloads
 * @param fileName - Name of the file
 * @param fileType - Type of file (e.g., "pdf", "zip")
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
  });
};

/**
 * Track search queries
 * @param searchTerm - The search term
 */
export const trackSearch = (searchTerm: string) => {
  trackEvent("search", {
    search_term: searchTerm,
  });
};

/**
 * Track video interactions
 * @param action - Action taken (play, pause, complete)
 * @param videoTitle - Title of the video
 */
export const trackVideo = (action: string, videoTitle: string) => {
  trackEvent("video_" + action, {
    video_title: videoTitle,
  });
};

/**
 * Track form submissions
 * @param formName - Name of the form
 * @param formDestination - Where the form leads to
 */
export const trackFormSubmission = (
  formName: string,
  formDestination?: string
) => {
  trackEvent("form_submission", {
    form_name: formName,
    form_destination: formDestination,
  });
};

/**
 * Initialize scroll depth tracking
 * Automatically tracks when user scrolls to 25%, 50%, 75%, and 100%
 */
export const initScrollTracking = () => {
  const thresholds = [25, 50, 75, 100];
  const triggered = new Set<number>();

  const checkScrollDepth = () => {
    const scrollPercentage =
      ((window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight) *
      100;

    thresholds.forEach((threshold) => {
      if (scrollPercentage >= threshold && !triggered.has(threshold)) {
        triggered.add(threshold);
        trackScrollDepth(threshold);
      }
    });
  };

  window.addEventListener("scroll", checkScrollDepth, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener("scroll", checkScrollDepth);
  };
};
