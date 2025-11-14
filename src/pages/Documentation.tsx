import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Terminal, Settings, Shield, TestTube, Package, Zap, Activity, FlaskConical, FileCode, RotateCcw, BookOpen } from "lucide-react";

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
      { command: "guardscan sbom", description: "Generate SBOM" },
      { command: "guardscan sbom --format cyclonedx", description: "Generate CycloneDX format" },
      { command: "guardscan sbom --include-dev", description: "Include dev dependencies" }
    ]
  },
  {
    name: "perf",
    icon: Zap,
    description: "Run performance testing and profiling",
    usage: "guardscan perf [options]",
    options: [
      { flag: "--benchmark", description: "Run benchmark tests" },
      { flag: "--profile", description: "Generate performance profile" },
      { flag: "--iterations <n>", description: "Number of test iterations" }
    ],
    examples: [
      { command: "guardscan perf", description: "Run performance tests" },
      { command: "guardscan perf --benchmark", description: "Run benchmarks" },
      { command: "guardscan perf --iterations 100", description: "Run 100 iterations" }
    ]
  },
  {
    name: "mutation",
    icon: FlaskConical,
    description: "Run mutation testing to verify test quality",
    usage: "guardscan mutation [options]",
    options: [
      { flag: "--files <pattern>", description: "Files to mutate (glob pattern)" },
      { flag: "--mutators <list>", description: "Comma-separated mutator types" },
      { flag: "--threshold <percent>", description: "Minimum mutation score" }
    ],
    examples: [
      { command: "guardscan mutation", description: "Run mutation testing" },
      { command: "guardscan mutation --files 'src/**/*.ts'", description: "Test TypeScript files" },
      { command: "guardscan mutation --threshold 75", description: "Require 75% mutation score" }
    ]
  },
  {
    name: "rules",
    icon: FileCode,
    description: "Custom YAML-based rule engine for code analysis",
    usage: "guardscan rules [options]",
    options: [
      { flag: "--config <file>", description: "Path to rules YAML file" },
      { flag: "--validate", description: "Validate rules syntax" },
      { flag: "--list", description: "List all active rules" }
    ],
    examples: [
      { command: "guardscan rules --config .guardscan-rules.yml", description: "Run custom rules" },
      { command: "guardscan rules --validate", description: "Check rules syntax" },
      { command: "guardscan rules --list", description: "Show active rules" }
    ]
  },
  {
    name: "run",
    icon: Zap,
    description: "AI-powered comprehensive code review (requires credits)",
    usage: "guardscan run [options]",
    options: [
      { flag: "--files <pattern>", description: "Files to review (glob pattern)" },
      { flag: "--max-tokens <n>", description: "Maximum tokens to send to AI" },
      { flag: "--provider <name>", description: "Override configured AI provider" },
      { flag: "--skip-static", description: "Skip static analysis, AI review only" }
    ],
    examples: [
      { command: "guardscan run", description: "Full AI-powered review" },
      { command: "guardscan run --files 'src/**/*.ts'", description: "Review TypeScript only" },
      { command: "guardscan run --provider claude", description: "Use Claude for this scan" },
      { command: "guardscan run --max-tokens 4000", description: "Limit AI context" }
    ]
  },
  {
    name: "reset",
    icon: RotateCcw,
    description: "Clear local cache and configuration",
    usage: "guardscan reset [options]",
    options: [
      { flag: "--config", description: "Reset configuration only" },
      { flag: "--cache", description: "Clear cache only" },
      { flag: "--all", description: "Reset everything (config + cache)" }
    ],
    examples: [
      { command: "guardscan reset --cache", description: "Clear cache" },
      { command: "guardscan reset --all", description: "Full reset" }
    ]
  }
];

const configOptions = [
  {
    key: "provider",
    type: "string",
    default: "openai",
    description: "AI provider to use for code review",
    possibleValues: ["openai", "claude", "gemini", "ollama", "lmstudio", "openrouter"]
  },
  {
    key: "api_key",
    type: "string",
    default: "null",
    description: "API key for the chosen provider",
    possibleValues: ["Your provider API key"]
  },
  {
    key: "client_id",
    type: "uuid",
    default: "auto-generated",
    description: "Unique client identifier (auto-generated on init)",
    possibleValues: ["UUID v4"]
  },
  {
    key: "offline_mode",
    type: "boolean",
    default: "false",
    description: "Run all scans in offline mode by default",
    possibleValues: ["true", "false"]
  },
  {
    key: "telemetry",
    type: "boolean",
    default: "true",
    description: "Send anonymous usage statistics",
    possibleValues: ["true", "false"]
  },
  {
    key: "max_file_size",
    type: "integer",
    default: "1048576",
    description: "Maximum file size to scan (bytes)",
    possibleValues: ["Any integer"]
  },
  {
    key: "exclude_patterns",
    type: "array",
    default: "[\"node_modules\", \".git\", \"dist\", \"build\"]",
    description: "Glob patterns to exclude from scanning",
    possibleValues: ["Array of glob patterns"]
  }
];

export default function Documentation() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete API reference, configuration options, and examples for all GuardScan CLI commands
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8">
            Quick <span className="text-gradient">Start</span>
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-code-bg border border-border/50">
              <div className="text-muted-foreground mb-2"># Install globally</div>
              <div className="font-mono text-terminal-green">
                <span className="text-terminal-cyan">$ </span>npm install -g guardscan
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-code-bg border border-border/50">
              <div className="text-muted-foreground mb-2"># Initialize in your project</div>
              <div className="font-mono text-terminal-green">
                <span className="text-terminal-cyan">$ </span>guardscan init
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-code-bg border border-border/50">
              <div className="text-muted-foreground mb-2"># Run your first scan</div>
              <div className="font-mono text-terminal-green">
                <span className="text-terminal-cyan">$ </span>guardscan security --offline
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Reference */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12">
            Commands <span className="text-gradient">Reference</span>
          </h2>
          
          <div className="space-y-12">
            {commands.map((cmd) => (
              <div key={cmd.name} id={cmd.name} className="scroll-mt-20">
                <div className="p-6 rounded-lg bg-card border border-border">
                  {/* Command Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <cmd.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-2">
                        guardscan {cmd.name}
                      </h3>
                      <p className="text-muted-foreground">{cmd.description}</p>
                    </div>
                  </div>

                  {/* Usage */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-primary mb-2">USAGE</h4>
                    <div className="p-3 rounded bg-code-bg font-mono text-sm text-terminal-green">
                      {cmd.usage}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-primary mb-3">OPTIONS</h4>
                    <div className="space-y-2">
                      {cmd.options.map((opt, idx) => (
                        <div key={idx} className="flex gap-4 text-sm">
                          <code className="text-terminal-cyan font-mono whitespace-nowrap">
                            {opt.flag}
                          </code>
                          <span className="text-muted-foreground">{opt.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-3">EXAMPLES</h4>
                    <div className="space-y-3">
                      {cmd.examples.map((ex, idx) => (
                        <div key={idx}>
                          <div className="p-3 rounded bg-code-bg font-mono text-sm text-terminal-green mb-1">
                            <span className="text-terminal-cyan">$ </span>{ex.command}
                          </div>
                          <p className="text-sm text-muted-foreground pl-3">{ex.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configuration Reference */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8">
            Configuration <span className="text-gradient">Reference</span>
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Configuration is stored in <code className="text-terminal-cyan">~/.guardscan/config.yml</code>. 
            You can also create a <code className="text-terminal-cyan">.guardscanrc</code> file in your project root for project-specific settings.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-bold">Key</th>
                  <th className="text-left p-4 font-bold">Type</th>
                  <th className="text-left p-4 font-bold">Default</th>
                  <th className="text-left p-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                {configOptions.map((opt, idx) => (
                  <tr key={idx} className="border-b border-border/50">
                    <td className="p-4">
                      <code className="text-terminal-cyan font-mono">{opt.key}</code>
                    </td>
                    <td className="p-4 text-muted-foreground">{opt.type}</td>
                    <td className="p-4 text-sm">
                      <code className="text-terminal-green">{opt.default}</code>
                    </td>
                    <td className="p-4 text-muted-foreground">{opt.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Example Config */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Example Configuration</h3>
            <div className="p-4 rounded-lg bg-code-bg border border-border/50 font-mono text-sm overflow-x-auto">
              <pre className="text-terminal-green">
{`# ~/.guardscan/config.yml
provider: openai
api_key: sk-your-api-key-here
client_id: 550e8400-e29b-41d4-a716-446655440000
offline_mode: false
telemetry: true
max_file_size: 1048576
exclude_patterns:
  - node_modules
  - .git
  - dist
  - build
  - coverage`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Variables */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8">
            Environment <span className="text-gradient">Variables</span>
          </h2>
          
          <p className="text-muted-foreground mb-6">
            GuardScan supports environment variable overrides for all configuration options:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <code className="text-terminal-cyan font-mono text-sm">GUARDSCAN_PROVIDER</code>
              <p className="text-muted-foreground text-sm mt-2">Override AI provider</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <code className="text-terminal-cyan font-mono text-sm">GUARDSCAN_API_KEY</code>
              <p className="text-muted-foreground text-sm mt-2">Override API key</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <code className="text-terminal-cyan font-mono text-sm">GUARDSCAN_OFFLINE</code>
              <p className="text-muted-foreground text-sm mt-2">Force offline mode (true/false)</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <code className="text-terminal-cyan font-mono text-sm">GUARDSCAN_CONFIG_PATH</code>
              <p className="text-muted-foreground text-sm mt-2">Custom config file path</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
