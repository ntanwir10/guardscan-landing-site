import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
}

/**
 * SEO Component - Handles all meta tags, Open Graph, Twitter Cards, and Structured Data
 * Ensures consistent SEO across all pages with canonical URLs and proper meta tags
 */
export const SEO = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "https://guardscancli.vercel.app/og-image.png",
  twitterCard = "summary_large_image",
  keywords,
  author = "GuardScan",
  publishedTime,
  modifiedTime,
  structuredData,
  noindex = false,
}: SEOProps) => {
  // Construct full title with branding
  const fullTitle = title.includes("GuardScan")
    ? title
    : `${title} | GuardScan - Privacy-First AI Code Review`;

  // Default canonical to current page if not provided
  const canonicalUrl =
    canonical || `https://guardscancli.vercel.app${window.location.pathname}`;

  // Default keywords if not provided
  const defaultKeywords =
    "code review, security scanning, SAST, static analysis, secrets detection, privacy-first, offline code analysis, AI code review, developer tools";
  const metaKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="GuardScan" />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
