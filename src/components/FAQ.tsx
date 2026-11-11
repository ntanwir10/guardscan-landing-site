import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InlineCode } from "@/components/InlineCode";
import type { ReactNode } from "react";

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: "How does GuardScan guarantee privacy?",
    answer:
      "GuardScan performs all static analysis locally on your machine. GuardScan never uploads your source code, and scanning runs on your machine. GuardScan operates no hosted telemetry or credit service. Telemetry is opt-in and off by default: if you enable it, a strict allowlist of aggregate events is queued locally and is sent only when you run `guardscan telemetry sync` to a collector you operate. When using AI features, selected code context is sent directly to the AI provider you configure with your own key (OpenAI, Claude, etc.), not to GuardScan servers; with Ollama or LM Studio it stays on your machine. You maintain complete control over your code.",
  },
  {
    question: "Can I use GuardScan without an internet connection?",
    answer:
      "Yes! GuardScan's static analysis and secrets detection work offline. Features that need internet are cloud AI providers, update checks, and OSV dependency vulnerability lookups. For offline CVE scanning (opt-in with `--cve`), prepare a snapshot while online with `guardscan vuln db update`; AI features offline need a local model (Ollama or LM Studio). You can scan your codebase in air-gapped environments without limitations on static analysis.",
  },
  {
    question: "Which AI providers are supported?",
    answer:
      "GuardScan supports 6+ AI providers: OpenAI, Anthropic Claude, Google Gemini, Ollama (local AI), LM Studio (local model server), and OpenRouter (multi-model aggregator). Run `guardscan models list` to see the available models. You can switch between providers anytime without vendor lock-in. For complete privacy, use Ollama or LM Studio to run AI models locally.",
  },
  {
    question: "How much does GuardScan cost?",
    answer:
      "GuardScan is 100% free and open source. However, if you want to use AI-enhanced code review, you need to provide your API key to the AI provider. The cost of AI-enhanced review depends on the provider you use, and local providers (Ollama, LM Studio) are free. Set spending limits with `guardscan budget set` and inspect usage with `guardscan metrics show`.",
  },
  {
    question: "Is GuardScan suitable for enterprise use?",
    answer:
      "Absolutely! GuardScan is designed for enterprises with strict security policies. It works in air-gapped environments, never uploads source code, supports on-premise AI models (Ollama), and provides comprehensive OWASP Top 10 coverage, IaC scanning, and Dockerfile security. GuardScan is MIT-licensed open source; there are no paid tiers.",
  },
  {
    question: "What languages and frameworks are supported?",
    answer:
      "GuardScan has built-in code parsers for 8 languages: JavaScript/TypeScript, Python, Java, Go, Rust, Ruby, PHP, and C#. Line counting covers more languages. It analyzes frameworks like React, Vue, Angular, Django, Flask, Spring Boot, and Express. Infrastructure as Code (Terraform, Kubernetes) and container security (Dockerfile) are also fully supported.",
  },
  {
    question: "How accurate are the security findings?",
    answer:
      "GuardScan uses industry-standard security rules covering OWASP Top 10, CWE (Common Weakness Enumeration), and language-specific vulnerabilities. Our static analysis has low false-positive rates. The AI-enhanced review provides context-aware suggestions that reduce noise further. All findings include severity levels, affected files/lines, and actionable remediation steps.",
  },
  {
    question: "Can I customize the scanning rules?",
    answer: (
      <>
        Yes! GuardScan includes a custom YAML-based rule engine (
        <InlineCode value="guardscan rules" />) that lets you define
        project-specific security policies, code quality standards, and naming
        conventions. You can disable rules, adjust severity levels, and create
        custom checks tailored to your codebase.
      </>
    ),
  },
];

export const FAQ = () => {
  return (
    <section className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about GuardScan
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card/50 border-border/50 backdrop-blur-sm rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-lg font-semibold pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="https://github.com/ntanwir10/GuardScan/issues"
            className="text-primary hover:text-primary/80 font-semibold"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  );
};
