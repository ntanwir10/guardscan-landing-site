import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

const commands = [
  {
    command: "guardscan init",
    output: [
      "🛡️  Initializing GuardScan...",
      "✓ Created config file: ~/.guardscan/config.yml",
      "✓ Generated client ID: gs_abc123def456",
      "✓ Privacy mode: ENABLED (source code stays local)",
      "",
      "🎉 GuardScan initialized! Run 'guardscan security' to start scanning."
    ]
  },
  {
    command: "guardscan security",
    output: [
      "🔍 Scanning for security vulnerabilities...",
      "",
      "📊 Analyzing 47 files (12,458 LOC)...",
      "⚡ Running 18 security checks...",
      "",
      "✓ Secrets detection: 0 issues",
      "✓ Dependency scan: 2 vulnerabilities found",
      "✓ OWASP Top 10: 1 issue detected",
      "✓ Dockerfile security: No issues",
      "",
      "📝 Report generated: ./guardscan-report.md",
      "",
      "Summary: 3 issues found (1 high, 2 medium)"
    ]
  },
  {
    command: "guardscan run --ai",
    output: [
      "🤖 Starting AI-enhanced code review...",
      "📊 Project size: 12,458 LOC",
      "💰 Cost: $0.62 (0.62 credits)",
      "",
      "⚡ Analyzing code with Claude 3...",
      "🔍 Reviewing security patterns...",
      "🎨 Checking code quality...",
      "✨ Generating recommendations...",
      "",
      "✓ AI review complete!",
      "",
      "Key Findings:",
      "• Function complexity too high in auth.ts:45",
      "• Consider using environment variables for API keys",
      "• Add input validation in user handler",
      "",
      "📝 Full report: ./guardscan-ai-report.md"
    ]
  }
];

export const TerminalDemo = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const currentCommand = commands[currentCommandIndex];

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
      const nextTimer = setTimeout(() => {
        if (currentCommandIndex < commands.length - 1) {
          setCurrentCommandIndex(prev => prev + 1);
          setCurrentLineIndex(0);
          setDisplayedText([]);
        } else {
          setIsRunning(false);
        }
      }, 2000);

      return () => clearTimeout(nextTimer);
    }
  }, [currentCommandIndex, currentLineIndex, isTyping, isRunning, displayedText, currentCommand]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentCommandIndex(0);
    setCurrentLineIndex(0);
    setDisplayedText([]);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentCommandIndex(0);
    setCurrentLineIndex(0);
    setDisplayedText([]);
  };

  return (
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
  );
};
