// Generated from real GuardScan 1.1.2 output on a sample Express API with planted vulnerabilities.
// Do not edit by hand: re-capture and regenerate. Only the absolute project path is shortened to ~/acme-api.

export interface DemoStep {
  command: string;
  output: string[];
}

export interface DemoFinding {
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  location: string;
  message: string;
}

export interface DemoSession {
  id: string;
  label: string;
  summary: string;
  steps: DemoStep[];
  exitCode: number;
  report?: {
    file: string;
    counts: Record<"critical" | "high" | "medium" | "low", number>;
    findings: DemoFinding[];
  };
}

export const DEMO_VERSION = "1.1.2";
export const DEMO_PROJECT = "acme-api";

export const DEMO_SESSIONS: DemoSession[] = [
  {
    "id": "security",
    "label": "security",
    "summary": "Static security scan, fully offline",
    "steps": [
      {
        "command": "guardscan security --offline",
        "output": [
          "🛡️  GuardScan Security Scan",
          "",
          "Repository: acme-api",
          "",
          "✓ Report saved: ~/acme-api/guardscan-security-2026-11-15T19-37-06-888Z.md",
          "",
          "🔒 Security Summary",
          "  critical: 11",
          "  high: 13",
          "  medium: 9",
          "  low: 8",
          "  Coverage: complete",
          "  Policy: passed"
        ]
      }
    ],
    "exitCode": 0,
    "report": {
      "file": "guardscan-security-2026-11-15T19-37-06-888Z.md",
      "counts": {
        "critical": 11,
        "high": 13,
        "medium": 9,
        "low": 8
      },
      "findings": [
        {
          "severity": "critical",
          "category": "Docker Security",
          "location": "Dockerfile:5",
          "message": "Potential hardcoded secret in ENV variable"
        },
        {
          "severity": "critical",
          "category": "Hardcoded Secrets",
          "location": "src/db.js:6",
          "message": "Potential hardcoded credentials or secrets detected"
        },
        {
          "severity": "critical",
          "category": "command-injection",
          "location": "src/server.js:15",
          "message": "Command execution with variable input - review for injection risk"
        },
        {
          "severity": "critical",
          "category": "dangerous-function",
          "location": "src/server.js:19",
          "message": "Use of eval() is dangerous"
        },
        {
          "severity": "high",
          "category": "Docker Security",
          "location": "Dockerfile",
          "message": "No USER directive - container runs as root"
        },
        {
          "severity": "high",
          "category": "sql-injection",
          "location": "src/server.js:10",
          "message": "Potential SQL injection via string concatenation"
        }
      ]
    }
  },
  {
    "id": "vuln",
    "label": "vuln",
    "summary": "Dependency CVEs from OSV, with fixed versions",
    "steps": [
      {
        "command": "guardscan config --offline false",
        "output": [
          "✓ Offline mode disabled"
        ]
      },
      {
        "command": "guardscan vuln db update",
        "output": [
          "Vulnerability snapshot updated: 65 packages, 22 affected package/advisory pairs"
        ]
      },
      {
        "command": "guardscan vuln",
        "output": [
          "Dependency Vulnerabilities",
          "",
          "HIGH     CVE-2024-45590 body-parser@1.19.0",
          "  body-parser vulnerable to denial of service when url encoding is enabled",
          "  Update to 1.20.3 or later (package-lock.json)",
          "HIGH     CVE-2026-111181 body-parser@1.19.0",
          "  body-parser vulnerable to Denial of Service via trailing bytes after a compressed request body",
          "  Update to 1.20.9 or later (package-lock.json)",
          "LOW      CVE-2026-12590 body-parser@1.19.0",
          "  body-parser vulnerable to denial of service when invalid limit value silently disables size enforcement",
          "  Update to 1.20.6 or later (package-lock.json)",
          "LOW      CVE-2024-47764 cookie@0.4.0",
          "  cookie accepts cookie name, path, and domain with out of bounds characters",
          "  Update to 0.7.0 or later (package-lock.json)",
          "MEDIUM   CVE-2024-29041 express@4.17.1",
          "  Express.js Open Redirect in malformed URLs",
          "  Update to 4.19.2 or later (package-lock.json)",
          "MEDIUM   CVE-2024-43796 express@4.17.1",
          "  express vulnerable to XSS via response.redirect()",
          "  Update to 4.20.0 or later (package-lock.json)",
          "HIGH     CVE-2022-23539 jsonwebtoken@8.5.1",
          "  jsonwebtoken unrestricted key type could lead to legacy keys usage",
          "  Update to 9.0.0 or later (package-lock.json)",
          "MEDIUM   CVE-2022-23540 jsonwebtoken@8.5.1",
          "  jsonwebtoken vulnerable to signature validation bypass due to insecure default algorithm in jwt.verify()",
          "  Update to 9.0.0 or later (package-lock.json)",
          "MEDIUM   CVE-2022-23541 jsonwebtoken@8.5.1",
          "  jsonwebtoken's insecure implementation of key retrieval function could lead to Forgeable Public/Private Tokens from RSA to HMAC",
          "  Update to 9.0.0 or later (package-lock.json)",
          "MEDIUM   CVE-2020-28500 lodash@4.17.20",
          "  Regular Expression Denial of Service (ReDoS) in lodash",
          "  Update to 4.17.21 or later (package-lock.json)",
          "HIGH     CVE-2021-23337 lodash@4.17.20",
          "  Command Injection in lodash",
          "  Update to 4.17.21 or later (package-lock.json)",
          "MEDIUM   CVE-2025-13465 lodash@4.17.20",
          "  Lodash has Prototype Pollution Vulnerability in `_.unset`, `_.omit`, and `_.pullAt` functions",
          "  Update to 4.17.23 or later (package-lock.json)",
          "HIGH     CVE-2026-4800 lodash@4.17.20",
          "  lodash vulnerable to Code Injection via `_.template` imports key names",
          "  Update to 4.18.0 or later (package-lock.json)",
          "HIGH     CVE-2024-45296 path-to-regexp@0.1.7",
          "  path-to-regexp vulnerable to Regular Expression Denial of Service via multiple route parameters",
          "  Update to 0.1.10 or later (package-lock.json)",
          "HIGH     CVE-2024-52798 path-to-regexp@0.1.7",
          "  path-to-regexp contains a ReDoS",
          "  Update to 0.1.12 or later (package-lock.json)",
          "HIGH     CVE-2022-24999 qs@6.7.0",
          "  qs vulnerable to Prototype Pollution",
          "  Update to 6.7.3 or later (package-lock.json)",
          "MEDIUM   CVE-2025-15284 qs@6.7.0",
          "  qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion",
          "  Update to 6.14.1 or later (package-lock.json)",
          "MEDIUM   CVE-2026-110816 qs@6.7.0",
          "  qs : qs.stringify with arrayFormat 'comma' throws an uncaught TypeError on array elements carrying a non-callable own toString (DoS)",
          "  Update to 6.16.1 or later (package-lock.json)",
          "LOW      CVE-2026-2391 qs@6.7.0",
          "  qs's arrayLimit bypass in comma parsing allows denial of service",
          "  Update to 6.14.2 or later (package-lock.json)",
          "MEDIUM   CVE-2026-82417 qs@6.7.0",
          "  qs: Denial of Service via Attacker Controlled isBuffer",
          "  Update to 6.16.0 or later (package-lock.json)",
          "MEDIUM   CVE-2024-43799 send@0.17.1",
          "  send vulnerable to template injection that can lead to XSS",
          "  Update to 0.19.0 or later (package-lock.json)",
          "MEDIUM   CVE-2024-43800 serve-static@1.14.1",
          "  serve-static vulnerable to template injection that can lead to XSS",
          "  Update to 1.16.0 or later (package-lock.json)",
          "",
          "65 packages covered; 22 affected package/advisory pairs",
          "CISA KEV enrichment: fresh-cache"
        ]
      }
    ],
    "exitCode": 0
  },
  {
    "id": "ci",
    "label": "security --ci",
    "summary": "Fail the build on high-severity findings",
    "steps": [
      {
        "command": "guardscan security --offline --ci",
        "output": [
          "🛡️  GuardScan Security Scan",
          "",
          "Repository: acme-api",
          "",
          "✓ Report saved: guardscan-security.json",
          "",
          "🔒 Security Summary",
          "  critical: 11",
          "  high: 13",
          "  medium: 9",
          "  low: 8",
          "  Coverage: complete",
          "  Policy: policy-failed",
          "    - 24 finding(s) at or above high severity"
        ]
      }
    ],
    "exitCode": 1
  }
];
