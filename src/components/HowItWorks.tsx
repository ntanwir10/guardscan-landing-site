import { Terminal, ScanSearch, FileText } from "lucide-react";

const steps = [
  {
    icon: Terminal,
    title: "Install & Initialize",
    description: "One command to install globally. Initialize your project config and client ID in seconds.",
    command: "npm install -g guardscan && guardscan init",
  },
  {
    icon: ScanSearch,
    title: "Run Analysis",
    description: "Choose from security scanning, code quality checks, or full AI-powered review. All run locally.",
    command: "guardscan security --offline",
  },
  {
    icon: FileText,
    title: "Get Actionable Reports",
    description: "Markdown, JSON, or SARIF reports with severity levels, file references, and specific recommendations.",
    command: "guardscan scan --format sarif -o guardscan.sarif",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Get Started in <span className="text-gradient">Under 2 Minutes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and developer-friendly workflow
          </p>
        </div>
        
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row gap-6 items-start md:items-center group"
            >
              {/* Step number */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-3">
                  <step.icon className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  {step.description}
                </p>
                <div className="p-4 rounded-lg bg-code-bg border border-border/50 font-mono text-sm text-terminal-green">
                  <span className="text-terminal-cyan">$ </span>{step.command}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
