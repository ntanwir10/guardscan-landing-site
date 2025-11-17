import { useParams, Link, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import { blogArticles, type BlogArticle } from "@/data/blogArticles";
import { Helmet } from "react-helmet";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !blogArticles[slug]) {
    return <Navigate to="/blog" replace />;
  }

  const article: BlogArticle = blogArticles[slug];
  const relatedArticles = article.relatedArticles
    .map(slug => blogArticles[slug])
    .filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{article.title} | GuardScan Blog</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.keywords.join(", ")} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:author" content={article.author.name} />
        <meta property="article:section" content={article.category} />
        {article.keywords.map((keyword, index) => (
          <meta key={index} property="article:tag" content={keyword} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.description,
            "datePublished": article.date,
            "author": {
              "@type": "Person",
              "name": article.author.name,
              "jobTitle": article.author.role
            },
            "keywords": article.keywords.join(", "),
            "articleSection": article.category,
            "wordCount": article.content.split(/\s+/).length,
            "timeRequired": article.readTime,
            "publisher": {
              "@type": "Organization",
              "name": "GuardScan",
              "logo": {
                "@type": "ImageObject",
                "url": "https://guardscan.dev/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        {/* Breadcrumb */}
        <section className="py-6 px-4 border-b border-border/50">
          <div className="container mx-auto max-w-4xl">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <article className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="text-5xl">{article.image}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {article.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border/50 py-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <div>
                    <div className="font-semibold text-foreground">{article.author.name}</div>
                    <div className="text-xs">{article.author.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: formatArticleContent(article.content) }}
              />

              {/* Code Examples */}
              {article.codeExamples && article.codeExamples.length > 0 && (
                <div className="my-12 space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
                  {article.codeExamples.map((example, index) => (
                    <Card key={index} className="bg-card/50 border-border/50">
                      <CardContent className="p-6">
                        {example.title && (
                          <h3 className="text-lg font-semibold mb-4">{example.title}</h3>
                        )}
                        <pre className="bg-background/50 rounded-lg p-4 overflow-x-auto">
                          <code className={`language-${example.language}`}>
                            {example.code}
                          </code>
                        </pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="border-t border-border/50 pt-12">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="group"
                    >
                      <Card className="h-full bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="secondary" className="text-xs">
                              {related.category}
                            </Badge>
                            <span className="text-2xl">{related.image}</span>
                          </div>
                          <h3 className="font-semibold mb-2 leading-tight group-hover:text-primary transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {related.description}
                          </p>
                          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {related.readTime}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="mt-12 p-8 bg-card/30 border border-border/50 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Secure Your Code?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start using GuardScan today for privacy-first, AI-powered code security analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/guardscan/guardscan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-colors"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-primary/50 font-semibold transition-colors"
                >
                  Read Documentation
                </Link>
              </div>
            </section>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}

// Helper function to format article content (convert markdown-style to HTML)
function formatArticleContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    // Wrap in paragraphs
    .replace(/^(?!<[h|p|pre])(.+)$/gim, '<p>$1</p>')
    // Lists
    .replace(/^\- (.*)$/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
}
