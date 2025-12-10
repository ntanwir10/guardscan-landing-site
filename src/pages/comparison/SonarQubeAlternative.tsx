import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  generateProductComparisonSchema,
  generateFAQSchema,
} from "@/lib/seo-schemas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Check,
  X,
  ArrowRight,
  Shield,
  DollarSign,
  Code,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SonarQubeAlternative() {
  const comparisonSchema = generateProductComparisonSchema(
    "GuardScan",
    "SonarQube",
    "Compare GuardScan and SonarQube: privacy-first code review vs enterprise code quality platform"
  );

  const faqSchema = generateFAQSchema([
    {
      question: "What is the main difference between GuardScan and SonarQube?",
      answer:
        "GuardScan runs 100% locally on your machine with no code uploads required, while SonarQube typically requires a server setup and code analysis happens on that server. GuardScan is free and open-source, while SonarQube has paid tiers starting at $150/month for teams.",
    },
    {
      question: "Is GuardScan free like SonarQube Community Edition?",
      answer:
        "Yes, GuardScan is 100% free and open-source with no paid tiers. Unlike SonarQube Community Edition which has feature limitations, GuardScan includes all features including AI-powered review (bring your own API key), secrets detection, and OWASP Top 10 coverage.",
    },
    {
      question: "Can GuardScan work offline like SonarQube?",
      answer:
        "Yes, GuardScan's security scanning works completely offline. SonarQube requires server infrastructure and typically needs internet connectivity for updates and license management. GuardScan can even run AI code review offline using Ollama with local models.",
    },
    {
      question: "How does GuardScan compare to SonarQube for enterprise use?",
      answer:
        "For enterprises prioritizing privacy and cost, GuardScan excels with local analysis and zero licensing costs. SonarQube offers advanced team features, quality gates, and extensive integrations but requires significant infrastructure and costs $30K+/year for enterprise plans.",
    },
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [comparisonSchema, faqSchema],
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="GuardScan vs SonarQube: Privacy-First Alternative for Code Quality"
        description="Compare GuardScan and SonarQube for code security scanning. GuardScan offers 100% local analysis, privacy-first architecture, and zero cost vs SonarQube's server-based approach."
        canonical="https://guardscancli.com/comparison/sonarqube-alternative"
        keywords="sonarqube alternative, guardscan vs sonarqube, privacy-first code quality, local code analysis, free sonarqube alternative, SAST tool comparison"
        structuredData={structuredData}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              GuardScan vs SonarQube:{" "}
              <span className="text-gradient">Privacy-First Alternative</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Looking for a SonarQube alternative that respects your privacy?
              GuardScan runs 100% locally with no server setup required, zero
              licensing costs, and complete offline capability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* GuardScan Card */}
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary shadow-lg">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🛡️</div>
                <h2 className="text-3xl font-bold">GuardScan</h2>
                <p className="text-2xl font-bold text-primary mt-2">
                  100% Free
                </p>
                <p className="text-sm text-muted-foreground">Open Source</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Runs locally on your machine</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>No server setup required</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Works completely offline</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Zero licensing costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Multi-AI provider support</span>
                </li>
              </ul>
            </Card>

            {/* SonarQube Card */}
            <Card className="p-8 bg-card/50 border-border">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-3xl font-bold">SonarQube</h2>
                <p className="text-2xl font-bold mt-2">$150-$30K+/year</p>
                <p className="text-sm text-muted-foreground">
                  Enterprise Plans
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Requires server infrastructure
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Complex setup and maintenance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Code analyzed on server
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Free Community Edition (limited)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Extensive integrations</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Differences */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Key <span className="text-gradient">Differences</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Privacy</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">GuardScan:</strong> Code
                never leaves your machine
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">SonarQube:</strong> Requires
                server upload
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Cost</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">GuardScan:</strong> $0
                forever
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">SonarQube:</strong> $150/mo
                - $30K+/year
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Setup</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">GuardScan:</strong> npm
                install, done
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">SonarQube:</strong> Server
                setup required
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">AI Features</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">GuardScan:</strong> Multi-AI
                + local models
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">SonarQube:</strong> Limited
                AI features
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Feature <span className="text-gradient">Comparison</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-bold text-lg">Feature</th>
                  <th className="p-4 text-center font-bold text-primary">
                    GuardScan
                  </th>
                  <th className="p-4 text-center font-bold">SonarQube</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-4">Pricing (Team)</td>
                  <td className="p-4 text-center font-semibold text-primary">
                    Free
                  </td>
                  <td className="p-4 text-center">$150/month</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Local/Offline Analysis</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Privacy-First Architecture</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Security Scanning</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Secrets Detection</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center text-muted-foreground">
                    Limited
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">AI Code Review</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center text-muted-foreground">
                    Limited
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Multi-AI Provider Support</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Setup Time</td>
                  <td className="p-4 text-center font-semibold">2 minutes</td>
                  <td className="p-4 text-center">Hours to days</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Server Requirements</td>
                  <td className="p-4 text-center font-semibold">None</td>
                  <td className="p-4 text-center">Required</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Quality Gates</td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">CI/CD Integration</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Pricing verified as of December 2024. Check official websites for
              current pricing.
            </p>
            <p className="mt-2">
              SonarQube pricing:{" "}
              <a
                href="https://www.sonarsource.com/plans-and-pricing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Official Pricing
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* When to Choose */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Which Should You Choose?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-primary/50">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Choose GuardScan if you:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Need privacy-first code analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Want zero licensing costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Require offline capability</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Want to avoid server maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Need multi-AI provider flexibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Work with sensitive/proprietary code</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Choose SonarQube if you:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Need quality gates and governance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Have budget for enterprise tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Want centralized analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Need extensive language support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Require historical trend analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Want enterprise support contracts</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Migration Guide */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Migrating from SonarQube to GuardScan
          </h2>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-primary">1.</span> Install GuardScan
                </h3>
                <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                  npm install -g guardscan
                </code>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-primary">2.</span> Initialize in Your
                  Project
                </h3>
                <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                  cd your-project && guardscan init
                </code>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-primary">3.</span> Run Your First Scan
                </h3>
                <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                  guardscan security
                </code>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-primary">4.</span> Review Results
                </h3>
                <p className="text-muted-foreground">
                  GuardScan generates detailed Markdown reports with severity
                  levels, file references, and actionable recommendations.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">
                What is the main difference between GuardScan and SonarQube?
              </h3>
              <p className="text-muted-foreground">
                GuardScan runs 100% locally on your machine with no code uploads
                required, while SonarQube typically requires a server setup and
                code analysis happens on that server. GuardScan is free and
                open-source, while SonarQube has paid tiers starting at
                $150/month for teams.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">
                Is GuardScan free like SonarQube Community Edition?
              </h3>
              <p className="text-muted-foreground">
                Yes, GuardScan is 100% free and open-source with no paid tiers.
                Unlike SonarQube Community Edition which has feature
                limitations, GuardScan includes all features including
                AI-powered review (bring your own API key), secrets detection,
                and OWASP Top 10 coverage.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">
                Can GuardScan work offline like SonarQube?
              </h3>
              <p className="text-muted-foreground">
                Yes, GuardScan's security scanning works completely offline.
                SonarQube requires server infrastructure and typically needs
                internet connectivity for updates and license management.
                GuardScan can even run AI code review offline using Ollama with
                local models.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">
                How does GuardScan compare to SonarQube for enterprise use?
              </h3>
              <p className="text-muted-foreground">
                For enterprises prioritizing privacy and cost, GuardScan excels
                with local analysis and zero licensing costs. SonarQube offers
                advanced team features, quality gates, and extensive
                integrations but requires significant infrastructure and costs
                $30K+/year for enterprise plans.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Try GuardScan?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started in under 2 minutes. No server setup, no licensing costs,
            and your code never leaves your machine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <a
                href="https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8"
            >
              <Link to="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
