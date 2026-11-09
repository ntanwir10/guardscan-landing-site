import { Lock, Wifi, DollarSign, Puzzle, Shield, Code2, Bug, GitBranch, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Lock,
    title: "Privacy Guaranteed",
    description: "Your source code never leaves your machine. All static analysis runs locally with zero uploads to our servers.",
    color: "text-primary",
  },
  {
    icon: Wifi,
    title: "Works Offline",
    description: "Full security and quality scanning without internet. No network dependency for core analysis features.",
    color: "text-accent",
  },
  {
    icon: DollarSign,
    title: "100% Free & Open Source",
    description: "No subscriptions, no paywalls, no hidden costs. BYOK (Bring Your Own Key) for AI providers or use local Ollama.",
    color: "text-terminal-cyan",
  },
  {
    icon: Puzzle,
    title: "Multi-AI Support",
    description: "Choose from OpenAI, Claude, Gemini, or run locally with Ollama. No vendor lock-in, switch anytime.",
    color: "text-secondary",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "OWASP-oriented checks, secrets detection, dependency scanning, and IaC security checks built in.",
    color: "text-primary",
  },
  {
    icon: Code2,
    title: "Developer First",
    description: "Markdown, JSON, or SARIF reports, a CLI-native workflow, and integration with your existing tools.",
    color: "text-accent",
  },
  {
    icon: Bug,
    title: "Dependency Vulnerabilities",
    description: "guardscan vuln checks exact dependency versions against OSV across npm, pip, Go, Ruby, Cargo, and Maven. Use --offline with a local snapshot.",
    color: "text-terminal-cyan",
  },
  {
    icon: GitBranch,
    title: "CI-Ready Output",
    description: "SARIF reports for code scanning, --ci mode, and --fail-on to gate builds by severity. Requires Node.js 22+.",
    color: "text-secondary",
  },
  {
    icon: Gauge,
    title: "AI Cost Controls",
    description: "Pick models with guardscan models, route tasks with routing, cap spend with budget, and review metrics and cache stats.",
    color: "text-primary",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why <span className="text-gradient">GuardScan</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The only code review tool that respects your privacy while delivering comprehensive analysis
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] group"
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-background/50 flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
