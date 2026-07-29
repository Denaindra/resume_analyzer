import { getSessionUser } from "@/lib/auth";
import { readDb } from "@/lib/db";
import { Sidebar } from "@/components/common/sidebar";
import { GlobalHeader } from "@/components/common/global-header";
import { SubscriptionManager } from "@/features/billing/components/subscription-manager";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { FileText, Plus, Sparkles, Clock } from "lucide-react";
import Link from "next/link";

interface DashboardPageProps {
  searchParams: Promise<{
    tab?: string;
    checkout?: string;
    plan?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const { tab, checkout, plan } = await searchParams;
  const db = readDb();
  const resumes = db.resumes;

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navigation Sidebar */}
      <Sidebar user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <GlobalHeader
          title={tab === "billing" ? "Billing & Subscription" : "My Resumes"}
          user={user}
        />

        <main className="flex-grow p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
          {/* Checkout success alert banner */}
          {checkout === "success" && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-900/50 dark:text-emerald-400 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Successfully upgraded!</p>
                <p className="text-xs opacity-90">
                  Your account is now upgraded to the {plan === "pro" ? "Pro" : "Free"} Plan.
                </p>
              </div>
            </div>
          )}

          {tab === "billing" ? (
            <SubscriptionManager subscription={user.subscription} />
          ) : (
            <div className="space-y-8">
              {/* Premium upgrade promo if on Free plan */}
              {user.subscription === "Free" && (
                <section className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50/50 p-6 dark:border-indigo-950/50 dark:from-indigo-950/20 dark:to-purple-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                      PRO Upgrade
                    </span>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
                      Unlock AI-powered Resume Tailoring
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Upgrade to the Pro Plan to unlock infinite templates, AI recommendation logs,
                      and real-time ATS optimization.
                    </p>
                  </div>
                  <Link href="/dashboard?tab=billing" className="shrink-0">
                    <Button
                      variant="primary"
                      className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 border-none shadow-md shadow-indigo-600/10"
                    >
                      Go Premium
                    </Button>
                  </Link>
                </section>
              )}

              {/* Actions Header bar */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
                    Recent Resumes
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Manage, edit, and export your professional resumes.
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Resume
                </Button>
              </div>

              {/* Resumes Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resumes.map((resume) => (
                  <article
                    key={resume.id}
                    className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700"
                  >
                    <div className="space-y-4">
                      {/* Document icon & Title */}
                      <div className="flex items-start justify-between">
                        <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-zinc-950 group-hover:text-white dark:group-hover:bg-zinc-50 dark:group-hover:text-zinc-950 transition-colors duration-300">
                          <FileText className="h-5 w-5" />
                        </div>
                        {/* ATS Score Indicator */}
                        <div className="flex flex-col items-end">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              resume.atsScore >= 90
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {resume.atsScore}% ATS
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                          {resume.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Edited {new Date(resume.lastModified).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {/* Completion Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-zinc-500">
                          <span>Completion</span>
                          <span>{resume.completionScore}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
                          <div
                            className="h-full bg-zinc-900 dark:bg-zinc-50 rounded-full transition-all duration-500"
                            style={{ width: `${resume.completionScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 rounded-lg h-9 text-xs">
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 px-3 rounded-lg text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                          Preview
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
