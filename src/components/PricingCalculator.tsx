import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const competitors = [
  {
    name: "GuardScan",
    color: "text-primary",
    calculate: (loc: number) => (loc / 100000) * 5,
    note: "Pay-per-use, no subscription"
  },
  {
    name: "SonarQube",
    color: "text-muted-foreground",
    calculate: (loc: number) => {
      if (loc < 100000) return 150; // Team plan minimum
      return 30000 / 12; // Enterprise annual cost
    },
    note: "Monthly subscription required"
  },
  {
    name: "CodeClimate",
    color: "text-muted-foreground",
    calculate: (loc: number) => 249,
    note: "Fixed monthly fee"
  },
  {
    name: "GitHub Copilot",
    color: "text-muted-foreground",
    calculate: (loc: number) => 19,
    note: "Per user/month (limited code review)"
  },
  {
    name: "CodeRabbit",
    color: "text-muted-foreground",
    calculate: (loc: number) => 12,
    note: "Per user/month"
  }
];

export const PricingCalculator = () => {
  const [loc, setLoc] = useState(50000);

  const handleLocChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setLoc(Math.min(Math.max(numValue, 1000), 1000000));
  };

  const handleSliderChange = (value: number[]) => {
    setLoc(value[0]);
  };

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Pricing Calculator</CardTitle>
        <CardDescription>
          Compare costs for your project size
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loc-input">Lines of Code (LOC)</Label>
            <Input
              id="loc-input"
              type="number"
              value={loc}
              onChange={(e) => handleLocChange(e.target.value)}
              min={1000}
              max={1000000}
              className="text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Slider
              value={[loc]}
              onValueChange={handleSliderChange}
              min={1000}
              max={1000000}
              step={1000}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1K</span>
              <span>250K</span>
              <span>500K</span>
              <span>750K</span>
              <span>1M</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {competitors.map((competitor) => {
            const cost = competitor.calculate(loc);
            const isGuardScan = competitor.name === "GuardScan";
            
            return (
              <div
                key={competitor.name}
                className={`p-4 rounded-lg border ${
                  isGuardScan
                    ? "bg-primary/10 border-primary/50"
                    : "bg-background/50 border-border/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold ${competitor.color}`}>
                    {competitor.name}
                  </span>
                  <span className={`text-2xl font-bold ${isGuardScan ? "text-primary" : ""}`}>
                    ${cost.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{competitor.note}</p>
                {isGuardScan && cost < 1 && (
                  <p className="text-xs text-accent mt-1">✨ Affordable for any project size</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>💡 <strong>Note:</strong> GuardScan's free tier includes unlimited static analysis</p>
            <p>💸 Competitor prices are monthly subscriptions regardless of usage</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
