import {
  Github,
  Twitter,
  FileText,
  Shield,
  Package,
  Coffee,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BUY_ME_A_COFFEE_URL } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">GuardScan</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Privacy-first AI code review that runs locally on your machine.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  to="/docs"
                  className="hover:text-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ntanwir10/GuardScan/blob/main/cli/CHANGELOG.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Examples
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ntanwir10/GuardScan/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href={BUY_ME_A_COFFEE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Support Project
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/ntanwir10/GuardScan/blob/main/PRIVACY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ntanwir10/GuardScan/blob/main/TERMS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ntanwir10/GuardScan/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ntanwir10/GuardScan/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} GuardScan. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ntanwir10/GuardScan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/ntanwir10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.npmjs.com/package/guardscan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Package className="w-5 h-5" />
            </a>
            <a
              href={BUY_ME_A_COFFEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Buy Me a Coffee"
            >
              <Coffee className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
