"use client";

import { Search, Bell, Sparkles } from "lucide-react";
import React from "react";

interface GlobalHeaderProps {
  title: string;
  user?: {
    name: string;
    subscription: "Free" | "Pro";
  } | null;
  onSearchChange?: (val: string) => void;
}

export function GlobalHeader({ title, user, onSearchChange }: GlobalHeaderProps) {
  return (
    <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40 dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        {onSearchChange && (
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search resumes..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm text-zinc-950 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-0 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-50 dark:focus:bg-zinc-950"
            />
          </div>
        )}

        {/* Notifications mock */}
        <button className="relative p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-zinc-950 dark:bg-zinc-50" />
        </button>

        {/* Pro Badge */}
        {user && user.subscription === "Pro" && (
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            Pro Plan
          </div>
        )}
      </div>
    </header>
  );
}
