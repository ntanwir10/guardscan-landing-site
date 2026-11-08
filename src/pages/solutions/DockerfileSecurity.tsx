import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  generateSoftwareApplicationSchema,
  generateHowToSchema,
  generateFAQSchema,
} from "@/lib/seo-schemas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Terminal,
  Zap,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DockerfileSecurity() {
  const howToSchema = generateHowToSchema(
    "How to Scan Dockerfiles for Security Vulnerabilities",
    "Step-by-step guide to scanning Dockerfiles for security issues with GuardScan",
    [
      {
        name: "Install GuardScan",
        text: "Install GuardScan globally using npm: npm install -g guardscan",
        url: "https://guardscancli.vercel.app/solutions/dockerfile-security",
      },
      {
        name: "Navigate to Your Project",
        text: "Change to your project directory containing the Dockerfile",
        url: "https://guardscancli.vercel.app/solutions/dockerfile-security",
      },
      {
        name: "Run Security Scan",
        text: "Execute: guardscan security to scan your Dockerfile for vulnerabilities",
        url: "https://guardscancli.vercel.app/solutions/dockerfile-security",
      },
      {
        name: "Review Results",
        text: "Check the detailed markdown report for security findings and recommendations",
        url: "https://guardscancli.vercel.app/solutions/dockerfile-security",
      },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: "What Dockerfile security issues does GuardScan detect?",
      answer:
        "GuardScan detects 15+ Dockerfile security issues including: running as root, exposed ports, hardcoded secrets, insecure base images, unnecessary privileges, missing health checks, and more.",
    },
    {
      question: "Is GuardScan free for Dockerfile scanning?",
      answer:
        "Yes, GuardScan is 100% free and open-source. There are no paid tiers or feature limitations for Dockerfile security scanning.",
    },
    {
      question: "Does GuardScan work offline for Docker scanning?",
      answer:
        "Yes, GuardScan runs completely locally on your machine and works 100% offline. No internet connection or code uploads required.",
    },
    {
      question: "How does GuardScan compare to Docker Scout or Snyk Container?",
      answer:
        "GuardScan is free and runs locally (no code uploads), while Docker Scout and Snyk Container require cloud connectivity. GuardScan focuses on Dockerfile best practices and security patterns.",
    },
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [generateSoftwareApplicationSchema(), howToSchema, faqSchema],
  };

  return (
    <>
      <SEO
        title="Dockerfile Security Scanner - Free & Local | GuardScan"
        description="Scan Dockerfiles for security vulnerabilities. 15+ automated checks including root users, exposed ports, secrets, and insecure configurations. 100% free, runs locally."
        canonical="https://guardscancli.vercel.app/solutions/dockerfile-security"
        keywords="dockerfile security, docker security scanner, container security scanning, dockerfile best practices, docker vulnerability scanner"
        structuredData={structuredData}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Dockerfile Security
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Secure Your Docker Containers{" "}
                  <span className="text-gradient">Automatically</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Scan Dockerfiles for security vulnerabilities before they
                  reach production. Detect exposed ports, root users, hardcoded
                  secrets, and 15+ security issues.
                  <strong className="text-foreground">
                    {" "}
                    Free, local, and takes 2 minutes to set up.
                  </strong>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8">
                    <a
                      href="https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started Free
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
            </div>
          </section>

          {/* Problem Statement */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  Why Dockerfile Security Matters
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <Card className="p-6">
                    <AlertTriangle className="w-10 h-10 text-destructive mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Common Vulnerabilities
                    </h3>
                    <p className="text-muted-foreground">
                      70% of container images have high or critical
                      vulnerabilities due to insecure Dockerfiles
                    </p>
                  </Card>

                  <Card className="p-6">
                    <Lock className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Attack Surface</h3>
                    <p className="text-muted-foreground">
                      Running as root, exposed ports, and unnecessary privileges
                      create easy attack vectors
                    </p>
                  </Card>

                  <Card className="p-6">
                    <Shield className="w-10 h-10 text-accent mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Production Impact
                    </h3>
                    <p className="text-muted-foreground">
                      Insecure containers can lead to data breaches,
                      unauthorized access, and compliance violations
                    </p>
                  </Card>
                </div>

                <div className="bg-card p-8 rounded-lg border">
                  <h3 className="text-2xl font-bold mb-4">
                    Real-World Dockerfile Security Issues
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Running as root:</strong> 60% of production
                        containers run with unnecessary root privileges
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Hardcoded secrets:</strong> API keys, passwords,
                        and tokens committed directly in Dockerfiles
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Insecure base images:</strong> Using outdated or
                        unverified base images with known vulnerabilities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Exposed ports:</strong> Unnecessarily exposing
                        internal services and databases to the network
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* What GuardScan Detects */}
          <section className="py-16 px-4">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                  15+ Dockerfile Security Checks
                </h2>
                <p className="text-xl text-muted-foreground mb-12 text-center">
                  GuardScan automatically detects common Dockerfile security
                  issues and best practice violations
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-bold mb-2">Privilege Issues</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Running as root user</li>
                      <li>• Missing USER instruction</li>
                      <li>• Unnecessary sudo usage</li>
                      <li>• Overly permissive file permissions</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-bold mb-2">
                      Secrets & Credentials
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Hardcoded passwords and API keys</li>
                      <li>• Exposed environment variables</li>
                      <li>• Secret files in image layers</li>
                      <li>• Credentials in build arguments</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-bold mb-2">Network & Ports</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Unnecessarily exposed ports</li>
                      <li>• Database ports exposed to network</li>
                      <li>• Missing firewall configurations</li>
                      <li>• Insecure protocol usage (HTTP vs HTTPS)</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-bold mb-2">
                      Base Images & Packages
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Using 'latest' tag (unpinned versions)</li>
                      <li>• Unverified base images</li>
                      <li>• Outdated package versions</li>
                      <li>• Unnecessary package installations</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-bold mb-2">Best Practices</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Missing HEALTHCHECK instruction</li>
                      <li>• No multi-stage builds</li>
                      <li>• Inefficient layer caching</li>
                      <li>• Missing metadata (LABEL)</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-bold mb-2">
                      Security Configurations
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Missing security options</li>
                      <li>• Insecure default configurations</li>
                      <li>• Unnecessary capabilities</li>
                      <li>• Missing resource limits</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Terminal className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      1. Install GuardScan
                    </h3>
                    <p className="text-muted-foreground">
                      One command to install globally
                    </p>
                    <code className="block mt-4 p-3 rounded bg-code-bg text-terminal-green font-mono text-sm">
                      npm install -g guardscan
                    </code>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      2. Run Security Scan
                    </h3>
                    <p className="text-muted-foreground">
                      Scan your Dockerfile in seconds
                    </p>
                    <code className="block mt-4 p-3 rounded bg-code-bg text-terminal-green font-mono text-sm">
                      guardscan security
                    </code>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">3. Fix Issues</h3>
                    <p className="text-muted-foreground">
                      Get detailed recommendations
                    </p>
                    <div className="mt-4 p-3 rounded bg-card border text-left text-sm">
                      ✓ Detailed markdown report
                      <br />
                      ✓ Severity levels
                      <br />✓ Fix recommendations
                    </div>
                  </div>
                </div>

                <Card className="p-6 bg-code-bg border-primary/20">
                  <h3 className="text-lg font-bold mb-3 text-terminal-green">
                    Example Output:
                  </h3>
                  <pre className="text-terminal-green font-mono text-sm overflow-x-auto">
                    {`🛡️  GuardScan Security Report

📋 Dockerfile Security Issues Found:

[CRITICAL] Running as root user
  Location: Dockerfile:15
  Issue: Container runs with root privileges
  Fix: Add USER instruction with non-root user
  
[HIGH] Hardcoded API key detected
  Location: Dockerfile:8
  Issue: ENV variable contains API key
  Fix: Use build secrets or runtime environment

[MEDIUM] Using 'latest' tag for base image
  Location: Dockerfile:1
  Issue: FROM node:latest is unpinned
  Fix: Use specific version like node:20.10.0`}
                  </pre>
                </Card>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 px-4">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Why Choose GuardScan for Docker Security?
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-xl font-bold mb-2">
                      100% Free Forever
                    </h3>
                    <p className="text-muted-foreground">
                      No paid tiers, no feature limitations. All Dockerfile
                      security checks included at zero cost.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-xl font-bold mb-2">Privacy-First</h3>
                    <p className="text-muted-foreground">
                      Runs 100% locally on your machine. Your Dockerfiles never
                      leave your computer.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-xl font-bold mb-2">Works Offline</h3>
                    <p className="text-muted-foreground">
                      No internet connection required. Perfect for air-gapped
                      environments and secure networks.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-xl font-bold mb-2">Fast Setup</h3>
                    <p className="text-muted-foreground">
                      Install and run your first scan in under 2 minutes. No
                      configuration needed.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-xl font-bold mb-2">
                      CI/CD Integration
                    </h3>
                    <p className="text-muted-foreground">
                      Easy integration with GitHub Actions, GitLab CI, Jenkins,
                      CircleCI, and more.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <CheckCircle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
                    <p className="text-muted-foreground">
                      Markdown reports with severity levels, exact locations,
                      and actionable fix recommendations.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  GuardScan vs Other Docker Security Tools
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-bold">Feature</th>
                        <th className="p-4 text-center font-bold text-primary">
                          GuardScan
                        </th>
                        <th className="p-4 text-center font-bold">
                          Docker Scout
                        </th>
                        <th className="p-4 text-center font-bold">
                          Snyk Container
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Pricing</td>
                        <td className="p-4 text-center font-semibold text-primary">
                          Free
                        </td>
                        <td className="p-4 text-center">$5-9/month</td>
                        <td className="p-4 text-center">$25+/month</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Privacy (Local Scanning)</td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <AlertTriangle className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <AlertTriangle className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Works Offline</td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <AlertTriangle className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <AlertTriangle className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Dockerfile Best Practices</td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Secrets Detection</td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center text-muted-foreground">
                          Limited
                        </td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Setup Time</td>
                        <td className="p-4 text-center font-semibold">
                          2 minutes
                        </td>
                        <td className="p-4 text-center">5-10 minutes</td>
                        <td className="p-4 text-center">10-15 minutes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section className="py-16 px-4">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Get Started in 2 Minutes
                </h2>

                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          Install GuardScan
                        </h3>
                        <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                          npm install -g guardscan
                        </code>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          Navigate to Your Project
                        </h3>
                        <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                          cd your-docker-project
                        </code>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          Run Security Scan
                        </h3>
                        <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                          guardscan security
                        </code>
                        <p className="text-muted-foreground mt-3">
                          GuardScan will automatically detect and scan your
                          Dockerfile, then generate a detailed security report.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                        4
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          Review & Fix Issues
                        </h3>
                        <p className="text-muted-foreground">
                          Check the markdown report (guardscan-report.md) for
                          detailed findings, severity levels, and fix
                          recommendations. Apply the suggested fixes to secure
                          your Dockerfile.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="mt-12 p-6 bg-accent/10 rounded-lg border border-accent/20">
                  <h3 className="text-xl font-bold mb-3">
                    💡 Pro Tip: Add Pre-Commit Hooks
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Automatically scan your Dockerfile before every commit:
                  </p>
                  <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                    guardscan install-hooks
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      What Dockerfile security issues does GuardScan detect?
                    </h3>
                    <p className="text-muted-foreground">
                      GuardScan detects 15+ Dockerfile security issues
                      including: running as root, exposed ports, hardcoded
                      secrets, insecure base images, unnecessary privileges,
                      missing health checks, unpinned versions, and more. Each
                      finding includes severity level and fix recommendations.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      Is GuardScan free for Dockerfile scanning?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes, GuardScan is 100% free and open-source. There are no
                      paid tiers, feature limitations, or hidden costs for
                      Dockerfile security scanning. All features are available
                      to everyone at zero cost.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      Does GuardScan work offline for Docker scanning?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes, GuardScan runs completely locally on your machine and
                      works 100% offline. No internet connection required, and
                      your Dockerfiles never leave your computer. Perfect for
                      air-gapped environments and secure networks.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      How does GuardScan compare to Docker Scout or Snyk
                      Container?
                    </h3>
                    <p className="text-muted-foreground">
                      GuardScan is free and runs locally (no code uploads),
                      while Docker Scout ($5-9/month) and Snyk Container
                      ($25+/month) require cloud connectivity. GuardScan focuses
                      on Dockerfile best practices and security patterns,
                      providing immediate feedback without external
                      dependencies.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      Can I integrate GuardScan into my CI/CD pipeline?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes! GuardScan integrates easily with GitHub Actions,
                      GitLab CI, Jenkins, CircleCI, and other CI/CD platforms.
                      Simply install GuardScan in your pipeline and run
                      'guardscan security --fail-on high' to block builds with
                      critical security issues.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      Does GuardScan scan container images or just Dockerfiles?
                    </h3>
                    <p className="text-muted-foreground">
                      GuardScan primarily scans Dockerfiles for security best
                      practices and configuration issues. For full container
                      image vulnerability scanning (including dependencies), use
                      GuardScan in combination with image scanning tools.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 px-4">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Secure Your Dockerfiles?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Start scanning in 2 minutes. Free forever, no registration
                  required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8">
                    <a
                      href="https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started Free
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-lg px-8"
                  >
                    <Link to="/blog/dockerfile-security-checklist">
                      Read the Guide
                    </Link>
                  </Button>
                </div>
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
                  <Link
                    to="/solutions/secrets-detection"
                    className="block group"
                  >
                    <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card text-left">
                      <div className="text-4xl mb-4">🔐</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        Secrets Detection
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Find and prevent API keys, passwords, and tokens from
                        leaking in your codebase.
                      </p>
                      <span className="text-primary text-sm font-medium">
                        Learn more →
                      </span>
                    </div>
                  </Link>

                  <Link
                    to="/solutions/offline-analysis"
                    className="block group"
                  >
                    <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card text-left">
                      <div className="text-4xl mb-4">✈️</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        Offline Analysis
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Complete security scanning for air-gapped environments.
                        Works 100% offline.
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
        </main>

        <Footer />
      </div>
    </>
  );
}
