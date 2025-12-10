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
    title: "Why Privacy-First Code Review Matters in 2025",
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
    title:
      "Secrets Detection: How to Find API Keys, Tokens & Passwords in Your Codebase",
    description:
      "Learn advanced techniques for detecting hardcoded secrets, API keys, and credentials in your source code before they reach production.",
    category: "Security",
    date: "2025-01-10",
    readTime: "12 min read",
    image: "🔑",
    excerpt:
      "Hardcoded secrets are one of the most common security vulnerabilities. Discover how GuardScan's pattern-based and entropy-based detection catches secrets that other tools miss.",
    keywords: [
      "secrets detection",
      "API keys",
      "security scanning",
      "credential management",
      "SAST",
    ],
    author: {
      name: "GuardScan Team",
      role: "Security Engineers",
    },
    content: `# Secrets Detection: Finding API Keys, Tokens & Passwords

Hardcoded secrets are responsible for countless security breaches. A single exposed API key can lead to unauthorized access, data breaches, financial losses, and compliance violations.

## Types of Secrets to Detect

### API Keys & Tokens
- AWS access keys
- Google Cloud credentials
- GitHub personal access tokens
- Stripe API keys
- OAuth tokens

### Database Credentials
- Connection strings with passwords
- Database URLs
- Redis authentication tokens

### Encryption Keys
- JWT signing secrets
- Encryption keys
- Private keys

## Detection Techniques

GuardScan uses multiple detection methods to find secrets in your codebase.

### Pattern-Based Detection

Regex patterns identify common secret formats like AWS keys, GitHub tokens, and API keys.

### Entropy-Based Detection

High entropy strings often indicate secrets. GuardScan calculates entropy to detect random-looking strings that might be credentials.

### Context-Aware Detection

Variable names and surrounding context help identify suspicious values even when they don't match known patterns.

## Best Practices

### Use Environment Variables

Store secrets in environment variables, never in code:

\`\`\`bash
# .env (never commit this file!)
DATABASE_URL=postgresql://user:pass@localhost/db
API_KEY=abc123xyz
JWT_SECRET=your-secret-key
\`\`\`

### Use Secret Management Services

- **AWS Secrets Manager**: Rotate secrets automatically
- **HashiCorp Vault**: Centralized secret storage
- **Azure Key Vault**: Cloud-native secrets
- **Doppler**: Developer-friendly secrets management

### Implement Pre-Commit Hooks

\`\`\`bash
# Install GuardScan pre-commit hook
guardscan install-hooks

# Now secrets are detected before commit
git commit -m "Add feature"
# → GuardScan: Found 2 potential secrets, commit blocked!
\`\`\`

## Scanning with GuardScan

\`\`\`bash
# Scan for secrets only
guardscan secrets scan

# Scan with high sensitivity
guardscan secrets scan --sensitivity high

# Generate detailed report
guardscan secrets scan --output secrets-report.json
\`\`\`

## Conclusion

Secrets detection should be part of your development workflow, not an afterthought. GuardScan makes it easy to catch secrets before they reach production.`,
    codeExamples: [
      {
        language: "bash",
        title: "Scan for Secrets",
        code: `# Full secrets scan
guardscan secrets scan

# High sensitivity mode
guardscan secrets scan --sensitivity high

# Export findings
guardscan secrets scan --format json > secrets.json`,
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
    description:
      "Maximize the effectiveness of AI code review tools while maintaining privacy and security. Learn when to use AI, which models to choose, and how to integrate AI feedback into your workflow.",
    category: "AI",
    date: "2025-01-05",
    readTime: "10 min read",
    image: "🤖",
    excerpt:
      "AI can dramatically improve code review quality, but only when used correctly. Learn how to leverage GPT-4, Claude, Gemini, or local models for security analysis without compromising privacy.",
    keywords: [
      "AI code review",
      "GPT-4",
      "Claude",
      "Ollama",
      "machine learning",
      "security",
    ],
    author: {
      name: "GuardScan Team",
      role: "AI Engineers",
    },
    content: `# AI-Powered Code Review: Best Practices

AI-powered code review has revolutionized how we detect security vulnerabilities. But not all AI reviews are created equal. Here's how to do it right.

## Choosing the Right AI Provider

### Cloud AI Providers

**OpenAI GPT-4**: Best for complex security analysis with excellent reasoning
**Anthropic Claude**: Best for context-heavy analysis with large context windows
**Google Gemini**: Best for multi-file analysis, fast and cost-effective

### Local AI (Privacy-First)

**Ollama**: Best for complete privacy - 100% offline, unlimited scans, free

## When to Use AI Review

✅ **Good Use Cases**:
- Complex security vulnerabilities
- Logic errors in authentication
- Race conditions and timing attacks
- Business logic flaws
- Contextual security issues

❌ **Don't Use AI For**:
- Simple syntax errors (use a linter)
- Known CVEs (use dependency scanning)
- Formatting issues (use Prettier/ESLint)

## Privacy Considerations

GuardScan + Ollama = 100% private AI review:

\`\`\`bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a code-optimized model
ollama pull codellama:13b

# Configure GuardScan
guardscan config set ai.provider ollama
guardscan config set ai.model codellama:13b

# Run private AI review
guardscan scan --ai-review
\`\`\`

## Conclusion

AI-powered code review is a powerful tool when used correctly. Combine it with traditional static analysis, use appropriate privacy controls, and always validate findings.`,
    codeExamples: [
      {
        language: "bash",
        title: "Local AI Setup",
        code: `# Install Ollama for privacy
curl -fsSL https://ollama.ai/install.sh | sh

# Download code-optimized model
ollama pull codellama:13b

# Configure GuardScan
guardscan config set ai.enabled true
guardscan config set ai.provider ollama
guardscan config set ai.model codellama:13b

# Run private AI review
guardscan scan --ai-review`,
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
    description:
      "Get started with GuardScan in minutes. This hands-on tutorial walks you through installation, configuration, and your first security scan.",
    category: "Tutorial",
    date: "2024-12-28",
    readTime: "6 min read",
    image: "🚀",
    excerpt:
      "New to GuardScan? This quickstart guide gets you from zero to scanning in 5 minutes. Learn the essential commands and see real results immediately.",
    keywords: [
      "tutorial",
      "quickstart",
      "getting started",
      "CLI",
      "installation",
    ],
    author: {
      name: "GuardScan Team",
      role: "Developer Relations",
    },
    content: `# GuardScan QuickStart Guide

Get your codebase scanned for security vulnerabilities in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- A JavaScript/TypeScript project
- Terminal access

## Step 1: Install GuardScan

\`\`\`bash
# Install globally via npm
npm install -g guardscan

# Verify installation
guardscan --version
\`\`\`

## Step 2: Initialize GuardScan

\`\`\`bash
cd /path/to/your/project
guardscan init
\`\`\`

This creates a \`guardscan.config.yml\` file with default settings.

## Step 3: Run Your First Scan

\`\`\`bash
# Full security scan
guardscan scan

# Scan specific types
guardscan secrets scan
guardscan dependencies scan
\`\`\`

## Step 4: Review the Report

Open \`guardscan-report.md\` to see security issues, secrets, and vulnerabilities.

## CI/CD Integration

### GitHub Actions

\`\`\`yaml
name: Security Scan
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g guardscan
      - run: guardscan scan
\`\`\`

## Conclusion

You're now ready to scan your projects with GuardScan! Run regular scans to catch security issues early.`,
    codeExamples: [
      {
        language: "bash",
        title: "Install and Scan",
        code: `# Install globally
npm install -g guardscan

# Initialize in project
cd your-project
guardscan init

# Run first scan
guardscan scan`,
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
    title: "Complete Guide to OWASP Top 10 Vulnerabilities",
    description:
      "A comprehensive breakdown of the OWASP Top 10 security risks and how to detect them automatically in your codebase.",
    category: "Security",
    date: "2025-01-10",
    readTime: "12 min read",
    image: "🛡️",
    excerpt:
      "SQL injection, XSS, and broken authentication are just the tip of the iceberg. This guide walks through each OWASP Top 10 vulnerability with real-world code examples and automated detection strategies using GuardScan.",
    keywords: [
      "OWASP",
      "security vulnerabilities",
      "SQL injection",
      "XSS",
      "authentication",
      "OWASP Top 10",
    ],
    author: {
      name: "GuardScan Security Team",
      role: "Security Researchers",
    },
    content: `# Complete Guide to OWASP Top 10 Vulnerabilities

The OWASP Top 10 is the industry-standard awareness document for developers and application security. It represents a broad consensus about the most critical security risks to web applications.

## Understanding the OWASP Top 10

The Open Web Application Security Project (OWASP) Top 10 list is updated every few years to reflect the changing threat landscape. Here's the current Top 10:

### 1. Broken Access Control

Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of data.

**Common Issues:**
- Missing authorization checks
- Insecure direct object references (IDOR)
- Path traversal vulnerabilities
- Force browsing to authenticated pages

**Detection Strategy:**
GuardScan analyzes your code for missing authorization middleware, unvalidated user input in file paths, and exposed administrative functions.

### 2. Cryptographic Failures

Previously known as "Sensitive Data Exposure," this focuses on failures related to cryptography which often lead to sensitive data exposure or system compromise.

**Common Issues:**
- Plaintext transmission of sensitive data
- Use of weak cryptographic algorithms (MD5, SHA1)
- Hardcoded encryption keys
- Missing SSL/TLS enforcement

**Detection Strategy:**
GuardScan identifies weak encryption algorithms, plaintext credential storage, and missing HTTPS enforcement in your configuration files.

### 3. Injection

Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query. SQL, NoSQL, OS, and LDAP injection are common.

**Common Issues:**
- SQL injection through string concatenation
- Command injection via system calls
- LDAP injection
- Expression language injection

**Detection Strategy:**
GuardScan scans for dangerous functions like \`exec()\`, \`eval()\`, and unsanitized database queries, checking for proper parameterization and input validation.

### 4. Insecure Design

A broad category representing different weaknesses, expressed as "missing or ineffective control design." Insecure design is not the same as insecure implementation.

**Common Issues:**
- Missing rate limiting
- Lack of security checks in business logic
- Insufficient threat modeling
- Missing security requirements

**Detection Strategy:**
GuardScan evaluates your application architecture for common design flaws like missing rate limiting, weak session management, and inadequate input validation layers.

### 5. Security Misconfiguration

Security misconfiguration is the most commonly seen issue, often resulting from insecure default configurations, incomplete setups, or verbose error messages.

**Common Issues:**
- Default credentials still enabled
- Unnecessary features enabled
- Missing security headers
- Verbose error messages revealing system information

**Detection Strategy:**
GuardScan checks configuration files for insecure settings, analyzes Docker configurations, and verifies security headers are properly set.

### 6. Vulnerable and Outdated Components

You are likely vulnerable if you don't know the versions of all components you use and if the software is vulnerable, unsupported, or out of date.

**Common Issues:**
- Using libraries with known vulnerabilities
- Outdated framework versions
- Unnecessary dependencies
- Lack of dependency scanning

**Detection Strategy:**
GuardScan analyzes your \`package.json\`, \`requirements.txt\`, and other dependency files, cross-referencing them with vulnerability databases like CVE and GitHub Security Advisories.

### 7. Identification and Authentication Failures

Previously known as "Broken Authentication," confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks.

**Common Issues:**
- Weak password requirements
- Credential stuffing vulnerabilities
- Missing multi-factor authentication
- Predictable session identifiers
- Session fixation attacks

**Detection Strategy:**
GuardScan reviews authentication flows for common weaknesses, checks for weak password policies in code, and identifies missing session security measures.

### 8. Software and Data Integrity Failures

This relates to code and infrastructure that doesn't protect against integrity violations. An example is using plugins from untrusted sources or insecure CI/CD pipelines.

**Common Issues:**
- Unsigned or unverified updates
- Insecure deserialization
- CI/CD pipelines without integrity verification
- Dependencies from untrusted sources

**Detection Strategy:**
GuardScan checks for insecure deserialization patterns, evaluates dependency sources, and reviews CI/CD configurations for security best practices.

### 9. Security Logging and Monitoring Failures

Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to persist in systems.

**Common Issues:**
- Missing audit logs for critical operations
- Insufficient error logging
- Logs not monitored for suspicious activity
- Sensitive data in logs

**Detection Strategy:**
GuardScan identifies missing logging for security-critical operations, checks for excessive logging that might include sensitive data, and verifies proper error handling.

### 10. Server-Side Request Forgery (SSRF)

SSRF flaws occur when a web application fetches a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send crafted requests to an unexpected destination.

**Common Issues:**
- Unvalidated URL inputs
- Allowing access to internal services
- Missing network-level protections
- Inadequate input sanitization

**Detection Strategy:**
GuardScan identifies code patterns where user input is used in HTTP requests, checks for proper URL validation, and flags potential SSRF vulnerabilities.

## Automated Detection with GuardScan

GuardScan provides comprehensive coverage of the OWASP Top 10:

- **Pattern Recognition:** Identifies dangerous code patterns for each vulnerability class
- **Dependency Analysis:** Scans for known vulnerabilities in your dependencies
- **Configuration Review:** Analyzes Docker, CI/CD, and application configs for misconfigurations
- **AI-Powered Analysis:** Uses AI to understand context and reduce false positives

## Best Practices for Prevention

**For Development Teams:**
- Implement security testing in your CI/CD pipeline
- Use static analysis tools like GuardScan regularly
- Keep dependencies up to date
- Follow secure coding guidelines
- Conduct regular security training

**For Security Teams:**
- Establish secure development standards
- Perform regular penetration testing
- Monitor applications for suspicious activity
- Maintain an incident response plan
- Keep security tools and signatures updated

## Real-World Impact

OWASP Top 10 vulnerabilities are responsible for the majority of successful attacks:

- **Data Breaches:** 80%+ involve OWASP Top 10 vulnerabilities
- **Financial Loss:** Average cost of a breach is $4.24 million
- **Reputation Damage:** Long-term loss of customer trust
- **Compliance Violations:** GDPR, PCI-DSS, HIPAA fines

## Conclusion

Understanding the OWASP Top 10 is essential for building secure applications. Using automated tools like GuardScan helps you:

- Detect vulnerabilities early in the development cycle
- Maintain consistent security standards across your codebase
- Reduce the cost of fixing security issues
- Comply with security standards and regulations

Start protecting your applications from the OWASP Top 10 today with GuardScan's automated security analysis.`,
    codeExamples: [
      {
        language: "javascript",
        title: "SQL Injection Vulnerability (Bad)",
        code: `// Vulnerable to SQL injection
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;
  db.query(query, (err, result) => {
    // Authentication logic
  });
});`,
      },
      {
        language: "javascript",
        title: "SQL Injection Prevention (Good)",
        code: `// Protected with parameterized queries
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    // Authentication logic
  });
});`,
      },
      {
        language: "bash",
        title: "Run OWASP Top 10 Scan",
        code: `# Scan for OWASP Top 10 vulnerabilities
guardscan scan --owasp

# Generate detailed report
guardscan scan --owasp --format html > owasp-report.html

# CI/CD integration
guardscan scan --owasp --fail-on high`,
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
    title:
      "Dockerfile Security: 15 Essential Checks Every Developer Should Run",
    description:
      "A practical checklist for securing Docker containers, from base image selection to USER instruction best practices.",
    category: "DevOps",
    date: "2024-12-20",
    readTime: "7 min read",
    image: "🐳",
    excerpt:
      "Insecure Dockerfiles are a common attack vector. This checklist covers base image security, multi-stage builds, secret management, USER instructions, and vulnerability scanning to keep your containers secure.",
    keywords: [
      "Docker",
      "container security",
      "Dockerfile",
      "DevOps",
      "container best practices",
    ],
    author: {
      name: "GuardScan DevOps Team",
      role: "Container Security Specialists",
    },
    content: `# Dockerfile Security: 15 Essential Checks Every Developer Should Run

Docker containers are everywhere, but insecure Dockerfiles can expose your applications to serious vulnerabilities. This guide covers 15 essential security checks every developer should implement.

## Why Dockerfile Security Matters

A vulnerable container can:
- Expose sensitive data and credentials
- Provide attackers with escalated privileges
- Become a pivot point for attacking other systems
- Harbor outdated software with known vulnerabilities

## 15 Essential Security Checks

### 1. Use Official Base Images

Always start with official, verified base images from trusted sources.

**Why it matters:**
Unofficial images may contain malware, backdoors, or outdated packages.

**Best Practice:**
Use minimal base images like \`alpine\`, \`distroless\`, or official language images.

### 2. Specify Exact Image Versions

Never use \`:latest\` tags in production.

**Why it matters:**
Latest tags can introduce breaking changes and unpatched vulnerabilities.

**Best Practice:**
Pin to specific versions with SHA256 digests for reproducible builds.

### 3. Run as Non-Root User

Never run containers as root unless absolutely necessary.

**Why it matters:**
Root access in a container can lead to host system compromise.

**Best Practice:**
Create and switch to a non-privileged user using the \`USER\` instruction.

### 4. Use Multi-Stage Builds

Separate build dependencies from runtime dependencies.

**Why it matters:**
Build tools and dependencies increase attack surface and image size.

**Best Practice:**
Use multi-stage builds to include only necessary runtime components.

### 5. Minimize Layer Count

Combine commands where possible to reduce layers.

**Why it matters:**
Each layer can introduce vulnerabilities and increases image size.

**Best Practice:**
Chain related commands with \`&&\` operators.

### 6. Never Store Secrets in Images

Avoid hardcoding credentials, API keys, or tokens.

**Why it matters:**
Secrets in images can be extracted from any layer, even deleted ones.

**Best Practice:**
Use Docker secrets, environment variables, or external secret management.

### 7. Scan for Vulnerabilities

Regularly scan images for known CVEs.

**Why it matters:**
Dependencies often contain security vulnerabilities.

**Best Practice:**
Integrate vulnerability scanning into your CI/CD pipeline.

### 8. Limit Network Exposure

Only expose necessary ports.

**Why it matters:**
Unnecessary exposed ports increase attack surface.

**Best Practice:**
Use \`EXPOSE\` only for required ports and implement network policies.

### 9. Use .dockerignore

Prevent sensitive files from being included in the build context.

**Why it matters:**
Accidentally including .git, .env files can expose secrets.

**Best Practice:**
Maintain a comprehensive .dockerignore file.

### 10. Validate File Integrity

Verify downloaded files with checksums.

**Why it matters:**
Man-in-the-middle attacks can inject malicious code.

**Best Practice:**
Always verify SHA256 checksums for downloaded artifacts.

### 11. Remove Unnecessary Packages

Install only required packages and remove package managers.

**Why it matters:**
Extra packages increase attack surface and image size.

**Best Practice:**
Use \`--no-install-recommends\` and clean up after installations.

### 12. Set Proper File Permissions

Ensure files have minimum required permissions.

**Why it matters:**
Overly permissive files can be exploited.

**Best Practice:**
Use \`chmod\` to set appropriate permissions, especially for scripts.

### 13. Use HEALTHCHECK

Implement health checks for container monitoring.

**Why it matters:**
Helps detect compromised or malfunctioning containers.

**Best Practice:**
Add \`HEALTHCHECK\` instruction with appropriate intervals.

### 14. Sign and Verify Images

Use Docker Content Trust for image signing.

**Why it matters:**
Ensures image authenticity and integrity.

**Best Practice:**
Enable DCT in production environments.

### 15. Keep Images Updated

Regularly rebuild images with latest security patches.

**Why it matters:**
Old images accumulate vulnerabilities over time.

**Best Practice:**
Automate image rebuilds and implement dependency updates.

## Automated Dockerfile Security with GuardScan

GuardScan automatically checks all 15 of these security practices and more:

- **Static Analysis:** Scans Dockerfiles for security anti-patterns
- **Base Image Analysis:** Verifies image sources and versions
- **Secret Detection:** Finds hardcoded credentials in Dockerfiles
- **Vulnerability Scanning:** Checks for CVEs in dependencies
- **Best Practice Validation:** Ensures compliance with Docker security guidelines

## Common Dockerfile Vulnerabilities

### Privilege Escalation

Running as root allows attackers to escape containers and compromise the host.

### Exposed Secrets

Hardcoded credentials in any layer can be extracted by attackers.

### Outdated Dependencies

Vulnerable packages provide easy entry points for attackers.

### Excessive Permissions

World-writable files and directories can be exploited.

## Docker Security Best Practices Summary

**DO:**
- Use official minimal base images
- Run as non-root user
- Implement multi-stage builds
- Scan for vulnerabilities regularly
- Use secrets management
- Keep images updated

**DON'T:**
- Use \`:latest\` tags in production
- Run containers as root
- Store secrets in images
- Include build tools in final image
- Ignore security warnings
- Use untrusted base images

## Implementing in CI/CD

Integrate Dockerfile security scanning into your pipeline:

1. **Pre-commit hooks:** Catch issues before they're committed
2. **CI pipeline:** Automated scanning on every build
3. **Registry scanning:** Continuous monitoring of stored images
4. **Runtime monitoring:** Detect anomalies in production

## Conclusion

Dockerfile security is critical for protecting your containerized applications. By following these 15 essential checks and using automated tools like GuardScan, you can:

- Reduce attack surface significantly
- Prevent credential leaks
- Ensure compliance with security standards
- Build more reliable container images

Start securing your Dockerfiles today with GuardScan's comprehensive container security analysis.`,
    codeExamples: [
      {
        language: "dockerfile",
        title: "Insecure Dockerfile (Bad)",
        code: `FROM ubuntu:latest
RUN apt-get update && apt-get install -y python3
COPY . /app
WORKDIR /app
ENV API_KEY=sk-1234567890abcdef
RUN pip install -r requirements.txt
CMD ["python3", "app.py"]`,
      },
      {
        language: "dockerfile",
        title: "Secure Dockerfile (Good)",
        code: `FROM python:3.11-alpine@sha256:abc123...
WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install dependencies in separate layer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY --chown=appuser:appgroup . .

# Switch to non-root user
USER appuser

# Set proper permissions
RUN chmod 644 app.py

HEALTHCHECK --interval=30s --timeout=3s \\
  CMD python3 -c "import requests; requests.get('http://localhost:8000/health')"

EXPOSE 8000
CMD ["python3", "app.py"]`,
      },
      {
        language: "bash",
        title: "Scan Dockerfile with GuardScan",
        code: `# Scan Dockerfile for security issues
guardscan docker scan

# Scan specific Dockerfile
guardscan docker scan -f ./path/to/Dockerfile

# Generate report with remediation
guardscan docker scan --format html > docker-security-report.html`,
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
    title: "Running AI Code Review Completely Offline with Ollama",
    description:
      "Configure GuardScan to use local AI models with Ollama for 100% offline, privacy-preserving code analysis.",
    category: "Privacy",
    date: "2024-12-10",
    readTime: "11 min read",
    image: "🏠",
    excerpt:
      "Take full control of your AI code review with Ollama. Learn how to run models like Llama 3, CodeLlama, and Mistral locally for completely private, offline security analysis.",
    keywords: [
      "Ollama",
      "local AI",
      "privacy",
      "offline code review",
      "Llama",
      "self-hosted AI",
    ],
    author: {
      name: "GuardScan AI Team",
      role: "AI Infrastructure Engineers",
    },
    content: `# Running AI Code Review Completely Offline with Ollama

Privacy-conscious developers need AI code review that doesn't send code to external APIs. With Ollama and GuardScan, you can run powerful AI models completely offline on your own hardware.

## Why Local AI Models?

**Privacy Benefits:**
- Code never leaves your infrastructure
- No data retention by third-party providers
- Complete control over your intellectual property
- Compliance with strict data regulations

**Operational Benefits:**
- No API costs or rate limits
- Works without internet connectivity
- Faster response times for local queries
- Customizable models for your specific needs

## Prerequisites

Before starting, ensure you have:
- macOS, Linux, or Windows with WSL2
- At least 8GB RAM (16GB+ recommended)
- 10GB+ free disk space
- Docker (optional, for containerized deployment)

## Installing Ollama

### macOS

Download and install from the official Ollama website:

\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

### Linux

\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

### Windows (WSL2)

Install WSL2 first, then follow Linux instructions.

### Verify Installation

\`\`\`bash
ollama --version
\`\`\`

## Recommended Models for Code Review

### 1. CodeLlama 34B (Best Balance)

Specifically trained for code understanding and generation.

**Pros:**
- Excellent code comprehension
- Good security pattern recognition
- Reasonable resource requirements

**Cons:**
- Requires 16GB+ RAM
- Slower than smaller models

### 2. Llama 3 8B (Fast and Efficient)

General-purpose model with good code capabilities.

**Pros:**
- Fast inference times
- Lower resource requirements
- Good general reasoning

**Cons:**
- Less specialized for code
- May miss nuanced security issues

### 3. Mistral 7B (Privacy + Speed)

Excellent performance for its size.

**Pros:**
- Fast and efficient
- Good code understanding
- Runs on 8GB RAM

**Cons:**
- Smaller context window
- Less detailed explanations

### 4. Deepseek Coder 33B (Most Accurate)

State-of-the-art coding model.

**Pros:**
- Best code analysis accuracy
- Excellent security detection
- Detailed explanations

**Cons:**
- High resource requirements
- Slower inference

## Pulling Models

Download your chosen model:

\`\`\`bash
# CodeLlama 34B (recommended for security)
ollama pull codellama:34b

# Llama 3 8B (good balance)
ollama pull llama3:8b

# Mistral 7B (fast)
ollama pull mistral:7b

# Deepseek Coder (most accurate)
ollama pull deepseek-coder:33b
\`\`\`

## Configuring GuardScan with Ollama

### 1. Initialize GuardScan

If you haven't already initialized GuardScan:

\`\`\`bash
guardscan init
\`\`\`

### 2. Configure Ollama Provider

Edit your \`.guardscan.yml\` configuration:

\`\`\`yaml
ai:
  provider: ollama
  model: codellama:34b
  endpoint: http://localhost:11434
  temperature: 0.2
  maxTokens: 4096
\`\`\`

### 3. Test Configuration

Verify Ollama is running and configured correctly:

\`\`\`bash
ollama list
guardscan test-ai
\`\`\`

## Optimizing Local AI Performance

### 1. GPU Acceleration

If you have an NVIDIA GPU, Ollama automatically uses it. Verify with:

\`\`\`bash
ollama run codellama:34b "print GPU info"
\`\`\`

### 2. Memory Management

Adjust model settings for your available RAM:

\`\`\`yaml
ai:
  contextWindow: 4096  # Reduce if running out of memory
  numGpu: 1            # Number of GPU layers to offload
  numThread: 8         # CPU threads to use
\`\`\`

### 3. Batch Processing

For large codebases, enable batch processing:

\`\`\`yaml
scanning:
  batchSize: 10
  concurrent: 2
  cacheResults: true
\`\`\`

## Running Your First Offline Scan

### Basic Scan

\`\`\`bash
guardscan scan
\`\`\`

### AI-Enhanced Scan

\`\`\`bash
guardscan scan --ai-review
\`\`\`

### Full Security Audit

\`\`\`bash
guardscan scan --ai-review --deep --format html
\`\`\`

## Advanced Configuration

### Multiple Model Strategy

Use different models for different tasks:

\`\`\`yaml
ai:
  models:
    fast:
      provider: ollama
      model: mistral:7b
      tasks: [linting, formatting]
    
    accurate:
      provider: ollama
      model: codellama:34b
      tasks: [security, architecture]
    
    specialized:
      provider: ollama
      model: deepseek-coder:33b
      tasks: [vulnerability-detection]
\`\`\`

### Custom Prompts

Fine-tune AI behavior for your needs:

\`\`\`yaml
ai:
  prompts:
    security: |
      You are a security expert reviewing code.
      Focus on OWASP Top 10 vulnerabilities.
      Be concise but thorough.
      Flag any potential security issues.
\`\`\`

### Temperature Tuning

Adjust creativity vs. consistency:

\`\`\`yaml
ai:
  temperature: 0.1  # More consistent (security)
  # OR
  temperature: 0.7  # More creative (refactoring)
\`\`\`

## Comparing Local vs Cloud AI

| Feature | Local (Ollama) | Cloud (GPT-4) |
|---------|---------------|---------------|
| **Privacy** | 100% Private | Data sent to API |
| **Cost** | Free after setup | $0.03-$0.12 per request |
| **Speed** | Fast (local) | Network dependent |
| **Accuracy** | Very Good | Excellent |
| **Setup** | Some effort | Minimal |
| **Offline** | ✓ Yes | ✗ No |

## Troubleshooting

### Ollama Not Starting

\`\`\`bash
# Check if Ollama is running
ps aux | grep ollama

# Restart Ollama
killall ollama
ollama serve
\`\`\`

### Out of Memory Errors

Reduce context window or switch to smaller model:

\`\`\`yaml
ai:
  model: llama3:8b  # Smaller model
  contextWindow: 2048  # Smaller context
\`\`\`

### Slow Performance

Enable GPU acceleration:

\`\`\`bash
# Install CUDA drivers (NVIDIA)
# Then verify GPU usage:
nvidia-smi

# Ollama will automatically use GPU
\`\`\`

## Docker Deployment

Run Ollama in a container:

\`\`\`dockerfile
FROM ollama/ollama:latest

# Pre-pull models
RUN ollama pull codellama:34b

EXPOSE 11434
CMD ["ollama", "serve"]
\`\`\`

Deploy:

\`\`\`bash
docker build -t local-ai .
docker run -d -p 11434:11434 --gpus all local-ai
\`\`\`

## Best Practices

**DO:**
- Start with smaller models and scale up
- Cache AI results to avoid redundant analysis
- Use GPU acceleration when available
- Monitor resource usage
- Keep models updated

**DON'T:**
- Run large models without adequate RAM
- Use high temperatures for security analysis
- Skip testing configurations
- Ignore performance metrics
- Forget to update Ollama

## Real-World Performance

Benchmarks on MacBook Pro M2 with 16GB RAM:

| Model | Speed | Accuracy | RAM Usage |
|-------|-------|----------|-----------|
| Mistral 7B | 50 tokens/s | Good | 6GB |
| Llama 3 8B | 45 tokens/s | Very Good | 8GB |
| CodeLlama 34B | 15 tokens/s | Excellent | 14GB |
| Deepseek 33B | 12 tokens/s | Best | 16GB |

## Conclusion

Running AI code review locally with Ollama provides:
- **Complete privacy** - Your code never leaves your infrastructure
- **Cost savings** - No API fees or usage limits
- **Offline capability** - Works without internet
- **Customization** - Fine-tune models for your needs

Start using local AI with GuardScan today for privacy-first code security analysis.`,
    codeExamples: [
      {
        language: "bash",
        title: "Install and Setup Ollama",
        code: `# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull recommended model
ollama pull codellama:34b

# Test model
ollama run codellama:34b "Explain SQL injection"`,
      },
      {
        language: "yaml",
        title: "GuardScan Ollama Configuration",
        code: `# .guardscan.yml
ai:
  provider: ollama
  model: codellama:34b
  endpoint: http://localhost:11434
  temperature: 0.2
  maxTokens: 4096
  
scanning:
  aiReview: true
  cacheResults: true
  batchSize: 10`,
      },
      {
        language: "bash",
        title: "Run Offline AI Code Review",
        code: `# Start Ollama service
ollama serve &

# Run GuardScan with local AI
guardscan scan --ai-review

# Generate detailed report
guardscan scan --ai-review --format html > security-report.html`,
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
    title: "Best SAST Tools in 2025: Complete Comparison",
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
    content: `# Best SAST Tools in 2025: Complete Comparison

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
curl -fsSL https://ollama.ai/install.sh | sh

# Download model
ollama pull codellama:13b

# Run offline AI review
guardscan scan --ai-review
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

# Quick secrets scan
guardscan security --focus secrets

# High sensitivity mode (more thorough, may have false positives)
guardscan security --sensitivity high

# Scan specific directory
guardscan security --path ./src --focus secrets

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

# Set up pre-commit hook
guardscan install-hooks

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
guardscan security --focus secrets --fail-on high

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
      - run: guardscan security --focus secrets --fail-on high
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
guardscan security --focus secrets
guardscan install-hooks
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

# Pre-commit hook
guardscan install-hooks

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
guardscan install-hooks

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

# 3. Set up pre-commit hooks
guardscan install-hooks

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
    description:
      "Complete guide to integrating security scanning into CI/CD pipelines. Covers GitHub Actions, GitLab CI, Jenkins, and CircleCI.",
    category: "DevOps",
    date: "2025-01-17",
    readTime: "14 min read",
    image: "⚙️",
    excerpt:
      "Security scanning should be automated, not manual. Learn how to integrate GuardScan and other security tools into your CI/CD pipeline for continuous security testing.",
    keywords: [
      "CI/CD security",
      "automated security testing",
      "DevSecOps",
      "pipeline security",
      "continuous security",
      "security automation",
    ],
    author: {
      name: "GuardScan DevOps Team",
      role: "DevSecOps Engineers",
    },
    content: `# CI/CD Security: Integrating Code Scanning into Your Pipeline

Manual security testing is slow, inconsistent, and doesn't scale with modern development velocity. This comprehensive guide shows you how to automate security scanning in your CI/CD pipeline for continuous protection across GitHub Actions, GitLab CI, Jenkins, and CircleCI.

## Why Automate Security Scanning?

### The Problem with Manual Security Testing

**Manual testing issues:**
- Inconsistent coverage
- Human error
- Slow feedback (days/weeks)
- Doesn't scale with team size
- Often skipped under pressure
- Expensive security consultants
- Testing happens too late

**The cost of late detection:**
- Production bugs: 100x more expensive to fix
- Security incidents: Average $4.24M per breach
- Reputation damage: Immeasurable
- Emergency hotfixes: Disrupt development

### Benefits of Automated Security Scanning

**Immediate Benefits:**
- ✅ Catch vulnerabilities before production
- ✅ Consistent security standards
- ✅ Fast feedback (minutes, not days)
- ✅ No manual effort required
- ✅ Scales with team growth
- ✅ Audit trail for compliance

**Long-term Benefits:**
- ✅ Reduced security debt
- ✅ Lower remediation costs
- ✅ Improved security culture
- ✅ Compliance automation
- ✅ Developer security education
- ✅ Measurable security metrics

## The Shift-Left Security Approach

Move security testing earlier in the development lifecycle:

**Traditional Approach (Shift-Right):**
\`\`\`
Code → Build → Deploy → Test (Manual) → Production → Security Incident
Cost: Very High | Time: Weeks | Risk: Extreme
\`\`\`

**Modern Approach (Shift-Left):**
\`\`\`
Pre-Commit → PR → Build → Deploy → Production
    ↓         ↓      ↓        ↓         ↓
  Local     CI/CD  SAST    DAST    Monitor
   Scan     Scan          
Cost: Very Low | Time: Minutes | Risk: Minimal
\`\`\`

## Security Scanning Stages

### Stage 1: Pre-Commit (Developer Machine)

**Goal:** Catch obvious issues before they're committed

**What to scan:**
- Secrets detection (API keys, passwords)
- Basic code patterns
- Formatting/linting

**Tools:** GuardScan pre-commit hooks

**Setup:**
\`\`\`bash
# Install GuardScan
npm install -g guardscan

# Set up pre-commit hook
guardscan install-hooks

# Now automatic on every commit
git commit -m "Add feature"
# → GuardScan runs automatically
# → Blocks commit if secrets found
\`\`\`

**Benefits:**
- Immediate feedback (<5 seconds)
- No CI/CD resources used
- Private (runs locally)
- Zero false escapes

### Stage 2: Pull Request (CI Pipeline)

**Goal:** Comprehensive security scan before code review

**What to scan:**
- Full SAST analysis
- Dependency vulnerabilities
- OWASP Top 10 checks
- Code coverage
- Compliance checks

**Tools:** GuardScan in CI, linters, formatters

**Typical duration:** 2-5 minutes

### Stage 3: Main Branch (After Merge)

**Goal:** Validation and comprehensive scanning

**What to scan:**
- Complete security suite
- Container scanning
- IaC security (Terraform, Kubernetes)
- Compliance validation
- Security metrics

**Typical duration:** 5-15 minutes

### Stage 4: Pre-Deployment (Staging)

**Goal:** Runtime and configuration testing

**What to scan:**
- Dynamic application testing (DAST)
- Penetration testing
- Integration security
- Configuration validation

**Tools:** OWASP ZAP, custom scripts

## Platform-Specific Integration

### GitHub Actions

**Basic Setup:**
\`\`\`yaml
name: Security Scan
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Install GuardScan
        run: npm install -g guardscan

      - name: Run Security Scan
        run: guardscan security

      - name: Upload Security Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: security-report
          path: guardscan-report.md
\`\`\`

**Advanced Setup with Failure Thresholds:**
\`\`\`yaml
name: Advanced Security Pipeline
on:
  pull_request:
    branches: [main, develop]

jobs:
  quick-scan:
    name: Quick Security Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install GuardScan
        run: npm install -g guardscan
      
      - name: Quick Secrets Scan
        run: guardscan security --focus secrets --fail-on critical
        
  full-scan:
    name: Complete Security Analysis
    runs-on: ubuntu-latest
    needs: quick-scan
    steps:
      - uses: actions/checkout@v3
      
      - name: Install GuardScan
        run: npm install -g guardscan
      
      - name: Full Security Scan
        id: scan
        run: |
          guardscan security --format json > security-report.json
          guardscan security --fail-on high
      
      - name: Parse Results
        if: always()
        run: |
          CRITICAL=$(jq '[.findings[] | select(.severity=="critical")] | length' security-report.json)
          HIGH=$(jq '[.findings[] | select(.severity=="high")] | length' security-report.json)
          echo "Critical: $CRITICAL, High: $HIGH"
          echo "critical=$CRITICAL" >> $GITHUB_OUTPUT
          echo "high=$HIGH" >> $GITHUB_OUTPUT
      
      - name: Comment on PR
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚨 Security scan found critical vulnerabilities. Review the security report artifact for details.'
            })
      
      - name: Upload Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: security-report
          path: |
            security-report.json
            guardscan-report.md
          retention-days: 30
\`\`\`

**Matrix Strategy (Multiple Languages):**
\`\`\`yaml
jobs:
  security:
    strategy:
      matrix:
        path: ['frontend', 'backend', 'mobile']
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g guardscan
      - run: guardscan security --path \${{ matrix.path }}
\`\`\`

### GitLab CI/CD

**Basic .gitlab-ci.yml:**
\`\`\`yaml
stages:
  - security
  - test
  - deploy

security_scan:
  stage: security
  image: node:20
  
  script:
    - npm install -g guardscan
    - guardscan security --fail-on high
  
  artifacts:
    when: always
    paths:
      - guardscan-report.md
    reports:
      junit: guardscan-results.xml
    expire_in: 30 days
  
  only:
    - merge_requests
    - main
    - develop
\`\`\`

**Advanced with Caching:**
\`\`\`yaml
security_scan:
  stage: security
  image: node:20
  
  cache:
    key: guardscan-$CI_COMMIT_REF_SLUG
    paths:
      - node_modules/
      - .guardscan/
  
  before_script:
    - npm install -g guardscan
  
  script:
    - guardscan security --format json > security-report.json
    - |
      CRITICAL=$(jq '[.findings[] | select(.severity=="critical")] | length' security-report.json)
      if [ $CRITICAL -gt 0 ]; then
        echo "Found $CRITICAL critical vulnerabilities"
        exit 1
      fi
  
  artifacts:
    when: always
    paths:
      - security-report.json
      - guardscan-report.md
\`\`\`

### Jenkins

**Declarative Pipeline:**
\`\`\`groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install GuardScan') {
            steps {
                sh 'npm install -g guardscan'
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    sh 'guardscan security --format json > security-report.json'
                }
            }
        }
        
        stage('Evaluate Results') {
            steps {
                script {
                    def report = readJSON file: 'security-report.json'
                    def critical = report.findings.count { it.severity == 'critical' }
                    def high = report.findings.count { it.severity == 'high' }
                    
                    echo "Critical: ${critical}, High: ${high}"
                    
                    if (critical > 0) {
                        error("Found ${critical} critical vulnerabilities")
                    }
                    
                    if (high > 3) {
                        unstable("Found ${high} high-severity vulnerabilities")
                    }
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'security-report.json,guardscan-report.md'
            
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'guardscan-report.md',
                reportName: 'Security Report'
            ])
        }
        
        failure {
            emailext(
                subject: "Security Scan Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Check the security report for details.",
                to: "${env.SECURITY_TEAM_EMAIL}"
            )
        }
    }
}
\`\`\`

### CircleCI

**config.yml:**
\`\`\`yaml
version: 2.1

jobs:
  security_scan:
    docker:
      - image: cimg/node:20.0
    
    steps:
      - checkout
      
      - restore_cache:
          keys:
            - guardscan-v1-{{ checksum "package-lock.json" }}
      
      - run:
          name: Install GuardScan
          command: npm install -g guardscan
      
      - save_cache:
          key: guardscan-v1-{{ checksum "package-lock.json" }}
          paths:
            - ~/.npm
      
      - run:
          name: Run Security Scan
          command: |
            guardscan security --format json > security-report.json
            guardscan security --fail-on high
      
      - store_artifacts:
          path: security-report.json
          destination: security-report
      
      - store_artifacts:
          path: guardscan-report.md
          destination: security-report-md
      
      - store_test_results:
          path: guardscan-results.xml

workflows:
  version: 2
  test_and_scan:
    jobs:
      - security_scan:
          filters:
            branches:
              only:
                - main
                - develop
\`\`\`

## Best Practices

### 1. Fast Feedback Loop

**Do:**
- Run quick scans (<2 min) on every commit
- Full scans on pull requests
- Comprehensive scans on main branch only

**Don't:**
- Run 20-minute scans on every commit
- Block developers with slow pipelines

**Example Strategy:**
\`\`\`yaml
# Fast on every push
quick_scan:
  - guardscan security --focus secrets

# Full scan on PR
full_scan:
  - guardscan security
  
# Comprehensive on main
complete_scan:
  - guardscan security
  - container scan
  - IaC scan
\`\`\`

### 2. Meaningful Thresholds

**Configure failure thresholds:**
\`\`\`yaml
security_thresholds:
  critical: 0     # Block: Any critical issue
  high: 3         # Block: More than 3 high severity
  medium: 10      # Block: More than 10 medium
  low: 999        # Allow: Don't block on low severity
\`\`\`

**GuardScan CLI:**
\`\`\`bash
# Block only on critical
guardscan security --fail-on critical

# Block on high and above
guardscan security --fail-on high

# Block on medium and above
guardscan security --fail-on medium
\`\`\`

### 3. Clear Communication

**Comment on Pull Requests:**
\`\`\`yaml
- name: Comment on PR with Results
  if: failure()
  uses: actions/github-script@v6
  with:
    script: |
      const report = require('./security-report.json');
      const critical = report.findings.filter(f => f.severity === 'critical').length;
      const high = report.findings.filter(f => f.severity === 'high').length;
      
      const body = \`## 🚨 Security Scan Results
      
      **Critical:** ${critical}
      **High:** ${high}
      
      Please review the security report artifact for full details.
      
      ### Quick Fixes:
      - Remove any hardcoded secrets
      - Update vulnerable dependencies
      - Review OWASP Top 10 violations
      \`;
      
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: body
      });
\`\`\`

### 4. Separate Security Jobs

**Benefits of separation:**
- Parallel execution (faster)
- Clearer failure reasons
- Independent retrying
- Better metrics

**Example:**
\`\`\`yaml
jobs:
  secrets-scan:
    runs-on: ubuntu-latest
    steps:
      - run: guardscan security --focus secrets
  
  dependency-scan:
    runs-on: ubuntu-latest
    steps:
      - run: guardscan security --focus dependencies
  
  code-scan:
    runs-on: ubuntu-latest
    steps:
      - run: guardscan security --focus code
\`\`\`

### 5. Caching for Speed

**GitHub Actions:**
\`\`\`yaml
- name: Cache GuardScan
  uses: actions/cache@v3
  with:
    path: |
      ~/.guardscan
      ~/.npm
    key: \${{ runner.os }}-guardscan-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-guardscan-
\`\`\`

**GitLab CI:**
\`\`\`yaml
cache:
  key: $CI_COMMIT_REF_SLUG
  paths:
    - .guardscan/
    - node_modules/
\`\`\`

### 6. Security Baseline

**Track improvements over time:**
\`\`\`bash
# First scan - establish baseline
guardscan security > baseline-report.json

# Future scans - compare to baseline
guardscan security --compare baseline-report.json
\`\`\`

## Handling Scan Results

### Option 1: Fail the Build (Recommended)

**Best for:** Critical security issues

\`\`\`bash
# Block on any critical vulnerability
guardscan security --fail-on critical

# Exit code 1 if found
\`\`\`

### Option 2: Warning Only

**Best for:** Gradual rollout or tech debt

\`\`\`bash
# Scan but don't fail
guardscan security || echo "Security issues found, review recommended"
\`\`\`

### Option 3: Create Issues Automatically

**Best for:** Tracking and prioritization

\`\`\`yaml
- name: Create GitHub Issues for Findings
  run: |
    guardscan security --format json | \
    jq -r '.findings[] | select(.severity=="critical") | 
      "**Title:** Security: " + .title + "\\n\\n**Description:**\\n" + .description + "\\n\\n**Severity:** " + .severity' | \
    while IFS= read -r issue; do
      gh issue create \
        --title "$(echo "$issue" | grep 'Title:' | cut -d' ' -f3-)" \
        --body "$issue" \
        --label "security,critical"
    done
\`\`\`

### Option 4: Send to Security Dashboard

**Best for:** Enterprise monitoring

\`\`\`yaml
- name: Send Metrics to Dashboard
  run: |
    curl -X POST https://security-dashboard.company.com/api/scans \
      -H "Content-Type: application/json" \
      -d @security-report.json
\`\`\`

## Monitoring and Metrics

### Key Metrics to Track

**Scan Metrics:**
- Scan duration
- Success/failure rate
- Coverage percentage

**Vulnerability Metrics:**
- Critical/high/medium/low counts
- Time to remediation
- Vulnerability trends

**Team Metrics:**
- False positive rate
- Developer feedback
- Adoption rate

**Example Dashboard:**
\`\`\`javascript
{
  "total_scans": 1547,
  "vulnerabilities_found": 234,
  "vulnerabilities_fixed": 198,
  "average_fix_time": "2.3 days",
  "critical_open": 0,
  "high_open": 3,
  "scan_duration_avg": "2.1 minutes"
}
\`\`\`

## Common Pitfalls to Avoid

### ❌ Don't Do This:

**1. Blocking All Builds for Low-Severity Issues**
\`\`\`bash
# BAD: Blocks on every tiny issue
guardscan security --fail-on low
\`\`\`

**2. No Thresholds**
\`\`\`bash
# BAD: All or nothing
guardscan security  # Always fails or always passes
\`\`\`

**3. Ignoring Results**
\`\`\`bash
# BAD: Scanning without action
guardscan security || true  # Ignores failures
\`\`\`

**4. Skipping Hotfixes**
\`\`\`yaml
# BAD: No security on urgent fixes
if: github.ref != 'hotfix/*'
\`\`\`

**5. Outdated Tools**
Never update security scanner → miss new vulnerability patterns

### ✅ Do This Instead:

**1. Reasonable Thresholds**
\`\`\`bash
# GOOD: Block on critical/high only
guardscan security --fail-on high
\`\`\`

**2. Clear Error Messages**
\`\`\`yaml
- name: Security Scan
  run: guardscan security --fail-on high
  continue-on-error: false
  
- name: Explain Failure
  if: failure()
  run: |
    echo "::error::Security scan failed. Review the security report for details."
    echo "::error::Fix critical/high vulnerabilities before merging."
\`\`\`

**3. Track and Remediate**
\`\`\`yaml
- name: Create Tracking Issues
  if: failure()
  run: create-security-issues.sh
\`\`\`

**4. Scan Everything**
\`\`\`yaml
# GOOD: All branches scanned
on: [push, pull_request]
\`\`\`

**5. Keep Tools Updated**
\`\`\`yaml
# Auto-update weekly
- run: npm install -g guardscan@latest
\`\`\`

## Complete Example Pipeline

**Production-Ready GitHub Actions:**
\`\`\`yaml
name: Complete Security Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # Weekly full scan

jobs:
  quick-scan:
    name: Quick Security Check
    runs-on: ubuntu-latest
    timeout-minutes: 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Install GuardScan
        run: npm install -g guardscan
      
      - name: Secrets Scan (Fast)
        run: guardscan security --focus secrets --fail-on critical
  
  full-scan:
    name: Full Security Analysis
    runs-on: ubuntu-latest
    needs: quick-scan
    if: github.event_name == 'pull_request'
    timeout-minutes: 10
    
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Cache Dependencies
        uses: actions/cache@v3
        with:
          path: ~/.guardscan
          key: \${{ runner.os }}-guardscan-\${{ hashFiles('**/package-lock.json') }}
      
      - name: Install GuardScan
        run: npm install -g guardscan
      
      - name: Full Security Scan
        run: |
          guardscan security --format json > security-report.json
          guardscan security --fail-on high
      
      - name: Upload Reports
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: security-reports
          path: |
            security-report.json
            guardscan-report.md
          retention-days: 90
      
      - name: Comment on PR
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚨 Security scan found vulnerabilities. Review the security report artifact.'
            })
  
  compliance:
    name: Compliance Check
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g guardscan
      - run: guardscan security --compliance soc2
      - run: guardscan security --compliance pci-dss
\`\`\`

## Conclusion

Automated security scanning in your CI/CD pipeline:
1. ✅ Catches vulnerabilities before production
2. ✅ Provides consistent security standards
3. ✅ Reduces manual security burden
4. ✅ Speeds up development (not slows it down)
5. ✅ Reduces remediation costs by 100x

**Getting Started (5 minutes):**

\`\`\`bash
# 1. Install GuardScan
npm install -g guardscan

# 2. Test locally
guardscan security

# 3. Add to CI/CD
# Copy the GitHub Actions example above to .github/workflows/security.yml

# 4. Commit and push
git add .github/workflows/security.yml
git commit -m "Add security scanning"
git push
\`\`\`

Start securing your pipeline today - your future self will thank you.`,
    codeExamples: [],
    relatedArticles: [
      "ci-cd-integration",
      "github-security-scanning",
      "guardscan-quickstart",
    ],
  },

  "open-source-sast-tools": {
    slug: "open-source-sast-tools",
    title: "Open Source SAST Tools: Complete Guide for 2025",
    description:
      "Comprehensive guide to the best free and open-source static application security testing (SAST) tools for every language and use case.",
    category: "Security",
    date: "2025-01-15",
    readTime: "15 min read",
    image: "🆓",
    excerpt:
      "Don't overpay for security scanning. This comprehensive guide covers the best free and open-source SAST tools, from GuardScan to Semgrep, with real-world comparisons.",
    keywords: [
      "open source SAST",
      "free security tools",
      "open source security scanning",
      "free SAST tools",
      "security testing tools",
    ],
    author: {
      name: "GuardScan Team",
      role: "Open Source Advocates",
    },
    content: `# Open Source SAST Tools: Complete Guide for 2025

Commercial SAST tools can cost $10K-100K+/year, but you don't need to spend a fortune for effective security scanning. This comprehensive guide covers the best free and open-source static application security testing (SAST) tools, helping you choose the right stack for your needs.

## Why Choose Open Source SAST?

### Benefits of Open Source Security Tools

**Cost Savings:**
- Zero licensing fees
- No per-user charges
- No vendor lock-in
- Free forever

**Privacy & Control:**
- Run on your infrastructure
- No code uploaded to third parties
- Complete data ownership
- Audit the source code yourself

**Community & Transparency:**
- Open development process
- Community-driven improvements
- Rapid bug fixes
- Transparent security

**Flexibility:**
- Customize rules
- Integrate anywhere
- Self-host if needed
- Extend functionality

### Challenges

**Trade-offs to consider:**
- Less polished user interfaces
- Community support (not enterprise SLA)
- More setup required
- Self-hosting infrastructure needed (some tools)

**Bottom line:** For most teams, these trade-offs are worth the cost savings.

## Top Open Source SAST Tools

### 1. GuardScan ⭐ Best for Privacy & Ease of Use

**What makes it special:**
- 100% local execution (no code uploads)
- Works completely offline
- Multi-AI provider support (GPT-4, Claude, Ollama)
- 2-minute setup

**Pricing:** FREE forever (MIT license)

**Languages Supported:**
JavaScript, TypeScript, Python, Java, Go, Ruby, PHP, C#, and more

**Key Features:**
- Secrets detection (20+ credential types)
- OWASP Top 10 coverage
- AI-powered code review (optional)
- Dockerfile security scanning
- Fast (<2 minutes for most projects)
- Pre-commit hooks
- CI/CD integration

**Installation:**
\`\`\`bash
# Install globally
npm install -g guardscan

# Initialize in project
cd your-project
guardscan init

# Run security scan
guardscan security

# Install pre-commit hooks
guardscan install-hooks
\`\`\`

**Pros:**
- ✅ Complete privacy (local-only)
- ✅ Zero cost
- ✅ Very fast
- ✅ Easy setup (2 minutes)
- ✅ Works offline
- ✅ Multi-AI support
- ✅ No server required

**Cons:**
- ⚠️ Newer tool (smaller community)
- ⚠️ No web dashboard (CLI only)
- ⚠️ Limited historical tracking

**Best for:** Startups, privacy-conscious teams, fast feedback, offline environments

**Getting Started:**
\`\`\`bash
npx guardscan security
\`\`\`

### 2. Semgrep - Best for Custom Rules

**What makes it special:**
Fast pattern-based scanning with easy custom rule creation

**Pricing:** 
- Open source: FREE
- Cloud (Team): $20/developer/month
- Enterprise: Custom pricing

**Languages:** 20+ including Go, Java, JavaScript, Python, Ruby, C#, PHP, Terraform

**Key Features:**
- Fast pattern matching
- Custom rule creation (YAML)
- 2,000+ built-in rules
- IDE integration
- CI/CD integration
- Cloud dashboard (paid)

**Installation:**
\`\`\`bash
# Via pip
pip install semgrep

# Via Homebrew
brew install semgrep

# Run scan
semgrep --config=auto .

# Custom rules
semgrep --config=p/security-audit .
\`\`\`

**Custom Rule Example:**
\`\`\`yaml
rules:
  - id: dangerous-eval
    patterns:
      - pattern: eval(...)
    message: Dangerous use of eval()
    severity: WARNING
    languages: [javascript]
\`\`\`

**Pros:**
- ✅ Very fast
- ✅ Easy custom rules
- ✅ Great documentation
- ✅ Active community
- ✅ Wide language support

**Cons:**
- ⚠️ Cloud service for advanced features
- ⚠️ Free tier has limitations
- ⚠️ Requires internet for cloud features

**Best for:** Teams wanting custom rules, polyglot projects, fast scans

### 3. SonarQube Community Edition - Best for Code Quality + Security

**What makes it special:**
Combines code quality metrics with security scanning

**Editions:**
- Community: FREE
- Developer: $150/month
- Enterprise: $30,000+/year

**Languages:** 27+ including Java, C#, JavaScript, Python, PHP, Go

**Key Features:**
- Code quality metrics
- Security hotspots
- Technical debt tracking
- Quality gates
- Historical trends
- Team dashboards
- Pull request decoration

**Installation:**
\`\`\`bash
# Docker (easiest)
docker run -d -p 9000:9000 sonarqube:community

# Or download
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-10.0.0.zip

# Scan project
sonar-scanner \
  -Dsonar.projectKey=my-project \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000
\`\`\`

**Pros:**
- ✅ Comprehensive analysis
- ✅ Code quality + security
- ✅ Good UI/dashboards
- ✅ Quality gates
- ✅ Mature ecosystem
- ✅ Historical tracking

**Cons:**
- ❌ Requires server infrastructure
- ❌ Heavy resource usage (2GB+ RAM)
- ❌ Complex setup
- ❌ Community edition has limitations

**Best for:** Teams wanting quality gates, enterprises, comprehensive analysis

### 4. Bandit - Best for Python

**Python-specific security scanner**

**Installation:**
\`\`\`bash
pip install bandit

# Scan project
bandit -r your_project/

# With config file
bandit -r . -c .bandit.yml
\`\`\`

**What it detects:**
- SQL injection
- Shell injection
- Hardcoded passwords
- Insecure cryptography
- XML vulnerabilities
- Assert usage
- Unsafe YAML loading

**Pros:**
- ✅ Python-specific (fewer false positives)
- ✅ Fast
- ✅ Easy to use
- ✅ Customizable
- ✅ CI/CD integration

**Cons:**
- ⚠️ Python only

**Best for:** Python projects exclusively

### 5. Brakeman - Best for Ruby on Rails

**Rails-specific security scanner**

**Installation:**
\`\`\`bash
gem install brakeman

# Scan Rails app
brakeman --path /path/to/rails/app

# Output to JSON
brakeman -o report.json
\`\`\`

**What it detects:**
- SQL injection
- XSS vulnerabilities
- CSRF issues
- Mass assignment
- Unsafe redirects
- File access
- Command injection

**Pros:**
- ✅ Rails-specific accuracy
- ✅ Very fast
- ✅ No configuration needed
- ✅ Confidence ratings

**Cons:**
- ⚠️ Rails only

**Best for:** Ruby on Rails applications

### 6. ESLint Security Plugins - Best for JavaScript

**Security-focused linting for JavaScript/TypeScript**

**Installation:**
\`\`\`bash
npm install --save-dev eslint-plugin-security eslint-plugin-no-unsanitized

# .eslintrc.json
{
  "plugins": ["security", "no-unsanitized"],
  "extends": ["plugin:security/recommended"]
}

# Run
eslint .
\`\`\`

**What it detects:**
- XSS vulnerabilities
- Regex DoS
- Unsafe eval usage
- Insecure random numbers
- Prototype pollution

**Pros:**
- ✅ Integrates with existing ESLint
- ✅ Real-time IDE feedback
- ✅ Fast
- ✅ Pre-commit integration

**Cons:**
- ⚠️ Limited to JavaScript/TypeScript
- ⚠️ Pattern-based (may miss complex issues)

**Best for:** JavaScript/TypeScript projects with existing ESLint

### 7. gosec - Best for Go

**Go-specific security checker**

**Installation:**
\`\`\`bash
go install github.com/securego/gosec/v2/cmd/gosec@latest

# Scan project
gosec ./...

# JSON output
gosec -fmt json -out results.json ./...
\`\`\`

**What it detects:**
- SQL injection
- Command injection
- File inclusions
- Weak crypto
- Hardcoded credentials
- Integer overflow

**Pros:**
- ✅ Go-specific (accurate)
- ✅ Fast
- ✅ Easy integration
- ✅ Low false positives

**Cons:**
- ⚠️ Go only

**Best for:** Go projects

### 8. SpotBugs + Find Security Bugs - Best for Java

**Java bytecode analyzer**

**Installation:**
\`\`\`bash
# Maven
<plugin>
  <groupId>com.github.spotbugs</groupId>
  <artifactId>spotbugs-maven-plugin</artifactId>
  <version>4.8.0.0</version>
</plugin>

# Run
mvn spotbugs:check
\`\`\`

**What it detects:**
- SQL injection
- XSS
- Path traversal
- XXE
- Insecure crypto
- LDAP injection

**Pros:**
- ✅ Mature (successor to FindBugs)
- ✅ Analyzes bytecode
- ✅ Maven/Gradle integration

**Cons:**
- ⚠️ Java only
- ⚠️ Can be slow on large projects

**Best for:** Java/Kotlin projects

## Feature Comparison Matrix

| Tool | Languages | Setup | Speed | Offline | Server | Cost |
|------|-----------|-------|-------|---------|--------|------|
| **GuardScan** | 7+ | ⚡ Easy | ⚡ Fast | ✅ Yes | ❌ No | Free |
| **Semgrep** | 20+ | ⚡ Easy | ⚡⚡ Very Fast | Partial | ❌ No | Free/Paid |
| **SonarQube CE** | 27+ | ⚠️ Hard | Medium | ✅ Yes | ✅ Required | Free |
| **Bandit** | Python | ⚡ Easy | ⚡ Fast | ✅ Yes | ❌ No | Free |
| **Brakeman** | Ruby | ⚡ Easy | ⚡ Fast | ✅ Yes | ❌ No | Free |
| **ESLint Security** | JS/TS | ⚡ Easy | ⚡ Fast | ✅ Yes | ❌ No | Free |
| **gosec** | Go | ⚡ Easy | ⚡ Fast | ✅ Yes | ❌ No | Free |
| **SpotBugs** | Java | Medium | Slow | ✅ Yes | ❌ No | Free |

## Recommended Tool Stacks

### Stack 1: Startup/Small Team (Budget: $0)

**Primary SAST:** GuardScan
**Language-Specific:** Add as needed (Bandit for Python, gosec for Go, etc.)
**CI/CD:** GuardScan in GitHub Actions

\`\`\`bash
# Development
npm install -g guardscan
guardscan install-hooks

# CI/CD
guardscan security --fail-on high
\`\`\`

**Total Cost:** $0
**Setup Time:** 10 minutes
**Coverage:** Excellent

### Stack 2: Multi-Language Project

**General SAST:** GuardScan + Semgrep
**Python:** Bandit
**Ruby:** Brakeman
**Go:** gosec
**JavaScript:** ESLint Security

\`\`\`bash
# Install all
npm install -g guardscan
pip install semgrep bandit
gem install brakeman
go install github.com/securego/gosec/v2/cmd/gosec@latest

# Run all
guardscan security
semgrep --config=auto .
bandit -r python_src/
brakeman rails_app/
gosec ./go_src/...
\`\`\`

**Total Cost:** $0
**Setup Time:** 30 minutes
**Coverage:** Comprehensive

### Stack 3: Enterprise with Infrastructure

**Primary:** GuardScan (local dev)
**Secondary:** SonarQube CE (quality gates)
**Specific:** Semgrep (custom rules)
**Language:** Tool per language

**Setup:**
1. GuardScan for all developers (local)
2. SonarQube server for CI/CD pipeline
3. Language-specific tools in parallel
4. Semgrep for custom security patterns

**Total Cost:** $0 (infrastructure costs only)
**Setup Time:** 1-2 days
**Coverage:** Enterprise-grade

## Integration Examples

### Multi-Tool GitHub Actions

\`\`\`yaml
name: Multi-Tool Security Scan

jobs:
  guardscan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g guardscan
      - run: guardscan security --fail-on high

  semgrep:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install semgrep
      - run: semgrep --config=auto . --json > semgrep.json

  python-security:
    if: hashFiles('**/*.py') != ''
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install bandit
      - run: bandit -r . -f json -o bandit.json

  go-security:
    if: hashFiles('**/*.go') != ''
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-go@v4
      - run: go install github.com/securego/gosec/v2/cmd/gosec@latest
      - run: gosec -fmt json -out gosec.json ./...
\`\`\`

### Pre-commit Hook (All Tools)

\`\`\`bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running security checks..."

# GuardScan (primary)
guardscan security --focus secrets --fail-on critical || exit 1

# Language-specific
if [ -d "python_src" ]; then
  bandit -r python_src/ -ll || exit 1
fi

if [ -d "go_src" ]; then
  gosec ./go_src/... || exit 1
fi

echo "✅ All security checks passed"
\`\`\`

## Best Practices

### 1. Layer Multiple Tools

Don't rely on one tool:
\`\`\`bash
# General security
guardscan security

# Custom patterns
semgrep --config=custom-rules.yml .

# Language-specific deep analysis
bandit -r . # Python
gosec ./... # Go
\`\`\`

**Why:** Different tools have different strengths and blind spots.

### 2. Start Simple, Add Complexity

**Week 1:** GuardScan only
**Week 2-3:** Add language-specific tools
**Month 2:** Add Semgrep with custom rules
**Month 3:** Add SonarQube if needed

### 3. Automate Everything

\`\`\`yaml
# CI/CD pipeline
- Pre-commit: GuardScan (secrets)
- PR: GuardScan + Semgrep (full scan)
- Main: All tools (comprehensive)
- Nightly: SonarQube (deep analysis)
\`\`\`

### 4. Tune and Customize

\`\`\`yaml
# .guardscan.yml
ignore_patterns:
  - "test/**"
  - "vendor/**"

severity_threshold: "high"

custom_rules:
  - pattern: "password.*=.*\".*\""
    severity: "critical"
\`\`\`

### 5. Track Metrics

Monitor over time:
- Vulnerabilities found
- False positive rate
- Time to remediation
- Coverage percentage
- Tool performance

## Commercial vs Open Source

### When Open Source is Better:

- ✅ Budget constraints ($0 budget)
- ✅ Privacy requirements (regulated industry)
- ✅ Customization needs (custom rules)
- ✅ Simple projects (don't need all features)
- ✅ Learning/experimentation

### When Commercial Makes Sense:

- ❌ Need 24/7 enterprise support
- ❌ Want fully managed service
- ❌ Require advanced compliance features
- ❌ Large teams (100+ developers)
- ❌ Complex integrations needed

**Reality:** Most teams can use open source successfully.

## Getting Started Checklist

- [ ] Choose primary SAST tool (**GuardScan recommended**)
- [ ] Install and test locally
- [ ] Add language-specific tools for your stack
- [ ] Set up CI/CD integration
- [ ] Configure pre-commit hooks
- [ ] Establish severity thresholds
- [ ] Document process for team
- [ ] Schedule regular scans
- [ ] Track security metrics

## Quick Start Commands

\`\`\`bash
# 1. Install GuardScan (primary tool)
npm install -g guardscan

# 2. Run first scan
cd your-project
guardscan security

# 3. Set up pre-commit hook
guardscan install-hooks

# 4. Add language-specific tools
pip install bandit          # Python
gem install brakeman        # Ruby
go install gosec@latest     # Go
npm install eslint-plugin-security  # JavaScript

# 5. Run all tools
guardscan security
bandit -r .
brakeman
gosec ./...
\`\`\`

## Conclusion

Open source SAST tools provide enterprise-grade security without the enterprise price tag. For most teams, the recommended stack is:

**Recommended Stack:**
1. **GuardScan** - Primary SAST (all languages)
2. **Semgrep** - Custom rules and patterns
3. **Language-specific tools** - Deep language analysis
4. **SonarQube CE** - Optional, for quality gates

**Total Cost:** $0
**Setup Time:** 1 hour
**Coverage:** 80-90% of what commercial tools provide

Start with GuardScan today - it's free, fast, and respects your privacy:

\`\`\`bash
npm install -g guardscan
guardscan security
\`\`\`

Your code (and budget) will thank you.`,
    codeExamples: [],
    relatedArticles: [
      "best-sast-tools-2025",
      "guardscan-quickstart",
      "ci-cd-integration",
    ],
  },
};
