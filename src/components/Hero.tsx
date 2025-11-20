import { Shield, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-terminal-blue/10 via-background to-terminal-green/10" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 backdrop-blur-sm terminal-shadow">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Privacy-First Code Review</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
            AI Code Review That
            <span className="block text-gradient glow-text mt-2">
              Never Sees Your Code
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            GuardScan runs locally on your machine. All security scanning happens offline. 
            Your source code <span className="text-primary font-semibold">never leaves your computer</span>.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold animate-glow">
              <a href="https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md" target="_blank" rel="noopener noreferrer">
                <Terminal className="w-5 h-5 mr-2" />
                Get Started Free
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10">
              <a href="https://github.com/ntanwir10/GuardScan" target="_blank" rel="noopener noreferrer">
                <Zap className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
          
          {/* Quick install */}
          <div className="mt-8 p-6 rounded-lg bg-code-bg border border-border/50 backdrop-blur-sm max-w-2xl w-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-accent/80" />
                <div className="w-3 h-3 rounded-full bg-primary/80" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">Terminal</span>
            </div>
            <code className="text-terminal-green font-mono text-sm md:text-base block">
              <span className="text-terminal-cyan">$</span> npm install -g guardscan<br/>
              <span className="text-terminal-cyan">$</span> guardscan init<br/>
              <span className="text-terminal-cyan">$</span> guardscan security
            </code>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>100% Local Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>Works Offline</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-secondary" />
              <span>6+ AI Providers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
