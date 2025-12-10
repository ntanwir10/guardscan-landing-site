import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Check,
  ArrowRight,
  Key,
  Shield,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SecretsDetection() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Secrets Detection - Find API Keys & Passwords in Your Codebase"
        description="Detect hardcoded API keys, passwords, tokens, and secrets in your source code with GuardScan. Supports 20+ secret patterns with local, privacy-first analysis."
        canonical="https://guardscancli.com/solutions/secrets-detection"
        keywords="secrets detection, API keys scanner, password detection, token scanner, credentials scanner, hardcoded secrets, security scanning, find api keys in code"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-destructive/30 backdrop-blur-sm mb-8">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium">
              83% of data breaches involve hardcoded secrets
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find <span className="text-gradient">Hidden Secrets</span> Before
            Attackers Do
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Detect hardcoded API keys, passwords, tokens, and credentials in
            your source code with GuardScan's privacy-first secrets detection.
            Scans locally with zero code uploads.
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

      {/* What We Detect */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Types of <span className="text-gradient">Secrets Detected</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-6 h-6 text-primary" />
                <h3 className="font-bold">API Keys</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>AWS Access Keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Google Cloud API Keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Stripe API Keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>SendGrid Keys</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h3 className="font-bold">Tokens</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>GitHub Personal Tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>OAuth Tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>JWT Secrets</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Slack Tokens</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-6 h-6 text-primary" />
                <h3 className="font-bold">Credentials</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Database Passwords</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Connection Strings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>SSH Private Keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Basic Auth Credentials</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="font-bold">Encryption Keys</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>RSA Private Keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>PGP Keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>SSL Certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Encryption Secrets</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground">
              And{" "}
              <strong className="text-foreground">
                20+ more secret patterns
              </strong>{" "}
              including Azure keys, Twilio secrets, Mailgun keys, and custom
              patterns
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            How Secrets Detection <span className="text-gradient">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Pattern Matching</h3>
              <p className="text-muted-foreground">
                Uses regex patterns to identify known secret formats like AWS
                keys (AKIA...), GitHub tokens (gh[ps]_...), and more.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Entropy Analysis</h3>
              <p className="text-muted-foreground">
                Calculates Shannon entropy to detect high-randomness strings
                that likely contain secrets, even without known patterns.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Context-Aware</h3>
              <p className="text-muted-foreground">
                Analyzes variable names and surrounding code to reduce false
                positives and identify suspicious values.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Get Started in <span className="text-gradient">2 Minutes</span>
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
                  <span className="text-primary">2.</span> Run Secrets Scan
                </h3>
                <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                  cd your-project && guardscan security
                </code>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-primary">3.</span> Review Results
                </h3>
                <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                  cat guardscan-report.md
                </code>
                <p className="text-muted-foreground mt-2">
                  Get detailed reports with file locations, line numbers, and
                  severity levels for every secret found.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Why GuardScan */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose GuardScan for{" "}
            <span className="text-gradient">Secrets Detection</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg">100% Privacy-First</h3>
              </div>
              <p className="text-muted-foreground">
                Your code never leaves your machine. All scanning happens
                locally with zero code uploads to external servers.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg">Works Completely Offline</h3>
              </div>
              <p className="text-muted-foreground">
                No internet required. Scan in air-gapped environments, on
                planes, or anywhere without connectivity.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg">20+ Secret Patterns</h3>
              </div>
              <p className="text-muted-foreground">
                Detects AWS keys, GitHub tokens, API keys, database credentials,
                private keys, and many more secret types.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Check className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg">100% Free & Open Source</h3>
              </div>
              <p className="text-muted-foreground">
                No licensing costs, no scan limits, no paid tiers. Free forever
                with all features included.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Hidden Secrets Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait for a security breach. Start scanning for hardcoded
            secrets in your codebase right now.
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
              <Link to="/blog/secrets-detection-deep-dive">
                Read Deep Dive Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Explore More GuardScan Solutions
            </h2>
            <p className="text-muted-foreground mb-12">
              Comprehensive security for all your development needs
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/solutions/dockerfile-security" className="block group">
                <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card text-left">
                  <div className="text-4xl mb-4">🐳</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Dockerfile Security
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Scan Docker containers for 15+ security issues. Detect root
                    users, exposed ports, and insecure configurations.
                  </p>
                  <span className="text-primary text-sm font-medium">
                    Learn more →
                  </span>
                </div>
              </Link>

              <Link to="/solutions/offline-analysis" className="block group">
                <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card text-left">
                  <div className="text-4xl mb-4">✈️</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Offline Analysis
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Complete security scanning for air-gapped environments.
                    Works 100% offline with no internet required.
                  </p>
                  <span className="text-primary text-sm font-medium">
                    Learn more →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
