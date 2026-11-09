import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogArticles } from "@/data/blogArticles";

// Convert blogArticles object to array and sort by date (newest first)
const articles = Object.values(blogArticles).sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function Blog() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Blog - Security Insights, Privacy & Code Review Best Practices"
        description="Learn about code security, privacy-first development, AI-powered code review, OWASP Top 10, secrets detection, and secure development best practices."
        canonical="https://guardscancli.vercel.app/blog"
        keywords="security blog, code review articles, OWASP tutorials, secrets detection guide, privacy-first development, AI code review, DevOps security"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            GuardScan <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about code security, privacy-first development, AI-powered
            code review, and best practices for building secure applications.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card
                key={article.slug}
                className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-4xl">{article.image}</span>
                  </div>
                  <CardTitle className="text-xl mb-2 leading-tight">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm group"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Contribute?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We welcome guest posts about code security, privacy-first
            development, and developer tools. Share your expertise with the
            community.
          </p>
          <a
            href="https://github.com/ntanwir10/GuardScan/discussions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-colors"
          >
            Submit a Guest Post
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
