import { useState } from "react";
import { Menu, X, Shield, Search } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onSearchClick?: () => void;
}

export const Navigation = ({ onSearchClick }: NavigationProps = {} as NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Features", path: "/features" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "Comparison", path: "/comparison" },
    { name: "Docs", path: "/docs" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gradient">GuardScan</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className="text-foreground/80 hover:text-foreground transition-colors"
                activeClassName="text-primary font-medium"
              >
                {item.name}
              </NavLink>
            ))}
            {onSearchClick && (
              <button
                onClick={onSearchClick}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground border border-border/50 rounded-md bg-background/50 hover:bg-background transition-colors"
                aria-label="Search documentation"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
                <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            )}
            <Button asChild size="sm" className="ml-4">
              <a
                href="https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors py-2"
                  activeClassName="text-primary font-medium"
                >
                  {item.name}
                </NavLink>
              ))}
              <Button asChild size="sm" className="w-full mt-2">
                <a
                  href="https://github.com/ntanwir10/GuardScan/blob/main/QUICKSTART.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
