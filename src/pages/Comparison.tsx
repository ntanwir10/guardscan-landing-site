import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const competitors = [
  {
    name: "GuardScan",
    logo: "🛡️",
    pricing: "100% Free & Open-Source",
    isGuardScan: true,
    link: "",
  },
  {
    name: "SonarQube",
    logo: "🔍",
    pricing: "$150/month (Team) - $30K+/year (Enterprise)",
    link: "/comparison/sonarqube-alternative",
  },
  {
    name: "CodeClimate",
    logo: "☁️",
    pricing: "$249/month (Team) - Custom pricing",
    link: "/comparison/codeclimate-alternative",
  },
  {
    name: "GitHub Copilot",
    logo: "🤖",
    pricing: "$10-19/user/month",
    link: "",
  },
  {
    name: "Snyk",
    logo: "🔐",
    pricing: "$98/month (Team) - Custom pricing",
    link: "/comparison/snyk-alternative",
  },
];

const features = [
  {
    category: "Privacy & Security",
    items: [
      {
        feature: "Source code stays on your machine",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "Works completely offline",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "No code upload to third-party servers",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "Air-gapped environment support",
        guardscan: true,
        sonarqube: "partial",
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
    ],
  },
  {
    category: "Cost & Licensing",
    items: [
      {
        feature: "100% Free & Open-Source",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "No subscription fees ever",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "Bring Your Own API Key",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "Use local AI (Ollama) for zero cost",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
    ],
  },
  {
    category: "AI Capabilities",
    items: [
      {
        feature: "AI-powered code review",
        guardscan: true,
        sonarqube: "limited",
        codeclimate: false,
        copilot: true,
        coderabbit: true,
      },
      {
        feature: "Multi-provider support (OpenAI, Claude, etc)",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "Local AI support (Ollama, LM Studio)",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "No vendor lock-in",
        guardscan: true,
        sonarqube: true,
        codeclimate: true,
        copilot: false,
        coderabbit: false,
      },
    ],
  },
  {
    category: "Features",
    items: [
      {
        feature: "Security vulnerability scanning",
        guardscan: true,
        sonarqube: true,
        codeclimate: true,
        copilot: false,
        coderabbit: true,
      },
      {
        feature: "Code quality analysis",
        guardscan: true,
        sonarqube: true,
        codeclimate: true,
        copilot: "limited",
        coderabbit: true,
      },
      {
        feature: "Test coverage analysis",
        guardscan: true,
        sonarqube: true,
        codeclimate: true,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "Secrets detection",
        guardscan: true,
        sonarqube: "limited",
        codeclimate: "limited",
        copilot: false,
        coderabbit: "limited",
      },
      {
        feature: "OWASP Top 10 coverage",
        guardscan: true,
        sonarqube: true,
        codeclimate: true,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "Dockerfile security scanning",
        guardscan: true,
        sonarqube: "limited",
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
      {
        feature: "IaC scanning (Terraform, K8s)",
        guardscan: true,
        sonarqube: "limited",
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
    ],
  },
  {
    category: "Developer Experience",
    items: [
      {
        feature: "CLI-first design",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: true,
      },
      {
        feature: "Setup time under 2 minutes",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: true,
        coderabbit: true,
      },
      {
        feature: "Markdown report generation",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: true,
      },
      {
        feature: "No external account required (for free tier)",
        guardscan: true,
        sonarqube: false,
        codeclimate: false,
        copilot: false,
        coderabbit: false,
      },
    ],
  },
];

const FeatureIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) {
    return <Check className="w-5 h-5 text-accent mx-auto" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-muted-foreground mx-auto" />;
  }
  return <Minus className="w-5 h-5 text-terminal-cyan mx-auto" />;
};

export default function Comparison() {
  return (
    <div className="min-h-screen">
      <SEO
        title="GuardScan vs SonarQube, Snyk, CodeClimate - Comparison"
        description="Compare GuardScan with leading code review tools: SonarQube, Snyk, CodeClimate, GitHub Copilot, and CodeRabbit. See pricing, features, and privacy differences."
        canonical="https://guardscancli.vercel.app/comparison"
        keywords="guardscan vs sonarqube, guardscan vs snyk, guardscan vs codeclimate, code review tool comparison, SAST tool comparison, security scanning comparison"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Why Choose <span className="text-gradient">GuardScan</span>?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Compare GuardScan with leading code review tools. See how we deliver
            enterprise-grade security without compromising on privacy or burning
            your budget.
          </p>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Pricing <span className="text-gradient">Breakdown</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitors.map((competitor) => (
              <div
                key={competitor.name}
                className={`p-6 rounded-lg border ${
                  competitor.isGuardScan
                    ? "bg-gradient-to-br from-primary/10 to-accent/10 border-primary shadow-lg"
                    : "bg-background border-border"
                }`}
              >
                <div className="text-4xl mb-4 text-center">
                  {competitor.logo}
                </div>
                <h3 className="text-xl font-bold text-center mb-4">
                  {competitor.name}
                </h3>
                <p
                  className={`text-center ${
                    competitor.isGuardScan
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {competitor.pricing}
                </p>
                {competitor.isGuardScan && (
                  <div className="mt-4 pt-4 border-t border-border/50 text-sm text-center text-muted-foreground">
                    Example: 10K LOC = $0.50
                  </div>
                )}
                {competitor.link && (
                  <div className="mt-4 text-center">
                    <Link
                      to={competitor.link}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm"
                    >
                      Compare in Detail
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              * All competitor pricing is approximate and based on publicly
              available information as of 2025
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Feature <span className="text-gradient">Comparison</span>
          </h2>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-bold text-lg">Feature</th>
                  {competitors.map((comp) => (
                    <th
                      key={comp.name}
                      className={`p-4 text-center font-bold ${
                        comp.isGuardScan ? "text-primary" : ""
                      }`}
                    >
                      <div className="text-2xl mb-2">{comp.logo}</div>
                      {comp.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((category) => (
                  <>
                    <tr key={category.category} className="bg-card/30">
                      <td colSpan={6} className="p-4 font-bold text-lg">
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border/50 hover:bg-card/20"
                      >
                        <td className="p-4">{item.feature}</td>
                        <td className="p-4">
                          <FeatureIcon value={item.guardscan} />
                        </td>
                        <td className="p-4">
                          <FeatureIcon value={item.sonarqube} />
                        </td>
                        <td className="p-4">
                          <FeatureIcon value={item.codeclimate} />
                        </td>
                        <td className="p-4">
                          <FeatureIcon value={item.copilot} />
                        </td>
                        <td className="p-4">
                          <FeatureIcon value={item.coderabbit} />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-8">
            {features.map((category) => (
              <div key={category.category}>
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-card border border-border"
                    >
                      <div className="font-medium mb-3">{item.feature}</div>
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-bold text-primary mb-1">
                            GuardScan
                          </div>
                          <FeatureIcon value={item.guardscan} />
                        </div>
                        <div className="text-center">
                          <div className="font-bold mb-1">SonarQube</div>
                          <FeatureIcon value={item.sonarqube} />
                        </div>
                        <div className="text-center">
                          <div className="font-bold mb-1">CodeClimate</div>
                          <FeatureIcon value={item.codeclimate} />
                        </div>
                        <div className="text-center">
                          <div className="font-bold mb-1">Copilot</div>
                          <FeatureIcon value={item.copilot} />
                        </div>
                        <div className="text-center">
                          <div className="font-bold mb-1">CodeRabbit</div>
                          <FeatureIcon value={item.coderabbit} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-accent" />
              <span>Full Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Minus className="w-5 h-5 text-terminal-cyan" />
              <span>Partial Support</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-5 h-5 text-muted-foreground" />
              <span>Not Supported</span>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Pages */}
      <section className="py-16 px-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore GuardScan Solutions
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Learn more about GuardScan's key capabilities
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/solutions/secrets-detection" className="block group">
                <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card">
                  <div className="text-4xl mb-4">🔐</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Secrets Detection
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Find API keys, passwords, and tokens in your code
                  </p>
                </div>
              </Link>

              <Link to="/solutions/dockerfile-security" className="block group">
                <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card">
                  <div className="text-4xl mb-4">🐳</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Dockerfile Security
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Scan Docker containers for security vulnerabilities
                  </p>
                </div>
              </Link>

              <Link to="/solutions/offline-analysis" className="block group">
                <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card">
                  <div className="text-4xl mb-4">✈️</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Offline Analysis
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Security scanning for air-gapped environments
                  </p>
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
