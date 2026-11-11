import { Shield, Code2, Users, Zap } from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "100%",
    label: "Local Scanning",
    description: "No code uploaded to GuardScan",
  },
  {
    icon: Code2,
    value: "8",
    label: "Languages",
    description: "With built-in code parsers",
  },
  {
    icon: Users,
    value: "6+",
    label: "AI Providers",
    description: "Your choice, no lock-in",
  },
  {
    icon: Zap,
    value: "<2min",
    label: "Setup Time",
    description: "From install to first scan",
  },
];

export const Stats = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center space-y-3 group"
            >
              <div className="w-16 h-16 rounded-full bg-card/50 border border-border/50 flex items-center justify-center mx-auto group-hover:border-primary/50 transition-colors">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gradient">
                {stat.value}
              </div>
              <div className="font-semibold text-foreground">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
