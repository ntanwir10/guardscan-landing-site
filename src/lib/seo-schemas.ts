/**
 * SEO Schema Helpers
 * Generates structured data (JSON-LD) for various schema.org types
 */

/**
 * Helper function to generate Organization structured data
 */
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GuardScan",
  url: "https://guardscancli.vercel.app",
  logo: "https://guardscancli.vercel.app/web-app-manifest-512x512.png",
  description:
    "Privacy-first AI code review tool that runs locally on your machine. Free, open source, and static analysis works offline.",
  sameAs: ["https://github.com/ntanwir10/GuardScan"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Technical Support",
    url: "https://github.com/ntanwir10/GuardScan/issues",
  },
});

/**
 * Helper function to generate SoftwareApplication structured data
 */
export const generateSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GuardScan",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "AI code review that never sees your code. GuardScan runs locally with no server and never uploads your code; static analysis works offline, and AI review is optional with your own provider key or a local model. Free and open source.",
  softwareVersion: "1.1.0",
  downloadUrl: "https://github.com/ntanwir10/GuardScan",
  installUrl: "https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md",
  screenshot: "https://guardscancli.vercel.app/opengraph-image.png",
  featureList: [
    "Privacy-first code review",
    "Offline security scanning",
    "Multi-AI provider support",
    "Secrets detection",
    "OWASP Top 10 coverage",
    "Dockerfile security scanning",
    "Zero cost with local AI",
  ],
});

/**
 * Helper function to generate BreadcrumbList structured data
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * Helper function to generate HowTo structured data
 */
export const generateHowToSchema = (
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; url?: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: name,
  description: description,
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
    url: step.url,
  })),
});

/**
 * Helper function to generate FAQPage structured data
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

/**
 * Helper function to generate Product comparison structured data
 */
export const generateProductComparisonSchema = (
  productName: string,
  competitorName: string,
  description: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${productName} vs ${competitorName}`,
  description: description,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Product",
        name: productName,
        description: "Privacy-first AI code review tool",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Product",
        name: competitorName,
        description: `Alternative code review tool`,
      },
    ],
  },
});
