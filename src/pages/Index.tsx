import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { SEO } from "@/components/SEO";
import {
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
} from "@/lib/seo-schemas";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { TerminalDemo } from "@/components/TerminalDemo";
import { FAQ } from "@/components/FAQ";
import { Link } from "react-router-dom";

const Index = () => {
  // Combine Organization and SoftwareApplication schemas
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateSoftwareApplicationSchema(),
    ],
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="GuardScan - Privacy-First AI Code Review CLI"
        description="AI code review that never sees your code. GuardScan runs locally with no server and never uploads your code; static analysis works offline, and AI review is optional with your own provider key or a local model. Free and open source."
        canonical="https://guardscancli.vercel.app/"
        keywords="code review, static analysis, security scanning, privacy-first, offline code analysis, AI code review, developer tools, SAST, secrets detection, code security scanner"
        structuredData={structuredData}
      />
      <Navigation />
      <Hero />
      <Stats />

      {/* Terminal Demo Section */}
      <section className="py-24 px-4 bg-card/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              See It <span className="text-gradient">In Action</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch GuardScan analyze your code in real-time
            </p>
          </div>
          <TerminalDemo />
        </div>
      </section>

      <div id="features">
        <Features />
      </div>
      <HowItWorks />

      {/* Solution Pages Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Specialized{" "}
              <span className="text-gradient">Security Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Targeted security scanning for your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/solutions/secrets-detection" className="block group">
              <div className="p-8 rounded-xl border border-border hover:border-primary transition-all bg-card hover:shadow-lg">
                <div className="text-5xl mb-4">🔐</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  Secrets Detection
                </h3>
                <p className="text-muted-foreground mb-4">
                  Detect 20+ types of hardcoded credentials including API keys,
                  passwords, and tokens.
                </p>
                <span className="text-primary font-medium">
                  Explore solution →
                </span>
              </div>
            </Link>

            <Link to="/solutions/dockerfile-security" className="block group">
              <div className="p-8 rounded-xl border border-border hover:border-primary transition-all bg-card hover:shadow-lg">
                <div className="text-5xl mb-4">🐳</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  Dockerfile Security
                </h3>
                <p className="text-muted-foreground mb-4">
                  Scan Docker containers for 15+ security issues including root
                  users and exposed ports.
                </p>
                <span className="text-primary font-medium">
                  Explore solution →
                </span>
              </div>
            </Link>

            <Link to="/solutions/offline-analysis" className="block group">
              <div className="p-8 rounded-xl border border-border hover:border-primary transition-all bg-card hover:shadow-lg">
                <div className="text-5xl mb-4">✈️</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  Offline Analysis
                </h3>
                <p className="text-muted-foreground mb-4">
                  Offline-capable security scanning for air-gapped and secure
                  environments.
                </p>
                <span className="text-primary font-medium">
                  Explore solution →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
