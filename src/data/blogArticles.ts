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
    description: "Explore how traditional code review tools compromise your intellectual property and why local-first analysis is the future of secure development.",
    category: "Privacy",
    date: "2025-01-15",
    readTime: "8 min read",
    image: "🔒",
    excerpt: "Every time you upload code to a third-party code review service, you're potentially exposing your company's intellectual property. Learn how GuardScan's privacy-first architecture protects your code while delivering enterprise-grade analysis.",
    keywords: ["privacy", "code review", "security", "intellectual property", "local-first"],
    author: {
      name: "GuardScan Team",
      role: "Security Engineers"
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
cat guardscan-report.md`
      }
    ],
    relatedArticles: ["secrets-detection-deep-dive", "ai-code-review-best-practices", "guardscan-quickstart"]
  },

  "secrets-detection-deep-dive": {
    slug: "secrets-detection-deep-dive",
    title: "Secrets Detection: How to Find API Keys, Tokens & Passwords in Your Codebase",
    description: "Learn advanced techniques for detecting hardcoded secrets, API keys, and credentials in your source code before they reach production.",
    category: "Security",
    date: "2025-01-10",
    readTime: "12 min read",
    image: "🔑",
    excerpt: "Hardcoded secrets are one of the most common security vulnerabilities. Discover how GuardScan's pattern-based and entropy-based detection catches secrets that other tools miss.",
    keywords: ["secrets detection", "API keys", "security scanning", "credential management", "SAST"],
    author: {
      name: "GuardScan Team",
      role: "Security Engineers"
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
guardscan secrets scan --format json > secrets.json`
      }
    ],
    relatedArticles: ["privacy-first-code-review", "guardscan-quickstart", "ci-cd-integration"]
  },

  "ai-code-review-best-practices": {
    slug: "ai-code-review-best-practices",
    title: "AI-Powered Code Review: Best Practices for Maximum Security",
    description: "Maximize the effectiveness of AI code review tools while maintaining privacy and security. Learn when to use AI, which models to choose, and how to integrate AI feedback into your workflow.",
    category: "AI",
    date: "2025-01-05",
    readTime: "10 min read",
    image: "🤖",
    excerpt: "AI can dramatically improve code review quality, but only when used correctly. Learn how to leverage GPT-4, Claude, Gemini, or local models for security analysis without compromising privacy.",
    keywords: ["AI code review", "GPT-4", "Claude", "Ollama", "machine learning", "security"],
    author: {
      name: "GuardScan Team",
      role: "AI Engineers"
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
guardscan scan --ai-review`
      }
    ],
    relatedArticles: ["privacy-first-code-review", "secrets-detection-deep-dive", "guardscan-quickstart"]
  },

  "guardscan-quickstart": {
    slug: "guardscan-quickstart",
    title: "GuardScan QuickStart: Scan Your First Project in 5 Minutes",
    description: "Get started with GuardScan in minutes. This hands-on tutorial walks you through installation, configuration, and your first security scan.",
    category: "Tutorial",
    date: "2024-12-28",
    readTime: "6 min read",
    image: "🚀",
    excerpt: "New to GuardScan? This quickstart guide gets you from zero to scanning in 5 minutes. Learn the essential commands and see real results immediately.",
    keywords: ["tutorial", "quickstart", "getting started", "CLI", "installation"],
    author: {
      name: "GuardScan Team",
      role: "Developer Relations"
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
guardscan scan`
      }
    ],
    relatedArticles: ["privacy-first-code-review", "secrets-detection-deep-dive", "ai-code-review-best-practices"]
  },

  "ci-cd-integration": {
    slug: "ci-cd-integration",
    title: "Integrating GuardScan into Your CI/CD Pipeline",
    description: "Automate security scanning in your CI/CD workflow. Learn how to integrate GuardScan with GitHub Actions, GitLab CI, Jenkins, and more.",
    category: "DevOps",
    date: "2024-12-20",
    readTime: "9 min read",
    image: "⚙️",
    excerpt: "Security scanning should be automatic, not manual. Learn how to integrate GuardScan into your CI/CD pipeline to catch vulnerabilities before they reach production.",
    keywords: ["CI/CD", "GitHub Actions", "GitLab CI", "Jenkins", "automation", "DevOps"],
    author: {
      name: "GuardScan Team",
      role: "DevOps Engineers"
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
      - run: guardscan scan`
      }
    ],
    relatedArticles: ["guardscan-quickstart", "privacy-first-code-review", "secrets-detection-deep-dive"]
  },

  "owasp-top-10-guide": {
    slug: "owasp-top-10-guide",
    title: "Complete Guide to OWASP Top 10 Vulnerabilities",
    description: "A comprehensive breakdown of the OWASP Top 10 security risks and how to detect them automatically in your codebase.",
    category: "Security",
    date: "2025-01-10",
    readTime: "12 min read",
    image: "🛡️",
    excerpt: "SQL injection, XSS, and broken authentication are just the tip of the iceberg. This guide walks through each OWASP Top 10 vulnerability with real-world code examples and automated detection strategies using GuardScan.",
    keywords: ["OWASP", "security vulnerabilities", "SQL injection", "XSS", "authentication", "OWASP Top 10"],
    author: {
      name: "GuardScan Security Team",
      role: "Security Researchers"
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
});`
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
});`
      },
      {
        language: "bash",
        title: "Run OWASP Top 10 Scan",
        code: `# Scan for OWASP Top 10 vulnerabilities
guardscan scan --owasp

# Generate detailed report
guardscan scan --owasp --format html > owasp-report.html

# CI/CD integration
guardscan scan --owasp --fail-on high`
      }
    ],
    relatedArticles: ["secrets-detection-deep-dive", "ai-code-review-best-practices", "ci-cd-integration"]
  },

  "dockerfile-security-checklist": {
    slug: "dockerfile-security-checklist",
    title: "Dockerfile Security: 15 Essential Checks Every Developer Should Run",
    description: "A practical checklist for securing Docker containers, from base image selection to USER instruction best practices.",
    category: "DevOps",
    date: "2024-12-20",
    readTime: "7 min read",
    image: "🐳",
    excerpt: "Insecure Dockerfiles are a common attack vector. This checklist covers base image security, multi-stage builds, secret management, USER instructions, and vulnerability scanning to keep your containers secure.",
    keywords: ["Docker", "container security", "Dockerfile", "DevOps", "container best practices"],
    author: {
      name: "GuardScan DevOps Team",
      role: "Container Security Specialists"
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
CMD ["python3", "app.py"]`
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
CMD ["python3", "app.py"]`
      },
      {
        language: "bash",
        title: "Scan Dockerfile with GuardScan",
        code: `# Scan Dockerfile for security issues
guardscan docker scan

# Scan specific Dockerfile
guardscan docker scan -f ./path/to/Dockerfile

# Generate report with remediation
guardscan docker scan --format html > docker-security-report.html`
      }
    ],
    relatedArticles: ["ci-cd-integration", "owasp-top-10-guide", "guardscan-quickstart"]
  },

  "local-ai-ollama-setup": {
    slug: "local-ai-ollama-setup",
    title: "Running AI Code Review Completely Offline with Ollama",
    description: "Configure GuardScan to use local AI models with Ollama for 100% offline, privacy-preserving code analysis.",
    category: "Privacy",
    date: "2024-12-10",
    readTime: "11 min read",
    image: "🏠",
    excerpt: "Take full control of your AI code review with Ollama. Learn how to run models like Llama 3, CodeLlama, and Mistral locally for completely private, offline security analysis.",
    keywords: ["Ollama", "local AI", "privacy", "offline code review", "Llama", "self-hosted AI"],
    author: {
      name: "GuardScan AI Team",
      role: "AI Infrastructure Engineers"
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
ollama run codellama:34b "Explain SQL injection"`
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
  batchSize: 10`
      },
      {
        language: "bash",
        title: "Run Offline AI Code Review",
        code: `# Start Ollama service
ollama serve &

# Run GuardScan with local AI
guardscan scan --ai-review

# Generate detailed report
guardscan scan --ai-review --format html > security-report.html`
      }
    ],
    relatedArticles: ["privacy-first-code-review", "ai-code-review-best-practices", "guardscan-quickstart"]
  }
};
