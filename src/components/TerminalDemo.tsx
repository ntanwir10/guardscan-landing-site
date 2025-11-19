import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

const commands = [
  {
    id: "help",
    label: "--help",
    command: "guardscan --help",
    output: [
      "🛡️  GuardScan - Privacy-First Code Security & Quality Scanner",
      "",
      "USAGE:",
      "  guardscan [COMMAND] [OPTIONS]",
      "",
      "COMMANDS:",
      "  init           Initialize GuardScan in your project",
      "  security       Scan for security vulnerabilities",
      "  quality        Analyze code quality and complexity",
      "  dependencies   Check for outdated and vulnerable packages",
      "  secrets        Detect hardcoded secrets and API keys",
      "  docker         Scan Dockerfile for security issues",
      "  all            Run all scans (security, quality, dependencies)",
      "  run            Execute AI-powered code review (requires API key)",
      "",
      "OPTIONS:",
      "  --ai           Enable AI-powered analysis",
      "  --local        Use local Ollama for AI analysis",
      "  --output, -o   Specify output format (json, md, html)",
      "",
      "🔒 Privacy: Your code stays local. No data sent to GuardScan servers.",
      "📖 Docs: https://docs.guardscan.dev"
    ]
  },
  {
    id: "init",
    label: "init",
    command: "guardscan init",
    output: [
      "🛡️  Initializing GuardScan...",
      "",
      "✓ Created config file: ~/.guardscan/config.yml",
      "✓ Generated client ID: gs_abc123def456",
      "✓ Privacy mode: ENABLED (source code stays local)",
      "",
      "Configuration options:",
      "  • Security scanning: enabled",
      "  • Quality analysis: enabled",
      "  • Secret detection: enabled",
      "  • AI provider: Not configured (optional)",
      "",
      "🎉 GuardScan initialized successfully!",
      "",
      "Next steps:",
      "  1. Run 'guardscan security' to scan for vulnerabilities",
      "  2. Or run 'guardscan all' for a complete analysis"
    ]
  },
  {
    id: "security",
    label: "security",
    command: "guardscan security",
    output: [
      "🔍 Running security scan...",
      "",
      "📊 Analyzing 47 files (12,458 LOC)...",
      "⚡ Running 18 security checks...",
      "",
      "✓ SQL Injection: No issues found",
      "✓ XSS Vulnerabilities: No issues found",
      "✓ CSRF Protection: 1 warning",
      "✓ Authentication: No issues found",
      "✓ Secrets Detection: 0 hardcoded secrets",
      "✓ Dependency Scan: 2 vulnerabilities found",
      "  • lodash@4.17.19 (High) - Prototype Pollution",
      "  • axios@0.19.0 (Medium) - SSRF vulnerability",
      "✓ OWASP Top 10: 1 issue detected",
      "✓ Dockerfile Security: No issues found",
      "",
      "📝 Report generated: ./guardscan-security-report.md",
      "",
      "Summary: 3 issues found (1 high, 2 medium, 1 low)",
      "⚡ Scan completed in 2.4s"
    ]
  },
  {
    id: "quality",
    label: "quality",
    command: "guardscan quality",
    output: [
      "📊 Analyzing code quality...",
      "",
      "🔍 Checking 47 files...",
      "",
      "Code Complexity:",
      "✓ Average cyclomatic complexity: 3.2 (good)",
      "⚠ 2 functions exceed complexity threshold:",
      "  • src/auth/validator.ts:45 (complexity: 12)",
      "  • src/api/handler.ts:89 (complexity: 15)",
      "",
      "Code Duplication:",
      "✓ Duplication: 4.2% (acceptable)",
      "  • 3 duplicate blocks found",
      "",
      "Maintainability Index:",
      "✓ Overall: 78/100 (good)",
      "",
      "Test Coverage:",
      "⚠ Coverage: 67% (recommended: 80%)",
      "",
      "📝 Report generated: ./guardscan-quality-report.md",
      "⚡ Analysis completed in 1.8s"
    ]
  },
  {
    id: "dependencies",
    label: "dependencies",
    command: "guardscan dependencies",
    output: [
      "📦 Checking dependencies...",
      "",
      "🔍 Analyzing package.json and lock files...",
      "",
      "Security Vulnerabilities:",
      "🔴 2 high severity vulnerabilities",
      "  • lodash@4.17.19 - Prototype Pollution (CVE-2020-8203)",
      "    Fix: upgrade to lodash@4.17.21",
      "  • axios@0.19.0 - SSRF (CVE-2020-28168)",
      "    Fix: upgrade to axios@0.21.1",
      "",
      "🟡 1 medium severity vulnerability",
      "  • node-fetch@2.6.0 - Information Exposure",
      "    Fix: upgrade to node-fetch@2.6.7",
      "",
      "Outdated Packages:",
      "⚠ 5 packages have updates available:",
      "  • react: 17.0.2 → 18.2.0",
      "  • typescript: 4.5.2 → 5.0.4",
      "  • eslint: 8.0.0 → 8.42.0",
      "",
      "📝 Run 'npm update' to update packages",
      "⚡ Scan completed in 3.1s"
    ]
  },
  {
    id: "ai",
    label: "run --ai",
    command: "guardscan run --ai",
    output: [
      "🤖 Starting AI-powered code review...",
      "",
      "Using API key: OpenAI (gpt-4)",
      "📊 Project size: 12,458 LOC",
      "",
      "⚡ Analyzing code patterns...",
      "🔍 Reviewing security practices...",
      "🎨 Checking code quality...",
      "✨ Generating recommendations...",
      "",
      "✓ AI review complete!",
      "",
      "🎯 Key Findings:",
      "",
      "Security:",
      "  • Consider implementing rate limiting on API endpoints",
      "  • Add input sanitization in user registration flow",
      "  • Use parameterized queries instead of string concatenation",
      "",
      "Code Quality:",
      "  • auth.ts:45 - Function too complex, consider refactoring",
      "  • Inconsistent error handling patterns across modules",
      "  • Missing TypeScript strict mode in 3 files",
      "",
      "Best Practices:",
      "  • Add JSDoc comments for public APIs",
      "  • Consider implementing request timeout handling",
      "  • Use environment variables for all configuration",
      "",
      "📝 Full report: ./guardscan-ai-report.md",
      "⚡ Analysis completed in 8.2s"
    ]
  },
  {
    id: "secrets",
    label: "secrets",
    command: "guardscan secrets",
    output: [
      "🔐 Scanning for hardcoded secrets...",
      "",
      "🔍 Analyzing 47 files...",
      "",
      "✓ No hardcoded secrets detected!",
      "",
      "Checked patterns:",
      "  • API keys and tokens",
      "  • Database credentials",
      "  • Private keys (RSA, SSH)",
      "  • AWS/GCP/Azure credentials",
      "  • OAuth tokens",
      "  • JWT secrets",
      "  • Password patterns",
      "",
      "Best Practices:",
      "✓ All sensitive config uses environment variables",
      "✓ .env files properly gitignored",
      "✓ No credentials in commit history",
      "",
      "📝 Report generated: ./guardscan-secrets-report.md",
      "⚡ Scan completed in 1.2s"
    ]
  }
];

export const TerminalDemo = () => {
  const [selectedCommandId, setSelectedCommandId] = useState<string>("help");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const currentCommand = commands.find(cmd => cmd.id === selectedCommandId) || commands[0];

  useEffect(() => {
    if (!isRunning) return;

    if (currentLineIndex === 0 && displayedText.length === 0) {
      setIsTyping(true);
      const command = currentCommand.command;
      let charIndex = 0;
      
      const typeCommand = setInterval(() => {
        if (charIndex <= command.length) {
          setDisplayedText([`$ ${command.slice(0, charIndex)}`]);
          charIndex++;
        } else {
          clearInterval(typeCommand);
          setIsTyping(false);
          setTimeout(() => {
            setDisplayedText([`$ ${command}`, ""]);
            setCurrentLineIndex(0);
          }, 300);
        }
      }, 50);

      return () => clearInterval(typeCommand);
    }

    if (currentLineIndex < currentCommand.output.length && !isTyping) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => [
          ...prev,
          currentCommand.output[currentLineIndex]
        ]);
        setCurrentLineIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    }

    if (currentLineIndex >= currentCommand.output.length && !isTyping) {
      setIsRunning(false);
    }
  }, [selectedCommandId, currentLineIndex, isTyping, isRunning, displayedText, currentCommand]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentLineIndex(0);
    setDisplayedText([]);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentLineIndex(0);
    setDisplayedText([]);
  };

  return (
    <div className="space-y-4">
      {/* Command Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {commands.map((cmd) => (
          <Button
            key={cmd.id}
            size="sm"
            variant={selectedCommandId === cmd.id ? "default" : "outline"}
            onClick={() => {
              setSelectedCommandId(cmd.id);
              startDemo();
            }}
            disabled={isRunning}
            className="font-mono text-xs"
          >
            guardscan {cmd.label}
          </Button>
        ))}
      </div>

      {/* Terminal */}
      <Card className="bg-code-bg border-terminal-green/30 overflow-hidden">
        <div className="bg-terminal-green/10 border-b border-terminal-green/30 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-green/80"></div>
          <span className="ml-2 text-sm text-muted-foreground font-mono">terminal</span>
        </div>
        <div className="flex gap-2">
          {!isRunning && displayedText.length === 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={startDemo}
              className="h-6 text-xs text-terminal-green hover:text-terminal-green hover:bg-terminal-green/10"
            >
              <Play className="w-3 h-3 mr-1" />
              Run Demo
            </Button>
          )}
          {displayedText.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={resetDemo}
              className="h-6 text-xs text-terminal-cyan hover:text-terminal-cyan hover:bg-terminal-cyan/10"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>
      <div className="p-6 font-mono text-sm min-h-[400px]">
        {displayedText.length === 0 && !isRunning ? (
          <div className="text-muted-foreground text-center py-20">
            <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Click "Run Demo" to see GuardScan in action</p>
          </div>
        ) : (
          <div className="space-y-1">
            {displayedText.map((line, index) => (
              <div
                key={index}
                className={
                  line.startsWith("$")
                    ? "text-terminal-green font-semibold"
                    : line.startsWith("✓") || line.startsWith("🎉")
                    ? "text-terminal-cyan"
                    : line.startsWith("•")
                    ? "text-terminal-blue ml-4"
                    : line.includes("issues") || line.includes("vulnerabilities")
                    ? "text-yellow-500"
                    : "text-foreground/90"
                }
              >
                {line || "\u00A0"}
              </div>
            ))}
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-terminal-green animate-pulse ml-1"></span>
            )}
          </div>
        )}
      </div>
      </Card>
    </div>
  );
};
