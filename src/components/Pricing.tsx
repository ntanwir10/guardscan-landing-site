import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PricingCalculator } from "./PricingCalculator";

const plans = [
  {
    name: "Free Tier",
    price: "$0",
    description: "Perfect for trying GuardScan",
    features: [
      "Unlimited static analysis",
      "Security vulnerability scanning",
      "Code quality metrics",
      "Dependency scanning",
      "Secrets detection",
      "Works completely offline",
      "Markdown reports",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "AI-Enhanced",
    price: "$5",
    description: "Per 100,000 lines of code",
    features: [
      "Everything in Free",
      "AI-powered code review",
      "6+ AI providers supported",
      "Context-aware suggestions",
      "Code smell detection",
      "Best practice recommendations",
      "Priority support",
    ],
    cta: "Purchase Credits",
    popular: true,
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Simple, <span className="text-gradient">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No subscriptions. No hidden fees. Pay only for what you use.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative bg-card/50 border-border/50 backdrop-blur-sm ${
                plan.popular ? 'border-primary/50 shadow-lg shadow-primary/10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                  {plan.price !== "$0" && (
                    <span className="text-muted-foreground ml-2">/ 100K LOC</span>
                  )}
                </div>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pricing Calculator */}
        <div className="mt-16 max-w-2xl mx-auto">
          <PricingCalculator />
        </div>
      </div>
    </section>
  );
};
