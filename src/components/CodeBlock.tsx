import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "bash", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group my-6">
      {title && (
        <div className="bg-muted px-4 py-2 rounded-t-lg border border-border/50 border-b-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-muted/80 hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
        <pre className={`bg-code-bg text-foreground rounded-lg ${title ? "rounded-t-none" : ""} p-4 overflow-x-auto border border-border/50`}>
          <code className={`language-${language} text-sm leading-relaxed`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
