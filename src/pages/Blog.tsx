import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    slug: "privacy-first-code-review",
    title: "Why Privacy-First Code Review Matters in 2025",
    description: "Explore how traditional code review tools compromise your intellectual property and why local-first analysis is the future of secure development.",
    category: "Privacy",
    date: "2025-01-15",
    readTime: "8 min read",
    image: "🔒",
    excerpt: "Every time you upload code to a third-party code review service, you're potentially exposing your company's intellectual property. Learn how GuardScan's privacy-first architecture protects your code while delivering enterprise-grade analysis."
  },
  {
    slug: "owasp-top-10-guide",
    title: "Complete Guide to OWASP Top 10 Vulnerabilities",
    category: "Security",
    description: "A comprehensive breakdown of the OWASP Top 10 security risks and how to detect them automatically in your codebase.",
    date: "2025-01-10",
    readTime: "12 min read",
    image: "🛡️",
    excerpt: "SQL injection, XSS, and broken authentication are just the tip of the iceberg. This guide walks through each OWASP Top 10 vulnerability with real-world code examples and automated detection strategies using GuardScan."
  },
  {
    slug: "ai-code-review-best-practices",
    title: "AI Code Review Best Practices: Beyond Basic Linting",
    category: "AI & Development",
    description: "Learn how to leverage AI-powered code review effectively without vendor lock-in. Compare GPT-4, Claude 3, and local models.",
    date: "2025-01-05",
    readTime: "10 min read",
    image: "🤖",
    excerpt: "Not all AI code reviewers are created equal. Discover how to choose the right AI provider for your needs, optimize token usage, and maintain privacy while getting context-aware suggestions that actually improve your code quality."
  },
  {
    slug: "secrets-detection-deep-dive",
    title: "Secrets Detection: Finding Hidden API Keys in Your Codebase",
    category: "Security",
    description: "Deep dive into secrets detection techniques, including entropy analysis, regex patterns, and Git history scanning.",
    date: "2024-12-28",
    readTime: "9 min read",
    image: "🔑",
    excerpt: "Hardcoded secrets are a ticking time bomb. Learn how GuardScan uses Shannon entropy, pattern matching, and Git history analysis to detect 20+ types of secrets including AWS keys, API tokens, private keys, and JWT tokens."
  },
  {
    slug: "dockerfile-security-checklist",
    title: "Dockerfile Security: 15 Essential Checks Every Developer Should Run",
    category: "DevOps",
    description: "A practical checklist for securing Docker containers, from base image selection to USER instruction best practices.",
    date: "2024-12-20",
    readTime: "7 min read",
    image: "🐳",
    excerpt: "Insecure Dockerfiles are a common attack vector. This checklist covers base image security, multi-stage builds, secret management, USER instructions, and vulnerability scanning to keep your containers secure."
  },
  {
    slug: "guardscan-quickstart",
    title: "GuardScan Quickstart: From Zero to First Scan in 2 Minutes",
    category: "Tutorial",
    description: "Step-by-step tutorial to install GuardScan, configure AI providers, and run your first comprehensive code review.",
    date: "2024-12-15",
    readTime: "5 min read",
    image: "⚡",
    excerpt: "Get started with GuardScan in under 2 minutes. This quickstart guide covers installation via npm, initialization, configuration, and running your first security scan with detailed markdown reports."
  },
  {
    slug: "local-ai-ollama-setup",
    title: "Running AI Code Review Completely Offline with Ollama",
    category: "Privacy",
    description: "Configure GuardScan to use local AI models with Ollama for 100% offline, privacy-preserving code analysis.",
    date: "2024-12-10",
    readTime: "11 min read",
    image: "🏠",
    excerpt: "Want AI-powered code review without sending code snippets to external APIs? Learn how to set up Ollama with llama2, codellama, or mistral models for completely offline AI analysis that respects your privacy."
  },
  {
    slug: "infrastructure-as-code-security",
    title: "Infrastructure as Code Security: Terraform & Kubernetes Scanning",
    category: "DevOps",
    description: "Secure your cloud infrastructure by detecting misconfigurations in Terraform and Kubernetes manifests.",
    date: "2024-12-05",
    readTime: "10 min read",
    image: "☁️",
    excerpt: "IaC misconfigurations can expose your entire infrastructure. Learn how to scan Terraform files for publicly accessible S3 buckets, overly permissive IAM roles, and Kubernetes security policies with GuardScan's IaC scanner."
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            GuardScan <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about code security, privacy-first development, AI-powered code review, 
            and best practices for building secure applications.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card 
                key={article.slug}
                className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-4xl">{article.image}</span>
                  </div>
                  <CardTitle className="text-xl mb-2 leading-tight">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm group"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Contribute?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We welcome guest posts about code security, privacy-first development, 
            and developer tools. Share your expertise with the community.
          </p>
          <a
            href="mailto:blog@guardscan.dev"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-colors"
          >
            Submit a Guest Post
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
