import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

// Custom theme that removes grey background highlighting
const customTheme = {
  ...oneDark,
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
  },
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "transparent",
  },
  // Remove background from all token types
  ".token": {
    background: "transparent !important",
  },
  ".token.comment": {
    ...oneDark[".token.comment"],
    background: "transparent !important",
  },
  ".token.prolog": {
    ...oneDark[".token.prolog"],
    background: "transparent !important",
  },
  ".token.doctype": {
    ...oneDark[".token.doctype"],
    background: "transparent !important",
  },
  ".token.cdata": {
    ...oneDark[".token.cdata"],
    background: "transparent !important",
  },
  ".token.punctuation": {
    ...oneDark[".token.punctuation"],
    background: "transparent !important",
  },
  ".token.property": {
    ...oneDark[".token.property"],
    background: "transparent !important",
  },
  ".token.tag": {
    ...oneDark[".token.tag"],
    background: "transparent !important",
  },
  ".token.boolean": {
    ...oneDark[".token.boolean"],
    background: "transparent !important",
  },
  ".token.number": {
    ...oneDark[".token.number"],
    background: "transparent !important",
  },
  ".token.constant": {
    ...oneDark[".token.constant"],
    background: "transparent !important",
  },
  ".token.symbol": {
    ...oneDark[".token.symbol"],
    background: "transparent !important",
  },
  ".token.deleted": {
    ...oneDark[".token.deleted"],
    background: "transparent !important",
  },
  ".token.selector": {
    ...oneDark[".token.selector"],
    background: "transparent !important",
  },
  ".token.attr-name": {
    ...oneDark[".token.attr-name"],
    background: "transparent !important",
  },
  ".token.string": {
    ...oneDark[".token.string"],
    background: "transparent !important",
  },
  ".token.char": {
    ...oneDark[".token.char"],
    background: "transparent !important",
  },
  ".token.builtin": {
    ...oneDark[".token.builtin"],
    background: "transparent !important",
  },
  ".token.inserted": {
    ...oneDark[".token.inserted"],
    background: "transparent !important",
  },
  ".token.operator": {
    ...oneDark[".token.operator"],
    background: "transparent !important",
  },
  ".token.entity": {
    ...oneDark[".token.entity"],
    background: "transparent !important",
  },
  ".token.url": {
    ...oneDark[".token.url"],
    background: "transparent !important",
  },
  ".token.variable": {
    ...oneDark[".token.variable"],
    background: "transparent !important",
  },
  ".token.atrule": {
    ...oneDark[".token.atrule"],
    background: "transparent !important",
  },
  ".token.attr-value": {
    ...oneDark[".token.attr-value"],
    background: "transparent !important",
  },
  ".token.function": {
    ...oneDark[".token.function"],
    background: "transparent !important",
  },
  ".token.class-name": {
    ...oneDark[".token.class-name"],
    background: "transparent !important",
  },
  ".token.keyword": {
    ...oneDark[".token.keyword"],
    background: "transparent !important",
  },
  ".token.regex": {
    ...oneDark[".token.regex"],
    background: "transparent !important",
  },
  ".token.important": {
    ...oneDark[".token.important"],
    background: "transparent !important",
  },
  ".token.bold": {
    ...oneDark[".token.bold"],
    background: "transparent !important",
  },
  ".token.italic": {
    ...oneDark[".token.italic"],
    background: "transparent !important",
  },
};

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
        <div
          className={`rounded-lg ${
            title ? "rounded-t-none" : ""
          } overflow-hidden border border-border/50`}
        >
          <SyntaxHighlighter
            language={language}
            style={customTheme}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              background: "hsl(var(--code-bg))",
            }}
            showLineNumbers={false}
            wrapLines={true}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
