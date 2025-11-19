import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CodeBlock } from "@/components/CodeBlock";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Settings, Shield, TestTube, Package, Zap, Activity, FlaskConical, FileCode, RotateCcw, BookOpen, Key, Server, CheckCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const commands = [
  {
    name: "init",
    icon: Settings,
    description: "Initialize GuardScan configuration and generate client ID",
    usage: "guardscan init",
    options: [
      { flag: "--force", description: "Overwrite existing configuration" },
      { flag: "--skip-git", description: "Skip git repository detection" }
    ],
    examples: [
      { command: "guardscan init", description: "Initialize with defaults" },
      { command: "guardscan init --force", description: "Reset and reinitialize" }
    ]
  },
  {
    name: "config",
    icon: Settings,
    description: "Configure AI provider and API keys",
    usage: "guardscan config [options]",
    options: [
      { flag: "--provider <name>", description: "Set AI provider (openai, claude, gemini, ollama, etc.)" },
      { flag: "--api-key <key>", description: "Set API key for chosen provider" },
      { flag: "--list", description: "List all available providers" }
    ],
    examples: [
      { command: "guardscan config --provider openai --api-key sk-...", description: "Configure OpenAI" },
      { command: "guardscan config --provider ollama", description: "Use local Ollama (no API key needed)" },
      { command: "guardscan config --list", description: "Show all providers" }
    ]
  },
  {
    name: "status",
    icon: Activity,
    description: "Show current configuration, credits, and system status",
    usage: "guardscan status",
    options: [
      { flag: "--json", description: "Output in JSON format" },
      { flag: "--verbose", description: "Show detailed information" }
    ],
    examples: [
      { command: "guardscan status", description: "Show status summary" },
      { command: "guardscan status --json", description: "Get status as JSON" }
    ]
  },
  {
    name: "security",
    icon: Shield,
    description: "Run security vulnerability scanning (works offline)",
    usage: "guardscan security [options]",
    options: [
      { flag: "--offline", description: "Force offline mode (no credit validation)" },
      { flag: "--severity <level>", description: "Filter by severity (critical, high, medium, low)" },
      { flag: "--output <file>", description: "Save report to file" },
      { flag: "--format <type>", description: "Output format (markdown, json, html)" }
    ],
    examples: [
      { command: "guardscan security", description: "Run full security scan" },
      { command: "guardscan security --offline", description: "Scan without internet" },
      { command: "guardscan security --severity critical", description: "Show only critical issues" },
      { command: "guardscan security --output report.md", description: "Save report to file" }
    ]
  },
  {
    name: "test",
    icon: TestTube,
    description: "Run tests with coverage and quality analysis",
    usage: "guardscan test [options]",
    options: [
      { flag: "--coverage", description: "Generate coverage report" },
      { flag: "--framework <name>", description: "Specify test framework (jest, pytest, etc.)" },
      { flag: "--threshold <percent>", description: "Set minimum coverage threshold" }
    ],
    examples: [
      { command: "guardscan test", description: "Run all tests" },
      { command: "guardscan test --coverage", description: "Run with coverage report" },
      { command: "guardscan test --threshold 80", description: "Require 80% coverage" }
    ]
  },
  {
    name: "sbom",
    icon: Package,
    description: "Generate Software Bill of Materials",
    usage: "guardscan sbom [options]",
    options: [
      { flag: "--format <type>", description: "Output format (json, xml, cyclonedx)" },
      { flag: "--include-dev", description: "Include development dependencies" },
      { flag: "--output <file>", description: "Save SBOM to file" }
    ],
    examples: [
      { command: "guardscan sbom", description: "Generate SBOM in JSON" },
      { command: "guardscan sbom --format cyclonedx", description: "Generate CycloneDX format" },
      { command: "guardscan sbom --include-dev", description: "Include dev dependencies" }
    ]
  }
];

const configOptions = [
  {
    key: "ai.provider",
    type: "string",
    default: "openai",
    description: "Default AI provider",
    possibleValues: ["openai", "claude", "gemini", "ollama"]
  },
  {
    key: "ai.model",
    type: "string",
    default: "gpt-4",
    description: "Default AI model for the chosen provider",
    possibleValues: ["gpt-4", "gpt-3.5-turbo", "claude-3-opus", "gemini-pro", "codellama"]
  },
  {
    key: "scan.verbose",
    type: "boolean",
    default: "false",
    description: "Enable verbose output for all scans",
    possibleValues: ["true", "false"]
  },
  {
    key: "scan.output_format",
    type: "string",
    default: "markdown",
    description: "Default output format for reports",
    possibleValues: ["markdown", "json", "html"]
  },
  {
    key: "privacy.telemetry",
    type: "boolean",
    default: "true",
    description: "Enable anonymous usage telemetry",
    possibleValues: ["true", "false"]
  },
  {
    key: "exclude_patterns",
    type: "array",
    default: "[\"node_modules\", \".git\", \"dist\", \"build\"]",
    description: "Glob patterns to exclude from scanning",
    possibleValues: ["Array of glob patterns"]
  }
];

const navigationSections = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "quick-start", label: "Quick Start" },
    ]
  },
  {
    title: "Commands",
    items: [
      { id: "commands", label: "Command Reference" },
    ]
  },
  {
    title: "Configuration",
    items: [
      { id: "byok-setup", label: "BYOK Setup" },
      { id: "config-reference", label: "Config Reference" },
      { id: "env-vars", label: "Environment Variables" },
    ]
  }
];

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <div className="flex-1 flex pt-20">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 border-r border-border bg-card/30 fixed left-0 top-20 bottom-0 overflow-y-auto">
          <nav className="p-6 space-y-6">
            {navigationSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-sm text-foreground mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "w-full text-left text-sm px-3 py-2 rounded-md transition-colors",
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            {/* Introduction */}
            <section id="introduction" className="mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Documentation
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                GuardScan is a free, open-source CLI tool for comprehensive codebase analysis. This documentation provides everything you need to get started and master GuardScan.
              </p>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Zap className="w-8 h-8 text-primary" />
                Quick Start
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Installation</h3>
                  <CodeBlock
                    code={`# Install GuardScan globally
npm install -g guardscan

# Or use with npx
npx guardscan --help`}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">First Scan</h3>
                  <CodeBlock
                    code={`# Initialize in your project
guardscan init

# Run a security scan (works offline)
guardscan security

# Run with AI analysis (requires API key)
guardscan run --ai`}
                  />
                </div>
              </div>
            </section>

            {/* Commands Reference */}
            <section id="commands" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Terminal className="w-8 h-8 text-primary" />
                Command Reference
              </h2>
              <div className="space-y-8">
                {commands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <Card key={cmd.name} className="p-6 bg-card/50 border-primary/20">
                      <div className="flex items-start gap-3 mb-4">
                        <Icon className="w-6 h-6 text-primary mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2">{cmd.name}</h3>
                          <p className="text-muted-foreground mb-3">{cmd.description}</p>
                          <CodeBlock code={cmd.usage} />
                        </div>
                      </div>

                      {cmd.options && cmd.options.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-foreground mb-2">Options:</h4>
                          <div className="space-y-2">
                            {cmd.options.map((option, idx) => (
                              <div key={idx} className="flex gap-3">
                                <code className="text-sm text-primary font-mono">{option.flag}</code>
                                <span className="text-sm text-muted-foreground">{option.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {cmd.examples && cmd.examples.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Examples:</h4>
                          <div className="space-y-3">
                            {cmd.examples.map((example, idx) => (
                              <div key={idx}>
                                <CodeBlock code={example.command} />
                                <p className="text-sm text-muted-foreground mt-1 ml-1">{example.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* BYOK Setup */}
            <section id="byok-setup" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Key className="w-8 h-8 text-primary" />
                Bring Your Own Key (BYOK)
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Use GuardScan with your preferred AI provider or run it completely free with local AI
              </p>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-card/50 border-primary/20">
                  <Zap className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">Your Choice</h3>
                  <p className="text-sm text-muted-foreground">Choose from OpenAI, Claude, Gemini, or local AI</p>
                </Card>
                <Card className="p-6 bg-card/50 border-primary/20">
                  <Server className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">Full Control</h3>
                  <p className="text-sm text-muted-foreground">Your API keys, your data, your control</p>
                </Card>
                <Card className="p-6 bg-card/50 border-primary/20">
                  <CheckCircle className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">Zero Cost Option</h3>
                  <p className="text-sm text-muted-foreground">Run completely free with Ollama locally</p>
                </Card>
              </div>

              {/* Setup Tabs */}
              <Tabs defaultValue="openai" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="openai">OpenAI</TabsTrigger>
                  <TabsTrigger value="claude">Claude</TabsTrigger>
                  <TabsTrigger value="gemini">Gemini</TabsTrigger>
                  <TabsTrigger value="ollama">Ollama (Local)</TabsTrigger>
                </TabsList>

                {/* OpenAI Setup */}
                <TabsContent value="openai" className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">OpenAI Setup</h3>
                    <p className="text-muted-foreground mb-6">
                      Get your API key from OpenAI and configure GuardScan to use GPT-4 or GPT-3.5 for AI-powered code analysis.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 1: Get Your API Key</h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI API Keys</a></li>
                        <li>Sign in or create an account</li>
                        <li>Click "Create new secret key"</li>
                        <li>Copy your API key (starts with "sk-")</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 2: Configure GuardScan</h4>
                      <CodeBlock
                        title="Set environment variable"
                        code={`# Linux/macOS
export OPENAI_API_KEY="sk-your-api-key-here"

# Windows (Command Prompt)
set OPENAI_API_KEY=sk-your-api-key-here

# Windows (PowerShell)
$env:OPENAI_API_KEY="sk-your-api-key-here"`}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 3: Run AI-Powered Scan</h4>
                      <CodeBlock
                        title="Execute scan"
                        code={`guardscan run --ai

# Or specify a model
guardscan run --ai --model gpt-4

# For GPT-3.5 (faster, cheaper)
guardscan run --ai --model gpt-3.5-turbo`}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Claude Setup */}
                <TabsContent value="claude" className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Claude (Anthropic) Setup</h3>
                    <p className="text-muted-foreground mb-6">
                      Use Anthropic's Claude models for advanced reasoning and code analysis capabilities.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 1: Get Your API Key</h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Visit <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic Console</a></li>
                        <li>Sign in or create an account</li>
                        <li>Navigate to API Keys section</li>
                        <li>Create a new API key</li>
                        <li>Copy your API key</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 2: Configure GuardScan</h4>
                      <CodeBlock
                        title="Set environment variable"
                        code={`# Linux/macOS
export ANTHROPIC_API_KEY="sk-ant-your-api-key-here"

# Windows (Command Prompt)
set ANTHROPIC_API_KEY=sk-ant-your-api-key-here

# Windows (PowerShell)
$env:ANTHROPIC_API_KEY="sk-ant-your-api-key-here"`}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 3: Run AI-Powered Scan</h4>
                      <CodeBlock
                        title="Execute scan"
                        code={`guardscan run --ai --provider claude

# Or specify a model
guardscan run --ai --provider claude --model claude-3-opus

# For Claude Sonnet (balanced performance)
guardscan run --ai --provider claude --model claude-3-sonnet`}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Gemini Setup */}
                <TabsContent value="gemini" className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Google Gemini Setup</h3>
                    <p className="text-muted-foreground mb-6">
                      Leverage Google's Gemini models for multimodal AI analysis and code review.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 1: Get Your API Key</h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></li>
                        <li>Sign in with your Google account</li>
                        <li>Click "Create API Key"</li>
                        <li>Copy your API key</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 2: Configure GuardScan</h4>
                      <CodeBlock
                        title="Set environment variable"
                        code={`# Linux/macOS
export GOOGLE_API_KEY="your-api-key-here"

# Windows (Command Prompt)
set GOOGLE_API_KEY=your-api-key-here

# Windows (PowerShell)
$env:GOOGLE_API_KEY="your-api-key-here"`}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 3: Run AI-Powered Scan</h4>
                      <CodeBlock
                        title="Execute scan"
                        code={`guardscan run --ai --provider gemini

# Or specify a model
guardscan run --ai --provider gemini --model gemini-pro

# For Gemini Flash (faster response)
guardscan run --ai --provider gemini --model gemini-flash`}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Ollama Setup */}
                <TabsContent value="ollama" className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Ollama Local AI Setup</h3>
                    <p className="text-muted-foreground mb-6">
                      Run GuardScan completely free with local AI models. No API keys, no cloud costs, 100% private.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 1: Install Ollama</h4>
                      <CodeBlock
                        title="Installation"
                        code={`# macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Download from https://ollama.com/download

# Verify installation
ollama --version`}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 2: Pull AI Model</h4>
                      <CodeBlock
                        title="Download model"
                        code={`# Pull Code Llama (recommended for code analysis)
ollama pull codellama

# Or pull Llama 2
ollama pull llama2

# For faster inference (smaller model)
ollama pull llama2:7b

# Verify model is available
ollama list`}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Step 3: Run Local AI Scan</h4>
                      <CodeBlock
                        title="Execute scan with local AI"
                        code={`guardscan run --local

# Or specify a model
guardscan run --local --model codellama

# With specific Ollama model
guardscan run --local --model llama2:7b`}
                      />
                    </div>

                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                      <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        Benefits of Local AI
                      </h5>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                        <li>✓ 100% free - no API costs</li>
                        <li>✓ Complete privacy - code never leaves your machine</li>
                        <li>✓ Works offline - no internet required</li>
                        <li>✓ No rate limits or quotas</li>
                        <li>✓ Full control over the AI model</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Configuration File */}
              <div className="mt-12 space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Configuration File (Optional)</h3>
                <p className="text-muted-foreground">
                  Store your preferences in <code className="px-2 py-1 bg-muted rounded text-sm">~/.guardscan/config.yml</code> for convenience:
                </p>
                <CodeBlock
                  title="~/.guardscan/config.yml"
                  language="yaml"
                  code={`# AI Provider Configuration
ai:
  provider: openai  # openai, claude, gemini, or ollama
  model: gpt-4      # model name
  
# For local AI
local:
  enabled: true
  model: codellama
  
# Default scan options
scan:
  verbose: true
  output_format: md
  
# Privacy settings
privacy:
  telemetry: false
  anonymous_stats: false`}
                />
              </div>
            </section>

            {/* Configuration Reference */}
            <section id="config-reference" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Settings className="w-8 h-8 text-primary" />
                Configuration Reference
              </h2>
              <p className="text-muted-foreground mb-6">
                GuardScan can be configured using a <code className="px-2 py-1 bg-muted rounded text-sm">~/.guardscan/config.yml</code> file.
              </p>
              <div className="space-y-4">
                {configOptions.map((option) => (
                  <Card key={option.key} className="p-4 bg-card/50 border-primary/20">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-4">
                        <code className="text-primary font-mono font-semibold">{option.key}</code>
                        <span className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary">{option.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Default:</span>{" "}
                          <code className="text-foreground font-mono">{option.default}</code>
                        </div>
                      </div>
                      {option.possibleValues && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Possible values:</span>{" "}
                          <span className="text-foreground">{option.possibleValues.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Environment Variables */}
            <section id="env-vars" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <FileCode className="w-8 h-8 text-primary" />
                Environment Variables
              </h2>
              <p className="text-muted-foreground mb-6">
                GuardScan supports the following environment variables for API key configuration:
              </p>
              <div className="space-y-4">
                {[
                  {
                    name: "OPENAI_API_KEY",
                    description: "Your OpenAI API key for GPT models",
                    example: "sk-..."
                  },
                  {
                    name: "ANTHROPIC_API_KEY",
                    description: "Your Anthropic API key for Claude models",
                    example: "sk-ant-..."
                  },
                  {
                    name: "GOOGLE_API_KEY",
                    description: "Your Google API key for Gemini models",
                    example: "AIza..."
                  },
                  {
                    name: "GUARDSCAN_CONFIG",
                    description: "Path to custom configuration file",
                    example: "~/my-config.yml"
                  },
                  {
                    name: "GUARDSCAN_TELEMETRY",
                    description: "Enable/disable telemetry",
                    example: "false"
                  }
                ].map((env) => (
                  <Card key={env.name} className="p-4 bg-card/50 border-primary/20">
                    <div className="flex flex-col gap-2">
                      <code className="text-primary font-mono font-semibold">{env.name}</code>
                      <p className="text-sm text-muted-foreground">{env.description}</p>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Example:</span>{" "}
                        <code className="text-foreground font-mono">{env.example}</code>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
