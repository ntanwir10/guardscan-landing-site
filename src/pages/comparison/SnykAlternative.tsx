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

export default function SnykAlternative() {
  const comparisonSchema = generateProductComparisonSchema(
    "GuardScan",
    "Snyk",
    "Compare GuardScan and Snyk: privacy-first code security vs cloud-based vulnerability management"
  );

  const faqSchema = generateFAQSchema([
    {
      question: "How does GuardScan differ from Snyk?",
      answer:
        "GuardScan runs 100% locally on your machine with complete privacy, while Snyk requires uploading code for cloud-based analysis. GuardScan is free and open-source, while Snyk is a commercial product with a limited free tier.",
    },
    {
      question: "Does GuardScan scan dependencies like Snyk?",
      answer:
        "Yes, GuardScan scans dependencies for vulnerabilities across npm, pip, Maven, and Cargo packages - all locally without uploading package data to external servers.",
    },
    {
      question: "Is GuardScan truly free compared to Snyk?",
      answer:
        "Yes, GuardScan is 100% free and open-source with no scan limits, no seat limits, and no paid tiers. Snyk's free tier has significant scan limitations and its full feature set requires a paid plan.",
    },
    {
      question: "Can GuardScan work without internet like Snyk?",
      answer:
        "Yes, GuardScan works completely offline for security scanning. Snyk requires internet connectivity for vulnerability database access and cloud-based analysis. GuardScan can even run AI features offline using local models with Ollama.",
    },
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [comparisonSchema, faqSchema],
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="GuardScan vs Snyk: Privacy-First Alternative for Dependency Scanning"
        description="Compare GuardScan and Snyk for security scanning. GuardScan offers 100% local analysis, unlimited scans, and zero cost vs Snyk's cloud-based commercial approach."
        canonical="https://guardscancli.vercel.app/comparison/snyk-alternative"
        keywords="snyk alternative, guardscan vs snyk, privacy-first security scanning, local dependency scanning, free snyk alternative, vulnerability scanner comparison"
        structuredData={structuredData}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              GuardScan vs Snyk:{" "}
              <span className="text-gradient">Privacy-First Alternative</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Looking for a Snyk alternative that protects your privacy?
              GuardScan scans dependencies and code locally with unlimited
              scans, zero licensing costs, and complete offline capability.
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
                <p className="text-sm text-muted-foreground">Unlimited Scans</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Runs locally on your machine</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>No code upload required</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Unlimited scans per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Zero licensing costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Works completely offline</span>
                </li>
              </ul>
            </Card>

            {/* Snyk Card */}
            <Card className="p-8 bg-card/50 border-border">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🔐</div>
                <h2 className="text-3xl font-bold">Snyk</h2>
                <p className="text-2xl font-bold mt-2">Commercial plans</p>
                <p className="text-sm text-muted-foreground">
                  Team & Enterprise Plans
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Cloud-based analysis only
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Limited scans on free tier
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Per-developer pricing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Extensive vulnerability database</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Auto-fix pull requests</span>
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
                <strong className="text-foreground">GuardScan:</strong> 100%
                local analysis
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Snyk:</strong> Cloud-based
                upload
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
                <strong className="text-foreground">Snyk:</strong>{" "}
                Free tier with limits; paid plans (see vendor)
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Scan Limits</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">GuardScan:</strong>{" "}
                Unlimited
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Snyk:</strong> Limited on
                free tier
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Offline Mode</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">GuardScan:</strong> Full
                support
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Snyk:</strong> Not available
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
                  <th className="p-4 text-center font-bold">Snyk</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-4">Pricing (Team of 10)</td>
                  <td className="p-4 text-center font-semibold text-primary">
                    Free
                  </td>
                  <td className="p-4 text-center">Paid plans (see vendor)</td>
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
                  <td className="p-4">Unlimited Scans</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center text-muted-foreground">
                    Limited (free)
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Dependency Scanning</td>
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
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">SAST Code Scanning</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Container Scanning</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
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
                  <td className="p-4">Privacy-First Architecture</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">Auto-fix PRs</td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4">License Compliance</td>
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
              Snyk pricing:{" "}
              <a
                href="https://snyk.io/plans/"
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
                  <span>Need privacy-first security scanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Want unlimited scans at zero cost</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Require complete offline capability</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Work with sensitive/proprietary code</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Need multi-AI provider flexibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Want simple CLI-first workflow</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">Choose Snyk if you:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Need auto-fix pull requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Want cloud-based dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Have budget for commercial tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Need comprehensive reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Want enterprise support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Require policy enforcement</span>
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
            Migrating from Snyk to GuardScan
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
                  <span className="text-primary">3.</span> Run Security Scan
                </h3>
                <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                  guardscan security
                </code>
                <p className="text-muted-foreground mt-2">
                  Scans for vulnerabilities, secrets, and OWASP Top 10 issues -
                  all locally.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-primary">4.</span> Review Results
                </h3>
                <p className="text-muted-foreground">
                  GuardScan generates detailed Markdown reports with severity
                  levels and actionable recommendations. No cloud dashboard
                  needed - everything is local.
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
                How does GuardScan differ from Snyk?
              </h3>
              <p className="text-muted-foreground">
                GuardScan runs 100% locally on your machine with complete
                privacy, while Snyk requires uploading code for cloud-based
                analysis. GuardScan is free and open-source, while Snyk is a
                commercial product with a limited free tier.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">
                Does GuardScan scan dependencies like Snyk?
              </h3>
              <p className="text-muted-foreground">
                Yes, GuardScan scans dependencies for vulnerabilities across
                npm, pip, Maven, and Cargo packages - all locally without
                uploading package data to external servers.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">
                Is GuardScan truly free compared to Snyk?
              </h3>
              <p className="text-muted-foreground">
                Yes, GuardScan is 100% free and open-source with no scan limits,
                no seat limits, and no paid tiers. Snyk's free tier has
                significant scan limitations and its full feature set requires a paid plan.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">
                Can GuardScan work without internet like Snyk?
              </h3>
              <p className="text-muted-foreground">
                Yes, GuardScan works completely offline for security scanning.
                Snyk requires internet connectivity for vulnerability database
                access and cloud-based analysis. GuardScan can even run AI
                features offline using local models with Ollama.
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
            Start scanning in under 2 minutes. Unlimited scans, zero costs,
            complete privacy.
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
