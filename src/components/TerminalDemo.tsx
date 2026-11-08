import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

const commands = [
  {
    id: "help",
    label: "--help",
    command: "guardscan --help",
    output: [
      " Privacy-First AI Code Review & Security Scanning",
      "",
      "🛡️  GuardScan - Privacy-First Code Security & Quality Scanner",
      "",
      "USAGE:",
      "  guardscan [COMMAND] [OPTIONS]",
      "",
      "COMMANDS:",
      "  init           Initialize GuardScan in your project",
      "  config         Configure AI provider and settings",
      "  security       Scan for security vulnerabilities (--ai-fix for AI fixes)",
      "  scan           Comprehensive scan (AI-enhanced, use --skip-ai to disable)",
      "  vuln           Audit exact dependency versions against OSV",
      "  perf           Performance testing & load testing",
      "  mutation       Mutation testing for test quality",
      "  explain        Explain code using AI (function, class, file, or theme)",
      "  review         AI-powered code review for git changes",
      "  test-gen       Generate tests using AI",
      "  threat-model   AI-powered threat modeling with STRIDE analysis",
      "  chat           Interactive AI chat about your codebase (RAG)",
      "",
      "OPTIONS:",
      "  --offline      Block cloud and GuardScan network services",
      "  --no-telemetry Disable telemetry for this command",
      "  --no-cache     Disable response and advisory caches",
      "",
      "🔒 Privacy: Your code stays local. No data sent to GuardScan servers.",
      "📖 Docs: https://guardscancli.vercel.app/docs",
    ],
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
      "  2. Run 'guardscan config' to set up AI provider (optional)",
    ],
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
      "💡 Tip: Use '--ai-fix' for AI-powered fix suggestions",
      "",
      "📝 Report generated: ./guardscan-security-report.md",
      "",
      "Summary: 3 issues found (1 high, 2 medium, 1 low)",
      "⚡ Scan completed in 2.4s",
    ],
  },
  {
    id: "config",
    label: "config",
    command: "guardscan config",
    output: [
      "⚙️  Configuring GuardScan...",
      "",
      "Available AI Providers:",
      "  • OpenAI (GPT-4, GPT-3.5-turbo)",
      "  • Anthropic (Claude 3 Opus, Sonnet, Haiku)",
      "  • Google (Gemini Pro)",
      "  • Ollama (Local - codellama, llama2)",
      "",
      "Current Configuration:",
      "  Provider: OpenAI",
      "  Model: gpt-4",
      "  API Key: ✓ Configured",
      "",
      "To configure a provider:",
      "  guardscan config --provider openai --key sk-...",
      "  guardscan config --provider ollama  # No API key needed",
      "",
      "✓ Configuration saved to ~/.guardscan/config.yml",
    ],
  },
  {
    id: "scan",
    label: "scan",
    command: "guardscan scan",
    output: [
      "🔍 Running comprehensive scan...",
      "",
      "📊 Analyzing 47 files (12,458 LOC)...",
      "⚡ Running security checks...",
      "🤖 AI analysis enabled (use --skip-ai to disable)",
      "",
      "Security Scan:",
      "✓ SQL Injection: No issues found",
      "✓ XSS Vulnerabilities: No issues found",
      "✓ Secrets Detection: 0 hardcoded secrets",
      "✓ Dependency Scan: 2 vulnerabilities found",
      "",
      "AI-Enhanced Analysis:",
      "  • Potential performance bottleneck in auth.ts:45",
      "  • Consider adding input validation in user.ts:23",
      "  • Code quality: Good overall, minor improvements suggested",
      "",
      "📝 Report generated: ./guardscan-scan-report.md",
      "",
      "Summary: 2 vulnerabilities, 3 AI suggestions",
      "⚡ Scan completed in 3.8s",
    ],
  },
  {
    id: "perf",
    label: "perf",
    command: "guardscan perf",
    output: [
      "⚡ Running performance analysis...",
      "",
      "📊 Benchmarking application...",
      "",
      "Performance Metrics:",
      "  • Average response time: 145ms",
      "  • P95 response time: 320ms",
      "  • P99 response time: 580ms",
      "  • Throughput: 1,250 req/s",
      "",
      "Load Test Results (60s, 100 concurrent):",
      "  • Total requests: 75,000",
      "  • Successful: 74,850 (99.8%)",
      "  • Failed: 150 (0.2%)",
      "  • Average latency: 142ms",
      "",
      "Bottlenecks Identified:",
      "  ⚠ Database query in user.ts:89 (slow)",
      "  ⚠ Large payload in api.ts:156 (optimize)",
      "",
      "📝 Report generated: ./guardscan-perf-report.md",
      "⚡ Analysis completed in 65.2s",
    ],
  },
  {
    id: "mutation",
    label: "mutation",
    command: "guardscan mutation",
    output: [
      "🧪 Running mutation testing...",
      "",
      "📊 Analyzing test suite...",
      "🔍 Generating mutations...",
      "",
      "Mutation Test Results:",
      "  • Total mutations: 247",
      "  • Killed: 218 (88.3%)",
      "  • Survived: 29 (11.7%)",
      "  • Mutation score: 88.3%",
      "",
      "Surviving Mutations:",
      "  ⚠ src/utils.ts:45 - Arithmetic operator change",
      "  ⚠ src/auth.ts:78 - Conditional boundary change",
      "  ⚠ src/api.ts:123 - Return value change",
      "",
      "Recommendations:",
      "  • Add edge case tests for utils.ts:45",
      "  • Improve boundary testing in auth.ts:78",
      "  • Test return values in api.ts:123",
      "",
      "📝 Report generated: ./guardscan-mutation-report.md",
      "⚡ Testing completed in 12.4s",
    ],
  },
  {
    id: "explain",
    label: "explain",
    command: "guardscan explain src/utils.ts",
    output: [
      "🤖 AI Code Explanation",
      "",
      "Analyzing: src/utils.ts",
      "Using model: gpt-4",
      "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "📄 File Overview:",
      "This utility module provides helper functions for data",
      "validation, formatting, and transformation.",
      "",
      "🔍 Key Functions:",
      "",
      "1. validateEmail(email: string): boolean",
      "   Validates email format using regex pattern matching.",
      "   Returns true if valid, false otherwise.",
      "",
      "2. formatCurrency(amount: number, currency: string): string",
      "   Formats numeric amount as currency string with proper",
      "   symbol placement and decimal formatting.",
      "",
      "3. debounce(func: Function, delay: number): Function",
      "   Creates a debounced version of the input function that",
      "   delays execution until after delay milliseconds have",
      "   passed since last invocation.",
      "",
      "💡 Design Patterns:",
      "  • Uses functional programming approach",
      "  • Pure functions (no side effects)",
      "  • Type-safe with TypeScript",
      "",
      "📝 Full explanation saved to: ./explain-utils.md",
      "⚡ Analysis completed in 2.1s",
    ],
  },
  {
    id: "review",
    label: "review",
    command: "guardscan review src/auth.ts",
    output: [
      "🤖 AI Code Review",
      "",
      "Reviewing: src/auth.ts",
      "Using model: gpt-4",
      "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "📊 Review Summary:",
      "  • Security: ⚠ 2 issues",
      "  • Performance: ✓ Good",
      "  • Code Quality: ⚠ 1 improvement",
      "  • Best Practices: ✓ Good",
      "",
      "🔒 Security Issues:",
      "",
      "1. Line 45: Hardcoded JWT secret",
      "   Severity: HIGH",
      "   Issue: JWT secret is hardcoded in source code",
      "   Fix: Move to environment variable",
      "   Code: const secret = 'my-secret-key';",
      "",
      "2. Line 78: Missing rate limiting",
      "   Severity: MEDIUM",
      "   Issue: Login endpoint lacks rate limiting",
      "   Fix: Add rate limiting middleware",
      "",
      "💡 Code Quality:",
      "  • Line 23: Function is too complex (cyclomatic: 12)",
      "  • Consider breaking into smaller functions",
      "",
      "✅ Strengths:",
      "  • Good error handling",
      "  • Proper input validation",
      "  • Clean code structure",
      "",
      "📝 Full review saved to: ./review-auth.md",
      "⚡ Review completed in 3.5s",
    ],
  },
  {
    id: "test-gen",
    label: "test-gen",
    command: "guardscan test-gen src/utils.ts",
    output: [
      "🤖 AI Test Generation",
      "",
      "Generating tests for: src/utils.ts",
      "Using model: gpt-4",
      "Framework: Jest",
      "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "📝 Generated Test Suite:",
      "",
      "✓ validateEmail() - 8 test cases",
      "  • Valid email formats",
      "  • Invalid email formats",
      "  • Edge cases (empty, null, undefined)",
      "",
      "✓ formatCurrency() - 6 test cases",
      "  • Different currencies (USD, EUR, JPY)",
      "  • Decimal precision",
      "  • Negative amounts",
      "",
      "✓ debounce() - 5 test cases",
      "  • Function execution delay",
      "  • Multiple rapid calls",
      "  • Clear timeout behavior",
      "",
      "📄 Test file created: src/__tests__/utils.test.ts",
      "",
      "Test Coverage:",
      "  • Lines: 95%",
      "  • Functions: 100%",
      "  • Branches: 92%",
      "",
      "⚡ Generation completed in 4.2s",
    ],
  },
  {
    id: "threat-model",
    label: "threat-model",
    command: "guardscan threat-model",
    output: [
      "🛡️  AI Threat Modeling (STRIDE Analysis)",
      "",
      "Analyzing application architecture...",
      "Using model: gpt-4",
      "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "📊 Threat Model Summary:",
      "",
      "🔴 HIGH RISK (3 threats):",
      "  1. Spoofing: Weak authentication in /api/login",
      "  2. Tampering: No input validation in /api/users",
      "  3. Information Disclosure: Sensitive data in logs",
      "",
      "🟡 MEDIUM RISK (5 threats):",
      "  4. Denial of Service: No rate limiting",
      "  5. Elevation of Privilege: Missing authorization checks",
      "  6. Data Integrity: Unencrypted database connections",
      "",
      "🟢 LOW RISK (2 threats):",
      "  7. Repudiation: Missing audit logging",
      "  8. Session Management: Weak session tokens",
      "",
      "💡 Recommendations:",
      "  • Implement strong authentication (2FA)",
      "  • Add input validation middleware",
      "  • Enable database encryption",
      "  • Implement rate limiting",
      "  • Add comprehensive audit logging",
      "",
      "📝 Full threat model saved to: ./threat-model.md",
      "⚡ Analysis completed in 8.7s",
    ],
  },
  {
    id: "chat",
    label: "chat",
    command: "guardscan chat",
    output: [
      "💬 GuardScan AI Chat (RAG)",
      "",
      "Connected to codebase knowledge base",
      "Using model: gpt-4",
      "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "You can ask questions about your codebase:",
      "",
      "Example questions:",
      "  • 'How does authentication work?'",
      "  • 'Where is the user validation logic?'",
      "  • 'Explain the API structure'",
      "  • 'What security measures are in place?'",
      "",
      "💡 Tip: The AI has context about your entire codebase",
      "   and can answer questions about code, architecture,",
      "   and best practices.",
      "",
      "Type 'exit' to quit the chat session.",
      "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "> How does authentication work in this codebase?",
      "",
      "🤖 Based on the codebase analysis:",
      "",
      "Authentication is handled in src/auth/auth.ts using JWT tokens.",
      "The flow is:",
      "",
      "1. User submits credentials via POST /api/login",
      "2. Credentials are validated against the database",
      "3. JWT token is generated with user ID and role",
      "4. Token is returned to client and stored in cookies",
      "5. Subsequent requests include token in Authorization header",
      "",
      "Key files:",
      "  • src/auth/auth.ts - Main authentication logic",
      "  • src/middleware/auth.ts - Token validation middleware",
      "  • src/routes/auth.ts - Authentication routes",
      "",
      "> ",
    ],
  },
];

export const TerminalDemo = () => {
  const [selectedCommandId, setSelectedCommandId] = useState<string>("help");
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasCompletedOutput, setHasCompletedOutput] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentCommandRef = useRef(
    commands.find((cmd) => cmd.id === selectedCommandId) || commands[0]
  );
  const animationStateRef = useRef<{
    phase: "idle" | "typing" | "output";
    charIndex: number;
    lineIndex: number;
  }>({
    phase: "idle",
    charIndex: 0,
    lineIndex: 0,
  });
  const isAutoStartingRef = useRef(false);
  const hasCompletedOutputRef = useRef(false);
  const completedOutputRef = useRef<string[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    hasCompletedOutputRef.current = hasCompletedOutput;
  }, [hasCompletedOutput]);

  // Safe wrapper for setDisplayedText that prevents clearing after output completes
  const safeSetDisplayedText = useCallback(
    (updater: string[] | ((prev: string[]) => string[])) => {
      setDisplayedText((prev) => {
        // If we have completed output and have content, NEVER allow clearing
        if (hasCompletedOutputRef.current && prev.length > 0) {
          // If output has completed and we have content, only allow updates that add content
          if (typeof updater === "function") {
            const newValue = updater(prev);
            // Only update if new value has more or equal content
            if (newValue.length >= prev.length) {
              return newValue;
            }
            // Don't allow clearing - return previous value
            console.warn(
              "Attempted to clear displayedText after output completed, prevented"
            );
            return prev;
          } else {
            // If it's an array, only allow if it has content
            if (updater.length > 0) {
              return updater;
            }
            // Don't allow clearing - return previous value
            console.warn(
              "Attempted to clear displayedText after output completed, prevented"
            );
            return prev;
          }
        }
        // Normal update
        return typeof updater === "function" ? updater(prev) : updater;
      });
    },
    []
  );

  // Restore displayedText if it gets cleared after output completes
  useEffect(() => {
    if (
      hasCompletedOutput &&
      displayedText.length === 0 &&
      completedOutputRef.current.length > 0
    ) {
      // Output was completed but displayedText was cleared - restore it
      console.warn(
        "displayedText was cleared after output completed, restoring..."
      );
      setDisplayedText([...completedOutputRef.current]);
    } else if (hasCompletedOutput && displayedText.length > 0) {
      // Update the ref with current content so we can restore if needed
      completedOutputRef.current = [...displayedText];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCompletedOutput, displayedText.length]);
  useEffect(() => {
    currentCommandRef.current =
      commands.find((cmd) => cmd.id === selectedCommandId) || commands[0];

    // Always clear timers when command changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsRunning(false);
    setIsTyping(false);
    setHasCompletedOutput(false);
    completedOutputRef.current = [];
    animationStateRef.current = { phase: "idle", charIndex: 0, lineIndex: 0 };

    // Only clear displayedText if we're not auto-starting (will be cleared in startDemo)
    if (!isAutoStartingRef.current) {
      setDisplayedText([]);
    }
  }, [selectedCommandId]);

  // Main animation effect - handles both typing and output
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const command = currentCommandRef.current.command;
    const output = currentCommandRef.current.output;
    const state = animationStateRef.current;

    // Typing phase
    if (state.phase === "typing" && !intervalRef.current) {
      setIsTyping(true);
      intervalRef.current = setInterval(() => {
        if (state.charIndex <= command.length) {
          safeSetDisplayedText((prev) => {
            // Only update if we're still in typing phase
            if (state.phase === "typing") {
              return [`$ ${command.slice(0, state.charIndex)}`];
            }
            return prev;
          });
          state.charIndex++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsTyping(false);
          // Transition to output after delay
          timeoutRef.current = setTimeout(() => {
            safeSetDisplayedText((prev) => {
              // Preserve any existing content, just ensure we have the command line
              if (prev.length === 0 || !prev[0]?.startsWith("$")) {
                return [`$ ${command}`, ""];
              }
              return prev;
            });
            state.phase = "output";
            state.lineIndex = 0;
            // Start output display
            const displayNextLine = () => {
              if (state.lineIndex < output.length) {
                safeSetDisplayedText((prev) => {
                  // Defensive: never clear existing content
                  const newLine = output[state.lineIndex];
                  // Ensure we never add undefined/null values
                  if (newLine === undefined || newLine === null) {
                    return prev;
                  }
                  // Check if this line was already added
                  const expectedLength = 2 + state.lineIndex; // command + empty line + output lines
                  if (prev.length >= expectedLength) {
                    return prev; // Already added
                  }
                  return [...prev, newLine];
                });
                state.lineIndex++;
                timeoutRef.current = setTimeout(displayNextLine, 100);
              } else {
                // All done - keep output visible, NEVER clear displayedText
                // Store the completed output in ref for restoration if needed
                setDisplayedText((prev) => {
                  completedOutputRef.current = [...prev];
                  return prev;
                });
                setHasCompletedOutput(true);
                setIsRunning(false);
                state.phase = "idle";
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              }
            };
            timeoutRef.current = setTimeout(displayNextLine, 100);
          }, 300);
        }
      }, 50);
    }

    return () => {
      // Only clear timers, NEVER clear displayedText in cleanup
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const startDemo = () => {
    // Only clear if we haven't completed output, or if explicitly resetting
    setHasCompletedOutput(false);
    animationStateRef.current = { phase: "typing", charIndex: 0, lineIndex: 0 };
    setIsRunning(true);
    // Always clear when starting a new demo
    setDisplayedText([]);
  };

  const resetDemo = () => {
    setHasCompletedOutput(false);
    completedOutputRef.current = [];
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsRunning(false);
    setIsTyping(false);
    setDisplayedText([]);
    animationStateRef.current = { phase: "idle", charIndex: 0, lineIndex: 0 };
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
              isAutoStartingRef.current = true;
              setSelectedCommandId(cmd.id);
              // Start demo after command selection
              setTimeout(() => {
                isAutoStartingRef.current = false;
                startDemo();
              }, 100);
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
            <span className="ml-2 text-sm text-muted-foreground font-mono">
              terminal
            </span>
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
          {displayedText.length === 0 ? (
            <div className="text-muted-foreground text-center py-20">
              <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Click "Run Demo" to see GuardScan in action</p>
            </div>
          ) : (
            <div className="space-y-1">
              {displayedText
                .filter((line) => line !== undefined && line !== null)
                .map((line, index) => {
                  const lineStr = String(line || "");
                  // Check if this is an ASCII art line (contains underscores, pipes, or backslashes in ASCII art pattern)
                  const isAsciiArt =
                    /^[ _|\\/\\-]+$/.test(lineStr.trim()) &&
                    lineStr.length > 20;
                  return (
                    <div
                      key={`${lineStr}-${index}`}
                      className={
                        lineStr.startsWith("$")
                          ? "text-terminal-green font-semibold"
                          : lineStr.startsWith("✓") || lineStr.startsWith("🎉")
                          ? "text-terminal-cyan"
                          : lineStr.startsWith("•")
                          ? "text-terminal-blue ml-4"
                          : lineStr.includes("issues") ||
                            lineStr.includes("vulnerabilities")
                          ? "text-yellow-500"
                          : isAsciiArt
                          ? "text-foreground/90 whitespace-pre font-mono"
                          : "text-foreground/90"
                      }
                    >
                      {lineStr || "\u00A0"}
                    </div>
                  );
                })}
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
