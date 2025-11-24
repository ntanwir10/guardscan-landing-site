import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { InlineCode } from "@/components/InlineCode";
import {
  Terminal,
  ScanSearch,
  FileText,
  Code,
  Shield,
  Zap,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Terminal,
    title: "Install & Initialize",
    description: "One command to install globally. Initialize your project config and client ID in seconds.",
    command: "npm install -g guardscan && guardscan init",
    details: [
      "Creates ~/.guardscan/config.yml with your settings",
      "Generates unique client_id for privacy-first tracking",
      "Auto-detects your repository and language",
      "Ready to scan in under 30 seconds"
    ]
  },
  {
    icon: ScanSearch,
    title: "Run Analysis",
    description: "Choose from security scanning, code quality checks, or full AI-powered review. All run locally.",
    command: "guardscan security --offline",
    details: [
      "Security: Detect secrets, vulnerabilities, OWASP Top 10",
      "Quality: LOC counting, complexity metrics, code smells",
      "Testing: Run tests with coverage analysis",
      "AI Review: Optional AI-powered insights (requires credits)"
    ]
  },
  {
    icon: FileText,
    title: "Get Actionable Reports",
    description: "Beautiful Markdown reports with severity levels, file references, and specific recommendations.",
    command: "cat guardscan-report.md",
    details: [
      "Executive summary with severity breakdown",
      "File and line number references for every finding",
      "Color-coded severity (critical, high, medium, low)",
      "Shareable reports (commit to repo or share with team)"
    ]
  },
];

const commands = [
  {
    command: "guardscan security",
    description: "Security vulnerability scanning (offline)",
    icon: Shield
  },
  {
    command: "guardscan test",
    description: "Run tests & code quality analysis",
    icon: CheckCircle2
  },
  {
    command: "guardscan run",
    description: "AI-powered code review (requires credits)",
    icon: Zap
  },
  {
    command: "guardscan config",
    description: "Configure AI provider & API key",
    icon: Code
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get Started in <span className="text-gradient">Under 2 Minutes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Simple, fast, and developer-friendly workflow. No complex setup, no external accounts required.
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col md:flex-row gap-8 items-start group"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className="flex-grow space-y-4">
                  <div className="flex items-center gap-3">
                    <step.icon className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold">{step.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    {step.description}
                  </p>
                  
                  {/* Command */}
                  <div className="p-4 rounded-lg bg-code-bg border border-border/50 font-mono text-sm text-terminal-green">
                    <span className="text-terminal-cyan">$ </span>{step.command}
                  </div>

                  {/* Details */}
                  <ul className="space-y-2 mt-4">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-foreground/80">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Commands */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            All Available <span className="text-gradient">Commands</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {commands.map((cmd, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg bg-background border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <cmd.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <InlineCode
                      value={cmd.command}
                      className="text-terminal-cyan font-mono text-sm bg-terminal-green/10 border border-terminal-green/30"
                    />
                    <p className="text-muted-foreground mt-2">
                      {cmd.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Run{" "}
              <InlineCode
                value="guardscan --help"
                className="text-terminal-cyan font-mono bg-terminal-green/10 border border-terminal-green/30"
              />{" "}
              to see all 11 commands
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
