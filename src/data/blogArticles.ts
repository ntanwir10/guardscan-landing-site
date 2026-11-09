export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
  codeExamples?: Array<{
    language: string;
    code: string;
    title?: string;
  }>;
  relatedArticles: string[];
  keywords: string[];
  author: {
    name: string;
    role: string;
  };
}

export const blogArticles: Record<string, BlogArticle> = {
  "privacy-first-code-review": {
    slug: "privacy-first-code-review",
    title: "Why Privacy-First Code Review Matters in 2026",
    description:
      "Explore how traditional code review tools compromise your intellectual property and why local-first analysis is the future of secure development.",
    category: "Privacy",
    date: "2025-01-15",
    readTime: "8 min read",
    image: "🔒",
    excerpt:
      "Every time you upload code to a third-party code review service, you're potentially exposing your company's intellectual property. Learn how GuardScan's privacy-first architecture protects your code while delivering enterprise-grade analysis.",
    keywords: [
      "privacy",
      "code review",
      "security",
      "intellectual property",
      "local-first",
    ],
    author: {
      name: "GuardScan Team",
      role: "Security Engineers",
    },
    content: `# Why Privacy-First Code Review Matters in 2025

In the modern software development landscape, code review tools have become essential. However, most popular solutions require uploading your codebase to third-party servers, creating significant privacy and security risks.

## The Problem with Traditional Code Review Tools

When you use cloud-based code review services, your code travels through multiple systems:
- Upload to vendor servers
- Processing on shared infrastructure
- Storage in vendor databases
- Potential exposure through data breaches

**The Risk**: Your intellectual property, trade secrets, and proprietary algorithms are exposed to external parties.

## Real-World Consequences

Several high-profile incidents highlight these risks:
- Source code leaks from compromised SaaS platforms
- Unauthorized access to proprietary algorithms
- Compliance violations in regulated industries
- Trade secret exposure to competitors

## The GuardScan Approach

GuardScan takes a fundamentally different approach:

### 100% Local Processing
All code analysis happens on your machine. Your code never leaves your infrastructure.

### Privacy by Design
- No code uploads
- No external API calls for analysis
- No data collection
- No telemetry

### Optional AI Integration
When you choose to use AI features, GuardScan gives you complete control:
- Choose your AI provider (OpenAI, Anthropic, Google, or local models)
- Use your own API keys
- Run completely offline with Ollama

## Benefits for Enterprise

Privacy-first code review offers tangible business advantages:

1. **Compliance**: Meet GDPR, HIPAA, and SOC 2 requirements
2. **IP Protection**: Keep trade secrets internal
3. **Zero Trust**: No reliance on third-party security
4. **Cost Control**: No per-seat licensing for code scanning

## Getting Started

GuardScan makes privacy-first code review simple:

\`\`\`bash
npm install -g guardscan
guardscan init
guardscan scan
\`\`\`

Your code stays on your machine. Your secrets stay secret.

## Conclusion

In 2025, privacy isn't optional—it's essential. Choose tools that respect your intellectual property and give you complete control over your codebase.

**Try GuardScan today and experience truly private code review.**`,
    codeExamples: [
      {
        language: "bash",
        title: "Install and Run GuardScan",
        code: `# Install GuardScan globally
npm install -g guardscan

# Initialize in your project
guardscan init

# Run a comprehensive scan
guardscan scan

# View results
cat guardscan-report.md`,
      },
    ],
    relatedArticles: [
      "secrets-detection-deep-dive",
      "ai-code-review-best-practices",
      "guardscan-quickstart",
    ],
  },

  "secrets-detection-deep-dive": {
    slug: "secrets-detection-deep-dive",
    title: "Secrets Detection: How to Find API Keys, Tokens & Passwords in Your Codebase",
    description: "Learn how secrets scanners find hardcoded API keys, tokens and credentials, and how to run and gate on those checks with guardscan security.",
    category: "Security",
    date: "2026-11-09",
    readTime: "8 min read",
    image: "🔑",
    excerpt: "Hardcoded secrets are one of the most common security problems. Learn how pattern and entropy-based detection works, and how to run built-in secrets checks with GuardScan locally and in CI.",
    keywords: ["secrets detection","API keys","security scanning","credential management","SAST"],
    author: {
      name: "GuardScan Team",
      role: "Security Engineers",
    },
    content: `# Secrets Detection: How to Find API Keys, Tokens & Passwords in Your Codebase

Hardcoded credentials are one of the most common ways a small mistake becomes a serious incident. A key committed once can live in git history, forks, CI logs and build artifacts long after the line is deleted. This guide explains how secrets detection works and how to run it with GuardScan.

## How secrets scanners find credentials

Most scanners combine a few techniques:

- **Pattern matching:** many providers issue keys with recognizable prefixes or shapes (for example private key headers, or tokens that start with a vendor prefix). Patterns catch these with few false positives.
- **Entropy analysis:** randomly generated strings have high entropy. A long, random-looking value assigned to a variable called \`secret\` or \`token\` is suspicious even when no pattern matches.
- **Context:** variable names, config keys and file types (\`.env\`, \`config.json\`, CI files) raise or lower confidence.
- **History scanning:** dedicated tools can also walk git history, which matters because deleting a secret from the working tree does not remove it from past commits.

No scanner finds everything, and all of them produce some false positives. Treat results as a triage list, not a verdict.

## Running secrets checks with GuardScan

GuardScan does not have a separate secrets subcommand. Secrets checks are built-in checks that run as part of the local security scan:

\`\`\`bash
npm install -g guardscan   # requires Node 22+

# Scan the current repository
guardscan security

# Scan specific files or patterns
guardscan security -f "src/**/*.ts" "config/*.json"

# Write a machine-readable report
guardscan security --format json -o guardscan-report.json
\`\`\`

The summary at the end of a run reports findings by severity, scan coverage and whether the configured policy passed. If you only need part of the repository checked, use \`-f\` to restrict the file set.

The heuristic checks run on your machine. Network-backed features (dependency vulnerability lookups, cloud AI) are optional, and \`--offline\` skips them for the run:

\`\`\`bash
guardscan security --offline
\`\`\`

## Failing builds on findings

In CI you usually want a non-zero exit code when findings meet a severity threshold:

\`\`\`bash
guardscan security --ci --fail-on high
\`\`\`

\`--fail-on\` accepts \`critical\`, \`high\`, \`medium\`, \`low\` or \`info\`. You can also cap the total count with \`--max-findings <number>\`.

## What a good fix looks like

Rotating the key is the fix. Removing it from the code is only the cleanup.

1. **Revoke and rotate** the credential at the provider first. Assume it is compromised.
2. **Move it out of source:** read it from an environment variable or a secrets manager.
3. **Prevent a repeat:** add \`.env\` to \`.gitignore\`, ship a \`.env.example\` with placeholder values, and scan in CI.
4. **Decide about history:** if the repository was ever public or widely shared, rotation matters more than rewriting history.

\`\`\`javascript
// Bad: credential in source
const apiKey = "sk_live_example_do_not_use";

// Better: injected at runtime
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error("API_KEY is not set");
\`\`\`

If you want help drafting a fix, \`guardscan security --ai-fix\` generates AI-assisted suggestions using your configured provider, and \`--interactive\` lets you review each one before applying it. Use \`--offline\` or a local provider if you do not want code sent to a cloud model.

## Handling false positives

Test fixtures, documentation examples and hashes all look like secrets to a scanner. Keep examples obviously fake, keep fixtures in clearly named directories, and review findings rather than blanket-suppressing a rule. Re-run the scan after changes and compare severities rather than raw counts.

## Pair it with other tools

Different scanners have different strengths. Many teams run GuardScan alongside a dedicated history scanner such as Gitleaks:

\`\`\`bash
gitleaks detect --source . 
\`\`\`

Running two tools costs little and reduces the chance that one blind spot becomes an incident.

## Checklist

- Run \`guardscan security\` before opening a pull request
- Run \`guardscan security --ci --fail-on high\` in CI
- Scan git history with a dedicated tool when you adopt scanning on an existing repository
- Rotate any credential that was ever committed
- Keep secrets in a manager or environment variables, never in source

## Conclusion

Secrets detection works best as a habit: scan locally, scan in CI, rotate quickly, and keep credentials out of the repository by design. GuardScan gives you the local scan and CI gate in one command.`,
    codeExamples: [
      {
        language: "bash",
        title: "Scan for secrets locally and in CI",
        code: "npm install -g guardscan\n\n# Local scan (secrets checks are built in)\nguardscan security\n\n# CI gate\nguardscan security --ci --fail-on high --format sarif -o guardscan.sarif",
      },
    ],
    relatedArticles: [
      "privacy-first-code-review",
      "guardscan-quickstart",
      "ci-cd-integration",
    ],
  },

  "ai-code-review-best-practices": {
    slug: "ai-code-review-best-practices",
    title: "AI-Powered Code Review: Best Practices for Maximum Security",
    description: "Get more from AI code review while protecting your source code: choose providers deliberately, review diffs, keep deterministic scans in the loop, and validate every finding.",
    category: "AI",
    date: "2026-11-09",
    readTime: "8 min read",
    image: "🤖",
    excerpt: "AI can improve code review, but only when it is configured with care. Learn how to choose between hosted models and local ones, limit what leaves your machine, and combine AI review with deterministic scanning.",
    keywords: ["AI code review","OpenAI","Claude","Gemini","Ollama","security"],
    author: {
      name: "GuardScan Team",
      role: "AI Engineers",
    },
    content: `# AI-Powered Code Review: Best Practices for Maximum Security

AI review can catch logic bugs, risky patterns and missing checks that rule-based scanners miss. It can also hallucinate, miss obvious issues, and, if configured carelessly, send your source code to a third party. This guide covers how to get the benefit while keeping control.

## Use AI as a second reviewer, not the only one

AI review complements deterministic checks. Run both:

1. **Deterministic scanning first.** \`guardscan security\` runs built-in heuristic checks (secrets, injection patterns, Dockerfile and IaC issues and more) and can include dependency vulnerability lookups.
2. **AI review second,** for context-heavy questions: is this authorization check actually enforced, does this change leak data, is this error path safe?
3. **A human last.** Treat every AI finding as a lead to verify, not a ruling.

## Pick a provider deliberately

GuardScan lets you choose where AI requests go:

\`\`\`bash
# See current configuration
guardscan config --show

# Choose a provider: openai, claude, gemini, ollama, lmstudio, openrouter, none
guardscan config -p claude -k <your-api-key>

# Local provider, no code leaves your machine
guardscan config -p ollama

# Turn AI off entirely
guardscan config -p none
\`\`\`

Models in the GuardScan registry include:

| Provider | Models |
|----------|--------|
| OpenAI | gpt-5.1, gpt-4o, gpt-4.1-mini |
| Google | gemini-3-pro, gemini-2.5-pro, gemini-2.5-flash |
| Anthropic | claude-sonnet-4.5 |
| Ollama (local) | codellama, llama2, mistral |

Run \`guardscan models list\` to see what your installed version supports. Larger hosted models generally reason better about complex code; local models trade some quality for privacy and zero per-request cost. Check your provider's current pricing yourself, since it changes.

## Decide what may leave your machine

Before enabling a cloud provider, answer three questions:

- Is the code covered by a contract, regulation or customer agreement that restricts third-party processing?
- Does the provider's data-retention and training policy match your requirements?
- Could the files contain secrets? Scan for secrets and rotate them before sending anything to a cloud model.

For sensitive repositories, use a local provider or block cloud use per run:

\`\`\`bash
guardscan run --offline
guardscan security --offline
\`\`\`

\`--offline\` blocks cloud providers and GuardScan network services for that command.

## Review changes, not whole repositories

AI review is most useful and cheapest on a diff:

\`\`\`bash
# Review uncommitted changes
guardscan review

# Compare two refs
guardscan review --base main --head HEAD

# One file, high severity and above, saved to a report
guardscan review -f src/auth/login.ts -s high -o review.md
\`\`\`

You can also filter by category with \`-c\`, for example \`security\` or \`bug\`. Smaller inputs give the model more focus and cost less.

## Control spend and visibility

If you use a paid provider, set limits and watch usage:

\`\`\`bash
guardscan budget status
guardscan metrics show
guardscan cache stats
\`\`\`

Responses are cached per repository, so repeating a review on unchanged code does not repeat the request. Use \`--no-cache\` when you need a fresh answer, and \`guardscan cache clear\` to remove cached source-derived data.

## Validate before you act

- Reproduce the issue or read the code path yourself.
- Ask for the fix as a small diff and review it like any other pull request.
- Re-run the deterministic scan after applying changes.
- Be wary of fixes that add dependencies or disable checks.

\`guardscan security --ai-fix\` generates suggestions, and \`--interactive\` lets you approve each one before it is applied.

## Put it in your workflow

- **Before commit:** \`guardscan security\` and \`guardscan review\`
- **In pull requests:** a CI job with \`guardscan security --ci --fail-on high\`, run offline when you do not want AI or network access in CI
- **Periodically:** a broader \`guardscan scan\` that runs security and quality checks in parallel

## Conclusion

AI review works best when it is one layer among several: deterministic scanning for coverage, AI for context, humans for judgment, and a provider choice that matches how sensitive your code is.`,
    codeExamples: [
      {
        language: "bash",
        title: "Local AI review setup",
        code: "# Install Ollama (see ollama.com), then pull a model\nollama pull codellama\n\n# Point GuardScan at the local provider\nguardscan config -p ollama\n\n# Review your changes\nguardscan review",
      },
    ],
    relatedArticles: [
      "privacy-first-code-review",
      "secrets-detection-deep-dive",
      "guardscan-quickstart",
    ],
  },

  "guardscan-quickstart": {
    slug: "guardscan-quickstart",
    title: "GuardScan QuickStart: Scan Your First Project in 5 Minutes",
    description: "A hands-on walkthrough: install GuardScan with npm, run your first security scan, check dependencies, save reports and add it to CI.",
    category: "Tutorial",
    date: "2026-11-09",
    readTime: "6 min read",
    image: "🚀",
    excerpt: "Go from install to a first scan, a SARIF report and a CI gate in a few minutes, using the commands GuardScan actually ships.",
    keywords: ["GuardScan","quickstart","security scanning","CLI tutorial","code security"],
    author: {
      name: "GuardScan Team",
      role: "Developer Relations",
    },
    content: `# GuardScan QuickStart: Scan Your First Project in 5 Minutes

This walkthrough takes you from installation to a first security scan and a CI-ready report.

## Requirements

- Node.js 22 or newer
- A git repository (any language) to scan
- Optional: an AI provider key, or a local Ollama install, for AI features

## Step 1: Install

\`\`\`bash
npm install -g guardscan
guardscan --version
\`\`\`

GuardScan is installed through npm. Source and issues live at https://github.com/ntanwir10/GuardScan.

## Step 2: Initialize

From the root of your project:

\`\`\`bash
cd your-project
guardscan init
\`\`\`

This sets up GuardScan's local configuration. Nothing is uploaded.

## Step 3: Run your first scan

\`\`\`bash
guardscan security
\`\`\`

\`guardscan security\` runs local heuristic security checks across your repository. The checks are built in and include secret detection, common code-injection patterns, and Dockerfile and infrastructure-as-code issues. They are not separate commands, so one run covers them all.

At the end of the run you get a summary by severity, a coverage line that tells you whether every scanner ran to completion, and a policy line that tells you whether the run passed. If a report file is written, its path is printed on a \`Report saved:\` line.

To scan only some files:

\`\`\`bash
guardscan security -f "src/**/*.ts"
\`\`\`

## Step 4: Check dependencies

Dependency vulnerability scanning looks up exact versions in OSV, so it needs network access:

\`\`\`bash
guardscan vuln
\`\`\`

\`guardscan vuln\` accepts a path and \`--ecosystem\` to limit scanning to npm, pip, go, ruby, cargo or maven. Add \`--scope runtime\` to ignore development dependencies. You can also include it in a security run with \`guardscan security --cve\`.

## Step 5: Go broader with scan

\`guardscan scan\` runs security and quality checks in parallel:

\`\`\`bash
guardscan scan

# Skip the slower parts
guardscan scan --skip-tests --skip-perf --skip-mutation --skip-ai
\`\`\`

Scan does not execute your repository's tests or linters unless you opt in with \`--run-project-code\`.

## Step 6: Save a report

\`\`\`bash
guardscan security --format markdown -o guardscan-report.md
guardscan security --format json -o guardscan-report.json
guardscan security --format sarif -o guardscan.sarif
\`\`\`

Supported formats are \`markdown\`, \`json\` and \`sarif\`. SARIF can be uploaded to GitHub code scanning.

## Step 7 (optional): Add AI

AI features are opt-in and use a provider you choose:

\`\`\`bash
# Hosted provider
guardscan config -p claude -k <your-api-key>

# Or a local provider
guardscan config -p ollama

# Review your changes
guardscan review
\`\`\`

Use \`-p none\` to turn AI off. Add \`--offline\` to any command to block cloud providers and network services for that run. See the Ollama guide for a fully local setup.

## Step 8: Add it to CI

\`\`\`yaml
name: Security
on: [push, pull_request]

jobs:
  guardscan:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install -g guardscan
      - run: guardscan security --ci --fail-on high --format sarif -o guardscan.sarif
      - uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: guardscan.sarif
\`\`\`

\`--ci\` enables CI-friendly output and exit codes, and \`--fail-on high\` fails the job on high or critical findings.

## Useful commands

\`\`\`bash
guardscan status         # provider and configuration
guardscan config --show  # current settings
guardscan sbom -f cyclonedx -o sbom.json
guardscan --help         # every command
\`\`\`

## Next steps

- Read the CI/CD integration guide to gate pull requests
- Set up a local model with Ollama for private AI review
- Run \`guardscan security --help\` and \`guardscan scan --help\` to see every flag`,
    codeExamples: [
      {
        language: "bash",
        title: "Install and scan",
        code: "# Install globally (Node 22+)\nnpm install -g guardscan\n\n# Initialize in your project\ncd your-project\nguardscan init\n\n# Run your first security scan\nguardscan security\n\n# Save a report\nguardscan security --format markdown -o guardscan-report.md",
      },
    ],
    relatedArticles: [
      "privacy-first-code-review",
      "secrets-detection-deep-dive",
      "ai-code-review-best-practices",
    ],
  },

  "ci-cd-integration": {
    slug: "ci-cd-integration",
    title: "Integrating GuardScan into Your CI/CD Pipeline",
    description:
      "Automate security scanning in your CI/CD workflow. Learn how to integrate GuardScan with GitHub Actions, GitLab CI, Jenkins, and more.",
    category: "DevOps",
    date: "2024-12-20",
    readTime: "9 min read",
    image: "⚙️",
    excerpt:
      "Security scanning should be automatic, not manual. Learn how to integrate GuardScan into your CI/CD pipeline to catch vulnerabilities before they reach production.",
    keywords: [
      "CI/CD",
      "GitHub Actions",
      "GitLab CI",
      "Jenkins",
      "automation",
      "DevOps",
    ],
    author: {
      name: "GuardScan Team",
      role: "DevOps Engineers",
    },
    content: `# Integrating GuardScan into Your CI/CD Pipeline

Automated security scanning catches vulnerabilities before they reach production. Here's how to integrate GuardScan into your CI/CD workflow.

## GitHub Actions

Create \`.github/workflows/security.yml\`:

\`\`\`yaml
name: Security Scan
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g guardscan
      - run: guardscan scan
      - uses: actions/upload-artifact@v3
        with:
          name: security-report
          path: guardscan-report.md
\`\`\`

## GitLab CI

Create \`.gitlab-ci.yml\`:

\`\`\`yaml
security_scan:
  image: node:20
  script:
    - npm install -g guardscan
    - guardscan scan
  artifacts:
    paths:
      - guardscan-report.md
\`\`\`

## Jenkins

\`\`\`groovy
pipeline {
  agent any
  stages {
    stage('Security Scan') {
      steps {
        sh 'npm install -g guardscan'
        sh 'guardscan scan'
        archiveArtifacts 'guardscan-report.md'
      }
    }
  }
}
\`\`\`

## Conclusion

Automated security scanning is essential for modern development. Integrate GuardScan into your pipeline today.`,
    codeExamples: [
      {
        language: "yaml",
        title: "GitHub Actions",
        code: `name: Security Scan
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g guardscan
      - run: guardscan scan`,
      },
    ],
    relatedArticles: [
      "guardscan-quickstart",
      "privacy-first-code-review",
      "secrets-detection-deep-dive",
    ],
  },

  "owasp-top-10-guide": {
    slug: "owasp-top-10-guide",
    title: "Complete Guide to the OWASP Top 10",
    description: "A practical walk through the recurring OWASP Top 10 risk categories, with code examples and the parts a static scanner like GuardScan can help catch.",
    category: "Security",
    date: "2026-11-09",
    readTime: "10 min read",
    image: "🛡️",
    excerpt: "SQL injection, broken access control and misconfiguration remain common. This guide walks through the OWASP Top 10 themes with code examples and shows which parts built-in GuardScan checks can help with.",
    keywords: ["OWASP","security vulnerabilities","SQL injection","XSS","authentication","OWASP Top 10"],
    author: {
      name: "GuardScan Security Team",
      role: "Security Researchers",
    },
    content: `# Complete Guide to the OWASP Top 10

The OWASP Top 10 is an awareness document that ranks the most critical web application security risks. It is revised every few years, so check owasp.org for the current edition. Category names and ordering change between editions, but the underlying problems are stable. This guide covers the recurring themes, with examples and ways to catch them early.

GuardScan does not have an OWASP mode or an OWASP-specific command. Its built-in checks (run by \`guardscan security\` and \`guardscan scan\`) overlap with several of these categories, and a static scanner can only find part of any list like this. Design review, testing and runtime controls still matter.

## Broken access control

Users act outside their intended permissions: reading other users' records, calling admin endpoints, changing an ID in a URL.

\`\`\`javascript
// Vulnerable: any logged-in user can read any invoice
app.get("/invoices/:id", auth, async (req, res) => {
  res.json(await db.invoices.findById(req.params.id));
});

// Better: scope the query to the caller
app.get("/invoices/:id", auth, async (req, res) => {
  const invoice = await db.invoices.findOne({
    id: req.params.id,
    ownerId: req.user.id,
  });
  if (!invoice) return res.sendStatus(404);
  res.json(invoice);
});
\`\`\`

Enforce authorization on the server for every request, deny by default, and test it. Scanners find missing middleware only in simple cases; use review and integration tests for the rest.

## Cryptographic failures

Sensitive data is stored or sent without adequate protection: weak hashes for passwords, hardcoded keys, plaintext transport.

- Hash passwords with a purpose-built algorithm such as Argon2, scrypt or bcrypt, never a fast hash
- Use TLS everywhere
- Keep keys out of source (see the secrets detection guide)

## Injection

Untrusted input is interpreted as code or commands: SQL, NoSQL, OS commands, template engines.

\`\`\`javascript
// Vulnerable
db.query("SELECT * FROM users WHERE name = '" + name + "'");

// Safe: parameterized
db.query("SELECT * FROM users WHERE name = ?", [name]);
\`\`\`

Use parameterized queries, avoid shelling out with user input, and validate input at trust boundaries. Pattern-based scanners are good at flagging string-built queries and risky sinks such as \`eval\` or \`exec\` calls.

## Insecure design

Flaws that no amount of correct coding fixes, such as missing rate limits on a login flow or business logic that trusts the client. Threat modeling helps. \`guardscan threat-model\` produces AI-assisted STRIDE analysis from your codebase; treat the result as a starting point for a human discussion.

## Security misconfiguration

Debug mode in production, default credentials, permissive CORS, public storage buckets, containers running as root. Built-in Dockerfile and infrastructure-as-code checks in \`guardscan security\` look for common misconfigurations. See the Dockerfile checklist for container specifics.

## Vulnerable and outdated components

Known-vulnerable dependencies are one of the easiest risks to find automatically:

\`\`\`bash
guardscan vuln
guardscan vuln --ecosystem npm --scope runtime --fail-on high
guardscan sbom -f cyclonedx -o sbom.json
\`\`\`

\`guardscan vuln\` checks exact dependency versions against OSV, and \`guardscan sbom\` produces an SPDX or CycloneDX inventory. Pair them with automated dependency updates.

## Identification and authentication failures

Weak password policies, missing multi-factor authentication, session identifiers in URLs, tokens that never expire. Use a vetted identity provider or library, rotate session identifiers on login, and set expirations. Scanners can flag hardcoded credentials and some weak patterns, but cannot judge your overall design.

## Software and data integrity failures

Unsigned updates, untrusted deserialization, CI pipelines that run unreviewed code. Pin dependencies with lockfiles, verify artifacts, avoid deserializing untrusted data, and restrict who can change pipeline definitions.

## Security logging and monitoring failures

Without logs and alerts you will not notice an attack. Log authentication events, access-control failures and input-validation failures, protect logs from tampering, and never log secrets or full payment data.

## Server-side request forgery

The server fetches a URL supplied by a user and can be pointed at internal services or cloud metadata endpoints. Validate and allowlist destinations, block private address ranges, and do not return raw responses to the caller.

## Running GuardScan against these risks

\`\`\`bash
# Local checks: secrets, injection patterns, Dockerfile and IaC issues
guardscan security

# Add dependency vulnerabilities
guardscan security --cve

# CI gate with a SARIF report
guardscan security --ci --fail-on high --format sarif -o guardscan.sarif
\`\`\`

## Conclusion

Use the Top 10 as a checklist for design reviews and tests, and use automated scanning to catch the portions of it that tools can see. Do not treat a clean scan as evidence that you are covered.`,
    codeExamples: [
      {
        language: "bash",
        title: "Run GuardScan's built-in checks",
        code: "# Built-in local checks\nguardscan security\n\n# Include dependency vulnerability scanning\nguardscan security --cve\n\n# CI gate with SARIF output\nguardscan security --ci --fail-on high --format sarif -o guardscan.sarif",
      },
    ],
    relatedArticles: [
      "secrets-detection-deep-dive",
      "ai-code-review-best-practices",
      "ci-cd-integration",
    ],
  },

  "dockerfile-security-checklist": {
    slug: "dockerfile-security-checklist",
    title: "Dockerfile Security: 15 Essential Checks Every Developer Should Run",
    description: "A practical checklist for securing Docker images, from base image choice and non-root users to secrets handling, image scanning and CI checks.",
    category: "DevOps",
    date: "2026-11-09",
    readTime: "7 min read",
    image: "🐳",
    excerpt: "Insecure Dockerfiles are a common weak point. This checklist covers base images, multi-stage builds, secret handling, USER instructions and image scanning, and shows where GuardScan's built-in checks fit.",
    keywords: ["Docker","container security","Dockerfile","DevOps","container best practices"],
    author: {
      name: "GuardScan DevOps Team",
      role: "Container Security Specialists",
    },
    content: `# Dockerfile Security: 15 Essential Checks Every Developer Should Run

A Dockerfile decides what ships in your image: which packages, which user, which secrets. Most container incidents trace back to a handful of avoidable mistakes. Use this checklist when you write or review a Dockerfile.

GuardScan's built-in checks, run as part of \`guardscan security\` and \`guardscan scan\`, look at Dockerfiles alongside your source. There is no separate Docker subcommand, and no scanner replaces a review, so the sections below also name dedicated tools.

## 1. Use a trusted, minimal base image

Prefer official or verified images, and prefer small ones (slim, distroless or Alpine variants) to shrink the attack surface.

\`\`\`dockerfile
FROM node:22-slim
\`\`\`

## 2. Pin versions, and consider digests

\`latest\` changes without notice and makes builds unreproducible. Pin a version tag. For stricter control, pin the image digest.

\`\`\`dockerfile
FROM node:22.12-slim
# or: FROM node@sha256:<digest>
\`\`\`

## 3. Do not run as root

By default containers run as root. Create an unprivileged user and switch to it.

\`\`\`dockerfile
RUN groupadd -r app && useradd -r -g app app
USER app
\`\`\`

## 4. Use multi-stage builds

Compilers, build tools and dev dependencies do not belong in the final image.

\`\`\`dockerfile
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
USER node
CMD ["node", "dist/index.js"]
\`\`\`

## 5. Never bake secrets into the image

Anything in \`ENV\`, \`ARG\`, \`COPY\` or a \`RUN\` command is stored in image layers and can be extracted. Pass runtime secrets through your orchestrator's secret mechanism. For build-time secrets, use BuildKit secret mounts:

\`\`\`dockerfile
RUN --mount=type=secret,id=npm_token \\
    NPM_TOKEN=$(cat /run/secrets/npm_token) npm ci
\`\`\`

\`guardscan security\` includes secrets checks that can flag credentials in Dockerfiles and build context files.

## 6. Use a .dockerignore

Keep \`.git\`, \`.env\`, local keys and build output out of the build context.

\`\`\`text
.git
.env
*.pem
node_modules
\`\`\`

## 7. Install only what you need

Skip recommended packages and clean package caches in the same layer.

\`\`\`dockerfile
RUN apt-get update \\
 && apt-get install -y --no-install-recommends ca-certificates \\
 && apt-get clean
\`\`\`

## 8. Prefer COPY to ADD

\`ADD\` can fetch remote URLs and auto-extract archives. Use \`COPY\` unless you need those behaviors.

## 9. Verify downloads

If you must download a binary, verify a checksum or signature. Piping a script from the internet straight into a shell trusts that server on every build.

## 10. Do not use privileged capabilities

At run time avoid \`--privileged\`, avoid mounting the Docker socket, and drop capabilities you do not need.

\`\`\`bash
docker run --cap-drop=ALL --read-only --security-opt no-new-privileges my-image
\`\`\`

## 11. Make the filesystem read-only where possible

Run with a read-only root filesystem and mount writable volumes only where the app needs them.

## 12. Add a health check

A \`HEALTHCHECK\` lets orchestrators detect a hung process. Use a tool that exists in the image.

## 13. Do not expose unnecessary ports

\`EXPOSE\` documents intent, but only publish ports you actually need.

## 14. Scan images for known vulnerabilities

Base images and OS packages accumulate CVEs. Scan built images in CI with a dedicated image scanner such as Trivy:

\`\`\`bash
trivy image my-image:latest
\`\`\`

## 15. Rebuild regularly and lint the Dockerfile

Rebuild images on a schedule so base-image fixes reach you, and lint the Dockerfile itself:

\`\`\`bash
hadolint Dockerfile
trivy config .
\`\`\`

## Running GuardScan on a project that ships Dockerfiles

\`\`\`bash
# Built-in checks across code, secrets, Dockerfiles and IaC
guardscan security

# Save a report
guardscan security --format markdown -o security-report.md

# Gate CI
guardscan security --ci --fail-on high
\`\`\`

## Quick reference

| Area | What to check |
|------|---------------|
| Base image | Trusted, minimal, pinned |
| User | Non-root |
| Secrets | None in layers or build args |
| Build | Multi-stage, with a .dockerignore |
| Run time | Dropped capabilities, read-only filesystem |
| Supply chain | Image scanning and scheduled rebuilds |

## Conclusion

Most of this list takes minutes to apply and removes the most common container weaknesses. Automate what tools can check, review the rest, and keep images rebuilt.`,
    codeExamples: [
      {
        language: "dockerfile",
        title: "A hardened Node.js Dockerfile",
        code: "FROM node:22 AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-slim\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nUSER node\nCMD [\"node\", \"dist/index.js\"]",
      },
      {
        language: "bash",
        title: "Check a project with Dockerfiles",
        code: "# GuardScan built-in checks (code, secrets, Dockerfiles, IaC)\nguardscan security\n\n# Dedicated Dockerfile and image tools\nhadolint Dockerfile\ntrivy image my-image:latest",
      },
    ],
    relatedArticles: [
      "ci-cd-integration",
      "owasp-top-10-guide",
      "guardscan-quickstart",
    ],
  },

  "local-ai-ollama-setup": {
    slug: "local-ai-ollama-setup",
    title: "Running AI Code Review Locally with Ollama",
    description: "Configure GuardScan to use local models through Ollama so AI-assisted code review stays on your own machine.",
    category: "Privacy",
    date: "2026-11-09",
    readTime: "8 min read",
    image: "🏠",
    excerpt: "Take control of where your code goes. Learn how to install Ollama, pull models like CodeLlama and Mistral, and use them as GuardScan's AI provider for private, local code review.",
    keywords: ["Ollama","local AI","privacy","offline code review","CodeLlama","self-hosted AI"],
    author: {
      name: "GuardScan AI Team",
      role: "AI Infrastructure Engineers",
    },
    content: `# Running AI Code Review Locally with Ollama

Cloud models are convenient, but some code cannot be sent to a third party. Ollama runs open models on your own machine, and GuardScan can use it as its AI provider so reviews stay local. This guide covers setup end to end.

## What stays local

With the \`ollama\` provider, AI requests go to the Ollama server on your machine instead of a hosted API. GuardScan's built-in security checks already run locally. Together, that gives you AI-assisted review without sending source code to a cloud model.

Two notes on scope:

- "Local" depends on your Ollama setup. If you point Ollama at a remote host, requests go there.
- Some GuardScan features use the network by design, such as dependency vulnerability lookups (\`--cve\`). \`--offline\` skips network-backed checks for a run.

## Requirements

- Node.js 22+ for GuardScan
- Ollama installed
- Enough RAM or GPU memory for the model you choose. Smaller models run on a laptop; larger ones need more memory and are slower on CPU.

## Step 1: Install Ollama

\`\`\`bash
# macOS (Homebrew)
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

On Windows and macOS you can also download the installer from https://ollama.com.

## Step 2: Start the server and pull a model

\`\`\`bash
ollama serve
\`\`\`

In another terminal:

\`\`\`bash
# Models GuardScan's registry lists for Ollama
ollama pull codellama
ollama pull mistral
ollama pull llama2

# Confirm what is installed
ollama list
\`\`\`

\`codellama\` is trained for code and is a good starting point for review. \`mistral\` is a smaller general model that is quicker on modest hardware. Try both on your own code, because quality varies by language and task.

## Step 3: Point GuardScan at Ollama

\`\`\`bash
npm install -g guardscan
guardscan init
guardscan config -p ollama
guardscan config --show
guardscan status
\`\`\`

\`guardscan models list\` shows the models GuardScan knows about, and \`guardscan models recommend\` suggests one for your provider.

## Step 4: Run reviews

\`\`\`bash
# Local review of the repository, AI-enhanced by Ollama
guardscan run

# Review git changes with AI
guardscan review

# Security scan with AI fix suggestions
guardscan security --ai-fix
\`\`\`

To guarantee that no cloud provider is used for a run, add \`--offline\`. This blocks cloud providers, so combine it with a local provider such as Ollama or with \`-p none\`.

## Using an offline machine

For an air-gapped or restricted machine:

1. On a connected machine, install GuardScan and pull the Ollama models.
2. Copy the installers and model files over using your normal transfer process.
3. Run GuardScan with \`--offline\`.

Features that need the network, such as fresh vulnerability data, will be skipped or use a previously saved local snapshot (see \`guardscan vuln --help\` and \`guardscan vuln db\`).

## Tips for better results

- Review small diffs. Local models have limited context, so \`guardscan review --base main\` on a focused change beats a whole-repository prompt.
- Use the model for explanations and suggestions, and the deterministic scan for coverage.
- Keep Ollama and your models updated, and re-test when you change models.
- Verify every finding. Smaller models are more likely to miss issues or invent them.

## Troubleshooting

**GuardScan cannot reach Ollama.** Make sure \`ollama serve\` is running (the desktop app starts it for you) and check \`guardscan status\`.

**Model not found.** Run \`ollama list\` and pull the model with \`ollama pull <name>\`.

**Slow responses.** Use a smaller model, review fewer files per run, or run Ollama on a machine with a GPU.

**Out of memory.** Pick a smaller model or close other applications.

## Conclusion

Ollama gives you AI-assisted review with no per-request fees and no hosted API in the loop. Pair it with GuardScan's built-in checks, keep diffs small, and verify what the model tells you.`,
    codeExamples: [
      {
        language: "bash",
        title: "Set up Ollama with GuardScan",
        code: "# Install Ollama (Linux; macOS: brew install ollama)\ncurl -fsSL https://ollama.com/install.sh | sh\n\n# Pull a model\nollama pull codellama\n\n# Configure GuardScan\nnpm install -g guardscan\nguardscan config -p ollama\n\n# Review your changes\nguardscan review",
      },
      {
        language: "bash",
        title: "Run reviews without cloud access",
        code: "# Start Ollama\nollama serve &\n\n# Local review (blocks cloud providers)\nguardscan run --offline\n\n# Security scan, saved as a report\nguardscan security --offline --format markdown -o security-report.md",
      },
    ],
    relatedArticles: [
      "privacy-first-code-review",
      "ai-code-review-best-practices",
      "guardscan-quickstart",
    ],
  },

  "best-sast-tools-2025": {
    slug: "best-sast-tools-2025",
    title: "Best SAST Tools in 2026: Complete Comparison",
    description:
      "Compare the best static application security testing (SAST) tools in 2025. In-depth analysis of SonarQube, Snyk, Checkmarx, Veracode, and GuardScan.",
    category: "Security",
    date: "2025-01-20",
    readTime: "15 min read",
    image: "🔍",
    excerpt:
      "Choosing the right SAST tool can make or break your security posture. This comprehensive guide compares the top SAST tools in 2025 by features, pricing, privacy, and effectiveness.",
    keywords: [
      "SAST tools",
      "static analysis",
      "security testing",
      "code security",
      "sonarqube",
      "snyk",
      "checkmarx",
      "veracode",
      "guardscan",
    ],
    author: {
      name: "GuardScan Security Team",
      role: "Security Researchers",
    },
    content: `# Best SAST Tools in 2026: Complete Comparison

Static Application Security Testing (SAST) tools are essential for catching security vulnerabilities before code reaches production. But with so many options available, which tool is right for your team?

## What is SAST?

SAST (Static Application Security Testing) analyzes source code, bytecode, or binaries to identify security vulnerabilities without executing the program. Unlike DAST (Dynamic Testing), SAST can find issues early in the development lifecycle.

## Top SAST Tools Compared

### 1. GuardScan - Privacy-First SAST

**Best For:** Teams prioritizing privacy and cost savings

**Pricing:** Free and open-source

**Key Features:**
- Runs 100% locally (no code uploads)
- Works offline
- Multi-AI provider support
- Secrets detection
- OWASP Top 10 coverage

**Pros:**
- Zero cost
- Complete privacy
- No server setup
- AI-powered analysis

**Cons:**
- No cloud dashboard
- Newer tool (less mature)

### 2. SonarQube - Enterprise Code Quality

**Best For:** Large enterprises with dedicated infrastructure

**Pricing:** $150/month (Team) to $30K+/year (Enterprise)

**Key Features:**
- Comprehensive code quality metrics
- Quality gates
- Multi-language support
- Historical trending

**Pros:**
- Mature ecosystem
- Extensive language support
- Quality gates

**Cons:**
- Expensive
- Server setup required
- Code uploaded to server

### 3. Snyk - Cloud-Native Security

**Best For:** Cloud-first development teams

**Pricing:** $98-$500/user/year

**Key Features:**
- Dependency scanning
- Container security
- IaC scanning
- Auto-fix PRs

**Pros:**
- Easy integration
- Auto-fix features
- Good vulnerability database

**Cons:**
- Expensive per-user pricing
- Limited offline support
- Code uploaded to cloud

## Conclusion

Choose based on your priorities:
- **Privacy + Cost:** GuardScan
- **Enterprise features:** SonarQube
- **Cloud-native:** Snyk`,
    codeExamples: [],
    relatedArticles: [
      "privacy-first-code-review",
      "owasp-top-10-guide",
      "guardscan-quickstart",
    ],
  },

  "sonarqube-vs-snyk-vs-guardscan": {
    slug: "sonarqube-vs-snyk-vs-guardscan",
    title: "SonarQube vs Snyk vs GuardScan: Which Is Right for You?",
    description:
      "Detailed comparison of SonarQube, Snyk, and GuardScan for code security and quality. Compare features, pricing, privacy, and use cases.",
    category: "Comparison",
    date: "2025-01-18",
    readTime: "12 min read",
    image: "⚔️",
    excerpt:
      "Struggling to choose between SonarQube, Snyk, and GuardScan? This detailed comparison covers features, pricing, privacy implications, and real-world use cases to help you decide.",
    keywords: [
      "sonarqube vs snyk",
      "code security comparison",
      "SAST comparison",
      "guardscan vs sonarqube",
      "guardscan vs snyk",
    ],
    author: {
      name: "GuardScan Team",
      role: "DevSecOps Engineers",
    },
    content: `# SonarQube vs Snyk vs GuardScan: Which Is Right for You?

Choosing a code security tool is a critical decision. Let's compare three popular options across key dimensions.

## Quick Comparison

| Feature | GuardScan | SonarQube | Snyk |
|---------|-----------|-----------|------|
| **Pricing** | Free | $150-$30K+/year | $98-$500/user/year |
| **Privacy** | 100% Local | Server-based | Cloud-based |
| **Offline** | Yes | Partial | No |
| **Setup Time** | 2 minutes | Hours to days | Minutes |

## Detailed Analysis

### GuardScan: Privacy-First Approach

**When to choose:**
- Need complete privacy
- Want zero costs
- Require offline capability
- Work with sensitive code

**Trade-offs:**
- No cloud dashboard
- Newer ecosystem

### SonarQube: Enterprise Standard

**When to choose:**
- Need quality gates
- Have infrastructure budget
- Want mature ecosystem
- Need extensive language support

**Trade-offs:**
- Expensive
- Complex setup
- Server required

### Snyk: Cloud-Native Winner

**When to choose:**
- Cloud-first development
- Need auto-fix features
- Want easy integration
- Have budget for commercial tools

**Trade-offs:**
- Expensive per-user
- No offline mode
- Privacy concerns

## Conclusion

All three tools are excellent - your choice depends on priorities around privacy, cost, and features.`,
    codeExamples: [],
    relatedArticles: [
      "best-sast-tools-2025",
      "privacy-first-code-review",
      "guardscan-quickstart",
    ],
  },

  "offline-code-security-scanning": {
    slug: "offline-code-security-scanning",
    title: "Offline Code Security Scanning: Complete Guide",
    description:
      "Learn how to perform comprehensive security scanning without internet connectivity. Essential for air-gapped environments and privacy-conscious teams.",
    category: "Security",
    date: "2025-01-16",
    readTime: "10 min read",
    image: "✈️",
    excerpt:
      "Working in an air-gapped environment or need complete privacy? Learn how to perform comprehensive code security scanning entirely offline with GuardScan.",
    keywords: [
      "offline security scanning",
      "air-gapped security",
      "offline code analysis",
      "privacy security scanning",
      "local security testing",
    ],
    author: {
      name: "GuardScan Team",
      role: "Security Engineers",
    },
    content: `# Offline Code Security Scanning: Complete Guide

Many organizations require code security scanning in air-gapped environments or without internet connectivity. Here's how to achieve comprehensive offline security analysis.

## Why Offline Scanning Matters

**Use Cases:**
- Air-gapped military/government systems
- Financial institutions with strict data policies
- Healthcare systems (HIPAA compliance)
- Industrial control systems (ICS/SCADA)
- Travel and remote work

## Offline Scanning with GuardScan

GuardScan provides full security scanning capabilities offline:

### Security Features (Offline)
- Secrets detection
- OWASP Top 10 scanning
- Code quality analysis
- Dependency vulnerability scanning
- Docker security scanning

### AI Features (Offline)
Use Ollama for AI-powered code review without internet:

\`\`\`bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Download model
ollama pull codellama:13b

# Use Ollama as the provider and review your changes
guardscan config -p ollama
guardscan review
\`\`\`

## Best Practices

1. **Regular Updates:** Update vulnerability databases when online
2. **Local Models:** Use Ollama for AI features
3. **Documentation:** Keep offline copies of security standards
4. **Validation:** Verify offline capabilities before deployment

## Conclusion

Offline security scanning is not only possible but can be more secure than cloud-based alternatives.`,
    codeExamples: [],
    relatedArticles: [
      "local-ai-ollama-setup",
      "privacy-first-code-review",
      "guardscan-quickstart",
    ],
  },

  "prevent-api-key-leaks": {
    slug: "prevent-api-key-leaks",
    title: "How to Prevent API Key Leaks in Your Codebase",
    description:
      "Complete guide to preventing API key leaks with detection, prevention strategies, and best practices for credential management.",
    category: "Security",
    date: "2025-01-22",
    readTime: "11 min read",
    image: "🔐",
    excerpt:
      "API key leaks are responsible for millions in damages annually. Learn proven strategies to detect, prevent, and respond to credential leaks before they become security breaches.",
    keywords: [
      "prevent api key leaks",
      "api key security",
      "credential management",
      "secrets management",
      "api security best practices",
    ],
    author: {
      name: "GuardScan Security Team",
      role: "Security Researchers",
    },
    content: `# How to Prevent API Key Leaks in Your Codebase

API key leaks are one of the most common and costly security mistakes. A single exposed key can lead to unauthorized access, data breaches, and massive cloud bills. This comprehensive guide shows you how to detect, prevent, and respond to credential leaks.

## The Problem: Why API Keys Leak

### Common Leak Vectors

**1. Hardcoded in Source Code**
Developers hardcode API keys directly in code files for convenience during development, then accidentally commit them.

**2. Accidentally Committed to Git**
Even if removed later, Git history preserves the exposed key forever. Public repositories are scanned by bots within minutes of exposure.

**3. Exposed in Client-Side Code**
JavaScript bundled for browsers can be inspected by anyone. API keys in frontend code are publicly accessible.

**4. Configuration Files**
\`.env\` files, \`config.yml\`, and \`secrets.json\` files committed to version control.

**5. Application Logs**
API keys logged during debugging or error handling can be exposed in log aggregation services.

**6. Shared via Communication Channels**
Keys shared in Slack, email, or documentation tools without proper security.

### Real-World Impact

**Financial Damage:**
- $50,000+ in fraudulent AWS charges from exposed keys
- Cryptocurrency theft from exposed wallet keys
- Unauthorized API usage exceeding rate limits

**Security Breaches:**
- Data breaches exposing customer information
- Unauthorized access to internal systems
- Account takeovers and identity theft

**Reputation Damage:**
- Customer trust erosion
- Regulatory fines (GDPR, SOC2)
- Public security incidents

## Detection: Finding Existing Leaks

### Automated Detection with GuardScan

GuardScan provides comprehensive secrets detection for 20+ credential types:

\`\`\`bash
# Install GuardScan
npm install -g guardscan

# Scan the repository (secrets checks are built in)
guardscan security

# Scan specific files or directories
guardscan security -f "src/**"

# Export results
guardscan security --format json > secrets-report.json
\`\`\`

### What GuardScan Detects

**Cloud Provider Keys:**
- AWS Access Keys (AKIA...)
- Azure Storage Keys
- Google Cloud API Keys
- DigitalOcean Tokens

**Service Credentials:**
- GitHub Personal Access Tokens
- GitLab Access Tokens
- Stripe API Keys (Live & Test)
- Slack Webhooks & Tokens
- Twilio API Keys

**Database & Infrastructure:**
- MongoDB Connection Strings
- PostgreSQL Passwords
- Redis URLs
- Database connection strings

**Encryption & Authentication:**
- RSA Private Keys
- SSH Private Keys
- JWT Secrets
- OAuth Tokens

**Generic Patterns:**
- High entropy strings (potential secrets)
- API key patterns
- Bearer tokens
- Basic auth credentials

### Manual Detection Methods

**1. Search Git History**
\`\`\`bash
# Search for common patterns
git log -p | grep -i "api.key"
git log -p | grep -i "password"
git log -p | grep -i "secret"

# Search for specific patterns
git log -p | grep -E "AKIA[0-9A-Z]{16}"  # AWS keys
\`\`\`

**2. Check Environment Files**
\`\`\`bash
# Find all env files
find . -name "*.env*" -not -path "*/node_modules/*"

# Check if any are tracked by git
git ls-files | grep ".env"
\`\`\`

**3. Scan Configuration Files**
\`\`\`bash
# Search config files for keywords
grep -r "api_key" config/
grep -r "password" *.yml
grep -r "secret" *.json
\`\`\`

## Prevention: Stop Leaks Before They Happen

### 1. Use Environment Variables

**Best Practice:**
\`\`\`javascript
// ✅ GOOD: Load from environment
const apiKey = process.env.API_KEY;
const dbPassword = process.env.DATABASE_PASSWORD;

if (!apiKey) {
  throw new Error('API_KEY environment variable is required');
}
\`\`\`

**Anti-Pattern:**
\`\`\`javascript
// ❌ BAD: Never hardcode
const apiKey = "sk_live_1234567890abcdef";
const dbPassword = "MyPassword123!";
\`\`\`

**Setup .env File:**
\`\`\`bash
# .env (local development only, never commit)
API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:pass@localhost/db
STRIPE_SECRET_KEY=sk_test_abc123
\`\`\`

**Load in Your App:**
\`\`\`javascript
// Node.js with dotenv
require('dotenv').config();

// Or ES modules
import 'dotenv/config';
\`\`\`

### 2. Implement Proper .gitignore

**Essential .gitignore Entries:**
\`\`\`gitignore
# Environment files
.env
.env.local
.env.*.local
.env.development
.env.production

# Configuration files with secrets
config/secrets.yml
config/database.yml
config/credentials.json

# IDE-specific files
.vscode/settings.json
.idea/workspace.xml

# API key files
**/secrets/
**/*secret*
**/*credential*
**/api-keys.json

# Cloud provider config
.aws/credentials
.gcp/credentials.json
.azure/credentials

# SSH keys
*.pem
*.key
id_rsa*
\`\`\`

**Always Include .env.example:**
\`\`\`bash
# .env.example (safe to commit)
API_KEY=your_api_key_here
DATABASE_URL=postgresql://username:password@localhost/dbname
STRIPE_SECRET_KEY=sk_test_your_key_here
\`\`\`

### 3. Use Secret Management Services

**For Production Environments:**

**AWS Secrets Manager:**
- Automatic key rotation
- Audit logging
- IAM integration
- Pricing: ~$0.40/secret/month

**HashiCorp Vault:**
- Enterprise-grade secrets management
- Dynamic secrets
- Encryption as a service
- Open source & enterprise versions

**Azure Key Vault:**
- Native Azure integration
- Hardware security modules (HSM)
- Certificate management

**Google Secret Manager:**
- GCP integration
- Automatic versioning
- IAM permissions

**Doppler (Developer-Friendly):**
- Easy setup
- Team synchronization
- CI/CD integration
- Free tier available

### 4. Set Up Pre-Commit Hooks

**Automatic Detection Before Commit:**

\`\`\`bash
# Install GuardScan globally
npm install -g guardscan

# Set up a pre-commit hook: add "guardscan security --ci --fail-on high"
# to .git/hooks/pre-commit (or your hook manager)

# Now every commit is automatically scanned
git add .
git commit -m "Add feature"
# → GuardScan runs automatically
# → Blocks commit if secrets detected
\`\`\`

**Manual Hook Setup (.git/hooks/pre-commit):**
\`\`\`bash
#!/bin/bash

echo "Running security scan..."
guardscan security --fail-on high

if [ $? -ne 0 ]; then
  echo "❌ Security scan found secrets. Commit blocked!"
  echo "Remove secrets or use --no-verify to bypass (not recommended)"
  exit 1
fi

echo "✅ Security scan passed"
\`\`\`

### 5. Implement API Key Restrictions

**For Every API Key, Configure:**

**1. IP Restrictions:**
- Whitelist specific IP addresses
- Use CIDR blocks for ranges
- Update when infrastructure changes

**2. API Scope Limitations:**
- Only grant necessary permissions
- Use read-only keys when possible
- Separate keys per service

**3. Usage Quotas:**
- Set daily/hourly limits
- Monitor usage patterns
- Alert on anomalies

**4. Key Expiration:**
- Rotate keys every 90 days
- Auto-expire test keys after 30 days
- Track key age

**5. Environment Separation:**
- Different keys for dev/staging/production
- Never use production keys in development
- Color-code environments

**Example: Stripe Key Restrictions:**
\`\`\`javascript
// Restrict to specific domain
stripe.setApiKey(process.env.STRIPE_KEY, {
  host: 'api.stripe.com',
  protocol: 'https'
});
\`\`\`

### 6. Client-Side Key Protection

**For Frontend Applications:**

\`\`\`javascript
// ✅ GOOD: Use public/restricted keys only
const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
// Restricted to: specific domains, limited APIs

// ❌ BAD: Never expose secret keys
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY; // Server-only!
\`\`\`

**Key Restrictions for Client-Side:**
- Use public/publishable keys only
- Restrict by HTTP referrer
- Limit API access scope
- Monitor usage closely

## Response: When Leaks Happen

### Immediate Actions (Within 1 Hour)

**1. Rotate the Key Immediately**
Don't wait to investigate - assume compromise and rotate first.

\`\`\`bash
# Example: AWS key rotation
aws iam create-access-key --user-name YourUser
# Update applications with new key
aws iam delete-access-key --user-name YourUser --access-key-id OLD_KEY
\`\`\`

**2. Revoke Compromised Credentials**
Disable access immediately to prevent further damage.

**3. Check Usage Logs**
Look for unauthorized activity:
- API call logs
- Billing anomalies
- Resource creation
- Data access patterns

### Investigation Steps

**1. Determine Exposure Scope**
- Where was it leaked? (GitHub, logs, client-side)
- How long was it exposed?
- Who had access?
- Was it indexed by search engines?

**2. Analyze Impact**
\`\`\`bash
# AWS CloudTrail example
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=AKIA... \
  --start-time 2025-01-01
\`\`\`

**3. Document the Incident**
- Timeline of exposure
- Actions taken
- Services affected
- Cost impact
- Root cause

### Long-Term Fixes

**1. Update Security Procedures**
- Why did the leak happen?
- What controls failed?
- How can we prevent recurrence?

**2. Implement Monitoring**
\`\`\`yaml
# GitHub Action for continuous scanning
name: Secret Scan
on: [push, schedule]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Full history
      - run: guardscan security --fail-on high
\`\`\`

**3. Team Training**
- Security awareness training
- Incident response procedures
- Best practices documentation
- Regular security reviews

## Best Practices Checklist

### Development Phase
- [ ] Never hardcode secrets in code
- [ ] Use environment variables exclusively
- [ ] Keep .env files out of Git
- [ ] Maintain .env.example for documentation
- [ ] Review PRs specifically for secrets
- [ ] Use GuardScan pre-commit hooks

### Operations Phase
- [ ] Use secret management service
- [ ] Rotate keys every 90 days minimum
- [ ] Separate keys per environment
- [ ] Enable key usage restrictions
- [ ] Monitor key usage patterns
- [ ] Document key ownership

### Security Phase
- [ ] Run secrets scanning in CI/CD
- [ ] Set up pre-commit hooks
- [ ] Regular security audits (monthly)
- [ ] Incident response plan documented
- [ ] Team security training (quarterly)
- [ ] Automated monitoring and alerts

### Compliance Phase
- [ ] Document key management procedures
- [ ] Audit trail for key access
- [ ] Encryption at rest and in transit
- [ ] Regular compliance reviews
- [ ] Third-party security assessments

## Recommended Tools Stack

**Free & Open Source:**
- **GuardScan** - Local secrets detection
- **git-secrets** - AWS secrets prevention
- **TruffleHog** - Historical Git scanning
- **detect-secrets** - Yelp's detector

**Commercial (Paid):**
- **GitGuardian** - Real-time scanning ($)
- **1Password Secrets Automation** ($$)
- **AWS Secrets Manager** ($0.40/secret/month)
- **HashiCorp Vault** (Enterprise)

**Recommended Stack for Startups:**
\`\`\`
Development: GuardScan + Pre-commit hooks
Production: AWS Secrets Manager or Doppler
CI/CD: GuardScan in GitHub Actions
Team: 1Password for manual secrets
\`\`\`

## Conclusion

Preventing API key leaks requires a multi-layered approach:

1. **Detect** existing leaks with GuardScan
2. **Prevent** new leaks with environment variables and hooks
3. **Protect** production keys with secret management
4. **Respond** quickly when leaks occur
5. **Review** and improve processes continuously

Start today with GuardScan - it's free, runs locally, and takes 2 minutes to set up.

\`\`\`bash
npm install -g guardscan
guardscan security
# Pre-commit hook: run "guardscan security --ci --fail-on high" from .git/hooks/pre-commit
\`\`\`

Your future self (and your security team) will thank you.`,
    codeExamples: [],
    relatedArticles: [
      "secrets-detection-deep-dive",
      "privacy-first-code-review",
      "guardscan-quickstart",
    ],
  },

  "sast-vs-dast-vs-iast": {
    slug: "sast-vs-dast-vs-iast",
    title: "SAST vs DAST vs IAST: Which Security Testing Is Right?",
    description:
      "Complete comparison of Static (SAST), Dynamic (DAST), and Interactive (IAST) application security testing. Learn which approach fits your needs.",
    category: "Security",
    date: "2025-01-21",
    readTime: "13 min read",
    image: "🔬",
    excerpt:
      "Confused about SAST, DAST, and IAST? This comprehensive guide compares all three security testing approaches with real-world examples, pros/cons, and selection criteria.",
    keywords: [
      "SAST vs DAST",
      "IAST security testing",
      "application security testing",
      "static analysis",
      "dynamic analysis",
      "security testing comparison",
    ],
    author: {
      name: "GuardScan Security Team",
      role: "Application Security Engineers",
    },
    content: `# SAST vs DAST vs IAST: Which Security Testing Is Right for You?

Application security testing is not one-size-fits-all. Understanding the differences between SAST, DAST, and IAST is crucial for building an effective security strategy. This comprehensive guide compares all three approaches with real-world examples and selection criteria.

## Understanding the Three Approaches

### SAST (Static Application Security Testing)

**Definition:** Static analysis examines source code, bytecode, or binaries **without executing** the program.

**How it works:** Analyzes code structure, data flow, and control flow to identify security vulnerabilities and coding errors.

**Examples:** SonarQube, Snyk, Checkmarx, Veracode, GuardScan

**When it runs:** During development, in pre-commit hooks, and in CI/CD pipelines

**Analogy:** Like a code review by a security expert - examining the blueprint before building.

### DAST (Dynamic Application Security Testing)

**Definition:** Dynamic testing examines running applications by simulating attacks from the **outside**.

**How it works:** Sends malicious inputs, analyzes responses, and identifies runtime vulnerabilities without access to source code.

**Examples:** OWASP ZAP, Burp Suite, Acunetix, Nessus

**When it runs:** In testing/staging environments, or carefully in production

**Analogy:** Like a penetration test - trying to break into a finished building.

### IAST (Interactive Application Security Testing)

**Definition:** Interactive testing combines SAST and DAST by analyzing code behavior **while the application runs**.

**How it works:** Instruments the application with agents that monitor execution, data flow, and interactions in real-time.

**Examples:** Contrast Security, Seeker, HCL AppScan

**When it runs:** During QA testing with instrumentation enabled

**Analogy:** Like having a security camera system throughout the building while stress-testing it.

## Detailed Comparison

### What Each Approach Finds

**SAST Identifies:**
- Hardcoded credentials and secrets
- SQL injection vulnerabilities
- Cross-site scripting (XSS) flaws
- Buffer overflows
- Race conditions
- Insecure cryptography usage
- Code quality issues
- Null pointer dereferences
- Path traversal vulnerabilities
- Unvalidated input

**SAST Misses:**
- Runtime configuration issues
- Server misconfigurations
- Authentication/authorization flaws in deployment
- Third-party API vulnerabilities
- Business logic errors that only appear at runtime

**DAST Identifies:**
- Authentication bypass
- Session management flaws
- XSS in rendered output
- CSRF vulnerabilities
- Server misconfigurations
- SSL/TLS issues
- HTTP security header problems
- Runtime injection flaws
- Security misconfiguration
- Known vulnerable components

**DAST Misses:**
- Exact code location of vulnerabilities
- Logic errors not triggered by inputs
- Dead code vulnerabilities
- Issues requiring authentication/complex workflows
- Code-level details for remediation

**IAST Identifies:**
- Everything SAST finds
- Everything DAST finds
- Complex runtime vulnerabilities
- Business logic flaws
- Data flow issues across components
- Runtime-specific injection attacks
- Configuration and deployment issues

**IAST Limitations:**
- Requires instrumentation (overhead)
- Complex setup
- May not cover all code paths
- Performance impact during testing

## Pros and Cons Analysis

### SAST Advantages ✅

**1. Early Detection**
Catches issues during development when fixes are 100x cheaper than production fixes.

**2. No Running Application Required**
Works with incomplete code, libraries, and frameworks.

**3. Complete Code Coverage**
Analyzes all code paths, including edge cases rarely triggered at runtime.

**4. Pinpoint Accuracy**
Shows exact file, line number, and code snippet causing the issue.

**5. Fast Feedback**
Scans complete in minutes; some tools (like GuardScan) in seconds.

**6. Works Offline**
Tools like GuardScan operate 100% locally without internet.

**7. Low Cost**
Many excellent SAST tools are free (GuardScan, Semgrep, SonarQube CE).

### SAST Disadvantages ❌

**1. False Positives**
May flag secure code patterns or miss context, requiring manual review.

**2. Limited to Code Analysis**
Can't detect configuration issues, deployment problems, or runtime behavior.

**3. Language-Specific**
Requires language-specific analyzers; may not support all languages.

**4. Business Logic Blind**
Can't understand application-specific security requirements.

**5. Context Limitations**
May not understand framework-specific security controls.

### DAST Advantages ✅

**1. Zero False Positives**
If it finds an exploit, it's real and exploitable.

**2. Runtime Reality**
Tests actual running application with real configurations.

**3. Technology Agnostic**
Works with any web application regardless of language or framework.

**4. Configuration Testing**
Detects server misconfigurations and deployment issues.

**5. Third-Party Testing**
Works on applications without source code access.

**6. Integration Testing**
Tests complete stack including databases, APIs, and services.

### DAST Disadvantages ❌

**1. Late Detection**
Finds issues after code is deployed to test environment.

**2. No Code Location**
Can't pinpoint exact source code causing the vulnerability.

**3. Limited Coverage**
Only tests reachable code paths and features.

**4. Slow Execution**
Full scans can take hours or days.

**5. Complex Setup**
Requires running application, test data, and authentication.

**6. May Miss Issues**
Doesn't test unauthenticated areas or complex workflows.

### IAST Advantages ✅

**1. Best of Both Worlds**
Combines SAST accuracy with DAST's runtime validation.

**2. Low False Positives**
Confirms vulnerabilities with actual exploitation attempts.

**3. Precise Location**
Shows exact code and execution path causing issue.

**4. Real-Time Detection**
Identifies issues during testing without slow scans.

**5. Code Coverage**
Tracks which code paths were tested.

### IAST Disadvantages ❌

**1. Expensive**
Commercial tools cost $10K-$100K+ annually.

**2. Complex Setup**
Requires application instrumentation and agent deployment.

**3. Performance Overhead**
Monitoring adds 5-20% performance penalty.

**4. Limited Adoption**
Fewer tools and smaller ecosystem than SAST/DAST.

**5. Testing Only**
Instrumentation not suitable for production environments.

## When to Use Each Approach

### Choose SAST When:

**Budget Constraints:**
- Limited security budget
- Need free/low-cost solution
- Startup or small team

**Early Development:**
- During active development
- Pre-commit or PR checks
- Rapid feedback needed

**Privacy Requirements:**
- Can't send code externally
- Regulated industry (finance, healthcare, government)
- IP protection critical

**Large Codebase:**
- Need to scan millions of lines quickly
- Multiple repositories
- Monorepo architecture

**Specific Use Cases:**
- Finding hardcoded secrets ⭐ (GuardScan excels)
- Code quality enforcement
- Compliance requirements (SOC2, PCI-DSS)
- Offline/air-gapped environments

**Recommended Tool:** GuardScan for privacy-first, free SAST

### Choose DAST When:

**Deployment Stage:**
- Application already deployed
- Testing staging/QA environment
- Pre-production validation

**External Perspective:**
- Need attacker's viewpoint
- Testing production-like configuration
- Verifying security controls work

**Third-Party Apps:**
- No source code access
- Testing vendor applications
- Penetration testing

**Compliance:**
- Regulatory requirements for runtime testing
- PCI-DSS mandates DAST
- Security audit requirements

**Verification:**
- Confirming SAST fixes work
- Validating security controls
- Testing WAF effectiveness

**Recommended Tools:** OWASP ZAP (free), Burp Suite

### Choose IAST When:

**Enterprise Budget:**
- Can afford $10K-$100K/year tools
- Large security team
- Dedicated security infrastructure

**Comprehensive Testing:**
- Need both SAST and DAST benefits
- Critical applications
- High-risk environments

**Mature Security Program:**
- Already using SAST and DAST
- DevSecOps culture established
- Automated testing pipeline

**Complex Applications:**
- Microservices architecture
- Multiple integration points
- Business logic vulnerabilities

**Resource Availability:**
- Team can manage instrumentation
- Infrastructure supports agents
- Willing to accept performance overhead

**Recommended Tools:** Contrast Security, Seeker (enterprise)

## Real-World Implementation Strategies

### Strategy 1: Layered Security (Recommended)

**Phase 1: Development (SAST)**
\`\`\`bash
# Local development
guardscan security

# Pre-commit hook: add "guardscan security --ci --fail-on high"
# to .git/hooks/pre-commit

# Developer gets immediate feedback
\`\`\`

**Benefits:**
- Catch 60-70% of vulnerabilities
- Zero cost
- Fast feedback (<1 minute)
- Privacy maintained

**Phase 2: CI/CD Pipeline (SAST)**
\`\`\`yaml
# .github/workflows/security.yml
name: Security Scan
on: [pull_request]

jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g guardscan
      - run: guardscan security --fail-on high
\`\`\`

**Benefits:**
- Automated enforcement
- Blocks vulnerable code from merging
- Audit trail

**Phase 3: Staging (DAST)**
\`\`\`bash
# After deployment to staging
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t https://staging.yourapp.com \
  -r zap-report.html
\`\`\`

**Benefits:**
- Tests real environment
- Finds configuration issues
- Validates SAST fixes

**Phase 4: Production Monitoring**
- Web Application Firewall (WAF)
- Runtime protection (RASP)
- Security monitoring
- Bug bounty program

**Total Cost:** $0-500/month
**Coverage:** 85-90% of vulnerabilities

### Strategy 2: Budget-Conscious Startup

**Use:**
- SAST: GuardScan (free)
- DAST: OWASP ZAP (free)
- Manual: Periodic security reviews

**Setup:**
\`\`\`bash
# Development
npm install -g guardscan
# Pre-commit hook: run "guardscan security --ci --fail-on high" from .git/hooks/pre-commit

# CI/CD
guardscan security --fail-on high

# Weekly DAST scan
zap-cli quick-scan https://staging.app.com
\`\`\`

**Total Cost:** $0/month
**Time Investment:** 2-4 hours/week

### Strategy 3: Enterprise Security

**Use:**
- SAST: GuardScan + SonarQube + Snyk
- DAST: Burp Suite Enterprise
- IAST: Contrast Security
- Manual: Quarterly pen tests

**Coverage:** 95%+ of vulnerabilities
**Total Cost:** $50K-200K/year

## Cost Comparison

| Approach | Free Options | Commercial | Enterprise |
|----------|-------------|------------|------------|
| **SAST** | GuardScan, Semgrep, SonarQube CE | $500-2K/month | $10K-50K/year |
| **DAST** | OWASP ZAP, Nikto | $500-5K/month | $20K-100K/year |
| **IAST** | None (all commercial) | $2K-5K/month | $50K-200K/year |

**Best Value:** SAST with GuardScan (free, comprehensive, privacy-first)

## Selection Criteria Decision Matrix

### Choose SAST if:
- [ ] Budget is limited ($0-1K/month)
- [ ] Need early detection during development
- [ ] Privacy is a top concern
- [ ] Large codebase to scan regularly
- [ ] Want offline capability
- [ ] Need fast feedback (<5 minutes)
- [ ] Require code-level details for fixes

**Score 4+:** SAST is ideal → Use GuardScan

### Choose DAST if:
- [ ] Application is already deployed
- [ ] Need external attacker perspective
- [ ] Testing third-party applications
- [ ] Compliance requires runtime testing
- [ ] Want zero false positives
- [ ] Need configuration testing
- [ ] Verifying security controls work

**Score 4+:** DAST is needed → Use OWASP ZAP

### Choose IAST if:
- [ ] Budget allows $50K+/year
- [ ] Need comprehensive coverage
- [ ] Can instrument applications
- [ ] Mature security program exists
- [ ] Critical/high-risk applications
- [ ] Team can manage complexity
- [ ] Want best-in-class detection

**Score 5+:** IAST is worth it → Consider Contrast Security

## Common Mistakes to Avoid

**1. Relying on Only One Approach**
❌ Using only SAST misses runtime issues
✅ Layer SAST + DAST for comprehensive coverage

**2. Ignoring False Positives**
❌ Dismissing all SAST findings as false positives
✅ Tune SAST tools and review findings

**3. Running DAST in Production**
❌ DAST can cause outages or data corruption
✅ Only run DAST in staging/test environments

**4. Delaying Security Testing**
❌ Waiting until production to scan
✅ Integrate SAST from day one

**5. Not Fixing Findings**
❌ Scanning without remediation
✅ Track, prioritize, and fix vulnerabilities

## Conclusion

**For Most Teams:**
Start with SAST (GuardScan) for development and CI/CD, add DAST (OWASP ZAP) for staging, and consider IAST only if budget and maturity allow.

**Recommended Starting Point:**

\`\`\`bash
# 1. Install GuardScan
npm install -g guardscan

# 2. Scan your codebase
guardscan security

# 3. Set up a pre-commit hook
# Run "guardscan security --ci --fail-on high" from .git/hooks/pre-commit

# 4. Add to CI/CD
# (See GitHub Actions example above)
\`\`\`

**Cost:** $0
**Time:** 10 minutes setup
**Result:** Catch 60-70% of vulnerabilities immediately

The best security testing approach is the one you'll actually use consistently. Start simple with GuardScan, then layer additional tools as needed.`,
    codeExamples: [],
    relatedArticles: [
      "best-sast-tools-2025",
      "owasp-top-10-guide",
      "guardscan-quickstart",
    ],
  },

  "github-security-scanning": {
    slug: "github-security-scanning",
    title: "GitHub Security Scanning: Built-in vs Third-Party Tools",
    description:
      "Compare GitHub Advanced Security, Dependabot, and CodeQL with third-party alternatives like GuardScan, Snyk, and SonarQube.",
    category: "Security",
    date: "2025-01-19",
    readTime: "12 min read",
    image: "🔒",
    excerpt:
      "Should you use GitHub's built-in security features or third-party tools? This detailed comparison helps you choose the right security scanning solution for your repositories.",
    keywords: [
      "github security scanning",
      "github advanced security",
      "github alternative",
      "codeql",
      "dependabot",
      "github code scanning",
    ],
    author: {
      name: "GuardScan Team",
      role: "DevSecOps Engineers",
    },
    content: `# GitHub Security Scanning: Built-in vs Third-Party Tools

GitHub has invested heavily in security features, offering Dependabot, GitHub Advanced Security (GHAS), and CodeQL. But should you use these built-in tools or third-party alternatives? This comprehensive comparison helps you make the right choice for your repositories.

## GitHub's Built-in Security Features

### 1. Dependabot (Free for All Repos)

**What it does:**
Automatically detects vulnerable dependencies and creates pull requests to update them.

**Supported Ecosystems:**
- npm/yarn (JavaScript)
- pip/poetry (Python)
- bundler (Ruby)
- Maven/Gradle (Java)
- NuGet (.NET)
- Composer (PHP)
- Go modules
- Docker
- GitHub Actions

**Pros:**
- ✅ Free for public AND private repositories
- ✅ Automatic pull requests with changelogs
- ✅ Native GitHub integration
- ✅ Customizable update schedule
- ✅ Groups related updates
- ✅ Respects semantic versioning

**Cons:**
- ❌ Limited to dependency scanning only
- ❌ Can create PR fatigue (10-20+ PRs/week)
- ❌ No code scanning
- ❌ No secrets detection (without GHAS)
- ❌ Requires manual review of each PR

**Configuration:**
\`\`\`yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
\`\`\`

**Best for:** All projects - it's free and catches known vulnerabilities

### 2. GitHub Advanced Security (GHAS)

**What it is:**
A paid enterprise security suite for private repositories.

**Pricing:**
- **Public repos:** FREE
- **Private repos:** $49/user/month (GitHub Enterprise)
- **Minimum:** Usually 50+ users ($2,450/month minimum)

**Features:**

**a) CodeQL - Semantic Code Analysis**
- Deep code analysis engine
- Finds complex vulnerabilities
- Custom query support
- Security hotspots

**Languages Supported:**
JavaScript, TypeScript, Python, Java, C#, C/C++, Go, Ruby, Swift

**Pros:**
- ✅ Deep semantic analysis
- ✅ Finds complex vulnerabilities
- ✅ Custom queries possible
- ✅ Native GitHub integration

**Cons:**
- ❌ Slow (5-20 minutes per scan)
- ❌ Resource intensive
- ❌ Complex query language
- ❌ GitHub-specific (vendor lock-in)
- ❌ Expensive for private repos

**b) Secret Scanning**
- Scans for exposed credentials
- Partners with providers for auto-revocation
- Monitors public repos automatically

**Detects:**
- AWS, Azure, GCP keys
- GitHub tokens
- Stripe API keys
- 150+ partner patterns

**Limitations:**
- Only works on push (not historical scan)
- Pattern-based (may miss generic secrets)
- Private repos require GHAS license

**c) Dependency Review**
- Shows dependency changes in PRs
- Identifies vulnerable dependencies before merge
- Licensing compliance

**d) Security Overview Dashboard**
- Organization-wide security posture
- Vulnerability trends
- Team-level metrics

### 3. CodeQL

**Deep Dive:**

**How it works:**
Creates a database of your code's semantic structure, then runs queries to find vulnerabilities.

**Example CodeQL Query:**
\`\`\`ql
import javascript

from CallExpr call
where call.getCalleeName() = "eval"
select call, "Dangerous use of eval()"
\`\`\`

**Pros:**
- Finds complex data flow issues
- Low false positives
- Customizable
- Open source (community edition)

**Cons:**
- Steep learning curve
- Slow execution time
- Requires significant resources
- Limited to supported languages

## Third-Party Alternatives

### 1. GuardScan - Privacy-First Alternative

**Key Differentiators:**
- 100% local execution (no code uploaded)
- Works completely offline
- Zero licensing costs
- Multi-AI provider support

**Pricing:** FREE forever (open source)

**Features:**
- Secrets detection (20+ types)
- SAST code scanning
- OWASP Top 10 coverage
- AI-powered code review (optional)
- Dockerfile security
- Fast scanning (< 2 minutes)

**Languages:** JavaScript, TypeScript, Python, Java, Go, Ruby, PHP, C#

**When to choose GuardScan:**
- Need complete privacy (no code uploads)
- Want zero licensing costs
- Require offline capability
- Work with sensitive/proprietary code
- Small to medium teams
- Fast feedback is critical

**Setup:**
\`\`\`bash
# Install
npm install -g guardscan

# Run locally
guardscan security

# CI/CD integration
guardscan security --fail-on high
\`\`\`

**vs GitHub GHAS:**
- GuardScan: $0, 100% local, fast
- GHAS: $49/user/month, cloud-based, slower

### 2. Snyk - Developer-Friendly Security

**Pricing:** $0-$500+/user/year

**Key Features:**
- Dependency scanning
- Container vulnerability scanning
- IaC security (Terraform, Kubernetes)
- Auto-fix pull requests
- License compliance
- Developer-friendly UI

**Pros:**
- ✅ Comprehensive platform
- ✅ Auto-fix PRs
- ✅ Great developer experience
- ✅ Strong container support
- ✅ Good documentation

**Cons:**
- ❌ Cloud-based (code snippets uploaded)
- ❌ Can be expensive ($98-500/user/year)
- ❌ Requires internet connection
- ❌ Some features require paid tiers

**When to choose Snyk:**
- Need container scanning
- Want auto-fix functionality
- Prefer web dashboard
- Budget for commercial tools
- Multi-language projects

### 3. SonarQube - Code Quality + Security

**Editions:**
- Community: Free (limited features)
- Developer: $150/month
- Enterprise: $30,000+/year

**Key Features:**
- Code quality metrics
- Security hotspots
- Quality gates
- Technical debt tracking
- Historical trends
- Team dashboards

**Pros:**
- ✅ Comprehensive analysis
- ✅ Code quality + security
- ✅ Self-hosted option
- ✅ Quality gates
- ✅ Team collaboration

**Cons:**
- ❌ Requires server infrastructure
- ❌ Complex setup
- ❌ Resource intensive
- ❌ Expensive for full features

**When to choose SonarQube:**
- Need quality gates
- Want historical metrics
- Have infrastructure team
- Enterprise requirements
- Quality + security together

## Feature-by-Feature Comparison

| Feature | GitHub GHAS | GuardScan | Snyk | SonarQube |
|---------|------------|-----------|------|-----------|
| **Code Scanning** | ✅ CodeQL | ✅ Local | ✅ Cloud | ✅ Server |
| **Secrets Detection** | ✅ 150+ patterns | ✅ 20+ types | ✅ | Limited |
| **Dependencies** | ✅ Dependabot | ✅ | ✅ ✅✅ | ✅ |
| **Container Scan** | ❌ | ✅ Docker | ✅✅✅ | ✅ |
| **IaC Security** | ❌ | ✅ | ✅✅ | Limited |
| **AI Code Review** | ❌ | ✅ Multi-AI | ❌ | ❌ |
| **Offline Mode** | ❌ | ✅✅✅ | ❌ | Partial |
| **Privacy** | GitHub cloud | 100% Local | Cloud | Self-hosted |
| **Speed** | Slow (10-20m) | Fast (<2m) | Medium | Medium |
| **Setup** | Easy | Very Easy | Easy | Complex |
| **Public Repos** | FREE | FREE | FREE | FREE |
| **Private Repos** | $49/user/mo | FREE | $8-42/user/mo | $150+/mo |

## Cost Comparison

### GitHub GHAS Pricing
\`\`\`
10 developers:  $490/month  = $5,880/year
50 developers:  $2,450/month = $29,400/year
100 developers: $4,900/month = $58,800/year
\`\`\`

### GuardScan Pricing
\`\`\`
Unlimited developers: $0/month = $0/year
\`\`\`

### Snyk Pricing
\`\`\`
Team (5 users):    $0-98/user/year   = $0-490/year
Business:          $420/user/year    = $2,100/year (5 users)
Enterprise:        Custom pricing    = $10K-50K/year
\`\`\`

### SonarQube Pricing
\`\`\`
Community Edition: $0
Developer Edition: $150/month       = $1,800/year
Enterprise:        $30,000+/year
\`\`\`

## Real-World Scenarios

### Scenario 1: Open Source Project
**Recommendation:** GitHub built-in tools (free)

**Setup:**
- ✅ Enable Dependabot
- ✅ Enable secret scanning (free for public)
- ✅ Set up CodeQL workflow
- ✅ Use pull request reviews

**Cost:** $0

### Scenario 2: Startup with Private Repos (5-10 developers)
**Recommendation:** GuardScan + Dependabot

**Why:**
- No budget for GHAS ($490-980/month)
- Need privacy (can't upload proprietary code)
- Fast feedback critical
- Simple setup

**Setup:**
\`\`\`bash
# Local development
npm install -g guardscan
guardscan security

# CI/CD
guardscan security --fail-on high

# GitHub: Enable Dependabot (free for dependencies)
\`\`\`

**Cost:** $0

### Scenario 3: Small Team (10-20 developers) with Budget
**Recommendation:** GuardScan + Selective GHAS

**Strategy:**
- GuardScan for all development and CI/CD
- GHAS for 2-3 critical repositories only
- Dependabot for all repos (free)

**Cost:** $0-500/month (depending on GHAS usage)

### Scenario 4: Enterprise (50+ developers)
**Recommendation:** Layered Approach

**Setup:**
- GuardScan for local development
- GHAS for GitHub integration
- SonarQube for quality gates
- Snyk for container scanning

**Why:**
- Different tools excel at different tasks
- Redundancy catches more issues
- Each tool has unique features

**Cost:** $30K-80K/year

### Scenario 5: Regulated Industry (Finance, Healthcare, Government)
**Recommendation:** GuardScan

**Why:**
- Complete data privacy (no code uploads)
- Works in air-gapped environments
- No vendor lock-in
- Compliance friendly

**Cost:** $0

## Migration Strategy from GHAS

If you're considering moving away from GitHub Advanced Security:

### Step 1: Assess Current Usage
\`\`\`bash
# Analyze current security alerts
gh api /repos/OWNER/REPO/code-scanning/alerts

# Export secret scanning results
gh api /repos/OWNER/REPO/secret-scanning/alerts > secrets.json

# Review dependency alerts
gh api /repos/OWNER/REPO/dependabot/alerts > deps.json
\`\`\`

### Step 2: Set Up GuardScan
\`\`\`bash
# Install globally
npm install -g guardscan

# Initialize in project
cd your-project
guardscan init

# Run first scan
guardscan security
\`\`\`

### Step 3: Integrate into CI/CD
\`\`\`yaml
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]

jobs:
  guardscan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install GuardScan
        run: npm install -g guardscan
      - name: Run Security Scan
        run: guardscan security --fail-on high
      - name: Upload Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: security-report
          path: guardscan-report.md
\`\`\`

### Step 4: Keep Dependabot
Dependabot for dependency alerts is free even on private repos - keep using it!

\`\`\`yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
\`\`\`

## Hybrid Approach (Best of Both Worlds)

### For Public Repositories:
- ✅ Use GitHub's free features (Dependabot, CodeQL, Secret Scanning)
- ✅ Add GuardScan for local development
- ✅ Best of both worlds, zero cost

### For Private Repositories:
**Option A (Budget-Conscious):**
- GuardScan for development + CI/CD (free)
- Dependabot for dependency alerts (free)
- Selective GHAS for 1-2 critical repos ($49-98/month)

**Option B (Privacy-Focused):**
- GuardScan for everything (free)
- Dependabot for dependencies (free)
- No code uploaded anywhere

**Option C (Enterprise):**
- GuardScan for local development
- GHAS for GitHub integration
- SonarQube for quality gates
- Layered security approach

## Decision Matrix

### Choose GitHub GHAS if:
- [ ] Already on GitHub Enterprise
- [ ] Budget allows $49/user/month
- [ ] Prefer native integration
- [ ] Need organization-wide dashboard
- [ ] Want GitHub support
- [ ] CodeQL's deep analysis is critical

**Score 4+:** GHAS is worth it

### Choose GuardScan if:
- [ ] Need complete privacy
- [ ] Want zero licensing costs
- [ ] Require offline capability
- [ ] Work with sensitive code
- [ ] Fast feedback is critical (<2 min)
- [ ] Small to medium team
- [ ] Want multi-AI code review

**Score 4+:** GuardScan is ideal

### Use Both (Hybrid) if:
- [ ] Public + private repositories
- [ ] Want best of both worlds
- [ ] Some repos extremely critical
- [ ] Mix of security needs
- [ ] Budget allows selective GHAS use

## Conclusion

**For Most Teams:**
GuardScan + Dependabot provides excellent coverage at zero cost with complete privacy.

**For Enterprise:**
Consider a layered approach using multiple tools, each for their strengths.

**Getting Started:**

**Free Tier (Recommended for most):**
\`\`\`bash
# 1. Install GuardScan
npm install -g guardscan

# 2. Run scan
guardscan security

# 3. Enable Dependabot on GitHub
# Settings > Security > Dependabot alerts: Enable

# 4. Add CI/CD integration
# (See GitHub Actions example above)
\`\`\`

**Total Cost:** $0
**Setup Time:** 10 minutes
**Coverage:** Excellent

The best security tool is the one you'll use consistently. GuardScan makes security scanning accessible to everyone.`,
    codeExamples: [],
    relatedArticles: [
      "best-sast-tools-2025",
      "ci-cd-integration",
      "guardscan-quickstart",
    ],
  },

  "cicd-security-integration": {
    slug: "cicd-security-integration",
    title: "CI/CD Security: Integrating Code Scanning into Your Pipeline",
    description: "Add GuardScan to GitHub Actions, GitLab CI, Jenkins and CircleCI: fail on severity, upload SARIF, scan dependencies and roll out a gate gradually.",
    category: "DevOps",
    date: "2026-11-09",
    readTime: "8 min read",
    image: "⚙️",
    excerpt: "Security scanning should run on every change. Learn how to wire guardscan security into your CI/CD pipeline with severity gates, SARIF reports and offline mode.",
    keywords: ["CI/CD security","automated security testing","DevSecOps","pipeline security","GitHub Actions","security automation"],
    author: {
      name: "GuardScan DevOps Team",
      role: "DevSecOps Engineers",
    },
    content: `# CI/CD Security: Integrating Code Scanning into Your Pipeline

Manual security checks are easy to skip. A pipeline job runs on every change, applies the same policy to everyone, and blocks risky code before it merges. This guide shows how to add GuardScan to GitHub Actions, GitLab CI, Jenkins and CircleCI, and how to tune the gate so it helps rather than annoys.

## The core command

Every example below runs the same thing:

\`\`\`bash
npm install -g guardscan
guardscan security --ci --fail-on high --format sarif -o guardscan.sarif
\`\`\`

- \`--ci\` turns on CI-friendly output and exit-code policy
- \`--fail-on high\` fails the job when findings are high severity or above (\`critical\`, \`high\`, \`medium\`, \`low\` and \`info\` are accepted)
- \`--format sarif -o guardscan.sarif\` writes a SARIF report that code-scanning tools can ingest. \`markdown\` and \`json\` are also supported

GuardScan requires Node.js 22 or newer. The summary at the end of a run reports findings by severity, coverage and whether the policy passed.

## GitHub Actions

\`\`\`yaml
name: Security
on:
  push:
    branches: [main]
  pull_request:

jobs:
  guardscan:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install -g guardscan
      - run: guardscan security --ci --fail-on high --format sarif -o guardscan.sarif
      - uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: guardscan.sarif
\`\`\`

\`if: always()\` uploads the report even when the gate fails, so findings show up in the Security tab. Uploading SARIF to code scanning requires that feature to be available for your repository.

## GitLab CI

\`\`\`yaml
guardscan:
  image: node:22
  stage: test
  script:
    - npm install -g guardscan
    - guardscan security --ci --fail-on high --format sarif -o guardscan.sarif
  artifacts:
    when: always
    paths:
      - guardscan.sarif
\`\`\`

## Jenkins

\`\`\`groovy
pipeline {
  agent { docker { image 'node:22' } }
  stages {
    stage('Security') {
      steps {
        sh 'npm install -g guardscan'
        sh 'guardscan security --ci --fail-on high --format sarif -o guardscan.sarif'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'guardscan.sarif', allowEmptyArchive: true
    }
  }
}
\`\`\`

This assumes the Docker Pipeline plugin. Alternatively, use any agent with Node.js 22 installed.

## CircleCI

\`\`\`yaml
version: 2.1
jobs:
  guardscan:
    docker:
      - image: cimg/node:22.12
    steps:
      - checkout
      - run: npm install -g guardscan
      - run: guardscan security --ci --fail-on high --format sarif -o guardscan.sarif
      - store_artifacts:
          path: guardscan.sarif
workflows:
  security:
    jobs:
      - guardscan
\`\`\`

## Add dependency vulnerability checks

Dependency scanning looks up exact versions in OSV, so the runner needs network access:

\`\`\`bash
# Included in the security run
guardscan security --ci --cve --scope runtime --fail-on high

# Or as its own step
guardscan vuln --ci --fail-on high
\`\`\`

\`--scope runtime\` ignores development dependencies. If a run cannot reach the advisory data, GuardScan reports incomplete coverage rather than silently passing. Use \`--allow-partial\` only if you consciously accept that trade-off.

## Keeping CI offline

If your runners must not reach cloud services, add \`--offline\`. It skips network-backed checks, including dependency lookups, so coverage differs from an online run. \`guardscan vuln --offline\` can use a previously saved local snapshot.

\`\`\`bash
guardscan security --ci --offline --fail-on high
\`\`\`

## Tune the gate

Rolling out a gate on an existing codebase can block everyone on day one. A gradual approach works better:

1. **Observe:** run the job without \`--fail-on\` and read the summary.
2. **Gate on the worst:** start with \`--fail-on critical\`, fix what it finds, then move to \`high\`.
3. **Cap the total:** \`--max-findings <number>\` fails the job if the count exceeds a ceiling you lower over time.
4. **Keep it fast:** scan changed files with \`-f\` for pull requests and run the full scan on the main branch.

## Reports and SBOMs

\`\`\`bash
guardscan security --format markdown -o security-report.md
guardscan sbom -f cyclonedx -o sbom.json
\`\`\`

Store reports as build artifacts, and generate an SBOM (SPDX or CycloneDX) on release builds.

## Combine tools

No single scanner covers everything. Common companions:

\`\`\`bash
semgrep scan --config auto      # code patterns
gitleaks detect --source .      # secrets in git history
trivy image my-image:latest     # container images
\`\`\`

## Common mistakes

- **Never failing the build.** A scan that cannot block is only a report.
- **Blocking everything at once.** Start at \`critical\`, then tighten.
- **Ignoring incomplete coverage.** A pass with missing coverage is not a clean bill of health.
- **Leaking secrets to forks.** Do not give pull requests from forks access to secrets or write tokens.
- **Skipping upgrades.** Pin a GuardScan version if you need reproducible runs, and update it deliberately.

## Conclusion

Start with one job, one command and a gate on critical findings. Add SARIF upload, dependency checks and stricter thresholds as the team gets used to the results.`,
    codeExamples: [
      {
        language: "yaml",
        title: "GitHub Actions workflow",
        code: "name: Security\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  guardscan:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      security-events: write\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n      - run: npm install -g guardscan\n      - run: guardscan security --ci --fail-on high --format sarif -o guardscan.sarif\n      - uses: github/codeql-action/upload-sarif@v3\n        if: always()\n        with:\n          sarif_file: guardscan.sarif",
      },
    ],
    relatedArticles: [
      "ci-cd-integration",
      "github-security-scanning",
      "guardscan-quickstart",
    ],
  },

  "open-source-sast-tools": {
    slug: "open-source-sast-tools",
    title: "Open Source SAST Tools: Complete Guide",
    description: "A practical overview of free and open-source static application security testing (SAST) tools, what each is good for, and how to combine them in CI.",
    category: "Security",
    date: "2026-11-09",
    readTime: "8 min read",
    image: "🆓",
    excerpt: "You can start security scanning without a commercial license. This guide covers open-source SAST tools, from GuardScan and Semgrep to language-specific analyzers, and how to evaluate them on your own code.",
    keywords: ["open source SAST","free security tools","open source security scanning","free SAST tools","security testing tools"],
    author: {
      name: "GuardScan Team",
      role: "Open Source Advocates",
    },
    content: `# Open Source SAST Tools: Complete Guide

Static application security testing (SAST) analyzes source code for vulnerabilities without running it. You do not need a commercial license to start: there are mature free and open-source tools for most languages. This guide surveys the main options, what each is good at, and how to combine them.

Feature sets and licenses change, so confirm details on each project's site before you standardize.

## Why open source?

- **Transparency:** you can read the rules and the engine
- **No per-seat licensing** for the core tools
- **Easy to try:** install, run, compare results on your own code
- **CI-friendly:** most are command-line tools with machine-readable output

Open source does not mean zero cost. You still spend time on setup, tuning, triage and upkeep, and some projects have paid tiers for extra features.

## What to look for

- **Languages and frameworks** you actually use
- **Rule quality:** false-positive rate matters more than raw rule count
- **Output formats:** SARIF makes results easy to publish in code-scanning dashboards
- **Speed:** slow scans get skipped
- **Customization:** can you write rules for your own patterns?
- **Privacy:** does analysis happen locally?

## Multi-language tools

### GuardScan

A command-line tool that combines local heuristic security checks (secrets, injection patterns, Dockerfile and IaC issues and more), dependency vulnerability lookups through OSV, SBOM generation and optional AI review. Source is at https://github.com/ntanwir10/GuardScan.

\`\`\`bash
npm install -g guardscan
guardscan security
guardscan security --ci --fail-on high --format sarif -o guardscan.sarif
\`\`\`

Its AI features are opt-in and work with hosted providers or a local one such as Ollama. Its checks are heuristic, so use it alongside deeper, language-specific analyzers rather than instead of them.

### Semgrep

A pattern-based engine with a large community rule set and a readable rule syntax for writing your own. A good fit when you want custom rules.

\`\`\`bash
semgrep scan --config auto
\`\`\`

Check Semgrep's licensing for the rule sets you use, since some are under different terms than the engine.

### CodeQL

GitHub's semantic code analysis engine, which treats code as data you can query. It is free for public repositories on GitHub; check GitHub's license terms before using it on private code.

### SonarQube Community Edition

Combines code-quality and security rules in a self-hosted server with dashboards and quality gates. The Community Edition covers a subset of the features of paid editions, so compare editions against your needs.

## Language-specific tools

| Language | Tools |
|----------|-------|
| JavaScript / TypeScript | ESLint with eslint-plugin-security, Semgrep |
| Python | Bandit |
| Go | gosec |
| Ruby | Brakeman |
| Java | SpotBugs with the Find Security Bugs plugin |

\`\`\`bash
bandit -r .
gosec ./...
brakeman
\`\`\`

Language-specific tools understand idioms and frameworks that generic engines may miss, so pair one with a multi-language scanner.

## Adjacent categories

SAST is one layer. Complete coverage also needs:

- **Secrets scanning:** Gitleaks (\`gitleaks detect --source .\`) for credentials in code and history
- **Dependency scanning:** \`guardscan vuln\`, OSV-Scanner, or your package manager's audit command
- **Container and IaC scanning:** Trivy (\`trivy fs .\`, \`trivy image <name>\`, \`trivy config .\`), Hadolint for Dockerfiles, Checkov for infrastructure as code
- **Dynamic testing (DAST):** tools that attack a running application, which static analysis cannot replace

## A starter stack

1. A multi-language scanner such as GuardScan or Semgrep in CI on every pull request
2. One language-specific analyzer for your main language
3. A secrets scanner covering git history
4. Dependency and container scanning on build
5. Optionally, SonarQube Community Edition or CodeQL for dashboards and deeper analysis

\`\`\`yaml
# GitHub Actions: one job, SARIF to code scanning
- uses: actions/setup-node@v4
  with:
    node-version: 22
- run: npm install -g guardscan
- run: guardscan security --ci --fail-on high --format sarif -o guardscan.sarif
- uses: github/codeql-action/upload-sarif@v3
  if: always()
  with:
    sarif_file: guardscan.sarif
\`\`\`

## How to evaluate on your own code

Vendor comparisons and benchmark tables rarely match your codebase. Instead:

1. Pick a representative repository
2. Run two or three candidates and export SARIF or JSON
3. Triage a sample of findings from each and record true and false positives
4. Compare run time, setup effort and how readable the results are
5. Choose what your team will actually keep running

## Tuning tips

- Start with high-severity rules and expand
- Fix or suppress findings with a recorded reason, not silently
- Set a gate with \`--fail-on\` (or the tool's equivalent) once the baseline is clean
- Review rule updates when you upgrade a tool

## Conclusion

Open-source SAST tools cover a lot of ground. Choose a small stack that matches your languages, measure it on your own code, automate it in CI, and keep a human in the loop for triage.`,
    codeExamples: [],
    relatedArticles: [
      "best-sast-tools-2025",
      "guardscan-quickstart",
      "ci-cd-integration",
    ],
  },
};
