import React from "react";

export default function DashboardLoading() {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 animate-pulse">
      {/* Sidebar placeholder */}
      <div className="w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 p-6 space-y-6 hidden md:block">
        <div className="h-9 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="space-y-3 pt-6">
          <div className="h-9 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
          <div className="h-9 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
          <div className="h-9 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
        </div>
      </div>

      {/* Main Panel placeholder */}
      <div className="flex-1 flex flex-col">
        {/* Header placeholder */}
        <div className="h-16 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 px-8 flex items-center justify-between">
          <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        </div>

        {/* Content placeholder */}
        <main className="p-8 space-y-6 flex-1 overflow-auto">
          <div className="h-32 bg-white border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 rounded-3xl" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-44 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
            <div className="h-44 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
            <div className="h-44 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
          </div>
        </main>
      </div>
    </div>
  );
}
