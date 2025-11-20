import { Terminal, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="relative p-12 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 border border-primary/30 terminal-shadow overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Protect Your <span className="text-gradient">Code Privacy</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join developers who never compromise on security. 
              Start scanning in under 2 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <a href="https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md" target="_blank" rel="noopener noreferrer">
                  <Terminal className="w-5 h-5 mr-2" />
                  Install GuardScan
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-foreground/20 hover:bg-foreground/5">
                <a href="https://github.com/ntanwir10/GuardScan" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  Star on GitHub
                </a>
              </Button>
            </div>
            
            {/* Quick install reminder */}
            <div className="pt-6 text-sm text-muted-foreground">
              <code className="px-3 py-1.5 rounded bg-code-bg border border-border/50 text-terminal-green font-mono">
                npm install -g guardscan
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
