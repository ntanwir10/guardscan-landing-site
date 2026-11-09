import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Coffee, Home } from "lucide-react";
import { BUY_ME_A_COFFEE_URL } from "@/lib/constants";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
    <Helmet>
      <title>Page not found | GuardScan</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
        </div>

        {/* Subtle support link */}
        <div className="pt-8 border-t border-border/50">
          <a
            href={BUY_ME_A_COFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <Coffee className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span>Support GuardScan</span>
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default NotFound;
