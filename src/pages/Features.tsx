import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { InlineCode } from "@/components/InlineCode";
import { Shield, Code, TestTube, Brain, Globe, Zap, CheckCircle } from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Core Features</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive security scanning, code quality analysis, and AI-powered features - all free and offline capable
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 pb-16">
        
        {/* Security Scanning Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">
              Security Scanning <span className="text-gradient">(FREE, Offline)</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            GuardScan includes <strong>comprehensive security scanners</strong>:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Secrets Detection</h3>
                  <p className="text-muted-foreground">Find hardcoded API keys, passwords, tokens (20+ patterns)</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Dependency Vulnerabilities</h3>
                  <p className="text-muted-foreground">Scan npm, pip, Maven, Cargo dependencies</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">OWASP Top 10</h3>
                  <p className="text-muted-foreground">SQL injection, XSS, insecure configs, CSRF, XXE</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Docker Security</h3>
                  <p className="text-muted-foreground">Dockerfile and container scanning</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Infrastructure as Code</h3>
                  <p className="text-muted-foreground">Terraform, CloudFormation, Kubernetes security</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">API Security</h3>
                  <p className="text-muted-foreground">REST and GraphQL endpoint analysis</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Code Quality & Analysis Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">
              Code Quality & Analysis <span className="text-gradient">(FREE, Offline)</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Code Metrics</h3>
                  <p className="text-muted-foreground">Cyclomatic complexity, Halstead metrics, maintainability index</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Code Smells</h3>
                  <p className="text-muted-foreground">30+ anti-patterns (god classes, long methods, magic numbers)</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">License Compliance</h3>
                  <p className="text-muted-foreground">Check dependency licenses (MIT, GPL, Apache, etc.)</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Compliance Checks</h3>
                  <p className="text-muted-foreground">GDPR, HIPAA, PCI-DSS compliance scanning</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Linter Integration</h3>
                  <p className="text-muted-foreground">ESLint, Pylint, RuboCop, etc.</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">LOC Counter</h3>
                  <p className="text-muted-foreground">Language-aware line counting (20+ languages)</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Testing & Performance Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <TestTube className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">
              Testing & Performance <span className="text-gradient">(FREE, Offline)</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Test Runner</h3>
                  <p className="text-muted-foreground">Execute and analyze Jest, pytest, JUnit tests</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Mutation Testing</h3>
                  <p className="text-muted-foreground">Validate test suite effectiveness</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Performance Testing</h3>
                  <p className="text-muted-foreground">Load testing and benchmarking</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">SBOM Generation</h3>
                  <p className="text-muted-foreground">Software Bill of Materials (CycloneDX, SPDX)</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* AI-Enhanced Features Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">
              AI-Enhanced Features <span className="text-gradient">(BYOK - Bring Your Own Key)</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            <strong>9 Advanced AI-Powered Features:</strong>
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Code Explainer</h3>
                  <InlineCode
                    value="guardscan explain"
                    className="text-sm text-primary font-mono bg-card/60 border border-primary/20"
                  />
                  <p className="text-muted-foreground mt-2">Understand complex code</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Code Review</h3>
                  <InlineCode
                    value="guardscan review"
                    className="text-sm text-primary font-mono bg-card/60 border border-primary/20"
                  />
                  <p className="text-muted-foreground mt-2">Comprehensive AI code review</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Commit Generator</h3>
                  <InlineCode
                    value="guardscan commit"
                    className="text-sm text-primary font-mono bg-card/60 border border-primary/20"
                  />
                  <p className="text-muted-foreground mt-2">Generate commit messages</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Docs Generator</h3>
                  <InlineCode
                    value="guardscan docs"
                    className="text-sm text-primary font-mono bg-card/60 border border-primary/20"
                  />
                  <p className="text-muted-foreground mt-2">Auto-generate documentation</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Test Generator</h3>
                  <InlineCode
                    value="guardscan test-gen"
                    className="text-sm text-primary font-mono bg-card/60 border border-primary/20"
                  />
                  <p className="text-muted-foreground mt-2">Generate unit tests</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Refactoring Suggestions</h3>
                  <InlineCode
                    value="guardscan refactor"
                    className="text-sm text-primary font-mono bg-card/60 border border-primary/20"
                  />
                  <p className="text-muted-foreground mt-2">Improve code quality</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Threat Modeling</h3>
                  <InlineCode
                    value="guardscan threat-model"
                    className="text-sm text-primary font-mono bg-card/60 border border-primary/20"
                  />
                  <p className="text-muted-foreground mt-2">Security architecture analysis</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Migration Assistant</h3>
                  <InlineCode
                    value="guardscan migrate"
                    className="text-sm text-primary font-mono bg-card/60 border border-primary/20"
                  />
                  <p className="text-muted-foreground mt-2">Framework/language migrations</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Interactive Chat</h3>
                  <InlineCode
                    value="guardscan chat"
                    className="text-sm text-primary font-mono bg-card/60 border border-primary/20"
                  />
                  <p className="text-muted-foreground mt-2">RAG-powered codebase Q&A</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Multi-Language Support Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">
              Multi-Language Support
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            <strong>AST Parsers for 7+ Languages:</strong>
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "TypeScript/JavaScript",
              "Python",
              "Java",
              "Go",
              "Rust",
              "Ruby",
              "PHP",
              "C#"
            ].map((lang) => (
              <Card key={lang} className="p-4 bg-card/50 border-primary/20 text-center">
                <div className="font-semibold text-foreground">{lang}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Provider Integrations Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">
              AI Provider Integrations
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Configure any AI provider you prefer:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6 bg-card/50 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">OpenAI</h3>
              <p className="text-muted-foreground text-sm">GPT-4, GPT-4 Turbo, GPT-3.5</p>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">Anthropic Claude</h3>
              <p className="text-muted-foreground text-sm">Claude 3 Opus, Sonnet, Haiku</p>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">Google Gemini</h3>
              <p className="text-muted-foreground text-sm">Gemini Pro</p>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">Ollama</h3>
              <p className="text-muted-foreground text-sm">Local, privacy-focused - llama2, codellama, mistral</p>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">LM Studio</h3>
              <p className="text-muted-foreground text-sm">Local models</p>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">OpenRouter</h3>
              <p className="text-muted-foreground text-sm">Access to multiple models</p>
            </Card>
          </div>
          <div className="mt-8 p-6 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-foreground font-medium">
              <strong>You pay the AI provider directly</strong> - GuardScan charges nothing!
            </p>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}

