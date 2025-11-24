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
      "GuardScan performs all static analysis locally on your machine. Your source code never leaves your computer. Only anonymized metadata (like line count and scan statistics) is sent to our servers for credit validation. When using AI features, code snippets are sent directly to your chosen AI provider (OpenAI, Claude, etc.), not to GuardScan servers. You maintain complete control over your code.",
  },
  {
    question: "Can I use GuardScan without an internet connection?",
    answer:
      "Yes! GuardScan's core features (security scanning, code quality analysis, dependency checking, secrets detection) work completely offline. The only features that require internet are: credit validation for AI scans and the AI-powered code review itself. You can scan your codebase in air-gapped environments without any limitations on static analysis.",
  },
  {
    question: "Which AI providers are supported?",
    answer:
      "GuardScan supports 6+ AI providers: OpenAI (GPT-4, GPT-3.5-turbo), Anthropic (Claude 3 Opus/Sonnet/Haiku), Google (Gemini Pro), Ollama (local AI with llama2, codellama, mistral), LM Studio (local model server), and OpenRouter (multi-model aggregator). You can switch between providers anytime without vendor lock-in. For complete privacy, use Ollama or LM Studio to run AI models locally.",
  },
  {
    question: "How much does GuardScan cost?",
    answer:
      "GuardScan is 100% free and open source. However, if you want to use AI-enhanced code review, you need to provide your API key to the AI provider. The cost of AI-enhanced code review is depends on the AI provider you are using. For example: OpenAI GPT-4 = $0.03 per 1M tokens, Anthropic Claude = $0.0015 per 1M tokens, Google Gemini = $0.0015 per 1M tokens, Ollama = $0.0001 per 1M tokens, LM Studio = $0.0001 per 1M tokens, OpenRouter = $0.0001 per 1M tokens.",
  },
  {
    question: "Is GuardScan suitable for enterprise use?",
    answer:
      "Absolutely! GuardScan is designed for enterprises with strict security policies. It works in air-gapped environments, never uploads source code, supports on-premise AI models (Ollama), and provides comprehensive OWASP Top 10 coverage, IaC scanning, and Dockerfile security. We offer volume discounts for large teams. Contact us for enterprise licensing and dedicated support.",
  },
  {
    question: "What languages and frameworks are supported?",
    answer:
      "GuardScan supports 20+ programming languages including JavaScript, TypeScript, Python, Java, Go, Ruby, PHP, C#, Rust, and more. It analyzes frameworks like React, Vue, Angular, Django, Flask, Spring Boot, and Express. Infrastructure as Code (Terraform, Kubernetes) and container security (Dockerfile) are also fully supported.",
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
