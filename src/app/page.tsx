import { getSessionUser } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Layout, ChevronRight, Zap } from "lucide-react";
import { PricingCard } from "@/features/billing/components/pricing-card";
import { Plan } from "@/features/billing/types";

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Plan",
    price: "$0",
    period: "month",
    description: "Essential resume templates with primary builder options.",
    features: [
      "Access to 3 standard templates",
      "Up to 2 active resume drafts",
      "Basic ATS keywords scanner",
      "Standard PDF download",
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: "$19",
    period: "month",
    description: "Unlock ultimate AI recommendations and premium builder options.",
    features: [
      "Access to all 15+ premium templates",
      "Unlimited active resume drafts",
      "AI-driven bullet points recommendations",
      "Advanced real-time ATS scoring & analysis",
      "Priority multi-format downloads (PDF, Word)",
      "Premium 24/7 dedicated support",
    ],
    isPopular: true,
  },
];


export default async function Home() {
  const user = await getSessionUser();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 overflow-hidden">
      {/* Sticky header */}
      <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40 dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white font-bold dark:bg-zinc-50 dark:text-zinc-950">
            AR
          </div>
          <span className="text-base font-semibold leading-none tracking-tight">AI Resume</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a href="#features" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
            Pricing
          </a>
        </nav>
        <div>
          {user ? (
            <Link href="/dashboard">
              <Button size="sm">Go to Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center">
        {/* Glow backdrop blobs */}
        <div className="absolute top-[10%] left-[-15%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5 -z-10 animate-pulse" />
        <div className="absolute top-[25%] right-[-15%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/5 -z-10" />

        <section className="w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 space-y-16 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" />
              AI Resume Builder Studio
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-950 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400">
              Build a polished resume that beats the ATS in seconds.
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Step away from generic templates. This builder combines clean typography, structured
              layout modules, and smart ATS keyword matching logic to present your career at its absolute
              best.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href={user ? "/dashboard" : "/login"}>
                <Button size="lg" className="shadow-lg shadow-zinc-900/10 flex items-center gap-2">
                  Create My Resume
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg">
                  Explore Features
                </Button>
              </a>
            </div>
          </div>

          {/* Graphic Preview */}
          <div className="relative rounded-3xl border border-zinc-200 bg-white/40 p-4 backdrop-blur-md shadow-2xl dark:border-zinc-800 dark:bg-zinc-950/40 max-w-4xl mx-auto overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5" />
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 shadow-inner flex flex-col gap-6 text-left">
              {/* Header preview */}
              <div className="border-b border-zinc-100 pb-4 dark:border-zinc-800 flex justify-between items-start">
                <div className="space-y-1.5">
                  <div className="h-7 w-48 bg-zinc-900 dark:bg-zinc-50 rounded-lg" />
                  <div className="h-4 w-32 bg-zinc-400 dark:bg-zinc-600 rounded" />
                </div>
                <div className="h-8 w-20 bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-full flex items-center justify-center text-xs font-bold">
                  98% Match
                </div>
              </div>
              {/* Content mock rows */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                  <div className="h-4 w-28 bg-zinc-950 dark:bg-zinc-50 rounded font-bold" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-3 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-20 bg-zinc-950 dark:bg-zinc-50 rounded font-bold" />
                  <div className="flex flex-wrap gap-2">
                    <span className="h-6 px-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-semibold flex items-center">
                      React
                    </span>
                    <span className="h-6 px-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-semibold flex items-center">
                      Next.js
                    </span>
                    <span className="h-6 px-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-semibold flex items-center">
                      Tailwind CSS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section
          id="features"
          className="w-full bg-zinc-100/50 dark:bg-zinc-900/20 border-y border-zinc-200 dark:border-zinc-800 py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          <div className="max-w-6xl w-full space-y-16">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                Engineered for High Conversion
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Every layout is tailored to human resource standard guidelines and machine readability.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <article className="rounded-3xl border border-zinc-200/60 bg-white p-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-950/40 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-950 dark:text-zinc-50">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
                  Modular Sectioning
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Drag and configure sections seamlessly. Add Work History, Education, Skills,
                  Projects, and custom blocks.
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-200/60 bg-white p-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-950/40 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-950 dark:text-zinc-50">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">AI Suggestions</h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Automatically rewrite weak bullet points into high-impact accomplishment records
                  based on target job keywords.
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-200/60 bg-white p-8 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-950/40 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-950 dark:text-zinc-50">
                  <Layout className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
                  ATS Keywords Check
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Instantly compute match scores against target job descriptions to ensure your CV is
                  never filtered out.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Simple, transparent pricing
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Free basic templates or full premium upgrade with advanced AI capabilities.
            </p>
          </div>

          <div className="grid gap-8 max-w-3xl mx-auto md:grid-cols-2">
            {PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isCurrentPlan={
                  user
                    ? (plan.id === "pro" && user.subscription === "Pro") ||
                      (plan.id === "free" && user.subscription === "Free")
                    : false
                }
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12 px-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
        <p>&copy; {new Date().getFullYear()} AI Resume Builder Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
