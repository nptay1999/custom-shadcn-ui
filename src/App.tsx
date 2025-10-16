import { Github, Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import Button from './components/ui/Button'

function App() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-primary/10 border-2 border-primary flex items-center justify-center">
              <div className="size-4 bg-primary rounded-sm" />
            </div>
            <span className="font-semibold text-lg">
              <span className="text-primary">Weston</span>
              <span className="text-foreground">/React</span>
            </span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-foreground hover:text-primary transition"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm text-foreground hover:text-primary transition"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm text-foreground hover:text-primary transition"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm text-foreground hover:text-primary transition"
            >
              FAQ
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Github">
              <Github className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Animated gradient background effect */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-background">
            <div className="absolute left-1/2 top-40 -translate-x-1/2 size-[500px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute right-1/4 top-60 size-[300px] rounded-full bg-primary/10 blur-3xl" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-primary">Shadcn</span>{' '}
            <span className="text-foreground">landing page for</span>
            <br />
            <span className="text-cyan-500">React</span>{' '}
            <span className="text-foreground">developers</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Build your React landing page effortlessly with the required
            sections to your project.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white min-w-[200px]"
            >
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              <Github className="size-5" />
              Github Repository
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Weston/React. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
