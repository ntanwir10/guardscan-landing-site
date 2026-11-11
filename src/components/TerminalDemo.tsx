import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

// Output below was captured from GuardScan 1.1.0 (trimmed; paths and timestamps shortened).
const commands = [
  {
    id: "help",
    label: "--help",
    command: "guardscan --help",
    output: [
      "Usage: guardscan [options] [command]",
      "",
      "GuardScan - Privacy-first AI Code Review CLI with comprehensive security",
      "scanning",
      "",
      "Options:",
      "  -V, --version               output the version number",
      "  --no-telemetry              Disable telemetry for this command",
      "  --no-cache                  Disable response, semantic, and advisory caches",
      "                              for this command",
      "  --offline                   Block cloud and GuardScan network services for",
      "                              this command",
      "  --no-cloud                  Deprecated alias for --offline",
      "  -h, --help                  display help for command",
      "",
      "Commands:",
      "  init                        Initialize GuardScan local configuration",
      "  run [options]               Run local code review with optional AI",
      "                              enhancement from your configured provider",
      "  scan [options]              Comprehensive scan - runs security and quality",
      "                              checks in parallel",
      "  security [options]          Run local heuristic security checks",
      "  test [options]              Run tests and code quality analysis",
      "  sbom [options]              Generate Software Bill of Materials (SBOM)",
      "  perf [options]              Run performance testing",
      "  mutation [options]          Run mutation testing to assess test quality",
      "  rules [options]             Run custom rule engine with YAML-based rules",
      "  config [options]            Configure AI provider, privacy controls, and",
      "                              local settings",
      "  status [options]            Show provider, repository, and local",
      "                              configuration status",
      "  reset [options]             Clear local context and cache",
      "  commit [options]            Generate AI-powered commit messages",
      "  explain [options] <target>  Explain code using AI (function, class, file, or",
      "                              theme)",
      "  test-gen [options]          Generate tests using AI",
      "  docs [options]              Generate documentation using AI",
      "  chat [options]              Interactive AI chat about your codebase",
      "  refactor [options]          AI-powered refactoring suggestions",
      "  threat-model [options]      AI-powered threat modeling with STRIDE analysis",
      "  migrate [options]           AI-powered code migration assistant",
      "  review [options]            AI-powered code review for git changes",
      "  models                      Manage AI models",
      "  routing                     Manage model routing for tasks",
      "  budget                      Manage AI spending budgets",
      "  metrics                     View AI operation metrics",
      "  cache                       Manage repository-local AI, semantic, embedding,",
      "                              and advisory caches",
      "  telemetry                   Inspect and explicitly synchronize opt-in",
      "                              telemetry",
      "  capabilities [options]      Inspect optional runtime capabilities and safe",
      "                              fallback modes",
      "  vuln|cve [options] [path]   Scan exact dependency versions for known",
      "                              vulnerabilities using OSV",
      "  help [command]              display help for command",
      ""
],
  },
  {
    id: "init",
    label: "init",
    command: "guardscan init",
    output: [
      "✓ Configuration initialized",
      "  Config directory: ~/.guardscan",
      "",
      "✓ Repository detected",
      "  Name: my-project",
      "  Type: Git",
      "  Branch: main",
      "",
      "✓ Configuration saved",
      "✓ Static analysis enabled",
      "",
      "ℹ  You can add AI later with: guardscan config"
],
  },
  {
    id: "security",
    label: "security",
    command: "guardscan security",
    output: [
      "🛡️  GuardScan Security Scan",
      "",
      "Repository: my-project",
      "",
      "✓ Report saved: ./guardscan-security-2026-11-09T00-33-24-958Z.md",
      "",
      "🔒 Security Summary",
      "  critical: 3",
      "  high: 4",
      "  medium: 1",
      "  Coverage: complete",
      "  Policy: passed"
],
  },
  {
    id: "scan",
    label: "scan",
    command: "guardscan scan --skip-ai --skip-tests --skip-perf --skip-mutation --no-cve",
    output: [
      "🛡️  GuardScan - Comprehensive Security & Quality Analysis",
      "",
      "Repository: my-project",
      "Dependency vulnerability scanning: disabled",
      "",
      "✓ Report saved: ./guardscan-comprehensive-2026-11-09T00-33-25-239Z.md",
      "",
      "📊 Scan Summary",
      "  Security: 8 finding(s), coverage complete",
      "  Quality: complete",
      "  SBOM: succeeded",
      "  Policy: passed",
      "  Duration: 0.1s"
],
  },
  {
    id: "vuln",
    label: "vuln --help",
    command: "guardscan vuln --help",
    output: [
      "Usage: guardscan vuln|cve [options] [command] [path]",
      "",
      "Scan exact dependency versions for known vulnerabilities using OSV",
      "",
      "Arguments:",
      "  path                            Repository to scan (default: \".\")",
      "",
      "Options:",
      "  --ecosystem <names...>          Limit scanning to npm, pip, go, ruby, cargo,",
      "                                  or maven",
      "  --scope <scope>                 Dependency scope (all or runtime)",
      "  --offline                       Use a matching local vulnerability snapshot",
      "                                  without network access",
      "  --no-cloud                      Deprecated alias for --offline",
      "  --refresh                       Bypass prior coverage and atomically replace",
      "                                  the vulnerability snapshot",
      "  --allow-partial                 Allow missing, stale, or incomplete",
      "                                  vulnerability coverage",
      "  --concurrency <number>          Maximum concurrent advisory detail requests",
      "                                  (default: \"4\")",
      "  --format <format>               Output format (table, json, or sarif)",
      "                                  (default: \"table\")"
],
  },
  {
    id: "models",
    label: "models list",
    command: "guardscan models list",
    output: [
      "📋 Available Models",
      "",
      "Models are grouped by provider (CLAUDE, GEMINI, OLLAMA, OPENAI, ...).",
      "",
      "(trimmed: the list depends on your installed version)"
],
  },
  {
    id: "budget",
    label: "budget status",
    command: "guardscan budget status",
    output: [
      "💰 Budget Status",
      "",
      "📅 Daily Budget:",
      "  Used:      $0.00",
      "  Limit:     $10.00",
      "  Remaining: $10.00",
      "  Progress:  [░░░░░░░░░░░░░░░░░░░░] 0%",
      "",
      "📆 Monthly Budget:",
      "  Used:      $0.00",
      "  Limit:     $100.00",
      "  Remaining: $100.00",
      "",
      "💳 Per-Request Limit:",
      "  Limit:     $1.00"
],
  },
  {
    id: "config",
    label: "config --show",
    command: "guardscan config --show",
    output: [
      "📋 GuardScan Configuration",
      "",
      "1. Operation Mode",
      "   Current: 🛡️  Static Analysis Only",
      "",
      "2. AI Provider Configuration",
      "   Provider: None (Static Analysis Only)",
      "",
      "3. System Settings",
      "   Telemetry: Disabled",
      "   Offline Mode: Yes",
      "",
      "(trimmed)"
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
            aria-label={`Run demo: guardscan ${cmd.label}`}
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
                aria-label="Run terminal demo"
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
                aria-label="Reset terminal demo"
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
            <div className="space-y-1 whitespace-pre-wrap break-words">
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
