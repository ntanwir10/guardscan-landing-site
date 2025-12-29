import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CodeBlock } from "@/components/CodeBlock";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Terminal,
  Settings,
  Shield,
  TestTube,
  Package,
  Zap,
  Activity,
  FlaskConical,
  FileCode,
  RotateCcw,
  BookOpen,
  Key,
  Server,
  CheckCircle,
  ChevronRight,
  Search,
  X,
  Menu,
  Gauge,
  Eye,
  FileCheck,
  GitCommit,
  Wand2,
  ShieldCheck,
  RefreshCw,
  MessageSquare,
  FileText,
  Container,
  Coffee,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";
import { BUY_ME_A_COFFEE_URL } from "@/lib/constants";

const commands = [
  {
    name: "init",
    icon: Settings,
    description: "Initialize GuardScan configuration and generate client ID",
    usage: "guardscan init",
    options: [
      { flag: "--force", description: "Overwrite existing configuration" },
      { flag: "--skip-git", description: "Skip git repository detection" },
    ],
    examples: [
      { command: "guardscan init", description: "Initialize with defaults" },
      {
        command: "guardscan init --force",
        description: "Reset and reinitialize",
      },
    ],
  },
  {
    name: "config",
    icon: Settings,
    description: "Configure AI provider and API keys",
    usage: "guardscan config [options]",
    options: [
      {
        flag: "--provider <name>",
        description: "Set AI provider (openai, claude, gemini, ollama, etc.)",
      },
      {
        flag: "--api-key <key>",
        description: "Set API key for chosen provider",
      },
      { flag: "--list", description: "List all available providers" },
    ],
    examples: [
      {
        command: "guardscan config --provider openai --api-key sk-...",
        description: "Configure OpenAI",
      },
      {
        command: "guardscan config --provider ollama",
        description: "Use local Ollama (no API key needed)",
      },
      { command: "guardscan config --list", description: "Show all providers" },
    ],
  },
  {
    name: "status",
    icon: Activity,
    description: "Show current configuration, credits, and system status",
    usage: "guardscan status",
    options: [
      { flag: "--json", description: "Output in JSON format" },
      { flag: "--verbose", description: "Show detailed information" },
    ],
    examples: [
      { command: "guardscan status", description: "Show status summary" },
      { command: "guardscan status --json", description: "Get status as JSON" },
    ],
  },
  {
    name: "security",
    icon: Shield,
    description: "Run security vulnerability scanning (works offline)",
    usage: "guardscan security [options]",
    options: [
      {
        flag: "--offline",
        description: "Force offline mode (no credit validation)",
      },
      {
        flag: "--ai-fix",
        description: "Get AI-powered fix suggestions for vulnerabilities",
      },
      {
        flag: "--severity <level>",
        description: "Filter by severity (critical, high, medium, low)",
      },
      { flag: "--output <file>", description: "Save report to file" },
      {
        flag: "--format <type>",
        description: "Output format (markdown, json, html)",
      },
    ],
    examples: [
      { command: "guardscan security", description: "Run full security scan" },
      {
        command: "guardscan security --offline",
        description: "Scan without internet",
      },
      {
        command: "guardscan security --ai-fix",
        description: "Get AI-powered fix suggestions",
      },
      {
        command: "guardscan security --severity critical",
        description: "Show only critical issues",
      },
      {
        command: "guardscan security --output report.md",
        description: "Save report to file",
      },
    ],
  },
  {
    name: "test",
    icon: TestTube,
    description: "Run tests with coverage and quality analysis",
    usage: "guardscan test [options]",
    options: [
      { flag: "--coverage", description: "Generate coverage report" },
      {
        flag: "--framework <name>",
        description: "Specify test framework (jest, pytest, etc.)",
      },
      {
        flag: "--threshold <percent>",
        description: "Set minimum coverage threshold",
      },
    ],
    examples: [
      { command: "guardscan test", description: "Run all tests" },
      {
        command: "guardscan test --coverage",
        description: "Run with coverage report",
      },
      {
        command: "guardscan test --threshold 80",
        description: "Require 80% coverage",
      },
    ],
  },
  {
    name: "sbom",
    icon: Package,
    description: "Generate Software Bill of Materials",
    usage: "guardscan sbom [options]",
    options: [
      {
        flag: "--format <type>",
        description: "Output format (json, xml, cyclonedx)",
      },
      {
        flag: "--include-dev",
        description: "Include development dependencies",
      },
      { flag: "--output <file>", description: "Save SBOM to file" },
    ],
    examples: [
      { command: "guardscan sbom", description: "Generate SBOM in JSON" },
      {
        command: "guardscan sbom --format cyclonedx",
        description: "Generate CycloneDX format",
      },
      {
        command: "guardscan sbom --include-dev",
        description: "Include dev dependencies",
      },
    ],
  },
  {
    name: "reset",
    icon: RotateCcw,
    description: "Clear local cache & config",
    usage: "guardscan reset [options]",
    options: [
      {
        flag: "--confirm",
        description: "Skip confirmation prompt",
      },
      {
        flag: "--cache-only",
        description: "Only clear cache, keep config",
      },
      {
        flag: "--config-only",
        description: "Only clear config, keep cache",
      },
    ],
    examples: [
      {
        command: "guardscan reset",
        description: "Clear cache and config (with confirmation)",
      },
      {
        command: "guardscan reset --confirm",
        description: "Clear without confirmation prompt",
      },
      {
        command: "guardscan reset --cache-only",
        description: "Only clear cache files",
      },
    ],
  },
  {
    name: "scan",
    icon: Search,
    description: "Comprehensive security scan (AI-enhanced by default)",
    usage: "guardscan scan [options]",
    options: [
      {
        flag: "--skip-ai",
        description: "Disable AI analysis (AI is enabled by default)",
      },
      {
        flag: "--quick",
        description: "Fast scan mode (skip deep analysis)",
      },
      {
        flag: "--format <type>",
        description: "Output format (markdown, json, html)",
      },
      {
        flag: "--output <file>",
        description: "Save report to file",
      },
      {
        flag: "--severity <level>",
        description: "Filter by severity (critical, high, medium, low)",
      },
    ],
    examples: [
      {
        command: "guardscan scan",
        description: "Run comprehensive scan with AI",
      },
      {
        command: "guardscan scan --skip-ai",
        description: "Run scan without AI analysis",
      },
      {
        command: "guardscan scan --quick",
        description: "Fast scan mode",
      },
      {
        command: "guardscan scan --format json --output report.json",
        description: "Save JSON report",
      },
    ],
  },
  {
    name: "run",
    icon: Zap,
    description: "AI-enhanced full code review (BYOK - Bring Your Own Key)",
    usage: "guardscan run [options]",
    options: [
      {
        flag: "--ai",
        description: "Enable AI-powered analysis",
      },
      {
        flag: "--local",
        description: "Use local Ollama for AI analysis",
      },
      {
        flag: "--provider <name>",
        description: "AI provider (openai, claude, gemini, ollama)",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
      {
        flag: "--format <type>",
        description: "Output format (markdown, json, html)",
      },
    ],
    examples: [
      {
        command: "guardscan run --ai",
        description: "Run AI-powered code review",
      },
      {
        command: "guardscan run --local",
        description: "Use local Ollama for analysis",
      },
      {
        command: "guardscan run --ai --provider claude --model claude-3-opus",
        description: "Use Claude for AI review",
      },
    ],
  },
  {
    name: "perf",
    icon: Gauge,
    description: "Performance testing & load testing",
    usage: "guardscan perf [options]",
    options: [
      {
        flag: "--load",
        description: "Run load testing",
      },
      {
        flag: "--benchmark",
        description: "Run performance benchmarks",
      },
      {
        flag: "--duration <seconds>",
        description: "Test duration in seconds",
      },
      {
        flag: "--concurrent <number>",
        description: "Number of concurrent requests",
      },
      {
        flag: "--output <file>",
        description: "Save report to file",
      },
    ],
    examples: [
      { command: "guardscan perf", description: "Run performance analysis" },
      {
        command: "guardscan perf --load --duration 60",
        description: "Load test for 60 seconds",
      },
      {
        command: "guardscan perf --benchmark",
        description: "Run performance benchmarks",
      },
    ],
  },
  {
    name: "mutation",
    icon: FlaskConical,
    description: "Mutation testing for test quality",
    usage: "guardscan mutation [options]",
    options: [
      {
        flag: "--threshold <percent>",
        description: "Minimum mutation score threshold",
      },
      {
        flag: "--framework <name>",
        description: "Test framework (jest, pytest, etc.)",
      },
      {
        flag: "--mutators <list>",
        description: "Comma-separated list of mutators to use",
      },
      {
        flag: "--output <file>",
        description: "Save report to file",
      },
    ],
    examples: [
      { command: "guardscan mutation", description: "Run mutation testing" },
      {
        command: "guardscan mutation --threshold 80",
        description: "Require 80% mutation score",
      },
      {
        command: "guardscan mutation --framework jest",
        description: "Use Jest for mutation testing",
      },
    ],
  },
  {
    name: "rules",
    icon: FileText,
    description: "Custom YAML-based rule engine",
    usage: "guardscan rules [options]",
    options: [
      {
        flag: "--file <path>",
        description: "Path to custom rules YAML file",
      },
      {
        flag: "--list",
        description: "List all available rules",
      },
      {
        flag: "--validate",
        description: "Validate rules file syntax",
      },
      {
        flag: "--enable <rule>",
        description: "Enable specific rule",
      },
      {
        flag: "--disable <rule>",
        description: "Disable specific rule",
      },
    ],
    examples: [
      {
        command: "guardscan rules --list",
        description: "List all available rules",
      },
      {
        command: "guardscan rules --file custom-rules.yml",
        description: "Use custom rules file",
      },
      {
        command: "guardscan rules --validate --file rules.yml",
        description: "Validate rules file",
      },
    ],
  },
  {
    name: "explain",
    icon: Eye,
    description: "Explain how code works (BYOK - Bring Your Own Key)",
    usage: "guardscan explain <file> [options]",
    options: [
      {
        flag: "--file <path>",
        description: "File path to explain",
      },
      {
        flag: "--deep",
        description: "Deep explanation with context",
      },
      {
        flag: "--format <type>",
        description: "Output format (markdown, json)",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
    ],
    examples: [
      {
        command: "guardscan explain src/utils.ts",
        description: "Explain a specific file",
      },
      {
        command: "guardscan explain src/utils.ts --deep",
        description: "Get deep explanation with context",
      },
      {
        command: "guardscan explain src/utils.ts --format markdown",
        description: "Get explanation in markdown format",
      },
    ],
  },
  {
    name: "review",
    icon: FileCheck,
    description: "Comprehensive AI code review (BYOK - Bring Your Own Key)",
    usage: "guardscan review <file> [options]",
    options: [
      {
        flag: "--file <path>",
        description: "File path to review",
      },
      {
        flag: "--deep",
        description: "Deep review with detailed analysis",
      },
      {
        flag: "--focus <area>",
        description: "Focus on specific area (security, performance, quality)",
      },
      {
        flag: "--format <type>",
        description: "Output format (markdown, json, html)",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
    ],
    examples: [
      {
        command: "guardscan review src/auth.ts",
        description: "Review a specific file",
      },
      {
        command: "guardscan review src/auth.ts --deep",
        description: "Deep review with detailed analysis",
      },
      {
        command: "guardscan review src/auth.ts --focus security",
        description: "Focus on security aspects",
      },
    ],
  },
  {
    name: "commit",
    icon: GitCommit,
    description: "Generate commit messages (BYOK - Bring Your Own Key)",
    usage: "guardscan commit [options]",
    options: [
      {
        flag: "--staged",
        description: "Generate message for staged changes",
      },
      {
        flag: "--format <type>",
        description: "Message format (conventional, simple, detailed)",
      },
      {
        flag: "--conventional",
        description: "Use conventional commit format",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
    ],
    examples: [
      {
        command: "guardscan commit",
        description: "Generate commit message for changes",
      },
      {
        command: "guardscan commit --staged",
        description: "Generate message for staged changes only",
      },
      {
        command: "guardscan commit --conventional",
        description: "Generate conventional commit message",
      },
    ],
  },
  {
    name: "docs",
    icon: BookOpen,
    description: "Auto-generate documentation (BYOK - Bring Your Own Key)",
    usage: "guardscan docs <file> [options]",
    options: [
      {
        flag: "--file <path>",
        description: "File path to document",
      },
      {
        flag: "--format <type>",
        description: "Documentation format (markdown, jsdoc, tsdoc)",
      },
      {
        flag: "--output <file>",
        description: "Output file path",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
    ],
    examples: [
      {
        command: "guardscan docs src/api.ts",
        description: "Generate docs for a file",
      },
      {
        command: "guardscan docs src/api.ts --format jsdoc",
        description: "Generate JSDoc comments",
      },
      {
        command: "guardscan docs src/api.ts --output docs/api.md",
        description: "Save docs to specific file",
      },
    ],
  },
  {
    name: "test-gen",
    icon: Wand2,
    description: "Generate unit tests (BYOK - Bring Your Own Key)",
    usage: "guardscan test-gen <file> [options]",
    options: [
      {
        flag: "--file <path>",
        description: "File path to generate tests for",
      },
      {
        flag: "--framework <name>",
        description: "Test framework (jest, pytest, unittest, etc.)",
      },
      {
        flag: "--coverage",
        description: "Generate tests for uncovered code",
      },
      {
        flag: "--output <file>",
        description: "Output test file path",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
    ],
    examples: [
      {
        command: "guardscan test-gen src/utils.ts",
        description: "Generate tests for a file",
      },
      {
        command: "guardscan test-gen src/utils.ts --framework jest",
        description: "Generate Jest tests",
      },
      {
        command: "guardscan test-gen src/utils.ts --coverage",
        description: "Generate tests for uncovered code",
      },
    ],
  },
  {
    name: "refactor",
    icon: Wand2,
    description: "Get refactoring suggestions (BYOK - Bring Your Own Key)",
    usage: "guardscan refactor <file> [options]",
    options: [
      {
        flag: "--file <path>",
        description: "File path to refactor",
      },
      {
        flag: "--apply",
        description: "Automatically apply refactoring suggestions",
      },
      {
        flag: "--suggestions",
        description: "Show refactoring suggestions only",
      },
      {
        flag: "--format <type>",
        description: "Output format (markdown, json)",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
    ],
    examples: [
      {
        command: "guardscan refactor src/legacy.ts",
        description: "Get refactoring suggestions",
      },
      {
        command: "guardscan refactor src/legacy.ts --suggestions",
        description: "Show suggestions without applying",
      },
      {
        command: "guardscan refactor src/legacy.ts --apply",
        description: "Apply refactoring suggestions automatically",
      },
    ],
  },
  {
    name: "threat-model",
    icon: ShieldCheck,
    description: "Security architecture analysis (BYOK - Bring Your Own Key)",
    usage: "guardscan threat-model [options]",
    options: [
      {
        flag: "--format <type>",
        description: "Output format (markdown, json, html)",
      },
      {
        flag: "--output <file>",
        description: "Save threat model to file",
      },
      {
        flag: "--deep",
        description: "Deep analysis with detailed threats",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
    ],
    examples: [
      {
        command: "guardscan threat-model",
        description: "Generate threat model",
      },
      {
        command: "guardscan threat-model --deep",
        description: "Deep analysis with detailed threats",
      },
      {
        command:
          "guardscan threat-model --format html --output threat-model.html",
        description: "Save threat model as HTML",
      },
    ],
  },
  {
    name: "migrate",
    icon: RefreshCw,
    description:
      "Framework/language migration help (BYOK - Bring Your Own Key)",
    usage: "guardscan migrate [options]",
    options: [
      {
        flag: "--from <framework>",
        description: "Source framework or language",
      },
      {
        flag: "--to <framework>",
        description: "Target framework or language",
      },
      {
        flag: "--dry-run",
        description: "Show migration plan without applying",
      },
      {
        flag: "--output <file>",
        description: "Save migration plan to file",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
    ],
    examples: [
      {
        command: "guardscan migrate --from react --to vue",
        description: "Get migration plan from React to Vue",
      },
      {
        command: "guardscan migrate --from python2 --to python3 --dry-run",
        description: "Show Python 2 to 3 migration plan",
      },
      {
        command:
          "guardscan migrate --from express --to fastify --output migration.md",
        description: "Save migration plan to file",
      },
    ],
  },
  {
    name: "chat",
    icon: MessageSquare,
    description:
      "Interactive Q&A about codebase (RAG - BYOK - Bring Your Own Key)",
    usage: "guardscan chat [options]",
    options: [
      {
        flag: "--context <path>",
        description: "Codebase path or file to include in context",
      },
      {
        flag: "--model <name>",
        description: "AI model to use",
      },
      {
        flag: "--session",
        description: "Start interactive chat session",
      },
    ],
    examples: [
      {
        command: "guardscan chat",
        description: "Start interactive chat session",
      },
      {
        command: "guardscan chat --context src/",
        description: "Chat with src/ directory context",
      },
      {
        command: "guardscan chat --session",
        description: "Start persistent chat session",
      },
    ],
  },
];

const configOptions = [
  {
    key: "ai.provider",
    type: "string",
    default: "openai",
    description: "Default AI provider",
    possibleValues: ["openai", "claude", "gemini", "ollama"],
  },
  {
    key: "ai.model",
    type: "string",
    default: "gpt-4",
    description: "Default AI model for the chosen provider",
    possibleValues: [
      "gpt-4",
      "gpt-3.5-turbo",
      "claude-3-opus",
      "gemini-pro",
      "codellama",
    ],
  },
  {
    key: "scan.verbose",
    type: "boolean",
    default: "false",
    description: "Enable verbose output for all scans",
    possibleValues: ["true", "false"],
  },
  {
    key: "scan.output_format",
    type: "string",
    default: "markdown",
    description: "Default output format for reports",
    possibleValues: ["markdown", "json", "html"],
  },
  {
    key: "privacy.telemetry",
    type: "boolean",
    default: "true",
    description: "Enable anonymous usage telemetry",
    possibleValues: ["true", "false"],
  },
  {
    key: "exclude_patterns",
    type: "array",
    default: '["node_modules", ".git", "dist", "build"]',
    description: "Glob patterns to exclude from scanning",
    possibleValues: ["Array of glob patterns"],
  },
];

const navigationSections = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Commands",
    items: [
      { id: "ai-commands-overview", label: "AI Commands Overview" },
      { id: "commands", label: "Command Reference" },
    ],
  },
  {
    title: "Guides",
    items: [{ id: "chat-guide", label: "Chat Guide" }],
  },
  {
    title: "Configuration",
    items: [
      { id: "byok-setup", label: "BYOK Setup" },
      { id: "config-reference", label: "Config Reference" },
      { id: "env-vars", label: "Environment Variables" },
    ],
  },
  {
    title: "Deployment",
    items: [{ id: "docker", label: "Docker Guide" }],
  },
];

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false); // Close mobile menu on navigation
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      // Scroll to section accounting for fixed header; fallback to scrollIntoView
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      // Ensure navigation still works if custom offsets change
      if (Math.abs(window.pageYOffset - offsetPosition) > 5) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Create searchable content from all documentation sections
  const searchableContent = useMemo(() => {
    const content: Array<{
      id: string;
      title: string;
      content: string;
      category: string;
      section: string;
    }> = [];

    // Add commands
    commands.forEach((cmd) => {
      content.push({
        id: `cmd-${cmd.name}`,
        title: cmd.name,
        content: `${cmd.name} ${cmd.description} ${cmd.usage} ${cmd.options
          ?.map((o) => `${o.flag} ${o.description}`)
          .join(" ")} ${cmd.examples
          ?.map((e) => `${e.command} ${e.description}`)
          .join(" ")}`,
        category: "Commands",
        section: "commands",
      });
    });

    // Add configuration options
    configOptions.forEach((opt) => {
      content.push({
        id: `config-${opt.key}`,
        title: opt.key,
        content: `${opt.key} ${opt.description} ${opt.type} ${
          opt.default
        } ${opt.possibleValues?.join(" ")}`,
        category: "Configuration",
        section: "config-reference",
      });
    });

    // Add sections
    content.push(
      {
        id: "intro",
        title: "Introduction",
        content:
          "GuardScan free open-source CLI tool comprehensive codebase analysis documentation",
        category: "Getting Started",
        section: "introduction",
      },
      {
        id: "quick-start",
        title: "Quick Start",
        content:
          "installation npm install guardscan first scan initialize security AI analysis",
        category: "Getting Started",
        section: "quick-start",
      },
      {
        id: "byok",
        title: "BYOK Setup",
        content:
          "bring your own key API OpenAI Claude Gemini Ollama local AI provider configuration environment variables",
        category: "Configuration",
        section: "byok-setup",
      },
      {
        id: "env-vars",
        title: "Environment Variables",
        content:
          "OPENAI_API_KEY ANTHROPIC_API_KEY GOOGLE_API_KEY GUARDSCAN_CONFIG GUARDSCAN_TELEMETRY environment variables configuration",
        category: "Configuration",
        section: "env-vars",
      },
      {
        id: "docker",
        title: "Docker Guide",
        content:
          "Docker container deployment installation Linux macOS Windows Alpine Linux docker-compose CI/CD volume mounting environment variables",
        category: "Deployment",
        section: "docker",
      },
      {
        id: "ai-overview",
        title: "AI Commands Overview",
        content:
          "Fully AI-Dependent commands AI-Enhanced commands AI Configuration commit explain test-gen docs chat refactor threat-model migrate review run scan security config --ai --skip-ai --ai-fix",
        category: "Commands",
        section: "ai-commands-overview",
      },
      {
        id: "chat-guide",
        title: "Chat Guide",
        content:
          "GuardScan Chat RAG overview interactive commands /help /clear /stats /export /exit CLI options model temperature rebuild embedding-provider session export best practices troubleshooting privacy security use cases",
        category: "Guides",
        section: "chat-guide",
      }
    );

    return content;
  }, []);

  // Keyboard shortcut handler for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll spy: Update active section based on scroll position
  useEffect(() => {
    // Get all section IDs from navigationSections
    const sectionIds = navigationSections.flatMap((section) =>
      section.items.map((item) => item.id)
    );

    // Create an Intersection Observer
    const observerOptions = {
      // rootMargin accounts for the fixed header (100px) and focuses on top portion of viewport
      rootMargin: "-100px 0px -66% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // When a section becomes visible, update activeSection
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (sectionIds.includes(id)) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
      observer.disconnect();
    };
  }, []);

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(searchableContent, {
      keys: ["title", "content", "category"],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [searchableContent]);

  // Filter results based on search query (minimal debounce for instant feel)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return fuse.search(searchQuery).slice(0, 20);
  }, [searchQuery, fuse]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, typeof searchResults> = {};
    searchResults.forEach((result) => {
      const category = result.item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(result);
    });
    return groups;
  }, [searchResults]);

  // Sidebar Navigation Component
  const SidebarNav = () => (
    <nav className="space-y-6">
      {/* Navigation Sections */}
      {navigationSections.map((section) => (
        <div key={section.title}>
          <h4 className="font-semibold text-sm text-foreground mb-3">
            {section.title}
          </h4>
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
  );

  // Handle search result selection
  const handleSearchSelect = (section: string) => {
    scrollToSection(section);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Documentation - GuardScan CLI Guide"
        description="Complete documentation for GuardScan CLI. Learn installation, configuration, security scanning, AI features, and integrations. Step-by-step guides and examples."
        canonical="https://guardscancli.com/docs"
        keywords="guardscan documentation, CLI guide, security scanning docs, SAST documentation, code review setup, API reference"
      />
      <Navigation onSearchClick={() => setSearchOpen(true)} />

      {/* Search Modal */}
      <CommandDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        shouldFilter={false}
      >
        <CommandInput
          placeholder="Search documentation..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>
            {searchQuery.trim() ? (
              <>No results found for &quot;{searchQuery}&quot;</>
            ) : (
              <>Type to search documentation...</>
            )}
          </CommandEmpty>
          {!searchQuery.trim() && (
            <CommandGroup heading="Navigation">
              {navigationSections.flatMap((section) =>
                section.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSearchSelect(item.id)}
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          )}
          {Object.entries(groupedResults).map(([category, results]) => (
            <CommandGroup key={category} heading={category}>
              {results.map((result) => {
                // Find the command icon if it's a command
                const command = commands.find(
                  (cmd) => cmd.name === result.item.title
                );
                const Icon = command?.icon || FileCode;
                return (
                  <CommandItem
                    key={result.item.id}
                    onSelect={() => handleSearchSelect(result.item.section)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{result.item.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-background shadow-lg"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-6 overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground">
                Documentation
              </h2>
            </div>
            <SidebarNav />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 flex pt-20">
        {/* Sidebar Navigation - Desktop Only */}
        <aside className="hidden lg:block w-64 border-r border-border bg-card fixed left-0 top-16 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="p-6">
            <SidebarNav />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 w-full overflow-x-hidden">
          <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 pt-12 sm:pt-16 lg:pt-12">
            {/* Introduction */}
            <section id="introduction" className="mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Documentation
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                GuardScan is a free, open-source CLI tool for comprehensive
                codebase analysis. This documentation provides everything you
                need to get started and master GuardScan.
              </p>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Zap className="w-8 h-8 text-primary" />
                Quick Start
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get started with GuardScan in under 2 minutes! All static
                analysis features work <strong>100% free and offline</strong> -
                no API keys required!
              </p>

              {/* Installation */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Installation
                </h3>
                <CodeBlock
                  code={`# Install GuardScan globally
npm install -g guardscan

# Verify installation
guardscan --version`}
                />
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Requirements:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>Node.js &gt;= 18.0.0</li>
                    <li>npm or yarn</li>
                  </ul>
                </div>
              </div>

              {/* Quick Start Steps */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Quick Start (3 Steps)
                </h3>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <Card className="p-6 bg-card/50 border-primary/20">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-3 text-foreground">
                          Initialize GuardScan
                        </h4>
                        <CodeBlock code="guardscan init" />
                        <p className="text-sm text-muted-foreground mt-3">
                          This creates a local configuration file and generates
                          a client ID for optional telemetry.
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Step 2 */}
                  <Card className="p-6 bg-card/50 border-primary/20">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-3 text-foreground">
                          Run Your First Security Scan
                        </h4>
                        <CodeBlock code="guardscan security" />
                        <p className="text-sm text-muted-foreground mt-3 mb-3">
                          This will:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                          <li>
                            Detect secrets in your code (API keys, passwords,
                            tokens)
                          </li>
                          <li>Scan dependencies for known vulnerabilities</li>
                          <li>Check Dockerfiles for security issues</li>
                          <li>
                            Analyze Infrastructure as Code (Terraform,
                            CloudFormation, K8s)
                          </li>
                          <li>Detect OWASP Top 10 vulnerabilities</li>
                          <li>Generate a comprehensive markdown report</li>
                        </ul>
                        <div className="mt-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                          <p className="text-sm text-foreground font-semibold">
                            No API key needed - all security scanning works
                            completely offline!
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Step 3 */}
                  <Card className="p-6 bg-card/50 border-primary/20">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-3 text-foreground">
                          (Optional) Configure AI Provider
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          For AI-powered features like code review,
                          documentation generation, and refactoring:
                        </p>
                        <CodeBlock code="guardscan config" />
                        <p className="text-sm text-muted-foreground mt-3">
                          Follow the prompts to set:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc mt-2">
                          <li>
                            AI provider (OpenAI, Anthropic Claude, Google
                            Gemini, or Ollama for local AI)
                          </li>
                          <li>API key (your own key - we never see it)</li>
                          <li>Telemetry preference</li>
                        </ul>
                        <div className="mt-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                          <p className="text-sm text-foreground font-semibold">
                            Note: AI features are optional. All security
                            scanning works without any API keys!
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Common Use Cases */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Common Use Cases
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-3 text-foreground">
                      Security Audit Before Deployment
                    </h4>
                    <CodeBlock
                      code={`# Run comprehensive security scan
guardscan security

# Check for dependency vulnerabilities
guardscan security --licenses

# Generate SBOM for compliance
guardscan sbom --format spdx`}
                    />
                  </Card>

                  <Card className="p-6 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-3 text-foreground">
                      AI-Powered Code Review
                    </h4>
                    <CodeBlock
                      code={`# Review all changes in your git repository
guardscan review

# Review specific file
guardscan review --file src/api.ts

# Get AI suggestions for security issues
guardscan security --ai-fix`}
                    />
                  </Card>

                  <Card className="p-6 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-3 text-foreground">
                      Code Quality & Testing
                    </h4>
                    <CodeBlock
                      code={`# Run all quality checks
guardscan test --all

# Performance testing
guardscan perf --load --duration 1m

# Mutation testing
guardscan mutation --threshold 80`}
                    />
                  </Card>

                  <Card className="p-6 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-3 text-foreground">
                      AI Code Assistance
                    </h4>
                    <CodeBlock
                      code={`# Explain a function
guardscan explain getUserData --type function

# Generate tests
guardscan test-gen --function calculateTotal

# Generate documentation
guardscan docs --type api

# Interactive chat about your codebase
guardscan chat`}
                    />
                  </Card>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Privacy & Security
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      What GuardScan Does
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                      <li>Scans your code locally on your machine</li>
                      <li>Never uploads source code to any server</li>
                      <li>Works completely offline for static analysis</li>
                      <li>
                        Uses your own AI API keys (BYOK - Bring Your Own Key)
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-3 text-foreground">
                      What GuardScan Sends (Optional Telemetry)
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc mb-4">
                      <li>Client ID (anonymous identifier)</li>
                      <li>Repository ID (hashed, anonymous)</li>
                      <li>Lines of code count</li>
                      <li>Command usage statistics</li>
                    </ul>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        You can disable telemetry:
                      </p>
                      <CodeBlock code="guardscan --no-telemetry security" />
                    </div>
                  </Card>
                </div>
              </div>

              {/* How It Works */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  How It Works
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-3 text-foreground">
                      Offline-First Architecture
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 font-semibold">
                      Static Analysis (Works completely offline, 100% FREE):
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>Secrets detection (20+ patterns)</li>
                      <li>Dependency vulnerability scanning</li>
                      <li>Code metrics and complexity analysis</li>
                      <li>LOC counting (20+ languages)</li>
                      <li>OWASP Top 10 detection</li>
                      <li>Docker security scanning</li>
                      <li>Infrastructure as Code analysis</li>
                    </ul>
                  </Card>

                  <Card className="p-6 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-3 text-foreground">
                      AI-Enhanced (Optional)
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Requires your API key:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>OpenAI GPT-4, GPT-3.5</li>
                      <li>Anthropic Claude (Opus, Sonnet, Haiku)</li>
                      <li>Google Gemini</li>
                      <li>Ollama (local/offline AI)</li>
                      <li>LM Studio (local AI)</li>
                    </ul>
                  </Card>
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Troubleshooting
                </h3>

                <div className="space-y-4">
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Command Not Found
                    </h4>
                    <CodeBlock
                      code={`# Check if GuardScan is installed
npm list -g guardscan

# If not installed, install it
npm install -g guardscan

# Verify it's in your PATH
which guardscan`}
                    />
                  </Card>

                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Permission Errors (macOS/Linux)
                    </h4>
                    <CodeBlock
                      code={`# Use sudo if needed (not recommended)
sudo npm install -g guardscan

# Better: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install -g guardscan`}
                    />
                  </Card>

                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      AI Features Not Working
                    </h4>
                    <CodeBlock
                      code={`# Check your configuration
guardscan status

# Reconfigure AI provider
guardscan config

# Verify API key is set correctly
guardscan config --show`}
                    />
                  </Card>

                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Clear Cache and Start Fresh
                    </h4>
                    <CodeBlock
                      code={`# Reset all local data
guardscan reset --all

# Re-initialize
guardscan init`}
                    />
                  </Card>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mt-12 p-6 bg-accent/10 border border-accent/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-4">
                  Next Steps
                </h4>
                <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                  <li>
                    <strong className="text-foreground">Install:</strong>{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      npm install -g guardscan
                    </code>
                  </li>
                  <li>
                    <strong className="text-foreground">Initialize:</strong>{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      guardscan init
                    </code>
                  </li>
                  <li>
                    <strong className="text-foreground">Scan:</strong>{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      guardscan security
                    </code>{" "}
                    (works offline, 100% free!)
                  </li>
                  <li>
                    <strong className="text-foreground">Configure AI</strong>{" "}
                    (optional):{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      guardscan config
                    </code>
                  </li>
                  <li>
                    <strong className="text-foreground">Explore:</strong> Try{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      guardscan --help
                    </code>{" "}
                    to see all commands
                  </li>
                </ol>
                <p className="text-sm text-foreground font-semibold mt-4">
                  That's it! You're ready to start scanning your code for
                  security issues.
                </p>
              </div>
            </section>

            {/* AI Commands Overview */}
            <section id="ai-commands-overview" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Zap className="w-8 h-8 text-primary" />
                AI Commands Overview
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                GuardScan commands are organized by their AI dependency. Some
                commands require AI, while others have optional AI features.
              </p>

              {/* Fully AI-Dependent Commands */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Fully AI-Dependent Commands (9 commands)
                </h3>
                <p className="text-muted-foreground mb-4">
                  These commands <strong>require AI</strong> to function and
                  need an API key configured:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "commit",
                      desc: "Generate AI-powered commit messages",
                    },
                    {
                      name: "explain",
                      desc: "Explain code using AI (function, class, file, or theme)",
                    },
                    { name: "test-gen", desc: "Generate tests using AI" },
                    { name: "docs", desc: "Generate documentation using AI" },
                    {
                      name: "chat",
                      desc: "Interactive AI chat about your codebase (RAG feature)",
                    },
                    {
                      name: "refactor",
                      desc: "AI-powered refactoring suggestions",
                    },
                    {
                      name: "threat-model",
                      desc: "AI-powered threat modeling with STRIDE analysis",
                    },
                    {
                      name: "migrate",
                      desc: "AI-powered code migration assistant",
                    },
                    {
                      name: "review",
                      desc: "AI-powered code review for git changes",
                    },
                  ].map((cmd) => (
                    <Card
                      key={cmd.name}
                      className="p-4 bg-card/50 border-primary/20"
                    >
                      <code className="text-sm text-primary font-mono font-semibold">
                        guardscan {cmd.name}
                      </code>
                      <p className="text-sm text-muted-foreground mt-2">
                        {cmd.desc}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* AI-Enhanced Commands */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  AI-Enhanced Commands (3 commands)
                </h3>
                <p className="text-muted-foreground mb-4">
                  These commands work <strong>without AI</strong> but have
                  optional AI features:
                </p>
                <div className="space-y-4">
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <div className="flex items-start gap-3">
                      <code className="text-sm text-primary font-mono font-semibold">
                        guardscan run
                      </code>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          Code review (has{" "}
                          <code className="px-1 py-0.5 rounded text-xs bg-muted">
                            --ai
                          </code>{" "}
                          option, AI-enhanced)
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>
                            •{" "}
                            <code className="px-1 py-0.5 rounded bg-muted">
                              --ai
                            </code>{" "}
                            - Enable AI-powered analysis
                          </div>
                          <div>
                            •{" "}
                            <code className="px-1 py-0.5 rounded bg-muted">
                              --local
                            </code>{" "}
                            - Use local Ollama for AI
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <div className="flex items-start gap-3">
                      <code className="text-sm text-primary font-mono font-semibold">
                        guardscan scan
                      </code>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          Comprehensive scan (has{" "}
                          <code className="px-1 py-0.5 rounded text-xs bg-muted">
                            --skip-ai
                          </code>{" "}
                          option, includes AI by default)
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>
                            •{" "}
                            <code className="px-1 py-0.5 rounded bg-muted">
                              --skip-ai
                            </code>{" "}
                            - Disable AI analysis (AI enabled by default)
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <div className="flex items-start gap-3">
                      <code className="text-sm text-primary font-mono font-semibold">
                        guardscan security
                      </code>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          Security scan (has{" "}
                          <code className="px-1 py-0.5 rounded text-xs bg-muted">
                            --ai-fix
                          </code>{" "}
                          option for AI-powered fix suggestions)
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>
                            •{" "}
                            <code className="px-1 py-0.5 rounded bg-muted">
                              --ai-fix
                            </code>{" "}
                            - Get AI-powered fix suggestions for vulnerabilities
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* AI Configuration */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  AI Configuration (1 command)
                </h3>
                <Card className="p-4 bg-card/50 border-primary/20">
                  <code className="text-sm text-primary font-mono font-semibold">
                    guardscan config
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Configure AI provider and settings (sets up OpenAI,
                    Anthropic, Google, Ollama)
                  </p>
                </Card>
              </div>
            </section>

            {/* Chat Guide */}
            <section id="chat-guide" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <MessageSquare className="w-8 h-8 text-primary" />
                Chat Guide
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                GuardScan Chat is a RAG-powered assistant that answers questions
                about your codebase with context-aware responses. Use it to
                explore architecture, find issues, and explain complex code.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-card/50 border-primary/20">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    How it works (RAG)
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                    <li>
                      <strong className="text-foreground">Retrieve:</strong>{" "}
                      finds relevant code/docs from your repo
                    </li>
                    <li>
                      <strong className="text-foreground">Augment:</strong>{" "}
                      injects that context into your question
                    </li>
                    <li>
                      <strong className="text-foreground">Generate:</strong>{" "}
                      responds with repo-specific answers
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-card/50 border-primary/20">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Quick start
                  </h3>
                  <CodeBlock code="guardscan chat" />
                  <p className="text-sm text-muted-foreground mt-3">
                    First run will index your codebase. Subsequent runs reuse
                    the index unless you pass{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      --rebuild
                    </code>
                    .
                  </p>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-card/50 border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Interactive commands
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        /help
                      </code>{" "}
                      show commands and examples
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        /clear
                      </code>{" "}
                      clear conversation history
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        /stats
                      </code>{" "}
                      session stats (messages, tokens, duration)
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        /export
                      </code>{" "}
                      save conversation to markdown (parent directory)
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        /exit
                      </code>{" "}
                      quit chat session
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-card/50 border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Useful CLI options
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        --model &lt;name&gt;
                      </code>{" "}
                      pick model (e.g., gpt-5.1, claude-sonnet-4.5)
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        --temperature &lt;0-1&gt;
                      </code>{" "}
                      control creativity (default 0.7)
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        --rebuild
                      </code>{" "}
                      regenerate embeddings index
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        --embedding-provider &lt;provider&gt;
                      </code>{" "}
                      choose embedding backend (openai, gemini, ollama, etc.)
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded bg-muted">
                        --session &lt;path&gt;
                      </code>{" "}
                      load existing chat session;{" "}
                      <code className="px-1 py-0.5 rounded bg-muted">
                        --export &lt;path&gt;
                      </code>{" "}
                      save to custom location
                    </li>
                  </ul>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-card/50 border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Best practices
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                    <li>
                      Ask specific questions; include file or function names
                    </li>
                    <li>Use follow-ups to refine answers</li>
                    <li>
                      Rebuild index after large code changes (
                      <code className="px-1 py-0.5 rounded bg-muted">
                        --rebuild
                      </code>
                      )
                    </li>
                    <li>
                      Lower{" "}
                      <code className="px-1 py-0.5 rounded bg-muted">
                        --temperature
                      </code>{" "}
                      for precise answers; raise for brainstorming
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-card/50 border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Troubleshooting
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                    <li>
                      If responses feel generic: try{" "}
                      <code className="px-1 py-0.5 rounded bg-muted">
                        --rebuild
                      </code>{" "}
                      and ask more specific questions
                    </li>
                    <li>
                      For slow replies: use a faster model or reduce context
                      size
                    </li>
                    <li>
                      Export chats for sharing with{" "}
                      <code className="px-1 py-0.5 rounded bg-muted">
                        /export
                      </code>
                    </li>
                    <li>
                      Keep AI keys local—GuardScan never uploads source; RAG
                      runs against your repo
                    </li>
                  </ul>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Example prompts
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <CodeBlock code="How does authentication work in this repo?" />
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <CodeBlock code="Find potential security issues in the payment service" />
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <CodeBlock code="Explain the function handleWebhook in src/api/webhooks.ts" />
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <CodeBlock code="Generate tests for calculateTotal in src/utils/pricing.ts" />
                  </Card>
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
                    <Card
                      key={cmd.name}
                      className="p-6 bg-card/50 border-primary/20"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <Icon className="w-6 h-6 text-primary mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {cmd.name}
                          </h3>
                          <p className="text-muted-foreground mb-3">
                            {cmd.description}
                          </p>
                          <CodeBlock code={cmd.usage} />
                        </div>
                      </div>

                      {cmd.options && cmd.options.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-foreground mb-2">
                            Options:
                          </h4>
                          <div className="space-y-2">
                            {cmd.options.map((option, idx) => (
                              <div key={idx} className="flex gap-3">
                                <code className="text-sm text-primary font-mono">
                                  {option.flag}
                                </code>
                                <span className="text-sm text-muted-foreground">
                                  {option.description}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {cmd.examples && cmd.examples.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            Examples:
                          </h4>
                          <div className="space-y-3">
                            {cmd.examples.map((example, idx) => (
                              <div key={idx}>
                                <CodeBlock code={example.command} />
                                <p className="text-sm text-muted-foreground mt-1 ml-1">
                                  {example.description}
                                </p>
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
                Use GuardScan with your preferred AI provider or run it
                completely free with local AI
              </p>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-card/50 border-primary/20">
                  <Zap className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Your Choice
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from OpenAI, Claude, Gemini, or local AI
                  </p>
                </Card>
                <Card className="p-6 bg-card/50 border-primary/20">
                  <Server className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Full Control
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your API keys, your data, your control
                  </p>
                </Card>
                <Card className="p-6 bg-card/50 border-primary/20">
                  <CheckCircle className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Zero Cost Option
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Run completely free with Ollama locally
                  </p>
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
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      OpenAI Setup
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Get your API key from OpenAI and configure GuardScan to
                      use GPT-4 or GPT-3.5 for AI-powered code analysis.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 1: Get Your API Key
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                        <li>
                          Visit{" "}
                          <a
                            href="https://platform.openai.com/api-keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            OpenAI API Keys
                          </a>
                        </li>
                        <li>Sign in or create an account</li>
                        <li>Click "Create new secret key"</li>
                        <li>Copy your API key (starts with "sk-")</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 2: Configure GuardScan
                      </h4>
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
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 3: Run AI-Powered Scan
                      </h4>
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
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      Claude (Anthropic) Setup
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Use Anthropic's Claude models for advanced reasoning and
                      code analysis capabilities.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 1: Get Your API Key
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                        <li>
                          Visit{" "}
                          <a
                            href="https://console.anthropic.com/settings/keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Anthropic Console
                          </a>
                        </li>
                        <li>Sign in or create an account</li>
                        <li>Navigate to API Keys section</li>
                        <li>Create a new API key</li>
                        <li>Copy your API key</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 2: Configure GuardScan
                      </h4>
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
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 3: Run AI-Powered Scan
                      </h4>
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
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      Google Gemini Setup
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Leverage Google's Gemini models for multimodal AI analysis
                      and code review.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 1: Get Your API Key
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                        <li>
                          Visit{" "}
                          <a
                            href="https://makersuite.google.com/app/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Google AI Studio
                          </a>
                        </li>
                        <li>Sign in with your Google account</li>
                        <li>Click "Create API Key"</li>
                        <li>Copy your API key</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 2: Configure GuardScan
                      </h4>
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
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 3: Run AI-Powered Scan
                      </h4>
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
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      Ollama Local AI Setup
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Run GuardScan completely free with local AI models. No API
                      keys, no cloud costs, 100% private.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 1: Install Ollama
                      </h4>
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
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 2: Pull AI Model
                      </h4>
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
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Step 3: Run Local AI Scan
                      </h4>
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
                        <li>
                          ✓ Complete privacy - code never leaves your machine
                        </li>
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
                <h3 className="text-2xl font-bold text-foreground">
                  Configuration File (Optional)
                </h3>
                <p className="text-muted-foreground">
                  Store your preferences in{" "}
                  <code className="px-2 py-1 rounded text-sm">
                    ~/.guardscan/config.yml
                  </code>{" "}
                  for convenience:
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
                GuardScan can be configured using a{" "}
                <code className="px-2 py-1 rounded text-sm">
                  ~/.guardscan/config.yml
                </code>{" "}
                file.
              </p>
              <div className="space-y-4">
                {configOptions.map((option) => (
                  <Card
                    key={option.key}
                    className="p-4 bg-card/50 border-primary/20"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-4">
                        <code className="text-primary font-mono font-semibold">
                          {option.key}
                        </code>
                        <span className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary">
                          {option.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Default:
                          </span>{" "}
                          <code className="text-foreground font-mono">
                            {option.default}
                          </code>
                        </div>
                      </div>
                      {option.possibleValues && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Possible values:
                          </span>{" "}
                          <span className="text-foreground">
                            {option.possibleValues.join(", ")}
                          </span>
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
                GuardScan supports the following environment variables for API
                key configuration:
              </p>
              <div className="space-y-4">
                {[
                  {
                    name: "OPENAI_API_KEY",
                    description: "Your OpenAI API key for GPT models",
                    example: "sk-...",
                  },
                  {
                    name: "ANTHROPIC_API_KEY",
                    description: "Your Anthropic API key for Claude models",
                    example: "sk-ant-...",
                  },
                  {
                    name: "GOOGLE_API_KEY",
                    description: "Your Google API key for Gemini models",
                    example: "AIza...",
                  },
                  {
                    name: "GUARDSCAN_CONFIG",
                    description: "Path to custom configuration file",
                    example: "~/my-config.yml",
                  },
                  {
                    name: "GUARDSCAN_TELEMETRY",
                    description: "Enable/disable telemetry",
                    example: "false",
                  },
                ].map((env) => (
                  <Card
                    key={env.name}
                    className="p-4 bg-card/50 border-primary/20"
                  >
                    <div className="flex flex-col gap-2">
                      <code className="text-primary font-mono font-semibold">
                        {env.name}
                      </code>
                      <p className="text-sm text-muted-foreground">
                        {env.description}
                      </p>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Example:</span>{" "}
                        <code className="text-foreground font-mono">
                          {env.example}
                        </code>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Docker Guide */}
            <section id="docker" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Container className="w-8 h-8 text-primary" />
                Docker Guide
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Run GuardScan in Docker for consistent environments across
                Linux, macOS, and Windows. Perfect for CI/CD pipelines and
                isolated execution.
              </p>

              {/* Why Docker */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-card/50 border-primary/20">
                  <CheckCircle className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Consistent Environment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Same behavior across different operating systems
                  </p>
                </Card>
                <Card className="p-6 bg-card/50 border-primary/20">
                  <Server className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    CI/CD Ready
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Easy integration into automated pipelines
                  </p>
                </Card>
                <Card className="p-6 bg-card/50 border-primary/20">
                  <Shield className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Isolated Execution
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    No conflicts with local Node.js installations
                  </p>
                </Card>
              </div>

              {/* Quick Start */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Quick Start
                </h3>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    Basic Usage
                  </h4>
                  <CodeBlock
                    code={
                      '# Run GuardScan in Docker\ndocker run --rm -v $(pwd):/workspace -w /workspace \\\n  node:lts-alpine sh -c \\\n  "apk add --no-cache python3 make g++ git && \\\n   npm install -g guardscan && \\\n   guardscan security"'
                    }
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    With Docker Compose
                  </h4>
                  <CodeBlock
                    language="yaml"
                    code={`version: '3.8'
services:
  guardscan:
    image: node:lts-alpine
    volumes:
      - .:/workspace
    working_dir: /workspace
    command: sh -c |
      apk add --no-cache python3 make g++ git &&
      npm install -g guardscan &&
      guardscan security`}
                  />
                </div>
              </div>

              {/* OS-Specific Instructions */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Installation by OS
                </h3>

                <Tabs defaultValue="linux" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="linux">Linux</TabsTrigger>
                    <TabsTrigger value="macos">macOS</TabsTrigger>
                    <TabsTrigger value="windows">Windows</TabsTrigger>
                  </TabsList>

                  <TabsContent value="linux" className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Ubuntu/Debian
                      </h4>
                      <CodeBlock
                        code={`# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Add user to docker group (optional)
sudo usermod -aG docker $USER

# Verify installation
docker --version
docker run hello-world`}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        CentOS/RHEL/Fedora
                      </h4>
                      <CodeBlock
                        code={`# Install Docker Engine
sudo yum install docker-ce docker-ce-cli containerd.io

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER`}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="macos" className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Using Homebrew (Recommended)
                      </h4>
                      <CodeBlock
                        code={`# Install Docker Desktop
brew install --cask docker

# Start Docker Desktop
open /Applications/Docker.app`}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Manual Installation
                      </h4>
                      <p className="text-muted-foreground mb-3">
                        1. Download Docker Desktop from{" "}
                        <a
                          href="https://www.docker.com/products/docker-desktop"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          docker.com
                        </a>
                      </p>
                      <p className="text-muted-foreground mb-3">
                        2. Open the .dmg file and drag Docker to Applications
                      </p>
                      <p className="text-muted-foreground mb-3">
                        3. Launch Docker Desktop and complete setup
                      </p>
                    </div>
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                      <h5 className="font-semibold text-foreground mb-2">
                        Apple Silicon (M1/M2) Notes
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Docker Desktop for Apple Silicon includes native ARM
                        support. Most images work without issues. For x86
                        images, Docker Desktop automatically uses Rosetta 2.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="windows" className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Using Chocolatey
                      </h4>
                      <CodeBlock
                        code={`# Install Docker Desktop
choco install docker-desktop -y`}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        Manual Installation
                      </h4>
                      <p className="text-muted-foreground mb-3">
                        1. Download Docker Desktop from{" "}
                        <a
                          href="https://www.docker.com/products/docker-desktop"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          docker.com
                        </a>
                      </p>
                      <p className="text-muted-foreground mb-3">
                        2. Run the installer and enable WSL2 when prompted
                      </p>
                      <p className="text-muted-foreground mb-3">
                        3. Restart computer if required
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">
                        WSL2 Setup (Recommended)
                      </h4>
                      <CodeBlock
                        code={`# Enable WSL2 (run as Administrator)
wsl --install

# Set WSL2 as default version
wsl --set-default-version 2

# Verify WSL2 installation
wsl --list --verbose`}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Alpine Linux Specific */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Alpine Linux Considerations
                </h3>
                <p className="text-muted-foreground">
                  When using Alpine Linux-based images (like{" "}
                  <code className="px-2 py-1 rounded text-sm">
                    node:lts-alpine
                  </code>
                  ), you may need additional build dependencies:
                </p>
                <CodeBlock
                  code={`# Install required dependencies for Alpine
apk add --no-cache \\
  python3 \\
  make \\
  g++ \\
  pkgconfig \\
  cairo-dev \\
  pango-dev \\
  libjpeg-turbo-dev \\
  giflib-dev \\
  pixman-dev \\
  freetype-dev \\
  build-base \\
  git`}
                />
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">
                    Why These Dependencies?
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Some npm packages require native compilation. These
                    dependencies provide:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>
                      <code className="px-1 py-0.5 rounded">python3</code> - For
                      node-gyp compilation
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded">make, g++</code> -
                      Build tools
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded">
                        cairo-dev, pango-dev
                      </code>{" "}
                      - Graphics libraries (if needed)
                    </li>
                    <li>
                      <code className="px-1 py-0.5 rounded">git</code> - For
                      installing from git repositories
                    </li>
                  </ul>
                </div>
              </div>

              {/* Volume Mounting */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Volume Mounting Strategies
                </h3>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    Mount Current Directory (Linux/macOS)
                  </h4>
                  <CodeBlock
                    code={
                      "# Mount current directory\ndocker run --rm -v $(pwd):/workspace -w /workspace \\\n  node:lts-alpine guardscan security"
                    }
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    Mount Current Directory (Windows)
                  </h4>
                  <CodeBlock
                    code={`# PowerShell - Use forward slashes
docker run --rm -v ${"${PWD}"}:/workspace -w /workspace \\
  node:lts-alpine guardscan security

# CMD - Use forward slashes
docker run --rm -v %CD%:/workspace -w /workspace \\
  node:lts-alpine guardscan security`}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    Mount Specific Directory
                  </h4>
                  <CodeBlock
                    code={`# Mount specific project directory
docker run --rm -v /path/to/project:/workspace -w /workspace \\
  node:lts-alpine guardscan security`}
                  />
                </div>
              </div>

              {/* Environment Variables */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Environment Variables in Docker
                </h3>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    Pass API Keys
                  </h4>
                  <CodeBlock
                    code={
                      '# Pass environment variables\ndocker run --rm \\\n  -v $(pwd):/workspace \\\n  -w /workspace \\\n  -e OPENAI_API_KEY="sk-your-key-here" \\\n  node:lts-alpine sh -c \\\n  "apk add --no-cache python3 make g++ git && \\\n   npm install -g guardscan && \\\n   guardscan run --ai"'
                    }
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    Use .env File
                  </h4>
                  <CodeBlock
                    code={
                      "# Use .env file\ndocker run --rm \\\n  --env-file .env \\\n  -v $(pwd):/workspace \\\n  -w /workspace \\\n  node:lts-alpine guardscan run --ai"
                    }
                  />
                </div>
              </div>

              {/* CI/CD Integration */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  CI/CD Integration
                </h3>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    GitHub Actions
                  </h4>
                  <CodeBlock
                    language="yaml"
                    code={`name: GuardScan Security Check

on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run GuardScan
        run: |
          docker run --rm \\
            -v \${{ github.workspace }}:/workspace \\
            -w /workspace \\
            node:lts-alpine sh -c \\
            "apk add --no-cache python3 make g++ git && \\
             npm install -g guardscan && \\
             guardscan security"`}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    GitLab CI
                  </h4>
                  <CodeBlock
                    language="yaml"
                    code={`security-scan:
  image: node:lts-alpine
  before_script:
    - apk add --no-cache python3 make g++ git
    - npm install -g guardscan
  script:
    - guardscan security
  only:
    - main
    - merge_requests`}
                  />
                </div>
              </div>

              {/* Docker Compose Example */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Complete Docker Compose Example
                </h3>
                <CodeBlock
                  language="yaml"
                  code={
                    "version: '3.8'\n\nservices:\n  guardscan:\n    image: node:lts-alpine\n    volumes:\n      - .:/workspace\n    working_dir: /workspace\n    environment:\n      - GUARDSCAN_HOME=/tmp/guardscan\n      - OPENAI_API_KEY=${OPENAI_API_KEY:-}\n    command: sh -c |\n      apk add --no-cache python3 make g++ pkgconfig cairo-dev pango-dev\n      libjpeg-turbo-dev giflib-dev pixman-dev freetype-dev build-base git &&\n      npm install -g guardscan &&\n      guardscan security"
                  }
                />
                <p className="text-muted-foreground">
                  Run with: <CodeBlock code="docker-compose run guardscan" />
                </p>
              </div>

              {/* Best Practices */}
              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Best Practices
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Use Minimal Images
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Prefer <code>node:lts-alpine</code> over full Node images
                      to reduce attack surface and image size.
                    </p>
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      No Secrets in Images
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Always use environment variables or Docker secrets, never
                      hardcode API keys in Dockerfiles.
                    </p>
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Resource Limits
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Set CPU and memory limits to prevent resource exhaustion
                      in production environments.
                    </p>
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Read-Only Filesystems
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Use read-only root filesystems when possible for enhanced
                      security.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Troubleshooting
                </h3>
                <div className="space-y-4">
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Permission Denied Errors
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      If you see permission errors, ensure the Docker container
                      can write to mounted volumes:
                    </p>
                    <CodeBlock
                      code={
                        "# Fix permissions (Linux/macOS)\ndocker run --rm -v $(pwd):/workspace -w /workspace \\\n  --user $(id -u):$(id -g) \\\n  node:lts-alpine guardscan security"
                      }
                    />
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Missing Dependencies
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      If npm install fails, ensure all Alpine dependencies are
                      installed:
                    </p>
                    <CodeBlock
                      code={`apk add --no-cache python3 make g++ git`}
                    />
                  </Card>
                  <Card className="p-4 bg-card/50 border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Windows Path Issues
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Always use forward slashes in Windows Docker commands:
                    </p>
                    <CodeBlock
                      code={`# ✅ Correct
docker run -v C:/Users/username/project:/workspace

# ❌ Incorrect
docker run -v C:\\Users\\username\\project:/workspace`}
                    />
                  </Card>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="mt-12 p-6 bg-accent/10 border border-accent/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3">
                  Additional Resources
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    •{" "}
                    <a
                      href="https://github.com/ntanwir10/GuardScan/blob/main/docs/DOCKER_GUIDE.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Full Docker Guide
                    </a>
                  </li>
                  <li>
                    •{" "}
                    <a
                      href="https://github.com/ntanwir10/GuardScan/blob/main/docs/DOCKER_ALPINE_GUIDE.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Alpine Linux Specific Guide
                    </a>
                  </li>
                  <li>
                    •{" "}
                    <a
                      href="https://docs.docker.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Docker Documentation
                    </a>
                  </li>
                  <li>
                    •{" "}
                    <a
                      href={BUY_ME_A_COFFEE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Support GuardScan Development
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>

      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  );
}
