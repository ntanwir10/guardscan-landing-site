import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { TerminalDemo } from "@/components/TerminalDemo";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen">
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
      <div id="pricing">
        <Pricing />
      </div>
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
