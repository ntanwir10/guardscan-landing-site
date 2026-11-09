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
  Wifi,
  WifiOff,
  Lock,
  Globe,
  Server,
  Terminal,
  Zap,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function OfflineAnalysis() {
  const howToSchema = generateHowToSchema(
    "How to Run Code Security Scanning Completely Offline",
    "Step-by-step guide to performing security analysis without internet connectivity using GuardScan",
    [
      {
        name: "Install GuardScan",
        text: "Install GuardScan globally: npm install -g guardscan",
        url: "https://guardscancli.vercel.app/solutions/offline-analysis",
      },
      {
        name: "Run Security Scan Offline",
        text: "Execute: guardscan security (no internet required)",
        url: "https://guardscancli.vercel.app/solutions/offline-analysis",
      },
      {
        name: "Optional: Set Up Offline AI",
        text: "Install Ollama for AI code review: curl -fsSL https://ollama.com/install.sh | sh",
        url: "https://guardscancli.vercel.app/solutions/offline-analysis",
      },
      {
        name: "Review Security Findings",
        text: "Check the generated markdown report with all security findings",
        url: "https://guardscancli.vercel.app/solutions/offline-analysis",
      },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: "Does GuardScan really work 100% offline?",
      answer:
        "Yes, GuardScan performs all security scanning, secrets detection, and code quality analysis completely offline. No internet connection required. Even AI code review works offline when using Ollama with local models.",
    },
    {
      question: "What security features work without internet?",
      answer:
        "All security features work offline: secrets detection (20+ types), OWASP Top 10 scanning, code quality analysis, Dockerfile security, dependency vulnerability scanning, and AI code review (with Ollama).",
    },
    {
      question: "Is offline scanning suitable for enterprise/government use?",
      answer:
        "Yes, GuardScan is perfect for air-gapped environments, classified systems, and regulated industries. Because source code is never uploaded, it fits policies that restrict where code may be processed (data residency). GuardScan itself is not a compliance certification.",
    },
    {
      question: "How do I update GuardScan in an air-gapped environment?",
      answer:
        "Download GuardScan and its dependencies on an internet-connected machine, transfer via approved media (USB, internal network), then install offline. Security signatures can be updated similarly when online access is available.",
    },
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [generateSoftwareApplicationSchema(), howToSchema, faqSchema],
  };

  return (
    <>
      <SEO
        title="Offline Code Security Scanning | GuardScan - Air-Gapped Ready"
        description="Security scanning for air-gapped environments. Works 100% offline with no internet required. Perfect for government, military, finance, healthcare. Free and local."
        canonical="https://guardscancli.vercel.app/solutions/offline-analysis"
        keywords="offline code analysis, air-gapped security, offline security scanning, privacy-first code review, local code analysis, no internet code scanner"
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
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm font-medium">100% Offline</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Code Security for{" "}
                  <span className="text-gradient">Air-Gapped Environments</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Comprehensive security scanning without internet connectivity.
                  Perfect for military, government, finance, and healthcare
                  systems.
                  <strong className="text-foreground">
                    {" "}
                    Works 100% offline with no data transmission.
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

          {/* Use Cases */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                  Who Needs Offline Security Scanning?
                </h2>
                <p className="text-xl text-muted-foreground mb-12 text-center">
                  Organizations that require complete data isolation and privacy
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <Building2 className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Military & Government
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Classified systems and defense contractors require
                      air-gapped security analysis
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Classified code repositories</li>
                      <li>• Defense applications</li>
                      <li>• National security systems</li>
                      <li>• Intelligence operations</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Lock className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Financial Institutions
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Banks and trading firms with strict data isolation
                      policies
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Banking systems (PCI-DSS)</li>
                      <li>• Trading platforms</li>
                      <li>• Payment processors</li>
                      <li>• Cryptocurrency exchanges</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Shield className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Healthcare Organizations
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Strict data-control policies often forbid sending code to third parties
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Electronic health records (EHR)</li>
                      <li>• Medical devices</li>
                      <li>• Patient data systems</li>
                      <li>• Telemedicine platforms</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Server className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Industrial Control Systems
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      SCADA and critical infrastructure need isolated security
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• SCADA systems</li>
                      <li>• Power grid control</li>
                      <li>• Manufacturing automation</li>
                      <li>• Water treatment facilities</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Globe className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Privacy-Conscious Teams
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Startups and enterprises protecting intellectual property
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Proprietary algorithms</li>
                      <li>• Trade secrets</li>
                      <li>• Pre-release products</li>
                      <li>• Competitive advantage code</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Wifi className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Remote & Travel Work
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Developers working in areas with limited or no
                      connectivity
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Remote locations</li>
                      <li>• International travel</li>
                      <li>• Unstable networks</li>
                      <li>• Offline development</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* What Works Offline */}
          <section className="py-16 px-4">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                  Full Security Suite - No Internet Required
                </h2>
                <p className="text-xl text-muted-foreground mb-12 text-center">
                  Every GuardScan feature works completely offline
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 border-primary/50">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Security Scanning (100% Offline)
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• OWASP Top 10 vulnerability detection</li>
                          <li>• SQL injection, XSS, CSRF scanning</li>
                          <li>• Security best practices checks</li>
                          <li>• Code quality analysis</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-primary/50">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Secrets Detection (100% Offline)
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• 20+ credential type detection</li>
                          <li>• AWS, Azure, GCP keys</li>
                          <li>• API tokens and passwords</li>
                          <li>• High entropy analysis</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-primary/50">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Dockerfile Scanning (100% Offline)
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• 15+ Docker security checks</li>
                          <li>• Base image validation</li>
                          <li>• Privilege escalation detection</li>
                          <li>• Best practices enforcement</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-primary/50">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          AI Code Review (Offline with Ollama)
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Local AI models (Ollama)</li>
                          <li>• CodeLlama, Llama 2, Mistral</li>
                          <li>• Context-aware suggestions</li>
                          <li>• No API key required</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-primary/50">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Pre-Commit Hooks (100% Offline)
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Automatic pre-commit scanning</li>
                          <li>• Blocks commits with secrets</li>
                          <li>• No external dependencies</li>
                          <li>• Works in air-gapped Git</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-primary/50">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Detailed Reports (100% Offline)
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Markdown report generation</li>
                          <li>• JSON export for automation</li>
                          <li>• HTML reports (coming soon)</li>
                          <li>• No cloud upload required</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="mt-12 p-6 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-start gap-3">
                    <WifiOff className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Zero Internet Dependency
                      </h3>
                      <p className="text-muted-foreground">
                        GuardScan never makes outbound network connections. All
                        processing happens locally on your machine. Your code,
                        your network, your control.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  How Offline Scanning Works
                </h2>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Terminal className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">1. Install Once</h3>
                    <p className="text-muted-foreground">
                      Install GuardScan on your offline machine
                    </p>
                    <code className="block mt-4 p-3 rounded bg-code-bg text-terminal-green font-mono text-sm">
                      npm install -g guardscan
                    </code>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">2. Scan Anytime</h3>
                    <p className="text-muted-foreground">
                      Run security scans without internet
                    </p>
                    <code className="block mt-4 p-3 rounded bg-code-bg text-terminal-green font-mono text-sm">
                      guardscan security
                    </code>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">3. Stay Secure</h3>
                    <p className="text-muted-foreground">
                      Complete security analysis locally
                    </p>
                    <div className="mt-4 p-3 rounded bg-card border text-left text-sm">
                      ✓ All features work offline
                      <br />
                      ✓ No data transmission
                      <br />✓ Complete privacy
                    </div>
                  </div>
                </div>

                <Card className="p-6 bg-code-bg border-primary/20">
                  <h3 className="text-lg font-bold mb-3 text-terminal-green">
                    Example: Offline Security Scan
                  </h3>
                  <pre className="text-terminal-green font-mono text-sm overflow-x-auto">
                    {`$ guardscan security
🛡️  GuardScan v1.1.0 (Offline Mode)

✓ Network: Disconnected
✓ Privacy: 100% Local Processing
✓ Analyzing 247 files...

📋 Security Scan Complete (Offline):

✓ Secrets Detection: 2 API keys found
✓ OWASP Top 10: 5 vulnerabilities detected
✓ Code Quality: 12 issues found
✓ Dockerfile: 3 security concerns

📄 Full report: guardscan-report.md
⏱️  Scan completed in 1.8 seconds`}
                  </pre>
                </Card>
              </div>
            </div>
          </section>

          {/* Offline AI Setup */}
          <section className="py-16 px-4">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                  AI Code Review - Completely Offline
                </h2>
                <p className="text-xl text-muted-foreground mb-12 text-center">
                  Use Ollama to run AI models locally without internet
                </p>

                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          Install Ollama
                        </h3>
                        <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                          curl -fsSL https://ollama.com/install.sh | sh
                        </code>
                        <p className="text-muted-foreground mt-2 text-sm">
                          Or download from{" "}
                          <a
                            href="https://ollama.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            ollama.com
                          </a>{" "}
                          on a connected machine, then transfer
                        </p>
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
                          Download AI Model (While Online)
                        </h3>
                        <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                          ollama pull codellama:13b
                        </code>
                        <p className="text-muted-foreground mt-2 text-sm">
                          <strong>Recommended models:</strong> codellama:13b,
                          llama2:13b, or mistral:7b
                        </p>
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
                          Configure GuardScan
                        </h3>
                        <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                          guardscan init{"\n"}# Select: Ollama (local models)
                        </code>
                        <p className="text-muted-foreground mt-2 text-sm">
                          GuardScan will auto-detect Ollama and use local models
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
                          Run AI Review Offline
                        </h3>
                        <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                          guardscan run --offline
                        </code>
                        <p className="text-muted-foreground mt-2 text-sm">
                          ✓ Works with zero internet
                          <br />
                          ✓ No API keys required
                          <br />✓ 100% private
                        </p>
                      </div>
                    </div>
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
                  GuardScan vs Cloud-Based Tools
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-bold">Feature</th>
                        <th className="p-4 text-center font-bold text-primary">
                          GuardScan
                        </th>
                        <th className="p-4 text-center font-bold">SonarQube</th>
                        <th className="p-4 text-center font-bold">Snyk</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Works 100% Offline</td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center text-muted-foreground">
                          Partial
                        </td>
                        <td className="p-4 text-center">
                          <WifiOff className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">No Code Uploads</td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <WifiOff className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Air-Gapped Support</td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center text-muted-foreground">
                          Complex
                        </td>
                        <td className="p-4 text-center">
                          <WifiOff className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Offline AI Review</td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <WifiOff className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <WifiOff className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Setup Complexity</td>
                        <td className="p-4 text-center font-semibold">
                          Simple
                        </td>
                        <td className="p-4 text-center">Complex</td>
                        <td className="p-4 text-center">Medium</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4">Cost</td>
                        <td className="p-4 text-center font-semibold text-primary">
                          Free
                        </td>
                        <td className="p-4 text-center">Paid editions</td>
                        <td className="p-4 text-center">Paid plans</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 text-center text-muted-foreground">
                  <p className="text-sm">
                    Pricing verified as of December 2024. Air-gapped
                    capabilities verified through user testing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section className="py-16 px-4">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Get Started Offline
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      Option 1: Basic Offline Scanning (No AI)
                    </h3>
                    <Card className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Step 1: Install GuardScan
                          </p>
                          <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                            npm install -g guardscan
                          </code>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Step 2: Run Security Scan (Offline)
                          </p>
                          <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                            cd your-project{"\n"}guardscan security
                          </code>
                        </div>
                        <div className="p-4 bg-accent/10 rounded-lg">
                          <p className="text-sm">
                            ✓ No internet required
                            <br />
                            ✓ All security features included
                            <br />✓ Takes less than 2 minutes
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      Option 2: Complete Offline Setup (With AI)
                    </h3>
                    <Card className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Step 1: Install Ollama (While Online)
                          </p>
                          <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                            curl -fsSL https://ollama.com/install.sh | sh
                          </code>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Step 2: Download AI Model (While Online)
                          </p>
                          <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                            ollama pull codellama:13b
                          </code>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Step 3: Install GuardScan
                          </p>
                          <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                            npm install -g guardscan
                          </code>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Step 4: Configure for Ollama
                          </p>
                          <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                            guardscan init{"\n"}# Select: Ollama (local models)
                          </code>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Step 5: Disconnect & Run AI Review (Offline)
                          </p>
                          <code className="block p-4 rounded-lg bg-code-bg text-terminal-green font-mono text-sm">
                            guardscan run --offline
                          </code>
                        </div>
                        <div className="p-4 bg-accent/10 rounded-lg">
                          <p className="text-sm">
                            ✓ AI code review works 100% offline
                            <br />
                            ✓ No API keys needed
                            <br />
                            ✓ No code sent to cloud
                            <br />✓ Complete privacy
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Lock className="w-6 h-6 text-primary" />
                    Air-Gapped Installation
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    For completely isolated environments:
                  </p>
                  <ol className="space-y-3 text-muted-foreground">
                    <li>
                      <strong className="text-foreground">
                        1. Connected Machine:
                      </strong>{" "}
                      Download GuardScan npm package and dependencies
                    </li>
                    <li>
                      <strong className="text-foreground">2. Transfer:</strong>{" "}
                      Use approved media (USB, CD, internal network)
                    </li>
                    <li>
                      <strong className="text-foreground">
                        3. Air-Gapped Machine:
                      </strong>{" "}
                      Install from local package: npm install -g ./guardscan.tgz
                    </li>
                    <li>
                      <strong className="text-foreground">4. Scan:</strong> Run
                      guardscan security (fully offline)
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Why Offline Analysis Matters
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <Lock className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-bold mb-2">Complete Privacy</h3>
                    <p className="text-muted-foreground mb-3">
                      Your code never leaves your machine. No data transmission,
                      no telemetry, no uploads.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Zero network calls</li>
                      <li>✓ No tracking</li>
                      <li>✓ IP protection</li>
                      <li>✓ Compliance friendly</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Shield className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-bold mb-2">
                      Data Residency
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Keep code inside your own boundary
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Source code stays on your machine</li>
                      <li>✓ Works in air-gapped networks</li>
                      <li>✓ Local AI via Ollama or LM Studio</li>
                      <li>✓ No GuardScan-hosted services</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Building2 className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-bold mb-2">
                      Enterprise Security
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Zero attack surface from external security tools
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ No third-party access</li>
                      <li>✓ No vendor risk</li>
                      <li>✓ No data breaches</li>
                      <li>✓ Complete control</li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Zap className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-bold mb-2">Fast & Reliable</h3>
                    <p className="text-muted-foreground mb-3">
                      No dependency on external services or network reliability
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ No API rate limits</li>
                      <li>✓ No outages</li>
                      <li>✓ No latency</li>
                      <li>✓ Always available</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 px-4">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      Does GuardScan really work 100% offline?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes, GuardScan performs all security scanning, secrets
                      detection, and code quality analysis completely offline.
                      No internet connection required. Even AI code review works
                      offline when using Ollama with local models like CodeLlama
                      or Llama 2.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      What security features work without internet?
                    </h3>
                    <p className="text-muted-foreground">
                      All security features work offline: secrets detection (20+
                      credential types), OWASP Top 10 vulnerability scanning,
                      code quality analysis, Dockerfile security checks,
                      dependency vulnerability scanning, and AI code review
                      (with Ollama). There are no feature limitations in offline
                      mode.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      Is offline scanning suitable for enterprise/government
                      use?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes, GuardScan is perfect for air-gapped environments,
                      classified systems, and regulated industries. Because
                      source code is never uploaded, it fits policies that
                      restrict where code may be processed (data residency).
                      GuardScan is not itself a compliance certification, so
                      check your own requirements.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      How do I update GuardScan in an air-gapped environment?
                    </h3>
                    <p className="text-muted-foreground">
                      Download GuardScan and its dependencies on an
                      internet-connected machine using 'npm pack guardscan',
                      transfer via approved media (USB, CD, internal network),
                      then install offline with 'npm install -g guardscan.tgz'.
                      Security signatures and vulnerability databases can be
                      updated similarly when online access is periodically
                      available.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      Can I use GuardScan while traveling without internet?
                    </h3>
                    <p className="text-muted-foreground">
                      Absolutely! GuardScan is perfect for developers working in
                      remote locations, on planes, trains, or areas with
                      unreliable internet. All features work offline, so you can
                      maintain security practices wherever you code.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      How does offline AI code review work?
                    </h3>
                    <p className="text-muted-foreground">
                      GuardScan integrates with Ollama, which runs AI models
                      locally on your machine. Download models like CodeLlama or
                      Llama 2 once (while online), then use them indefinitely
                      offline. The AI review happens entirely on your machine
                      with no external API calls or code uploads.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 px-4 bg-muted/30">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready for Offline Security Scanning?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Install once, scan forever. No internet, no uploads, no cost.
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
                    <Link to="/blog/offline-code-security-scanning">
                      Read the Guide
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <WifiOff className="w-4 h-4" />
                    <span>100% Offline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Zero Uploads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Free Forever</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Solutions */}
          <section className="py-16 px-4">
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
                    to="/solutions/dockerfile-security"
                    className="block group"
                  >
                    <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card text-left">
                      <div className="text-4xl mb-4">🐳</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        Dockerfile Security
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Scan Docker containers for 15+ security issues including
                        root users and exposed ports.
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
