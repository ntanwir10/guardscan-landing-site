import { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import { blogArticles, type BlogArticle } from "@/data/blogArticles";
import { Helmet } from "react-helmet";
import { CodeBlock } from "@/components/CodeBlock";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const contentRef = useRef<HTMLDivElement | null>(null);
  
  if (!slug || !blogArticles[slug]) {
    return <Navigate to="/blog" replace />;
  }

  const article: BlogArticle = blogArticles[slug];
  const relatedArticles = article.relatedArticles
    .map(slug => blogArticles[slug])
    .filter(Boolean);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const buttons = Array.from(
      container.querySelectorAll<HTMLButtonElement>(".inline-code-copy-btn")
    );

    const handleClick = async (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const encodedValue = button.dataset.code;
      if (!encodedValue) return;
      const value = decodeURIComponent(encodedValue);

      try {
        await navigator.clipboard.writeText(value);
        const originalLabel = button.textContent;
        button.textContent = "Copied";
        button.classList.add("text-primary");
        setTimeout(() => {
          button.textContent = originalLabel ?? "Copy";
          button.classList.remove("text-primary");
        }, 1500);
      } catch (error) {
        console.error("Failed to copy inline code snippet:", error);
      }
    };

    buttons.forEach((btn) => btn.addEventListener("click", handleClick));

    return () => {
      buttons.forEach((btn) => btn.removeEventListener("click", handleClick));
    };
  }, [article.content]);

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
            <div className="article-content space-y-6">
              <div 
                className="prose-content"
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: formatArticleContent(article.content) }}
              />

              {/* Code Examples */}
              {article.codeExamples && article.codeExamples.length > 0 && (
                <div className="my-12 space-y-6">
                  <h2 className="text-3xl font-bold mb-8 text-foreground">Code Examples</h2>
                  {article.codeExamples.map((example, index) => (
                    <CodeBlock
                      key={index}
                      code={example.code}
                      language={example.language}
                      title={example.title}
                    />
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
  let html = content;
  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  
  // Code blocks with copy button wrapper
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'bash';
    const trimmedCode = escapeHtml(code.trim());
    return `<div class="code-block-wrapper"><pre class="bg-code-bg text-foreground rounded-lg p-4 overflow-x-auto border border-border my-6"><code class="language-${language} text-sm leading-relaxed block">${trimmedCode}</code></pre></div>`;
  });
  
  // Headers with proper styling
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-10 mb-6 text-foreground">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-12 mb-8 text-foreground">$1</h1>');
  
  // Bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
  
  // Inline code with copy button
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    const trimmed = code.trim();
    const displayValue = escapeHtml(trimmed);
    const dataValue = encodeURIComponent(trimmed);
    return `<span class="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm font-mono text-foreground"><code>${displayValue}</code><button class="inline-code-copy-btn text-xs px-2 py-1 rounded bg-transparent border border-border/50 hover:bg-border/20 transition-colors" data-code="${dataValue}" type="button">Copy</button></span>`;
  });
  
  // Process lists properly
  const lines = html.split('\n');
  let inList = false;
  const processedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const listMatch = line.match(/^[\-\*] (.+)$/);
    
    if (listMatch) {
      if (!inList) {
        processedLines.push('<ul class="list-disc list-inside space-y-2 my-4 ml-4 text-foreground">');
        inList = true;
      }
      processedLines.push(`<li class="text-muted-foreground leading-relaxed">${listMatch[1]}</li>`);
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(line);
    }
  }
  
  if (inList) {
    processedLines.push('</ul>');
  }
  
  html = processedLines.join('\n');
  
  // Paragraphs with proper spacing
  html = html.replace(/\n\n+/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">');
  html = html.replace(/^(?!<[h|u|d|c])(.+)$/gim, '<p class="text-muted-foreground leading-relaxed mb-4">$1</p>');
  
  // Clean up empty paragraphs
  html = html.replace(/<p[^>]*>\s*<\/p>/g, '');
  
  return html;
}
