import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InlineCodeProps {
  value: string;
  className?: string;
  ariaLabel?: string;
}

export function InlineCode({ value, className, ariaLabel }: InlineCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy inline code:", error);
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[0.85rem] font-mono text-foreground",
        className
      )}
    >
      <code>{value}</code>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-muted-foreground hover:text-foreground"
        onClick={handleCopy}
        aria-label={ariaLabel ?? `Copy \"${value}\"`}
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      </Button>
    </span>
  );
}
