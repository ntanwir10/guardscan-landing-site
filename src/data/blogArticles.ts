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
    content: `
# Why Privacy-First Code Review Matters in 2025

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

**Try GuardScan today and experience truly private code review.**
    `,
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

# All processing happens locally - zero data leaves your machine`
      }
    ],
    relatedArticles: ["local-ai-ollama-setup", "ai-code-review-best-practices", "owasp-top-10-guide"]
  },

  "owasp-top-10-guide": {
    slug: "owasp-top-10-guide",
    title: "Complete Guide to OWASP Top 10 Vulnerabilities",
    category: "Security",
    description: "A comprehensive breakdown of the OWASP Top 10 security risks and how to detect them automatically in your codebase.",
    date: "2025-01-10",
    readTime: "12 min read",
    image: "🛡️",
    excerpt: "SQL injection, XSS, and broken authentication are just the tip of the iceberg. This guide walks through each OWASP Top 10 vulnerability with real-world code examples and automated detection strategies using GuardScan.",
    keywords: ["OWASP", "security vulnerabilities", "SQL injection", "XSS", "code security"],
    author: {
      name: "GuardScan Team",
      role: "Security Engineers"
    },
    content: `
# Complete Guide to OWASP Top 10 Vulnerabilities

The OWASP Top 10 represents the most critical security risks to web applications. Understanding and mitigating these vulnerabilities is essential for every development team.

## 1. Broken Access Control

**Risk**: Users can access resources they shouldn't have permission to view or modify.

### Example Vulnerability:
\`\`\`javascript
// BAD: No authorization check
app.get('/api/user/:id', (req, res) => {
  const user = db.getUser(req.params.id);
  res.json(user);
});
\`\`\`

### Secure Implementation:
\`\`\`javascript
// GOOD: Proper authorization
app.get('/api/user/:id', authenticateUser, (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = db.getUser(req.params.id);
  res.json(user);
});
\`\`\`

## 2. Cryptographic Failures

**Risk**: Sensitive data exposed due to weak or missing encryption.

### Common Mistakes:
- Using MD5 or SHA1 for passwords
- Storing passwords in plain text
- Using weak encryption algorithms

### Secure Password Hashing:
\`\`\`javascript
const bcrypt = require('bcrypt');

// GOOD: Use bcrypt with proper salt rounds
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}
\`\`\`

## 3. Injection Attacks

**Risk**: Malicious code executed through untrusted input.

### SQL Injection Example:
\`\`\`javascript
// BAD: String concatenation
const query = "SELECT * FROM users WHERE email = '" + email + "'";

// GOOD: Parameterized queries
const query = "SELECT * FROM users WHERE email = ?";
db.query(query, [email]);
\`\`\`

## 4. Insecure Design

**Risk**: Architectural flaws that can't be fixed with implementation changes.

Design security from the ground up:
- Threat modeling
- Security requirements
- Secure development lifecycle

## 5. Security Misconfiguration

**Risk**: Default configurations, unnecessary features, or verbose error messages expose vulnerabilities.

Common misconfigurations:
- Debug mode enabled in production
- Default admin credentials
- Unnecessary ports open
- Detailed error messages

## 6. Vulnerable and Outdated Components

**Risk**: Using libraries with known vulnerabilities.

GuardScan automatically detects:
- Outdated npm packages
- Known CVEs
- Security advisories

## 7. Identification and Authentication Failures

**Risk**: Weak authentication allows account takeover.

### Secure Authentication:
\`\`\`javascript
// Implement rate limiting
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 attempts
});

app.post('/login', loginLimiter, async (req, res) => {
  // Authentication logic
});
\`\`\`

## 8. Software and Data Integrity Failures

**Risk**: Insecure CI/CD pipelines or auto-update mechanisms.

Best practices:
- Code signing
- Integrity checks
- Secure supply chain

## 9. Security Logging and Monitoring Failures

**Risk**: Attacks go undetected without proper logging.

Implement comprehensive logging:
\`\`\`javascript
// Log security events
logger.warn('Failed login attempt', {
  ip: req.ip,
  username: req.body.username,
  timestamp: new Date()
});
\`\`\`

## 10. Server-Side Request Forgery (SSRF)

**Risk**: Application fetches remote resources without validation.

### Vulnerable Code:
\`\`\`javascript
// BAD: No URL validation
app.post('/fetch', async (req, res) => {
  const response = await fetch(req.body.url);
  res.json(await response.json());
});
\`\`\`

### Secure Implementation:
\`\`\`javascript
// GOOD: Whitelist allowed domains
const ALLOWED_DOMAINS = ['api.example.com'];

app.post('/fetch', async (req, res) => {
  const url = new URL(req.body.url);
  if (!ALLOWED_DOMAINS.includes(url.hostname)) {
    return res.status(400).json({ error: 'Invalid domain' });
  }
  const response = await fetch(url.toString());
  res.json(await response.json());
});
\`\`\`

## Automated Detection with GuardScan

GuardScan automatically scans for all OWASP Top 10 vulnerabilities:

\`\`\`bash
guardscan scan --standard owasp
\`\`\`

Get detailed reports with:
- Vulnerability locations
- Severity ratings
- Remediation guidance
- Code snippets

## Conclusion

The OWASP Top 10 provides a roadmap for securing web applications. Regular scanning with tools like GuardScan helps catch vulnerabilities before they reach production.

**Start scanning your codebase today.**
    `,
    codeExamples: [
      {
        language: "javascript",
        title: "SQL Injection Prevention",
        code: `// BAD: String concatenation
const query = "SELECT * FROM users WHERE email = '" + email + "'";

// GOOD: Parameterized queries
const query = "SELECT * FROM users WHERE email = ?";
db.query(query, [email]);`
      },
      {
        language: "javascript",
        title: "Secure Password Hashing",
        code: `const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}`
      }
    ],
    relatedArticles: ["secrets-detection-deep-dive", "dockerfile-security-checklist", "infrastructure-as-code-security"]
  },

  "ai-code-review-best-practices": {
    slug: "ai-code-review-best-practices",
    title: "AI Code Review Best Practices: Beyond Basic Linting",
    category: "AI & Development",
    description: "Learn how to leverage AI-powered code review effectively without vendor lock-in. Compare GPT-4, Claude 3, and local models.",
    date: "2025-01-05",
    readTime: "10 min read",
    image: "🤖",
    excerpt: "Not all AI code reviewers are created equal. Discover how to choose the right AI provider for your needs, optimize token usage, and maintain privacy while getting context-aware suggestions that actually improve your code quality.",
    keywords: ["AI", "code review", "GPT-4", "Claude", "machine learning", "automation"],
    author: {
      name: "GuardScan Team",
      role: "AI Engineers"
    },
    content: `
# AI Code Review Best Practices: Beyond Basic Linting

AI-powered code review has evolved beyond simple pattern matching. Modern AI models can understand context, suggest architectural improvements, and catch subtle bugs that traditional tools miss.

## Choosing the Right AI Provider

### GPT-4 (OpenAI)
**Strengths:**
- Excellent code understanding
- Strong architectural suggestions
- Wide language support

**Best for:** Complex refactoring, architectural decisions

### Claude 3 (Anthropic)
**Strengths:**
- Superior context window (200K tokens)
- Excellent security awareness
- Detailed explanations

**Best for:** Large codebases, security reviews

### Gemini (Google)
**Strengths:**
- Fast response times
- Strong code generation
- Multilingual support

**Best for:** Rapid iteration, polyglot projects

### Local Models (Ollama)
**Strengths:**
- 100% privacy
- No API costs
- Offline operation

**Best for:** Sensitive codebases, air-gapped environments

## Optimizing Token Usage

AI code review can be expensive. Follow these strategies to optimize costs:

### 1. Smart Context Selection
Don't send entire files—send relevant sections:

\`\`\`javascript
// Instead of sending the whole file, extract relevant context
function getRelevantContext(file, lineNumber, contextLines = 10) {
  const lines = file.split('\\n');
  const start = Math.max(0, lineNumber - contextLines);
  const end = Math.min(lines.length, lineNumber + contextLines);
  return lines.slice(start, end).join('\\n');
}
\`\`\`

### 2. Batch Reviews
Group similar issues for a single AI call:

\`\`\`bash
# Review all authentication-related files together
guardscan ai-review --files "src/auth/**/*.ts"
\`\`\`

### 3. Use Appropriate Models
- Use smaller models (GPT-3.5) for simple checks
- Reserve GPT-4 for complex analysis

## Privacy-Preserving AI Review

### The GuardScan Approach

GuardScan lets you choose your privacy level:

**Level 1: Fully Local**
\`\`\`bash
# Use Ollama for 100% offline analysis
guardscan config set ai.provider ollama
guardscan config set ai.model codellama
\`\`\`

**Level 2: Your API Keys**
\`\`\`bash
# Use your own OpenAI/Anthropic keys
guardscan config set ai.provider openai
guardscan config set ai.apiKey your-key-here
\`\`\`

**Level 3: Hybrid**
\`\`\`bash
# Static analysis local, AI for complex cases only
guardscan scan --ai-threshold high
\`\`\`

## Effective Prompting for Code Review

### Generic Prompt (Less Effective)
\`\`\`
Review this code for issues.
\`\`\`

### Specific Prompt (More Effective)
\`\`\`
Review this authentication middleware for:
1. SQL injection vulnerabilities
2. Authentication bypass risks
3. Session management flaws
4. Rate limiting gaps

Focus on security-critical paths.
\`\`\`

## Integrating AI into Your Workflow

### Pre-Commit Hooks
\`\`\`bash
# .husky/pre-commit
guardscan scan --changed-files --ai-review
\`\`\`

### CI/CD Pipeline
\`\`\`yaml
# .github/workflows/code-review.yml
- name: AI Code Review
  run: |
    guardscan scan --ai-review
    guardscan report --format markdown > review.md
\`\`\`

### Pull Request Comments
GuardScan can automatically comment on PRs:

\`\`\`bash
guardscan scan --pr-comments --github-token $GITHUB_TOKEN
\`\`\`

## Measuring AI Review Effectiveness

Track these metrics:
- **False positive rate**: How many AI suggestions are invalid?
- **Bug catch rate**: Bugs found in AI review vs. production
- **Time saved**: Developer hours saved on manual review
- **Cost per review**: Token usage and API costs

## Common Pitfalls to Avoid

### 1. Over-Reliance on AI
AI should augment, not replace, human review.

### 2. Ignoring Context
AI doesn't understand your business logic—provide context.

### 3. Not Validating Suggestions
Always verify AI recommendations before implementing.

### 4. Privacy Leaks
Never send sensitive data to external AI services without proper safeguards.

## Advanced Techniques

### Context-Aware Reviews
\`\`\`javascript
// Provide business context to AI
const context = {
  fileType: 'authentication',
  securityLevel: 'critical',
  complianceRequirements: ['SOC2', 'GDPR'],
  existingVulnerabilities: []
};
\`\`\`

### Custom Rule Sets
\`\`\`yaml
# guardscan.config.yml
ai:
  reviewRules:
    - name: authentication
      prompt: "Focus on auth bypass and session management"
      severity: critical
    - name: data-handling
      prompt: "Check for PII exposure and encryption"
      severity: high
\`\`\`

## Conclusion

AI code review is a powerful tool when used correctly. Choose the right provider for your needs, optimize for cost and privacy, and integrate thoughtfully into your workflow.

**GuardScan gives you the flexibility to use any AI provider while keeping your code secure.**

Start with local models, graduate to cloud providers as needed, and always maintain control over your intellectual property.
    `,
    codeExamples: [
      {
        language: "bash",
        title: "Configure AI Provider",
        code: `# Use local Ollama for privacy
guardscan config set ai.provider ollama
guardscan config set ai.model codellama

# Or use OpenAI with your key
guardscan config set ai.provider openai
guardscan config set ai.apiKey sk-...`
      },
      {
        language: "javascript",
        title: "Smart Context Selection",
        code: `function getRelevantContext(file, lineNumber, contextLines = 10) {
  const lines = file.split('\\n');
  const start = Math.max(0, lineNumber - contextLines);
  const end = Math.min(lines.length, lineNumber + contextLines);
  return lines.slice(start, end).join('\\n');
}`
      }
    ],
    relatedArticles: ["local-ai-ollama-setup", "privacy-first-code-review", "guardscan-quickstart"]
  },

  "secrets-detection-deep-dive": {
    slug: "secrets-detection-deep-dive",
    title: "Secrets Detection: Finding Hidden API Keys in Your Codebase",
    category: "Security",
    description: "Deep dive into secrets detection techniques, including entropy analysis, regex patterns, and Git history scanning.",
    date: "2024-12-28",
    readTime: "9 min read",
    image: "🔑",
    excerpt: "Hardcoded secrets are a ticking time bomb. Learn how GuardScan uses Shannon entropy, pattern matching, and Git history analysis to detect 20+ types of secrets including AWS keys, API tokens, private keys, and JWT tokens.",
    keywords: ["secrets detection", "API keys", "security", "Git history", "entropy analysis"],
    author: {
      name: "GuardScan Team",
      role: "Security Engineers"
    },
    content: `
# Secrets Detection: Finding Hidden API Keys in Your Codebase

Hardcoded secrets are one of the most common and dangerous security vulnerabilities. A single exposed API key can lead to data breaches, financial losses, and compliance violations.

## Why Secrets in Code are Dangerous

### Real-World Incidents
- **Uber (2016)**: $100,000 ransom paid after AWS keys found in GitHub
- **Toyota (2022)**: 300GB source code leak with hardcoded credentials
- **Codecov (2021)**: Supply chain attack exposing customer secrets

### The Cost
- Average data breach cost: $4.45M (IBM, 2023)
- Compliance fines: Up to 4% of annual revenue (GDPR)
- Reputational damage: Immeasurable

## Types of Secrets to Detect

GuardScan detects 20+ secret types:

### Cloud Provider Keys
- AWS Access Keys
- Azure Storage Keys
- Google Cloud API Keys
- DigitalOcean Tokens

### API Tokens
- GitHub Personal Access Tokens
- Stripe API Keys
- Twilio Auth Tokens
- SendGrid API Keys

### Authentication Credentials
- Database passwords
- JWT secrets
- OAuth tokens
- SSH private keys

### Other Sensitive Data
- Encryption keys
- Certificate private keys
- Webhook secrets
- Service account credentials

## Detection Techniques

### 1. Regex Pattern Matching

The foundation of secrets detection:

\`\`\`javascript
// AWS Access Key pattern
const AWS_ACCESS_KEY = /AKIA[0-9A-Z]{16}/;

// GitHub Token pattern
const GITHUB_TOKEN = /ghp_[a-zA-Z0-9]{36}/;

// Generic API key pattern
const GENERIC_API_KEY = /api[_-]?key[_-]?=?['"\\s]*[a-z0-9]{32,}/i;
\`\`\`

### 2. Shannon Entropy Analysis

Detect high-randomness strings that might be secrets:

\`\`\`javascript
function calculateEntropy(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  let entropy = 0;
  const len = str.length;
  
  for (const count of Object.values(freq)) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  
  return entropy;
}

// High entropy strings (> 4.5) are likely secrets
const suspiciousString = "7k9nJ2mP8qR5tY3wE6uI0oP4aS7dF1gH";
console.log(calculateEntropy(suspiciousString)); // ~5.2
\`\`\`

### 3. Git History Scanning

Secrets often hide in commit history:

\`\`\`bash
# Scan entire Git history
guardscan secrets --include-history

# Check specific commits
guardscan secrets --commit-range main..feature-branch
\`\`\`

### 4. Context-Aware Detection

Reduce false positives by analyzing surrounding code:

\`\`\`javascript
// LOW RISK: Test file with fake credentials
// test/auth.test.js
const TEST_API_KEY = "test_1234567890abcdef";

// HIGH RISK: Production configuration
// config/production.js
const API_KEY = "sk_live_1234567890abcdef";
\`\`\`

## Implementing Secrets Detection

### Pre-Commit Hooks

Catch secrets before they reach the repository:

\`\`\`bash
# .husky/pre-commit
#!/bin/sh
guardscan secrets --staged-files

if [ $? -ne 0 ]; then
  echo "⚠️  Secrets detected! Commit blocked."
  echo "Run 'guardscan secrets --fix' to resolve."
  exit 1
fi
\`\`\`

### CI/CD Pipeline

\`\`\`yaml
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]

jobs:
  secrets:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Full history for Git scanning
      
      - name: Install GuardScan
        run: npm install -g guardscan
      
      - name: Scan for Secrets
        run: guardscan secrets --include-history
\`\`\`

### IDE Integration

Real-time detection while coding:

\`\`\`json
// .vscode/settings.json
{
  "guardscan.enableRealTime": true,
  "guardscan.scanOnSave": true,
  "guardscan.showInlineWarnings": true
}
\`\`\`

## Handling False Positives

### Allowlisting

\`\`\`yaml
# guardscan.config.yml
secrets:
  ignore:
    - path: "test/**"
      reason: "Test fixtures with fake credentials"
    - pattern: "EXAMPLE_API_KEY"
      reason: "Documentation placeholder"
\`\`\`

### Secret Comments

Mark false positives inline:

\`\`\`javascript
// guardscan-ignore: not-a-secret
const PUBLIC_KEY = "pk_test_1234567890abcdef";
\`\`\`

## Best Practices

### 1. Environment Variables

\`\`\`javascript
// BAD: Hardcoded
const apiKey = "sk_live_1234567890abcdef";

// GOOD: Environment variable
const apiKey = process.env.API_KEY;
\`\`\`

### 2. Secret Management Services

\`\`\`javascript
// Use AWS Secrets Manager
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

async function getSecret(secretName) {
  const data = await secretsManager
    .getSecretValue({ SecretId: secretName })
    .promise();
  return JSON.parse(data.SecretString);
}
\`\`\`

### 3. Rotate Compromised Secrets

If a secret is exposed:
1. Rotate immediately
2. Revoke old credentials
3. Audit access logs
4. Update all systems
5. Document the incident

### 4. Encrypt Secrets at Rest

\`\`\`bash
# Use git-crypt for encrypted files
git-crypt init
echo "config/secrets.yml filter=git-crypt diff=git-crypt" >> .gitattributes
\`\`\`

## Advanced Detection

### Machine Learning Models

GuardScan Pro uses ML to detect:
- Unusual variable names
- Suspicious assignment patterns
- Context anomalies

### Binary File Scanning

Secrets can hide in compiled artifacts:

\`\`\`bash
# Scan compiled files
guardscan secrets --include-binary
\`\`\`

### Network Traffic Analysis

Detect secrets in:
- HTTP requests/responses
- WebSocket messages
- gRPC calls

## Remediation

### Automatic Fixes

\`\`\`bash
# GuardScan can automatically remediate some issues
guardscan secrets --fix

# This will:
# 1. Move secrets to .env files
# 2. Update code to use environment variables
# 3. Add .env to .gitignore
\`\`\`

### Manual Remediation

For each detected secret:
1. Remove from code
2. Remove from Git history
3. Rotate the credential
4. Implement proper secret management
5. Add to allowlist if false positive

## Monitoring and Alerting

### Slack Integration

\`\`\`bash
guardscan secrets --webhook https://hooks.slack.com/...
\`\`\`

### Email Notifications

\`\`\`yaml
# guardscan.config.yml
secrets:
  notify:
    email: security@company.com
    on: [critical, high]
\`\`\`

## Compliance Requirements

### SOC 2
- Regular secrets scanning
- Automated detection
- Incident response procedures

### PCI DSS
- No hardcoded credentials
- Encryption at rest and in transit
- Access logging

### GDPR
- Data minimization
- Secure credential storage
- Breach notification

## Conclusion

Secrets detection is non-negotiable for modern development. GuardScan provides comprehensive scanning using multiple techniques to catch secrets before they cause damage.

**Start scanning your codebase today:**

\`\`\`bash
npm install -g guardscan
guardscan secrets --include-history
\`\`\`

Your credentials—and your company—will thank you.
    `,
    codeExamples: [
      {
        language: "javascript",
        title: "Shannon Entropy Calculation",
        code: `function calculateEntropy(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  let entropy = 0;
  const len = str.length;
  
  for (const count of Object.values(freq)) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  
  return entropy;
}

// High entropy strings (> 4.5) are likely secrets
const suspiciousString = "7k9nJ2mP8qR5tY3wE6uI0oP4aS7dF1gH";
console.log(calculateEntropy(suspiciousString)); // ~5.2`
      },
      {
        language: "javascript",
        title: "Proper Secret Management",
        code: `// BAD: Hardcoded
const apiKey = "sk_live_1234567890abcdef";

// GOOD: Environment variable
const apiKey = process.env.API_KEY;

// BETTER: Secret management service
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

async function getSecret(secretName) {
  const data = await secretsManager
    .getSecretValue({ SecretId: secretName })
    .promise();
  return JSON.parse(data.SecretString);
}`
      }
    ],
    relatedArticles: ["owasp-top-10-guide", "dockerfile-security-checklist", "infrastructure-as-code-security"]
  },

  "dockerfile-security-checklist": {
    slug: "dockerfile-security-checklist",
    title: "Dockerfile Security: 15 Essential Checks Every Developer Should Run",
    category: "DevOps",
    description: "A practical checklist for securing Docker containers, from base image selection to USER instruction best practices.",
    date: "2024-12-20",
    readTime: "7 min read",
    image: "🐳",
    excerpt: "Insecure Dockerfiles are a common attack vector. This checklist covers base image security, multi-stage builds, secret management, USER instructions, and vulnerability scanning to keep your containers secure.",
    keywords: ["Docker", "containers", "security", "DevOps", "Dockerfile"],
    author: {
      name: "GuardScan Team",
      role: "DevOps Engineers"
    },
    content: `
# Dockerfile Security: 15 Essential Checks Every Developer Should Run

Docker containers are everywhere, but many Dockerfiles contain serious security vulnerabilities. This checklist will help you build secure containers from the ground up.

## 1. Use Specific Base Image Tags

❌ **BAD:**
\`\`\`dockerfile
FROM node
\`\`\`

✅ **GOOD:**
\`\`\`dockerfile
FROM node:20.11.0-alpine3.19
\`\`\`

**Why:** \`latest\` tag can change, introducing vulnerabilities or breaking changes.

## 2. Use Minimal Base Images

❌ **BAD:**
\`\`\`dockerfile
FROM ubuntu:latest
RUN apt-get update && apt-get install -y nodejs
\`\`\`

✅ **GOOD:**
\`\`\`dockerfile
FROM node:20-alpine
\`\`\`

**Why:** Alpine images are ~5MB vs ~100MB for Ubuntu, reducing attack surface.

## 3. Run as Non-Root User

❌ **BAD:**
\`\`\`dockerfile
FROM node:20-alpine
COPY . /app
WORKDIR /app
CMD ["node", "server.js"]
\`\`\`

✅ **GOOD:**
\`\`\`dockerfile
FROM node:20-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
COPY --chown=nodejs:nodejs . /app
WORKDIR /app
CMD ["node", "server.js"]
\`\`\`

**Why:** Root containers can escape to host system.

## 4. Don't Include Secrets

❌ **BAD:**
\`\`\`dockerfile
ENV API_KEY=sk_live_1234567890
\`\`\`

✅ **GOOD:**
\`\`\`dockerfile
# Pass secrets at runtime
# docker run -e API_KEY=$API_KEY myapp
\`\`\`

Or use Docker secrets:
\`\`\`dockerfile
# docker secret create api_key /path/to/key
# docker service create --secret api_key myapp
\`\`\`

## 5. Use Multi-Stage Builds

❌ **BAD:**
\`\`\`dockerfile
FROM node:20
COPY . .
RUN npm install
CMD ["node", "server.js"]
\`\`\`

✅ **GOOD:**
\`\`\`dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:20-alpine
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs
WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .
CMD ["node", "server.js"]
\`\`\`

**Why:** Smaller images, no build tools in production.

## 6. Scan for Vulnerabilities

\`\`\`bash
# Use GuardScan to scan Dockerfile
guardscan dockerfile scan

# Or use Docker Scout
docker scout cves myapp:latest

# Or use Trivy
trivy image myapp:latest
\`\`\`

## 7. Copy Only What's Needed

❌ **BAD:**
\`\`\`dockerfile
COPY . .
\`\`\`

✅ **GOOD:**
\`\`\`dockerfile
COPY package*.json ./
RUN npm ci --only=production
COPY src/ ./src/
\`\`\`

Use \`.dockerignore\`:
\`\`\`
node_modules
.git
.env
*.md
tests/
\`\`\`

## 8. Set Resource Limits

\`\`\`dockerfile
# In docker-compose.yml
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
\`\`\`

## 9. Use HEALTHCHECK

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node healthcheck.js || exit 1
\`\`\`

## 10. Minimize Layers

❌ **BAD:**
\`\`\`dockerfile
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN apt-get clean
\`\`\`

✅ **GOOD:**
\`\`\`dockerfile
RUN apt-get update && \\
    apt-get install -y curl git && \\
    apt-get clean && \\
    rm -rf /var/lib/apt/lists/*
\`\`\`

## 11. Use Specific Ports

❌ **BAD:**
\`\`\`dockerfile
EXPOSE 0-65535
\`\`\`

✅ **GOOD:**
\`\`\`dockerfile
EXPOSE 3000
\`\`\`

## 12. Sign and Verify Images

\`\`\`bash
# Enable Docker Content Trust
export DOCKER_CONTENT_TRUST=1

# Images must be signed to pull
docker pull myregistry/myapp:latest
\`\`\`

## 13. Use Read-Only Root Filesystem

\`\`\`dockerfile
# In docker-compose.yml
services:
  app:
    image: myapp
    read_only: true
    tmpfs:
      - /tmp
      - /app/logs
\`\`\`

## 14. Drop Unnecessary Capabilities

\`\`\`dockerfile
# In docker-compose.yml
services:
  app:
    image: myapp
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
\`\`\`

## 15. Keep Dependencies Updated

\`\`\`dockerfile
# Rebuild regularly to get latest patches
FROM node:20-alpine

# Update base image packages
RUN apk update && apk upgrade

# Use npm audit
RUN npm audit fix
\`\`\`

## Complete Secure Dockerfile Example

\`\`\`dockerfile
# Build stage
FROM node:20.11.0-alpine3.19 AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \\
    npm cache clean --force

# Production stage
FROM node:20.11.0-alpine3.19

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy dependencies from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application code
COPY --chown=nodejs:nodejs package*.json ./
COPY --chown=nodejs:nodejs src/ ./src/

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node healthcheck.js || exit 1

# Start application
CMD ["node", "src/server.js"]
\`\`\`

## Automated Scanning with GuardScan

GuardScan automatically checks all 15 security items:

\`\`\`bash
# Scan Dockerfile
guardscan dockerfile scan

# Get detailed report
guardscan dockerfile scan --verbose --output report.md

# CI/CD integration
guardscan dockerfile scan --fail-on high
\`\`\`

## Conclusion

Secure Dockerfiles require attention to detail, but the payoff is enormous. Follow this checklist to dramatically reduce your container attack surface.

**Scan your Dockerfiles today with GuardScan.**
    `,
    codeExamples: [
      {
        language: "dockerfile",
        title: "Secure Multi-Stage Dockerfile",
        code: `# Build stage
FROM node:20.11.0-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Production stage
FROM node:20.11.0-alpine3.19
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs
WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs src/ ./src/
EXPOSE 3000
HEALTHCHECK --interval=30s CMD node healthcheck.js || exit 1
CMD ["node", "src/server.js"]`
      }
    ],
    relatedArticles: ["infrastructure-as-code-security", "secrets-detection-deep-dive", "owasp-top-10-guide"]
  },

  "guardscan-quickstart": {
    slug: "guardscan-quickstart",
    title: "GuardScan Quickstart: From Zero to First Scan in 2 Minutes",
    category: "Tutorial",
    description: "Step-by-step tutorial to install GuardScan, configure AI providers, and run your first comprehensive code review.",
    date: "2024-12-15",
    readTime: "5 min read",
    image: "⚡",
    excerpt: "Get started with GuardScan in under 2 minutes. This quickstart guide covers installation via npm, initialization, configuration, and running your first security scan with detailed markdown reports.",
    keywords: ["tutorial", "quickstart", "installation", "getting started", "GuardScan"],
    author: {
      name: "GuardScan Team",
      role: "Developer Relations"
    },
    content: `
# GuardScan Quickstart: From Zero to First Scan in 2 Minutes

Get GuardScan up and running in your project in under 2 minutes. This guide covers everything from installation to your first security scan.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A code repository to scan

## Step 1: Install GuardScan (30 seconds)

\`\`\`bash
# Install globally via npm
npm install -g guardscan

# Or with yarn
yarn global add guardscan

# Verify installation
guardscan --version
\`\`\`

## Step 2: Initialize in Your Project (15 seconds)

\`\`\`bash
# Navigate to your project
cd /path/to/your/project

# Initialize GuardScan
guardscan init
\`\`\`

This creates a \`guardscan.config.yml\` file:

\`\`\`yaml
# guardscan.config.yml
version: 1
scans:
  - security
  - secrets
  - dockerfile
  - dependencies
ai:
  enabled: false
  provider: none
output:
  format: markdown
  path: ./guardscan-report.md
\`\`\`

## Step 3: Run Your First Scan (30 seconds)

\`\`\`bash
# Run comprehensive scan
guardscan scan

# Output:
# ✓ Security scan complete: 3 issues found
# ✓ Secrets scan complete: 0 secrets detected
# ✓ Dockerfile scan complete: 2 warnings
# ✓ Dependencies scan complete: 5 vulnerabilities
# 
# Report saved to: ./guardscan-report.md
\`\`\`

## Step 4: Review the Report

Open \`guardscan-report.md\` to see:

- **Security Issues**: SQL injection, XSS, authentication flaws
- **Secret Detection**: API keys, passwords, tokens
- **Dockerfile Issues**: Base image, USER instruction, secrets
- **Dependency Vulnerabilities**: CVEs, outdated packages

## Optional: Enable AI Review (2 minutes)

### Option A: Use Local AI (Ollama)

\`\`\`bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull codellama

# Configure GuardScan
guardscan config set ai.enabled true
guardscan config set ai.provider ollama
guardscan config set ai.model codellama

# Run AI-enhanced scan
guardscan scan --ai-review
\`\`\`

### Option B: Use OpenAI

\`\`\`bash
# Set your API key
guardscan config set ai.enabled true
guardscan config set ai.provider openai
guardscan config set ai.apiKey sk-...

# Run AI-enhanced scan
guardscan scan --ai-review
\`\`\`

### Option C: Use Anthropic Claude

\`\`\`bash
guardscan config set ai.enabled true
guardscan config set ai.provider anthropic
guardscan config set ai.apiKey sk-ant-...

guardscan scan --ai-review
\`\`\`

## Common Commands

\`\`\`bash
# Scan specific file types
guardscan scan --files "src/**/*.ts"

# Scan only for secrets
guardscan secrets

# Scan Dockerfile
guardscan dockerfile scan

# Check dependencies
guardscan dependencies

# Scan with high severity threshold
guardscan scan --severity high

# Export as JSON
guardscan scan --format json --output report.json

# Fix auto-fixable issues
guardscan scan --fix

# Show detailed help
guardscan --help
\`\`\`

## Integrate with Git Hooks

### Pre-Commit Hook

\`\`\`bash
# Install husky
npm install -D husky

# Initialize husky
npx husky init

# Create pre-commit hook
echo "guardscan scan --staged-files --fail-on high" > .husky/pre-commit
chmod +x .husky/pre-commit
\`\`\`

Now GuardScan runs automatically before every commit!

## Integrate with CI/CD

### GitHub Actions

Create \`.github/workflows/security.yml\`:

\`\`\`yaml
name: Security Scan
on: [push, pull_request]

jobs:
  guardscan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install GuardScan
        run: npm install -g guardscan
      
      - name: Run Security Scan
        run: guardscan scan --fail-on high
      
      - name: Upload Report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: guardscan-report
          path: guardscan-report.md
\`\`\`

### GitLab CI

Create \`.gitlab-ci.yml\`:

\`\`\`yaml
security_scan:
  image: node:20
  script:
    - npm install -g guardscan
    - guardscan scan --fail-on high
  artifacts:
    paths:
      - guardscan-report.md
    when: always
\`\`\`

## Configuration Options

### Exclude Files

\`\`\`yaml
# guardscan.config.yml
exclude:
  - node_modules/**
  - dist/**
  - test/**
  - "*.test.ts"
\`\`\`

### Custom Rules

\`\`\`yaml
# guardscan.config.yml
rules:
  security:
    sql-injection: error
    xss: error
    path-traversal: warn
  secrets:
    entropy-threshold: 4.5
    patterns:
      - name: custom-api-key
        pattern: "CUSTOM_[A-Z0-9]{32}"
\`\`\`

### Severity Levels

\`\`\`yaml
# guardscan.config.yml
severity:
  fail-on: high  # Fail CI on high or critical issues
  report-on: medium  # Report medium and above
\`\`\`

## IDE Integration

### VS Code Extension

\`\`\`bash
# Install GuardScan extension
code --install-extension guardscan.vscode-guardscan
\`\`\`

Features:
- Real-time security warnings
- Inline fix suggestions
- One-click remediation

### IntelliJ/WebStorm Plugin

Search for "GuardScan" in plugin marketplace.

## Troubleshooting

### "Command not found"

\`\`\`bash
# Ensure npm global bin is in PATH
echo 'export PATH="$PATH:$(npm config get prefix)/bin"' >> ~/.bashrc
source ~/.bashrc
\`\`\`

### "Permission denied"

\`\`\`bash
# Fix npm permissions
sudo chown -R $USER $(npm config get prefix)
\`\`\`

### Slow scans

\`\`\`bash
# Exclude large directories
guardscan scan --exclude "node_modules/**" --exclude "dist/**"
\`\`\`

## Next Steps

Now that you're up and running:

1. **Review your first report**: Understand the issues GuardScan found
2. **Fix critical issues**: Start with high-severity problems
3. **Configure CI/CD**: Automate security scanning
4. **Enable AI review**: Get context-aware suggestions
5. **Customize rules**: Tailor to your project needs

## Getting Help

- **Documentation**: [docs.guardscan.dev](https://docs.guardscan.dev)
- **GitHub Issues**: [github.com/guardscan/guardscan](https://github.com/guardscan/guardscan)
- **Discord Community**: [discord.gg/guardscan](https://discord.gg/guardscan)
- **Email Support**: support@guardscan.dev

## Conclusion

You're now scanning your code for security issues in under 2 minutes! GuardScan makes security accessible, private, and fast.

**Happy scanning! 🛡️**
    `,
    codeExamples: [
      {
        language: "bash",
        title: "Quick Installation",
        code: `# Install globally
npm install -g guardscan

# Initialize in your project
cd /path/to/your/project
guardscan init

# Run first scan
guardscan scan`
      },
      {
        language: "yaml",
        title: "GitHub Actions Integration",
        code: `name: Security Scan
on: [push, pull_request]

jobs:
  guardscan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install GuardScan
        run: npm install -g guardscan
      - name: Run Scan
        run: guardscan scan --fail-on high`
      }
    ],
    relatedArticles: ["ai-code-review-best-practices", "local-ai-ollama-setup", "secrets-detection-deep-dive"]
  },

  "local-ai-ollama-setup": {
    slug: "local-ai-ollama-setup",
    title: "Running AI Code Review Completely Offline with Ollama",
    category: "Privacy",
    description: "Configure GuardScan to use local AI models with Ollama for 100% offline, privacy-preserving code analysis.",
    date: "2024-12-10",
    readTime: "11 min read",
    image: "🏠",
    excerpt: "Want AI-powered code review without sending code snippets to external APIs? Learn how to set up Ollama with llama2, codellama, or mistral models for completely offline AI analysis that respects your privacy.",
    keywords: ["Ollama", "local AI", "offline", "privacy", "code review", "AI models"],
    author: {
      name: "GuardScan Team",
      role: "AI Engineers"
    },
    content: `
# Running AI Code Review Completely Offline with Ollama

Privacy-conscious developers face a dilemma: AI code review tools are powerful, but they often require sending code to external APIs. Ollama solves this by running AI models entirely on your local machine.

## Why Local AI?

### Privacy Benefits
- **Zero data leakage**: Code never leaves your machine
- **No API tracking**: Complete anonymity
- **Compliance friendly**: Meet strict data residency requirements

### Cost Benefits
- **No API fees**: Unlimited scans
- **No rate limits**: Scan as much as you want
- **One-time setup**: No recurring costs

### Performance Benefits
- **No network latency**: Instant analysis
- **Work offline**: No internet required
- **Predictable speed**: No API throttling

## Prerequisites

- **Hardware**: 8GB+ RAM (16GB recommended)
- **Storage**: 10GB+ free space
- **OS**: macOS, Linux, or Windows (WSL2)
- **CPU**: Modern multi-core processor (Apple Silicon works great!)

## Step 1: Install Ollama

### macOS
\`\`\`bash
# Download and install
curl -fsSL https://ollama.ai/install.sh | sh

# Or with Homebrew
brew install ollama
\`\`\`

### Linux
\`\`\`bash
curl -fsSL https://ollama.ai/install.sh | sh
\`\`\`

### Windows (WSL2)
\`\`\`bash
# In WSL2 terminal
curl -fsSL https://ollama.ai/install.sh | sh
\`\`\`

### Verify Installation
\`\`\`bash
ollama --version
# Output: ollama version 0.1.20
\`\`\`

## Step 2: Download AI Models

Ollama supports multiple models optimized for code:

### CodeLlama (Recommended for Code)
\`\`\`bash
# Small model (7B parameters, 4GB RAM)
ollama pull codellama:7b

# Medium model (13B parameters, 8GB RAM)
ollama pull codellama:13b

# Large model (34B parameters, 20GB RAM)
ollama pull codellama:34b
\`\`\`

### Llama 2 (General Purpose)
\`\`\`bash
ollama pull llama2:7b
ollama pull llama2:13b
\`\`\`

### Mistral (Fast and Efficient)
\`\`\`bash
ollama pull mistral:7b
\`\`\`

### DeepSeek Coder (Specialized for Code)
\`\`\`bash
ollama pull deepseek-coder:6.7b
ollama pull deepseek-coder:33b
\`\`\`

### Model Comparison

| Model | Size | RAM | Speed | Code Quality |
|-------|------|-----|-------|--------------|
| codellama:7b | 4GB | 8GB | Fast | Good |
| codellama:13b | 8GB | 16GB | Medium | Great |
| codellama:34b | 20GB | 32GB | Slow | Excellent |
| deepseek-coder:6.7b | 4GB | 8GB | Fast | Great |
| mistral:7b | 4GB | 8GB | Very Fast | Good |

**Recommendation**: Start with \`codellama:7b\` or \`deepseek-coder:6.7b\` for best balance.

## Step 3: Test Ollama

\`\`\`bash
# Start interactive session
ollama run codellama:7b

# Test with a code review prompt
>>> Review this code for security issues:
>>> function login(username, password) {
>>>   const query = "SELECT * FROM users WHERE username='" + username + "'";
>>>   return db.query(query);
>>> }

# Ollama will analyze and respond with security insights
\`\`\`

Press `Ctrl+D` to exit.

## Step 4: Configure GuardScan

\`\`\`bash
# Enable AI with Ollama
guardscan config set ai.enabled true
guardscan config set ai.provider ollama
guardscan config set ai.model codellama:7b

# Optional: Set custom Ollama host
guardscan config set ai.ollamaHost http://localhost:11434

# Verify configuration
guardscan config list
\`\`\`

## Step 5: Run Your First Local AI Scan

\`\`\`bash
# Full AI-powered scan
guardscan scan --ai-review

# AI review for specific file
guardscan ai-review src/auth/login.ts

# AI review with detailed explanations
guardscan scan --ai-review --ai-verbose
\`\`\`

## Advanced Configuration

### Custom Model Parameters

Edit \`guardscan.config.yml\`:

\`\`\`yaml
ai:
  enabled: true
  provider: ollama
  model: codellama:7b
  ollama:
    host: http://localhost:11434
    temperature: 0.7  # Creativity (0-1)
    topP: 0.9         # Diversity (0-1)
    topK: 40          # Token sampling
    repeatPenalty: 1.1
    contextLength: 4096
    numPredict: 512   # Max response tokens
\`\`\`

### Performance Tuning

\`\`\`bash
# Run Ollama with custom GPU layers (CUDA)
OLLAMA_NUM_GPU=35 ollama serve

# Use more CPU threads
OLLAMA_NUM_THREAD=8 ollama serve

# Increase context window
OLLAMA_CONTEXT_LENGTH=8192 ollama serve
\`\`\`

### Model Quantization

Use smaller quantized models for faster inference:

\`\`\`bash
# 4-bit quantization (smaller, faster, less accurate)
ollama pull codellama:7b-q4_0

# 8-bit quantization (balanced)
ollama pull codellama:7b-q8_0
\`\`\`

## Real-World Examples

### Example 1: SQL Injection Detection

Input code:
\`\`\`javascript
function getUser(id) {
  return db.query(\`SELECT * FROM users WHERE id = \${id}\`);
}
\`\`\`

GuardScan with Ollama:
\`\`\`bash
guardscan ai-review src/database/queries.js
\`\`\`

Ollama response:
\`\`\`
🔴 SQL Injection Vulnerability (Line 2)

This code uses string interpolation to build SQL queries, making it
vulnerable to SQL injection attacks. An attacker could pass malicious
input like "1 OR 1=1" to access all users.

Recommendation:
Use parameterized queries:
  return db.query('SELECT * FROM users WHERE id = ?', [id]);
\`\`\`

### Example 2: Authentication Review

Input code:
\`\`\`javascript
function login(username, password) {
  const user = db.findUser(username);
  if (user && user.password === password) {
    return { token: generateToken(user.id) };
  }
  return null;
}
\`\`\`

Ollama finds multiple issues:
\`\`\`
🔴 Plaintext Password Comparison (Line 3)
Passwords are compared in plaintext, suggesting they're stored
unhashed. Use bcrypt or argon2 for password hashing.

🟡 Timing Attack Vulnerability (Line 3)
Direct string comparison leaks information through timing. Use
constant-time comparison.

🟡 Generic Error Message (Line 6)
Returning null reveals whether the username exists. Return generic
error: "Invalid credentials".
\`\`\`

## Benchmarks

Performance comparison on MacBook Pro M1 (16GB RAM):

| Model | Scan Time | RAM Usage | Quality Score |
|-------|-----------|-----------|---------------|
| codellama:7b | 15s | 5GB | 8/10 |
| codellama:13b | 35s | 12GB | 9/10 |
| deepseek-coder:6.7b | 12s | 5GB | 9/10 |
| GPT-4 (API) | 8s | N/A | 10/10 |
| Claude 3 (API) | 10s | N/A | 10/10 |

**Note**: Local models are 2-4x slower but completely private and free.

## Hybrid Approach

Combine local and cloud AI:

\`\`\`yaml
# guardscan.config.yml
ai:
  enabled: true
  provider: hybrid
  hybrid:
    local:
      provider: ollama
      model: codellama:7b
      use_for: [security, secrets, best-practices]
    cloud:
      provider: openai
      model: gpt-4
      api_key: sk-...
      use_for: [architecture, complex-logic]
\`\`\`

This keeps sensitive code local while using cloud AI for non-sensitive architectural reviews.

## CI/CD Integration

Run Ollama in CI:

\`\`\`yaml
# .github/workflows/security.yml
name: Security Scan

on: [push, pull_request]

jobs:
  guardscan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Ollama
        run: |
          curl -fsSL https://ollama.ai/install.sh | sh
          ollama serve &
          ollama pull codellama:7b
      
      - name: Install GuardScan
        run: npm install -g guardscan
      
      - name: Configure GuardScan
        run: |
          guardscan config set ai.enabled true
          guardscan config set ai.provider ollama
          guardscan config set ai.model codellama:7b
      
      - name: Run AI Scan
        run: guardscan scan --ai-review --fail-on high
\`\`\`

## Troubleshooting

### Issue: "Connection refused"
\`\`\`bash
# Start Ollama service
ollama serve

# In another terminal
guardscan scan --ai-review
\`\`\`

### Issue: "Out of memory"
\`\`\`bash
# Use smaller model
ollama pull codellama:7b-q4_0
guardscan config set ai.model codellama:7b-q4_0
\`\`\`

### Issue: Slow inference
\`\`\`bash
# Use GPU acceleration (NVIDIA)
OLLAMA_NUM_GPU=1 ollama serve

# Or use faster model
ollama pull mistral:7b
guardscan config set ai.model mistral:7b
\`\`\`

## Best Practices

1. **Start small**: Begin with 7B models
2. **Monitor RAM**: Use \`htop\` to watch memory usage
3. **Batch scans**: Review multiple files at once
4. **Cache models**: Ollama caches locally for fast reuse
5. **Update regularly**: \`ollama pull codellama:7b\` for latest weights

## Comparison: Local vs Cloud AI

### When to Use Local (Ollama)
- ✅ Proprietary code
- ✅ Regulated industries (healthcare, finance)
- ✅ Air-gapped environments
- ✅ Cost-sensitive projects
- ✅ Unlimited scanning needs

### When to Use Cloud (OpenAI/Anthropic)
- ✅ Open source projects
- ✅ Maximum accuracy needed
- ✅ Limited local resources
- ✅ Occasional scanning only

### When to Use Hybrid
- ✅ Mixed sensitivity codebase
- ✅ Balance cost and quality
- ✅ Flexible requirements

## Conclusion

Ollama brings powerful AI code review to your local machine with zero privacy compromise. While cloud models like GPT-4 are more accurate, local models offer unmatched privacy and cost savings.

**Get started today:**
\`\`\`bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Download model
ollama pull codellama:7b

# Configure GuardScan
guardscan config set ai.provider ollama
guardscan config set ai.model codellama:7b

# Start scanning privately
guardscan scan --ai-review
\`\`\`

Your code stays on your machine. Your privacy is preserved. Your security is improved.
    `,
    codeExamples: [
      {
        language: "bash",
        title: "Quick Ollama Setup",
        code: `# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Download CodeLlama model
ollama pull codellama:7b

# Configure GuardScan
guardscan config set ai.enabled true
guardscan config set ai.provider ollama
guardscan config set ai.model codellama:7b

# Run AI-powered scan (100% offline)
guardscan scan --ai-review`
      },
      {
        language: "yaml",
        title: "Advanced Ollama Configuration",
        code: `ai:
  enabled: true
  provider: ollama
  model: codellama:7b
  ollama:
    host: http://localhost:11434
    temperature: 0.7
    topP: 0.9
    contextLength: 4096
    numPredict: 512`
      }
    ],
    relatedArticles: ["privacy-first-code-review", "ai-code-review-best-practices", "guardscan-quickstart"]
  },

  "infrastructure-as-code-security": {
    slug: "infrastructure-as-code-security",
    title: "Infrastructure as Code Security: Terraform & Kubernetes Scanning",
    category: "DevOps",
    description: "Secure your cloud infrastructure by detecting misconfigurations in Terraform and Kubernetes manifests.",
    date: "2024-12-05",
    readTime: "10 min read",
    image: "☁️",
    excerpt: "IaC misconfigurations can expose your entire infrastructure. Learn how to scan Terraform files for publicly accessible S3 buckets, overly permissive IAM roles, and Kubernetes security policies with GuardScan's IaC scanner.",
    keywords: ["Infrastructure as Code", "Terraform", "Kubernetes", "cloud security", "DevOps"],
    author: {
      name: "GuardScan Team",
      role: "Cloud Security Engineers"
    },
    content: `
# Infrastructure as Code Security: Terraform & Kubernetes Scanning

Infrastructure as Code (IaC) has revolutionized cloud management, but misconfigurations can expose entire infrastructures to attack. This guide covers scanning Terraform and Kubernetes for security issues.

## Why IaC Security Matters

### Real-World Incidents
- **Capital One (2019)**: Misconfigured WAF led to 100M records exposed
- **Tesla (2018)**: Kubernetes dashboard exposed with no authentication
- **Uber (2016)**: S3 bucket misconfiguration exposed 57M records

### The Stakes
- Public cloud resources accessible to anyone
- Over-privileged IAM roles
- Unencrypted data stores
- Exposed secrets in manifests

## Terraform Security

### Common Terraform Vulnerabilities

#### 1. Public S3 Buckets

❌ **Insecure:**
\`\`\`hcl
resource "aws_s3_bucket" "data" {
  bucket = "company-data"
  acl    = "public-read"  # Dangerous!
}
\`\`\`

✅ **Secure:**
\`\`\`hcl
resource "aws_s3_bucket" "data" {
  bucket = "company-data"
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket = aws_s3_bucket.data.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
\`\`\`

#### 2. Overly Permissive IAM Roles

❌ **Insecure:**
\`\`\`hcl
resource "aws_iam_role_policy" "app" {
  name = "app_policy"
  role = aws_iam_role.app.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "*"  # Too permissive!
      Resource = "*"
    }]
  })
}
\`\`\`

✅ **Secure:**
\`\`\`hcl
resource "aws_iam_role_policy" "app" {
  name = "app_policy"
  role = aws_iam_role.app.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject"
      ]
      Resource = "arn:aws:s3:::my-bucket/*"
    }]
  })
}
\`\`\`

#### 3. Unencrypted Resources

❌ **Insecure:**
\`\`\`hcl
resource "aws_db_instance" "database" {
  identifier        = "mydb"
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  # Missing encryption!
}
\`\`\`

✅ **Secure:**
\`\`\`hcl
resource "aws_db_instance" "database" {
  identifier        = "mydb"
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  storage_encrypted = true
  kms_key_id        = aws_kms_key.database.arn
}

resource "aws_kms_key" "database" {
  description             = "Database encryption key"
  deletion_window_in_days = 10
  enable_key_rotation     = true
}
\`\`\`

### Scanning Terraform with GuardScan

\`\`\`bash
# Scan all Terraform files
guardscan terraform scan

# Scan specific directory
guardscan terraform scan ./infrastructure

# Detailed report
guardscan terraform scan --verbose --output report.json

# Fail CI on high severity
guardscan terraform scan --fail-on high
\`\`\`

## Kubernetes Security

### Common Kubernetes Misconfigurations

#### 1. Running as Root

❌ **Insecure:**
\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: myapp:latest
    # No securityContext - runs as root!
\`\`\`

✅ **Secure:**
\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    image: myapp:latest
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
\`\`\`

#### 2. Privileged Containers

❌ **Insecure:**
\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: myapp:latest
    securityContext:
      privileged: true  # Dangerous!
\`\`\`

✅ **Secure:**
\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: myapp:latest
    securityContext:
      privileged: false
      allowPrivilegeEscalation: false
      capabilities:
        drop:
        - ALL
        add:
        - NET_BIND_SERVICE  # Only specific capabilities
\`\`\`

#### 3. Missing Resource Limits

❌ **Insecure:**
\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: myapp:latest
    # No resource limits - can consume all cluster resources!
\`\`\`

✅ **Secure:**
\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: myapp:latest
    resources:
      requests:
        memory: "128Mi"
        cpu: "250m"
      limits:
        memory: "256Mi"
        cpu: "500m"
\`\`\`

#### 4. Insecure Network Policies

❌ **Insecure:**
\`\`\`yaml
# No NetworkPolicy - all pods can communicate!
\`\`\`

✅ **Secure:**
\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: app-network-policy
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          role: database
    ports:
    - protocol: TCP
      port: 5432
\`\`\`

### Scanning Kubernetes with GuardScan

\`\`\`bash
# Scan all Kubernetes manifests
guardscan kubernetes scan

# Scan specific files
guardscan kubernetes scan ./k8s/*.yaml

# Check deployed resources
guardscan kubernetes scan --live --kubeconfig ~/.kube/config

# Generate secure baseline
guardscan kubernetes generate-baseline
\`\`\`

## Policy as Code

### Open Policy Agent (OPA)

GuardScan integrates with OPA for custom policies:

\`\`\`rego
# policy/terraform.rego
package terraform

deny[msg] {
  resource := input.resource.aws_s3_bucket[name]
  resource.acl == "public-read"
  msg := sprintf("S3 bucket '%s' must not be public", [name])
}

deny[msg] {
  resource := input.resource.aws_db_instance[name]
  not resource.storage_encrypted
  msg := sprintf("RDS instance '%s' must be encrypted", [name])
}
\`\`\`

Run with GuardScan:
\`\`\`bash
guardscan terraform scan --policy ./policy/terraform.rego
\`\`\`

## CI/CD Integration

### GitHub Actions

\`\`\`yaml
name: IaC Security Scan

on:
  pull_request:
    paths:
      - 'terraform/**'
      - 'k8s/**'

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install GuardScan
        run: npm install -g guardscan
      
      - name: Scan Terraform
        run: guardscan terraform scan ./terraform --fail-on high
      
      - name: Scan Kubernetes
        run: guardscan kubernetes scan ./k8s --fail-on high
      
      - name: Upload Results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: iac-scan-results
          path: |
            terraform-report.md
            kubernetes-report.md
\`\`\`

### GitLab CI

\`\`\`yaml
iac_security:
  stage: security
  image: node:20
  script:
    - npm install -g guardscan
    - guardscan terraform scan ./terraform
    - guardscan kubernetes scan ./k8s
  artifacts:
    paths:
      - "*-report.md"
    when: always
\`\`\`

## Best Practices

### 1. Principle of Least Privilege

Always grant minimum necessary permissions:

\`\`\`hcl
# Instead of full access
- Action   = "*"

# Grant specific permissions
- Action = [
    "s3:GetObject",
    "s3:ListBucket"
  ]
\`\`\`

### 2. Enable Encryption

Encrypt everything at rest:

\`\`\`hcl
# S3
resource "aws_s3_bucket" "data" {
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

# RDS
resource "aws_db_instance" "db" {
  storage_encrypted = true
  kms_key_id        = aws_kms_key.db.arn
}

# EBS
resource "aws_ebs_volume" "data" {
  encrypted  = true
  kms_key_id = aws_kms_key.data.arn
}
\`\`\`

### 3. Use Security Groups Restrictively

\`\`\`hcl
# BAD: Open to world
resource "aws_security_group_rule" "allow_all" {
  type              = "ingress"
  from_port         = 0
  to_port           = 65535
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]  # Dangerous!
  security_group_id = aws_security_group.app.id
}

# GOOD: Specific sources only
resource "aws_security_group_rule" "allow_https" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["10.0.0.0/8"]  # Internal only
  security_group_id = aws_security_group.app.id
}
\`\`\`

### 4. Implement Pod Security Standards

\`\`\`yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
\`\`\`

### 5. Enable Audit Logging

\`\`\`hcl
resource "aws_cloudtrail" "main" {
  name                          = "main-trail"
  s3_bucket_name               = aws_s3_bucket.cloudtrail.id
  include_global_service_events = true
  is_multi_region_trail        = true
  enable_log_file_validation   = true
}
\`\`\`

## Compliance Standards

GuardScan checks against:
- **CIS Benchmarks**: AWS, Azure, GCP, Kubernetes
- **PCI DSS**: Payment card industry standards
- **HIPAA**: Healthcare compliance
- **SOC 2**: Security controls
- **NIST 800-53**: Federal security standards

\`\`\`bash
# Scan against specific standard
guardscan terraform scan --standard cis-aws
guardscan kubernetes scan --standard pci-dss
\`\`\`

## Conclusion

IaC security is critical for cloud-native applications. Regular scanning with GuardScan helps prevent misconfigurations before they reach production.

**Start scanning your infrastructure today:**

\`\`\`bash
npm install -g guardscan
guardscan terraform scan
guardscan kubernetes scan
\`\`\`

Secure infrastructure = secure applications.
    `,
    codeExamples: [
      {
        language: "hcl",
        title: "Secure S3 Bucket Configuration",
        code: `resource "aws_s3_bucket" "data" {
  bucket = "company-data"
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket = aws_s3_bucket.data.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`
      },
      {
        language: "yaml",
        title: "Secure Kubernetes Pod",
        code: `apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    image: myapp:latest
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
    resources:
      requests:
        memory: "128Mi"
        cpu: "250m"
      limits:
        memory: "256Mi"
        cpu: "500m"`
      }
    ],
    relatedArticles: ["dockerfile-security-checklist", "secrets-detection-deep-dive", "owasp-top-10-guide"]
  }
};
