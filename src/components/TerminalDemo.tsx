import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Check, Copy, FastForward, FileText, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DEMO_PROJECT, DEMO_SESSIONS, DEMO_VERSION, type DemoSession } from "@/data/terminal-demo";

const TYPE_MS = 28;
const LINE_MS = 30;
const PAUSE_MS = 400;

interface Frame {
  step: number;
  chars: number;
  lines: number;
}

/** Precompute every frame once, so playback is a single counter that Skip can jump to the end of. */
function buildTimeline(session: DemoSession): { frames: Frame[]; delays: number[] } {
  const frames: Frame[] = [];
  const delays: number[] = [];
  session.steps.forEach((step, index) => {
    for (let chars = 1; chars <= step.command.length; chars += 1) {
      frames.push({ step: index, chars, lines: 0 });
      delays.push(chars === step.command.length ? PAUSE_MS : TYPE_MS);
    }
    for (let lines = 1; lines <= step.output.length; lines += 1) {
      frames.push({ step: index, chars: step.command.length, lines });
      delays.push(lines === step.output.length ? PAUSE_MS : LINE_MS);
    }
  });
  return { frames, delays };
}

function lineClass(line: string): string {
  const text = line.trimStart();
  if (/^(CRITICAL|critical:)/.test(text)) return "text-red-400";
  if (/^(HIGH|high:)/.test(text)) return "text-orange-400";
  if (/^(MEDIUM|medium:)/.test(text)) return "text-yellow-400";
  if (/^(LOW|low:)/.test(text)) return "text-terminal-blue";
  if (text.startsWith("✓") || text === "Policy: passed") return "text-terminal-green";
  if (text.startsWith("Policy: policy-failed") || text.startsWith("- ")) return "text-red-400";
  if (text.startsWith("Update to")) return "text-terminal-cyan";
  if (/^(🛡️|🔒|Dependency Vulnerabilities)/u.test(text)) return "font-semibold text-foreground";
  return "text-foreground/80";
}

const SEVERITY_BADGE: Record<string, string> = {
  critical: "border-red-500/40 bg-red-500/10 text-red-400",
  high: "border-orange-500/40 bg-orange-500/10 text-orange-400",
  medium: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
  low: "border-terminal-blue/40 bg-terminal-blue/10 text-terminal-blue",
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return;
    setReduced(query.matches);
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export const TerminalDemo = () => {
  const [selected, setSelected] = useState(0);
  const [frame, setFrame] = useState(-1); // -1: not started yet
  const [copied, setCopied] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const session = DEMO_SESSIONS[selected];
  const { frames, delays } = useMemo(() => buildTimeline(session), [session]);
  const last = frames.length - 1;
  const done = frame >= last;
  const playing = frame >= 0 && !done;

  const start = () => setFrame(reducedMotion ? last : 0);

  // Start the first session when the demo scrolls into view.
  useEffect(() => {
    const node = rootRef.current;
    if (!node || frame !== -1) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setFrame(reducedMotion ? last : 0);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [frame, last, reducedMotion]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setFrame((current) => current + 1), delays[frame]);
    return () => window.clearTimeout(timer);
  }, [frame, playing, delays]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body && frame >= 0) body.scrollTop = body.scrollHeight;
  }, [frame]);

  const select = (index: number) => {
    setSelected(index);
    setFrame(reducedMotion ? buildTimeline(DEMO_SESSIONS[index]).frames.length - 1 : 0);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!offset) return;
    event.preventDefault();
    const next = (selected + offset + DEMO_SESSIONS.length) % DEMO_SESSIONS.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const copyCommands = async () => {
    try {
      await navigator.clipboard.writeText(session.steps.map((step) => step.command).join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the commands stay visible in the terminal.
    }
  };

  const current = frame >= 0 ? frames[Math.min(frame, last)] : undefined;

  return (
    <div ref={rootRef} className="space-y-4">
      <div
        role="tablist"
        aria-label="GuardScan commands"
        onKeyDown={onTabKeyDown}
        className="flex flex-wrap justify-center gap-2"
      >
        {DEMO_SESSIONS.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => (tabRefs.current[index] = element)}
            id={`demo-tab-${item.id}`}
            role="tab"
            type="button"
            aria-selected={index === selected}
            aria-controls="demo-terminal"
            tabIndex={index === selected ? 0 : -1}
            onClick={() => select(index)}
            className={cn(
              "rounded-md border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              index === selected
                ? "border-terminal-green/60 bg-terminal-green/10"
                : "border-border bg-card/50 hover:border-terminal-green/40"
            )}
          >
            <span className="block font-mono text-sm text-foreground">guardscan {item.label}</span>
            <span className="block text-xs text-muted-foreground">{item.summary}</span>
          </button>
        ))}
      </div>

      <Card
        id="demo-terminal"
        role="tabpanel"
        aria-labelledby={`demo-tab-${session.id}`}
        aria-busy={playing}
        className="overflow-hidden border-terminal-green/30 bg-code-bg"
      >
        <div className="flex items-center justify-between gap-2 border-b border-terminal-green/30 bg-terminal-green/10 px-4 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-full bg-red-500/80" aria-hidden="true" />
            <span className="h-3 w-3 shrink-0 rounded-full bg-yellow-500/80" aria-hidden="true" />
            <span className="h-3 w-3 shrink-0 rounded-full bg-terminal-green/80" aria-hidden="true" />
            <span className="ml-2 truncate font-mono text-sm text-muted-foreground">~/{DEMO_PROJECT}</span>
          </div>
          <div className="flex shrink-0 gap-1">
            {playing ? (
              <Button size="sm" variant="ghost" onClick={() => setFrame(last)} className="h-7 text-xs">
                <FastForward className="mr-1 h-3 w-3" aria-hidden="true" />
                Skip
              </Button>
            ) : (
              <Button size="sm" variant="ghost" onClick={start} className="h-7 text-xs">
                <RotateCcw className="mr-1 h-3 w-3" aria-hidden="true" />
                {frame === -1 ? "Run" : "Replay"}
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={copyCommands} aria-label="Copy commands" className="h-7 text-xs">
              {copied ? (
                <Check className="mr-1 h-3 w-3" aria-hidden="true" />
              ) : (
                <Copy className="mr-1 h-3 w-3" aria-hidden="true" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <div ref={bodyRef} className="h-[380px] overflow-y-auto p-4 font-mono text-xs leading-relaxed md:h-[440px] md:text-sm">
          {session.steps.map((step, index) => {
            if (!current || index > current.step) return null;
            const typing = index === current.step;
            const command = typing ? step.command.slice(0, current.chars) : step.command;
            const output = typing ? step.output.slice(0, current.lines) : step.output;
            const cursor = typing && playing && current.chars < step.command.length;
            return (
              <div key={step.command} className="mb-3">
                <div className="whitespace-pre-wrap break-words text-terminal-green">
                  <span className="select-none text-muted-foreground">$ </span>
                  {command}
                  {cursor && <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-terminal-green align-middle" />}
                </div>
                {output.map((line, lineIndex) => (
                  <div key={lineIndex} className={cn("whitespace-pre-wrap break-words", lineClass(line))}>
                    {line || " "}
                  </div>
                ))}
              </div>
            );
          })}
          {done && (
            <div className={cn("text-xs", session.exitCode === 0 ? "text-terminal-green" : "text-red-400")}>
              exit code {session.exitCode}
            </div>
          )}
        </div>
      </Card>

      {done && session.report && (
        <Card className="border-border bg-card/50 p-4">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <FileText className="h-4 w-4 text-terminal-cyan" aria-hidden="true" />
            <span className="break-all font-mono text-sm text-foreground">{session.report.file}</span>
            <span className="text-xs text-muted-foreground">excerpt of the saved report</span>
          </div>
          <ul className="space-y-2">
            {session.report.findings.map((finding) => (
              <li key={`${finding.category}-${finding.location}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                <span className={cn("rounded-full border px-2 py-0.5 text-xs font-semibold uppercase", SEVERITY_BADGE[finding.severity])}>
                  {finding.severity}
                </span>
                <span className="font-mono text-xs text-terminal-cyan">{finding.location}</span>
                <span className="text-foreground/90">{finding.message}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Full report: {session.report.counts.critical} critical, {session.report.counts.high} high,{" "}
            {session.report.counts.medium} medium and {session.report.counts.low} low findings, each with a file, line and fix suggestion.
          </p>
        </Card>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Real output from GuardScan {DEMO_VERSION} on a small sample Express API with planted vulnerabilities. Only the project path is
        shortened to ~/{DEMO_PROJECT}.
      </p>
    </div>
  );
};
