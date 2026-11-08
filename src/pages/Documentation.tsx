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
    description: "Initialize GuardScan local configuration",
    usage: "guardscan init",
    options: [
    ],
    examples: [
      { command: "guardscan init", description: "Create the local configuration interactively" },
    ],
  },
  {
    name: "config",
    icon: Settings,
    description: "Configure AI provider, privacy controls, and local settings",
    usage: "guardscan config [options]",
    options: [
      { flag: "-p, --provider <provider>", description: "Set AI provider (openai, claude, gemini, ollama, lmstudio, openrouter, none)" },
      { flag: "-k, --key <key>", description: "Set API key" },
      { flag: "--telemetry <enabled>", description: "Enable or disable telemetry (true or false). Telemetry is off by default" },
      { flag: "--offline <enabled>", description: "Enable or disable offline mode (true or false)" },
      { flag: "--show", description: "Show current configuration" },
    ],
    examples: [
      { command: "guardscan config", description: "Interactive configuration" },
      { command: "guardscan config --provider ollama", description: "Use local Ollama (no API key needed)" },
      { command: "guardscan config --offline=false", description: "Allow network-backed features such as OSV lookups" },
      { command: "guardscan config --telemetry=false", description: "Disable telemetry and delete any queued events" },
      { command: "guardscan config --show", description: "Show current configuration" },
    ],
  },
  {
    name: "status",
    icon: Activity,
    description: "Show provider, repository, and local configuration status",
    usage: "guardscan status [options]",
    options: [
      { flag: "--check-network", description: "Check internet connectivity" },
    ],
    examples: [
      { command: "guardscan status", description: "Show status summary" },
      { command: "guardscan status --check-network", description: "Include a connectivity check" },
    ],
  },
  {
    name: "security",
    icon: Shield,
    description: "Run local heuristic security checks",
    usage: "guardscan security [options]",
    options: [
      { flag: "-f, --files <patterns...>", description: "Specific files or patterns to scan" },
      { flag: "--licenses", description: "Include license compliance scanning" },
      { flag: "--cve", description: "Include exact-version dependency vulnerability scanning (on by default when supported manifests are present)" },
      { flag: "--no-cve", description: "Skip dependency vulnerability scanning" },
      { flag: "--scope <scope>", description: "Dependency scope for CVE scanning (all or runtime)" },
      { flag: "--allow-partial", description: "Allow incomplete scanner coverage without an operational failure" },
      { flag: "--concurrency <number>", description: "Maximum number of scanners to run concurrently (default: 4)" },
      { flag: "--ai-fix", description: "Generate AI-powered fix suggestions" },
      { flag: "--interactive", description: "Interactively review and apply fixes" },
      { flag: "--debug", description: "Enable verbose debug logging" },
      { flag: "--ci", description: "Enable CI-friendly output and exit-code policy" },
      { flag: "--offline", description: "Skip network-backed checks for this run" },
      { flag: "--no-cache", description: "Disable response, semantic, and vulnerability snapshot caches" },
      { flag: "--format <format>", description: "Report format (markdown, json, sarif)" },
      { flag: "-o, --output <path>", description: "Output file path" },
      { flag: "--fail-on <severity>", description: "Fail when findings meet severity (critical, high, medium, low, info)" },
      { flag: "--max-findings <number>", description: "Fail when finding count exceeds this number" },
    ],
    examples: [
      { command: "guardscan security", description: "Run the local security scan" },
      { command: "guardscan security --offline --no-cve", description: "Fully offline scan without dependency lookups" },
      { command: "guardscan security --ai-fix", description: "Get AI-powered fix suggestions" },
      { command: "guardscan security --ci --format json --output guardscan.json --fail-on high", description: "CI run with JSON output" },
      { command: "guardscan security --format sarif --output guardscan.sarif", description: "Write SARIF for code scanning tools" },
    ],
  },
  {
    name: "test",
    icon: TestTube,
    description: "Run tests and code quality analysis",
    usage: "guardscan test [options]",
    options: [
      { flag: "--coverage", description: "Include code coverage analysis" },
      { flag: "--metrics", description: "Analyze code metrics only" },
      { flag: "--smells", description: "Detect code smells only" },
      { flag: "--lint", description: "Run linters only" },
      { flag: "--all", description: "Run all quality checks" },
    ],
    examples: [
      { command: "guardscan test", description: "Run tests and quality analysis" },
      { command: "guardscan test --coverage", description: "Include coverage analysis" },
      { command: "guardscan test --smells", description: "Detect code smells only" },
    ],
  },
  {
    name: "sbom",
    icon: Package,
    description: "Generate Software Bill of Materials (SPDX 2.3 or CycloneDX 1.7)",
    usage: "guardscan sbom [options]",
    options: [
      { flag: "-f, --format <format>", description: "SBOM format: spdx (SPDX 2.3, default) or cyclonedx (CycloneDX 1.7)" },
      { flag: "-o, --output <path>", description: "Output file path (default: sbom-<format>.json in the repository)" },
      { flag: "--offline", description: "Skip network-backed checks for this command" },
    ],
    examples: [
      { command: "guardscan sbom", description: "Generate an SPDX 2.3 SBOM" },
      { command: "guardscan sbom --format cyclonedx", description: "Generate a CycloneDX 1.7 SBOM" },
      { command: "guardscan sbom --offline --output sbom.json", description: "Generate from the local dependency inventory" },
    ],
  },
  {
    name: "vuln",
    icon: ShieldCheck,
    description: "Scan exact dependency versions for known vulnerabilities using OSV (aliases: cve, audit)",
    usage: "guardscan vuln [path] [options]",
    options: [
      { flag: "--ecosystem <names...>", description: "Limit scanning to npm, pip, go, ruby, cargo, or maven" },
      { flag: "--scope <scope>", description: "Dependency scope (all or runtime)" },
      { flag: "--offline", description: "Use a matching local vulnerability snapshot without network access" },
      { flag: "--refresh", description: "Bypass prior coverage and atomically replace the vulnerability snapshot" },
      { flag: "--allow-partial", description: "Allow missing, stale, or incomplete vulnerability coverage" },
      { flag: "--concurrency <number>", description: "Maximum concurrent advisory detail requests (default: 4)" },
      { flag: "--format <format>", description: "Output format (table, json, or sarif)" },
      { flag: "-o, --output <path>", description: "Write output to a file" },
      { flag: "--ci", description: "Use CI failure defaults" },
      { flag: "--fail-on <severity>", description: "Fail at or above critical, high, medium, or low" },
      { flag: "--max-vulnerabilities <number>", description: "Fail when the vulnerability count exceeds this value" },
      { flag: "--no-cache", description: "Disable vulnerability snapshot reads and writes" },
      { flag: "db update [path]", description: "Fetch OSV coverage for the current exact dependency inventory" },
      { flag: "db status [path]", description: "Show vulnerability snapshot coverage and freshness" },
      { flag: "db clear [path] [--repo|--all] --force", description: "Delete vulnerability coverage snapshots" },
    ],
    examples: [
      { command: "guardscan config --offline=false", description: "Allow online OSV lookups (offline mode is the default)" },
      { command: "guardscan vuln .", description: "Audit exact dependency versions against OSV" },
      { command: "guardscan audit . --ci --format json --output vulnerabilities.json", description: "CI report (aliases: cve, audit)" },
      { command: "guardscan vuln db update .", description: "Create or replace the offline snapshot" },
      { command: "guardscan vuln . --offline", description: "Scan using the local snapshot only" },
      { command: "guardscan vuln db clear --all --force", description: "Delete every vulnerability snapshot" },
    ],
  },
  {
    name: "cache",
    icon: RefreshCw,
    description: "Manage repository-local AI, semantic, embedding, and advisory caches",
    usage: "guardscan cache <stats|info|clear> [options]",
    options: [
      { flag: "stats", description: "Show cache statistics" },
      { flag: "info", description: "Show cache configuration" },
      { flag: "clear --repo", description: "Clear the current repository cache (default)" },
      { flag: "clear --all", description: "Clear every repository cache" },
      { flag: "clear --force", description: "Skip confirmation" },
    ],
    examples: [
      { command: "guardscan cache stats", description: "Show cache statistics" },
      { command: "guardscan cache clear --repo --force", description: "Clear this repository's cache" },
      { command: "guardscan cache clear --all --force", description: "Clear all repository caches" },
    ],
  },
  {
    name: "telemetry",
    icon: Activity,
    description: "Inspect, sync, or clear opt-in telemetry (disabled by default)",
    usage: "guardscan telemetry <status|sync|clear>",
    options: [
      { flag: "status", description: "Show telemetry consent, suppression, endpoint, and outbox status" },
      { flag: "sync", description: "Explicitly send the oldest pending telemetry batch to the endpoint in GUARDSCAN_TELEMETRY_URL" },
      { flag: "clear --force", description: "Delete all locally queued telemetry events" },
    ],
    examples: [
      { command: "guardscan telemetry status", description: "Inspect consent and queued events" },
      { command: "GUARDSCAN_TELEMETRY_URL=https://telemetry.example.com guardscan telemetry sync", description: "Deliver to your own collector" },
      { command: "guardscan telemetry clear --force", description: "Delete the local queue" },
    ],
  },
  {
    name: "capabilities",
    icon: Gauge,
    description: "Inspect optional runtime capabilities and safe fallback modes",
    usage: "guardscan capabilities [--json]",
    options: [
      { flag: "--json", description: "Emit compact machine-readable JSON" },
    ],
    examples: [
      { command: "guardscan capabilities", description: "Print capability evidence" },
      { command: "guardscan capabilities --json", description: "Machine-readable output" },
    ],
  },
  {
    name: "reset",
    icon: RotateCcw,
    description: "Clear local context and cache",
    usage: "guardscan reset [options]",
    options: [
      { flag: "--all", description: "Reset all local configuration and state" },
      { flag: "--force", description: "Skip confirmation prompts" },
    ],
    examples: [
      { command: "guardscan reset", description: "Clear local context and cache (with confirmation)" },
      { command: "guardscan reset --all --force", description: "Reset all local configuration and state without prompts" },
    ],
  },
  {
    name: "scan",
    icon: Search,
    description: "Comprehensive scan: runs security and quality checks in parallel. Static-safe by default (repository tests and linters are not executed)",
    usage: "guardscan scan [options]",
    options: [
      { flag: "--run-project-code", description: "Run repository tests and linters (disabled by default; use only on trusted repositories)" },
      { flag: "--isolate-project-network", description: "Run project code in an OS network sandbox (fails if unavailable)" },
      { flag: "--skip-tests", description: "Skip test execution" },
      { flag: "--skip-perf", description: "Skip performance testing" },
      { flag: "--skip-mutation", description: "Skip mutation testing" },
      { flag: "--skip-ai", description: "Skip AI code review" },
      { flag: "--coverage", description: "Include code coverage analysis" },
      { flag: "--licenses", description: "Include license compliance scanning" },
      { flag: "--cve / --no-cve", description: "Include or skip dependency vulnerability scanning (on by default)" },
      { flag: "--scope <scope>", description: "Dependency scope for CVE scanning (all or runtime)" },
      { flag: "--allow-partial", description: "Allow incomplete scanner coverage without an operational failure" },
      { flag: "--concurrency <number>", description: "Maximum number of scanners to run concurrently (default: 4)" },
      { flag: "--ci", description: "Enable CI-friendly output and exit-code policy" },
      { flag: "--offline", description: "Skip network-backed checks for this run" },
      { flag: "--no-cache", description: "Disable response, semantic, and vulnerability snapshot caches" },
      { flag: "--format <format>", description: "Report format (markdown, json, sarif)" },
      { flag: "-o, --output <path>", description: "Output file path" },
      { flag: "--fail-on <severity>", description: "Fail when findings meet severity (critical, high, medium, low, info)" },
      { flag: "--max-findings <number>", description: "Fail when finding count exceeds this number" },
    ],
    examples: [
      { command: "guardscan scan", description: "Static-safe scan" },
      { command: "guardscan scan --skip-ai", description: "Skip AI code review" },
      { command: "guardscan scan --run-project-code", description: "Also run the repository's tests and linters (trusted repos only)" },
      { command: "guardscan scan --ci --format sarif --output guardscan.sarif", description: "CI run with SARIF output" },
    ],
  },
  {
    name: "run",
    icon: Zap,
    description: "Run local code review with optional AI enhancement from your configured provider. Required local scanners always run before AI enrichment",
    usage: "guardscan run [options]",
    options: [
      { flag: "-f, --files <patterns...>", description: "Specific files or patterns to review" },
      { flag: "--with-ai", description: "Use AI enhancement when a provider is configured (default: on)" },
      { flag: "--offline", description: "Block cloud providers for this run" },
      { flag: "--cve", description: "Opt in to exact-version dependency vulnerability scanning" },
      { flag: "--allow-partial", description: "Allow incomplete CVE coverage" },
    ],
    examples: [
      { command: "guardscan run", description: "Local review, plus AI enrichment if a provider is configured" },
      { command: "guardscan run --offline", description: "Local review only; cloud providers are blocked" },
      { command: "guardscan run --files \"src/**/*.ts\"", description: "Review specific files" },
    ],
  },
  {
    name: "perf",
    icon: Gauge,
    description: "Run performance testing (requires k6 for load tests; optional)",
    usage: "guardscan perf [options]",
    options: [
      { flag: "--load", description: "Run load test (default)" },
      { flag: "--stress", description: "Run stress test (increasing load)" },
      { flag: "--web <url>", description: "Run Lighthouse audit on URL" },
      { flag: "--baseline", description: "Save results as baseline" },
      { flag: "--compare", description: "Compare with baseline" },
      { flag: "--duration <duration>", description: "Test duration, e.g. 30s, 1m (default: 30s)" },
      { flag: "--vus <number>", description: "Virtual users (default: 10)" },
      { flag: "--url <url>", description: "Target URL for load/stress test" },
    ],
    examples: [
      { command: "guardscan perf --url http://localhost:3000", description: "Load test a URL" },
      { command: "guardscan perf --stress --url http://localhost:3000", description: "Stress test" },
      { command: "guardscan perf --web https://example.com", description: "Lighthouse audit" },
    ],
  },
  {
    name: "mutation",
    icon: FlaskConical,
    description: "Run mutation testing to assess test quality (requires an external framework such as Stryker; optional)",
    usage: "guardscan mutation [options]",
    options: [
      { flag: "--framework <framework>", description: "Mutation framework: stryker, mutmut, pitest, auto (default: auto)" },
      { flag: "--threshold <number>", description: "Minimum mutation score, 0-100 (default: 80)" },
      { flag: "--files <files>", description: "Comma-separated list of files to mutate" },
      { flag: "--test-command <command>", description: "Custom mutmut test command" },
      { flag: "--allow-unsafe-test-command", description: "Allow mutmut to run a custom test command string from --test-command" },
      { flag: "--timeout <ms>", description: "Timeout per test in milliseconds (default: 5000)" },
    ],
    examples: [
      { command: "guardscan mutation", description: "Run mutation testing" },
      { command: "guardscan mutation --threshold 80", description: "Require an 80 percent mutation score" },
      { command: "guardscan mutation --framework stryker", description: "Use Stryker" },
    ],
  },
  {
    name: "rules",
    icon: FileText,
    description: "Run custom rule engine with YAML-based rules",
    usage: "guardscan rules [options]",
    options: [
      { flag: "--list", description: "List all available rules" },
      { flag: "--run", description: "Run rules (default)" },
      { flag: "--fix", description: "Apply auto-fixes to violations" },
      { flag: "--rule-ids <ids>", description: "Comma-separated list of rule IDs to run" },
      { flag: "--files <files>", description: "Comma-separated list of files to scan" },
      { flag: "--custom-rules <dir>", description: "Directory containing custom YAML rules" },
      { flag: "--export <rule:path>", description: "Export a rule to file (format: ruleId:outputPath)" },
    ],
    examples: [
      { command: "guardscan rules --list", description: "List available rules" },
      { command: "guardscan rules --custom-rules ./rules", description: "Run custom YAML rules" },
      { command: "guardscan rules --rule-ids RULE-1,RULE-2 --fix", description: "Run selected rules and apply auto-fixes" },
    ],
  },
  {
    name: "explain",
    icon: Eye,
    description: "Explain code using AI (function, class, file, or theme)",
    usage: "guardscan explain <target> [options]",
    options: [
      { flag: "-l, --level <level>", description: "Explanation level: brief, detailed, comprehensive (default: detailed)" },
      { flag: "-t, --type <type>", description: "Target type: function, class, file, module (default: function)" },
      { flag: "-o, --output <path>", description: "Save explanation to file" },
    ],
    examples: [
      { command: "guardscan explain src/utils.ts --type file", description: "Explain a file" },
      { command: "guardscan explain parseConfig --level brief", description: "Brief explanation of a function" },
      { command: "guardscan explain AuthService --type class -o explain.md", description: "Save to a file" },
    ],
  },
  {
    name: "review",
    icon: FileCheck,
    description: "AI-powered code review for git changes",
    usage: "guardscan review [options]",
    options: [
      { flag: "--base <ref>", description: "Base git reference (default: HEAD)" },
      { flag: "--head <ref>", description: "Head git reference for comparison" },
      { flag: "-f, --file <path>", description: "Review specific file only" },
      { flag: "-s, --severity <level>", description: "Minimum severity level: critical, high, medium, low, info" },
      { flag: "-c, --category <category>", description: "Filter by category: bug, security, performance, maintainability, style, documentation, testing, accessibility, best-practice" },
      { flag: "--report", description: "Generate full detailed report" },
      { flag: "-o, --output <path>", description: "Save report to file" },
    ],
    examples: [
      { command: "guardscan review", description: "Review uncommitted changes" },
      { command: "guardscan review --base main --head feature", description: "Review a branch against main" },
      { command: "guardscan review --file src/auth.ts --severity high", description: "Review one file" },
    ],
  },
  {
    name: "commit",
    icon: GitCommit,
    description: "Generate AI-powered commit messages",
    usage: "guardscan commit [options]",
    options: [
      { flag: "--ai", description: "Use AI to generate commit message (default: on)" },
      { flag: "--auto", description: "Automatically commit with generated message" },
      { flag: "--scope <scope>", description: "Specify commit scope" },
      { flag: "--type <type>", description: "Specify commit type (feat, fix, docs, etc.)" },
      { flag: "--no-body", description: "Skip commit body (subject only)" },
    ],
    examples: [
      { command: "guardscan commit", description: "Generate a commit message" },
      { command: "guardscan commit --type feat --scope auth", description: "Set type and scope" },
      { command: "guardscan commit --auto", description: "Commit with the generated message" },
    ],
  },
  {
    name: "docs",
    icon: BookOpen,
    description: "Generate documentation using AI",
    usage: "guardscan docs [options]",
    options: [
      { flag: "-t, --type <type>", description: "Documentation type: readme, api, architecture, contributing (default: readme)" },
      { flag: "-o, --output <path>", description: "Custom output path" },
      { flag: "--diagrams", description: "Include architecture diagrams (Mermaid; default: on)" },
      { flag: "--examples", description: "Include code examples (default: on)" },
      { flag: "--audience <audience>", description: "Target audience: developer, user, contributor (default: user)" },
    ],
    examples: [
      { command: "guardscan docs", description: "Generate a README" },
      { command: "guardscan docs --type api -o docs/api.md", description: "Generate API docs" },
      { command: "guardscan docs --type architecture --audience developer", description: "Architecture overview for developers" },
    ],
  },
  {
    name: "test-gen",
    icon: Wand2,
    description: "Generate tests using AI",
    usage: "guardscan test-gen [options]",
    options: [
      { flag: "--function <name>", description: "Generate tests for a specific function" },
      { flag: "--class <name>", description: "Generate tests for a specific class" },
      { flag: "--file <path>", description: "Generate tests for all exports in a file" },
      { flag: "--framework <framework>", description: "Test framework: jest, vitest, mocha, pytest, auto (default: auto)" },
      { flag: "-o, --output <path>", description: "Custom output path for test file" },
      { flag: "--coverage", description: "Show coverage estimation" },
    ],
    examples: [
      { command: "guardscan test-gen --file src/utils.ts", description: "Tests for all exports in a file" },
      { command: "guardscan test-gen --function parseConfig --framework vitest", description: "Tests for one function" },
      { command: "guardscan test-gen --class AuthService --coverage", description: "Tests for a class with coverage estimate" },
    ],
  },
  {
    name: "refactor",
    icon: Wand2,
    description: "AI-powered refactoring suggestions",
    usage: "guardscan refactor [options]",
    options: [
      { flag: "-f, --file <path>", description: "Specific file to analyze" },
      { flag: "--function <name>", description: "Analyze specific function" },
      { flag: "--class <name>", description: "Analyze specific class" },
      { flag: "--smell <type>", description: "Target specific code smell type" },
      { flag: "--pattern <pattern>", description: "Suggest specific design pattern" },
      { flag: "--analyze", description: "Analyze code smells only" },
      { flag: "--apply", description: "Generate refactored code" },
      { flag: "-i, --interactive", description: "Interactive refactoring mode" },
      { flag: "--report", description: "Generate full refactoring report" },
      { flag: "-o, --output <path>", description: "Save report to file" },
    ],
    examples: [
      { command: "guardscan refactor --file src/legacy.ts --analyze", description: "Analyze code smells only" },
      { command: "guardscan refactor --file src/legacy.ts --interactive", description: "Interactive refactoring" },
      { command: "guardscan refactor --file src/legacy.ts --report -o refactor.md", description: "Full report" },
    ],
  },
  {
    name: "threat-model",
    icon: ShieldCheck,
    description: "AI-powered threat modeling with STRIDE analysis",
    usage: "guardscan threat-model [options]",
    options: [
      { flag: "-f, --file <path>", description: "Specific file to analyze" },
      { flag: "-c, --category <category>", description: "Focus on a STRIDE category (spoofing, tampering, repudiation, information-disclosure, denial-of-service, elevation-of-privilege)" },
      { flag: "--flows", description: "Include data flow mapping (default: on)" },
      { flag: "--diagram", description: "Generate threat model diagram" },
      { flag: "--focus <area>", description: "Focus area: authentication, data-protection, api-security, or all" },
      { flag: "-s, --severity <level>", description: "Minimum severity level: low, medium, high, critical" },
      { flag: "--report", description: "Generate full threat model report" },
      { flag: "-o, --output <path>", description: "Save report to file" },
    ],
    examples: [
      { command: "guardscan threat-model", description: "Model threats for the codebase" },
      { command: "guardscan threat-model --focus authentication --diagram", description: "Authentication focus with a diagram" },
      { command: "guardscan threat-model --report -o threat-model.md", description: "Full report" },
    ],
  },
  {
    name: "migrate",
    icon: RefreshCw,
    description: "AI-powered code migration assistant",
    usage: "guardscan migrate [options]",
    options: [
      { flag: "-t, --type <type>", description: "Migration type: framework, language, modernization, dependency" },
      { flag: "--target <target>", description: "Migration target (e.g., react-class-to-hooks, typescript, es5-to-es6)" },
      { flag: "--from <source>", description: "Source framework/language (e.g., react, es5)" },
      { flag: "--to <target>", description: "Target framework/language (e.g., vue, es6)" },
      { flag: "-f, --file <path>", description: "Specific file to migrate" },
      { flag: "--dry-run", description: "Preview changes without applying them (default: on)" },
      { flag: "--auto-fix", description: "Automatically apply fixes" },
      { flag: "--backup", description: "Create backups of original files (default: on)" },
      { flag: "--report", description: "Generate migration report" },
      { flag: "-o, --output <path>", description: "Save report to file" },
    ],
    examples: [
      { command: "guardscan migrate --type framework --from react --to vue", description: "Preview a framework migration" },
      { command: "guardscan migrate --target react-class-to-hooks --file src/App.jsx", description: "Class components to hooks" },
      { command: "guardscan migrate --type modernization --report -o migration.md", description: "Migration report" },
    ],
  },
  {
    name: "chat",
    icon: MessageSquare,
    description: "Interactive Q&A about your codebase (RAG, BYOK - Bring Your Own Key)",
    usage: "guardscan chat [options]",
    options: [
      { flag: "-m, --model <model>", description: "Override AI model" },
      { flag: "-t, --temperature <temp>", description: "Temperature 0-1 (default: 0.7)" },
      { flag: "--rebuild", description: "Rebuild embeddings index" },
      { flag: "--embedding-provider <provider>", description: "Embedding provider: openai, gemini, ollama, claude, or lmstudio (auto-selected when omitted)" },
      { flag: "--session <path>", description: "Load existing session from file" },
      { flag: "--export <path>", description: "Export conversation to file" },
    ],
    examples: [
      { command: "guardscan chat", description: "Start an interactive chat session" },
      { command: "guardscan chat --rebuild", description: "Rebuild the embeddings index" },
      { command: "guardscan chat --session chat.json --export chat-export.md", description: "Resume a session and export it" },
    ],
  },
];

const configOptions = [
  {
    key: "provider",
    type: "string",
    default: "none",
    description: "AI provider used for AI features",
    possibleValues: [
      "openai",
      "claude",
      "gemini",
      "ollama",
      "lmstudio",
      "openrouter",
      "none",
    ],
  },
  {
    key: "apiKey",
    type: "string",
    default: "unset",
    description:
      "API key for cloud providers. Cloud credentials can instead come from environment variables; Ollama and LM Studio need no key",
    possibleValues: ["Provider API key"],
  },
  {
    key: "apiEndpoint",
    type: "string",
    default: "http://127.0.0.1:11434 (Ollama), http://127.0.0.1:1234 (LM Studio)",
    description:
      "Endpoint for Ollama or LM Studio. Offline mode requires a literal loopback IP (127.0.0.1 or ::1); LM Studio is normalized to the /v1 base path",
    possibleValues: ["URL"],
  },
  {
    key: "allowRemoteSelfHosted",
    type: "boolean",
    default: "false",
    description:
      "Allow a remote self-hosted Ollama or LM Studio endpoint. Requires online mode",
    possibleValues: ["true", "false"],
  },
  {
    key: "offlineMode",
    type: "boolean",
    default: "true",
    description:
      "Block cloud AI, embeddings, update checks, telemetry, and advisory lookups",
    possibleValues: ["true", "false"],
  },
  {
    key: "telemetryEnabled",
    type: "boolean",
    default: "false",
    description:
      "Opt in to locally queued aggregate telemetry. Events are sent only by guardscan telemetry sync to GUARDSCAN_TELEMETRY_URL",
    possibleValues: ["true", "false"],
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
          "OPENAI_API_KEY ANTHROPIC_API_KEY GOOGLE_API_KEY OPENROUTER_API_KEY OLLAMA_ENDPOINT GUARDSCAN_TELEMETRY_URL GUARDSCAN_NO_TELEMETRY GUARDSCAN_OFFLINE GUARDSCAN_HOME environment variables configuration",
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
          "Fully AI-Dependent commands AI-Enhanced commands AI Configuration commit explain test-gen docs chat refactor threat-model migrate review run scan security config --with-ai --skip-ai --ai-fix",
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
        canonical="https://guardscancli.vercel.app/docs"
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
              <p className="text-sm text-muted-foreground mb-6">
                Documentation version:{" "}
                <strong className="text-foreground">v1.1.0</strong>. Install
                it with <code>npm install -g guardscan</code> (Node.js 22 or
                newer).
              </p>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  What's new in 1.1.0
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Node.js 22 or newer is now required.</li>
                  <li>
                    The hosted telemetry endpoint is retired. Telemetry is
                    opt-in, queued locally, and sent only by{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      guardscan telemetry sync
                    </code>{" "}
                    to a collector you set in{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      GUARDSCAN_TELEMETRY_URL
                    </code>
                    .
                  </li>
                  <li>
                    New{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      guardscan vuln
                    </code>{" "}
                    (aliases <code className="px-1 py-0.5 rounded bg-muted">cve</code>,{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">audit</code>)
                    for OSV-backed dependency scanning with offline snapshots.
                  </li>
                  <li>
                    <code className="px-1 py-0.5 rounded bg-muted">
                      guardscan scan
                    </code>{" "}
                    is static-safe by default; repository tests and linters run
                    only with{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      --run-project-code
                    </code>
                    .
                  </li>
                  <li>
                    Scanner failures and incomplete coverage exit with code 2
                    unless partial execution is allowed. JSON and SARIF output
                    are supported.
                  </li>
                  <li>
                    SBOM output is schema-valid SPDX 2.3 or CycloneDX 1.7.
                  </li>
                  <li>
                    Offline Ollama and LM Studio endpoints must be literal
                    loopback IPs; new{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      guardscan cache clear
                    </code>{" "}
                    and{" "}
                    <code className="px-1 py-0.5 rounded bg-muted">
                      guardscan capabilities --json
                    </code>{" "}
                    commands.
                  </li>
                </ul>
              </div>
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
                    <li>Node.js &gt;= 22.0.0</li>
                    <li>npm</li>
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
                          This creates a private local configuration file.
                          GuardScan does not generate or transmit an
                          installation identifier.
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

# Audit exact dependency versions against OSV
guardscan vuln .

# Include license compliance scanning
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
                      Opt-In Telemetry (Off by Default)
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc mb-4">
                      <li>
                        Disabled by default; enable with{" "}
                        <code>guardscan config --telemetry=true</code>
                      </li>
                      <li>
                        Allowlisted aggregate events only (command category,
                        duration, line count, coarse execution mode)
                      </li>
                      <li>
                        Queued locally, and sent only by{" "}
                        <code>guardscan telemetry sync</code> to a collector you
                        run, set in <code>GUARDSCAN_TELEMETRY_URL</code>
                      </li>
                      <li>
                        GuardScan operates no hosted telemetry collector;
                        offline mode and <code>--no-telemetry</code> suppress
                        recording and delivery
                      </li>
                    </ul>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Inspect, sync, or clear the local queue:
                      </p>
                      <CodeBlock
                        code={`guardscan telemetry status
guardscan telemetry clear --force
guardscan --no-telemetry security`}
                      />
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
                      <li>
                        Dependency vulnerability scanning (OSV lookup, or a
                        fresh offline snapshot)
                      </li>
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
                      <li>Ollama (local AI; keyless)</li>
                      <li>LM Studio (local AI; keyless)</li>
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
                          Local code review. Required local scanners always run
                          first; AI enrichment is added when a provider is
                          configured
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>
                            •{" "}
                            <code className="px-1 py-0.5 rounded bg-muted">
                              --with-ai
                            </code>{" "}
                            - Use AI enhancement when a provider is configured
                            (default)
                          </div>
                          <div>
                            •{" "}
                            <code className="px-1 py-0.5 rounded bg-muted">
                              --offline
                            </code>{" "}
                            - Block cloud providers (local review only)
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
                          Comprehensive, static-safe scan (has{" "}
                          <code className="px-1 py-0.5 rounded text-xs bg-muted">
                            --skip-ai
                          </code>{" "}
                          option; repository tests and linters need{" "}
                          <code className="px-1 py-0.5 rounded text-xs bg-muted">
                            --run-project-code
                          </code>
                          )
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
                    Configure AI provider and settings (OpenAI, Anthropic,
                    Google, Ollama, LM Studio, OpenRouter)
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
                        code={`# Select OpenAI (and a model) interactively
guardscan config --provider openai

# Run a review with AI enrichment
guardscan run`}
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
                        code={`# Select Claude (and a model) interactively
guardscan config --provider claude

# Run a review with AI enrichment
guardscan run`}
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
                        code={`# Select Gemini (and a model) interactively
guardscan config --provider gemini

# Run a review with AI enrichment
guardscan run`}
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
                        Step 3: Run Local AI Review
                      </h4>
                      <CodeBlock
                        title="Execute scan with local AI"
                        code={`# Select Ollama (no API key needed)
guardscan config --provider ollama

# Run a review with local AI
guardscan run`}
                      />
                    </div>

                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                      <h5 className="font-semibold text-foreground mb-2">
                        Endpoints (1.1.0)
                      </h5>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-4 list-disc">
                        <li>
                          Defaults: Ollama{" "}
                          <code>http://127.0.0.1:11434</code>, LM Studio{" "}
                          <code>http://127.0.0.1:1234</code> (normalized to the{" "}
                          <code>/v1</code> base path). No API key is required.
                        </li>
                        <li>
                          In offline mode the endpoint must be a literal
                          loopback IP (<code>127.0.0.1</code> or{" "}
                          <code>::1</code>); a hostname such as{" "}
                          <code>localhost</code> is not accepted.
                        </li>
                        <li>
                          A remote self-hosted endpoint requires online mode and{" "}
                          <code>allowRemoteSelfHosted: true</code> in{" "}
                          <code>~/.guardscan/config.yml</code>.
                        </li>
                      </ul>
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
                  code={`# Provider and privacy configuration
# Top-level fields (not a nested "ai:" object)
provider: openai   # openai, claude, gemini, ollama, lmstudio, openrouter, none
# apiKey: ...      # optional; cloud keys can instead come from environment variables

# For Ollama / LM Studio
# apiEndpoint: http://127.0.0.1:11434
# allowRemoteSelfHosted: false   # true only for remote endpoints (online mode)

# Privacy settings
telemetryEnabled: false   # opt-in; off by default
offlineMode: true   # default; set false to allow network-backed features like OSV lookups`}
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
                GuardScan supports the following environment variables.
                Cloud provider credentials can come from the environment
                alone; Ollama and LM Studio need no key.
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
                    name: "OPENROUTER_API_KEY",
                    description: "Your OpenRouter API key",
                    example: "sk-or-...",
                  },
                  {
                    name: "OLLAMA_ENDPOINT",
                    description:
                      "Ollama endpoint (default http://127.0.0.1:11434)",
                    example: "http://127.0.0.1:11434",
                  },
                  {
                    name: "GUARDSCAN_TELEMETRY_URL",
                    description:
                      "Your own HTTPS telemetry collector; used only by guardscan telemetry sync",
                    example: "https://telemetry.example.com",
                  },
                  {
                    name: "GUARDSCAN_NO_TELEMETRY",
                    description: "Set to true to suppress telemetry",
                    example: "true",
                  },
                  {
                    name: "GUARDSCAN_OFFLINE",
                    description: "Set to true (or 1) to block network services",
                    example: "true",
                  },
                  {
                    name: "GUARDSCAN_NO_CACHE",
                    description: "Set to true (or 1) to disable caches",
                    example: "true",
                  },
                  {
                    name: "GUARDSCAN_HOME",
                    description:
                      "Absolute, private directory for GuardScan state",
                    example: "/home/me/.guardscan-work",
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
                      '# Pass environment variables\ndocker run --rm \\\n  -v $(pwd):/workspace \\\n  -w /workspace \\\n  -e OPENAI_API_KEY="sk-your-key-here" \\\n  node:lts-alpine sh -c \\\n  "apk add --no-cache python3 make g++ git && \\\n   npm install -g guardscan && \\\n   guardscan run"'
                    }
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    Use .env File
                  </h4>
                  <CodeBlock
                    code={
                      "# Use .env file\ndocker run --rm \\\n  --env-file .env \\\n  -v $(pwd):/workspace \\\n  -w /workspace \\\n  node:lts-alpine guardscan run"
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
