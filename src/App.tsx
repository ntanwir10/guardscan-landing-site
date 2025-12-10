import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import Index from "./pages/Index";
import HowItWorksPage from "./pages/HowItWorksPage";
import Comparison from "./pages/Comparison";
import SonarQubeAlternative from "./pages/comparison/SonarQubeAlternative";
import SnykAlternative from "./pages/comparison/SnykAlternative";
import CodeClimateAlternative from "./pages/comparison/CodeClimateAlternative";
import SecretsDetection from "./pages/solutions/SecretsDetection";
import DockerfileSecurity from "./pages/solutions/DockerfileSecurity";
import OfflineAnalysis from "./pages/solutions/OfflineAnalysis";
import Documentation from "./pages/Documentation";
import Features from "./pages/Features";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
    },
  },
});

// Analytics wrapper component to track route changes
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track pageview on route change
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route
            path="/comparison/sonarqube-alternative"
            element={<SonarQubeAlternative />}
          />
          <Route
            path="/comparison/snyk-alternative"
            element={<SnykAlternative />}
          />
          <Route
            path="/comparison/codeclimate-alternative"
            element={<CodeClimateAlternative />}
          />
          <Route
            path="/solutions/secrets-detection"
            element={<SecretsDetection />}
          />
          <Route
            path="/solutions/dockerfile-security"
            element={<DockerfileSecurity />}
          />
          <Route
            path="/solutions/offline-analysis"
            element={<OfflineAnalysis />}
          />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/features" element={<Features />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
