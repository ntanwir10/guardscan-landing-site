import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CodeBlock } from "@/components/CodeBlock";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Zap, Server, CheckCircle } from "lucide-react";

export default function BYOKSetup() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Key className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                Bring Your Own Key (BYOK)
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Use GuardScan with your preferred AI provider or run it completely free with local AI
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-card/50 border-primary/20">
                <Zap className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2 text-foreground">Your Choice</h3>
                <p className="text-sm text-muted-foreground">Choose from OpenAI, Claude, Gemini, or local AI</p>
              </Card>
              <Card className="p-6 bg-card/50 border-primary/20">
                <Server className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-semibold mb-2 text-foreground">Full Control</h3>
                <p className="text-sm text-muted-foreground">Your API keys, your data, your control</p>
              </Card>
              <Card className="p-6 bg-card/50 border-primary/20">
                <CheckCircle className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-semibold mb-2 text-foreground">Zero Cost Option</h3>
                <p className="text-sm text-muted-foreground">Run completely free with Ollama locally</p>
              </Card>
            </div>

            {/* Setup Tabs */}
            <Tabs defaultValue="openai" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="openai">OpenAI</TabsTrigger>
                <TabsTrigger value="claude">Claude</TabsTrigger>
                <TabsTrigger value="gemini">Gemini</TabsTrigger>
                <TabsTrigger value="ollama">Ollama (Local)</TabsTrigger>
              </TabsList>

              {/* OpenAI Setup */}
              <TabsContent value="openai" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">OpenAI Setup</h2>
                  <p className="text-muted-foreground mb-6">
                    Get your API key from OpenAI and configure GuardScan to use GPT-4 or GPT-3.5 for AI-powered code analysis.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 1: Get Your API Key</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                      <li>Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI API Keys</a></li>
                      <li>Sign in or create an account</li>
                      <li>Click "Create new secret key"</li>
                      <li>Copy your API key (starts with "sk-")</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 2: Configure GuardScan</h3>
                    <CodeBlock
                      title="Set environment variable"
                      code={`# Linux/macOS
export OPENAI_API_KEY="sk-your-api-key-here"

# Windows (Command Prompt)
set OPENAI_API_KEY=sk-your-api-key-here

# Windows (PowerShell)
$env:OPENAI_API_KEY="sk-your-api-key-here"`}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 3: Run AI-Powered Scan</h3>
                    <CodeBlock
                      title="Execute scan"
                      code={`guardscan run --ai

# Or specify a model
guardscan run --ai --model gpt-4

# For GPT-3.5 (faster, cheaper)
guardscan run --ai --model gpt-3.5-turbo`}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Claude Setup */}
              <TabsContent value="claude" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Claude (Anthropic) Setup</h2>
                  <p className="text-muted-foreground mb-6">
                    Use Anthropic's Claude models for advanced reasoning and code analysis capabilities.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 1: Get Your API Key</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                      <li>Visit <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic Console</a></li>
                      <li>Sign in or create an account</li>
                      <li>Navigate to API Keys section</li>
                      <li>Create a new API key</li>
                      <li>Copy your API key</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 2: Configure GuardScan</h3>
                    <CodeBlock
                      title="Set environment variable"
                      code={`# Linux/macOS
export ANTHROPIC_API_KEY="sk-ant-your-api-key-here"

# Windows (Command Prompt)
set ANTHROPIC_API_KEY=sk-ant-your-api-key-here

# Windows (PowerShell)
$env:ANTHROPIC_API_KEY="sk-ant-your-api-key-here"`}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 3: Run AI-Powered Scan</h3>
                    <CodeBlock
                      title="Execute scan"
                      code={`guardscan run --ai --provider claude

# Or specify a model
guardscan run --ai --provider claude --model claude-3-opus

# For Claude Sonnet (balanced performance)
guardscan run --ai --provider claude --model claude-3-sonnet`}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Gemini Setup */}
              <TabsContent value="gemini" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Google Gemini Setup</h2>
                  <p className="text-muted-foreground mb-6">
                    Leverage Google's Gemini models for multimodal AI analysis and code review.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 1: Get Your API Key</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                      <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></li>
                      <li>Sign in with your Google account</li>
                      <li>Click "Create API Key"</li>
                      <li>Copy your API key</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 2: Configure GuardScan</h3>
                    <CodeBlock
                      title="Set environment variable"
                      code={`# Linux/macOS
export GOOGLE_API_KEY="your-api-key-here"

# Windows (Command Prompt)
set GOOGLE_API_KEY=your-api-key-here

# Windows (PowerShell)
$env:GOOGLE_API_KEY="your-api-key-here"`}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 3: Run AI-Powered Scan</h3>
                    <CodeBlock
                      title="Execute scan"
                      code={`guardscan run --ai --provider gemini

# Or specify a model
guardscan run --ai --provider gemini --model gemini-pro

# For Gemini Flash (faster response)
guardscan run --ai --provider gemini --model gemini-flash`}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Ollama Setup */}
              <TabsContent value="ollama" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Ollama Local AI Setup</h2>
                  <p className="text-muted-foreground mb-6">
                    Run GuardScan completely free with local AI models. No API keys, no cloud costs, 100% private.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 1: Install Ollama</h3>
                    <CodeBlock
                      title="Installation"
                      code={`# macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Download from https://ollama.com/download

# Verify installation
ollama --version`}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 2: Pull AI Model</h3>
                    <CodeBlock
                      title="Download model"
                      code={`# Pull Code Llama (recommended for code analysis)
ollama pull codellama

# Or pull Llama 2
ollama pull llama2

# For faster inference (smaller model)
ollama pull llama2:7b

# Verify model is available
ollama list`}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Step 3: Run Local AI Scan</h3>
                    <CodeBlock
                      title="Execute scan with local AI"
                      code={`guardscan run --local

# Or specify a model
guardscan run --local --model codellama

# With specific Ollama model
guardscan run --local --model llama2:7b`}
                    />
                  </div>

                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      Benefits of Local AI
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                      <li>✓ 100% free - no API costs</li>
                      <li>✓ Complete privacy - code never leaves your machine</li>
                      <li>✓ Works offline - no internet required</li>
                      <li>✓ No rate limits or quotas</li>
                      <li>✓ Full control over the AI model</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Configuration File */}
            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Configuration File (Optional)</h2>
              <p className="text-muted-foreground">
                Store your preferences in <code className="px-2 py-1 bg-muted rounded text-sm">~/.guardscan/config.yml</code> for convenience:
              </p>
              <CodeBlock
                title="~/.guardscan/config.yml"
                language="yaml"
                code={`# AI Provider Configuration
ai:
  provider: openai  # openai, claude, gemini, or ollama
  model: gpt-4      # model name
  
# For local AI
local:
  enabled: true
  model: codellama
  
# Default scan options
scan:
  verbose: true
  output_format: md
  
# Privacy settings
privacy:
  telemetry: false
  anonymous_stats: false`}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
